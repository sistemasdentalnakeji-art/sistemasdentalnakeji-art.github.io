// Datos del blog por idioma: los textos en español vienen de src/data/blog-content.json (extraídos del .md sin cambios) y su
// traducción de src/data/blog-content.en.json (misma forma; cada categoría y artículo lleva `key`, el slug en español).
// Aquí solo viven las decisiones de diseño: la fecha, la foto de cada artículo y el cálculo de lectura.

import type { Lang } from '@/config/routes'
import es from '@/data/blog-content.json'
import en from '@/data/blog-content.en.json'

type Content = typeof es
export type Article = Content['articles'][number]
export type Category = Content['categories'][number]

/** Contenido del blog en cada idioma (TypeScript exige que el inglés tenga la misma forma que el español). */
export const BLOG: Record<Lang, Content> = { es, en }

/** Fecha que muestran las tarjetas y los artículos: la de hoy, según la instrucción. */
export const BLOG_DATE = '2026-10-28'

/** Último segmento de la ruta: "/es/blog/coronas-dentales/" → "coronas-dentales". */
export const slugOf = (route: string) => route.split('/').at(-2) ?? ''

/** Clave común a los dos idiomas: el slug en español (en inglés va en `key`). Es la de la ruta `blog:<clave>` y la de la foto. */
export const keyOf = (item: { route: string; key?: string }) => item.key ?? slugOf(item.route)

export const categoryOf = (lang: Lang, key: string) => BLOG[lang].categories.find((c) => keyOf(c) === key)
export const articleOf = (lang: Lang, key: string) => BLOG[lang].articles.find((a) => keyOf(a) === key)
export const excerptOf = (lang: Lang, route: string) => BLOG[lang].cards.find((c) => c.route === route)?.excerpt ?? ''
export const articlesIn = (lang: Lang, category: Category) => BLOG[lang].articles.filter((a) => a.category === category.name)

/** Foto de servicio de cada artículo (public/images/servicios/), por clave. */
const SERVICE_PHOTO: Record<string, string> = {
  'implantes-dentales-que-son': 'implantes-dentales',
  'all-on-4-implants': 'all-on-4',
  'all-on-6-implants': 'all-on-6',
  'dentaduras-parciales-completas': 'dentaduras',
  'coronas-dentales': 'coronas',
  'carillas-dentales': 'carillas',
  'blanqueamiento-dental': 'blanqueamiento',
  'ortodoncia-mordida-alineacion': 'ortodoncia',
  'alineadores-transparentes': 'alineadores',
  'primera-visita-odontopediatria': 'odontopediatria',
  'limpieza-dental-profesional': 'limpieza',
  'periodoncia-encias-que-sangran': 'periodoncia',
  'endodoncia-conservar-diente': 'endodoncias',
  'extracciones-muelas-del-juicio': 'extracciones',
}

export function photoOf(key: string) {
  // Un artículo nuevo sin foto asignada rompe el prerender aquí, en vez de publicar /images/servicios/undefined.webp.
  if (!SERVICE_PHOTO[key]) throw new Error(`Artículo del blog sin foto en SERVICE_PHOTO (blogData.ts): ${key}`)
  return `/images/servicios/${SERVICE_PHOTO[key]}.webp`
}

/** Versiones de 640 y 1280 px (las mismas fotos, reducidas) y el original de 2000 px: el navegador baja la más chica que se vea nítida. */
export const photoSrcSetOf = (key: string) =>
  `/images/servicios/640/${SERVICE_PHOTO[key]}.webp 640w, /images/servicios/1280/${SERVICE_PHOTO[key]}.webp 1280w, ${photoOf(key)} 2000w`

/** Párrafos de una sección sin la línea "---" sobrante del .md (no se muestra ni cuenta). */
export const paragraphsOf = (section: { paragraphs: string[] }) => section.paragraphs.filter((p) => p.trim() !== '---')

/** Minutos de lectura a 200 palabras por minuto, con mínimo de 1. */
export function readingMinutes(article: Article) {
  const words = [article.lead, article.answer, ...article.sections.flatMap((s) => [s.title, ...paragraphsOf(s)])]
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export const formatDate = (iso: string, locale: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })

/** Enlaces "[texto](url)" de una línea del .md (fuentes y servicio relacionado). */
export function linksIn(text: string) {
  return [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ label: m[1], href: m[2] }))
}
