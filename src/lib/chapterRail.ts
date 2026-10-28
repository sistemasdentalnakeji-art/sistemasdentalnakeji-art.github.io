// Lógica sin pantalla del riel de capítulos (components/ui/ChapterScrubber.tsx); la prueba está en tests/chapter-rail.spec.ts.

/** Marcas a cada lado del cursor que se contagian de su crecimiento. */
export const REACH = 3

/** Crecimiento de una marca (0 a 1) según su distancia en marcas al cursor: coseno elevado, sin cortes en los bordes. */
export const bump = (distance: number) => (1 + Math.cos(Math.PI * Math.min(Math.abs(distance) / REACH, 1))) / 2

/** Índice de la última sección cuyo borde superior ya pasó la línea de lectura (0 si ninguna). */
export const activeIndex = (tops: number[], line: number) => tops.reduce((active, top, i) => (top <= line ? i : active), 0)
