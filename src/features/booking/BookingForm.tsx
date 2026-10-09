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
import { Icon } from '@/components/ui/Icon'

type ErrorCode = 'busy' | 'invalid' | 'network'

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
  network: { text: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.', offerWhatsApp: true },
}

interface ServerReply {
  ok: boolean
  error?: string
  fields?: string[]
}

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
    const form = event.currentTarget
    const fields = readForm(new FormData(form))
    const found = validate(fields, today || todayInClinic())
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      setState({ status: 'idle' })
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // El orden de las claves es el que espera el Apps Script.
    const payload = {
      name: fields.name,
      phone: fields.phone,
      email: fields.email,
      service: fields.service,
      date: fields.date,
      time: fields.time,
      firstVisit: fields.firstVisit === 'si',
      comments: fields.comments,
      consent: true,
      website: fields.website,
      source: window.location.href,
    }

    const showSuccess = (demo = false) => {
      const firstName = payload.name.split(' ')[0]
      setState({
        status: 'success',
        summary: { name: firstName, service: payload.service, date: payload.date, time: payload.time },
        demo,
      })
      form.reset()
      requestAnimationFrame(() => successRef.current?.focus())
    }

    if (payload.website) return showSuccess()
    // Sin Apps Script conectado (vista previa): no se envía nada, solo se muestra la confirmación.
    if (!isBookingConfigured) return showSuccess(true)

    setState({ status: 'sending' })
    try {
      // text/plain evita la verificación CORS previa, que Apps Script no admite.
      const response = await fetch(BOOKING.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      const reply = (await response.json()) as ServerReply
      if (reply.ok) return showSuccess()

      if (reply.error === 'invalid') {
        // Marca en el formulario los campos que rechazó el servidor.
        const serverErrors: FieldErrors = {}
        for (const name of reply.fields ?? []) if (isFieldName(name)) serverErrors[name] = SERVER_FIELD_ERROR
        setErrors(serverErrors)
      }
      setState({ status: 'error', code: reply.error === 'busy' || reply.error === 'invalid' ? reply.error : 'network' })
    } catch {
      setState({ status: 'error', code: 'network' })
    }
  }

  const startOver = () => {
    setState({ status: 'idle' })
    requestAnimationFrame(() => titleRef.current?.focus())
  }

  if (state.status === 'success') {
    const { summary, demo } = state
    return (
      <div ref={successRef} className="booking-success" role="status" tabIndex={-1}>
        <span className="icon-badge icon-badge--success">
          <Icon name="check" size={26} />
        </span>
        <h3 className="card-title">¡Gracias, {summary.name}! Recibimos tu solicitud.</h3>
        <p className="card-text">
          {summary.service} · {formatDate(summary.date)} · {formatTime(summary.time)}
        </p>
        <p className="card-text">Te contactaremos por teléfono o WhatsApp para confirmar tu cita.</p>
        {demo && (
          <p className="card-text">
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

  return (
    <form
      className="booking-form"
      noValidate
      onSubmit={onSubmit}
      onChange={(event) => clearError((event.nativeEvent.target as HTMLInputElement).name)}
      aria-labelledby="cita-titulo"
    >
      <h3 ref={titleRef} id="cita-titulo" className="booking-form__title" tabIndex={-1}>
        Solicita tu cita
      </h3>
      <p className="booking-form__note">
        Los campos con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios.
      </p>

      <div className="form-grid">
        <Field name="name" label="Nombre completo" required error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={80} required />
        </Field>

        <Field name="phone" label="Teléfono o WhatsApp" required error={errors.phone}>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={20} required />
        </Field>

        <Field name="email" label="Correo electrónico" error={errors.email}>
          <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={120} />
        </Field>

        <Field name="service" label="Servicio de interés" required error={errors.service}>
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

        <Field name="time" label="Horario preferido" required error={errors.time}>
          <select {...fieldProps('time')} defaultValue="" required>
            <option value="" disabled>
              Selecciona un horario
            </option>
            {BOOKING.slots.map((slot) => (
              <option key={slot} value={slot}>
                {formatTime(slot)}
              </option>
            ))}
          </select>
        </Field>
      </div>

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

      <Field name="comments" label="Comentarios" hint="Cuéntanos brevemente el motivo de tu visita.">
        <textarea id="cita-comments" name="comments" rows={3} maxLength={500} aria-describedby="cita-comments-ayuda" />
      </Field>

      {/* Trampa anti-spam: oculta para personas; si se llena, la solicitud se descarta. */}
      <div className="hp-field" aria-hidden="true">
        <label>
          Sitio web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
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

      <div className="booking-form__footer">
        <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
          {sending ? 'Enviando…' : 'Solicitar cita'}
          {!sending && <Icon name="arrowRight" size={18} />}
        </button>
        <p className="booking-form__note">La cita queda sujeta a disponibilidad y confirmación.</p>
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
  children: ReactNode
}

function Field({ name, label, required, hint, error, children }: FieldProps) {
  return (
    <div className={cx('field', error && 'has-error')}>
      <label className="field__label" htmlFor={`cita-${name}`}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="field__optional"> (opcional)</span>}
      </label>
      {children}
      {hint && (
        <p id={`cita-${name}-ayuda`} className="field__hint">
          {hint}
        </p>
      )}
      <FieldError name={name} error={error} />
    </div>
  )
}
