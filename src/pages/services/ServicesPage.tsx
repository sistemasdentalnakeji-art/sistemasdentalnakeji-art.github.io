import { LiquidMetalArrow } from '@/components/ui/AnimatedButtons'
// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /servicios/: servicios agrupados en 5 categorías (h2) con riel a la izquierda y tarjetas (h3) a la derecha.
//
// Cada tarjeta: icono con contorno luminoso (.siri), título, tres puntos y un solo botón-enlace ("Ver servicio" + flecha), que es
// lo único clicable. Al pasar el cursor, un degradado con movimiento llena el fondo.
// • Categorías e intros → src/data/servicesCatalog.ts; contenido de cada servicio → src/data/services.ts.
// • Estilos → src/styles/pages/services-index.css (contorno Siri: styles/components/siri.css).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { useLang } from '@/app/lang'
import { CATALOG_CTA, CATALOG_GROUPS, CATALOG_HERO, type CatalogService } from '@/data/servicesCatalog'
import { SHOWCASE_LABEL, SHOWCASE_PHOTOS } from '@/data/servicesShowcase'
import { Band } from '@/components/decor/Band'
import { PlasmaBackground } from '@/components/decor/PlasmaBackground'
import { Icon } from '@/components/ui/Icon'
import { SpinShutter } from '@/components/ui/SpinShutter'

