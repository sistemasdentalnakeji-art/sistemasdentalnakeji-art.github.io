import { expect, test } from '@playwright/test'
import { GET } from '../api/reviews'

// Prueba de servidor (sin navegador): basta con correrla una vez.
test.skip(({ isMobile }) => isMobile, 'Prueba de servidor: basta con correrla una vez')

const realFetch = globalThis.fetch
let googleCalls = 0

function fakeGoogle(body: string, status = 200) {
  googleCalls = 0
  globalThis.fetch = (async () => {
    googleCalls++
    return new Response(body, { status })
  }) as typeof fetch
}

test.beforeEach(() => {
  process.env.GOOGLE_PLACES_API_KEY = 'llave'
  process.env.GOOGLE_PLACE_ID = 'lugar'
})

test.afterEach(() => {
  globalThis.fetch = realFetch
})

const call = (query: string) => GET(new Request(`http://sitio.test/api/reviews${query}`))

test.describe('api/reviews', () => {
  test('parámetros inventados se rechazan sin llamar a Google', async () => {
    fakeGoogle('{}')
    expect((await call('?x=1')).status).toBe(400)
    expect((await call('?lang=en&x=2')).status).toBe(400)
    expect((await call('?lang=fr')).status).toBe(400)
    expect((await call('?lang=es&lang=es')).status).toBe(400)
    expect((await call('?lang=%65n')).status).toBe(400)
    expect(googleCalls).toBe(0)
  })

  test('sin parámetro o con lang válido responde con las reseñas buenas', async () => {
    const review = {
      rating: 5,
      originalText: { text: 'Excelente atención, muy recomendable.' },
      authorAttribution: { displayName: 'Ana' },
    }
    fakeGoogle(JSON.stringify({ rating: 4.9, userRatingCount: 10, reviews: [review, { ...review, rating: 2 }] }))
    for (const query of ['', '?lang=es', '?lang=en']) {
      const response = await call(query)
      expect(response.status).toBe(200)
      expect(((await response.json()) as { reviews: unknown[] }).reviews).toHaveLength(1)
    }
  })

  test('si Google responde algo que no es JSON, la función contesta 502 y no se cae', async () => {
    fakeGoogle('<html>error</html>')
    expect((await call('?lang=es')).status).toBe(502)
  })

  test('sin llaves configuradas responde 503', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY
    fakeGoogle('{}')
    expect((await call('')).status).toBe(503)
    expect(googleCalls).toBe(0)
  })
})
