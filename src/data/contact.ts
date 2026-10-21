// Textos de la página /contacto/ (provisionales, pendientes de revisión de la clínica), en inglés (en) y español (es).
// Teléfonos, dirección, correo, horario y WhatsApp salen de src/config/site.ts. Página: src/pages/contact/ContactPage.tsx.
// Equivalencias del inglés: gan-harness/glosario-en.md.

import type { Lang } from '@/config/routes'
import { SITE } from '@/config/site'

export const CONTACT_INTRO: Record<Lang, { eyebrow: string; title: string; tagline: string }> = {
  en: { eyebrow: 'Contact', title: 'Contact', tagline: 'At Dental Nakeji, your care comes first.' },
  es: { eyebrow: 'Contacto', title: 'Contacto', tagline: 'En Dental Nakeji, tu atención es lo primero.' },
}

interface ContactDirect {
  title: string
  lead: string
  phoneLabel: string
  addressLabel: string
  addressCta: string
  whatsappTitle: string
  whatsappText: string
  whatsappCta: string
  emailLabel: string
  emailText: string
  emailCta: string
}

export const CONTACT_DIRECT: Record<Lang, ContactDirect> = {
  en: {
    title: 'Call us or visit us',
    lead: 'Choose whatever works best for you.',
    phoneLabel: 'Phone numbers',
    addressLabel: 'Address',
    addressCta: 'Get directions',
    whatsappTitle: 'WhatsApp',
    whatsappText: 'Schedule your appointment or ask about a treatment.',
    whatsappCta: 'Message us on WhatsApp',
    emailLabel: 'Email',
    emailText: 'Ideal for quotes, sending studies or X-rays, and following up on your treatment.',
    emailCta: 'Send an email',
  },
  es: {
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
  },
}

export const CONTACT_SOCIAL: Record<Lang, { eyebrow: string; title: string; lead: string }> = {
  en: {
    eyebrow: 'Social media',
    title: 'Follow us on social media',
    lead: 'Real cases, tips and daily life at the clinic. The latest, right here.',
  },
  es: {
    eyebrow: 'Redes sociales',
    title: 'Síguenos en redes',
    lead: 'Casos reales, consejos y el día a día de la clínica. Lo más reciente, aquí mismo.',
  },
}

interface SocialCard {
  title: string
  handle: string
  cta: string
  more: string
}

export const SOCIAL_CARDS: Record<Lang, { facebook: SocialCard; instagram: SocialCard }> = {
  en: {
    facebook: { title: 'Facebook', handle: 'Family Dental Nakeji', cta: 'Follow on Facebook', more: 'See everything on Facebook' },
    instagram: { title: 'Instagram', handle: '@dentalnakeji', cta: 'Follow on Instagram', more: 'See everything on Instagram' },
  },
  es: {
    facebook: { title: 'Facebook', handle: 'Family Dental Nakeji', cta: 'Seguir en Facebook', more: 'Ver todo en Facebook' },
    instagram: { title: 'Instagram', handle: '@dentalnakeji', cta: 'Seguir en Instagram', more: 'Ver todo en Instagram' },
  },
}

/** Etiquetas de accesibilidad de la página (secciones, botones de copiar y marcos de redes). */
export const CONTACT_A11Y: Record<
  Lang,
  { sections: string; copy: (label: string) => string; copied: string; facebookTitle: string; instagramTitle: string }
> = {
  en: {
    sections: 'Ways to contact us',
    copy: (label) => `Copy ${label}`,
    copied: 'Copied',
    facebookTitle: 'Recent Dental Nakeji posts on Facebook',
    instagramTitle: 'Dental Nakeji Instagram profile',
  },
  es: {
    sections: 'Formas de contacto',
    copy: (label) => `Copiar ${label}`,
    copied: 'Copiado',
    facebookTitle: 'Publicaciones recientes de Dental Nakeji en Facebook',
    instagramTitle: 'Perfil de Instagram de Dental Nakeji',
  },
}

// Ambos se cargan solos (iframe con loading="lazy"). Instagram: incrustación oficial del perfil (sin token de la API).
// El plugin de Facebook no se adapta a su iframe: se le pasa el ancho real de la ventana (el plugin admite de 180 a 500 px).
export const facebookEmbed = (width: number) =>
  `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(SITE.social.facebook)}` +
  `&tabs=timeline&width=${Math.min(500, Math.max(180, Math.floor(width)))}&height=560&small_header=true` +
  '&adapt_container_width=true&hide_cover=false&show_facepile=false'

export const INSTAGRAM_EMBED = `${SITE.social.instagram.replace(/\/?$/, '/')}embed/`

export const PRIVACY_NOTE: Record<Lang, string> = {
  en: 'Meta content: may use cookies.',
  es: 'Contenido de Meta: puede usar cookies.',
}
