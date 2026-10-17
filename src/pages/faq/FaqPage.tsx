// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /preguntas-frecuentes/ — acordeón por grupos.
//
// • Cada pregunta es un <details>/<summary> nativo: se abre y cierra con clic, Enter o Espacio, sin JS.
// • Píldora de proximidad (inspirada en "Proximity Accordion" de 21st.dev, código propio): con el mouse, una píldora
//   azul claro se desliza detrás de la pregunta más cercana al cursor. Un pointermove en la lista escribe --pill-y/--pill-h;
//   nada se vuelve a renderizar. Sin efecto en táctil.
// • Textos (lorem ipsum) → src/data/faq.ts. Estilos → src/styles/pages/faq.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { PointerEvent } from 'react'
import { SITE } from '@/config/site'
import { FAQ_GROUPS, FAQ_PAGE } from '@/data/faq'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

function movePill(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const list = event.currentTarget
  const row = (event.target as HTMLElement).closest<HTMLElement>('.faq-item')
  if (!row) return
  // Solo cubre la pregunta (<summary>): su alto no cambia al abrir o cerrar, así la píldora no queda desfasada tras un clic.
  list.style.setProperty('--pill-y', `${row.offsetTop}px`)
  list.style.setProperty('--pill-h', `${(row.firstElementChild as HTMLElement).offsetHeight}px`)
  list.dataset.pill = 'on'
}

function hidePill(event: PointerEvent<HTMLDivElement>) {
  delete event.currentTarget.dataset.pill
}

export function FaqPage() {
  return (
    <Band tone="white" className="faq-page band--clip" labelledBy="faq-titulo">
      <div className="container">
        <header className="legal-head">
          <p className="page-eyebrow">{FAQ_PAGE.eyebrow}</p>
          <h1 id="faq-titulo" className="page-title">
            {FAQ_PAGE.title}
          </h1>
          <p className="page-lead">{FAQ_PAGE.lead}</p>
        </header>

        <div className="faq">
          <div className="faq__groups">
            {FAQ_GROUPS.map((group) => (
              <section key={group.id} className="faq-group">
                <h2 className="faq-group__title">
                  {group.title}
                </h2>
                <div className="faq-list" onPointerMove={movePill} onPointerLeave={hidePill}>
                  <span className="faq-list__pill" aria-hidden="true" />
                  {group.items.map((item) => (
                    <details key={item.question} className="faq-item">
                      <summary className="faq-item__q">
                        <span>{item.question}</span>
                        <span className="faq-item__icon" aria-hidden="true" />
                      </summary>
                      <p className="faq-item__a">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="faq-help" aria-labelledby="faq-ayuda">
            <h2 id="faq-ayuda" className="faq-help__title">
              {FAQ_PAGE.helpTitle}
            </h2>
            <p className="faq-help__text">{FAQ_PAGE.helpText}</p>
            <ExternalLink className="btn btn--secondary" href={SITE.social.whatsapp}>
              <Icon name="whatsapp" size={20} />
              {FAQ_PAGE.helpCta}
            </ExternalLink>
          </aside>
        </div>
      </div>
    </Band>
  )
}
