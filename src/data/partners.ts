// Aseguranzas y convenios: MARCADORES DE EJEMPLO, no son empresas reales.
// Para completar: cambia `name` y agrega `logo` (archivo en /public, p. ej. '/partners/empresa.webp')
// con su ancho y alto reales. No se incluyen en el JSON-LD.

import { SITE } from '@/config/site'

export interface Partner {
  name: string
  logo?: { src: string; width: number; height: number }
}

export interface PartnerGroup {
  id: string
  title: string
  text: string
  link: { label: string; href: string }
  items: Partner[]
}

const placeholders = (prefix: string, count: number): Partner[] =>
  Array.from({ length: count }, (_, index) => ({ name: `${prefix} ${index + 1}` }))

export const PARTNER_GROUPS: PartnerGroup[] = [
  {
    id: 'aseguranzas',
    title: 'Aseguranzas',
    // "Aceptamos aseguranzas americanas" está publicado en el sitio oficial.
    text: 'Aceptamos aseguranzas americanas. Escríbenos y revisamos si tu plan aplica para tu tratamiento.',
    link: { label: 'Ver aseguranzas', href: '/insurance/' },
    items: placeholders('Aseguranza', 6),
  },
  {
    id: 'convenios',
    title: 'Convenios',
    text: 'Si tu empresa tiene convenio con nuestra clínica, pregúntanos por los beneficios para colaboradores.',
    link: { label: 'Ver convenios', href: '/convenios/' },
    items: placeholders('Empresa', 6),
  },
]

export const PARTNERS_CTA = { label: 'Consultar mi cobertura', href: SITE.social.whatsapp }
