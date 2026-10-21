// Aseguranzas (INSURANCES) y convenios (AGREEMENT_PARTNERS): logos REALES que dio la clínica. No se incluyen en el JSON-LD.
// Un Partner sin `logo` se dibuja como marcador con icono y nombre.

import { LANGS, routeOf, type Lang } from '@/config/routes'
import { SITE } from '@/config/site'

export interface Partner {
  name: string
  logo?: { src: string; width: number; height: number; framed?: boolean }
  /** Color de marca aproximado (destello de /convenios/ al pasar el cursor). */
  accent?: string
}

interface PartnerGroup {
  id: string
  title: string
  /** Etiqueta corta sobre el título (chip). */
  badge: string
  text: string
  link: { label: string; href: string }
  items: Partner[]
}

// Aseguranzas con logo real (de la clínica), recortados a 480 px de ancho máx. → public/images/aseguranzas/. Orden alfabético.
// Para agregar una: copia el .webp a esa carpeta y añade [nombre, archivo, ancho, alto].
const INSURANCE_LOGOS: [string, string, number, number][] = [
  ['Aetna', 'aetna', 480, 124],
  ['AlwaysCare', 'alwayscare', 480, 115],
  ['Ameritas', 'ameritas', 480, 99],
  ['Anthem', 'anthem', 480, 109],
  ['BeneSys', 'benesys', 480, 113],
  ['Cigna', 'cigna', 480, 161],
  ['Delta Dental', 'delta-dental', 480, 54],
  ['Dental Health Services', 'dental-health-services', 480, 76],
  ['Guardian', 'guardian', 480, 89],
  ['HealthSCOPE Benefits', 'healt-scope-benefits', 365, 138],
  ['HealthComp', 'health-comp', 480, 78],
  ['Horizon', 'horizon', 480, 119],
  ['Humana', 'humana', 480, 99],
  ['Lincoln Financial Group', 'lincon-financial-group', 480, 154],
  ['MetLife', 'metlife', 480, 104],
  ['Premera Blue Cross', 'premera-blue-cross', 480, 128],
  ['Premier Insurance Company', 'premier-insurance-company', 480, 100],
  ['Principal', 'principal', 480, 135],
  ['Regence', 'regence', 480, 113],
  ['Renaissance', 'renaissance', 480, 90],
  ['Summit', 'summit', 480, 146],
  ['UFCW', 'ufcw', 480, 131],
  ['UnitedHealthcare', 'united-healthcare', 480, 151],
  ['Unum', 'unum', 480, 144],
]

export const INSURANCES: Partner[] = INSURANCE_LOGOS.map(([name, file, width, height]) => ({
  name,
  logo: { src: `/images/aseguranzas/${file}.webp`, width, height },
}))

// Empresas con convenio (logos de la clínica; fuentes en "Logos - Convenios/fuentes-logotipos.txt"), sin fondo,
// recortadas a 480 px de ancho máx. → public/images/convenios/. Se usan en la home (las 8 primeras) y en /convenios/ (todas).
// ORDEN (lo pidió la clínica): de más a menos popular, con las relacionadas juntas: hoteles; colegio; Caliente + Xolo Girls;
// Enerser + Toros + Zonkeys; Cabeza de Vaca + Lion Fish (restaurantes); IMMUJER; Nissan al final.
// Xolo Girls conserva su cuadro rosa: sus letras son blancas y sin fondo desaparecerían.
// [nombre, archivo, ancho, alto, color de marca: el más llamativo del logo (calculado de la imagen; gris/negro si no tiene color)].
const AGREEMENT_LOGOS: [string, string, number, number, string][] = [
  ['City Express', 'city-express', 480, 131, '#11509b'],
  ['Marriott Tijuana', 'marriott', 325, 240, '#9a1635'],
  ['Ibis', 'ibis', 245, 240, '#e20322'],
  ['Real Inn Tijuana', 'real-inn', 475, 121, '#f6911d'],
  ['Hotel Real del Río', 'hotel-real-del-rio', 480, 162, '#2b2b2b'],
  ['Colegio Reina Isabel', 'colegio-reina-isabel', 480, 222, '#0b215c'],
  ['Grupo Caliente', 'grupo-caliente', 480, 150, '#ff0101'],
  ['Xolo Girls', 'xolo-girls', 240, 240, '#d94f8e'],
  ['Enerser', 'enerser', 374, 240, '#0015af'],
  ['Toros de Tijuana', 'toros-de-tijuana', 240, 240, '#970101'],
  ['Zonkeys Tijuana', 'zonkeys', 337, 240, '#cc2a27'],
  ['Cabeza de Vaca', 'cabeza-de-vaca', 214, 218, '#fa0230'],
  ['Lion Fish', 'lion-fish', 299, 240, '#0032a0'],
  ['IMMUJER Tijuana', 'immujer', 176, 240, '#fc6601'],
  ['Nissan', 'nissan', 281, 240, '#4a4f55'],
]

