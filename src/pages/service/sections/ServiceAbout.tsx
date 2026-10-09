// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN 2 DE SERVICIO: información breve + espacio para una animación 3D
//
// Izquierda: subtítulo, descripción y botón al artículo del blog.
// Derecha: contenedor vacío de medidas fijas donde se integrará la animación 3D.
// • Textos y enlace al blog → src/data/services.ts (about, blogHref).
// • Estilos → src/styles/pages/service.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { ServiceContent } from '@/data/services'
import { Band } from '@/components/decor/Band'
import { Icon } from '@/components/ui/Icon'

interface ServiceAboutProps {
  content: ServiceContent
}

export function ServiceAbout({ content }: ServiceAboutProps) {
  return (
    <Band tone="tint" labelledBy="servicio-info-titulo">
      <div className="container">
        <div className="service-about">
          <div className="service-about__text">
            <p className="service-about__eyebrow">Acerca del tratamiento</p>
            <h2 id="servicio-info-titulo" className="section-title">
              {content.about.title}
            </h2>
            <p className="section-text">{content.about.text}</p>
            <a className="btn btn--primary service-about__cta" href={content.blogHref}>
              Conocer más sobre este tratamiento
              <Icon name="arrowRight" size={18} />
            </a>
          </div>

          <div className="service-about__media" aria-hidden="true">
            {/* PUNTO DE INTEGRACIÓN: animación 3D del tratamiento (p. ej. un componente con WebGL/Three.js).
                El contenedor ya tiene medidas fijas en service.css (.service-about__media); dibuja la animación
                a 100 % de ancho y alto. Si la animación transmite información, quita aria-hidden. */}
          </div>
        </div>
      </div>
    </Band>
  )
}
