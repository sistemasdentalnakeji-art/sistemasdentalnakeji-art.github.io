// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /preguntas-frecuentes/ (pages/faq/FaqPage.tsx).
//
// PROVISIONALES: preguntas y respuestas en lorem ipsum (solo el diseño). Para agregar una pregunta, añade un objeto
// a la lista de su grupo; para un grupo nuevo, otro objeto a FAQ_GROUPS (id corto y único).
// ─────────────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string
  answer: string
}

const ANSWER =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero, sed cursus ante dapibus diam. Sed nisi, nulla quis sem at nibh elementum imperdiet.'

// shortcut: 5 marcadores por grupo (15 en total, lo pedido); se reemplazan por las preguntas reales de la clínica.
const placeholders = (from: number): FaqItem[] =>
  Array.from({ length: 5 }, (_, i) => ({ question: `Pregunta ${from + i}: lorem ipsum dolor sit amet?`, answer: ANSWER }))

export const FAQ_PAGE = {
  eyebrow: 'Ayuda',
  title: 'Preguntas frecuentes',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam.',
  helpTitle: '¿No encuentras tu respuesta?',
  helpText: 'Escríbenos por WhatsApp y te respondemos en horario de atención.',
  helpCta: 'Preguntar por WhatsApp',
}

export const FAQ_GROUPS = [
  { id: 'citas', title: 'Citas y primera visita', items: placeholders(1) },
  { id: 'tratamientos', title: 'Tratamientos', items: placeholders(6) },
  { id: 'pagos', title: 'Pagos y aseguranzas', items: placeholders(11) },
]
