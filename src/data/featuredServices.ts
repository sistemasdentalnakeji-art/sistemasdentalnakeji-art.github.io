// Servicios destacados del homepage (máximo 4). Textos breves y generales:
// no incluyen promesas de resultados, precios ni tiempos.
import type { IconName } from '@/components/ui/Icon'

export interface FeaturedService {
  title: string
  description: string
  href: string
  icon: IconName
}

export const FEATURED_SERVICES: FeaturedService[] = [
  {
    title: 'Limpieza dental',
    description: 'Limpieza profesional y revisión para el cuidado preventivo de tus dientes y encías.',
    href: '/limpieza-dental-en-tijuana/',
    icon: 'tooth',
  },
  {
    title: 'Implantes dentales',
    description: 'Opción para reemplazar piezas perdidas. En consulta valoramos si es adecuada para tu caso.',
    href: '/implantes-dentales-en-tijuana/',
    icon: 'implant',
  },
  {
    title: 'Ortodoncia',
    description: 'Corrección de la posición de los dientes y la mordida con brackets o alineadores, según tu caso.',
    href: '/ortodoncia-en-tijuana/',
    icon: 'aligner',
  },
  {
    title: 'Blanqueamiento dental',
    description: 'Tratamiento para aclarar el tono de tus dientes, realizado y supervisado en la clínica.',
    href: '/blanqueamiento-dental-en-tijuana/',
    icon: 'sparkle',
  },
]
