// Reseñas de Google: MARCADORES DE DISEÑO, no son opiniones reales.
// Se reemplazarán por reseñas reales (Google Places API o un widget). La estructura
// sigue los campos que entrega Google: autor, calificación, texto y fecha relativa.
// Al conectar la API, conserva la atribución que exige Google (nombre/enlace del autor y logo de Google).

import { SITE } from '@/config/site'

export interface Review {
  author: string
  /** 1 a 5. `null` mientras sea un marcador. */
  rating: number | null
  text: string
  relativeTime: string
  authorUrl?: string
  photoUrl?: string
}

export const REVIEWS: Review[] = Array.from({ length: 6 }, (_, index) => ({
  author: `Paciente ${index + 1}`,
  rating: null,
  text: 'Aquí se mostrará el comentario que el paciente publicó en Google.',
  relativeTime: 'Fecha de la reseña',
}))

export const REVIEWS_SUMMARY = {
  /** Calificación promedio y total de reseñas en Google. `null` mientras no haya conexión. */
  rating: null as number | null,
  total: null as number | null,
  profileUrl: SITE.address.mapsUrl,
}
