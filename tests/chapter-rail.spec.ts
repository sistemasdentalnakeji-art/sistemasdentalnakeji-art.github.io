import { expect, test } from '@playwright/test'
import { REACH, activeIndex, bump } from '../src/lib/chapterRail'

// Lógica del riel de capítulos (sin navegador): qué marca crece con el cursor y cuál sección está activa.
test.describe('Riel de capítulos', () => {
  test('la marca bajo el cursor crece al máximo y deja de crecer a REACH marcas', () => {
    expect(bump(0)).toBe(1)
    expect(bump(REACH)).toBeCloseTo(0)
    expect(bump(-REACH * 2)).toBeCloseTo(0)
    expect(bump(1)).toBeCloseTo(bump(-1))
    expect(bump(1)).toBeGreaterThan(bump(2))
  })

  test('la sección activa es la última cuyo borde ya pasó la línea de lectura', () => {
    expect(activeIndex([300, 900, 1500], 360)).toBe(0)
    expect(activeIndex([-200, 100, 1500], 360)).toBe(1)
    expect(activeIndex([-900, -300, -10], 360)).toBe(2)
    expect(activeIndex([], 360)).toBe(0)
  })
})
