// ─────────────────────────────────────────────────────────────────────────────
// FOTOS DEL "SPIN SHUTTER" de /servicios/ (components/ui/SpinShutter.tsx, a la derecha de las cartas de categorías).
// Son solo fotos (sin título, texto ni enlaces). PROVISIONAL: hoy son fotos de los servicios; la clínica mandará fotos de su
// establecimiento y reemplazarán a estas (miniaturas de ~720 px de ancho en public/images/servicios/spin/; 12 fotos llenan bien el anillo).
// ─────────────────────────────────────────────────────────────────────────────

export interface ShowcasePhoto {
  src: string
  alt: string
  /** object-position de la foto dentro de la tarjeta (qué parte queda visible al recortar). */
  position: string
}

/** Nombre de la galería para lectores de pantalla (el anillo no lleva título visible). */
export const SHOWCASE_LABEL = 'Galería de fotos'

const photo = (file: string, alt: string, position = 'center'): ShowcasePhoto => ({
  src: `/images/servicios/spin/${file}.webp`,
  alt,
  position,
})

export const SHOWCASE_PHOTOS: ShowcasePhoto[] = [
  photo('implantes-dentales', 'Consulta de implantes dentales', '75% center'),
  photo('all-on-4', 'Prótesis fija sobre implantes', '75% center'),
  photo('coronas', 'Coronas dentales', '75% center'),
  photo('carillas', 'Carillas dentales', '75% center'),
  photo('blanqueamiento', 'Blanqueamiento dental', '60% center'),
  photo('ortodoncia', 'Ortodoncia'),
  photo('alineadores', 'Alineadores transparentes', '70% center'),
  photo('limpieza', 'Limpieza dental'),
  photo('endodoncias', 'Endodoncia'),
  photo('odontopediatria', 'Odontopediatría'),
  photo('periodoncia', 'Cuidado de las encías'),
  photo('extracciones', 'Extracción dental', '75% center'),
]
