// ─────────────────────────────────────────────────────────────────────────────
// SPIN SHUTTER: una órbita de fotos que se abre girando desde una pila y enfoca la que pasa al frente.
// Inspirado en "Spin Shutter" de React Bits Pro (bloque de pago, NO instalado: su versión de shadcn pide Tailwind, que este
// proyecto no usa). Código propio, sin librerías, con las ideas de su documentación:
//   • al entrar a pantalla las fotos se abren desde una pila (`--ss-spread` animado) mientras la órbita gira rápido y frena;
//   • la órbita va inclinada en diagonal (`tilt` hacia la cámara + `roll` en pantalla), como en la página oficial: un arco cercano
//     de fotos grandes y nítidas y otro lejano de fotos chicas, difuminadas y apagadas. Las fotos miran siempre de frente
//     (se contra-giran), solo cambia su tamaño por la perspectiva;
//   • con el cursor encima el giro se frena suave y la órbita "rebota": se inclina un poco hacia donde apuntas y vuelve;
//     se puede arrastrar (con inercia) y los botones anterior/siguiente llevan la foto elegida al frente.
//   • NO se mueve con la rueda del mouse (se la quitaría al scroll de la página).
// • Sin movimiento ("reducir movimiento" o "Pausar animaciones"): la órbita queda quieta y completa; los botones cambian de
//   foto sin animar. Se renderiza también en Node: nada de window/document fuera de efectos y eventos.
// • Fotos → quien lo use (hoy src/data/servicesShowcase.ts). Estilos → src/styles/components/spin-shutter.css.
// • El giro vive en variables CSS del anillo (--spin, --tilt, --roll) que escribe un bucle requestAnimationFrame: React no se
//   vuelve a pintar mientras gira.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { motionOff } from '@/lib/motion'

export interface SpinShutterPhoto {
  src: string
  alt: string
  /** object-position de la foto dentro de la tarjeta. */
  position?: string
}

interface Props {
  photos: SpinShutterPhoto[]
  /** Nombre de la región para lectores de pantalla. */
  label: string
  /** Vueltas por minuto del giro automático. */
  speed?: number
  /** Inclinación de la órbita hacia la cámara, en grados (0 = de canto, una línea; 90 = de frente, un círculo). */
  tilt?: number
  /** Giro de la órbita sobre la pantalla, en grados: con valor positivo el arco cercano queda a la izquierda y el eje mayor baja a la derecha. */
  roll?: number
}

const RAD = Math.PI / 180
const DEG_PER_PX = 0.32 // lo que gira la órbita por píxel arrastrado
const HOLD_MS = 4500 // tras elegir una foto a mano, el giro automático espera
const INTRO_SPIN = 560 // grados por segundo con los que arranca el giro al abrirse; frena solo
const DRAG_START_PX = 8 // hasta moverse esto, es un toque o clic; más, es un arrastre
const WOBBLE_DEG = 7 // cuánto se inclina la órbita hacia el cursor

/** Apagado y desenfoque de una foto según qué tan al frente está (c = coseno de su ángulo: 1 al frente, -1 atrás).
 *  El desenfoque va en pasos de 0.5 px y solo se reescribe si cambió: un filtro nuevo cada frame sale caro en equipos modestos. */
function depthStyle(card: HTMLElement, c: number) {
  const t = (c + 1) / 2
  const blur = Math.round((1 - t) ** 1.3 * 3.5 * 2) / 2
  card.style.opacity = (0.22 + 0.78 * t ** 1.6).toFixed(3)
  const filter = blur > 0 ? `blur(${blur}px)` : 'none'
  if (card.style.filter !== filter) card.style.filter = filter
}

