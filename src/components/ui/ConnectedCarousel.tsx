// ─────────────────────────────────────────────────────────────────────────────
// CARRUSEL CONECTADO (inspirado en "Connected Carousel" de 21st.dev; código propio, sin framer-motion)
//
// • Todas las tarjetas están en una misma fila (posición absoluta) y cada una ocupa un "papel" según su lugar:
//   - activas: 2 en escritorio (1 en celular y tableta angosta), grandes y con todo su contenido;
//   - vecinas: una colapsada a cada lado, que muestra solo su icono y nombre (o su foto) y al pulsarla se pasa a esa tarjeta;
//   - lejanas: ocultas fuera de la fila, listas para entrar.
//   Al cambiar de página las tarjetas se MUEVEN y se expanden o colapsan (transiciones CSS de translate/width/height),
//   y el contenido de la activa se revela sin reacomodarse (apertura).
// • Las flechas anterior/siguiente van sobre el borde de las vecinas colapsadas.
// • Autoplay: solo corre con el carrusel a la vista. Se detiene con el cursor encima, con foco de teclado dentro, con el
//   botón de pausa (abajo), con "reducir movimiento" y con "Pausar animaciones" (footer). El avance lo marca el fin de la
//   animación CSS de un elemento invisible (`fc__tick`), así todos esos casos lo pausan solos.
// • Medidas y estilos → src/styles/pages/home/services.css (variables --peek, --gap, --active, --card-h, --peek-h).
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'

const DESKTOP = '(min-width: 900px)'
const REDUCED = '(prefers-reduced-motion: reduce)'
const mod = (value: number, size: number) => ((value % size) + size) % size

