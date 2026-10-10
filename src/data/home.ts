// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DEL HOMEPAGE (edítalos aquí; no hace falta tocar los componentes)
//
//   HERO              → primera pantalla (título, texto, botones, frases y burbujas)
//   SCHEDULE          → sección "Agenda tu visita"
//   SERVICES_SECTION  → título/texto de "Servicios destacados" (tarjetas: data/featuredServices.ts)
//   PARTNERS_SECTION  → título/texto de "Aseguranzas y convenios" (empresas: data/partners.ts)
//   REVIEWS_SECTION   → título/texto de "Reseñas de Google" (reseñas: data/reviews.ts)
//   CONTACT_SECTION   → título/texto de "Contacto y ubicación" (datos: config/site.ts)
//
// El footer tiene su propio archivo: data/footer.ts.
// ─────────────────────────────────────────────────────────────────────────────

import type { AuroraTheme } from '@/components/decor/AuroraBackground'

export const HERO = {
  /** 'dark' (azul marino, como la referencia) o 'light' (porcelana). */
  theme: 'dark' as AuroraTheme,
  // El H1 se muestra en dos tonos: la primera parte resaltada y la segunda atenuada.
  titleLead: 'Dentistas en Tijuana',
  titleMuted: 'para ti vivas en donde vivas.',
  // SEO: "clínica dental", "Zona Río" y "Tijuana" van aquí (antes estaban en una línea sobre el título) junto a los servicios más buscados.
  lead: 'Dental Nakeji es una clínica dental fronteriza en la Zona Río de Tijuana. Aquí encuentras todos los servicios, desde limpieza dental, blanqueamiento dental e implantes dentales. ¿Qué sonrisa quieres tener el próximo año?',
  primaryCta: 'Agendar visita',
  secondaryCta: 'Escríbenos por WhatsApp',
  // Frases publicadas en el sitio oficial. Confírmalas con la clínica antes de publicar.
  highlights: ['Dentistas certificados', 'Más de 35 años cuidando sonrisas', 'Trabajamos con aseguranzas americanas'],
  // Etiquetas decorativas que aparecen y desaparecen sobre la aurora (solo escritorio).
  ambientLabels: ['Implantes dentales', 'Coronas', 'Carillas dentales', 'Blanqueamiento dental', 'Limpieza dental', 'Ortodoncia'],
}

export const SCHEDULE = {
  title: 'Agenda tu visita',
  text: 'Déjanos tus datos, el servicio que te interesa y el horario que prefieres. Te contactaremos para confirmar tu cita.',
  steps: ['Llena el formulario', 'Revisamos la disponibilidad', 'Te confirmamos por teléfono o WhatsApp'],
  alternative: '¿Prefieres agendar por mensaje?',
  whatsappCta: 'Agendar por WhatsApp',
}

export const SERVICES_SECTION = {
  title: 'Servicios destacados',
  text: 'Algunos de los tratamientos que ofrecemos en nuestra clínica de Tijuana.',
  cta: 'Ver todos los servicios',
}

export const PARTNERS_SECTION = {
  title: 'Aseguranzas y convenios',
  text: 'Trabajamos con aseguranzas y convenios empresariales para que aproveches los beneficios de tu plan.',
}

export const REVIEWS_SECTION = {
  eyebrow: 'Reseñas de Google',
  title: 'Lo que dicen nuestros pacientes',
  text: 'Opiniones publicadas por pacientes en nuestro perfil de Google.',
  cta: 'Ver reseñas en Google',
}

export const CONTACT_SECTION = {
  title: 'Contacto y ubicación',
  text: 'Visítanos en la Zona Urbana Río Tijuana o comunícate con nosotros por el medio que prefieras.',
}
