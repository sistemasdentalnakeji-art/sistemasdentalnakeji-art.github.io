// ─────────────────────────────────────────────────────────────────────────────
// TARJETAS DE LA PÁGINA /servicios/ (componente: pages/services/ServicesPage.tsx)
//
// • Orden: el de la lista CATALOG, de mayor a menor importancia. En escritorio se dibuja en filas de 4:
//   fila 1 = columna 1 del submenú, fila 2 = columna 2, fila 3 = columna 3 y fila 4 = los servicios extra
//   (MORE_SERVICE_ROUTES en config/routes.ts). Para cambiar el orden, mueve las líneas `entry(...)`.
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

/** Texto del botón de cada tarjeta. */
export const CATALOG_SECTION = {
  cta: 'Conocer más del servicio',
}

/** Encabezado de la página: título en dos tonos, beneficios y tarjeta flotante sobre el espacio de la foto. */
export const CATALOG_HERO = {
  eyebrow: 'Nuestros servicios',
  titleLead: 'Más servicios',
  titleAccent: 'dentales',
  lead: 'Tratamientos dentales pensados para cada etapa de tu sonrisa.',
  features: [
    { icon: 'chip', text: 'Tecnología de vanguardia' },
    { icon: 'shield', text: 'Atención personalizada' },
    { icon: 'users', text: 'Especialistas certificados' },
    { icon: 'tooth', text: 'Resultados que perduran' },
  ] satisfies { icon: IconName; text: string }[],
  card: {
    title: 'Cuidamos más que sonrisas',
    text: 'Salud, estética y bienestar en un solo lugar.',
  },
}

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'

const ROUTES = [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES]

/** La ruta sale de la lista de servicios por su nombre: si se renombra o quita, falla al compilar (no deja un enlace roto). */
const entry = (label: string, icon: IconName): CatalogService => {
  const route = ROUTES.find((item) => item.label === label)
  if (!route) throw new Error(`Servicio del catálogo sin ruta: ${label}`)
  return { title: route.label, text: LOREM, href: route.path, icon }
}

export const CATALOG: CatalogService[] = [
  // Fila 1: implantes y rehabilitación
  entry('Implantes dentales', 'implant'),
  entry('All on 4 implants', 'bridge4'),
  entry('All on 6 implants', 'bridge6'),
  entry('Coronas', 'crown'),
  // Fila 2: estética y prevención
  entry('Carillas dentales', 'tooth'),
  entry('Blanqueamiento dental', 'sparkle'),
  entry('Cosmética dental', 'star'),
  entry('Limpieza dental', 'drop'),
  // Fila 3: tratamientos y especialidades
  entry('Endodoncias', 'endo'),
  entry('Ortodoncia', 'braces'),
  entry('Alineadores', 'aligner'),
  entry('Odontopediatría', 'user'),
  // Fila 4: más servicios
  entry('Diseño de sonrisa', 'smile'),
  entry('Dentaduras', 'denture'),
  entry('Periodoncia', 'shield'),
  entry('Extracciones simples y de juicio', 'tooth'),
]
