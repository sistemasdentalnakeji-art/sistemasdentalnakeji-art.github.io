// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "SERVICIOS DESTACADOS": carrusel de los 6 servicios más solicitados + botón "Ver todos".
//
// • Servicios y contenido de cada tarjeta (salen del hero de cada página de servicio) → src/data/featuredServices.ts.
// • Título y texto de la sección → src/data/home.ts (SERVICES_SECTION).
// • Carrusel: el mismo de Reseñas (src/components/ui/Carousel.tsx, scroll-snap): una tarjeta completa por vista en celular,
//   2 desde 700 px y 3 desde 1100 px, sin que asome la siguiente; botones centrados debajo y sin autoplay.
// • Tarjeta: foto arriba con la etiqueta "Más solicitado" y el icono encima, y debajo título, gancho, 3 frases y botón.
// • Estilos → src/styles/pages/home/services.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react'
import { SERVICES } from '@/config/routes'
import { FEATURED_BADGE, FEATURED_ITEMS, type FeaturedItem } from '@/data/featuredServices'
import { SERVICES_SECTION } from '@/data/home'
import { Band } from '@/components/decor/Band'
import { Carousel } from '@/components/ui/Carousel'
import { Icon } from '@/components/ui/Icon'

/** Encuadre y espejo de la foto (`cardPosition` ajusta el encuadre en la tarjeta; `flip` solo en Ortodoncia). */
function photoStyle(image: NonNullable<FeaturedItem['image']>): CSSProperties {
  return { objectPosition: image.cardPosition ?? image.position, transform: image.flip ? 'scaleX(-1)' : undefined }
}

function ServiceCard({ item }: { item: FeaturedItem }) {
  const { image } = item
  return (
    <article className="card service-card">
      {/* Foto del servicio (data/services.ts → image); sin foto queda el degradado de marca. */}
      <div className="service-card__media">
        {image && (
          // La tarjeta mide ~1/3 del contenedor: el navegador toma la miniatura de 720 px (public/images/servicios/spin/,
          // mismo nombre y encuadre 16:9) salvo en pantallas de alta densidad.
          // shortcut: supone que cada servicio destacado tiene miniatura en spin/ (hoy los 6 la tienen); si no, se pierde la foto.
          <img
            src={image.src}
            srcSet={`${image.src.replace('/servicios/', '/servicios/spin/')} 720w, ${image.src} ${image.width}w`}
            sizes="(min-width: 1100px) 400px, (min-width: 700px) 50vw, 100vw"
            width={image.width}
            height={image.height}
            alt=""
            loading="lazy"
            decoding="async"
            style={photoStyle(image)}
          />
        )}
        <p className="service-card__badge">{FEATURED_BADGE}</p>
        <span className="icon-badge service-card__icon siri" aria-hidden="true">
          <Icon name={item.icon} size={28} />
        </span>
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{item.title}</h3>
        <p className="service-card__text">{item.text}</p>

        <ul className="service-card__list">
          {item.bullets.map((bullet) => (
            <li key={bullet}>
              <span className="service-card__check" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <a className="service-card__cta" href={item.href}>
          Conocer más del servicio
          <span className="service-card__arrow" aria-hidden="true">
            <Icon name="arrowRight" size={20} />
          </span>
          <span className="visually-hidden">: {item.title}</span>
        </a>
      </div>
    </article>
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

        <Carousel
          label="Servicios más solicitados"
          className="carousel--services"
          items={FEATURED_ITEMS.map((item) => (
            <ServiceCard item={item} />
          ))}
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
