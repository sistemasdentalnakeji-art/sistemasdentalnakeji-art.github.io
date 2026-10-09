// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "AGENDA TU VISITA" (id="agendar"; el botón "Agendar visita" baja hasta aquí)
//
// Izquierda: título, pasos y alternativa por WhatsApp/teléfono. Derecha: formulario de citas.
// • Textos → src/data/home.ts (SCHEDULE).
// • Formulario → src/features/booking/BookingForm.tsx (horarios en src/config/booking.ts).
// • Estilos → src/styles/pages/home/schedule.css.
// ─────────────────────────────────────────────────────────────────────────────

import { SCHEDULE_ANCHOR } from '@/config/routes'
import { SITE } from '@/config/site'
import { SCHEDULE } from '@/data/home'
import { BookingForm } from '@/features/booking/BookingForm'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { SectionIntro } from '@/components/ui/SectionIntro'

interface ScheduleProps {
  /** Servicio preseleccionado en el formulario (se usa en las páginas de servicio). */
  service?: string
}

/** También es la sección 3 de las páginas de servicio (src/pages/service/ServicePage.tsx). */
export function Schedule({ service }: ScheduleProps) {
  return (
    <Band id={SCHEDULE_ANCHOR} tone="white" labelledBy="agendar-titulo" waveTop="plain" flow="schedule">
      <div className="container">
        <div className="schedule">
          <div className="schedule__intro">
            <SectionIntro icon="calendar" id="agendar-titulo" title={SCHEDULE.title} text={SCHEDULE.text} />

            <ol className="steps">
              {SCHEDULE.steps.map((step, index) => (
                <li key={step} className="steps__item">
                  <span className="steps__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="schedule__alt">
              <p className="schedule__alt-title">{SCHEDULE.alternative}</p>
              <div className="schedule__alt-actions">
                <ExternalLink className="btn btn--secondary" href={SITE.social.whatsapp}>
                  <Icon name="whatsapp" size={20} />
                  {SCHEDULE.whatsappCta}
                </ExternalLink>
                <a className="text-link" href={SITE.phones[0].href}>
                  <Icon name="phone" size={18} />
                  Llamar al {SITE.phones[0].display}
                </a>
              </div>
            </div>
          </div>

          <div className="schedule__form">
            <BookingForm defaultService={service} />
          </div>
        </div>
      </div>
    </Band>
  )
}
