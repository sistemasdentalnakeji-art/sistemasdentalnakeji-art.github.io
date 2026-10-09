import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/Icon'

interface CarouselProps {
  /** Nombre accesible del carrusel (p. ej. "Reseñas de pacientes"). */
  label: string
  items: ReactNode[]
  className?: string
}

/**
 * Carrusel sencillo con scroll-snap: se desliza con el dedo, la rueda, el teclado
 * (flechas cuando la pista tiene el foco) o los botones. Sin reproducción automática.
 */
export function Carousel({ label, items, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2
      setCanPrev(track.scrollLeft > 2)
      setCanNext(track.scrollLeft < max)
    }
    const observer = new ResizeObserver(update)
    observer.observe(track)
    track.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', update)
    }
  }, [])

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={cx('carousel', className)} role="region" aria-roledescription="carrusel" aria-label={label}>
      {/* Solo entra en el orden de Tab si hay algo que desplazar. */}
      <ul
        ref={trackRef}
        className="carousel__track"
        tabIndex={canPrev || canNext ? 0 : undefined}
        aria-label="Desliza para ver más"
      >
        {items.map((item, index) => (
          <li key={index} className="carousel__item">
            {item}
          </li>
        ))}
      </ul>
      <div className="carousel__controls" hidden={!canPrev && !canNext}>
        {/* aria-disabled (no disabled): el botón pulsado conserva el foco al llegar al extremo. */}
        <button
          type="button"
          className="carousel__button"
          onClick={() => canPrev && scroll(-1)}
          aria-disabled={!canPrev}
        >
          <Icon name="chevronLeft" size={20} />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          type="button"
          className="carousel__button"
          onClick={() => canNext && scroll(1)}
          aria-disabled={!canNext}
        >
          <Icon name="chevronRight" size={20} />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  )
}
