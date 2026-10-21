// ─────────────────────────────────────────────────────────────────────────────
// FOTOS DEL "SPIN SHUTTER" de /servicios/ (components/ui/SpinShutter.tsx, a la derecha de las cartas de categorías).
// Son solo fotos (sin título, texto ni enlaces). PROVISIONAL: hoy son fotos de los servicios; la clínica mandará fotos de su
// establecimiento y reemplazarán a estas (miniaturas de ~720 px de ancho en public/images/servicios/spin/; 12 fotos llenan bien el anillo).
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '@/config/routes'

export interface ShowcasePhoto {
  src: string
  alt: string
  /** object-position de la foto dentro de la tarjeta (qué parte queda visible al recortar). */
  position: string
}

/** Nombre de la galería para lectores de pantalla (el anillo no lleva título visible). */
export const SHOWCASE_LABEL: Record<Lang, string> = { en: 'Photo gallery', es: 'Galería de fotos' }

const photo = (file: string, alt: Record<Lang, string>, position = 'center'): Record<Lang, ShowcasePhoto> => {
  const src = `/images/servicios/spin/${file}.webp`
  return { en: { src, alt: alt.en, position }, es: { src, alt: alt.es, position } }
}

const PHOTOS = [
  photo('implantes-dentales', { en: 'Dental implant consultation', es: 'Consulta de implantes dentales' }, '75% center'),
  photo('all-on-4', { en: 'Fixed prosthesis on implants', es: 'Prótesis fija sobre implantes' }, '75% center'),
  photo('coronas', { en: 'Dental crowns', es: 'Coronas dentales' }, '75% center'),
  photo('carillas', { en: 'Veneers', es: 'Carillas dentales' }, '75% center'),
  photo('blanqueamiento', { en: 'Teeth whitening', es: 'Blanqueamiento dental' }, '60% center'),
  photo('ortodoncia', { en: 'Orthodontics', es: 'Ortodoncia' }),
  photo('alineadores', { en: 'Clear aligners', es: 'Alineadores transparentes' }, '70% center'),
  photo('limpieza', { en: 'Dental cleaning', es: 'Limpieza dental' }),
  photo('endodoncias', { en: 'Root canal treatment', es: 'Endodoncia' }),
  photo('odontopediatria', { en: 'Pediatric dentistry', es: 'Odontopediatría' }),
  photo('periodoncia', { en: 'Gum care', es: 'Cuidado de las encías' }),
  photo('extracciones', { en: 'Tooth extraction', es: 'Extracción dental' }, '75% center'),
]

export const SHOWCASE_PHOTOS: Record<Lang, ShowcasePhoto[]> = {
  en: PHOTOS.map((item) => item.en),
  es: PHOTOS.map((item) => item.es),
}
