// ─────────────────────────────────────────────────────────────────────────────
// MENÚ PRINCIPAL DEL HEADER
//
// Cómo editar:
// • Enlace simple → { kind: "link", id, label, href }.
// • Opción con submenú → { kind: "menu", id, label, children: [rutas], overview? }.
//   Las rutas (children) se definen en src/config/routes.ts.
// El orden de la lista es el orden en que aparecen en el menú.
// ─────────────────────────────────────────────────────────────────────────────

import { LANGS, routeOf, type Lang, type RouteDef, type RouteKey, type ServiceKey } from '@/config/routes'
import type { IconName } from '@/components/ui/Icon'
import { CATALOG_SERVICES } from '@/data/servicesCatalog'

/** Ruta del submenú con el icono que se muestra junto a su nombre. */
export type NavChild = RouteDef & { icon: IconName }

interface NavLink {
  kind: 'link'
  id: string
  label: string
  href: string
}

export interface NavMenu {
  kind: 'menu'
  id: string
  label: string
  children: NavChild[]
  /** Enlace "ver todo" que se muestra dentro del submenú. */
  overview?: { label: string; href: string }
}

type NavItem = NavLink | NavMenu

/** Servicios del menú: 9, en cuadrícula de 3 x 3 que se lee por filas (dos de cada categoría de /servicios/ (Limpieza y Periodoncia en la de encías); el resto, en "Ver todos los servicios"). */
const MENU_SERVICE_KEYS: ServiceKey[] = [
  'implants',
  'all-on-4',
  'crowns',
  'veneers',
  'orthodontics',
  'aligners',
  'cleaning',
  'gum',
  'root-canal',
]

const buildNav = (lang: Lang): NavItem[] => {
  const to = (key: RouteKey) => routeOf(key, lang)
  const link = (id: string, key: RouteKey): NavLink => ({
    kind: 'link',
    id,
    label: to(key).label,
    href: to(key).path,
  })
  return [
    link('inicio', 'home'),
    {
      kind: 'menu',
      id: 'servicios',
      label: to('services').label,
      children: MENU_SERVICE_KEYS.map((key) => {
        const icon = CATALOG_SERVICES.find((service) => service.key === key)?.icon
        if (!icon) throw new Error(`Servicio del menú sin icono: ${key}`)
        return { ...to(key), icon }
      }),
      overview: { label: lang === 'en' ? 'View all services' : 'Ver todos los servicios', href: to('services').path },
    },
    {
      kind: 'menu',
      id: 'beneficios',
      label: to('benefits').label,
      children: [
        { ...to('promotions'), icon: 'sparkle' },
        { ...to('insurance'), icon: 'shield' },
        { ...to('agreements'), icon: 'building' },
      ],
      overview: { label: lang === 'en' ? 'View all benefits' : 'Ver todos los beneficios', href: to('benefits').path },
    },
    link('contacto', 'contact'),
    link('nosotros', 'about'),
    // Información de la clínica, en este orden: blog, términos y condiciones y aviso de privacidad.
    {
      kind: 'menu',
      id: 'mas',
      label: lang === 'en' ? 'More' : 'Más',
      children: [
        { ...to('blog'), icon: 'book' },
        { ...to('terms'), icon: 'document' },
        { ...to('privacy'), icon: 'lock' },
      ],
    },
  ]
}

export const MAIN_NAV = Object.fromEntries(LANGS.map((lang) => [lang, buildNav(lang)])) as Record<Lang, NavItem[]>
