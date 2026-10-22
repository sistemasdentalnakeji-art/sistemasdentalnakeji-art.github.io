// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL ORBIT: las redes del header en una órbita 3D mini, con el mismo movimiento del carrusel de /servicios/ (SpinShutter).
//
// • Se abre desde una pila al verse y gira lento (el giro arranca rápido y frena); cada icono se aleja hacia atrás, se achica,
//   se apaga y se desenfoca según su profundidad, y siempre mira de frente. Ángulo plano: sin inclinación (tilt/roll = 0).
// • Con el cursor encima o con el foco del teclado el giro se detiene y el icono elegido queda al frente (todos siguen
//   siendo enlaces). Sin movimiento ("reducir movimiento" o "Pausar animaciones") la órbita queda quieta y completa.
// • El giro vive en la variable CSS --spin que escribe un bucle requestAnimationFrame: React no se repinta mientras gira.
// • Estilos → src/styles/components/social-orbit.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, type CSSProperties, type FocusEvent, type PointerEvent } from 'react'
import { useLang } from '@/app/lang'
import { SITE, SOCIAL_LINKS } from '@/config/site'
import { UI } from '@/data/ui'
import { cx } from '@/lib/cx'
import { motionOff } from '@/lib/motion'
import { BrandIcon } from '@/components/ui/BrandIcon'

const RAD = Math.PI / 180
const COUNT = SOCIAL_LINKS.length
const STEP = 360 / COUNT
const SPEED = 3 // vueltas por minuto del giro automático
const INTRO_SPIN = 560 // grados por segundo con los que arranca al abrirse; frena solo
const DEG_PER_PX = 1.1 // lo que gira la órbita por píxel arrastrado (la órbita es chica: una vuelta ≈ 330 px)
const HOLD_MS = 4500 // tras arrastrar, el giro automático espera
const DRAG_START_PX = 6 // hasta moverse esto es un clic; más, es un arrastre

/** Apagado y desenfoque según qué tan al frente está el icono (c = coseno de su ángulo: 1 al frente, -1 atrás). */
function depthStyle(item: HTMLElement, c: number) {
  const t = (c + 1) / 2
  const blur = Math.round((1 - t) ** 1.3 * 1.6 * 2) / 2
  item.style.opacity = (0.35 + 0.65 * t ** 1.4).toFixed(3)
  const filter = blur > 0 ? `blur(${blur}px)` : 'none'
  if (item.style.filter !== filter) item.style.filter = filter
}

export function SocialOrbit({ className }: { className?: string }) {
  const ui = UI[useLang()]
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const hovering = useRef(false)
  const focusIndex = useRef<number | null>(null)
  // Arrastre (refs: el giro se actualiza 60 veces por segundo sin repintar React).
  const angle = useRef(0)
  const velocity = useRef(0)
  const holdUntil = useRef(0)
  const pressed = useRef(false)
  const dragging = useRef(false)
  const dragMoved = useRef(0)
  const dragLast = useRef({ x: 0, t: 0 })

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return

    let frame = 0
    let last = 0
    let opened = motionOff() // sin movimiento no hay apertura: la órbita ya está completa
    if (opened) root.dataset.phase = 'static'

    const paint = () => {
      ring.style.setProperty('--spin', `${angle.current.toFixed(3)}deg`)
      itemRefs.current.forEach((item, k) => {
        if (item) depthStyle(item, Math.cos((k * STEP + angle.current) * RAD))
      })
    }

    // Lleva la órbita al icono indicado (o al más cercano al frente) por el camino más corto.
    const snap = (dt: number, index: number | null) => {
      const base = index !== null ? -index * STEP : Math.round(angle.current / STEP) * STEP
      const target = base + 360 * Math.round((angle.current - base) / 360)
      angle.current += (target - angle.current) * Math.min(1, dt * 7)
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!motionOff() && !dragging.current) {
        if (focusIndex.current !== null) {
          snap(dt, focusIndex.current)
          velocity.current = 0
        } else if (now < holdUntil.current) {
          // Tras arrastrar: sigue con inercia, frena y queda un icono al frente.
          velocity.current += (0 - velocity.current) * Math.min(1, dt * 2.5)
          angle.current += velocity.current * dt
          if (Math.abs(velocity.current) < 8) snap(dt, null)
        } else if (hovering.current) {
          snap(dt, null)
          velocity.current = 0
        } else {
          velocity.current += (SPEED * 6 - velocity.current) * Math.min(1, dt * 2.5)
          angle.current += velocity.current * dt
        }
      }
      paint()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    paint()
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return stop()
      if (!opened) {
        opened = true
        if (motionOff()) root.dataset.phase = 'static'
        else {
          root.dataset.phase = 'open'
          velocity.current = INTRO_SPIN
        }
      }
      start()
    })
    observer.observe(root)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [])

  // Arrastre con inercia. El puntero solo se captura cuando ya se movió (DRAG_START_PX): un toque sigue siendo un clic al enlace.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pressed.current = true
    dragging.current = false
    dragMoved.current = 0
    dragLast.current = { x: event.clientX, t: performance.now() }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pressed.current) return
    const now = performance.now()
    const dx = event.clientX - dragLast.current.x
    if (!dragging.current) {
      dragMoved.current = Math.abs(dx)
      if (dragMoved.current < DRAG_START_PX) return
      dragging.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    angle.current += dx * DEG_PER_PX
    const dt = Math.max(1, now - dragLast.current.t) / 1000
    velocity.current = Math.max(-720, Math.min(720, (dx * DEG_PER_PX) / dt))
    dragLast.current = { x: event.clientX, t: now }
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pressed.current) return
    pressed.current = false
    if (!dragging.current) return
    dragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    // Si el cursor se detuvo antes de soltar no hay inercia; con "reducir movimiento" tampoco.
    if (performance.now() - dragLast.current.t > 80 || motionOff()) velocity.current = 0
    holdUntil.current = performance.now() + HOLD_MS
  }

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.target.matches(':focus-visible')) return
    focusIndex.current = Number(event.target.closest<HTMLElement>('[data-k]')?.dataset.k ?? 0)
  }

  return (
    <div
      ref={rootRef}
      className={cx('social-orbit', className)}
      data-phase="stacked"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') hovering.current = true
      }}
      onPointerLeave={() => {
        hovering.current = false
      }}
      // Sin esto el navegador arrastra el enlace (arrastre nativo) y cancela el gesto de la órbita.
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onLostPointerCapture={onPointerUp}
      // Tras un arrastre no se abre el enlace sobre el que se soltó.
      onClickCapture={(event) => {
        if (dragMoved.current >= DRAG_START_PX) {
          dragMoved.current = 0
          event.preventDefault()
          event.stopPropagation()
        }
      }}
      onFocus={onFocus}
      onBlur={() => {
        focusIndex.current = null
      }}
    >
      <div className="social-orbit__scene">
        <ul ref={ringRef} className="social-orbit__ring" aria-label={ui.socialLabel} style={{ '--n': COUNT } as CSSProperties}>
          {SOCIAL_LINKS.map((link, index) => (
            <li
              key={link.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className="social-orbit__item"
              data-k={index}
              style={{ '--k': index } as CSSProperties}
            >
              <a className="icon-button social-orbit__link" href={link.href} target="_blank" rel="noopener" draggable={false}>
                <BrandIcon name={link.id} size={22} />
                <span className="visually-hidden">{ui.socialLink(link.label, SITE.name)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