// Logos que traen su propio cuadro de fondo: llevan esquinas redondeadas (a los demás no, porque recortaría sus esquinas).
const FRAMED_LOGOS = new Set(['xolo-girls'])

export const AGREEMENT_PARTNERS: Partner[] = AGREEMENT_LOGOS.map(([name, file, width, height, accent]) => ({
  name,
  logo: { src: `/images/convenios/${file}.webp`, width, height, framed: FRAMED_LOGOS.has(file) },
  accent,
}))

/**
 * Las 8 de la cinta de la home, de las más conocidas a menos (el resto está en /insurance/). Criterio: participación de mercado
 * en seguros dentales de grupo grande de EE. UU. (MetLife, Delta Dental, Aetna, Cigna y Guardian encabezan esa lista) y,
 * para las últimas tres, grandes aseguradoras de salud con cartera dental propia.
 */
const HOME_INSURANCES = ['MetLife', 'Delta Dental', 'Aetna', 'Cigna', 'Guardian', 'UnitedHealthcare', 'Anthem', 'Humana']

const buildGroups = (lang: Lang): PartnerGroup[] => [
  {
    id: 'aseguranzas',
    title: lang === 'en' ? 'Insurance' : 'Aseguranzas',
    badge: lang === 'en' ? 'US insurance plans' : 'Aseguranzas americanas',
    // "Aceptamos aseguranzas americanas" está publicado en el sitio oficial.
    text:
      lang === 'en'
        ? 'We accept US dental insurance plans. Message us and we will check whether your plan applies to your treatment.'
        : 'Aceptamos aseguranzas americanas. Escríbenos y revisamos si tu plan aplica para tu tratamiento.',
    link: { label: lang === 'en' ? 'View insurance' : 'Ver aseguranzas', href: routeOf('insurance', lang).path },
    items: HOME_INSURANCES.flatMap((name) => INSURANCES.filter((insurer) => insurer.name === name)),
  },
  {
    id: 'convenios',
    title: lang === 'en' ? 'Partner companies' : 'Convenios',
    badge: lang === 'en' ? 'Benefits for your team' : 'Beneficios para tu equipo',
    text:
      lang === 'en'
        ? 'If your company has an agreement with our clinic, ask us about the benefits for employees.'
        : 'Si tu empresa tiene convenio con nuestra clínica, pregúntanos por los beneficios para colaboradores.',
    link: { label: lang === 'en' ? 'View partner companies' : 'Ver convenios', href: routeOf('agreements', lang).path },
    // Las 8 más populares, igual que las aseguranzas (el orden de AGREEMENT_LOGOS ya va de más a menos popular).
    items: AGREEMENT_PARTNERS.slice(0, 8),
  },
]

export const PARTNER_GROUPS = Object.fromEntries(LANGS.map((lang) => [lang, buildGroups(lang)])) as Record<Lang, PartnerGroup[]>

export const PARTNERS_CTA = { label: 'Consultar mi cobertura', href: SITE.social.whatsapp }

/** Texto del botón de la home por idioma (el resto de páginas aún usa PARTNERS_CTA.label, en español, hasta el paso 4). */
export const PARTNERS_CTA_LABEL: Record<Lang, string> = { en: 'Ask about my coverage', es: PARTNERS_CTA.label }
