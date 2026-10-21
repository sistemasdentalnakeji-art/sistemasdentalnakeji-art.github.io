// ─────────────────────────────────────────────────────────────────────────────
// SEO: ETIQUETAS DEL <head> (título, descripción, robots, Open Graph y JSON-LD)
//
// Se usan al compilar (scripts/prerender.mjs) para escribir el <head> de cada página.
// • Títulos y descripciones de cada ruta → src/config/routes.ts.
// • Datos de la clínica del JSON-LD → src/config/site.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { counterpart, routeOf, type Lang, type RouteDef } from '@/config/routes'
import { LOCALES, SITE } from '@/config/site'

export interface HeadOptions {
  /** true solo en el build de producción y para páginas terminadas. */
  indexable: boolean
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`

const LOGO_URL = `${SITE.origin}${SITE.logo.full}`

/** Descripción de la clínica por idioma: la misma del pie de página original (dato publicado), sin horarios ni calificaciones. */
const CLINIC_DESCRIPTION: Record<Lang, string> = {
  en: 'Dental clinic in Zona Urbana Río Tijuana, Baja California, Mexico.',
  es: 'Clínica dental en la Zona Urbana Río Tijuana, Baja California.',
}

/** Datos estructurados de la clínica. Solo información publicada y verificable. */
function clinicJsonLd(route: RouteDef) {
  const { origin, address } = SITE
  const homeUrl = `${origin}${route.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dentist',
        '@id': `${origin}/#clinica`,
        name: SITE.name,
        alternateName: SITE.legalName,
        description: CLINIC_DESCRIPTION[route.lang],
        inLanguage: LOCALES[route.lang].lang,
        url: homeUrl,
        logo: LOGO_URL,
        image: LOGO_URL,
        email: SITE.email,
        telephone: SITE.phones[0].e164,
        contactPoint: SITE.phones.map((phone) => ({
          '@type': 'ContactPoint',
          telephone: phone.e164,
          contactType: 'customer service',
        })),
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${address.street}, ${address.neighborhood}`,
          addressLocality: address.city,
          addressRegion: 'Baja California',
          postalCode: address.postalCode,
          addressCountry: address.country,
        },
        hasMap: address.mapsUrl,
        sameAs: [SITE.social.facebook, SITE.social.instagram],
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#sitio`,
        url: homeUrl,
        // Mismo nombre que og:site_name y el título; Google lo usa como nombre del sitio en los resultados.
        name: SITE.name,
        alternateName: SITE.legalName,
        inLanguage: LOCALES[route.lang].lang,
        publisher: { '@id': `${origin}/#clinica` },
      },
    ],
  }
}

/** Etiquetas del <head> de cada ruta (se insertan al prerenderizar). */
export function buildHead(route: RouteDef, { indexable }: HeadOptions): string {
  const tags = [`<title>${escapeHtml(route.title)}</title>`]
  if (route.description) tags.push(meta('name', 'description', route.description))

  tags.push(meta('name', 'robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'))

  // Canonical, hreflang y Open Graph: el homepage y toda página terminada ('ready'). El JSON-LD de la clínica, solo el homepage.
  if (route.key === 'home' || route.status === 'ready') {
    const url = `${SITE.origin}${route.path}`
    const other = counterpart(route)
    const alternate = (hreflang: string, target: RouteDef) =>
      `<link rel="alternate" hreflang="${hreflang}" href="${SITE.origin}${target.path}" />`
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      // Pareja (en, es) en cada página, más x-default hacia la versión en inglés (la principal).
      alternate(LOCALES[route.lang].lang, route),
      alternate(LOCALES[other.lang].lang, other),
      alternate('x-default', routeOf(route.key, 'en')),
      meta('property', 'og:type', 'website'),
      meta('property', 'og:locale', LOCALES[route.lang].og),
      meta('property', 'og:locale:alternate', LOCALES[other.lang].og),
      meta('property', 'og:site_name', SITE.name),
      meta('property', 'og:title', route.title),
      meta('property', 'og:description', route.description ?? ''),
      meta('property', 'og:url', url),
      meta('property', 'og:image', LOGO_URL),
      meta('property', 'og:image:width', String(SITE.logo.fullWidth)),
      meta('property', 'og:image:height', String(SITE.logo.fullHeight)),
      meta('property', 'og:image:alt', `${route.lang === 'es' ? 'Logo de' : 'Logo of'} ${SITE.name}`),
      meta('name', 'twitter:card', 'summary'),
    )
    if (route.key === 'home') {
      tags.push(`<script type="application/ld+json">${JSON.stringify(clinicJsonLd(route)).replace(/</g, '\\u003c')}</script>`)
    }
  }

  return tags.join('\n    ')
}

/**
 * Cuando la URL no tiene HTML propio (desarrollo, o un hosting que sirve el homepage como respaldo):
 * actualiza título, descripción y robots, y quita las etiquetas exclusivas del homepage.
 */
export function applyHead(route: RouteDef) {
  document.title = route.title
  document.documentElement.lang = LOCALES[route.lang].lang
  if (route.key !== 'home') {
    document.head
      .querySelectorAll(
        'link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name="twitter:card"], script[type="application/ld+json"]',
      )
      .forEach((tag) => tag.remove())
  }
  const upsert = (name: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = name
      document.head.append(tag)
    }
    tag.content = content
  }
  if (route.description) upsert('description', route.description)
  upsert('robots', 'noindex, follow')
}
