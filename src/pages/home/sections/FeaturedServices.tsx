// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "SERVICIOS DESTACADOS": tarjetas con enlace a cada servicio + botón "Ver todos".
//
// • Tarjetas (título, descripción, ícono, enlace) → src/data/featuredServices.ts.
// • Título y texto de la sección → src/data/home.ts (SERVICES_SECTION).
// • Estilos → src/styles/pages/home/services.css.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICES } from '@/config/routes'
import { FEATURED_SERVICES } from '@/data/featuredServices'
import { SERVICES_SECTION } from '@/data/home'
import { Icon } from '@/components/ui/Icon'
import { Band } from '@/components/decor/Band'
import { SectionDecor } from '@/components/decor/SectionDecor'

export function FeaturedServices() {
  return (
    <Band tone="tint" labelledBy="servicios-titulo" waveTop="flip" decor={<SectionDecor variant="arcs" />}>
      <div className="container">
        <header className="section-head">
          <h2 id="servicios-titulo" className="section-title">
            {SERVICES_SECTION.title}
          </h2>
          <p className="section-text">{SERVICES_SECTION.text}</p>
        </header>

        <ul className="service-grid">
          {FEATURED_SERVICES.map((service) => (
            <li key={service.href}>
              <article className="card service-card">
                <span className="icon-badge">
                  <Icon name={service.icon} size={24} />
                </span>
                <div className="service-card__body">
                  <h3 className="card-title">
                    <a className="service-card__link" href={service.href}>
                      {service.title}
                    </a>
                  </h3>
                  <p className="card-text">{service.description}</p>
                </div>
                <Icon name="arrowRight" size={20} className="service-card__arrow" />
              </article>
            </li>
          ))}
        </ul>

        <div className="section-cta">
          <a className="btn btn--secondary" href={SERVICES.path}>
            {SERVICES_SECTION.cta}
            <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </div>
    </Band>
  )
}
