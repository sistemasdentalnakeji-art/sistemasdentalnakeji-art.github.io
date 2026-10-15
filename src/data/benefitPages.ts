// TEXTOS DE LAS TRES PÁGINAS INTERNAS DE BENEFICIOS (todo provisional; los textos definitivos llegan después)
//
// • Promociones → pages/promotions/PromotionsPage.tsx. Convenios → pages/agreements/AgreementsPage.tsx.
//   Aseguranzas → pages/insurance/InsurancePage.tsx.
// • Aseguranzas: nombres y logos REALES (los dio la clínica; archivos en public/images/aseguranzas/).
// • Empresas con convenio: logos REALES (src/data/partners.ts → AGREEMENT_PARTNERS). Las promociones son marcadores:
//   no hay promociones, descuentos ni fechas confirmados.
// • Los textos de encabezado reutilizan los de src/data/benefits.ts; los 3 pasos de Aseguranzas son provisionales.
// • Estilos → src/styles/pages/{benefit-pages,promotions,agreements,insurance}.css.

import { AGREEMENT_PARTNERS, type Partner } from '@/data/partners'

export interface PageIntro {
  eyebrow: string
  title: string
  lead: string
}

export const BENEFITS_BACK = 'Beneficios'
export const PAGE_CTA = 'Preguntar por WhatsApp'

export const PROMOTIONS_INTRO: PageIntro = {
  eyebrow: 'Promociones',
  title: 'Promociones',
  lead: 'Cuando tengamos promociones, las daremos a conocer aquí. Por ahora, pregúntanos por WhatsApp.',
}

export interface PromoPoster {
  name: string
  /** Etiqueta del cartel (hoy todas "Próximamente"). */
  badge: string
  /** Vigencia: por definir. */
  period: string
}

export const PROMOTIONS: PromoPoster[] = Array.from({ length: 5 }, (_, index) => ({
  name: `Promoción ${index + 1}`,
  badge: 'Próximamente',
  period: 'Vigencia por definir',
}))

export const AGREEMENTS_INTRO: PageIntro = {
  eyebrow: 'Convenios',
  title: 'Convenios con empresas',
  lead: '¿Tu empresa tiene o quiere un convenio dental? Escríbenos y revisamos juntos tus opciones.',
}

/** Empresas con convenio: las mismas de la home (logos reales en src/data/partners.ts). */
export const AGREEMENT_COMPANIES: Partner[] = AGREEMENT_PARTNERS

export const INSURANCE_INTRO: PageIntro = {
  eyebrow: 'Aseguranzas',
  title: 'Aseguranzas americanas',
  // "Aceptamos aseguranzas americanas" está publicado en el sitio oficial.
  lead: 'Aceptamos aseguranzas americanas. Consúltanos antes de tu cita para resolver tus dudas.',
}

export const INSURANCE_STEPS = ['Escríbenos tu plan', 'Revisamos tu cobertura', 'Agenda tu cita']

// Las aseguranzas (logos reales) viven en src/data/partners.ts → INSURANCES, porque la home también las usa.
export const INSURANCE_GRID = {
  title: 'Aseguranzas que aceptamos',
  missing: '¿No ves la tuya? Pregúntanos',
}

/** Tarjeta grande del muro de convenios (título provisional). */
export const AGREEMENT_SUMMARY = {
  title: 'Cuida la sonrisa de tu equipo',
  text: 'Si trabajas en alguna, pregúntanos por los beneficios para colaboradores.',
}
export const AGREEMENT_JOIN = {
  title: '¿Tu empresa aún no tiene convenio?',
  text: 'Escríbenos y armamos una propuesta para tu equipo.',
}
