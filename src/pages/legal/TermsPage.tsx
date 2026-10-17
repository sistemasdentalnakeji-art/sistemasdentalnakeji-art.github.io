// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /terminos-y-condiciones/ — artículos numerados con barra de lectura.
//
// Barra de progreso de lectura bajo el header (inspirada en "Privacy Policy Modal" de 21st.dev, código propio):
// CSS animation-timeline: scroll(), sin JS. Cada artículo es una tarjeta con su numeral grande en contorno.
// • Textos (lorem ipsum) → src/data/legal.ts. Estilos → src/styles/pages/legal.css.
// ─────────────────────────────────────────────────────────────────────────────

import { TERMS_PAGE } from '@/data/legal'
import { Band } from '@/components/decor/Band'

export function TermsPage() {
  return (
    <Band tone="white" className="legal-page" labelledBy="terminos-titulo">
      <div className="terms-progress" aria-hidden="true" />
      <div className="container">
        <header className="legal-head">
          <p className="page-eyebrow">{TERMS_PAGE.eyebrow}</p>
          <h1 id="terminos-titulo" className="page-title">
            {TERMS_PAGE.title}
          </h1>
          <p className="page-lead">{TERMS_PAGE.lead}</p>
          <p className="legal-updated">{TERMS_PAGE.updated}</p>
        </header>

        <ol className="terms" role="list">
          {TERMS_PAGE.sections.map((item, index) => (
            <li key={item.id} id={item.id} className="terms__item">
              <span className="terms__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="terms__title">
                  <span className="visually-hidden">Artículo {index + 1}. </span>
                  {item.title}
                </h2>
                {item.paragraphs.map((text, i) => (
                  <p key={i} className="legal-text">
                    {text}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  )
}
