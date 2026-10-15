// ─────────────────────────────────────────────────────────────────────────────
// SERVICIOS DEL CARRUSEL DE LA HOMEPAGE (sección "Servicios destacados": pages/home/sections/FeaturedServices.tsx)
//
// • Son los 6 de FEATURED_PATHS (abajo): para cambiar cuáles salen o su orden, edita esa lista.
// • El contenido de cada tarjeta sale del hero de su propia página de servicio (data/services.ts): título (title),
//   frase de gancho (subtitle), tres frases (highlights) y foto (image, si ya tiene). El icono, de data/servicesCatalog.ts.
// • Sin foto en el hero del servicio, la tarjeta deja el espacio de la foto vacío para añadirla después.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICE_ROUTES } from '@/config/routes'
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

/** Etiqueta sobre cada tarjeta. */
export const FEATURED_BADGE = 'Más solicitado'

/** Servicios que salen en el carrusel, en este orden (rutas de SERVICE_ROUTES). */
const FEATURED_PATHS = [
  '/implantes-dentales-en-tijuana/',
  '/all-in-4-implants-en-tijuana/',
  '/ortodoncia-en-tijuana/',
  '/coronas-en-tijuana/',
  '/carillasdentalesentijuana/',
  '/blanqueamiento-dental-en-tijuana/',
]

export const FEATURED_ITEMS: FeaturedItem[] = FEATURED_PATHS.map((path) => {
  const route = SERVICE_ROUTES.find((item) => item.path === path)
  if (!route) throw new Error(`Servicio destacado sin ruta: ${path}`)
  const page = SERVICE_PAGES[route.path]
  const icon = CATALOG_SERVICES.find((service) => service.href === route.path)?.icon
  if (!page || !icon) throw new Error(`Servicio destacado sin contenido o icono: ${route.path}`)
  return { title: page.title, text: page.subtitle, bullets: page.highlights, href: route.path, icon, image: page.image }
})
