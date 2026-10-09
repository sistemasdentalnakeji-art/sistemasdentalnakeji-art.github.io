// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DEL FOOTER (pie de página de todas las páginas)
//
// Cómo editar:
//  • Cambiar el texto bajo el logo → FOOTER.description.
//  • Agregar un enlace a una columna → añade { label: 'Texto', href: '/ruta/' } a su lista `links`.
//    - Para una página que ya existe en config/routes.ts, usa su ruta (p. ej. CONTACT.path).
//    - Para un enlace externo, usa la URL completa: { label: 'Blog', href: 'https://…' }.
//  • Agregar una columna nueva → añade otro objeto a FOOTER_COLUMNS (id único, título y enlaces).
//    En escritorio el footer usa 5 columnas fijas: con una columna más, ajusta
//    grid-template-columns en styles/layout/footer.css (bloque "@media (min-width: 1080px)").
//  • Cambiar los servicios listados → edita FOOTER_SERVICE_PATHS (se muestran en ese orden).
//
// La columna "Contacto" (dirección, teléfonos, correo) se llena sola con config/site.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { ABOUT, BENEFIT_ROUTES, BLOG, CONTACT, HOME, SERVICE_ROUTES, SERVICES } from '@/config/routes'

export const FOOTER = {
  description: 'Clínica dental en la Zona Urbana Río Tijuana, Baja California.',
}

export interface FooterLink {
  label: string
  /** Ruta interna ("/contacto/") o URL externa. Usa `schedule: true` para el enlace a la agenda. */
  href?: string
  /** true = lleva a la sección "Agenda tu visita" (en el homepage baja hasta ella). */
  schedule?: boolean
}

export interface FooterColumn {
  id: string
  title: string
  links: FooterLink[]
}

/** Servicios que se listan en el footer, en este orden (el resto, en "Ver todos los servicios"). */
const FOOTER_SERVICE_PATHS = [
  '/implantes-dentales-en-tijuana/',
  '/all-in-4-implants-en-tijuana/',
  '/coronas-en-tijuana/',
  '/carillasdentalesentijuana/',
  '/blanqueamiento-dental-en-tijuana/',
  '/limpieza-dental-en-tijuana/',
]

const serviceLinks: FooterLink[] = FOOTER_SERVICE_PATHS.flatMap((path) =>
  SERVICE_ROUTES.filter((route) => route.path === path).map((route) => ({ label: route.label, href: route.path })),
)

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 'servicios',
    title: 'Servicios',
    links: [...serviceLinks, { label: 'Ver todos los servicios', href: SERVICES.path }],
  },
  {
    id: 'beneficios',
    title: 'Beneficios',
    links: BENEFIT_ROUTES.map((route) => ({ label: route.label, href: route.path })),
  },
  {
    id: 'clinica',
    title: 'Clínica',
    links: [
      { label: HOME.label, href: HOME.path },
      { label: ABOUT.label, href: ABOUT.path },
      { label: CONTACT.label, href: CONTACT.path },
      { label: 'Agendar visita', schedule: true },
      { label: BLOG.label, href: BLOG.path },
    ],
  },
]
