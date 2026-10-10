// Prerender sencillo sin dependencias extra:
// 1. `vite build` genera el cliente en dist/.
// 2. `vite build --ssr` genera dist-server/entry-server.js.
// 3. Este script escribe el HTML estático de cada ruta, robots.txt y sitemap.xml.
//
// Por defecto el build es de VISTA PREVIA (todo noindex). Solo `npm run build:prod`
// (o SITE_ENV=production) genera páginas indexables y el sitemap.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const production = process.argv.includes('--production') || process.env.SITE_ENV === 'production'

const serverEntry = pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href
const { render, ALL_ROUTES, NOT_FOUND, SITE, BOOKING } = await import(serverEntry)

// Seguro del formulario: el Apps Script valida al final, así que sus listas deben coincidir con las del sitio.
// Sin esto, cambiar SERVICES de config/booking.ts (u otras listas) sin actualizar Code.gs haría que el script rechace citas.
const codeGs = await fs.readFile(path.join(root, 'integrations', 'google-calendar', 'Code.gs'), 'utf8')
const gsList = (key) =>
  [...(codeGs.match(new RegExp(`${key}: \\[([^\\]]*)\\]`))?.[1] ?? '').matchAll(/'([^']*)'|(\d+)/g)].map(
    (match) => match[1] ?? Number(match[2]),
  )
const mismatches = [
  ['SERVICES', BOOKING.services],
  ['SLOTS', BOOKING.slots],
  ['CLOSED_WEEKDAYS', BOOKING.closedWeekdays],
]
  .filter(([key, list]) => JSON.stringify(gsList(key)) !== JSON.stringify(list))
  .map(([key]) => key)
if (codeGs.match(/DAYS_AHEAD: (\d+)/)?.[1] !== String(BOOKING.daysAhead)) mismatches.push('DAYS_AHEAD')
if (mismatches.length > 0) {
  throw new Error(`Code.gs no coincide con src/config/booking.ts en: ${mismatches.join(', ')}`)
}

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const HEAD_SLOT = '<!--app-head-->'
const APP_SLOT = '<div id="root"><!--app-html--></div>'
if (!template.includes(HEAD_SLOT) || !template.includes(APP_SLOT)) {
  throw new Error('dist/index.html no contiene los marcadores del prerender.')
}

// Precarga de las fuentes latinas (titulares y texto) para evitar saltos tipográficos.
const assets = await fs.readdir(path.join(dist, 'assets'))
const fontPreloads = assets
  .filter((file) => /^(manrope|inter)-latin-wght-normal-.+\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
if (fontPreloads.length === 0) {
  console.warn('AVISO: no se encontraron las fuentes latinas para precargar (¿cambió el nombre de los archivos de @fontsource?).')
}

const written = []
for (const route of [...ALL_ROUTES, NOT_FOUND]) {
  const indexable = production && route.status === 'ready'
  const { html, head } = render(route.path, { indexable })
  const page = template
    // Reemplazo con función: evita que "$&", "$'"… del contenido se interpreten como patrones.
    .replace(HEAD_SLOT, () => [head, ...fontPreloads].join('\n    '))
    .replace(APP_SLOT, () => `<div id="root" data-path="${route.path}">${html}</div>`)

  const file = route === NOT_FOUND ? path.join(dist, '404.html') : path.join(dist, route.path, 'index.html')
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page)
  written.push(`${indexable ? 'index  ' : 'noindex'}  ${path.relative(dist, file).replaceAll('\\', '/')}`)
}

// Seguro de producción: un build de producción nunca debe salir con el homepage en noindex.
if (production) {
  const home = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
  if (/name="robots" content="[^"]*noindex/.test(home)) {
    throw new Error('Build de producción con el homepage en noindex: revisa buildHead / el status de HOME.')
  }
}

// robots.txt y sitemap.xml: solo las páginas reales y terminadas.
// Sin <lastmod>: la fecha del build no es la de la última modificación y daría una señal falsa a Google.
const sitemapFile = path.join(dist, 'sitemap.xml')
if (production) {
  const urls = ALL_ROUTES.filter((route) => route.status === 'ready')
    .map((route) => `  <url>\n    <loc>${SITE.origin}${route.path}</loc>\n  </url>`)
    .join('\n')
  await fs.writeFile(
    sitemapFile,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`)
} else {
  await fs.rm(sitemapFile, { force: true })
  await fs.writeFile(path.join(dist, 'robots.txt'), '# Vista previa: no indexar.\nUser-agent: *\nDisallow: /\n')
}

console.log(`\nPrerender (${production ? 'PRODUCCIÓN' : 'vista previa, todo noindex'}):`)
console.log(written.map((line) => `  ${line}`).join('\n'))
console.log(production ? '  + robots.txt, sitemap.xml\n' : '  + robots.txt (Disallow), sin sitemap\n')
