// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN ANIMADA DEBAJO DEL HERO: tres mensajes que entran al hacer scroll ("un hilo de sonrisa")
//
//   1. Deseo cotidiano → entra desde la izquierda.
//   2. Lo importante del cuidado (h2) → sube desde abajo y queda centrado.
//   3. Comprender para decidir → entra desde la derecha.
// • Cada línea entra enfocándose (de borrosa a nítida); sus palabras se encienden una tras otra; las frases en azul se
//   subrayan con una línea fina; y un hilo de curvas (las mismas que las de la sección de Agendar: ondulan y las recorre
//   una luz) se va cargando con el scroll de un mensaje al siguiente.
// • Textos → src/data/story.ts.
// • Movimiento y estilos → src/styles/pages/home/story.css (animaciones CSS ligadas al scroll, sin JavaScript).
// ─────────────────────────────────────────────────────────────────────────────

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { STORY, type StoryLines } from '@/data/story'
import { AnimatedLines, type Line } from '@/components/decor/SectionDecor'
import { Band } from '@/components/decor/Band'

// Hilo (viewBox 100×100 = el área de los tres mensajes): una sola curva que baja por la derecha del mensaje 1, rodea por
// la izquierda al 2 y da la vuelta por debajo del 3. Los valores se salen un poco de 0–100 a propósito (el SVG no recorta):
// así la línea queda separada del texto. Ondula entre su forma `a` y `b`.
// Cada unión tiene UNA dirección (x, y) y las dos curvas que se encuentran en ella usan esa misma dirección (una entra y la
// otra sale): así la línea no hace esquinas, ni siquiera mientras ondula (`wave` solo gira esas direcciones).
const THREAD_JOINTS: [x: number, y: number, dx: number, dy: number][] = [
  [33.5, -18, 1, 0.1],
  [85, 12, 0.15, 1],
  [55, 31, -1, 0.15],
  [8, 58, 0, 1],
  [55, 78, 1, 0.15],
  [108, 92, 0.3, 1],
  // Final un poco más arriba que el boceto: el diente se detiene aquí y la ola de la sección siguiente lo taparía.
  [63, 106, -1, 0.02],
  [31, 105, -1, 0],
]

/** `scaleX`/`scaleY` pasan la curva de 0–100 a píxeles (el ancho y alto del área divididos entre 100). */
const threadPath = (wave: number, scaleX = 1, scaleY = 1) => {
  const turn = (dx: number, dy: number, index: number) => {
    const angle = wave * (index % 2 ? 1 : -1)
    return [dx * Math.cos(angle) - dy * Math.sin(angle), dx * Math.sin(angle) + dy * Math.cos(angle)]
  }
  const n = (x: number, y: number) => `${(x * scaleX).toFixed(2)} ${(y * scaleY).toFixed(2)}`
  return THREAD_JOINTS.map(([x, y, dx, dy], i) => {
    if (i === 0) return `M${n(x, y)}`
    const [px, py, pdx, pdy] = THREAD_JOINTS[i - 1]
    const reach = Math.hypot(x - px, y - py) * 0.4
    const [ox, oy] = turn(pdx, pdy, i - 1)
    const [ix, iy] = turn(dx, dy, i)
    return `C${n(px + ox * reach, py + oy * reach)} ${n(x - ix * reach, y - iy * reach)} ${n(x, y)}`
  }).join('')
}

/** Destello de cuatro puntas (como el del emoji ✨), viewBox 24×24. */
const SPARKLE = 'M12 0C12.8 6.5 17.5 11.2 24 12C17.5 12.8 12.8 17.5 12 24C11.2 17.5 6.5 12.8 0 12C6.5 11.2 11.2 6.5 12 0Z'

/** Silueta del diente de caricatura (viewBox 80×84): corona redonda con dos lomos arriba y dos raíces cortas y anchas. */
const TOOTH_SHAPE =
  'M40 15C33 7 12 6 10 26C9 38 16 45 18 56C19 66 22 76 28 76C34 76 35 63 40 63C45 63 46 76 52 76C58 76 61 66 62 56C64 45 71 38 70 26C68 6 47 7 40 15Z'

/** Capas del volumen: copias de la silueta apiladas en profundidad (la primera y la última son las caras). */
const TOOTH_LAYERS = 7

/**
 * Diente de caricatura con volumen (CSS 3D, sin WebGL): copias SVG de la silueta apiladas en Z, con los lados casi blancos
 * (perla) y las dos caras con degradado y brillo. Se mece de lado a lado con el scroll (story.css).
 */
