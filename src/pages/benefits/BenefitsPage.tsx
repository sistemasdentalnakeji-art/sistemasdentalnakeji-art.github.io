// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /beneficios/: encabezado con la idea central y el espacio de la foto de recepción, tres tarjetas
// (promociones, aseguranzas, convenios) y franja de contacto. Estructura parecida a /servicios/, con su propia composición.
//
// • Textos, tarjetas y lista de beneficios → src/data/benefits.ts.
// • Estilos → src/styles/pages/benefits.css. Mismo fondo de plasma que /servicios/.
// ─────────────────────────────────────────────────────────────────────────────

import { BENEFIT_CARDS, BENEFIT_CARDS_CTA, BENEFITS_CTA, BENEFITS_HERO, type BenefitCard } from '@/data/benefits'
import { PARTNERS_CTA } from '@/data/partners'
import { Band } from '@/components/decor/Band'
import { PlasmaBackground } from '@/components/decor/PlasmaBackground'
import { Icon } from '@/components/ui/Icon'

function BenefitCardView({ card }: { card: BenefitCard }) {
  return (
    <article className="benefit-card">
      <div className="benefit-card__top">
        <div className="benefit-card__head">
          <span className="icon-badge benefit-card__icon siri" aria-hidden="true">
            <Icon name={card.icon} size={26} />
          </span>
          <h2 className="benefit-card__title">{card.title}</h2>
        </div>
        {card.badge && <span className="benefit-card__badge">{card.badge}</span>}
        <p className="benefit-card__text">{card.text}</p>
      </div>
      {/* Talón: el contenedor gira al arrancarse; dentro, la pieza con el botón (recortada), su contorno rojo y el doblez. */}
      <div className="benefit-card__stub">
        <div className="benefit-card__footer">
          {/* El texto visible lo repite el nombre accesible del enlace (aria-label). */}
          <span className="benefit-card__cta" aria-hidden="true">
            {BENEFIT_CARDS_CTA}
          </span>
          <a className="benefit-card__arrow" href={card.href} aria-label={`${BENEFIT_CARDS_CTA}: ${card.title}`}>
            <Icon name="arrowRight" size={20} />
          </a>
        </div>
        <span className="benefit-card__outline" aria-hidden="true" />
        <span className="ticket-fold" aria-hidden="true" />
      </div>
    </article>
  )
}

export function BenefitsPage() {
  return (
    <Band
      tone="white"
      className="benefits"
      labelledBy="beneficios-titulo"
      decor={
        <div className="benefits__plasma">
          <PlasmaBackground
            className="benefits__plasma-view"
            color="#7bc3eb"
            opacity={0.5}
            scale={0.6}
            speed={1.4}
            iterations={45}
            renderScale={0.4}
            targetFps={30}
          />
        </div>
      }
    >
      <div className="container">
        <header className="benefits-hero">
          <div className="benefits-hero__text">
            <p className="benefits-hero__eyebrow">{BENEFITS_HERO.eyebrow}</p>
            <h1 id="beneficios-titulo" className="benefits-hero__title">
              <span className="benefits-hero__lead-line">{BENEFITS_HERO.titleLead}</span>{' '}
              <span className="benefits-hero__accent">{BENEFITS_HERO.titleAccent}</span>
            </h1>
            <p className="benefits-hero__lead">{BENEFITS_HERO.lead}</p>
            <ul className="benefits-hero__features">
              {BENEFITS_HERO.features.map((feature) => (
                <li key={feature.text}>
                  <span className="benefits-hero__feature-icon">
                    <Icon name={feature.icon} size={22} />
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Espacio para la foto de recepción: vacío por ahora, con el contorno luminoso (.siri) de los iconos.
              Para añadirla, pon dentro de .benefits-hero__frame
              <img className="benefits-hero__image" src="/images/beneficios/…" width={…} height={…} alt="" />
              (decorativa; si la foto aporta información, escribe su alt). */}
          <div className="benefits-hero__photo siri">
            <div className="benefits-hero__frame" />
          </div>
        </header>

        <ul className="benefit-grid">
          {BENEFIT_CARDS.map((card) => (
            <li key={card.id} className="benefit-grid__item">
              <BenefitCardView card={card} />
            </li>
          ))}
        </ul>

        <div className="benefits-cta">
          <div className="benefits-cta__body">
            <span className="benefits-cta__icon" aria-hidden="true">
              <Icon name="whatsapp" size={28} />
            </span>
            <div>
              <h2 className="benefits-cta__title">{BENEFITS_CTA.title}</h2>
              <p className="benefits-cta__text">{BENEFITS_CTA.text}</p>
            </div>
          </div>
          {/* Talón: el contenedor gira al arrancarse; dentro, la pieza con el botón (recortada), su contorno verde y el doblez. */}
          <div className="benefits-cta__tear">
            <div className="benefits-cta__stub">
              <a className="btn benefits-cta__btn" href={PARTNERS_CTA.href}>
                {BENEFITS_CTA.label}
                <Icon name="arrowRight" size={18} />
              </a>
            </div>
            <span className="benefits-cta__outline" aria-hidden="true" />
            <span className="ticket-fold" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Band>
  )
}
