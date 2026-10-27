// Lógica pura del formulario de citas: lectura, validación y formato de fechas/horas.
// Debe coincidir con la validación de integrations/google-calendar/Code.gs.

import { BOOKING } from '@/config/booking'
import type { Lang } from '@/config/routes'
import { FORM_TEXT } from '@/features/booking/bookingText'

const FIELD_NAMES = ['firstName', 'lastName', 'phone', 'email', 'service', 'date', 'time', 'firstVisit', 'comments', 'consent'] as const
export type FieldName = (typeof FIELD_NAMES)[number]
export type FieldErrors = Partial<Record<FieldName, string>>

export const isFieldName = (value: string): value is FieldName => (FIELD_NAMES as readonly string[]).includes(value)

/** Valores del formulario ya leídos y recortados. */
interface BookingFields {
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

/** Hora para mostrar: en inglés "9:00 AM", en español "9:00 a. m." (el valor enviado sigue siendo HH:MM de 24 h). */
export const formatTime = (time: string, lang: Lang) => {
  const [h, m] = time.split(':').map(Number)
  const suffix = lang === 'en' ? (h < 12 ? 'AM' : 'PM') : h < 12 ? 'a. m.' : 'p. m.'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`
}

/** Fecha para mostrar: "Monday, October 21" / "lunes, 21 de octubre". */
export const formatDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T12:00:00Z`))

// --- Validación ---

/** Nombre y apellido: solo letras, al menos 2, con espacios entre palabras. */
export const NAME_PATTERN = /^\p{L}{2,}(?: \p{L}+)*$/u
/** Teléfono: solo dígitos, con un "+" opcional al inicio; 10 a 15 dígitos. */
export const PHONE_PATTERN = /^\+?\d{10,15}$/
/** Enlaces en los comentarios: se rechazan (el personal los vería como enlaces en Google Calendar). */
export const LINK_PATTERN = /https?:\/\/|www\./i

export function validate(fields: BookingFields, today: string, lang: Lang): FieldErrors {
  const errors: FieldErrors = {}
  const text = FORM_TEXT[lang].validation

  if (!NAME_PATTERN.test(fields.firstName.trim())) errors.firstName = text.firstName
  if (!NAME_PATTERN.test(fields.lastName.trim())) errors.lastName = text.lastName
  if (!PHONE_PATTERN.test(fields.phone.trim())) errors.phone = text.phone

  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) errors.email = text.email

  if (!fields.service) errors.service = text.service

  const min = addDays(today, 1)
  const max = addDays(today, BOOKING.daysAhead)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) errors.date = text.date
  else if (fields.date < min || fields.date > max) errors.date = text.dateRange(BOOKING.daysAhead)
  else if (BOOKING.closedWeekdays.includes(weekday(fields.date))) errors.date = text.closed

  if (!BOOKING.slots.includes(fields.time)) errors.time = text.time
  if (LINK_PATTERN.test(fields.comments)) errors.comments = text.comments
  if (!fields.firstVisit) errors.firstVisit = text.firstVisit
  if (!fields.consent) errors.consent = text.consent

  return errors
}
