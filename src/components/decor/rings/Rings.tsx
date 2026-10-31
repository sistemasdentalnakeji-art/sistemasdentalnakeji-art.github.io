import { useRef, type CSSProperties } from 'react'
import { EASE_IN_OUT, useSmilMotion } from '../useSmilMotion'

// ─────────────────────────────────────────────────────────────────────────────
// CÍRCULO CON SILUETAS: círculo azul central con arcos concéntricos que respiran y llevan un destello.
// En el inicio hay dos: Reseñas de Google (escritorio) y Contacto (escritorio y celular). No agregar más sin avisar.
// Estilos y posiciones → ./rings.css. Va dentro del `decor` de una Band: por encima del fondo, por debajo del contenido.
// ─────────────────────────────────────────────────────────────────────────────

/** reviews: escritorio (arriba a la izquierda de Reseñas); contact: escritorio (arriba a la derecha); contact-mobile: junto a "Síguenos" en móvil y tableta. */
export type RingsPlacement = 'reviews' | 'contact' | 'contact-mobile'

const RING_RADII = [72, 122, 172, 222, 272]

export function Rings({ placement }: { placement: RingsPlacement }) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSmilMotion(svgRef)

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
