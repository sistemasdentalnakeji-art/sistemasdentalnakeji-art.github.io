// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "SERVICIOS DESTACADOS": carrusel de los 6 servicios más solicitados (de 2 en 2) + botón "Ver todos".
//
// • Servicios y contenido de cada tarjeta (salen del hero de cada página de servicio) → src/data/featuredServices.ts.
// • Título y texto de la sección → src/data/home.ts (SERVICES_SECTION).
// • Carrusel (páginas de 2, tarjetas independientes, botón de pausa y autoplay de 8 s al llegar a la sección)
//   → src/components/ui/ConnectedCarousel.tsx.
// • Estilos → src/styles/pages/home/services.css.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICES } from '@/config/routes'
import { FEATURED_BADGE, FEATURED_ITEMS, type FeaturedItem } from '@/data/featuredServices'
import { SERVICES_SECTION } from '@/data/home'
import { Band } from '@/components/decor/Band'
import { ConnectedCarousel } from '@/components/ui/ConnectedCarousel'
import { Icon } from '@/components/ui/Icon'

function FeaturedCard({ item }: { item: FeaturedItem }) {
  const { image } = item
  return (
    <article className="fc-card">
      <div className="fc-card__body">
        <p className="fc-card__badge">{FEATURED_BADGE}</p>

        <div className="fc-card__head">
          <span className="icon-badge fc-card__icon siri" aria-hidden="true">
            <Icon name={item.icon} size={28} />
          </span>
          <h3 className="fc-card__title">{item.title}</h3>
        </div>

        <p className="fc-card__text">{item.text}</p>

        <ul className="fc-card__list">
          {item.bullets.map((bullet) => (
            <li key={bullet}>
              <span className="fc-card__check" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <a className="fc-card__cta" href={item.href}>
          Conocer más del servicio
          <span className="fc-card__arrow" aria-hidden="true">
            <Icon name="arrowRight" size={20} />
          </span>
          <span className="visually-hidden">: {item.title}</span>
        </a>
      </div>

      {/* Foto del servicio: sale del hero de su página (data/services.ts → image). Sin foto, queda el espacio vacío. */}
      <div className="fc-card__media" aria-hidden="true">
        {image && (
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            loading="lazy"
            decoding="async"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        )}
      </div>
    </article>
  )
}

/** Cara de la tarjeta cuando está colapsada a un costado: foto del servicio (si tiene), icono y nombre en vertical. */
function PeekFace({ item }: { item: FeaturedItem }) {
  const { image } = item
  return (
    <>
      {image && (
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          loading="lazy"
          decoding="async"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      )}
      <span className="fc__peek-icon" aria-hidden="true">
        <Icon name={item.icon} size={24} />
      </span>
      <span className="fc__peek-label" aria-hidden="true">
        {item.title}
      </span>
    </>
  )
}

export function FeaturedServices() {
  return (
    <Band tone="tint" labelledBy="servicios-titulo" waveTop="flip">
      <div className="container">
        <header className="section-head">
          <h2 id="servicios-titulo" className="section-title">
            {SERVICES_SECTION.title}
          </h2>
          <p className="section-text">{SERVICES_SECTION.text}</p>
        </header>

        <ConnectedCarousel
          label="Servicios más solicitados"
          items={FEATURED_ITEMS.map((item) => ({
            id: item.href,
            title: item.title,
            content: <FeaturedCard item={item} />,
            peek: <PeekFace item={item} />,
          }))}
        />

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
