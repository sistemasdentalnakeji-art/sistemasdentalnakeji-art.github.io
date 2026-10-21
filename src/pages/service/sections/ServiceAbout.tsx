// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN 2 DE SERVICIO: información breve del tratamiento.
//
// Subtítulo, descripción y botón al artículo del blog.
// • Textos y enlace al blog → src/data/services.ts (about); el blog es la ruta 'blog' de config/routes.ts.
// • Estilos → src/styles/pages/service.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useLang } from '@/app/lang'
import { routeOf } from '@/config/routes'
import { UI } from '@/data/ui'
import type { ServiceContent } from '@/data/services'
import { Band } from '@/components/decor/Band'
import { InteractiveHoverContent } from '@/components/ui/AnimatedButtons'

interface ServiceAboutProps {
  content: ServiceContent
}

export function ServiceAbout({ content }: ServiceAboutProps) {
  const lang = useLang()
  const ui = UI[lang].service
  return (
    <Band tone="tint" labelledBy="servicio-info-titulo" className="service-about-band">
      <div className="container">
        <div className="service-about">
          <p className="service-about__eyebrow pill-label">{ui.aboutEyebrow}</p>
          <h2 id="servicio-info-titulo" className="section-title">
            {content.about.title}
          </h2>
          <p className="section-text">{content.about.text}</p>
          <a className="btn btn--primary service-about__cta interactive-hover" href={routeOf('blog', lang).path}>
            <InteractiveHoverContent>{ui.blogCta}</InteractiveHoverContent>
          </a>
        </div>
      </div>
    </Band>
  )
}
