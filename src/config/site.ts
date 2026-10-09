// Datos reales de la clínica, verificados en https://nakejidental.com/ (oct. 2026).
// Edita aquí cualquier dato de contacto: todo el sitio y el JSON-LD lo leen de este archivo.

export const SITE = {
  name: 'Dental Nakeji',
  legalName: 'Clínica Dental Nakeji',
  /** Dominio de producción confirmado (URL canónica). */
  origin: 'https://nakejidental.com',
  locale: 'es_MX',
  lang: 'es-MX',
  logo: {
    src: '/brand/logo-nakeji-azul-768.webp',
    full: '/brand/logo-nakeji-azul.webp',
    width: 768,
    height: 133,
    fullWidth: 2560,
    fullHeight: 443,
    alt: 'Dental Nakeji',
  },
  email: 'citasnakeji@gmail.com',
  phones: [
    { label: 'Teléfono México', display: '(664) 449 4649', e164: '+526644494649' },
    { label: 'Teléfono Estados Unidos', display: '(619) 730 4612', e164: '+16197304612' },
  ].map((phone) => ({ ...phone, href: `tel:${phone.e164}` })),
  address: {
    street: 'Av. Río Tijuana 2440, Int. PH3, Jose María Velasco',
    neighborhood: 'Zona Urbana Río Tijuana',
    postalCode: '22010',
    city: 'Tijuana',
    region: 'B.C.',
    country: 'MX',
    mapsUrl: 'https://maps.app.goo.gl/8yYpDMNXzJLRXzhV8',
    // Mapa embebido (mismo que usa el sitio actual). Para un pin exacto, reemplázalo por la URL
    // de Google Maps → Compartir → Insertar un mapa.
    mapEmbedUrl: 'https://www.google.com/maps?q=nakeji%20dental&t=m&z=15&output=embed&iwloc=near',
  },
  /**
   * Horario de atención. PENDIENTE: no está publicado en el sitio oficial.
   * Mientras esté vacío no se muestra en ninguna parte.
   * Ejemplo: [{ days: 'Lunes a viernes', hours: '9:00 a. m. – 6:00 p. m.' }]
   */
  hours: [] as { days: string; hours: string }[],
  social: {
    facebook: 'https://www.facebook.com/DentalNakeji/?locale=es_LA',
    instagram: 'https://www.instagram.com/dentalnakeji/',
    whatsapp: 'https://wa.me/message/VVH7OKKWM2W7O1',
  },
} as const

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', href: SITE.social.facebook },
  { id: 'instagram', label: 'Instagram', href: SITE.social.instagram },
  { id: 'whatsapp', label: 'WhatsApp', href: SITE.social.whatsapp },
] as const
