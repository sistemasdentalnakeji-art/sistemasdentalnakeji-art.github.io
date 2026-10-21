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
  children: RouteDef[]
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
      children: MENU_SERVICE_KEYS.map(to),
      overview: { label: lang === 'en' ? 'View all services' : 'Ver todos los servicios', href: to('services').path },
    },
    {
      kind: 'menu',
      id: 'beneficios',
      label: to('benefits').label,
      children: [to('promotions'), to('insurance'), to('agreements')],
      overview: { label: lang === 'en' ? 'View all benefits' : 'Ver todos los beneficios', href: to('benefits').path },
    },
    link('contacto', 'contact'),
    link('nosotros', 'about'),
  ]
}

export const MAIN_NAV = Object.fromEntries(LANGS.map((lang) => [lang, buildNav(lang)])) as Record<Lang, NavItem[]>
