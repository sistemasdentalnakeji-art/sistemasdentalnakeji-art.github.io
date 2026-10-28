import { useEffect, useState } from 'react'
import { activeIndex, bump } from '@/lib/chapterRail'
import { motionOff } from '@/lib/motion'

export interface Chapter {
  id: string
  title: string
}

interface ChapterScrubberProps {
  /** Nombre accesible del riel, en el idioma de la página. */
  label: string
  chapters: Chapter[]
}

/** Alto en px de cada marca del riel (debe coincidir con --chapter-pitch en blog.css). */
const PITCH = 24

/**
 * Riel de capítulos (referencia: "Chapter Scrubber" de 21st.dev): una marca corta por sección. La activa se alarga y una tarjeta
 * con el título de la sección baja junto a ella conforme avanza la lectura; con el cursor encima, las marcas cercanas crecen en onda.
 * Solo se animan transform y opacity.
 */
export function ChapterScrubber({ chapters, label }: ChapterScrubberProps) {
  const [active, setActive] = useState(0)
  /** Posición del cursor o del foco, en marcas (null = ninguno): la tarjeta y la onda la siguen. */
  const [pos, setPos] = useState<number | null>(null)

  useEffect(() => {
    const sections = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => el !== null)
    let frame = 0
    const update = () => {
      frame = 0
      // Línea de lectura: 40 % desde arriba de la pantalla.
      setActive(activeIndex(sections.map((el) => el.getBoundingClientRect().top), window.innerHeight * 0.4))
    }
    const onMove = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onMove, { passive: true })
    window.addEventListener('resize', onMove)
    return () => {
      window.removeEventListener('scroll', onMove)
      window.removeEventListener('resize', onMove)
      cancelAnimationFrame(frame)
    }
  }, [chapters])

  const shown = pos === null ? active : Math.min(chapters.length - 1, Math.max(0, Math.round(pos)))

  return (
    <nav className="chapter" aria-label={label}>
      <ol
        className="chapter__rail"
        onPointerMove={(e) => setPos((e.clientY - e.currentTarget.getBoundingClientRect().top) / PITCH - 0.5)}
        onPointerLeave={() => setPos(null)}
      >
        {chapters.map((c, i) => {
          // Con "reducir movimiento" no hay onda: solo crece la marca señalada.
          const wave = pos === null ? 0 : motionOff() ? Number(i === shown) : bump(i - pos)
          const base = i === active ? 1 : i < active ? 0.6 : 0.3
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="chapter__tick"
                aria-label={c.title}
                aria-current={i === active ? 'location' : undefined}
                onFocus={() => setPos(i)}
                onBlur={() => setPos(null)}
              >
                <span
                  className="chapter__line"
                  data-state={i === active ? 'active' : i < active ? 'passed' : 'next'}
                  style={{ transform: `scaleX(${1 + (i === active ? 1 : 0) + 2.2 * wave})`, opacity: base + (1 - base) * wave }}
                />
              </a>
            </li>
          )
        })}
      </ol>
      <p className="chapter__card" aria-hidden="true" style={{ transform: `translateY(${shown * PITCH - 8}px)` }}>
        {chapters[shown]?.title}
      </p>
    </nav>
  )
}
