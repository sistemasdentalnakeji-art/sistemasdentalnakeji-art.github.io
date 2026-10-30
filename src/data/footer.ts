// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DEL FOOTER (pie de página de todas las páginas)
//
// Cómo editar:
//  • Agregar un enlace a una columna → añade { label: 'Texto', href: '/ruta/' } a su lista `links`.
//    - Para una página que ya existe en config/routes.ts, usa su ruta (p. ej. CONTACT.path).
//    - Para un enlace externo, usa la URL completa: { label: 'Blog', href: 'https://…' }.
//  • Agregar una columna nueva → añade otro objeto a FOOTER_COLUMNS (id único, título y enlaces).
//    En escritorio el footer usa 5 columnas fijas: con una columna más, ajusta
//    grid-template-columns en styles/layout/footer.css (bloque "@media (width >= 1080px)").
//  • Cambiar los servicios listados → edita FOOTER_SERVICE_PATHS (4 rutas de SERVICE_ROUTES, config/routes.ts).
//
// La columna "Contacto" (dirección, teléfonos, correo) se llena sola con config/site.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { LANGS, routeOf, type Lang, type RouteKey, type ServiceKey } from '@/config/routes'

export interface FooterLink {
  label: string
  /** Ruta interna ("/contacto/") o URL externa. Usa `schedule: true` para el enlace a la agenda. */
  href?: string
  /** true = lleva a la sección "Agenda tu visita" (en el homepage baja hasta ella). */
  schedule?: boolean
}

interface FooterColumn {
  id: string
  title: string
  links: FooterLink[]
}

/** Servicios del footer: solo estos 4 (All on 4 y All on 6 no van juntos); el resto, en "Ver todos los servicios". */
const FOOTER_SERVICE_KEYS: ServiceKey[] = ['implants', 'all-on-4', 'crowns', 'veneers']

const buildColumns = (lang: Lang): FooterColumn[] => {
  const en = lang === 'en'
  const link = (key: RouteKey): FooterLink => ({ label: routeOf(key, lang).label, href: routeOf(key, lang).path })
  return [
    {
      id: 'servicios',
      title: en ? 'Services' : 'Servicios',
      links: [
        ...FOOTER_SERVICE_KEYS.map(link),
        { label: en ? 'View all services' : 'Ver todos los servicios', href: routeOf('services', lang).path },
      ],
    },
    {
      id: 'beneficios',
      title: en ? 'Benefits' : 'Beneficios',
      links: (['promotions', 'agreements', 'insurance'] as const).map(link),
    },
    {
      id: 'clinica',
      title: en ? 'Clinic' : 'Clínica',
      links: [
        link('home'),
        link('about'),
        link('contact'),
        { label: en ? 'Schedule a visit' : 'Agendar visita', schedule: true },
        link('blog'),
        link('faq'),
      ],
    },
  ]
}

export const FOOTER_COLUMNS = Object.fromEntries(LANGS.map((lang) => [lang, buildColumns(lang)])) as Record<Lang, FooterColumn[]>