function Tooth() {
  return (
    <div className="story__tooth" aria-hidden="true">
      <svg className="story__tooth-defs" width="0" height="0" focusable="false">
        <defs>
          <radialGradient id="story-tooth-face" cx="35%" cy="28%" r="80%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f6f9fd" />
            <stop offset="1" stopColor="#d3e3f3" />
          </radialGradient>
        </defs>
      </svg>
      <div className="story__tooth-body">
        {Array.from({ length: TOOTH_LAYERS }, (_, i) => {
          const face = i === 0 || i === TOOTH_LAYERS - 1
          return (
            <svg
              key={i}
              className={face ? 'story__tooth-layer story__tooth-layer--face' : 'story__tooth-layer'}
              style={{ '--z': i - (TOOTH_LAYERS - 1) / 2 } as CSSProperties}
              viewBox="0 0 80 84"
              focusable="false"
            >
              <path d={TOOTH_SHAPE} />
              {face && (
                <>
                  <ellipse className="story__tooth-gloss" cx="26" cy="23" rx="9" ry="5" transform="rotate(-28 26 23)" />
                  <path className="story__tooth-gloss" d="M17 40C17.5 45 19.5 49 20.5 53" />
                </>
              )}
            </svg>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Punta del hilo: una caja que recorre la curva al hacer scroll (`offset-path` = la misma curva, en píxeles; el avance lo
 * hace story.css con la misma línea de tiempo que revela el hilo). Lleva el diente y tres destellos que titilan.
 */
function ThreadTip({ path }: { path?: string }) {
  return (
    <div
      className="story__tip"
      data-ready={path ? '' : undefined}
      style={path ? { offsetPath: `path('${path}')` } : undefined}
      aria-hidden="true"
    >
      <Tooth />
      {[1, 2, 3].map((n) => (
        <svg key={n} className={`tooth-sparkle tooth-sparkle--${n}`} viewBox="0 0 24 24" focusable="false">
          <path d={SPARKLE} />
        </svg>
      ))}
    </div>
  )
}

/**
 * Mide el área de los mensajes. Hasta medirla (prerender y primer render) es `null` y el hilo usa un lienzo de 100×100
 * estirado; después, el hilo se dibuja en píxeles reales: así la máscara que lo revela y la ruta del diente coinciden.
 */
function useAreaSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const area = ref.current
    if (!area) return
    const observer = new ResizeObserver(() => setSize({ width: area.clientWidth, height: area.clientHeight }))
    observer.observe(area)
    return () => observer.disconnect()
  }, [])

  return [ref, size] as const
}

/** Cada palabra lleva su número (--i, contando desde la primera del mensaje) para encenderse en cascada. */
function StoryText({ lines }: { lines: StoryLines }) {
  let index = 0
  const words = (text: string) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((word) => {
        const i = index++
        // El espacio va FUERA del span: dentro de un inline-block se colapsaría y las palabras saldrían pegadas.
        return (
          <Fragment key={i}>
            <span className="story__word" style={{ '--i': i } as CSSProperties}>
              {word}
            </span>{' '}
          </Fragment>
        )
      })

  return lines.map((segments, lineIndex) => (
    // data-indent: el CSS deja en blanco el ancho de ese texto (contenido generado, no forma parte del texto de la página)
    // para que la línea empiece justo debajo de esas palabras.
    <span key={lineIndex} className="story__line" data-indent={segments.find((segment) => segment.indent)?.indent}>
      {segments.map((segment) =>
        segment.accent ? (
          <span key={segment.text} className="story__accent">
            {words(segment.text)}
          </span>
        ) : (
          <Fragment key={segment.text}>{words(segment.text)}</Fragment>
        ),
      )}
    </span>
  ))
}

export function CareStory() {
  const [areaRef, size] = useAreaSize()
  const scaleX = size ? size.width / 100 : 1
  const scaleY = size ? size.height / 100 : 1
  const thread: Line[] = [{ a: threadPath(0, scaleX, scaleY), b: threadPath(0.2, scaleX, scaleY) }]

  return (
    <Band tone="tint" className="story" labelledBy="historia-titulo">
      <div ref={areaRef} className="container story__inner">
        {/* Hilo decorativo: curva animada como las de Agendar, que se va dibujando con el scroll (máscara .decor-reveal)
            con el diente en la punta. */}
        <AnimatedLines
          lines={thread}
          className="decor story__thread"
          viewBox={size ? `0 0 ${size.width} ${size.height}` : '0 0 100 100'}
          revealId="story-thread-reveal"
        />
        <ThreadTip path={size ? thread[0].a : undefined} />

        <p className="story__item story__item--left">
          <StoryText lines={STORY.desire} />
        </p>

        <h2 id="historia-titulo" className="story__item story__item--up">
          <StoryText lines={STORY.priority} />
        </h2>

        <p className="story__item story__item--right">
          <StoryText lines={STORY.decision} />
        </p>
      </div>
    </Band>
  )
}
