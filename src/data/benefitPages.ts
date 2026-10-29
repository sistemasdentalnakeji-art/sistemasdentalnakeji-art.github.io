// TEXTOS DE LAS TRES PÁGINAS INTERNAS DE BENEFICIOS, en inglés (en) y español (es) (todo provisional; los definitivos llegan después)
//
// • Promociones → pages/promotions/PromotionsPage.tsx. Convenios → pages/agreements/AgreementsPage.tsx.
//   Aseguranzas → pages/insurance/InsurancePage.tsx.
// • Aseguranzas: nombres y logos REALES (los dio la clínica; archivos en public/images/aseguranzas/).
// • Empresas con convenio: logos REALES (src/data/partners.ts → AGREEMENT_PARTNERS). Las promociones son marcadores:
//   no hay promociones, descuentos ni fechas confirmados.
// • Los textos de encabezado reutilizan los de src/data/benefits.ts; los 3 pasos de Aseguranzas son provisionales.
// • Estilos → src/styles/pages/{benefit-pages,promotions,agreements,insurance}.css.
// Equivalencias del inglés: gan-harness/glosario-en.md.

import type { Lang } from '@/config/routes'
import { AGREEMENT_PARTNERS, type Partner } from '@/data/partners'

export interface PageIntro {
  eyebrow: string
  title: string
  lead: string
}

export const BENEFITS_BACK: Record<Lang, string> = { en: 'Benefits', es: 'Beneficios' }
export const PAGE_CTA: Record<Lang, string> = { en: 'Ask on WhatsApp', es: 'Preguntar por WhatsApp' }

export const PROMOTIONS_INTRO: Record<Lang, PageIntro> = {
  en: {
    eyebrow: 'Promotions',
    title: 'Promotions',
    lead: 'When we have promotions, we will announce them here. For now, ask us on WhatsApp.',
  },
  es: {
    eyebrow: 'Promociones',
    title: 'Promociones',
    lead: 'Cuando tengamos promociones, las daremos a conocer aquí. Por ahora, pregúntanos por WhatsApp.',
  },
}

export interface PromoPoster {
  name: string
  /** Etiqueta del cartel (hoy todas "Próximamente"). */
  badge: string
  /** Vigencia: por definir. */
  period: string
}

export const PROMOTIONS: Record<Lang, PromoPoster[]> = {
  en: Array.from({ length: 5 }, (_, index) => ({
    name: `Promotion ${index + 1}`,
    badge: 'Coming soon',
    period: 'Dates to be announced',
  })),
  es: Array.from({ length: 5 }, (_, index) => ({
    name: `Promoción ${index + 1}`,
    badge: 'Próximamente',
    period: 'Vigencia por definir',
  })),
}

export const AGREEMENTS_INTRO: Record<Lang, PageIntro> = {
  en: {
    eyebrow: 'Partner companies',
    title: 'Partner companies',
    lead: 'Does your company have a dental agreement, or want one? Message us and we will go over your options together.',
  },
  es: {
    eyebrow: 'Convenios',
    title: 'Convenios con empresas',
    lead: '¿Tu empresa tiene o quiere un convenio dental? Escríbenos y revisamos juntos tus opciones.',
  },
}

/** Empresas con convenio: las mismas de la home (logos reales en src/data/partners.ts). */
export const AGREEMENT_COMPANIES: Partner[] = AGREEMENT_PARTNERS

export const INSURANCE_INTRO: Record<Lang, PageIntro> = {
  en: {
    eyebrow: 'Insurance',
    title: 'US insurance plans',
    // "Aceptamos aseguranzas americanas" está publicado en el sitio oficial.
    lead: 'We accept US dental insurance plans. Contact us before your appointment and we’ll answer your questions.',
  },
  es: {
    eyebrow: 'Aseguranzas',
    title: 'Aseguranzas americanas',
    lead: 'Aceptamos aseguranzas americanas. Consúltanos antes de tu cita para resolver tus dudas.',
  },
}

export const INSURANCE_STEPS: Record<Lang, string[]> = {
  en: ['Tell us your plan', 'We check your coverage', 'Schedule your appointment'],
  es: ['Escríbenos tu plan', 'Revisamos tu cobertura', 'Agenda tu cita'],
}

// Las aseguranzas (logos reales) viven en src/data/partners.ts → INSURANCES, porque la home también las usa.
export const INSURANCE_GRID: Record<Lang, { title: string }> = {
  en: { title: 'Insurance plans we accept' },
  es: { title: 'Aseguranzas que aceptamos' },
}

/** Tarjeta grande del muro de convenios (título provisional). */
export const AGREEMENT_SUMMARY: Record<Lang, { title: string; text: string }> = {
  en: {
    title: 'Take care of your team’s smile',
    text: 'If you work at one of them, ask us about the benefits for employees.',
  },
  es: {
    title: 'Cuida la sonrisa de tu equipo',
    text: 'Si trabajas en alguna, pregúntanos por los beneficios para colaboradores.',
  },
}
export const AGREEMENT_JOIN: Record<Lang, { title: string; text: string }> = {
  en: {
    title: 'Does your company have a dental agreement, or want one?',
    text: 'Message us and we will go over your options together.',
  },
  es: {
    title: '¿Tu empresa tiene o quiere un convenio dental?',
    text: 'Escríbenos y revisamos juntos tus opciones.',
  },
}
