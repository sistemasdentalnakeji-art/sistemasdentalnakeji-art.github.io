// ─────────────────────────────────────────────────────────────────────────────
// FORMULARIO DE CITAS (compartido: homepage y las páginas de servicio, vía pages/home/sections/Schedule.tsx)
//
// Tres pasos agrupados: 1) Tus datos · 2) Tu cita (servicio, fecha, horario en botones y primera visita) · 3) Para terminar.
// • La lógica (lectura, validación y envío al Apps Script) está en features/booking/booking.ts y aquí abajo; el diseño es solo
//   de presentación. Los nombres de los campos y las reglas no cambian.
// • En páginas de servicio, `defaultService` preselecciona el servicio y adapta el texto de apoyo.
// • Estilos → src/styles/pages/home/schedule.css (contorno luminoso del icono: styles/components/siri.css).
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import { BOOKING, isBookingConfigured } from '@/config/booking'
import { PRIVACY } from '@/config/routes'
import { SITE } from '@/config/site'
import {
  addDays,
  formatDate,
  formatTime,
  isFieldName,
  readForm,
  SERVER_FIELD_ERROR,
  todayInClinic,
  validate,
  type FieldErrors,
  type FieldName,
} from '@/features/booking/booking'
import { cx } from '@/lib/cx'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon, type IconName } from '@/components/ui/Icon'

type ErrorCode = 'busy' | 'invalid' | 'limit' | 'network'

interface Summary {
  name: string
  service: string
  date: string
  time: string
}

/** Estado del envío: cada caso lleva solo los datos que necesita. */
type FormState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'error'; code: ErrorCode }
  /** demo: el formulario no está conectado; se muestra la confirmación pero no se envió nada. */
  | { status: 'success'; summary: Summary; demo: boolean }

