import { expect, test } from '@playwright/test'
import { storyThread, turnXAt, type StoryLayout } from '../src/lib/storyThread'

// Trazado del hilo del diente (sin navegador): las vueltas no tocan el texto y no salen del margen de la página.
const sides = [1, -1, 1] as const

function check(layout: StoryLayout) {
  const { turns } = storyThread(layout)
  turns.forEach((turn, i) => {
    const side = sides[i]
    // Ni dentro del texto (en cualquier altura que comparta con la vuelta) ni fuera del margen.
    for (const box of layout.boxes) {
      for (let y = Math.max(box.top, turn.ya); y <= Math.min(box.bottom, turn.yb); y += 2) {
        const x = turnXAt(turn, side, y)
        if (side === 1) expect(x).toBeGreaterThanOrEqual(box.right + layout.gap - 0.5)
        else expect(x).toBeLessThanOrEqual(box.left - layout.gap + 0.5)
      }
    }
    if (side === 1) expect(turn.cx + turn.rx).toBeLessThanOrEqual(layout.width + layout.outside + 0.5)
    else expect(turn.cx - turn.rx).toBeGreaterThanOrEqual(-layout.outside - 0.5)
  })
}

test.describe('Hilo del diente', () => {
  test('escritorio: texto casi a todo lo ancho, la vuelta se aplana y no lo toca', () => {
    check({
      width: 1264,
      height: 903,
      outside: 40,
      gap: 24,
      boxes: [
        { left: 40, right: 1220, top: 0, bottom: 236 },
        { left: 250, right: 1010, top: 390, bottom: 570 },
        { left: 520, right: 1225, top: 722, bottom: 903 },
      ],
    })
  })

  test('escritorio: texto corto, la vuelta es un círculo', () => {
    const layout = {
      width: 1264,
      height: 903,
      outside: 40,
      gap: 24,
      boxes: [
        { left: 40, right: 700, top: 0, bottom: 236 },
        { left: 300, right: 960, top: 390, bottom: 570 },
        { left: 600, right: 1000, top: 722, bottom: 903 },
      ],
    }
    check(layout)
    const { turns } = storyThread(layout)
    expect(turns[0].rx).toBeCloseTo(turns[0].ry)
  })

  test('celular: texto de orilla a orilla, el hilo pasa por el margen', () => {
    check({
      width: 359,
      height: 582,
      outside: 6,
      gap: 8,
      boxes: [
        { left: 14, right: 345, top: 0, bottom: 157 },
        { left: 14, right: 345, top: 233, bottom: 343 },
        { left: 14, right: 345, top: 419, bottom: 582 },
      ],
    })
  })
})