/** Lee una media query sin romper el prerender: en el servidor se usa `serverValue`. */
function useMedia(query: string, serverValue: boolean) {
  // `subscribe` estable (solo cambia con la consulta): si no, useSyncExternalStore se volvería a suscribir en cada render.
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

interface ConnectedCarouselItem {
  id: string
  /** Nombre del elemento (para el botón de la tarjeta vecina). */
  title: string
  /** Contenido completo de la tarjeta cuando está activa. */
  content: ReactNode
  /** Cara de la tarjeta cuando está colapsada (icono, nombre, foto…). */
  peek: ReactNode
}

type Role = 'active' | 'peek-left' | 'peek-right' | 'far-left' | 'far-right'

/** Papel y posición de la tarjeta que está `offset` lugares después de la primera activa. */
function place(offset: number, perView: 1 | 2) {
  const activeCount = perView
  let role: Role
  if (offset >= 0 && offset < activeCount) role = 'active'
  else if (offset === -1) role = 'peek-left'
  else if (offset === activeCount) role = 'peek-right'
  else role = offset < 0 ? 'far-left' : 'far-right'

  // Borde izquierdo de cada papel, medido desde el centro de la fila (ver variables en services.css).
  const activeX = perView === 2 ? ['calc(-1 * (var(--active) + var(--gap) / 2))', 'calc(var(--gap) / 2)'] : ['calc(var(--active) / -2)']
  const leftPeekX =
    perView === 2
      ? 'calc(-1 * (var(--active) + var(--gap) * 1.5 + var(--peek)))'
      : 'calc(var(--active) / -2 - var(--gap) - var(--peek))'
  const rightPeekX = perView === 2 ? 'calc(var(--active) + var(--gap) * 1.5)' : 'calc(var(--active) / 2 + var(--gap))'

  const x =
    role === 'active'
      ? activeX[offset]
      : role === 'peek-left'
        ? leftPeekX
        : role === 'peek-right'
          ? rightPeekX
          : role === 'far-left'
            ? `calc(${leftPeekX} - 160px)`
            : `calc(${rightPeekX} + 160px)`

  const isActive = role === 'active'
  const style = {
    '--x': x,
    '--w': isActive ? 'var(--active)' : 'var(--peek)',
    '--h': isActive ? 'var(--card-h)' : 'var(--peek-h)',
    '--o': role.startsWith('far') ? 0 : 1,
  } as CSSProperties

  return { role, style }
}

interface ConnectedCarouselProps {
  /** Nombre accesible del carrusel. */
  label: string
  items: ConnectedCarouselItem[]
  /** Tiempo que dura cada página antes de pasar a la siguiente. */
  autoplayMs?: number
}

export function ConnectedCarousel({ label, items, autoplayMs = 8000 }: ConnectedCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  // `step` crece o decrece sin límite (el índice real sale con módulo): así las tarjetas siempre se mueven en el mismo sentido.
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const perView: 1 | 2 = useMedia(DESKTOP, true) ? 2 : 1
  const reduced = useMedia(REDUCED, false)

  const total = items.length
  const pages = Math.ceil(total / perView)
  const firstIndex = step * perView
  const live = inView && !userPaused && !reduced && pages > 1

  // El autoplay empieza al llegar a la sección (y se detiene al salir).
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const goNext = () => setStep((value) => value + 1)
  const goPrev = () => setStep((value) => value - 1)

  // Ventana de tarjetas dibujadas: `perView + 1` lejanas a la izquierda, la vecina, las activas, la vecina y `perView`
  // lejanas a la derecha. Tiene que cubrir un salto de página completo (`perView` tarjetas): así las que se ven antes y
  // después del giro ya están dibujadas y se mueven en vez de aparecer o desaparecer de golpe.
  const offsets = Array.from({ length: 3 * perView + 2 }, (_, index) => index - perView - 1)

  return (
    <div
      ref={rootRef}
      className="fc"
      style={{ '--fc-interval': `${autoplayMs}ms` } as CSSProperties}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
    >
      <div className="fc__viewport">
        <div className="fc__stage" aria-live={live ? 'off' : 'polite'}>
          {offsets.map((offset) => {
            const virtual = firstIndex + offset
            const item = items[mod(virtual, total)]
            const { role, style } = place(offset, perView)
            const isActive = role === 'active'
            const isPeek = role === 'peek-left' || role === 'peek-right'
            return (
              <div
                key={virtual}
                className="fc__card"
                data-role={role}
                style={style}
                aria-hidden={role.startsWith('far') ? true : undefined}
              >
                <div className="fc__clip">
                  {/* Cara colapsada: botón que lleva a esa tarjeta. */}
                  <button
                    type="button"
                    className="fc__peek"
                    onClick={role === 'peek-left' ? goPrev : goNext}
                    inert={!isPeek}
                  >
                    {item.peek}
                    <span className="visually-hidden">Ver {item.title}</span>
                  </button>

                  {/* Cara activa: de tamaño fijo, centrada; la tarjeta que crece la va revelando. */}
                  <div className="fc__face" inert={!isActive}>
                    {item.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Flechas a los costados de las tarjetas (en bucle). */}
        {pages > 1 && (
          <>
            <button type="button" className="fc__nav fc__nav--prev" onClick={goPrev}>
              <Icon name="chevronLeft" size={22} />
              <span className="visually-hidden">Servicios anteriores</span>
            </button>
            <button type="button" className="fc__nav fc__nav--next" onClick={goNext}>
              <Icon name="chevronRight" size={22} />
              <span className="visually-hidden">Servicios siguientes</span>
            </button>
          </>
        )}
      </div>

      {pages > 1 && !reduced && (
        <div className="fc__controls">
          <button
            type="button"
            className="fc__pause"
            aria-pressed={userPaused}
            onClick={() => setUserPaused((paused) => !paused)}
          >
            <Icon name={userPaused ? 'play' : 'pause'} size={16} />
            <span className="visually-hidden">
              {userPaused ? 'Reanudar el cambio automático' : 'Pausar el cambio automático'}
            </span>
          </button>
          {/* Cronómetro invisible: al terminar su animación CSS (fc-tick) se avanza; `key` lo reinicia en cada paso. */}
          {live && <span key={step} className="fc__tick" aria-hidden="true" onAnimationEnd={goNext} />}
        </div>
      )}
    </div>
  )
}
