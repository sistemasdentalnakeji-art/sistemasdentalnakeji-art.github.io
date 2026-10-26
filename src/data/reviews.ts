// Reseñas de Google. Mientras no haya conexión, el sitio muestra estos MARCADORES DE DISEÑO (no son opiniones reales).
// Las reales llegan de api/reviews.ts (Google Places API) y las pide src/lib/useGoogleReviews.ts; los campos son los
// que entrega Google: autor, calificación, texto y fecha relativa. Se conserva la atribución que exige Google
// (nombre/enlace del autor y logo de Google).

import type { Lang } from '@/config/routes'
import { SITE } from '@/config/site'

export interface Review {
  author: string
  /** 1 a 5. `null` mientras sea un marcador. */
  rating: number | null
  text: string
  relativeTime: string
  authorUrl?: string
  photoUrl?: string
  /** La reseña en Google Maps. */
  googleUrl?: string
}

/** Respuesta de api/reviews.ts. */
export interface GoogleReviews {
  rating: number | null
  total: number | null
  reviews: Review[]
}

const PLACEHOLDER: Record<Lang, { author: string; text: string; relativeTime: string }> = {
  en: {
    author: 'Patient',
    text: 'The comment the patient posted on Google will appear here.',
    relativeTime: 'Review date',
  },
  es: {
    author: 'Paciente',
    text: 'Aquí se mostrará el comentario que el paciente publicó en Google.',
    relativeTime: 'Fecha de la reseña',
  },
}

const buildReviews = (lang: Lang): Review[] =>
  Array.from({ length: 6 }, (_, index) => ({
    author: `${PLACEHOLDER[lang].author} ${index + 1}`,
    rating: null,
    text: PLACEHOLDER[lang].text,
    relativeTime: PLACEHOLDER[lang].relativeTime,
  }))

export const REVIEWS: Record<Lang, Review[]> = { en: buildReviews('en'), es: buildReviews('es') }

export const REVIEWS_SUMMARY = {
  /** Calificación promedio y total de reseñas en Google. `null` mientras no haya conexión. */
  rating: null as number | null,
  total: null as number | null,
  profileUrl: SITE.address.mapsUrl,
}
