// ─────────────────────────────────────────────────────────────────────────────
// SERVICIOS DEL CARRUSEL DE LA HOMEPAGE (sección "Servicios destacados": pages/home/sections/FeaturedServices.tsx)
//
// • Son los 6 primeros de SERVICE_ROUTES (config/routes.ts), que están ordenados de más a menos importante
//   (doctores + demanda). Para cambiar cuáles salen o su orden, cambia el `slice` o el orden de esa lista.
// • El contenido de cada tarjeta sale del hero de su propia página de servicio (data/services.ts): título (title),
//   frase de gancho (subtitle), tres frases (highlights) y foto (image, si ya tiene). El icono, de data/servicesCatalog.ts.
// • Sin foto en el hero del servicio, la tarjeta deja el espacio de la foto vacío para añadirla después.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICE_ROUTES } from '@/config/routes'
import { SERVICE_PAGES, type ServiceContent } from '@/data/services'
import { CATALOG } from '@/data/servicesCatalog'
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

export const FEATURED_ITEMS: FeaturedItem[] = SERVICE_ROUTES.slice(0, 6).map((route) => {
  const page = SERVICE_PAGES[route.path]
  const icon = CATALOG.find((service) => service.href === route.path)?.icon
  if (!page || !icon) throw new Error(`Servicio destacado sin contenido o icono: ${route.path}`)
  return { title: page.title, text: page.subtitle, bullets: page.highlights, href: route.path, icon, image: page.image }
})