// Un solo enlace por tarjeta: el botón del pie (texto + flecha).
function CatalogCard({ service }: { service: CatalogService }) {
  const cta = CATALOG_CTA[useLang()]
  return (
    <article className="catalog-card">
      <span className="catalog-card__glow" aria-hidden="true" />
      <div className="catalog-card__top">
        <div className="catalog-card__head">
          <span className="icon-badge catalog-card__icon siri">
            <Icon name={service.icon} size={26} />
          </span>
          <h3 className="catalog-card__title">{service.title}</h3>
        </div>
        <ul className="catalog-card__highlights">
          {service.highlights.map((highlight) => (
            <li key={highlight}>
              <Icon name="check" size={19} />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="catalog-card__footer">
        <a className="catalog-card__button" href={service.href}>
          <span className="catalog-card__cta">{cta}</span>
          <span className="catalog-card__arrow liquid-metal">
            <LiquidMetalArrow />
          </span>
          <span className="visually-hidden">: {service.title}</span>
        </a>
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
  // Celular con cartas apiladas (sticky): el ancla nativa no las alcanza, así que se calcula dónde empieza la carta en el flujo
  // (suma de las anteriores) y se deja justo bajo el encabezado.
  if (deck && deck.dataset.stack !== undefined) {
    event.preventDefault()
    const cards = [...deck.querySelectorAll<HTMLElement>('.catalog-group')]
    const before = cards.slice(0, index).reduce((sum, card) => sum + card.offsetHeight + parseFloat(getComputedStyle(card).marginTop), 0)
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 75
    window.scrollTo({ top: deck.getBoundingClientRect().top + window.scrollY + before - header - 12, behavior: 'smooth' })
    document.getElementById(`${CATALOG_GROUPS.en[index].id}-titulo`)?.focus({ preventScroll: true })
    return
  }
  const max = deck ? deck.scrollHeight - deck.clientHeight : 0
  if (!deck || max <= 1) return
  event.preventDefault()
  deck.scrollIntoView({ block: 'center', behavior: 'smooth' })
  // Los ids y la cantidad de categorías son los mismos en ambos idiomas.
  deck.scrollTo({ top: (max / (CATALOG_GROUPS.en.length - 1)) * index, behavior: 'smooth' })
  // Lleva también el foco a la categoría (sin mover el scroll): el siguiente Tab sigue desde ahí y no desde el índice.
  document.getElementById(`${CATALOG_GROUPS.en[index].id}-titulo`)?.focus({ preventScroll: true })
}

export function ServicesPage() {
  const lang = useLang()
  const groups = CATALOG_GROUPS[lang]
  const hero = CATALOG_HERO[lang]
  // Categoría de la carta que se ve en la ventana (la carta i queda a i/4 del scroll máximo): su número del índice va en amarillo.
  // Sin apilado (celular, "reducir movimiento") la ventana no tiene scroll y no se marca ninguna.
  const [active, setActive] = useState<number | null>(null)
  useEffect(() => {
    const deck = document.querySelector<HTMLElement>('.catalog-groups')
    if (!deck) return
    const onScroll = () => {
      const max = deck.scrollHeight - deck.clientHeight
      if (max > 1) setActive(Math.round((deck.scrollTop / max) * (CATALOG_GROUPS.en.length - 1)))
    }
    deck.addEventListener('scroll', onScroll, { passive: true })
    return () => deck.removeEventListener('scroll', onScroll)
  }, [])

  // Celular: las categorías se apilan con el scroll de la página (misma idea que la ventana de escritorio). Una carta más alta que la
  // pantalla no puede fijarse por arriba (quedaría cortada), así que se fija por abajo: top = min(posición en la pila, pantalla - alto).
  // Aquí se mide cada carta y se escriben sus variables (--top, --span, --cut, --scale-m); el CSS hace el resto (services-index.css).
  useEffect(() => {
    const deck = document.querySelector<HTMLElement>('.catalog-groups')
    if (!deck) return
    const cards = [...deck.querySelectorAll<HTMLElement>('.catalog-group')]
    const media = window.matchMedia('(max-width: 899.98px) and (prefers-reduced-motion: no-preference)')
    const probe = document.createElement('div') // 100svh en píxeles, estable aunque la barra del navegador suba o baje
    probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;height:100svh'
    document.body.append(probe)
    const STEP = 14 // desfase entre cartas apiladas
    const GAP = 12 // aire bajo una carta alta fijada por abajo
    const layout = () => {
      if (!media.matches) {
        delete deck.dataset.stack
        return
      }
      const vh = probe.offsetHeight
      const stack = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 75) + 12
      const heights = cards.map((card) => card.offsetHeight)
      const tops = heights.map((h, i) => Math.min(stack + i * STEP, vh - h - GAP))
      cards.forEach((card, i) => {
        const scale = 1 - (cards.length - i) * 0.03
        card.style.setProperty('--scale-m', String(scale))
        card.style.setProperty('--top', `${tops[i]}px`)
        if (i === cards.length - 1) return
        // Recorrido de la carta siguiente hasta quedar fija, y recorte de abajo para que esta no asome bajo una carta siguiente más baja.
        card.style.setProperty('--span', `${vh - tops[i + 1]}px`)
        const cut = heights[i] - (tops[i + 1] + heights[i + 1] - tops[i] - 6) / scale
        card.style.setProperty('--cut', `${Math.max(0, cut)}px`)
      })
      deck.dataset.stack = ''
    }
    layout()
    const observer = new ResizeObserver(layout)
    cards.forEach((card) => observer.observe(card))
    media.addEventListener('change', layout)
    window.addEventListener('resize', layout)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', layout)
      window.removeEventListener('resize', layout)
      probe.remove()
    }
  }, [lang])

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
            <p className="catalog-hero__eyebrow pill-label">{hero.eyebrow}</p>
            <h1 id="servicios-titulo" className="catalog-hero__title">
              {hero.titleLead} <span className="catalog-hero__accent">{hero.titleAccent}</span>
            </h1>
            <p className="catalog-hero__lead">{hero.lead}</p>
            <ul className="catalog-hero__features">
              {hero.features.map((feature) => (
                <li key={feature.text}>
                  <Icon name={feature.icon} size={18} />
                  {feature.text}
                </li>
              ))}
            </ul>

            {/* Índice: un enlace numerado por categoría (lleva a su carta). */}
            <nav className="catalog-hero__index" aria-label={hero.indexLabel}>
              <p className="catalog-hero__index-label">{hero.indexLabel}</p>
              <ol>
                {groups.map((group, index) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      aria-current={active === index ? 'true' : undefined}
                      onClick={(event) => goToCategory(event, index)}
                    >
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
              src={hero.photo.src}
              width={hero.photo.width}
              height={hero.photo.height}
              alt={hero.photo.alt}
              fetchPriority="high"
            />
          </figure>
        </header>

        {/* Dos secciones lado a lado en pantallas anchas: las cartas de categorías (1) y el Spin Shutter (2); en pantallas menores, una bajo la otra. */}
        <div className="catalog-split">
        {/* Cada categoría es una "carta": en escritorio quedan apiladas y, con el scroll, la siguiente sube y cubre a la anterior (solo CSS). */}
        <div className="catalog-groups">
          {groups.map((group, index) => (
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
                  '--scale': 1 - (groups.length - index) * 0.05,
                } as CSSProperties
              }
            >
              <div className="catalog-group__rail">
                <h2 id={`${group.id}-titulo`} className="catalog-group__title" tabIndex={-1}>
                  {group.title}
                </h2>
                <p className="catalog-group__intro">{group.intro}</p>
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
          <SpinShutter photos={SHOWCASE_PHOTOS[lang]} label={SHOWCASE_LABEL[lang]} />
        </div>
        </div>
      </div>
    </Band>
  )
}
