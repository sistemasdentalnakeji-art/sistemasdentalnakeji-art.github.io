// ─────────────────────────────────────────────────────────────────────────────
// TABLERO DE ASEGURANZAS (dentro de /insurance/): una rejilla con todos los logos quietos y, de vez en cuando, una LÍNEA de
// luz azul que se dibuja sobre las líneas de la rejilla, da vueltas en los cruces (como Snake) y se borra por la cola.
//
// • La línea nace en un cruce al azar y recorre de 2 a 4 casillas (nunca más), sin retroceder ni cruzarse; no usa las 4 esquinas
//   (están redondeadas). Es un trazo SVG con degradado azul de marca (#9fd8f5 → #3fb5c8 → #2f63ad) y resplandor.
// • Los logos NO se mueven. Todo el azar y el SVG se crean en useEffect (nada en el render del servidor).
// • No corre con "reducir movimiento", con "Pausar animaciones" (footer), con la pestaña oculta ni fuera de pantalla.
// • Logos y textos → src/data/partners.ts (INSURANCES). Estilos → src/styles/pages/insurance.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, type CSSProperties } from 'react'
import type { Partner } from '@/data/partners'

const SVG_NS = 'http://www.w3.org/2000/svg'
const BEAM_MS = 1900 // debe coincidir con la animación `insurers-beam` del CSS
const MAX_BEAMS = 2
const DIRS: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]] // der., abajo, izq., arriba (fila, columna)

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)]

/** Camino de 2 a 4 tramos sobre los cruces de la rejilla: recto pesa doble, nunca retrocede ni repite cruce ni pisa una esquina. */
function beamPath(rows: number, cols: number): [number, number][] {
  const segments = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 3 : 4
  const corner = (r: number, c: number) => (r === 0 || r === rows) && (c === 0 || c === cols)
  const free = (r: number, c: number, path: [number, number][]) =>
    r >= 0 && r <= rows && c >= 0 && c <= cols && !corner(r, c) && !path.some(([pr, pc]) => pr === r && pc === c)

  for (let attempt = 0; attempt < 8; attempt++) {
    let r = Math.floor(Math.random() * (rows + 1))
    let c = Math.floor(Math.random() * (cols + 1))
    if (corner(r, c)) continue
    let dir = Math.floor(Math.random() * 4)
    const path: [number, number][] = [[r, c]]
    while (path.length <= segments) {
      const options = [dir, dir, (dir + 1) % 4, (dir + 3) % 4].filter((d) => free(r + DIRS[d][0], c + DIRS[d][1], path))
      if (!options.length) break
      dir = pick(options)
      r += DIRS[dir][0]
      c += DIRS[dir][1]
      path.push([r, c])
    }
    if (path.length >= 3) return path
  }
  return []
}

export function InsuranceGrid({ insurers }: { insurers: Partner[] }) {
  const boardRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const board = boardRef.current
    const grid = gridRef.current
    const svg = svgRef.current
    if (!board || !grid || !svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set<number>()
    let visible = false
    let active = 0
    let serial = 0
    let next = 0

    const launch = () => {
      const cells = Array.from(grid.children) as HTMLElement[]
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length
      const rows = Math.ceil(cells.length / cols)
      const path = beamPath(rows, cols)
      if (!path.length) return

      // Posición de cada línea de la rejilla: el hueco de 1 px entre celdas, y el borde del tablero por fuera.
      const origin = board.getBoundingClientRect()
      const rect = (index: number) => cells[index].getBoundingClientRect()
      const xs = Array.from({ length: cols + 1 }, (_, c) =>
        c === 0 ? rect(0).left - origin.left - 0.5 : c === cols ? rect(cols - 1).right - origin.left + 0.5 : (rect(c - 1).right + rect(c).left) / 2 - origin.left,
      )
      const ys = Array.from({ length: rows + 1 }, (_, r) =>
        r === 0 ? rect(0).top - origin.top - 0.5 : r === rows ? rect((rows - 1) * cols).bottom - origin.top + 0.5 : (rect((r - 1) * cols).bottom + rect(r * cols).top) / 2 - origin.top,
      )
      const points = path.map(([r, c]) => [xs[c], ys[r]])

      const group = document.createElementNS(SVG_NS, 'g')
      const gradient = document.createElementNS(SVG_NS, 'linearGradient')
      const id = `insurers-beam-${(serial += 1)}`
      const [first, last] = [points[0], points[points.length - 1]]
      gradient.setAttribute('id', id)
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse')
      gradient.setAttribute('x1', String(first[0]))
      gradient.setAttribute('y1', String(first[1]))
      gradient.setAttribute('x2', String(last[0]))
      gradient.setAttribute('y2', String(last[1]))
      ;['#9fd8f5', '#3fb5c8', '#2f63ad'].forEach((color, index) => {
        const stop = document.createElementNS(SVG_NS, 'stop')
        stop.setAttribute('offset', String(index / 2))
        stop.setAttribute('stop-color', color)
        gradient.appendChild(stop)
      })
      const line = document.createElementNS(SVG_NS, 'path')
      line.setAttribute('class', 'insurers__beam')
      line.setAttribute('d', points.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' '))
      line.setAttribute('pathLength', '1')
      line.setAttribute('stroke', `url(#${id})`)
      group.append(gradient, line)
      svg.appendChild(group)

      active += 1
      const done = window.setTimeout(() => {
        group.remove()
        active -= 1
        timers.delete(done)
      }, BEAM_MS + 100)
      timers.add(done)
    }

    const tick = () => {
      const paused = document.documentElement.dataset.motion === 'paused' || document.hidden
      if (visible && !paused && active < MAX_BEAMS) launch()
      next = window.setTimeout(tick, 700 + Math.random() * 1400)
    }

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 })
    observer.observe(grid)
    next = window.setTimeout(tick, 1000)

    return () => {
      observer.disconnect()
      window.clearTimeout(next)
      timers.forEach((timer) => window.clearTimeout(timer))
      svg.replaceChildren()
    }
  }, [])

  return (
    <div ref={boardRef} className="insurers__board">
      <ul ref={gridRef} className="insurers__grid" role="list">
        {insurers.map((insurer) => (
          <li key={insurer.name} className="insurers__cell">
            {insurer.logo && (
              <img
                src={insurer.logo.src}
                width={insurer.logo.width}
                height={insurer.logo.height}
                alt={insurer.name}
                // Proporción del logo: el CSS la usa para que todos ocupen un área parecida.
                style={{ '--ar': insurer.logo.width / insurer.logo.height } as CSSProperties}
                loading="lazy"
                decoding="async"
              />
            )}
          </li>
        ))}
      </ul>
      <svg ref={svgRef} className="insurers__beams" aria-hidden="true" focusable="false" />
    </div>
  )
}
