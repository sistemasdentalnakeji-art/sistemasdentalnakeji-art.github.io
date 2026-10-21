// ─────────────────────────────────────────────────────────────────────────────
// SERVICIOS DEL CARRUSEL DE LA HOMEPAGE (sección "Servicios destacados": pages/home/sections/FeaturedServices.tsx)
//
// • Son los 6 de FEATURED_KEYS (abajo): para cambiar cuáles salen o su orden, edita esa lista.
// • El contenido de cada tarjeta sale del hero de su propia página de servicio (data/services.ts): título (title),
//   frase de gancho (subtitle), tres frases (highlights) y foto (image, si ya tiene). El icono, de data/servicesCatalog.ts.
// • Sin foto en el hero del servicio, la tarjeta deja el espacio de la foto vacío para añadirla después.
// ─────────────────────────────────────────────────────────────────────────────

import { LANGS, routeOf, type Lang, type ServiceKey } from '@/config/routes'
import { SERVICE_PAGES, type ServiceContent } from '@/data/services'
import { CATALOG_SERVICES } from '@/data/servicesCatalog'
import type { IconName } from '@/components/ui/Icon'

export interface FeaturedItem {
  title: string
  text: string
  bullets: readonly string[]
  href: string
  icon: IconName
  image?: ServiceContent['image']
}

/** Servicios que salen en el carrusel, en este orden (claves de config/routes.ts). */
const FEATURED_KEYS: ServiceKey[] = ['implants', 'all-on-4', 'orthodontics', 'crowns', 'veneers', 'whitening']

const buildItems = (lang: Lang): FeaturedItem[] =>
  FEATURED_KEYS.map((key) => {
    const page = SERVICE_PAGES[lang][key]
    const icon = CATALOG_SERVICES.find((service) => service.key === key)?.icon
    if (!page || !icon) throw new Error(`Servicio destacado sin contenido o icono: ${key}`)
    return { title: page.title, text: page.subtitle, bullets: page.highlights, href: routeOf(key, lang).path, icon, image: page.image }
  })

export const FEATURED_ITEMS = Object.fromEntries(LANGS.map((lang) => [lang, buildItems(lang)])) as Record<Lang, FeaturedItem[]>
