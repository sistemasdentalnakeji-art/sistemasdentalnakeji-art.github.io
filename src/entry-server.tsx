// Entrada usada solo al compilar: genera el HTML estático de cada ruta (prerender).
import { renderToString } from 'react-dom/server'
import { App } from '@/app/App'
import { findRoute } from '@/config/routes'
import { buildHead, type HeadOptions } from '@/seo/head'

export { ALL_ROUTES, NOT_FOUND } from '@/config/routes'
export { SITE } from '@/config/site'
export { BOOKING } from '@/config/booking'

export function render(path: string, options: HeadOptions) {
  return {
    html: renderToString(<App path={path} />),
    head: buildHead(findRoute(path), options),
  }
}
