import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import { SectionDecor, type FlowLayout } from '@/components/decor/SectionDecor'

type Wave = 'plain' | 'flip'

interface BandProps {
  tone: 'white' | 'tint'
  id?: string
  labelledBy: string
  className?: string
  /** Ola propia en el borde superior (une la banda con la anterior). */
  waveTop?: Wave
  /** Curvas de esquina a esquina por debajo del contenido. */
  flow?: FlowLayout
  /** Decoración extra de fondo (arcos, anillos). */
  decor?: ReactNode
  children: ReactNode
}

/**
 * Sección de la hoja continua: fondo blanco o azul, olas de unión y decoraciones.
 * Une las clases de la banda (tono, ola superior, curvas) con las decoraciones que se pintan dentro (`SectionDecor`).
 */
export function Band({ tone, id, labelledBy, className, waveTop, flow, decor, children }: BandProps) {
  return (
    <section
      id={id}
      className={cx(
        className,
        'band',
        `band--${tone}`,
        waveTop && 'band--wave-top',
        flow && 'band--has-flow',
      )}
      aria-labelledby={labelledBy}
    >
      {decor}
      {flow && <SectionDecor variant="flow" layout={flow} />}
      {waveTop && <SectionDecor variant="wave" position="top" flip={waveTop === 'flip'} />}
      {children}
    </section>
  )
}
