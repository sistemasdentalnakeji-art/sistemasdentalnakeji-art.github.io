// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LA SECCIÓN ANIMADA DEBAJO DEL HERO (componente: pages/home/sections/CareStory.tsx)
//
// Tres mensajes que se leen al bajar. Cada frase es una lista de líneas, y cada línea una lista de
// fragmentos; `accent: true` resalta el fragmento con el azul de la marca.
//   1. desire   → entra desde la izquierda.
//   2. priority → sube desde abajo y queda centrado.
//   3. decision → entra desde la derecha.
// Los tres mensajes son generales: no prometen resultados, técnicas ni procesos concretos, ni afirman datos de la clínica
// (las frases verificables, como "Dentistas certificados" o "Más de 35 años", están en HERO.highlights de data/home.ts).
// Para que la animación se vea igual conviene mantener el largo parecido: ~8 palabras en los mensajes 1 y 3, ~11 en el 2.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '@/config/routes'

interface StorySegment {
  text: string
  accent?: boolean
  /** Texto cuyo ancho se deja en blanco antes del fragmento: la línea empieza justo debajo de esas palabras. */
  indent?: string
}

export type StoryLines = StorySegment[][]

type StoryMessages = Record<'desire' | 'priority' | 'decision', StoryLines>

export const STORY: Record<Lang, StoryMessages> = {
  en: {
    desire: [
      [{ text: 'Smile without a second thought' }],
      [{ text: 'Talk without covering up,' }],
      // "With confidence" empieza justo debajo de "covering up": se deja en blanco el ancho de "Talk without ".
      [{ text: 'With confidence', accent: true, indent: 'Talk without ' }],
    ],
    priority: [
      [{ text: 'Caring for your smile is caring for yourself', accent: true }],
      [{ text: 'Every visit adds to your well-being' }],
    ],
    decision: [
      [{ text: 'We explain, you decide' }],
      [{ text: 'In Zona Río, Tijuana', accent: true }],
    ],
  },
  es: {
    // Sin puntos finales: las frases se leen como un hilo, no como oraciones sueltas.
    desire: [
      [{ text: 'Sonreír sin pensarlo' }],
      [{ text: 'Platicar sin taparte,' }],
      // "Con confianza" empieza justo debajo de "taparte": se deja en blanco el ancho de "Platicar sin ".
      [{ text: 'Con confianza', accent: true, indent: 'Platicar sin ' }],
    ],
    priority: [
      [{ text: 'Cuidar tu sonrisa es cuidarte', accent: true }],
      [{ text: 'Cada visita suma a tu bienestar' }],
    ],
    decision: [
      [{ text: 'Te explicamos, tú decides' }],
      [{ text: 'En la Zona Río de Tijuana', accent: true }],
    ],
  },
}
