// TEXTOS DE LA PÁGINA /beneficios/ (componente: pages/benefits/BenefitsPage.tsx)
//
// • Encabezado: BENEFITS_HERO (titular y lista de beneficios). A la derecha va el espacio de la foto de recepción (vacío).
// • Tarjetas: BENEFIT_CARDS, en el orden en que se muestran. Cada una enlaza a su página (routes.ts).
//   Promociones aún no tiene contenido: lleva "Próximamente".
// • Estilos → src/styles/pages/benefits.css.
// Todo es provisional: no hay promociones, descuentos ni cobertura confirmados.
// Pendiente confirmar con la clínica: que informa costos antes de cada tratamiento y que orienta sobre seguros y convenios.

import type { IconName } from '@/components/ui/Icon'
import { AGREEMENTS, INSURANCE, PROMOTIONS_PAGE } from '@/config/routes'

export interface BenefitCard {
  id: string
  title: string
  text: string
  icon: IconName
  href: string
  /** Etiqueta opcional (p. ej. "Próximamente"). */
  badge?: string
}

export const BENEFITS_HERO = {
  eyebrow: 'Beneficios',
  titleLead: 'No solo cuidamos tu sonrisa,',
  titleAccent: 'también cuidamos tu dinero.',
  lead: 'Te explicamos tus opciones con claridad para que cuides tu salud dental sin gastar de más.',
  features: [
    { icon: 'drop', text: 'Costos claros antes de cada tratamiento' },
    { icon: 'check', text: 'Prevención a tiempo para evitar gastos mayores' },
    { icon: 'users', text: 'Opciones a tu medida y tu presupuesto' },
    { icon: 'shield', text: 'Orientación sobre tu seguro o convenio' },
  ] satisfies { icon: IconName; text: string }[],
}

export const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 'promociones',
    title: 'Promociones',
    text: 'Cuando tengamos promociones, las daremos a conocer aquí. Por ahora, pregúntanos por WhatsApp.',
    icon: 'sparkle',
    href: PROMOTIONS_PAGE.path,
    badge: 'Próximamente',
  },
  {
    id: 'aseguranzas',
    title: 'Aseguranzas americanas',
    // "Aceptamos aseguranzas americanas" está publicado en el sitio oficial.
    text: 'Aceptamos aseguranzas americanas. Consúltanos antes de tu cita para resolver tus dudas.',
    icon: 'shield',
    href: INSURANCE.path,
  },
  {
    id: 'convenios',
    title: 'Convenios con empresas',
    text: '¿Tu empresa tiene o quiere un convenio dental? Escríbenos y revisamos juntos tus opciones.',
    icon: 'building',
    href: AGREEMENTS.path,
  },
]

export const BENEFIT_CARDS_CTA = 'Consultar opciones'

export const BENEFITS_CTA = {
  title: '¿Tienes dudas sobre tu cobertura?',
  text: 'Escríbenos por WhatsApp y te decimos si tu plan o tu empresa aplican.',
  label: 'Escribir por WhatsApp',
}
