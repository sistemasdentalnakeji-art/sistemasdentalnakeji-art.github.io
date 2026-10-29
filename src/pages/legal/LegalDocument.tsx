// ─────────────────────────────────────────────────────────────────────────────
// Documento legal compartido por /aviso-de-privacidad/ y /terminos-y-condiciones/: índice a la izquierda y, a la derecha,
// una carta por sección apilada como en /servicios/ (solo CSS: sticky + animation-timeline: view()).
//
// En escritorio (≥900×760, sin "reducir movimiento") las cartas viven dentro de una ventana con su propio scroll
// (.legal-deck): con la rueda encima, cada carta sube y se fija 18 px más abajo que la anterior, que se encoge. Al terminar la rueda
// sigue con la página (el footer queda debajo, quieto). Una carta con texto largo se lee con su propio scroll interno.
// Fuera de ahí (celular, pantalla baja, reducir movimiento) es una lista normal de cartas.
// • Textos → src/data/legal.ts. Estilos → src/styles/pages/legal.css (el apilado repite el de services-index.css).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import type { LegalBlock, LegalDoc } from '@/data/legal'
import { Band } from '@/components/decor/Band'
import { PagePlasma } from '@/components/decor/PagePlasma'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p className="legal-text">{block}</p>
  if ('h' in block) return <h3 className="legal-card__sub">{block.h}</h3>
  if ('ul' in block) {
    return (
      <ul className="legal-list">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <p className="legal-text">
      {/^https?:/.test(block.href) ? (
        <ExternalLink className="legal-link" href={block.href}>
          {block.link}
        </ExternalLink>
      ) : (
        <a className="legal-link" href={block.href}>
          {block.link}
        </a>
      )}
    </p>
  )
}

export function LegalDocument({ doc, titleId, compact = false }: { doc: LegalDoc; titleId: string; compact?: boolean }) {
  const { sections } = doc
  const [active, setActive] = useState(sections[0].id)
  const [stacked, setStacked] = useState(false)
  // Celular y tableta: sección abierta del menú desplegable (una a la vez; la primera al entrar). En escritorio no se usa.
  const [open, setOpen] = useState<number | null>(0)
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    // Hay apilado cuando la ventana tiene scroll propio (el CSS solo se lo da en escritorio).
    const range = () => deck.scrollHeight - deck.clientHeight
    const resize = new ResizeObserver(() => setStacked(range() > 1))
    resize.observe(deck)
    // Con apilado, la carta activa sale del scroll de la ventana (la carta i queda fija en i/(n-1) del recorrido)...
    const onScroll = () => {
      // Se limita el índice: con el rebote elástico (Safari/iOS) scrollTop puede salirse de 0..range.
      const last = sections.length - 1
      if (range() > 1) setActive(sections[Math.min(last, Math.max(0, Math.round((deck.scrollTop / range()) * last)))].id)
    }
    deck.addEventListener('scroll', onScroll, { passive: true })
    // ...y sin apilado, la que cruza la franja superior de la pantalla (bajo el header).
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit && range() <= 1) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    deck.querySelectorAll('section').forEach((el) => observer.observe(el))
    return () => {
      resize.disconnect()
      deck.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [sections])

  // Con apilado un ancla normal solo funcionaría una vez (la ventana tiene su scroll): se lleva la ventana a la carta elegida.
  function goTo(event: MouseEvent<HTMLAnchorElement>, index: number) {
    setActive(sections[index].id)
    const deck = deckRef.current
    const max = deck ? deck.scrollHeight - deck.clientHeight : 0
    if (!deck || max <= 1) return
    event.preventDefault()
    deck.scrollIntoView({ block: 'center', behavior: 'smooth' })
    deck.scrollTo({ top: (max / (sections.length - 1)) * index, behavior: 'smooth' })
  }

  return (
    <Band tone="gradient" className="legal-page band--clip" decor={<PagePlasma />} labelledBy={titleId}>
      <div className="container">
        <header className="legal-head legal-head--doc">
          <p className="legal-head__eyebrow pill-label">{doc.eyebrow}</p>
          <h1 id={titleId} className="legal-head__title shiny-text">
            {doc.title}
          </h1>
          <p className="legal-head__lead">{doc.lead}</p>
          {doc.updated && (
            <p className="legal-head__date">
              <Icon name="calendar" size={18} />
              {doc.updated}
            </p>
          )}
        </header>

        <div className={compact ? 'legal-doc legal-doc--compact' : 'legal-doc'}>
          <nav className="toc" aria-label={doc.tocLabel}>
            <p className="toc__label">{doc.tocLabel}</p>
            <ol className="toc__list" role="list">
              {sections.map((item, index) => (
                <li key={item.id}>
                  <a
                    className="toc__link"
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={(event) => goTo(event, index)}
                  >
                    <span className="toc__tick" aria-hidden="true" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-deck" ref={deckRef} style={{ '--n': sections.length } as CSSProperties}>
            {sections.map((item, index) => (
              <section
                key={item.id}
                id={item.id}
                className="legal-card"
                data-open={open === index ? '' : undefined}
                aria-labelledby={`${item.id}-titulo`}
                // Las cartas tapadas no se enfocan con el teclado.
                inert={stacked && active !== item.id}
                style={
                  {
                    '--i': index,
                    '--tl': `--lg${index}`,
                    '--tl-next': `--lg${index + 1}`,
                    '--scale': 1 - (sections.length - index) * 0.018,
                  } as CSSProperties
                }
              >
                <header className="legal-card__head">
                  <span className="legal-card__icon" aria-hidden="true">
                    <Icon name={item.icon} size={26} />
                  </span>
                  <h2 id={`${item.id}-titulo`} className="legal-card__title">
                    {item.title}
                  </h2>
                  {/* Solo celular y tableta (en escritorio está oculto): abre y cierra la sección. */}
                  <button
                    type="button"
                    className="legal-card__toggle"
                    aria-expanded={open === index}
                    aria-labelledby={`${item.id}-titulo`}
                    onClick={() => setOpen(open === index ? null : index)}
                  />
                </header>
                {/* Con apilado la carta mide lo mismo que las demás y el texto largo se desplaza por dentro (enfocable para el teclado). */}
                <div className="legal-card__body" tabIndex={stacked ? 0 : undefined}>
                  {item.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Band>
  )
}
