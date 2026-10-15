// Textos de la página /contacto/ (provisionales, pendientes de revisión de la clínica).
// Teléfonos, dirección, correo, horario y WhatsApp salen de src/config/site.ts. Página: src/pages/contact/ContactPage.tsx.

import { SITE } from '@/config/site'

export const CONTACT_INTRO = {
  title: 'Contacto',
  tagline: 'En Dental Nakeji, tu atención es lo primero.',
}

export const CONTACT_DIRECT = {
  title: 'Llámanos o visítanos',
  lead: 'Elige la forma que te quede mejor.',
  phoneLabel: 'Teléfonos',
  addressLabel: 'Dirección',
  addressCta: 'Cómo llegar',
  whatsappTitle: 'WhatsApp',
  whatsappText: 'Agenda tu cita o pregunta por un tratamiento.',
  whatsappCta: 'Escríbenos por WhatsApp',
  emailLabel: 'Correo',
  emailText: 'Ideal para cotizaciones, enviar estudios o radiografías y dar seguimiento a tu tratamiento.',
  emailCta: 'Enviar un correo',
}

export const CONTACT_SOCIAL = {
  eyebrow: 'Redes sociales',
  title: 'Síguenos en redes',
  lead: 'Casos reales, consejos y el día a día de la clínica. Lo más reciente, aquí mismo.',
}

export const SOCIAL_CARDS = {
  facebook: { title: 'Facebook', handle: 'Family Dental Nakeji', cta: 'Seguir en Facebook', more: 'Ver todo en Facebook' },
  instagram: { title: 'Instagram', handle: '@dentalnakeji', cta: 'Seguir en Instagram', more: 'Ver todo en Instagram' },
}

// Ambos se cargan solos (iframe con loading="lazy"). Instagram: incrustación oficial del perfil (sin token de la API).
// El plugin de Facebook no se adapta a su iframe: se le pasa el ancho real de la ventana (el plugin admite de 180 a 500 px).
export const facebookEmbed = (width: number) =>
  `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(SITE.social.facebook)}` +
  `&tabs=timeline&width=${Math.min(500, Math.max(180, Math.floor(width)))}&height=560&small_header=true` +
  '&adapt_container_width=true&hide_cover=false&show_facepile=false'

export const INSTAGRAM_EMBED = `${SITE.social.instagram.replace(/\/?$/, '/')}embed/`

export const PRIVACY_NOTE = 'Contenido de Meta: puede usar cookies.'
