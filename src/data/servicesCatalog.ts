// ─────────────────────────────────────────────────────────────────────────────
// TARJETAS DE LA PÁGINA /servicios/ (componente: pages/services/ServicesPage.tsx)
//
// • Categorías, orden e intros: CATALOG_GROUPS (4-3-3-2-2). Para mover un servicio, cambia su línea `entry(...)`;
//   la comprobación del final falla al compilar si un servicio de las rutas queda fuera o repetido.
// • Encabezado de la página (título, subtítulo, 4 beneficios y tarjeta sobre la foto): CATALOG_HERO.
// • Cada tarjeta reutiliza los tres puntos de su página individual (data/services.ts).
// • El título y el enlace salen de la ruta del servicio (config/routes.ts), buscada por su nombre.
// • Estilos → src/styles/pages/services-index.css.
// ─────────────────────────────────────────────────────────────────────────────

import { ALL_SERVICE_KEYS, LANGS, routeOf, type Lang, type ServiceKey } from '@/config/routes'
import type { IconName } from '@/components/ui/Icon'
import { SERVICE_PAGES } from '@/data/services'

export interface CatalogService {
  key: ServiceKey
  title: string
  highlights: [string, string, string]
  href: string
  icon: IconName
}

export interface CatalogGroup {
  id: string
  title: string
  intro: string
  services: CatalogService[]
}

/** Texto visible del enlace de cada tarjeta. */
export const CATALOG_CTA: Record<Lang, string> = { en: 'View service', es: 'Ver servicio' }

const LAB_PHOTO = { src: '/images/servicios/laboratorio.webp', width: 1600, height: 900 }

/**
 * Encabezado de la página: título en dos tonos, beneficios y tarjeta flotante sobre el espacio de la foto.
 * PENDIENTE (clínica): confirmar "Certified specialists"/"Especialistas certificados" y la frase de "Long-lasting results"/"Resultados que perduran"
 * (en inglés se suavizó para no prometer resultados).
 */
export const CATALOG_HERO: Record<
  Lang,
  {
    eyebrow: string
    titleLead: string
    titleAccent: string
    lead: string
    features: { icon: IconName; text: string }[]
    indexLabel: string
    photo: { src: string; width: number; height: number; alt: string }
  }
> = {
  en: {
    eyebrow: 'Our services',
    titleLead: 'Dental services',
    titleAccent: 'in Tijuana',
    lead: 'At Dental Nakeji, excellence at every stage of your care is what sets us apart. Our doctors work hand in hand with our own dental lab to create custom designs and give you fast, attentive care.',
    features: [
      { icon: 'chip', text: 'State-of-the-art technology' },
      { icon: 'shield', text: 'Personalized care' },
      { icon: 'users', text: 'Certified specialists' },
      { icon: 'tooth', text: 'Long-lasting results' },
    ],
    indexLabel: 'Explore by category',
    // Foto del laboratorio de la clínica (la dio la clínica). Va sola, sin etiquetas.
    photo: { ...LAB_PHOTO, alt: 'Dental Nakeji dental lab with digital design stations and 3D printers' },
  },
  es: {
    eyebrow: 'Nuestros servicios',
    titleLead: 'Servicios dentales',
    titleAccent: 'en Tijuana',
    lead: 'En Dental Nakeji nos esmeramos en cada etapa de tu atención con un nivel de excelencia que nos distingue. Nuestros doctores trabajan de la mano con nuestro laboratorio dental propio para crear diseños a la medida y ofrecerte una atención ágil y cuidadosa.',
    features: [
      { icon: 'chip', text: 'Tecnología de vanguardia' },
      { icon: 'shield', text: 'Atención personalizada' },
      { icon: 'users', text: 'Especialistas certificados' },
      { icon: 'tooth', text: 'Resultados que perduran' },
    ],
    /** Índice de categorías bajo el subtítulo (enlaza a cada carta). */
    indexLabel: 'Explora por categoría',
    photo: { ...LAB_PHOTO, alt: 'Laboratorio dental de Dental Nakeji con estaciones de diseño digital e impresoras 3D' },
  },
}

const buildGroups = (lang: Lang): CatalogGroup[] => {
const en = lang === 'en'
/** La ruta sale de la clave del servicio: si se quita, falla al compilar (no deja un enlace roto). */
const entry = (key: ServiceKey, icon: IconName): CatalogService => {
  const route = routeOf(key, lang)
  const content = SERVICE_PAGES[lang][key]
  if (!content) throw new Error(`Servicio del catálogo sin contenido: ${key}`)
  return { key, title: route.label, highlights: content.highlights, href: route.path, icon }
}

return [
  {
    id: 'implantes-y-rehabilitacion',
    title: en ? 'Implants and tooth replacement' : 'Implantes y rehabilitación dental',
    intro: en
      ? 'Options to replace missing teeth, from a single tooth to a full arch.'
      : 'Opciones para reponer dientes ausentes, desde una pieza hasta toda la arcada.',
    services: [
      entry('implants', 'implant'),
      entry('all-on-4', 'bridge4'),
      entry('all-on-6', 'bridge6'),
      entry('dentures', 'denture'),
    ],
  },
  {
    id: 'estetica-dental',
    title: en ? 'Cosmetic and restorative dentistry' : 'Estética y restauración',
    intro: en
      ? 'Crowns, veneers and whitening to care for the shape, color and look of your teeth.'
      : 'Coronas, carillas y blanqueamiento para cuidar la forma, el color y la apariencia de tus dientes.',
    services: [entry('crowns', 'crown'), entry('veneers', 'tooth'), entry('whitening', 'sparkle')],
  },
  {
    id: 'ortodoncia-y-odontopediatria',
    title: en ? 'Orthodontics and pediatric dentistry' : 'Ortodoncia y odontopediatría',
    intro: en
      ? 'To align your smile and care for children’s teeth.'
      : 'Para alinear la sonrisa y cuidar los dientes de los más pequeños.',
    services: [entry('orthodontics', 'braces'), entry('aligners', 'aligner'), entry('pediatric', 'user')],
  },
  {
    id: 'limpieza-y-encias',
    title: en ? 'Cleanings and gum health' : 'Limpieza y salud de encías',
    intro: en ? 'The foundation of your care: dental cleaning and gum care.' : 'El cuidado de base: limpieza dental y atención de las encías.',
    services: [entry('cleaning', 'drop'), entry('gum', 'shield')],
  },
  {
    id: 'endodoncia-y-extracciones',
    title: en ? 'Root canals and extractions' : 'Endodoncia y extracciones',
    intro: en
      ? 'Treatments to save a tooth or remove it when needed.'
      : 'Tratamientos para conservar una pieza dental o retirarla cuando es necesario.',
    services: [entry('root-canal', 'endo'), entry('extractions', 'tooth')],
  },
]
}

export const CATALOG_GROUPS = Object.fromEntries(LANGS.map((lang) => [lang, buildGroups(lang)])) as Record<Lang, CatalogGroup[]>

/** Los servicios de todas las categorías, en orden (mismas claves e iconos en ambos idiomas). */
export const CATALOG_SERVICES = CATALOG_GROUPS.es.flatMap((group) => group.services)

// Cada servicio aparece una sola vez (entry() ya impide que sobre alguno); si falta o se repite, el build falla.
const listed = CATALOG_SERVICES.map((service) => service.key)
for (const key of ALL_SERVICE_KEYS) {
  if (listed.filter((item) => item === key).length !== 1) {
    throw new Error(`Servicio fuera o repetido en CATALOG_GROUPS: ${key}`)
  }
}
