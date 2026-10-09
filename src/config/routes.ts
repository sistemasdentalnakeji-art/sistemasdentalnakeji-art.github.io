// Rutas del sitio. Se conservan las URLs que ya existen en nakejidental.com
// para no romper enlaces ni posicionamiento al publicar.
//
// status:
//  - 'ready': página terminada → indexable y en el sitemap.
//  - 'empty': destino preparado sin contenido → noindex y fuera del sitemap.

type RouteStatus = 'ready' | 'empty'

export interface RouteDef {
  path: string
  label: string
  title: string
  description?: string
  status: RouteStatus
  /** 'service': se dibuja con la plantilla de servicio (textos en src/data/services.ts). */
  template?: 'service'
}

export const HOME: RouteDef = {
  path: '/',
  label: 'Inicio',
  title: 'Dentistas en Tijuana | Clínica Dental Nakeji',
  description:
    'Clínica dental en la Zona Río de Tijuana. Implantes dentales, coronas, carillas, blanqueamiento, ortodoncia y más especialidades. Agenda tu visita por WhatsApp.',
  status: 'ready',
}

const empty = (path: string, label: string): RouteDef => ({
  path,
  label,
  title: `${label} | Dental Nakeji`,
  status: 'empty',
})

/**
 * Página de servicio con la plantilla (hero + información + agenda).
 * Sigue en 'empty' (noindex) mientras la sección 2 tenga lorem ipsum; al tener los textos
 * definitivos, cambia su status a 'ready' para que se indexe y entre al sitemap.
 */
const service = (path: string, label: string): RouteDef => ({ ...empty(path, label), template: 'service' })

export const SERVICES = empty('/servicios/', 'Servicios')

/**
 * Submenú de Servicios: los 12 más importantes, de mayor a menor relevancia.
 * En escritorio el submenú llena primero la 1.ª columna (4 por columna), luego la 2.ª y la 3.ª.
 * Prioridad acordada con los doctores + búsquedas más frecuentes (implantes, carillas, coronas).
 */
export const SERVICE_ROUTES: RouteDef[] = [
  // Columna 1: implantes y rehabilitación (lo más solicitado)
  service('/implantes-dentales-en-tijuana/', 'Implantes dentales'),
  service('/all-in-4-implants-en-tijuana/', 'All on 4 implants'),
  service('/all-in-6-implants-en-tijuana/', 'All on 6 implants'),
  service('/coronas-en-tijuana/', 'Coronas'),
  // Columna 2: estética y prevención
  service('/carillasdentalesentijuana/', 'Carillas dentales'),
  service('/blanqueamiento-dental-en-tijuana/', 'Blanqueamiento dental'),
  service('/cosmetica-dental-en-tijuana/', 'Cosmética dental'),
  service('/limpieza-dental-en-tijuana/', 'Limpieza dental'),
  // Columna 3: tratamientos y especialidades
  empty('/endodoncias-en-tijuana/', 'Endodoncias'),
  empty('/ortodoncia-en-tijuana/', 'Ortodoncia'),
  empty('/invisalign-in-tijuana/', 'Invisalign / Alineadores'),
  empty('/odontologia-pediatrica-en-tijuana/', 'Odontopediatría'),
]

/** Submenú de Beneficios. /convenios/ es nueva; las otras dos ya existen. */
export const BENEFIT_ROUTES: RouteDef[] = [
  empty('/nuestras-promociones/', 'Promociones'),
  empty('/convenios/', 'Convenios'),
  empty('/insurance/', 'Aseguranzas'),
]

export const CONTACT = empty('/contacto/', 'Contacto')
export const ABOUT = empty('/nosotros/', 'Nosotros')
export const BLOG = empty('/blog/', 'Blog')
/** Requerido por el formulario de citas (LFPDPPP). Falta el texto legal de la clínica. */
export const PRIVACY = empty('/aviso-de-privacidad/', 'Aviso de privacidad')

export const NOT_FOUND: RouteDef = {
  path: '/404/',
  label: 'Página no encontrada',
  title: 'Página no encontrada | Dental Nakeji',
  status: 'empty',
}

export const ALL_ROUTES: RouteDef[] = [HOME, SERVICES, ...SERVICE_ROUTES, ...BENEFIT_ROUTES, CONTACT, ABOUT, BLOG, PRIVACY]

/** Normaliza la ruta: sin "index.html" y siempre con "/" final (igual que el sitio actual). */
function normalizePath(pathname: string): string {
  const clean = (pathname.split(/[?#]/)[0] || '/').replace(/\/index\.html$/, '/')
  return clean.endsWith('/') ? clean : `${clean}/`
}

export function findRoute(pathname: string): RouteDef {
  const path = normalizePath(pathname)
  return ALL_ROUTES.find((r) => r.path === path) ?? NOT_FOUND
}

/** El botón "Agendar visita" baja al módulo de agenda (homepage y páginas de servicio). */
export const SCHEDULE_ANCHOR = 'agendar'

/** Enlace a la agenda: ancla local si la página tiene agenda; si no, la del homepage. */
export const scheduleHref = (currentPath: string) => {
  const route = findRoute(currentPath)
  return route === HOME || route.template === 'service' ? `#${SCHEDULE_ANCHOR}` : `/#${SCHEDULE_ANCHOR}`
}

/** Valor de aria-current para un enlace interno. */
export const ariaCurrent = (href: string, currentPath: string) => (href === currentPath ? 'page' : undefined)
