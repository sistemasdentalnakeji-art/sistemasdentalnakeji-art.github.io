// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LAS PÁGINAS DE SERVICIO (plantilla: src/pages/service/ServicePage.tsx)
//
// Cada servicio usa la misma estructura; aquí solo cambian nombre, imagen, textos y enlace al blog.
// Para dar página propia a otro servicio: agrega su entrada aquí (la clave es su ruta de
// src/config/routes.ts) y créalo con `service(...)` en SERVICE_ROUTES.
//
// • image: foto de fondo del hero (public/images/servicios/). PENDIENTE: conseguir las fotos HD con personas.
//   Sin imagen, el hero usa el azul marino de la marca.
// • about: textos de la sección 2. Por ahora son lorem ipsum (pendiente de redactar).
// • blogHref: artículo del blog de cada servicio. Mientras no exista, apunta a /blog/.
// ─────────────────────────────────────────────────────────────────────────────

import { BLOG, MORE_SERVICE_ROUTES, SERVICE_ROUTES } from '@/config/routes'

export interface ServiceContent {
  /** H1 con brillo blanco perla (.shiny-text). Cada palabra con mayúscula inicial (menos "de", "para", "tu"…); All on 4/6 se quedan como están. */
  title: string
  /** Gancho breve con el beneficio principal. */
  subtitle: string
  /** Tres frases cortas y simples. */
  highlights: [string, string, string]
  /** Ejemplo: { src: '/images/servicios/implantes-dentales.webp', width: 2560, height: 1440 } */
  image?: {
    src: string
    width: number
    height: number
    /** object-position de la foto (qué parte queda visible al recortar). */
    position?: string
  }
  about: {
    title: string
    text: string
  }
  blogHref: string
}

const LOREM_TITLE = 'Lorem ipsum dolor sit amet.'
const LOREM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
const LOREM_ABOUT = { title: LOREM_TITLE, text: LOREM_TEXT }

/** Contenido por ruta. La clave debe coincidir con la ruta en SERVICE_ROUTES. */
export const SERVICE_PAGES: Record<string, ServiceContent> = {
  // Columna 1
  '/implantes-dentales-en-tijuana/': {
    title: 'Implantes Dentales',
    subtitle: 'Vuelve a sonreír y a masticar con confianza.',
    highlights: ['Apariencia natural', 'Estabilidad al masticar', 'Tratamiento personalizado'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/all-in-4-implants-en-tijuana/': {
    title: 'All on 4 implants',
    subtitle: 'Recupera una arcada completa de dientes fijos.',
    highlights: ['Dientes fijos, no removibles', 'Cuatro implantes de soporte', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/all-in-6-implants-en-tijuana/': {
    title: 'All on 6 implants',
    subtitle: 'Una arcada completa y fija con seis puntos de apoyo.',
    highlights: ['Dientes fijos, no removibles', 'Seis implantes de soporte', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/coronas-en-tijuana/': {
    title: 'Coronas Dentales',
    subtitle: 'Protege tus dientes y devuélveles su forma.',
    highlights: ['Color parecido a tu diente', 'Protegen dientes debilitados', 'Hechas a tu medida'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  // Columna 2
  '/carillasdentalesentijuana/': {
    title: 'Carillas Dentales',
    subtitle: 'Mejora la forma y el color de tu sonrisa.',
    highlights: ['Resultado natural', 'Corrigen forma y color', 'Diseño a tu medida'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/blanqueamiento-dental-en-tijuana/': {
    title: 'Blanqueamiento Dental',
    subtitle: 'Una sonrisa más blanca y luminosa.',
    highlights: ['Supervisado por tu dentista', 'Dientes más claros', 'Valoración previa'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/cosmetica-dental-en-tijuana/': {
    title: 'Cosmética Dental',
    subtitle: 'Diseña la sonrisa que quieres mostrar.',
    highlights: ['Plan estético a tu medida', 'Resultados naturales', 'Combina varios tratamientos'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/limpieza-dental-en-tijuana/': {
    title: 'Limpieza Dental',
    subtitle: 'Cuida tus dientes y encías desde hoy.',
    highlights: ['Retira sarro y placa', 'Encías más sanas', 'Revisión de tu boca'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  // Columna 3
  '/endodoncias-en-tijuana/': {
    title: 'Tratamiento de Endodoncia',
    subtitle: 'Atiende el interior de tu diente.',
    highlights: ['Tratamiento de conductos', 'Busca conservar tu pieza', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/ortodoncia-en-tijuana/': {
    title: 'Ortodoncia para tu Sonrisa',
    subtitle: 'Alinea tus dientes y mejora tu mordida.',
    highlights: ['Brackets o alineadores', 'Corrige la posición dental', 'Plan a tu medida'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/invisalign-in-tijuana/': {
    title: 'Alineadores Transparentes',
    subtitle: 'Alinea tu sonrisa con alineadores transparentes.',
    highlights: ['Casi imperceptibles', 'Removibles para comer', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/odontologia-pediatrica-en-tijuana/': {
    title: 'Odontopediatría para Niños',
    subtitle: 'Cuidado dental para los más pequeños.',
    highlights: ['Atención para niños', 'Prevención desde temprano', 'Revisiones periódicas'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  // Fuera del submenú (MORE_SERVICE_ROUTES): solo en /servicios/
  '/diseno-de-sonrisa-en-tijuana/': {
    title: 'Diseño de Sonrisa',
    subtitle: 'Planea la sonrisa que quieres mostrar.',
    highlights: ['Plan estético a tu medida', 'Resultados naturales', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/dentaduras-en-tijuana/': {
    title: 'Dentaduras a tu Medida',
    subtitle: 'Reemplaza los dientes que te faltan.',
    highlights: ['Hechas a tu medida', 'Ayudan a masticar y hablar', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/periodoncia-en-tijuana/': {
    title: 'Periodoncia para tus Encías',
    subtitle: 'Cuida la salud de tus encías.',
    highlights: ['Atención de las encías', 'Revisión personalizada', 'Seguimiento periódico'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/extracciones-dentales-en-tijuana/': {
    title: 'Extracciones Simples y de Juicio',
    subtitle: 'Atención cuidadosa cuando un diente debe retirarse.',
    highlights: ['Valoración previa', 'Atención cuidadosa', 'Indicaciones para después'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
}

// Falla al compilar (y al abrir la app) si una ruta marcada como servicio no tiene su contenido aquí:
// sin él, App la dibujaría como página vacía y los botones "Agendar" apuntarían a una agenda inexistente.
for (const route of [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES]) {
  if (route.template === 'service' && !SERVICE_PAGES[route.path]) {
    throw new Error(`Falta el contenido de ${route.path} en src/data/services.ts`)
  }
}