const ERROR_MESSAGES: Record<ErrorCode, { text: string; offerWhatsApp: boolean }> = {
  busy: { text: 'Ese horario ya está ocupado. Elige otra fecha u hora, por favor.', offerWhatsApp: false },
  invalid: { text: 'Revisa los datos del formulario e inténtalo de nuevo.', offerWhatsApp: false },
  // El Apps Script limita las solicitudes por teléfono (unas horas) y por hora en total.
  limit: {
    text: 'Ya recibimos una solicitud reciente desde este teléfono. Para agendar otra cita, escríbenos por WhatsApp.',
    offerWhatsApp: true,
  },
  network: { text: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.', offerWhatsApp: true },
}

interface ServerReply {
  ok: boolean
  error?: string
  fields?: string[]
}

/** Tiempo máximo de espera de la respuesta del Apps Script. */
const SUBMIT_TIMEOUT_MS = 20_000

// La fecha de hoy se lee solo en el navegador (en el HTML prerenderizado queda vacía).
const subscribe = () => () => {}
const getServerToday = () => ''

interface BookingFormProps {
  /** Servicio preseleccionado (páginas de servicio). Debe ser una opción de BOOKING.services. */
  defaultService?: string
}

export function BookingForm({ defaultService = '' }: BookingFormProps) {
  const today = useSyncExternalStore(subscribe, todayInClinic, getServerToday)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const successRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const fieldProps = (name: FieldName) => ({
    id: `cita-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `cita-${name}-error` : undefined,
  })

  const clearError = (name: string) => {
    if (!isFieldName(name)) return
    setErrors((current) => {
      if (!(name in current)) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state.status === 'sending') return
    const form = event.currentTarget
    const fields = readForm(new FormData(form))
    // La fecha de hoy se lee al enviar (no la del último render): evita validar contra "ayer" si la
    // pestaña quedó abierta pasada la medianoche.
    const found = validate(fields, todayInClinic())
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      setState({ status: 'idle' })
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // El orden de las claves es el que espera el Apps Script.
    const payload = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone,
      email: fields.email,
      service: fields.service,
      date: fields.date,
      time: fields.time,
      firstVisit: fields.firstVisit === 'si',
      comments: fields.comments,
      consent: true,
      hp_x: fields.hp_x,
      source: window.location.href,
    }

    const showSuccess = (demo = false) => {
      setState({
        status: 'success',
        summary: { name: payload.firstName, service: payload.service, date: payload.date, time: payload.time },
        demo,
      })
      form.reset()
      requestAnimationFrame(() => successRef.current?.focus())
    }

    if (payload.hp_x) return showSuccess()
    // Sin Apps Script conectado (vista previa): no se envía nada, solo se muestra la confirmación.
    if (!isBookingConfigured) return showSuccess(true)

    setState({ status: 'sending' })
    // Si el servidor no responde a tiempo, se cancela y se ofrece reintentar o usar WhatsApp.
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)
    try {
      // text/plain evita la verificación CORS previa, que Apps Script no admite.
      const response = await fetch(BOOKING.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      const reply = (await response.json()) as ServerReply
      if (reply.ok) return showSuccess()

      if (reply.error === 'invalid') {
        // Marca en el formulario los campos que rechazó el servidor.
        const serverErrors: FieldErrors = {}
        for (const name of reply.fields ?? []) if (isFieldName(name)) serverErrors[name] = SERVER_FIELD_ERROR
        setErrors(serverErrors)
      }
      const known = reply.error === 'busy' || reply.error === 'invalid' || reply.error === 'limit'
      setState({ status: 'error', code: known ? (reply.error as ErrorCode) : 'network' })
    } catch {
      setState({ status: 'error', code: 'network' })
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const startOver = () => {
    setState({ status: 'idle' })
    requestAnimationFrame(() => titleRef.current?.focus())
  }

  if (state.status === 'success') {
    const { summary, demo } = state
    const details: { icon: IconName; label: string; value: string }[] = [
      { icon: 'tooth', label: 'Servicio', value: summary.service },
      { icon: 'calendar', label: 'Fecha', value: formatDate(summary.date) },
      { icon: 'clock', label: 'Hora', value: formatTime(summary.time) },
    ]
    return (
      <div ref={successRef} className="booking-success" role="status" tabIndex={-1}>
        <span className="booking-success__check" aria-hidden="true">
          <Icon name="check" size={34} />
        </span>
        <h3 className="booking-success__title">¡Gracias, {summary.name}! Recibimos tu solicitud.</h3>
        <dl className="booking-ticket">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt>
                <span className="booking-ticket__icon" aria-hidden="true">
                  <Icon name={detail.icon} size={18} />
                </span>
                {detail.label}
              </dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <p className="booking-success__text">Te contactaremos por teléfono o WhatsApp para confirmar tu cita.</p>
        {demo && (
          <p className="booking-success__text">
            <strong>Vista previa:</strong> esta es una demostración, no se envió ninguna solicitud.
          </p>
        )}
        <button type="button" className="btn btn--ghost" onClick={startOver}>
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  const minDate = today ? addDays(today, 1) : undefined
  const maxDate = today ? addDays(today, BOOKING.daysAhead) : undefined
  const sending = state.status === 'sending'
  const alert = state.status === 'error' ? ERROR_MESSAGES[state.code] : null
  const lead = defaultService
    ? `Elige el día y la hora que mejor te acomoden para tu cita de ${defaultService}.`
    : 'Elige el servicio, el día y la hora que mejor te acomoden.'

  return (
    <form
      className="booking-form"
      noValidate
      onSubmit={onSubmit}
      onChange={(event) => clearError((event.nativeEvent.target as HTMLInputElement).name)}
      aria-labelledby="cita-titulo"
    >
      <header className="booking-form__head">
        <span className="booking-form__badge siri" aria-hidden="true">
          <Icon name="calendar" size={24} />
        </span>
        <div>
          <p className="booking-form__eyebrow">Reserva en línea</p>
          <h3 ref={titleRef} id="cita-titulo" className="booking-form__title" tabIndex={-1}>
            Solicita tu cita
          </h3>
          <p className="booking-form__lead">{lead}</p>
        </div>
      </header>
      <p className="booking-form__note">
        Los campos con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios.
      </p>

      <Group step={1} title="Tus datos">
        <div className="form-grid">
          <Field name="firstName" label="Nombre(s)" icon="user" required error={errors.firstName}>
            <input {...fieldProps('firstName')} type="text" autoComplete="given-name" maxLength={50} required />
          </Field>

          <Field name="lastName" label="Apellidos" icon="user" required error={errors.lastName}>
            <input {...fieldProps('lastName')} type="text" autoComplete="family-name" maxLength={50} required />
          </Field>
        </div>

        <div className="form-grid">
          <Field name="phone" label="Teléfono o WhatsApp" icon="phone" required error={errors.phone}>
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={20} required />
          </Field>

          <Field name="email" label="Correo electrónico" icon="mail" error={errors.email}>
            <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={120} />
          </Field>
        </div>
      </Group>

      <Group step={2} title="Tu cita">
        <Field name="service" label="Servicio de interés" icon="tooth" required error={errors.service}>
          <select {...fieldProps('service')} defaultValue={defaultService} required>
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {BOOKING.services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field name="date" label="Fecha preferida" required error={errors.date}>
          <input {...fieldProps('date')} type="date" min={minDate} max={maxDate} required />
        </Field>

        {/* Horario: mismos valores que antes (BOOKING.slots), ahora como botones en lugar de una lista desplegable. */}
        <fieldset
          className={cx('field field--slots', errors.time && 'has-error')}
          aria-describedby={errors.time ? 'cita-time-error' : undefined}
        >
          <legend className="field__label">
            Horario preferido <span aria-hidden="true">*</span>
          </legend>
          <div className="slot-grid">
            {BOOKING.slots.map((slot, index) => (
              <label key={slot} className="slot">
                <input
                  type="radio"
                  name="time"
                  value={slot}
                  id={index === 0 ? 'cita-time' : undefined}
                  aria-invalid={errors.time ? true : undefined}
                  required
                />
                <span>{formatTime(slot)}</span>
              </label>
            ))}
          </div>
          <FieldError name="time" error={errors.time} />
        </fieldset>

        <fieldset
          className={cx('field field--choice', errors.firstVisit && 'has-error')}
          aria-describedby={errors.firstVisit ? 'cita-firstVisit-error' : undefined}
        >
          <legend className="field__label">
            ¿Es tu primera visita? <span aria-hidden="true">*</span>
          </legend>
          <div className="choice-row">
            {[
              { value: 'si', label: 'Sí, soy paciente nuevo' },
              { value: 'no', label: 'No, ya soy paciente' },
            ].map((option, index) => (
              <label key={option.value} className="choice">
                <input
                  type="radio"
                  name="firstVisit"
                  value={option.value}
                  id={index === 0 ? 'cita-firstVisit' : undefined}
                  aria-invalid={errors.firstVisit ? true : undefined}
                  required
                />
                {option.label}
              </label>
            ))}
          </div>
          <FieldError name="firstVisit" error={errors.firstVisit} />
        </fieldset>
      </Group>

      <Group step={3} title="Para terminar">
        <Field name="comments" label="Comentarios" hint="Cuéntanos brevemente el motivo de tu visita.">
          <textarea id="cita-comments" name="comments" rows={3} maxLength={500} aria-describedby="cita-comments-ayuda" />
        </Field>

        {/* Trampa anti-spam: oculta para personas; si se llena, la solicitud se descarta. */}
        <div className="hp-field" aria-hidden="true">
          <label>
            Sitio web
            <input type="text" name="hp_x" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className={cx('field field--consent', errors.consent && 'has-error')}>
          <label className="choice">
            <input {...fieldProps('consent')} type="checkbox" required />
            <span>
              Acepto el{' '}
              <ExternalLink className="text-link" href={PRIVACY.path}>
                aviso de privacidad
              </ExternalLink>{' '}
              y autorizo que me contacten para agendar. <span aria-hidden="true">*</span>
            </span>
          </label>
          <FieldError name="consent" error={errors.consent} />
        </div>
      </Group>

      <div className="booking-form__footer">
        {/* aria-disabled (no disabled): el botón conserva el foco mientras se envía. */}
        <button type="submit" className="btn btn--primary btn--lg booking-form__submit" aria-disabled={sending}>
          {sending ? 'Enviando…' : 'Solicitar cita'}
          {!sending && <Icon name="arrowRight" size={18} />}
        </button>
        <span role="status" className="visually-hidden">
          {sending ? 'Enviando solicitud…' : ''}
        </span>
        <p className="booking-form__fine">
          <Icon name="shield" size={16} />
          La cita queda sujeta a disponibilidad y confirmación.
        </p>
      </div>

      <div className="booking-form__status" role="alert">
        {alert && (
          <p className="form-alert">
            {alert.text}{' '}
            {alert.offerWhatsApp && (
              <ExternalLink className="text-link" href={SITE.social.whatsapp}>
                Abrir WhatsApp
              </ExternalLink>
            )}
          </p>
        )}
      </div>
    </form>
  )
}

/** Bloque numerado del formulario (Tus datos · Tu cita · Para terminar). */
function Group({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  const id = `cita-grupo-${step}`
  return (
    <div className="booking-group" role="group" aria-labelledby={id}>
      <h4 id={id} className="booking-group__title">
        <span className="booking-group__num" aria-hidden="true">
          {step}
        </span>
        {title}
      </h4>
      <div className="booking-group__body">{children}</div>
    </div>
  )
}

function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null
  return (
    <p id={`cita-${name}-error`} className="field__error">
      {error}
    </p>
  )
}

interface FieldProps {
  name: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  /** Icono a la izquierda del campo (opcional). */
  icon?: IconName
  children: ReactNode
}

function Field({ name, label, required, hint, error, icon, children }: FieldProps) {
  return (
    <div className={cx('field', error && 'has-error', icon && 'field--icon')}>
      <label className="field__label" htmlFor={`cita-${name}`}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="field__optional"> (opcional)</span>}
      </label>
      <div className="field__control">
        {icon && <Icon name={icon} size={18} className="field__icon" />}
        {children}
      </div>
      {hint && (
        <p id={`cita-${name}-ayuda`} className="field__hint">
          {hint}
        </p>
      )}
      <FieldError name={name} error={error} />
    </div>
  )
}
