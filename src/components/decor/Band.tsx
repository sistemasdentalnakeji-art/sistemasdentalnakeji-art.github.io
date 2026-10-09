import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import { SectionDecor, type FlowLayout } from '@/components/decor/SectionDecor'

type Wave = 'plain' | 'flip'

interface BandProps {
  tone: 'white' | 'tint'
  id?: string
  labelledBy: string
  className?: string
  /** Ola propia en el borde superior/inferior (une la banda con la vecina). */
  waveTop?: Wave
  waveBottom?: Wave
  /** Curvas de esquina a esquina por debajo del contenido. */
  flow?: FlowLayout
  /** Decoración extra de fondo (arcos, anillos). */
  decor?: ReactNode
  children: ReactNode
}

/**
 * Sección de la hoja continua: fondo blanco o azul, olas de unión y decoraciones.
 * Mantiene sincronizadas las clases de espaciado con las decoraciones que se pintan.
 */
export function Band({ tone, id, labelledBy, className, waveTop, waveBottom, flow, decor, children }: BandProps) {
  return (
    <section
      id={id}
      className={cx(
        className,
        'band',
        `band--${tone}`,
        waveTop && 'band--wave-top',
        waveBottom && 'band--wave-bottom',
        flow && 'band--has-flow',
      )}
      aria-labelledby={labelledBy}
    >
      {decor}
      {flow && <SectionDecor variant="flow" layout={flow} />}
      {waveTop && <SectionDecor variant="wave" position="top" flip={waveTop === 'flip'} />}
      {waveBottom && <SectionDecor variant="wave" position="bottom" flip={waveBottom === 'flip'} />}
      {children}
    </section>
  )
}
