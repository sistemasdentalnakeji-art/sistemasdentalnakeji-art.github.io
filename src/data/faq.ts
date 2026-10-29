// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /preguntas-frecuentes/ (pages/faq/FaqPage.tsx).
//
// Para agregar una pregunta, añade un objeto a la lista de su grupo; para un grupo nuevo, otro objeto a FAQ_GROUPS
// (id corto y único). El inglés es una traducción pendiente de revisión por la clínica.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '@/config/routes'

export const FAQ_INTERFACE = {
  es: {
    headline: ['Preguntas', 'y respuestas'], search: 'Busca tu pregunta',
    placeholder: 'Citas, tratamientos, pagos…', clear: 'Borrar búsqueda', all: 'Todas',
    categories: 'Filtrar preguntas por tema', results: 'preguntas', empty: 'No encontramos esa pregunta.',
    emptyText: 'Prueba con otra palabra o escríbenos para ayudarte.', reset: 'Ver todas las preguntas',
    preview: 'Vista previa del diseño. Las preguntas y respuestas definitivas están pendientes.',
    sample: 'Pregunta de ejemplo', sampleAnswer: 'Aquí aparecerá la respuesta aprobada por la clínica. Este texto sirve únicamente para revisar el diseño y la apertura del acordeón.',
  },
  en: {
    headline: ['Questions', '& answers'], search: 'Find your answer',
    placeholder: 'Appointments, treatments, payments…', clear: 'Clear search', all: 'All questions',
    categories: 'Filter questions by topic', results: 'questions', empty: 'We couldn’t find that question.',
    emptyText: 'Try another search or get in touch. We’re happy to help.', reset: 'View all questions',
    preview: 'Design preview. Final questions and answers are still to come.',
    sample: 'Sample question', sampleAnswer: 'The clinic’s approved answer will appear here. This text is only for reviewing the layout and accordion interaction.',
  },
} as const

interface FaqItem {
  question: string
  answer: string
  draft?: boolean
}

export const FAQ_PAGE: Record<
  Lang,
  { eyebrow: string; title: string; lead: string; helpTitle: string; helpText: string; helpCta: string }
> = {
  en: {
    eyebrow: 'Help',
    title: 'Questions & answers',
    lead: 'We want you to come to your appointment feeling at ease. Here you can find answers about appointments, treatments, and payment options. If you need anything else, message us and we’ll work it out together.',
    helpTitle: 'Can’t find your answer?',
    helpText: 'Message us on WhatsApp and we will reply during business hours.',
    helpCta: 'Ask on WhatsApp',
  },
  es: {
    eyebrow: 'Ayuda',
    title: 'Preguntas y respuestas',
    lead: 'Queremos que llegues a tu cita con tranquilidad. Aquí podrás resolver tus dudas sobre citas, tratamientos y formas de pago. Si necesitas algo más, escríbenos y lo vemos contigo.',
    helpTitle: '¿No encuentras tu respuesta?',
    helpText: 'Escríbenos por WhatsApp y te respondemos en horario de atención.',
    helpCta: 'Preguntar por WhatsApp',
  },
}

