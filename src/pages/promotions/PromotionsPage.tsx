// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /nuestras-promociones/ — diseño "Carteles": encabezado grande y un carrusel de carteles (contorno azul marino
// grueso, sombra sólida, numeral, espacio de imagen vacío y la etiqueta "Próximamente") que se controla a mano.
//
// • Sin fondo propio (el fondo de las páginas se define después). Sin autoplay: usa el `Carousel` de scroll-snap.
// • Todo es marcador: no hay promociones, precios ni fechas confirmados → src/data/benefitPages.ts.
// • Estilos → src/styles/pages/promotions.css.
// ─────────────────────────────────────────────────────────────────────────────

import { BENEFITS_BACK, PAGE_CTA, PROMOTIONS, PROMOTIONS_INTRO, type PromoPoster } from '@/data/benefitPages'
import { PARTNERS_CTA } from '@/data/partners'
import { BENEFITS } from '@/config/routes'
import { Band } from '@/components/decor/Band'
import { Carousel } from '@/components/ui/Carousel'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

function Poster({ promo, index }: { promo: PromoPoster; index: number }) {
  return (
    <article className="promo">
      <div className="promo__top">
        <span className="promo__num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="promo__badge">{promo.badge}</span>
      </div>
      {/* Espacio para la imagen de la promoción: vacío por ahora. */}
      <div className="promo__media" aria-hidden="true">
        <Icon name="sparkle" size={36} />
      </div>
      <h2 className="promo__title">{promo.name}</h2>
      <p className="promo__period">{promo.period}</p>
    </article>
  )
}

export function PromotionsPage() {
  return (
    <Band tone="white" className="promotions" labelledBy="promociones-titulo">
      <div className="container">
        <a className="page-back" href={BENEFITS.path}>
          <Icon name="chevronLeft" size={16} />
          {BENEFITS_BACK}
        </a>
        <header className="promotions__head">
          <p className="page-eyebrow">{PROMOTIONS_INTRO.eyebrow}</p>
          <h1 id="promociones-titulo" className="page-title">
            {PROMOTIONS_INTRO.title}
          </h1>
          <p className="page-lead">{PROMOTIONS_INTRO.lead}</p>
        </header>

        <Carousel
          className="carousel--promos"
          label="Promociones"
          items={PROMOTIONS.map((promo, index) => (
            <Poster key={promo.name} promo={promo} index={index} />
          ))}
        />

        <div className="page-cta">
          <ExternalLink className="btn btn--secondary" href={PARTNERS_CTA.href}>
            <Icon name="whatsapp" size={20} />
            {PAGE_CTA}
          </ExternalLink>
        </div>
      </div>
    </Band>
  )
}
