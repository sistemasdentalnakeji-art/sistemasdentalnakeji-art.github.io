import type { CSSProperties, ReactNode } from 'react'
import { cx } from '@/lib/cx'

interface MarqueeProps {
  label: string
  items: ReactNode[]
  /** Hacia dónde se mueven las tarjetas. */
  direction: 'ltr' | 'rtl'
  /** Segundos que tarda cada tarjeta en recorrer su propio ancho: más alto = más lento. */
  secondsPerCard?: number
  className?: string
}

// Cada grupo repite las tarjetas para llenar pantallas anchas aunque haya pocas; el segundo grupo es el que cierra el ciclo sin salto.
const REPEATS = 2

/**
 * Fila de tarjetas que corre sin parar (solo CSS). Se detiene con el cursor o el foco, con "Pausar animaciones" y,
 * con movimiento reducido, pasa a ser una fila que se desliza con el dedo. Solo la primera copia es accesible.
 */
export function Marquee({ label, items, direction, secondsPerCard = 11, className }: MarqueeProps) {
  const style = { '--marquee-duration': `${items.length * REPEATS * secondsPerCard}s` } as CSSProperties
  return (
    <div className={cx('marquee', `marquee--${direction}`, className)} role="region" aria-label={label} tabIndex={0}>
      <div className="marquee__track" style={style}>
        {[0, 1].map((group) => (
          <ul key={group} className="marquee__group">
            {Array.from({ length: REPEATS }, (_, copy) =>
              items.map((item, index) => {
                const hidden = group > 0 || copy > 0
                return (
                  <li
                    key={`${copy}-${index}`}
                    className="marquee__item"
                    aria-hidden={hidden || undefined}
                    inert={hidden || undefined}
                  >
                    {item}
                  </li>
                )
              }),
            )}
          </ul>
        ))}
      </div>
    </div>
  )
}
