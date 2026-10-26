// Función de Vercel: pide a Google (Places API) las reseñas de la clínica y las entrega ya filtradas.
// La llave vive SOLO aquí (variables de entorno de Vercel), nunca llega al navegador.
// Variables: GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID (ver .env.example).

const MIN_RATING = 4
const MIN_TEXT_LENGTH = 20
// Un fallo se guarda un minuto: así una caída de Google no dispara una llamada de pago por cada visita.
const ERROR_CACHE = 'public, s-maxage=60'

interface GoogleReview {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  googleMapsUri?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

const httpsOnly = (url?: string) => (url?.startsWith('https://') ? url : undefined)

const json = (body: unknown, status: number, cache = ERROR_CACHE) =>
  Response.json(body, { status, headers: { 'Cache-Control': cache } })

export async function GET(request: Request) {
  const { GOOGLE_PLACES_API_KEY: key, GOOGLE_PLACE_ID: placeId } = process.env
  if (!key || !placeId) return json({ error: 'not-configured' }, 503)

  const lang = new URL(request.url).searchParams.get('lang') === 'en' ? 'en' : 'es'

  const google = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`,
    {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' },
      signal: AbortSignal.timeout(5000),
    },
  ).catch(() => null)
  if (!google?.ok) return json({ error: 'google-unavailable' }, 502)

  const data = (await google.json()) as { rating?: number; userRatingCount?: number; reviews?: GoogleReview[] }

  // Se muestra el texto original del paciente (no la traducción automática de Google), solo reseñas buenas y con texto.
  const reviews = (data.reviews ?? [])
    .map((review) => ({
      author: review.authorAttribution?.displayName ?? '',
      rating: review.rating ?? 0,
      text: (review.originalText?.text ?? review.text?.text ?? '').trim(),
      relativeTime: review.relativePublishTimeDescription ?? '',
      authorUrl: httpsOnly(review.authorAttribution?.uri),
      photoUrl: httpsOnly(review.authorAttribution?.photoUri),
      googleUrl: httpsOnly(review.googleMapsUri),
    }))
    .filter((review) => review.author && review.rating >= MIN_RATING && review.text.length >= MIN_TEXT_LENGTH)

  // Un día en caché; si Google falla, se sigue mostrando la última copia hasta por una semana.
  return json(
    { rating: data.rating ?? null, total: data.userRatingCount ?? null, reviews },
    200,
    'public, s-maxage=86400, stale-while-revalidate=604800',
  )
}
