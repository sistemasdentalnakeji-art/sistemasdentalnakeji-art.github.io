// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /servicios/: todos los servicios como tarjetas (filas de 4 en escritorio).
//
// Cada tarjeta: icono con contorno luminoso (clase .siri) + título y texto arriba; abajo "Conocer más del
// servicio" y un botón redondo, que es lo único clicable (lleva a la página del servicio).
// Al pasar el cursor por la tarjeta, un degradado de color con movimiento llena el fondo.
// • Servicios, orden y textos → src/data/servicesCatalog.ts.
// • Estilos → src/styles/pages/services-index.css (contorno Siri: styles/components/siri.css).
// ─────────────────────────────────────────────────────────────────────────────

import { CATALOG, CATALOG_HERO, CATALOG_SECTION, type CatalogService } from '@/data/servicesCatalog'
import { Band } from '@/components/decor/Band'
import { PlasmaBackground } from '@/components/decor/PlasmaBackground'
import { Icon } from '@/components/ui/Icon'

function CatalogCard({ service }: { service: CatalogService }) {
  return (
    <article className="catalog-card">
      <span className="catalog-card__glow" aria-hidden="true" />
      <div className="catalog-card__top">
        <div className="catalog-card__head">
          <span className="icon-badge catalog-card__icon siri">
            <Icon name={service.icon} size={26} />
          </span>
          <h2 className="catalog-card__title">{service.title}</h2>
        </div>
        <p className="catalog-card__text">{service.text}</p>
      </div>
      <div className="catalog-card__footer">
        {/* El texto visible lo repite el nombre accesible del botón (aria-label). */}
        <span className="catalog-card__cta" aria-hidden="true">
          {CATALOG_SECTION.cta}
        </span>
        <a className="catalog-card__arrow" href={service.href} aria-label={`${CATALOG_SECTION.cta}: ${service.title}`}>
          <Icon name="arrowRight" size={20} />
        </a>
      </div>
    </article>
  )
}

export function ServicesPage() {
  return (
    <Band
      tone="white"
      className="catalog"
      labelledBy="servicios-titulo"
      decor={
        <div className="catalog__plasma">
          <PlasmaBackground
            className="catalog__plasma-view"
            color="#7bc3eb"
            opacity={0.5}
            scale={0.6}
            speed={1.4}
            iterations={45}
            renderScale={0.4}
            targetFps={30}
          />
        </div>
      }
    >
      <div className="container">
        <header className="catalog-hero">
          <div className="catalog-hero__text">
            <p className="catalog-hero__eyebrow">{CATALOG_HERO.eyebrow}</p>
            <h1 id="servicios-titulo" className="catalog-hero__title">
              {CATALOG_HERO.titleLead} <span className="catalog-hero__accent">{CATALOG_HERO.titleAccent}</span>
            </h1>
            <p className="catalog-hero__lead">{CATALOG_HERO.lead}</p>
            <ul className="catalog-hero__features">
              {CATALOG_HERO.features.map((feature) => (
                <li key={feature.text}>
                  <span className="catalog-hero__feature-icon">
                    <Icon name={feature.icon} size={22} />
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Espacio para la foto: vacío por ahora. Para añadirla, pon dentro de este div
              <img className="catalog-hero__image" src="/images/servicios/…" width={…} height={…} alt="" />
              (decorativa; si la foto aporta información, escribe su alt). */}
          <div className="catalog-hero__photo">
            <div className="catalog-hero__card">
              <div>
                <p className="catalog-hero__card-title">{CATALOG_HERO.card.title}</p>
                <p className="catalog-hero__card-text">{CATALOG_HERO.card.text}</p>
              </div>
              <span className="catalog-hero__card-icon" aria-hidden="true">
                <Icon name="tooth" size={22} />
              </span>
              <span className="catalog-hero__card-line" aria-hidden="true" />
            </div>
          </div>
        </header>

        <ul className="catalog-grid">
          {CATALOG.map((service) => (
            <li key={service.href}>
              <CatalogCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </Band>
  )
}
