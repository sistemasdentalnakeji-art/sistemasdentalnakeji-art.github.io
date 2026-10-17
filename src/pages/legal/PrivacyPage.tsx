// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /aviso-de-privacidad/ — documento con índice lateral fijo.
//
// Índice con "marcas" (inspirado en "Table of Content" de 21st.dev, código propio): cada sección tiene una rayita que
// se alarga y se pinta de azul cuando la sección está en pantalla (IntersectionObserver en un efecto; en el HTML
// prerenderizado empieza marcada la primera). Sin JS el índice sigue funcionando como enlaces.
// • Textos (lorem ipsum) → src/data/legal.ts. Estilos → src/styles/pages/legal.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { PRIVACY_PAGE } from '@/data/legal'
import { Band } from '@/components/decor/Band'

export function PrivacyPage() {
  const [active, setActive] = useState(PRIVACY_PAGE.sections[0].id)

  useEffect(() => {
    // La sección activa es la que cruza la franja superior de la pantalla (bajo el header).
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    for (const { id } of PRIVACY_PAGE.sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <Band tone="white" className="legal-page band--clip" labelledBy="privacidad-titulo">
      <div className="container">
        <header className="legal-head">
          <p className="page-eyebrow">{PRIVACY_PAGE.eyebrow}</p>
          <h1 id="privacidad-titulo" className="page-title">
            {PRIVACY_PAGE.title}
          </h1>
          <p className="page-lead">{PRIVACY_PAGE.lead}</p>
          <p className="legal-updated">{PRIVACY_PAGE.updated}</p>
        </header>

        <div className="privacy">
          <nav className="toc" aria-label={PRIVACY_PAGE.tocLabel}>
            <p className="toc__label">{PRIVACY_PAGE.tocLabel}</p>
            <ol className="toc__list" role="list">
              {PRIVACY_PAGE.sections.map((item) => (
                <li key={item.id}>
                  {/* onClick: una sección corta al final quizá nunca cruce la franja del observer. */}
                  <a
                    className="toc__link"
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={() => setActive(item.id)}
                  >
                    <span className="toc__tick" aria-hidden="true" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="privacy__body">
            {PRIVACY_PAGE.sections.map((item, index) => (
              <section key={item.id} id={item.id} className="privacy__section">
                <h2 className="privacy__title">
                  <span className="privacy__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.title}
                </h2>
                {item.paragraphs.map((text, i) => (
                  <p key={i} className="legal-text">
                    {text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Band>
  )
}
