// Entrada usada solo al compilar: genera el HTML estático de cada ruta (prerender).
import { renderToString } from 'react-dom/server'
import { prerender } from 'react-dom/static'
import { App } from '@/app/App'
export { lazySourceOf } from '@/app/App'
import { findRoute } from '@/config/routes'
import { buildHead, type HeadOptions } from '@/seo/head'

export { ALL_ROUTES, NOT_FOUND, counterpart, routeOf } from '@/config/routes'
export { LOCALES, SITE } from '@/config/site'
export { BOOKING } from '@/config/booking'

export async function render(path: string, options: HeadOptions) {
  // Primera pasada: carga las páginas diferidas (React.lazy en App.tsx). La segunda (renderToString) ya las tiene y escribe el
  // HTML completo y visible; el HTML de prerender necesitaría scripts en línea para mostrarse, y la CSP de vercel.json los bloquea.
  await prerender(<App path={path} />)
  return { html: renderToString(<App path={path} />), head: buildHead(findRoute(path), options) }
}
