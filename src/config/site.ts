// Datos reales de la clínica, verificados en https://nakejidental.com/ (oct. 2026).
// Edita aquí cualquier dato de contacto: todo el sitio y el JSON-LD lo leen de este archivo.

export const SITE = {
  name: 'Dental Nakeji',
  legalName: 'Clínica Dental Nakeji',
  /** Dominio de producción confirmado (URL canónica). */
  origin: 'https://nakejidental.com',
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
    // `label`/`display` (español) los usan las páginas aún sin traducir; la home usa `labels`/`displays` por idioma
    // (en inglés, el teléfono con código de país: ver gan-harness/glosario-en.md).
    {
      label: 'Teléfono México',
      labels: { en: 'Mexico phone', es: 'Teléfono México' },
      display: '(664) 449 4649',
      displays: { en: '+52 (664) 449 4649', es: '(664) 449 4649' },
      e164: '+526644494649',
    },
    {
      label: 'Teléfono Estados Unidos',
      labels: { en: 'US phone', es: 'Teléfono Estados Unidos' },
      display: '(619) 730 4612',
      displays: { en: '+1 (619) 730 4612', es: '(619) 730 4612' },
      e164: '+16197304612',
    },
  ].map((phone) => ({ ...phone, href: `tel:${phone.e164}` })),
  address: {
    street: 'Av. Río Tijuana 2440, Int. PH3, Jose María Velasco',
    neighborhood: 'Zona Urbana Río Tijuana',
    postalCode: '22010',
    city: 'Tijuana',
    region: 'B.C.',
    country: 'MX',
    mapsUrl: 'https://maps.app.goo.gl/8yYpDMNXzJLRXzhV8',
  },
  /**
   * Horario de atención. PENDIENTE: no está publicado en el sitio oficial.
   * Mientras esté vacío no se muestra en ninguna parte.
   * Ejemplo: [{ days: 'Lunes a viernes', hours: '9:00 a. m. – 6:00 p. m.' }]
   */
  hours: [] as { days: string; hours: string }[],
  social: {
    facebook: 'https://www.facebook.com/DentalNakeji/',
    instagram: 'https://www.instagram.com/dentalnakeji/',
    whatsapp: 'https://wa.me/message/VVH7OKKWM2W7O1',
  },
} as const

/** Etiqueta de idioma del <html lang> y de Open Graph (og:locale) de cada versión del sitio. */
export const LOCALES = {
  en: { lang: 'en', og: 'en_US' },
  es: { lang: 'es-MX', og: 'es_MX' },
} as const

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', href: SITE.social.facebook },
  { id: 'instagram', label: 'Instagram', href: SITE.social.instagram },
  { id: 'whatsapp', label: 'WhatsApp', href: SITE.social.whatsapp },
] as const
