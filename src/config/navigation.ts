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

export type NavItem = NavLink | NavMenu

export const MAIN_NAV: NavItem[] = [
  { kind: 'link', id: 'inicio', label: HOME.label, href: HOME.path },
  {
    kind: 'menu',
    id: 'servicios',
    label: SERVICES.label,
    children: SERVICE_ROUTES,
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
