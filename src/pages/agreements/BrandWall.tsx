// ─────────────────────────────────────────────────────────────────────────────
// MURO DE MARCAS de /convenios/: tarjeta con título + una ficha por empresa con convenio (AgreementsPage.tsx lo usa).
//
// • Ciclo automático, sin tocar nada: mientras el muro está a la vista, las fichas se encienden solas una por una
//   (STEP_MS = 2 s cada una, en el orden de la lista, y se repite). Empieza en la primera cada vez que el muro entra a pantalla.
// • El mouse es independiente: la ficha bajo el cursor también se enciende, pero NO frena ni reinicia el ciclo (pueden estar
//   encendidas dos a la vez: la del ciclo y la del cursor).
// • Encendida = logo a color, nombre en blanco sobre un chip del color de la marca, ola que respira, contorno estilo Siri y
//   sombra (`accent` en src/data/partners.ts → variable --brand). El estado va en data-lit; el aspecto, en
//   src/styles/pages/agreements.css.
// • También en celular (el ciclo no necesita cursor). Con "reducir movimiento" o con "Pausar animaciones" no hay ciclo y los
//   logos se ven siempre a color.
// • Se renderiza también en Node: nada de window/document durante el render, solo dentro de efectos y eventos.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import type { Partner } from '@/data/partners'
import { Icon } from '@/components/ui/Icon'
import { motionOff } from '@/lib/motion'

/** Lo que dura cada ficha encendida en el ciclo automático. */
const STEP_MS = 2000

/** Solo el mouse enciende la ficha bajo el cursor: con el dedo no hay "cursor encima". */
const isMouse = (event: PointerEvent) => event.pointerType === 'mouse'

interface Props {
  companies: Partner[]
  summary: { title: string; text: string }
  /** Nombre accesible del muro. */
  label: string
}

export function BrandWall({ companies, summary, label }: Props) {
  const wallRef = useRef<HTMLUListElement>(null)
  const [visible, setVisible] = useState(false)
  const [auto, setAuto] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  // El ciclo solo existe mientras el muro se ve (en escritorio y en celular).
  useEffect(() => {
    const wall = wallRef.current
    if (!wall) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAuto(0)
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    observer.observe(wall)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const id = window.setInterval(() => {
      if (!motionOff()) setAuto((index) => (index + 1) % companies.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [visible, companies.length])

  return (
    <ul ref={wallRef} className="brand-wall" role="list" aria-label={label}>
      <li className="brand-wall__summary">
        <h2 className="brand-wall__title">{summary.title}</h2>
      </li>
      {companies.map((company, index) => (
        <li
          key={company.name}
          className="brand-tile"
          data-lit={(visible && auto === index) || hovered === index}
          style={{ '--brand': company.accent ?? 'var(--color-brand)' } as CSSProperties}
          onPointerEnter={(event) => isMouse(event) && setHovered(index)}
          onPointerLeave={(event) => isMouse(event) && setHovered(null)}
        >
          <span className="brand-tile__clip" aria-hidden="true">
            <span className="brand-tile__glow" />
          </span>
          <span className="brand-tile__ring" aria-hidden="true" />
          {company.logo ? (
            <img
              className={company.logo.framed ? 'brand-tile__logo is-framed' : 'brand-tile__logo'}
              src={company.logo.src}
              width={company.logo.width}
              height={company.logo.height}
              style={{ '--ar': company.logo.width / company.logo.height, '--w': company.logo.width } as CSSProperties}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Icon name="building" size={34} />
          )}
          <span className="brand-tile__name">{company.name}</span>
        </li>
      ))}
    </ul>
  )
}
