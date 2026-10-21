// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /preguntas-frecuentes/ (/en/faq/): aviso de "próximamente" hasta tener las preguntas reales de la clínica.
//
// • Mientras no haya contenido real, NO se muestran las preguntas de src/data/faq.ts (lorem ipsum): se muestra un aviso
//   en el idioma de la página con enlaces a WhatsApp y a la página de contacto. Textos del aviso → src/data/ui.ts (faqSoon).
// • Cuando haya preguntas reales: volver a renderizar FAQ_GROUPS (acordeón <details>) en lugar del aviso.
// • Textos de encabezado y ayuda → src/data/faq.ts (FAQ_PAGE). Estilos → src/styles/pages/faq.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useLang } from '@/app/lang'
import { routeOf } from '@/config/routes'
import { SITE } from '@/config/site'
import { FAQ_PAGE } from '@/data/faq'
import { UI } from '@/data/ui'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

export function FaqPage() {
  const lang = useLang()
  const page = FAQ_PAGE[lang]
  const soon = UI[lang].faqSoon
  return (
    <Band tone="white" className="faq-page band--clip" labelledBy="faq-titulo">
      <div className="container">
        <header className="legal-head">
          <p className="page-eyebrow">{page.eyebrow}</p>
          <h1 id="faq-titulo" className="page-title">
            {page.title}
          </h1>
        </header>

        <div className="faq">
          <div className="faq__groups">
            <section className="faq-group" aria-labelledby="faq-pendiente">
              <h2 id="faq-pendiente" className="faq-group__title">
                {soon.title}
              </h2>
              <p className="section-text">{soon.text}</p>
              <p className="section-cta">
                <a className="btn btn--ghost" href={routeOf('contact', lang).path}>
                  {soon.contact}
                </a>
              </p>
            </section>
          </div>

          <aside className="faq-help" aria-labelledby="faq-ayuda">
            <h2 id="faq-ayuda" className="faq-help__title">
              {page.helpTitle}
            </h2>
            <p className="faq-help__text">{page.helpText}</p>
            <ExternalLink className="btn btn--secondary" href={SITE.social.whatsapp}>
              <Icon name="whatsapp" size={20} />
              {page.helpCta}
            </ExternalLink>
          </aside>
        </div>
      </div>
    </Band>
  )
}
