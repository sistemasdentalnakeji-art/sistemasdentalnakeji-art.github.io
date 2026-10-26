import { useEffect, useState } from 'react'
import type { Lang } from '@/config/routes'
import type { GoogleReviews } from '@/data/reviews'

/** Reseñas reales de api/reviews.ts. Devuelve `null` si no hay conexión (en desarrollo, sin llave o sin reseñas): el sitio deja los marcadores. */
export function useGoogleReviews(lang: Lang) {
  const [data, setData] = useState<GoogleReviews | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/reviews?lang=${lang}`, { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<GoogleReviews>) : null))
      .then((json) => setData(json?.reviews.length ? json : null))
      .catch(() => {}) // sin conexión o respuesta que no es JSON (p. ej. en desarrollo): se quedan los marcadores
    return () => controller.abort()
  }, [lang])

  return data
}
