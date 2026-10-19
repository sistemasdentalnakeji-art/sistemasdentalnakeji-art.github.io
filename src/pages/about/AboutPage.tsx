// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /nosotros/ — historia, misión y visión, y equipo por áreas.
//
// • Historia: línea de tiempo vertical cuya línea se llena con el scroll (inspirada en "Growth Story Timeline" de 21st.dev).
//   Cada tarjeta entra girando desde su lado, su borde se dibuja a mano y el contenido aparece en cascada
//   (inspirado en "Sketchbook Reveal Card" de 21st.dev). Código propio: CSS animation-timeline, sin JS ni librerías.
// • Equipo: tarjetas que voltean al hacer clic, sobre la aurora del hero (ver TeamSection.tsx).
// • Mismo plasma de fondo que /contacto/ (PagePlasma).
// • Textos (provisionales) → src/data/about.ts. Estilos → src/styles/pages/about.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react'
import { ABOUT_INTRO, HISTORY, PURPOSE, VALUES } from '@/data/about'
import { Band } from '@/components/decor/Band'
import { PagePlasma } from '@/components/decor/PagePlasma'
import { Icon } from '@/components/ui/Icon'
import { TeamSection } from '@/pages/about/TeamSection'

export function AboutPage() {
  return (
    <Band tone="white" className="about-page band--clip" labelledBy="nosotros-titulo" decor={<PagePlasma />}>
      <div className="container">
        <header>
          <p className="page-eyebrow">{ABOUT_INTRO.eyebrow}</p>
          <h1 id="nosotros-titulo" className="page-title">
            {ABOUT_INTRO.title}
          </h1>
          <p className="page-lead">{ABOUT_INTRO.lead}</p>
        </header>

        <section className="about-section" aria-labelledby="historia-titulo">
          <h2 id="historia-titulo" className="section-title">
            {HISTORY.title}
          </h2>
          <p className="section-text about-lead">{HISTORY.lead}</p>
          <ol className="timeline" role="list">
            {HISTORY.milestones.map((item) => (
              <li key={item.label} className="timeline__item">
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__card">
                  {/* Borde que se "dibuja" a mano con el scroll (estilo "Sketchbook Reveal Card"). */}
                  <svg className="timeline__sketch" aria-hidden="true" focusable="false">
                    <rect pathLength={1} />
                  </svg>
                  <p className="page-eyebrow timeline__reveal" style={{ '--d': 0 } as CSSProperties}>
                    {item.label}
                  </p>
                  <h3 className="timeline__title timeline__reveal" style={{ '--d': 1 } as CSSProperties}>
                    {item.title}
                  </h3>
                  <p className="timeline__text timeline__reveal" style={{ '--d': 2 } as CSSProperties}>
                    {item.text}
                  </p>
                  {/* Espacio para la foto: vacío por ahora (como la foto de recepción de /beneficios/). Para añadirla, pon dentro de
                      .timeline__frame un <img className="timeline__image" src="/images/nosotros/…" width={…} height={…} alt="…" />. */}
                  {/* La animación va en el envoltorio: un filter/transform en .siri pondría su resplandor sobre el fondo. */}
                  {item.photo && (
                    <div className="timeline__reveal" style={{ '--d': 3 } as CSSProperties}>
                      <div className="timeline__photo siri">
                        <div className="timeline__frame" />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-section" aria-label="Misión y visión">
          <ul className="purpose">
            {PURPOSE.map((item) => (
              <li key={item.id} className={`purpose__card purpose__card--${item.id}`}>
                <span className="icon-badge purpose__icon siri">
                  <Icon name={item.icon} size={24} />
                </span>
                <h2 className="purpose__title">{item.title}</h2>
                <p className="purpose__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-section" aria-labelledby="valores-titulo">
          <h2 id="valores-titulo" className="section-title">
            {VALUES.title}
          </h2>
          <p className="section-text about-lead">{VALUES.lead}</p>
          <ul className="values">
            {VALUES.items.map((item) => (
              <li key={item.id} className="value-card">
                <span className="icon-badge value-card__icon siri">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="value-card__title">{item.title}</h3>
                <p className="value-card__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <TeamSection />
      </div>
    </Band>
  )
}
