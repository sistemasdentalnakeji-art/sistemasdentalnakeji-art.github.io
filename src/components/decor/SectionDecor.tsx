import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { cx } from '@/lib/cx'

// Decoraciones curvas para el fondo de las bandas (solo visuales, de un solo color).
// - flow: curvas de esquina a esquina que pasan por debajo del contenido, con movimiento lento.
//         En escritorio cruzan la banda; en móvil y tableta forman una franja al pie de la sección.
// - rings: círculo azul completo con arcos concéntricos que respiran y llevan un destello.
// - arcs: arcos concéntricos estáticos en la esquina superior derecha.
// - wave: ola a todo lo ancho; une una banda con la siguiente.

export type FlowLayout = 'schedule'
/** contact: escritorio (arriba a la derecha); contact-mobile: junto a "Síguenos" en móvil y tableta. */
type RingsPlacement = 'partners' | 'contact' | 'contact-mobile'

type SectionDecorProps =
  | { variant: 'flow'; layout: FlowLayout }
  | { variant: 'rings'; placement: RingsPlacement }
  | { variant: 'arcs' }
  /** inverse: rellena por encima de la curva (sin voltear); lo usa el footer para que sus hilos lleguen a la ola. */
  | { variant: 'wave'; position: 'top' | 'bottom'; flip?: boolean; inverse?: boolean }

interface Line {
  /** Forma inicial y forma intermedia de la curva (se alternan suavemente). */
  a: string
  b: string
}

const EASE_IN_OUT = '0.45 0 0.55 1;0.45 0 0.55 1'

/** Curva en S: plana al inicio (izquierda) y al final (derecha). */
const sCurve = (y0: number, y1: number, c1: number, c2: number, width: number) => ({
  a: `M-40 ${y0}C${c1} ${y0} ${c2} ${y1} ${width + 40} ${y1}`,
  b: `M-40 ${y0}C${c1 + width * 0.055} ${y0 - 50} ${c2 - width * 0.05} ${y1 + 40} ${width + 40} ${y1}`,
})

// Escritorio: lienzo de 1440×900 que se estira a toda la banda.
// Agendar: planas al pie del texto de la izquierda; suben por debajo del formulario.
const DESKTOP_FLOWS: Record<FlowLayout, Line[]> = {
  schedule: Array.from({ length: 6 }, (_, i) => sCurve(780 + i * 22, 40 + i * 52, 640 + i * 26, 860 + i * 26, 1440)),
}

// Móvil y tableta: franja de 400×150 al pie de la sección (no cruza el texto).
const MOBILE_FLOW: Line[] = Array.from({ length: 5 }, (_, i) => {
  // Paralelas (no se cruzan): suben de abajo-izquierda a la derecha.
  const y0 = 108 + i * 9
  const y1 = 22 + i * 13
  return {
    a: `M-10 ${y0}C150 ${y0} 230 ${y1} 410 ${y1}`,
    b: `M-10 ${y0}C170 ${y0 - 14} 210 ${y1 + 12} 410 ${y1}`,
  }
})

const ARC_RADII = [150, 205, 260, 315, 370]
const RING_RADII = [72, 122, 172, 222, 272]

/** Detiene las animaciones SMIL del SVG cuando el usuario pide reducir movimiento. */
function useSmilReducedMotion(ref: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (media.matches) svg.pauseAnimations()
      else svg.unpauseAnimations()
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [ref])
}

interface AnimatedLinesProps {
  lines: Line[]
  className: string
  viewBox: string
}

function AnimatedLines({ lines, className, viewBox }: AnimatedLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSmilReducedMotion(svgRef)

  return (
    <svg ref={svgRef} className={className} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {lines.map((line, index) => {
        const wave = (
          <animate
            attributeName="d"
            values={`${line.a};${line.b};${line.a}`}
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines={EASE_IN_OUT}
            dur={`${14 + index * 1.7}s`}
            begin={`-${index * 2.3}s`}
            repeatCount="indefinite"
          />
        )
        return (
          <g key={index} style={{ '--i': index } as CSSProperties}>
            <path className="decor-line" d={line.a} vectorEffect="non-scaling-stroke">
              {wave}
            </path>
            <path className="decor-line__light" d={line.a} vectorEffect="non-scaling-stroke">
              {wave}
            </path>
          </g>
        )
      })}
    </svg>
  )
}

function Rings({ placement }: { placement: RingsPlacement }) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSmilReducedMotion(svgRef)

  return (
    <svg
      ref={svgRef}
      className={`decor-rings decor-rings--${placement}`}
      viewBox="-300 -300 600 600"
      aria-hidden="true"
      focusable="false"
    >
      {RING_RADII.map((radius, index) => {
        const breathe = (
          <animate
            attributeName="r"
            values={`${radius};${radius + 8};${radius}`}
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines={EASE_IN_OUT}
            dur={`${12 + index * 1.5}s`}
            begin={`-${index * 2}s`}
            repeatCount="indefinite"
          />
        )
        return (
          <g key={radius} style={{ '--i': index } as CSSProperties}>
            <circle className="decor-ring" r={radius}>
              {breathe}
            </circle>
            <circle className="decor-ring__light" r={radius} pathLength={1000}>
              {breathe}
            </circle>
          </g>
        )
      })}

      {/* Círculo central completo, en el azul del logo. */}
      <circle className="decor-rings__dot" r="30">
        <animate attributeName="r" values="28;32;28" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function SectionDecor(props: SectionDecorProps) {
  switch (props.variant) {
    case 'flow':
      return (
        <>
          <AnimatedLines
            lines={DESKTOP_FLOWS[props.layout]}
            className="decor decor--flow decor--flow-desktop"
            viewBox="0 0 1440 900"
          />
          <AnimatedLines lines={MOBILE_FLOW} className="decor decor--flow decor--flow-mobile" viewBox="0 0 400 150" />
        </>
      )

    case 'rings':
      return <Rings placement={props.placement} />

    case 'wave':
      return (
        <svg
          className={cx(
            'decor decor--wave',
            `decor--${props.position}`,
            props.flip && 'decor--flip',
            props.inverse && 'decor--inverse',
          )}
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d={props.inverse ? 'M0 110C220 40 470 40 720 96s500 100 720 20V0H0z' : 'M0 110C220 40 470 40 720 96s500 100 720 20v84H0z'}
          />
        </svg>
      )

    case 'arcs':
      return (
        <svg className="decor decor--arcs decor--top-right" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
          <circle cx="400" cy="0" r="96" fill="currentColor" opacity="0.14" />
          {ARC_RADII.map((radius, index) => (
            <circle
              key={radius}
              cx="400"
              cy="0"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity={0.38 - index * 0.06}
            />
          ))}
        </svg>
      )
  }
}
