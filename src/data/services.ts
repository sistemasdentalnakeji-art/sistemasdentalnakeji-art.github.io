// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LAS PÁGINAS DE SERVICIO (plantilla: src/pages/service/ServicePage.tsx)
//
// Cada servicio usa la misma estructura; aquí solo cambian nombre, imagen, textos y enlace al blog.
// Para dar página propia a otro servicio: agrega su entrada aquí (la clave es su ruta de
// src/config/routes.ts) y créalo con `service(...)` en SERVICE_ROUTES.
//
// • image: foto de fondo del hero (public/images/servicios/). PENDIENTE: generar las fotos HD
//   (prompts en docs/prompts-hero-servicios.md). Sin imagen, el hero usa el azul marino de la marca.
// • about: textos de la sección 2. Por ahora son lorem ipsum (pendiente de redactar).
// • blogHref: artículo del blog de cada servicio. Mientras no exista, apunta a /blog/.
// ─────────────────────────────────────────────────────────────────────────────

import { BLOG } from '@/config/routes'

export interface ServiceContent {
  /** H1 en dos tonos: `title` en blanco y `titleAccent` en azul claro. */
  title: string
  titleAccent?: string
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
    title: 'Implantes',
    titleAccent: 'dentales',
    subtitle: 'Vuelve a sonreír y a masticar con confianza.',
    highlights: ['Apariencia natural', 'Estabilidad al masticar', 'Tratamiento personalizado'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/all-in-4-implants-en-tijuana/': {
    title: 'All on',
    titleAccent: '4 implants',
    subtitle: 'Recupera una arcada completa de dientes fijos.',
    highlights: ['Dientes fijos, no removibles', 'Cuatro implantes de soporte', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/all-in-6-implants-en-tijuana/': {
    title: 'All on',
    titleAccent: '6 implants',
    subtitle: 'Una arcada completa y fija con seis puntos de apoyo.',
    highlights: ['Dientes fijos, no removibles', 'Seis implantes de soporte', 'Valoración personalizada'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/coronas-en-tijuana/': {
    title: 'Coronas',
    titleAccent: 'dentales',
    subtitle: 'Protege tus dientes y devuélveles su forma.',
    highlights: ['Color parecido a tu diente', 'Protegen dientes debilitados', 'Hechas a tu medida'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  // Columna 2
  '/carillasdentalesentijuana/': {
    title: 'Carillas',
    titleAccent: 'dentales',
    subtitle: 'Mejora la forma y el color de tu sonrisa.',
    highlights: ['Resultado natural', 'Corrigen forma y color', 'Diseño a tu medida'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/blanqueamiento-dental-en-tijuana/': {
    title: 'Blanqueamiento',
    titleAccent: 'dental',
    subtitle: 'Una sonrisa más blanca y luminosa.',
    highlights: ['Supervisado por tu dentista', 'Dientes más claros', 'Valoración previa'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/cosmetica-dental-en-tijuana/': {
    title: 'Cosmética',
    titleAccent: 'dental',
    subtitle: 'Diseña la sonrisa que quieres mostrar.',
    highlights: ['Plan estético a tu medida', 'Resultados naturales', 'Combina varios tratamientos'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
  '/limpieza-dental-en-tijuana/': {
    title: 'Limpieza',
    titleAccent: 'dental',
    subtitle: 'Cuida tus dientes y encías desde hoy.',
    highlights: ['Retira sarro y placa', 'Encías más sanas', 'Revisión de tu boca'],
    about: LOREM_ABOUT,
    blogHref: BLOG.path,
  },
}
