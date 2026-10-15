// ─────────────────────────────────────────────────────────────────────────────
// MENÚ PRINCIPAL DEL HEADER
//
// Cómo editar:
// • Enlace simple → { kind: "link", id, label, href }.
// • Opción con submenú → { kind: "menu", id, label, children: [rutas], overview? }.
//   Las rutas (children) se definen en src/config/routes.ts.
// El orden de la lista es el orden en que aparecen en el menú.
// ─────────────────────────────────────────────────────────────────────────────

import {
  ABOUT,
  BENEFIT_ROUTES,
  BENEFITS,
  CONTACT,
  HOME,
  MORE_SERVICE_ROUTES,
  SERVICE_ROUTES,
  SERVICES,
  type RouteDef,
} from '@/config/routes'

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
const MENU_SERVICE_PATHS = [
  '/implantes-dentales-en-tijuana/',
  '/all-in-4-implants-en-tijuana/',
  '/coronas-en-tijuana/',
  '/carillasdentalesentijuana/',
  '/ortodoncia-en-tijuana/',
  '/invisalign-in-tijuana/',
  '/limpieza-dental-en-tijuana/',
  '/periodoncia-en-tijuana/',
  '/endodoncias-en-tijuana/',
]

const MENU_SERVICES: RouteDef[] = MENU_SERVICE_PATHS.map((path) => {
  const route = [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES].find((item) => item.path === path)
  if (!route) throw new Error(`Servicio del menú sin ruta: ${path}`)
  return route
})

export const MAIN_NAV: NavItem[] = [
  { kind: 'link', id: 'inicio', label: HOME.label, href: HOME.path },
  {
    kind: 'menu',
    id: 'servicios',
    label: SERVICES.label,
    children: MENU_SERVICES,
    overview: { label: 'Ver todos los servicios', href: SERVICES.path },
  },
  {
    kind: 'menu',
    id: 'beneficios',
    label: BENEFITS.label,
    children: BENEFIT_ROUTES,
    overview: { label: 'Ver todos los beneficios', href: BENEFITS.path },
  },
  { kind: 'link', id: 'contacto', label: CONTACT.label, href: CONTACT.path },
  { kind: 'link', id: 'nosotros', label: ABOUT.label, href: ABOUT.path },
]