export function SpinShutter({ photos, label, speed = 2.2, tilt = 30, roll = 26 }: Props) {
  const count = photos.length
  const step = 360 / count
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Estado del giro (en refs: se actualiza 60 veces por segundo sin volver a pintar React).
  const angle = useRef(0)
  const velocity = useRef(0)
  const snapTo = useRef<number | null>(null)
  const holdUntil = useRef(0)
  const hovering = useRef(false)
  const focusWithin = useRef(false)
  const pressed = useRef(false) // botón o dedo abajo sobre el escenario (aún puede ser un simple clic)
  const dragging = useRef(false) // ya se movió lo bastante: es un arrastre
  const dragLast = useRef({ x: 0, t: 0 })
  const dragMoved = useRef(0)
  const targetIndex = useRef(0) // foto a la que va (o está) la órbita: dos clics seguidos avanzan dos
  const frontIndex = useRef(0) // la foto que hoy está al frente
  const wobbleTarget = useRef({ tilt: 0, roll: 0 })

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return

    let frame = 0
    let last = 0
    let painted = ''
    const wobble = { tilt: 0, roll: 0 }
    let opened = motionOff() // sin movimiento no hay apertura: la órbita ya está completa
    // Si cambia a "sin movimiento" mientras está en pila y fuera de pantalla, al verse queda completa y sin transición.
    const finishOpen = () => {
      opened = true
      root.dataset.phase = 'static'
    }

    const paint = () => {
      const key = `${angle.current.toFixed(3)}|${wobble.tilt.toFixed(3)}|${wobble.roll.toFixed(3)}`
      if (key === painted) return
      painted = key
      ring.style.setProperty('--spin', `${angle.current.toFixed(3)}deg`)
      ring.style.setProperty('--tilt', `${(tilt + wobble.tilt).toFixed(3)}deg`)
      ring.style.setProperty('--roll', `${(roll + wobble.roll).toFixed(3)}deg`)
      let nearest = 0
      let best = -2
      cardRefs.current.forEach((card, k) => {
        if (!card) return
        const c = Math.cos((k * step + angle.current) * RAD)
        depthStyle(card, c)
        if (c > best) {
          best = c
          nearest = k
        }
      })
      frontIndex.current = nearest
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const still = motionOff()
      if (snapTo.current !== null) {
        const diff = snapTo.current - angle.current
        if (still || Math.abs(diff) < 0.05) {
          angle.current = snapTo.current
          snapTo.current = null
          velocity.current = 0
        } else {
          angle.current += diff * Math.min(1, dt * 7)
        }
      } else if (!dragging.current) {
        const resting = still || hovering.current || focusWithin.current || now < holdUntil.current
        const target = resting ? 0 : speed * 6
        velocity.current += (target - velocity.current) * Math.min(1, dt * 2.5)
        angle.current += velocity.current * dt
      }
      // Rebote: la inclinación sigue al cursor con un resorte suave (pasa un poco y vuelve) y se aquieta sola al salir.
      const ease = Math.min(1, dt * 5)
      wobble.tilt += ((still ? 0 : wobbleTarget.current.tilt) - wobble.tilt) * ease
      wobble.roll += ((still ? 0 : wobbleTarget.current.roll) - wobble.roll) * ease
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

    // El servidor emite la pila (data-phase="stacked"); sin movimiento queda completa desde ya, con movimiento se abre la primera vez que se ve.
    if (opened) finishOpen()
    paint()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return stop()
        if (!opened) {
          if (motionOff()) finishOpen()
          else {
            opened = true
            root.dataset.phase = 'open'
            velocity.current = INTRO_SPIN
          }
        }
        start()
      },
      { threshold: 0.25 },
    )
    observer.observe(root)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [count, step, speed, tilt, roll])

  /** Lleva la foto `index` al frente por el camino más corto. */
  const goTo = (index: number) => {
    const k = ((index % count) + count) % count
    targetIndex.current = k
    const base = -k * step
    snapTo.current = base + 360 * Math.round((angle.current - base) / 360)
    holdUntil.current = performance.now() + HOLD_MS
  }

  /** Anterior / siguiente parten de la foto a la que ya va la órbita (si no, dos clics rápidos avanzarían uno). */
  const goBy = (delta: number) => goTo((snapTo.current !== null ? targetIndex.current : frontIndex.current) + delta)

  // Arrastre con inercia. El puntero solo se captura cuando ya se movió (DRAG_START_PX).
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pressed.current = true
    dragging.current = false
    dragMoved.current = 0
    dragLast.current = { x: event.clientX, t: performance.now() }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    // Rebote: con el mouse, la órbita se inclina hacia donde apunta el cursor (de -1 a 1 desde el centro del escenario).
    if (event.pointerType === 'mouse') {
      const box = event.currentTarget.getBoundingClientRect()
      const nx = ((event.clientX - box.left) / box.width) * 2 - 1
      const ny = ((event.clientY - box.top) / box.height) * 2 - 1
      wobbleTarget.current = { tilt: ny * WOBBLE_DEG, roll: nx * WOBBLE_DEG }
    }
    if (!pressed.current) return
    const now = performance.now()
    const dx = event.clientX - dragLast.current.x
    dragMoved.current += Math.abs(dx)
    if (!dragging.current) {
      if (dragMoved.current < DRAG_START_PX) return
      dragging.current = true
      snapTo.current = null
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    angle.current += dx * DEG_PER_PX
    const dt = Math.max(1, now - dragLast.current.t) / 1000
    velocity.current = Math.max(-720, Math.min(720, (dx * DEG_PER_PX) / dt))
    dragLast.current = { x: event.clientX, t: now }
  }

  // Se llama al soltar, al cancelarse el gesto y al perderse la captura (así la órbita nunca queda "agarrada").
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pressed.current) return
    pressed.current = false
    if (!dragging.current) return
    dragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    // Si el dedo o el mouse se detuvo antes de soltar, no hay inercia; con "reducir movimiento" tampoco.
    if (performance.now() - dragLast.current.t > 80 || motionOff()) velocity.current = 0
    holdUntil.current = performance.now() + HOLD_MS
  }

  return (
    <div
      ref={rootRef}
      className="spin-shutter"
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      data-phase="stacked"
      // El giro automático espera mientras el foco del teclado está dentro de los botones.
      onFocus={() => (focusWithin.current = true)}
      onBlur={() => (focusWithin.current = false)}
    >
      <div
        className="spin-shutter__stage"
        style={{ '--n': count, '--tilt': `${tilt}deg`, '--roll': `${roll}deg` } as CSSProperties}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') hovering.current = true
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'mouse') return
          hovering.current = false
          wobbleTarget.current = { tilt: 0, roll: 0 }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={onPointerUp}
      >
        <div className="spin-shutter__scene">
          <div ref={ringRef} className="spin-shutter__ring">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="spin-shutter__card"
                style={{ '--k': index } as CSSProperties}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable={false} style={{ objectPosition: photo.position }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="spin-shutter__bar">
        <button type="button" className="spin-shutter__nav" aria-label="Foto anterior" onClick={() => goBy(-1)}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <button type="button" className="spin-shutter__nav" aria-label="Foto siguiente" onClick={() => goBy(1)}>
          <Icon name="chevronRight" size={22} />
        </button>
      </div>
    </div>
  )
}
