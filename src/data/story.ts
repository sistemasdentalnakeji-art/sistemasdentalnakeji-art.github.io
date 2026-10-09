// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LA SECCIÓN ANIMADA DEBAJO DEL HERO (componente: pages/home/sections/CareStory.tsx)
//
// Tres mensajes que se leen al bajar. Cada frase es una lista de líneas, y cada línea una lista de
// fragmentos; `accent: true` resalta el fragmento con el azul de la marca.
//   1. desire   → entra desde la izquierda.
//   2. priority → sube desde abajo y queda centrado.
//   3. decision → entra desde la derecha.
// Los mensajes 1 y 2 son generales: no prometen resultados, técnicas ni procesos concretos.
// El mensaje 3 usa las frases publicadas en el sitio oficial (igual que HERO.highlights en data/home.ts):
// confirma "Dentistas certificados" y "Más de 35 años" con la clínica antes de publicar.
// ─────────────────────────────────────────────────────────────────────────────

export interface StorySegment {
  text: string
  accent?: boolean
}

export type StoryLines = StorySegment[][]

export const STORY: Record<'desire' | 'priority' | 'decision', StoryLines> = {
  desire: [
    [{ text: 'Disfrutar lo que comes.' }],
    [{ text: 'Reír en las fotos. ' }, { text: 'Sentirte tú.', accent: true }],
  ],
  priority: [
    [{ text: 'Salud, función y estética.', accent: true }],
    [{ text: 'Cada una importa en el cuidado de tu sonrisa.' }],
  ],
  decision: [
    [{ text: 'Dentistas certificados.' }],
    [{ text: 'Más de 35 años de trayectoria.', accent: true }],
  ],
}
