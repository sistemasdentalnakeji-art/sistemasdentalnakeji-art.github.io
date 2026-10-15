// ─────────────────────────────────────────────────────────────────────────────
// TARJETAS DE LA PÁGINA /servicios/ (componente: pages/services/ServicesPage.tsx)
//
// • Categorías, orden e intros: CATALOG_GROUPS (4-3-3-2-2). Para mover un servicio, cambia su línea `entry(...)`;
//   la comprobación del final falla al compilar si un servicio de las rutas queda fuera o repetido.
// • Encabezado de la página (título, subtítulo, 4 beneficios y tarjeta sobre la foto): CATALOG_HERO.
// • Texto de cada tarjeta: hoy lorem ipsum; cámbialo en el campo `text` (o en LOREM para todas a la vez).
// • El título y el enlace salen de la ruta del servicio (config/routes.ts), buscada por su nombre.
// • Estilos → src/styles/pages/services-index.css.
// ─────────────────────────────────────────────────────────────────────────────

import { MORE_SERVICE_ROUTES, SERVICE_ROUTES } from '@/config/routes'
import type { IconName } from '@/components/ui/Icon'

export interface CatalogService {
  title: string
  text: string
  href: string
  icon: IconName
}

export interface CatalogGroup {
  id: string
  title: string
  intro: string
  /** Párrafo bajo la descripción (hoy lorem ipsum, pendiente de redactar). */
  body: string
  services: CatalogService[]
}

/** Texto visible del enlace de cada tarjeta. */
export const CATALOG_CTA = 'Ver servicio'

/** Encabezado de la página: título en dos tonos, beneficios y tarjeta flotante sobre el espacio de la foto. */
export const CATALOG_HERO = {
  eyebrow: 'Nuestros servicios',
  titleLead: 'Servicios dentales',
  titleAccent: 'en Tijuana',
  lead: 'Tratamientos dentales pensados para cada etapa de tu sonrisa.',
  features: [
    { icon: 'chip', text: 'Tecnología de vanguardia' },
    { icon: 'shield', text: 'Atención personalizada' },
    { icon: 'users', text: 'Especialistas certificados' },
    { icon: 'tooth', text: 'Resultados que perduran' },
  ] satisfies { icon: IconName; text: string }[],
  /** Índice de categorías bajo el subtítulo (enlaza a cada carta). */
  indexLabel: 'Explora por categoría',
  /** Foto del laboratorio de la clínica (la dio la clínica). Va sola, sin etiquetas. */
  photo: {
    src: '/images/servicios/laboratorio.webp',
    width: 1600,
    height: 900,
    alt: 'Laboratorio dental de Dental Nakeji con estaciones de diseño digital e impresoras 3D',
  },
}

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
// Texto de relleno bajo la descripción de cada categoría (pendiente de redactar).
const LOREM_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'

const ROUTES = [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES]

/** La ruta sale de la lista de servicios por su nombre: si se renombra o quita, falla al compilar (no deja un enlace roto). */
const entry = (label: string, icon: IconName): CatalogService => {
  const route = ROUTES.find((item) => item.label === label)
  if (!route) throw new Error(`Servicio del catálogo sin ruta: ${label}`)
  return { title: route.label, text: LOREM, href: route.path, icon }
}

export const CATALOG_GROUPS: CatalogGroup[] = [
  {
    id: 'implantes-y-rehabilitacion',
    title: 'Implantes y rehabilitación dental',
    intro: 'Opciones para reponer dientes ausentes, desde una pieza hasta toda la arcada.',
    body: LOREM_BODY,
    services: [
      entry('Implantes dentales', 'implant'),
      entry('All on 4 implants', 'bridge4'),
      entry('All on 6 implants', 'bridge6'),
      entry('Dentaduras', 'denture'),
    ],
  },
  {
    id: 'estetica-dental',
    title: 'Estética y restauración',
    intro: 'Coronas, carillas y blanqueamiento para cuidar la forma, el color y la apariencia de tus dientes.',
    body: LOREM_BODY,
    services: [entry('Coronas', 'crown'), entry('Carillas dentales', 'tooth'), entry('Blanqueamiento dental', 'sparkle')],
  },
  {
    id: 'ortodoncia-y-odontopediatria',
    title: 'Ortodoncia y odontopediatría',
    intro: 'Para alinear la sonrisa y cuidar los dientes de los más pequeños.',
    body: LOREM_BODY,
    services: [entry('Ortodoncia', 'braces'), entry('Alineadores', 'aligner'), entry('Odontopediatría', 'user')],
  },
  {
    id: 'limpieza-y-encias',
    title: 'Limpieza y salud de encías',
    intro: 'El cuidado de base: limpieza dental y atención de las encías.',
    body: LOREM_BODY,
    services: [entry('Limpieza dental', 'drop'), entry('Periodoncia', 'shield')],
  },
  {
    id: 'endodoncia-y-extracciones',
    title: 'Endodoncia y extracciones',
    intro: 'Tratamientos para conservar una pieza dental o retirarla cuando es necesario.',
    body: LOREM_BODY,
    services: [entry('Endodoncias', 'endo'), entry('Extracciones simples y de juicio', 'tooth')],
  },
]

/** Los servicios de todas las categorías, en orden. */
export const CATALOG_SERVICES = CATALOG_GROUPS.flatMap((group) => group.services)

// Cada servicio de las rutas aparece una sola vez (entry() ya impide que sobre alguno); si falta o se repite, el build falla.
const listed = CATALOG_SERVICES.map((service) => service.href)
for (const route of ROUTES) {
  if (listed.filter((href) => href === route.path).length !== 1) {
    throw new Error(`Servicio fuera o repetido en CATALOG_GROUPS: ${route.label}`)
  }
}