export const FAQ_GROUPS: Record<Lang, { id: string; title: string; items: FaqItem[] }[]> = {
  en: [
    {
      id: 'citas',
      title: 'Appointments',
      items: [
        { question: 'Can I change my appointment?', answer: 'Yes. Call us and we will help you reschedule based on our availability.' },
        { question: 'Do I need to book services in advance?', answer: 'Generally you do not need to book days in advance, but some treatments with specialists require prior coordination. Call us for details.' },
        { question: 'What happens if I arrive late for my appointment?', answer: 'You have a 15-minute grace period. If you arrive later, you may have to wait or reschedule according to the clinic’s availability.' },
      ],
    },
    {
      id: 'servicios',
      title: 'Services and treatments',
      items: [
        { question: 'How do I know what treatment I need?', answer: 'Book an evaluation so the dentist can review your case and recommend the right treatment.' },
        { question: 'Do you see children?', answer: 'Yes, we see children ages 5 and up.' },
        { question: 'Do treatments come with a warranty?', answer: 'Some treatments include a warranty. Your doctor will explain the conditions for your case during or at the end of treatment.' },
        { question: 'Can I request a report of my dental history?', answer: 'Yes, you can request a report with your dental history and the treatments completed or pending.' },
      ],
    },
    {
      id: 'pagos',
      title: 'Prices and payments',
      items: [
        { question: 'Can I get a quote before my consultation?', answer: 'To give you a quote, we need to review your case. You can explain it by filling out the form on our website or contacting us via WhatsApp or phone.' },
        { question: 'Is a deposit required to book an appointment?', answer: 'Yes, we ask for a $500 MXN deposit, which is deducted from the cost of your treatment.' },
        { question: 'What payment methods and currencies do you accept?', answer: 'We accept cash in Mexican pesos or US dollars, as well as card payments, bank transfer, Zelle, and PayPal.' },
        { question: 'Can I pay for a treatment in stages?', answer: 'Paying in stages is available for certain treatments. Contact us via WhatsApp or phone to learn about the options.' },
        { question: 'Do you offer interest-free installments?', answer: 'We currently do not offer interest-free installments.' },
      ],
    },
    {
      id: 'seguros',
      title: 'Insurance and agreements',
      items: [
        { question: 'Do you accept all insurance providers?', answer: 'Acceptance depends on the insurer. Contact us via WhatsApp or phone to confirm whether we work with yours.' },
        { question: 'How do I know if my insurance covers the services I need?', answer: 'Contact us via WhatsApp or phone with your insurer’s details and we will help you review your coverage.' },
        { question: 'What benefits do I get with my company agreement?', answer: 'Your company agreement includes a free evaluation and discounts on treatments.' },
        { question: 'Can I combine promotions, company agreements, and insurance benefits?', answer: 'No, only one of these options can be applied per service.' },
      ],
    },
    {
      id: 'urgencias',
      title: 'Dental emergencies',
      items: [
        { question: 'Do you treat dental emergencies?', answer: 'Yes. Contact us via WhatsApp or phone and we will tell you how we can help.' },
        { question: 'What types of dental emergencies do you treat?', answer: 'We treat cases such as a lost or broken tooth. Each situation requires an evaluation by the doctor to confirm how we can help you.' },
      ],
    },
  ],
  es: [
    {
      id: 'citas',
      title: 'Citas',
      items: [
        { question: '¿Puedo cambiar mi cita?', answer: 'Sí. Llámanos y te ayudaremos a reprogramar tu cita de acuerdo con la disponibilidad de nuestra agenda.' },
        { question: '¿Necesito reservar algún servicio con anticipación?', answer: 'En general no necesitas reservar con días de anticipación, pero algunos tratamientos con especialistas requieren coordinación previa. Puedes llamarnos para consultar los detalles.' },
        { question: '¿Qué pasa si llego tarde a mi cita?', answer: 'Tienes 15 minutos de tolerancia. Si llegas después, es posible que debas esperar o reprogramar tu cita según la disponibilidad de la clínica.' },
      ],
    },
    {
      id: 'servicios',
      title: 'Servicios y tratamientos',
      items: [
        { question: '¿Cómo sé qué tratamiento necesito?', answer: 'Agenda una valoración para que el dentista revise tu caso y te indique el tratamiento adecuado.' },
        { question: '¿Atienden a niños?', answer: 'Sí, atendemos a niños a partir de los 5 años.' },
        { question: '¿Los tratamientos tienen garantía?', answer: 'Algunos tratamientos cuentan con garantía. Tu doctor te explicará las condiciones según tu caso durante o al finalizar el tratamiento.' },
        { question: '¿Puedo solicitar un reporte de mi historial dental?', answer: 'Sí, puedes solicitar un reporte con tu historial dental y los tratamientos realizados o pendientes.' },
      ],
    },
    {
      id: 'pagos',
      title: 'Precios y pagos',
      items: [
        { question: '¿Puedo recibir una cotización antes de mi consulta?', answer: 'Para darte una cotización, necesitamos validar tu caso. Puedes explicárnoslo llenando el formulario de nuestra página web o contactarnos vía WhatsApp o teléfono para brindarte más información.' },
        { question: '¿Se requiere un anticipo para reservar una cita?', answer: 'Sí, solicitamos un anticipo de $500 MXN que se descuenta del costo de tu tratamiento.' },
        { question: '¿Qué métodos de pago y monedas aceptan?', answer: 'Aceptamos efectivo en pesos mexicanos o dólares estadounidenses, y también pagos con tarjeta, transferencia, Zelle y PayPal.' },
        { question: '¿Puedo pagar un tratamiento por etapas?', answer: 'El pago por etapas está disponible para ciertos tratamientos. Contáctanos por vía WhatsApp o teléfono para conocer las opciones disponibles.' },
        { question: '¿Ofrecen meses sin intereses?', answer: 'Actualmente no ofrecemos pagos a meses sin intereses.' },
      ],
    },
    {
      id: 'seguros',
      title: 'Seguros y convenios',
      items: [
        { question: '¿Aceptan todas las aseguradoras?', answer: 'La aceptación depende de la aseguradora. Contáctanos por vía WhatsApp o teléfono para confirmar si trabajamos con la tuya.' },
        { question: '¿Cómo puedo saber si mi seguro cubre los servicios que necesito?', answer: 'Contáctanos por vía WhatsApp o teléfono con los datos de tu aseguradora y te ayudaremos a revisar tu cobertura.' },
        { question: '¿Qué beneficios obtengo con mi convenio?', answer: 'Tu convenio incluye una valoración sin costo y descuentos en tratamientos.' },
        { question: '¿Puedo combinar promociones, convenios y beneficios de mi seguro?', answer: 'No, solo se puede aplicar una de estas opciones por servicio.' },
      ],
    },
    {
      id: 'urgencias',
      title: 'Urgencias dentales',
      items: [
        { question: '¿Atienden urgencias dentales?', answer: 'Sí, atendemos urgencias dentales. Puedes contactarnos por vía WhatsApp o teléfono para indicarte cómo podemos ayudarte.' },
        { question: '¿Qué tipos de urgencias dentales atienden?', answer: 'Atendemos casos como la pérdida o fractura de un diente. Cada situación requiere una valoración del doctor para confirmar cómo podemos ayudarte.' },
      ],
    },
  ],
}
