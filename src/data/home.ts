// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DEL HOMEPAGE, en inglés (en) y español (es). Cada bloque es un Record<Lang, …>: el componente toma el de su idioma.
//
//   HERO              → primera pantalla (título, texto, botones, frases y burbujas)
//   SCHEDULE          → sección "Agenda tu visita" (el formulario de citas sigue en español hasta el paso 5)
//   SERVICES_SECTION  → título/texto de "Servicios destacados" (tarjetas: data/featuredServices.ts)
//   PARTNERS_SECTION  → título/texto de "Aseguranzas y convenios" (empresas: data/partners.ts)
//   REVIEWS_SECTION   → título/texto de "Reseñas de Google" (reseñas: data/reviews.ts)
//   CONTACT_SECTION   → título/texto de "Contacto y ubicación" (datos: config/site.ts)
//
// El footer tiene su propio archivo: data/footer.ts. Rótulos y etiquetas compartidas: data/ui.ts.
// Equivalencias del inglés: gan-harness/glosario-en.md.
// ─────────────────────────────────────────────────────────────────────────────

import type { AuroraTheme } from '@/components/decor/AuroraBackground'
import type { Lang } from '@/config/routes'

/** 'dark' (azul marino, como la referencia) o 'light' (porcelana). Igual en los dos idiomas. */
const THEME: AuroraTheme = 'dark'

export const HERO: Record<
  Lang,
  {
    theme: AuroraTheme
    titleLead: string
    titleMuted: string
    lead: string
    primaryCta: string
    secondaryCta: string
    highlights: string[]
    ambientLabels: string[]
  }
> = {
  en: {
    theme: THEME,
    // El H1 se muestra en dos tonos: la primera parte resaltada y la segunda atenuada.
    titleLead: 'Dentists in Tijuana',
    titleMuted: 'for you, wherever you live.',
    lead: 'At Dental Nakeji we offer close, professional care across several specialties to look after your oral health. We are in Tijuana and welcome patients from Mexico and the United States, with treatments from dental cleaning to orthodontics. What smile would you like to show off next year?',
    primaryCta: 'Schedule a visit',
    secondaryCta: 'Message us on WhatsApp',
    // PENDIENTE (clínica): confirmar "Certified dentists" y "Over 35 years" antes de publicar (ver gan-harness/glosario-en.md).
    highlights: ['Certified dentists', 'Over 35 years caring for smiles', 'We work with US insurance plans'],
    ambientLabels: ['Dental implants', 'Dental crowns', 'Veneers', 'Teeth whitening', 'Dental cleaning', 'Orthodontics'],
  },
  es: {
    theme: THEME,
    titleLead: 'Dentistas en Tijuana',
    titleMuted: 'para ti vivas en donde vivas.',
    // SEO: "clínica dental", "Zona Río" y "Tijuana" van aquí (antes estaban en una línea sobre el título) junto a los servicios más buscados.
    lead: 'En Dental Nakeji te acompañamos con una atención cercana y profesional con distintas especialidades para cuidar de tu salud bucal. Desde Tijuana, recibimos pacientes de México y Estados Unidos y les ofrecemos tratamientos que van desde limpieza dental hasta ortodoncia. ¿Qué sonrisa te gustaría lucir el próximo año?',
    primaryCta: 'Agendar visita',
    secondaryCta: 'Escríbenos por WhatsApp',
    // Frases publicadas en el sitio oficial. Confírmalas con la clínica antes de publicar.
    highlights: ['Dentistas certificados', 'Más de 35 años cuidando sonrisas', 'Trabajamos con aseguranzas americanas'],
    // Etiquetas decorativas que aparecen y desaparecen sobre la aurora (solo escritorio).
    ambientLabels: ['Implantes dentales', 'Coronas', 'Carillas dentales', 'Blanqueamiento dental', 'Limpieza dental', 'Ortodoncia'],
  },
}

export const SCHEDULE: Record<
  Lang,
  { title: string; text: string; steps: string[]; alternative: string; whatsappCta: string }
> = {
  en: {
    title: 'Schedule your visit',
    text: 'Leave us your details, the service you are interested in and the time you prefer. We will contact you to confirm your appointment.',
    steps: ['Fill out the form', 'We check availability', 'We confirm by phone or WhatsApp'],
    alternative: 'Prefer to book by message?',
    whatsappCta: 'Book on WhatsApp',
  },
  es: {
    title: 'Agenda tu visita',
    text: 'Déjanos tus datos, el servicio que te interesa y el horario que prefieres. Te contactaremos para confirmar tu cita.',
    steps: ['Llena el formulario', 'Revisamos la disponibilidad', 'Te confirmamos por teléfono o WhatsApp'],
    alternative: '¿Prefieres agendar por mensaje?',
    whatsappCta: 'Agendar por WhatsApp',
  },
}

export const SERVICES_SECTION: Record<Lang, { title: string; text: string; cta: string }> = {
  en: {
    title: 'Featured services',
    text: 'Some of the treatments we offer at our clinic in Tijuana.',
    cta: 'View all services',
  },
  es: {
    title: 'Servicios destacados',
    text: 'Algunos de los tratamientos que ofrecemos en nuestra clínica de Tijuana.',
    cta: 'Ver todos los servicios',
  },
}

export const PARTNERS_SECTION: Record<Lang, { title: string; text: string }> = {
  en: {
    title: 'Insurance and partner companies',
    text: 'We work with insurance plans and company agreements so you can make use of your plan benefits.',
  },
  es: {
    title: 'Aseguranzas y convenios',
    text: 'Trabajamos con aseguranzas y convenios empresariales para que aproveches los beneficios de tu plan.',
  },
}

export const REVIEWS_SECTION: Record<Lang, { eyebrow: string; title: string; text: string; cta: string }> = {
  en: {
    eyebrow: 'Google reviews',
    title: 'What our patients say',
    text: 'Reviews posted by patients on our Google profile.',
    cta: 'See reviews on Google',
  },
  es: {
    eyebrow: 'Reseñas de Google',
    title: 'Lo que dicen nuestros pacientes',
    text: 'Opiniones publicadas por pacientes en nuestro perfil de Google.',
    cta: 'Ver reseñas en Google',
  },
}

export const CONTACT_SECTION: Record<Lang, { title: string; text: string }> = {
  en: {
    title: 'Contact and location',
    text: 'Visit us in Zona Urbana Río Tijuana, or contact us whichever way you prefer.',
  },
  es: {
    title: 'Contacto y ubicación',
    text: 'Visítanos en la Zona Urbana Río Tijuana o comunícate con nosotros por el medio que prefieras.',
  },
}
