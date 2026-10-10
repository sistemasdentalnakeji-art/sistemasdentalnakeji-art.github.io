// Lógica pura del formulario de citas: lectura, validación y formato de fechas/horas.
// Debe coincidir con la validación de integrations/google-calendar/Code.gs.

import { BOOKING } from '@/config/booking'

export const FIELD_NAMES = ['firstName', 'lastName', 'phone', 'email', 'service', 'date', 'time', 'firstVisit', 'consent'] as const
export type FieldName = (typeof FIELD_NAMES)[number]
export type FieldErrors = Partial<Record<FieldName, string>>

export const isFieldName = (value: string): value is FieldName => (FIELD_NAMES as readonly string[]).includes(value)

/** Valores del formulario ya leídos y recortados. */
export interface BookingFields {
  /** Nombre(s) y apellidos van separados para poder guardarlos en columnas distintas (Google Sheets). */
  firstName: string
  lastName: string
  phone: string
  email: string
  service: string
  date: string
  time: string
  /** 'si' | 'no' | '' (sin responder). */
  firstVisit: string
  comments: string
  consent: boolean
  /** Trampa anti-spam: debe llegar vacía. */
  website: string
}

export function readForm(formData: FormData): BookingFields {
  const text = (name: string) => String(formData.get(name) ?? '').trim()
  return {
    firstName: text('firstName'),
    lastName: text('lastName'),
    phone: text('phone'),
    email: text('email'),
    service: text('service'),
    date: text('date'),
    time: text('time'),
    firstVisit: text('firstVisit'),
    comments: text('comments'),
    consent: formData.get('consent') === 'on',
    website: String(formData.get('website') ?? ''),
  }
}

// --- Fechas (AAAA-MM-DD) ---

/** Hoy en la zona horaria de la clínica (la misma que usa el Apps Script). */
export const todayInClinic = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())

const parseISODate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const toISODate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const addDays = (iso: string, days: number) => {
  const date = parseISODate(iso)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

const weekday = (iso: string) => parseISODate(iso).getDay()

export const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T12:00:00Z`),
  )

// --- Validación ---

export function validate(fields: BookingFields, today: string): FieldErrors {
  const errors: FieldErrors = {}

  if (fields.firstName.length < 2) errors.firstName = 'Escribe tu nombre.'
  if (fields.lastName.length < 2) errors.lastName = 'Escribe tus apellidos.'

  const digits = fields.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) errors.phone = 'Escribe un teléfono de al menos 10 dígitos.'

  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) errors.email = 'Revisa el formato del correo.'

  if (!fields.service) errors.service = 'Elige el servicio que te interesa.'

  const min = addDays(today, 1)
  const max = addDays(today, BOOKING.daysAhead)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) errors.date = 'Elige una fecha.'
  else if (fields.date < min || fields.date > max)
    errors.date = `Elige una fecha entre mañana y los próximos ${BOOKING.daysAhead} días.`
  else if (BOOKING.closedWeekdays.includes(weekday(fields.date))) errors.date = 'Ese día no hay atención. Elige otra fecha.'

  if (!BOOKING.slots.includes(fields.time)) errors.time = 'Elige un horario.'
  if (!fields.firstVisit) errors.firstVisit = 'Indica si es tu primera visita.'
  if (!fields.consent) errors.consent = 'Necesitamos tu autorización para agendar la cita.'

  return errors
}

/** Mensajes genéricos para los campos que el servidor marque como inválidos. */
export const SERVER_FIELD_ERROR = 'Revisa este dato.'
