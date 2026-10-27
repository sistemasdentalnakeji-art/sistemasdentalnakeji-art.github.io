import fs from 'node:fs'
import vm from 'node:vm'
import { expect, test } from '@playwright/test'

// Corre Code.gs en un entorno simulado de Google (calendario, caché, correo) para probar sus reglas sin desplegarlo.
test.skip(({ isMobile }) => isMobile, 'Prueba de servidor: basta con correrla una vez')

interface Options {
  secret?: string
  mailFails?: boolean
}

interface Reply {
  ok: boolean
  error?: string
  fields?: string[]
}

function nextOpenDay() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Tijuana' }).format(new Date()).split('-').map(Number)
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + 1))
  if (date.getUTCDay() === 0) date.setUTCDate(date.getUTCDate() + 1)
  return date.toISOString().slice(0, 10)
}

function loadScript({ secret, mailFails = false }: Options = {}) {
  const cache = new Map<string, string>()
  const created: { title: string; allDay: boolean }[] = []
  const mails: unknown[] = []
  const sandbox = {
    console,
    CalendarApp: {
      EventColor: { YELLOW: '5' },
      getDefaultCalendar: () => ({
        getEvents: () => [],
        createEvent: (title: string) => {
          created.push({ title, allDay: false })
          return { setColor: () => {} }
        },
        createAllDayEvent: (title: string) => created.push({ title, allDay: true }),
      }),
    },
    CacheService: { getScriptCache: () => ({ get: (key: string) => cache.get(key) ?? null, put: (key: string, value: string) => cache.set(key, value) }) },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (key: string) => (key === 'TURNSTILE_SECRET' ? (secret ?? null) : null) }) },
    UrlFetchApp: {
      fetch: (_url: string, options: { payload: { response: string } }) => ({
        getContentText: () => JSON.stringify({ success: options.payload.response === 'token-bueno' }),
      }),
    },
    MailApp: {
      sendEmail: (mail: unknown) => {
        if (mailFails) throw new Error('cuota agotada')
        mails.push(mail)
      },
    },
    Session: { getScriptTimeZone: () => 'America/Tijuana' },
    Utilities: {
      formatDate: (date: Date, timeZone: string, format: string) => {
        const parts = Object.fromEntries(
          new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
            .formatToParts(date)
            .map((part) => [part.type, part.value]),
        )
        return format === 'yyyy-MM-dd' ? `${parts.year}-${parts.month}-${parts.day}` : `${parts.year}${parts.month}${parts.day}${parts.hour}`
      },
    },
    ContentService: { createTextOutput: (text: string) => ({ setMimeType: () => ({ text }) }), MimeType: { JSON: 'json' } },
  }
  vm.createContext(sandbox)
  vm.runInContext(fs.readFileSync('integrations/google-calendar/Code.gs', 'utf8'), sandbox)
  const doPost = (sandbox as unknown as { doPost: (event: unknown) => { text: string } }).doPost

  const send = (body: unknown, raw = false): Reply => {
    const contents = raw ? String(body) : JSON.stringify(body)
    return JSON.parse(doPost({ postData: { contents } }).text) as Reply
  }
  return { send, created, mails }
}

const request = (extra: Record<string, unknown> = {}) => ({
  firstName: 'Ana',
  lastName: 'Lopez',
  phone: '6641234567',
  email: '',
  service: 'Limpieza dental',
  date: nextOpenDay(),
  time: '10:00',
  firstVisit: true,
  comments: '',
  consent: true,
  ...extra,
})

test.describe('Code.gs (Apps Script)', () => {
  test('una solicitud válida crea el evento y avisa por correo', () => {
    const { send, created, mails } = loadScript()
    expect(send(request())).toEqual({ ok: true })
    expect(created).toHaveLength(1)
    expect(mails).toHaveLength(1)
  })

  test('con TURNSTILE_SECRET: sin token o con token falso se rechaza; con token bueno pasa', () => {
    const { send, created } = loadScript({ secret: 'secreto' })
    expect(send(request())).toMatchObject({ ok: false, error: 'captcha' })
    expect(send(request({ turnstile: 'token-malo' }))).toMatchObject({ ok: false, error: 'captcha' })
    expect(created).toHaveLength(0)
    expect(send(request({ turnstile: 'token-bueno' }))).toEqual({ ok: true })
    expect(created).toHaveLength(1)
  })

  test('el mismo teléfono escrito con y sin código de país cuenta como uno solo', () => {
    const { send } = loadScript()
    expect(send(request({ phone: '6641234567', time: '10:00' }))).toEqual({ ok: true })
    expect(send(request({ phone: '+526641234567', time: '11:00' }))).toMatchObject({ ok: false, error: 'limit' })
  })

  test('el límite global por hora corta a la solicitud 31', () => {
    const { send } = loadScript()
    for (let i = 0; i < 30; i++) expect(send(request({ phone: `66400000${String(i).padStart(2, '0')}` }))).toEqual({ ok: true })
    expect(send(request({ phone: '6649999999' }))).toMatchObject({ ok: false, error: 'limit' })
  })

  test('solo se manda un correo por hora aunque lleguen varias solicitudes', () => {
    const { send, created, mails } = loadScript()
    send(request({ phone: '6640000001' }))
    send(request({ phone: '6640000002' }))
    send(request({ phone: '6640000003' }))
    expect(created).toHaveLength(3)
    expect(mails).toHaveLength(1)
  })

  test('si el correo falla, la cita se crea y queda un aviso visible en el calendario', () => {
    const { send, created } = loadScript({ mailFails: true })
    expect(send(request())).toEqual({ ok: true })
    expect(created.some((event) => event.allDay && event.title.startsWith('AVISO'))).toBe(true)
  })

  test('cuerpos raros se rechazan sin romper nada', () => {
    const { send } = loadScript()
    expect(send('null', true)).toMatchObject({ ok: false, error: 'invalid' })
    expect(send('[]', true)).toMatchObject({ ok: false, error: 'invalid' })
    expect(send('no es json', true)).toMatchObject({ ok: false, error: 'server' })
  })

  test('una fecha con espacios de sobra se limpia y se acepta', () => {
    const { send } = loadScript()
    expect(send(request({ date: `${nextOpenDay()}      ` }))).toEqual({ ok: true })
  })

  test('comentarios con enlaces se rechazan', () => {
    const { send } = loadScript()
    expect(send(request({ comments: 'entra a www.malo.example' }))).toMatchObject({ ok: false, error: 'invalid', fields: ['comments'] })
  })
})
