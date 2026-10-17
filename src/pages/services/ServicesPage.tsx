// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /servicios/: servicios agrupados en 5 categorías (h2) con riel a la izquierda y tarjetas (h3) a la derecha.
//
// Cada tarjeta: icono con contorno luminoso (.siri), título-enlace estirado a
// toda la tarjeta, texto y "Ver servicio" con flecha decorativa. Al pasar el cursor, un degradado con movimiento llena el fondo.
// • Categorías, servicios, intros y textos → src/data/servicesCatalog.ts.
// • Estilos → src/styles/pages/services-index.css (contorno Siri: styles/components/siri.css).
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties, MouseEvent } from 'react'
import { CATALOG_CTA, CATALOG_GROUPS, CATALOG_HERO, type CatalogService } from '@/data/servicesCatalog'
import { SHOWCASE_LABEL, SHOWCASE_PHOTOS } from '@/data/servicesShowcase'
import { Band } from '@/components/decor/Band'
import { PlasmaBackground } from '@/components/decor/PlasmaBackground'
import { Icon } from '@/components/ui/Icon'
import { SpinShutter } from '@/components/ui/SpinShutter'

// Un solo enlace por tarjeta (el nombre del servicio), estirado a toda la tarjeta con ::after.
function CatalogCard({ service }: { service: CatalogService }) {
  return (
    <article className="catalog-card">
      <span className="catalog-card__glow" aria-hidden="true" />
      <div className="catalog-card__top">
        <div className="catalog-card__head">
          <span className="icon-badge catalog-card__icon siri">
            <Icon name={service.icon} size={26} />
          </span>
          <h3 className="catalog-card__title">
            <a className="catalog-card__link" href={service.href}>
              {service.title}
            </a>
          </h3>
        </div>
        <p className="catalog-card__text">{service.text}</p>
      </div>
      <div className="catalog-card__footer" aria-hidden="true">
        <span className="catalog-card__cta">{CATALOG_CTA}</span>
        <span className="catalog-card__arrow">
          <Icon name="arrowRight" size={20} />
        </span>
      </div>
    </article>
  )
}

/**
 * Índice de categorías: con el apilado activo la ventana de cartas tiene su propio scroll, así que un ancla normal solo funciona
 * una vez. Aquí se lleva la ventana (scroll suave) hasta la carta elegida, hacia delante o hacia atrás, y la animación se recorre
 * igual que con la rueda. El scroll máximo de la ventana deja justo las 5 cartas puestas: la carta i queda a i/4 de ese recorrido.
 * Sin apilado (celular, "reducir movimiento") la ventana no tiene scroll y se deja el ancla normal.
 */
function goToCategory(event: MouseEvent<HTMLAnchorElement>, index: number) {
  const deck = document.querySelector<HTMLElement>('.catalog-groups')
  const max = deck ? deck.scrollHeight - deck.clientHeight : 0
  if (!deck || max <= 1) return
  event.preventDefault()
  deck.scrollIntoView({ block: 'center', behavior: 'smooth' })
  deck.scrollTo({ top: (max / (CATALOG_GROUPS.length - 1)) * index, behavior: 'smooth' })
  // Lleva también el foco a la categoría (sin mover el scroll): el siguiente Tab sigue desde ahí y no desde el índice.
  document.getElementById(`${CATALOG_GROUPS[index].id}-titulo`)?.focus({ preventScroll: true })
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
            maxDpr={1}
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
                  <Icon name={feature.icon} size={18} />
                  {feature.text}
                </li>
              ))}
            </ul>

            {/* Índice: un enlace numerado por categoría (lleva a su carta). */}
            <nav className="catalog-hero__index" aria-label={CATALOG_HERO.indexLabel}>
              <p className="catalog-hero__index-label">{CATALOG_HERO.indexLabel}</p>
              <ol>
                {CATALOG_GROUPS.map((group, index) => (
                  <li key={group.id}>
                    <a href={`#${group.id}`} onClick={(event) => goToCategory(event, index)}>
                      {group.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Foto del laboratorio, sola, con el contorno luminoso azul (.siri). */}
          <figure className="catalog-hero__photo siri">
            <img
              className="catalog-hero__image"
              src={CATALOG_HERO.photo.src}
              width={CATALOG_HERO.photo.width}
              height={CATALOG_HERO.photo.height}
              alt={CATALOG_HERO.photo.alt}
              fetchPriority="high"
            />
          </figure>
        </header>

        {/* Dos secciones lado a lado en pantallas anchas: las cartas de categorías (1) y el Spin Shutter (2); en pantallas menores, una bajo la otra. */}
        <div className="catalog-split">
        {/* Cada categoría es una "carta": en escritorio quedan apiladas y, con el scroll, la siguiente sube y cubre a la anterior (solo CSS). */}
        <div className="catalog-groups">
          {CATALOG_GROUPS.map((group, index) => (
            <section
              key={group.id}
              id={group.id}
              className="catalog-group"
              aria-labelledby={`${group.id}-titulo`}
              style={
                {
                  '--i': index,
                  '--tl': `--g${index}`,
                  '--tl-next': `--g${index + 1}`,
                  '--scale': 1 - (CATALOG_GROUPS.length - index) * 0.05,
                } as CSSProperties
              }
            >
              <div className="catalog-group__rail">
                <h2 id={`${group.id}-titulo`} className="catalog-group__title" tabIndex={-1}>
                  {group.title}
                </h2>
                <p className="catalog-group__intro">{group.intro}</p>
                <p className="catalog-group__body">{group.body}</p>
              </div>
              <ul className="catalog-grid">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <CatalogCard service={service} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="catalog-showcase">
          <SpinShutter photos={SHOWCASE_PHOTOS} label={SHOWCASE_LABEL} />
        </div>
        </div>
      </div>
    </Band>
  )
}
