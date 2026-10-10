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
const service = (path: string, label: string, seo: { title: string; description: string }): RouteDef => ({
  ...empty(path, label),
  ...seo,
  template: 'service',
})

export const SERVICES = empty('/servicios/', 'Servicios')

/**
 * Submenú de Servicios: los 12 más importantes, de mayor a menor relevancia.
 * En escritorio el submenú llena primero la 1.ª columna (4 por columna), luego la 2.ª y la 3.ª.
 * Prioridad acordada con los doctores + búsquedas más frecuentes (implantes, carillas, coronas).
 */
export const SERVICE_ROUTES: RouteDef[] = [
  // Columna 1: implantes y rehabilitación (lo más solicitado)
  service('/implantes-dentales-en-tijuana/', 'Implantes dentales', {
    title: 'Implantes dentales en Tijuana | Dental Nakeji',
    description:
      'Conoce los implantes dentales en Tijuana: qué son y cuándo se recomiendan. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/all-in-4-implants-en-tijuana/', 'All on 4 implants', {
    title: 'All on 4 Implants en Tijuana | Dental Nakeji',
    description:
      'All on 4 en Tijuana: una opción para reemplazar una arcada completa de dientes. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/all-in-6-implants-en-tijuana/', 'All on 6 implants', {
    title: 'All on 6 Implants en Tijuana | Dental Nakeji',
    description:
      'All on 6 en Tijuana: una opción para reemplazar una arcada completa con más puntos de apoyo. Agenda una valoración en Dental Nakeji.',
  }),
  service('/coronas-en-tijuana/', 'Coronas', {
    title: 'Coronas dentales en Tijuana | Dental Nakeji',
    description:
      'Coronas dentales en Tijuana para proteger y restaurar dientes dañados. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  // Columna 2: estética y prevención
  service('/carillasdentalesentijuana/', 'Carillas dentales', {
    title: 'Carillas dentales en Tijuana | Dental Nakeji',
    description:
      'Carillas dentales en Tijuana para mejorar la forma y el color de tu sonrisa. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/blanqueamiento-dental-en-tijuana/', 'Blanqueamiento dental', {
    title: 'Blanqueamiento dental en Tijuana | Dental Nakeji',
    description:
      'Blanqueamiento dental en Tijuana, con valoración previa en la clínica. Agenda tu visita en Dental Nakeji, Zona Río.',
  }),
  service('/cosmetica-dental-en-tijuana/', 'Cosmética dental', {
    title: 'Cosmética dental en Tijuana | Dental Nakeji',
    description:
      'Cosmética dental en Tijuana: opciones para diseñar tu sonrisa. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/limpieza-dental-en-tijuana/', 'Limpieza dental', {
    title: 'Limpieza dental en Tijuana | Dental Nakeji',
    description:
      'Limpieza dental en Tijuana para el cuidado de tus dientes y encías. Agenda tu visita en Dental Nakeji, Zona Río.',
  }),
  // Columna 3: tratamientos y especialidades
  service('/endodoncias-en-tijuana/', 'Endodoncias', {
    title: 'Endodoncias en Tijuana | Dental Nakeji',
    description:
      'Endodoncias en Tijuana: tratamiento de conductos para atender el interior del diente. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/ortodoncia-en-tijuana/', 'Ortodoncia', {
    title: 'Ortodoncia en Tijuana | Dental Nakeji',
    description:
      'Ortodoncia en Tijuana con brackets o alineadores, según tu caso. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  // La URL conserva "invisalign" (es la del sitio actual); el nombre visible ya no lleva la marca.
  service('/invisalign-in-tijuana/', 'Alineadores', {
    title: 'Alineadores transparentes en Tijuana | Dental Nakeji',
    description:
      'Alineadores transparentes en Tijuana para alinear tus dientes. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/odontologia-pediatrica-en-tijuana/', 'Odontopediatría', {
    title: 'Odontopediatría en Tijuana | Dental Nakeji',
    description:
      'Odontopediatría en Tijuana: cuidado dental para niños. Agenda la visita de tu hijo en Dental Nakeji, Zona Río.',
  }),
]

/**
 * Servicios con página propia que NO van en el submenú (queda en 12) pero sí en la página /servicios/ y en el
 * formulario de citas. Mismo orden de prioridad: de mayor a menor.
 */
export const MORE_SERVICE_ROUTES: RouteDef[] = [
  service('/diseno-de-sonrisa-en-tijuana/', 'Diseño de sonrisa', {
    title: 'Diseño de sonrisa en Tijuana | Dental Nakeji',
    description:
      'Diseño de sonrisa en Tijuana: un plan a tu medida para mejorar la apariencia de tus dientes. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/dentaduras-en-tijuana/', 'Dentaduras', {
    title: 'Dentaduras en Tijuana | Dental Nakeji',
    description:
      'Dentaduras en Tijuana para reemplazar dientes faltantes. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/periodoncia-en-tijuana/', 'Periodoncia', {
    title: 'Periodoncia en Tijuana | Dental Nakeji',
    description:
      'Periodoncia en Tijuana: atención de las encías y del soporte de tus dientes. Agenda una valoración en Dental Nakeji, Zona Río.',
  }),
  service('/extracciones-dentales-en-tijuana/', 'Extracciones simples y de juicio', {
    title: 'Extracciones dentales en Tijuana | Dental Nakeji',
    description:
      'Extracciones simples y de muelas del juicio en Tijuana, con valoración previa. Agenda tu visita en Dental Nakeji, Zona Río.',
  }),
]

/** Página /beneficios/: promociones, convenios y aseguranzas en una sola página (pages/benefits/BenefitsPage.tsx). */
export const BENEFITS = empty('/beneficios/', 'Beneficios')

/** Submenú de Beneficios. /convenios/ es nueva; las otras dos ya existen. */
export const AGREEMENTS = empty('/convenios/', 'Convenios')
export const INSURANCE = empty('/insurance/', 'Aseguranzas')
export const PROMOTIONS_PAGE = empty('/nuestras-promociones/', 'Promociones')
export const BENEFIT_ROUTES: RouteDef[] = [PROMOTIONS_PAGE, AGREEMENTS, INSURANCE]

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

export const ALL_ROUTES: RouteDef[] = [
  HOME,
  SERVICES,
  BENEFITS,
  ...SERVICE_ROUTES,
  ...MORE_SERVICE_ROUTES,
  ...BENEFIT_ROUTES,
  CONTACT,
  ABOUT,
  BLOG,
  PRIVACY,
]

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
