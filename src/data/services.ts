// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LAS PÁGINAS DE SERVICIO (plantilla: src/pages/service/ServicePage.tsx)
//
// Cada servicio usa la misma estructura; aquí solo cambian nombre, imagen, textos y enlace al blog.
// Para dar página propia a otro servicio: agrega su entrada aquí (la clave es su ruta de
// src/config/routes.ts) y créalo con `service(...)` en SERVICE_ROUTES.
//
// • image: foto de fondo del hero (public/images/servicios/). PENDIENTE: conseguir las fotos HD con personas.
//   Sin imagen, el hero usa el azul marino de la marca.
// • highlights: textos definitivos, revisados médicamente.
// • about.text (sección 2 "Acerca del tratamiento"): un párrafo de 3 a 5 renglones. Se reescribió
//   para la versión corta: PENDIENTE de revisión médica. Su fuente (referencias y datos por confirmar
//   con la clínica) está en gan-harness/contenido/<slug>.json; si cambias un texto aquí, cámbialo también allí.
// • blogHref: artículo del blog de cada servicio. Mientras no exista, apunta a /blog/.
// ─────────────────────────────────────────────────────────────────────────────

import { BLOG, MORE_SERVICE_ROUTES, SERVICE_ROUTES } from '@/config/routes'

export interface ServiceContent {
  /** H1 con brillo blanco perla (.shiny-text). Cada palabra con mayúscula inicial (menos "de", "para", "tu"…); All on 4/6 se quedan como están. */
  title: string
  /** Gancho breve con el beneficio principal. */
  subtitle: string
  /** Tres frases cortas y simples. */
  highlights: [string, string, string]
  /** Ejemplo: { src: '/images/servicios/implantes-dentales.webp', width: 2560, height: 1440 } */
  image?: {
    src: string
    width: number
    height: number
    /** object-position de la foto (qué parte queda visible al recortar). */
    position?: string
    /** Espeja la foto (el texto va a la izquierda: la persona debe quedar a la derecha). */
    flip?: boolean
    /** Encuadre en la tarjeta horizontal (~594x500) del carrusel de la home; si falta, se usa `position`. */
    cardPosition?: string
  }
  /** Sección 2: título-pregunta (h2) y un párrafo de 3 a 5 renglones (informativo, con gancho). */
  about: {
    title: string
    text: string
  }
  blogHref: string
}

/** Contenido por ruta. La clave debe coincidir con la ruta en SERVICE_ROUTES. */
export const SERVICE_PAGES: Record<string, ServiceContent> = {
  // Columna 1
  '/implantes-dentales-en-tijuana/': {
    title: 'Implantes Dentales',
    subtitle: 'Vuelve a sonreír y a masticar con confianza.',
    highlights: ['Una raíz artificial en el hueso.', 'Sostiene corona, puente o prótesis.', 'Valoración previa de hueso y encías.'],
    image: { src: '/images/servicios/implantes-dentales.webp', width: 2000, height: 1125, position: 'center', cardPosition: '75% center' },
    about: {
      title: 'El implante dental',
      text: 'Si te falta un diente, masticar puede costar trabajo. Un implante es una raíz de titanio que se coloca con cirugía y sostiene una corona. El dentista valora tu hueso y tus encías.',
    },
    blogHref: BLOG.path,
  },
  '/all-in-4-implants-en-tijuana/': {
    image: { src: '/images/servicios/all-on-4.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'All on 4 implants',
    subtitle: 'Una prótesis fija para reemplazar una arcada con cuatro implantes.',
    highlights: ['Arcada completa sobre 4 implantes.', 'Dientes fijos en una sola prótesis.', 'Estudio del hueso de cada arcada.'],
    about: {
      title: 'All-on-4: arcada completa fija',
      text: 'Si te faltan casi todos los dientes de una arcada, All-on-4 la reemplaza con una prótesis fija sobre cuatro implantes. Es una cirugía con anestesia. El dentista valora tu hueso.',
    },
    blogHref: BLOG.path,
  },
  '/all-in-6-implants-en-tijuana/': {
    image: { src: '/images/servicios/all-on-6.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'All on 6 implants',
    subtitle: 'Una arcada completa y fija con seis puntos de apoyo.',
    highlights: ['Seis implantes por arcada.', 'Prótesis fija sobre implantes.', 'Plan según hueso y mordida.'],
    about: {
      title: 'All-on-6: arcada completa fija',
      text: 'Si te faltan casi todos los dientes de una arcada, All-on-6 usa seis implantes, no cuatro, para sostener una prótesis fija. Es una cirugía. El dentista decide según tu hueso.',
    },
    blogHref: BLOG.path,
  },
  '/coronas-en-tijuana/': {
    image: { src: '/images/servicios/coronas.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'Coronas Dentales',
    subtitle: 'Protege tus dientes y devuélveles su forma.',
    highlights: ['Protege dientes debilitados.', 'Cubre todo el diente dañado.', 'Revisión de la mordida.'],
    about: {
      title: 'La corona dental',
      text: 'Para colocar una corona, el dentista prepara el diente, revisa cuánto tejido sano queda y evalúa la mordida para que la restauración se adapte bien.',
    },
    blogHref: BLOG.path,
  },
  // Columna 2
  '/carillasdentalesentijuana/': {
    image: { src: '/images/servicios/carillas.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'Carillas Dentales',
    subtitle: 'Una opción para mejorar la apariencia de tus dientes.',
    highlights: ['Mejoran la forma de tus dientes.', 'Pueden ayudar a mejorar la apariencia.', 'Se planean de acuerdo con tu dentadura.'],
    about: {
      title: 'Carillas dentales',
      text: 'Las carillas pueden ser una opción si quieres mejorar la apariencia de tus dientes. En la consulta se revisa qué quieres cambiar y cómo se ve tu sonrisa en conjunto. Después, el dentista te explica cómo será el procedimiento y qué puedes esperar durante el tratamiento.',
    },
    blogHref: BLOG.path,
  },
  '/blanqueamiento-dental-en-tijuana/': {
    image: { src: '/images/servicios/blanqueamiento.webp', width: 2000, height: 1125, cardPosition: '60% center' },
    title: 'Blanqueamiento Dental',
    subtitle: 'Una forma de darle un tono más claro a tu sonrisa.',
    highlights: ['Evaluación antes de comenzar.', 'Plan según tu caso.', 'Acompañamiento durante el tratamiento.'],
    about: {
      title: 'Blanqueamiento dental',
      text: 'El blanqueamiento puede ayudarte a lograr una sonrisa más clara. Antes de empezar, se evalúa el estado de tus dientes y encías para elegir la opción adecuada y explicarte el proceso de forma sencilla.',
    },
    blogHref: BLOG.path,
  },
  '/limpieza-dental-en-tijuana/': {
    image: { src: '/images/servicios/limpieza.webp', width: 2000, height: 1125 },
    title: 'Limpieza Dental',
    subtitle: 'Cuida tus dientes y encías desde hoy.',
    highlights: ['Retira sarro y placa acumulados.', 'Pulido de manchas superficiales.', 'Revisión de dientes y encías.'],
    about: {
      title: 'Limpieza dental profesional',
      text: 'El cepillo no siempre limpia todas las áreas. Una limpieza dental es una forma sencilla de cuidar la salud de tus dientes y encías para mantener una sonrisa fresca y saludable. Es un cuidado que realmente importa y que muchas personas omiten.',
    },
    blogHref: BLOG.path,
  },
  // Columna 3
  '/endodoncias-en-tijuana/': {
    image: { src: '/images/servicios/endodoncias.webp', width: 2000, height: 1125 },
    title: 'Tratamiento de Endodoncia',
    subtitle: 'Atiende el interior de tu diente.',
    highlights: ['Ayuda a conservar tu diente.', 'Atiende la parte interna.', 'Ayuda a conservar la función del diente.'],
    about: {
      title: 'Endodoncia',
      text: 'Si un diente está causando dolor o molestias, la endodoncia puede ayudar a conservarlo. El dentista trabaja en la parte interna del diente, retira lo que está afectado y lo deja preparado para continuar con su restauración. El proceso se explica paso a paso.',
    },
    blogHref: BLOG.path,
  },
  '/ortodoncia-en-tijuana/': {
    image: { src: '/images/servicios/ortodoncia.webp', width: 2000, height: 1125, flip: true },
    title: 'Ortodoncia para tu Sonrisa',
    subtitle: 'Alinea tus dientes y mejora tu mordida.',
    highlights: ['Valoración de tu mordida.', 'Ajustes periódicos del aparato.', 'Seguimiento para revisar tu avance.'],
    about: {
      title: 'Ortodoncia',
      text: 'La ortodoncia mueve los dientes poco a poco con brackets u otros aparatos. Puede ayudar cuando los dientes están encimados, separados o cuando la mordida no cierra bien. El tiempo y el tipo de tratamiento se revisan con un profesional de acuerdo con tu caso.',
    },
    blogHref: BLOG.path,
  },
  '/invisalign-in-tijuana/': {
    image: { src: '/images/servicios/alineadores.webp', width: 2000, height: 1125, position: '70% center' },
    title: 'Alineadores Transparentes',
    subtitle: 'Una opción discreta para alinear tus dientes.',
    highlights: ['Una opción discreta para mejorar tu sonrisa.', 'Ayudan a mejorar la alineación dental.', 'Favorecen una sonrisa más equilibrada.'],
    about: {
      title: 'Alineadores transparentes',
      text: 'El tratamiento con alineadores se planifica de acuerdo con la posición de tus dientes y el resultado que se busca. Durante el proceso, se realizan revisiones para seguir los cambios y hacer los ajustes necesarios. El dentista te explica cada etapa y el tiempo estimado para tu caso.',
    },
    blogHref: BLOG.path,
  },
  '/odontologia-pediatrica-en-tijuana/': {
    image: { src: '/images/servicios/odontopediatria.webp', width: 2000, height: 1125 },
    title: 'Odontopediatría para Niños',
    subtitle: 'Cuidado dental para los más pequeños.',
    highlights: ['Primera visita para conocernos.', 'Prevención de caries infantil.', 'Trato a la medida de cada niño.'],
    about: {
      title: 'Odontopediatría para niños',
      text: 'La salud dental de tus niños importa. La odontopediatría ayuda a cuidar sus dientes desde pequeños, prevenir caries y detectar a tiempo cualquier situación que pueda afectar su sonrisa. La consulta se adapta a su edad y busca que se sientan seguros, acompañados y tranquilos.',
    },
    blogHref: BLOG.path,
  },
  // Fuera del submenú (MORE_SERVICE_ROUTES): solo en /servicios/
  '/dentaduras-en-tijuana/': {
    // PENDIENTE: foto propia de dentaduras (public/images/servicios/dentaduras.webp). Mientras, el hero usa el azul de marca.
    title: 'Dentaduras a tu Medida',
    subtitle: 'Reemplaza los dientes que te faltan.',
    highlights: ['Completas, parciales o inmediatas.', 'Prótesis removible hecha a medida.', 'Ajustes y revisiones periódicas.'],
    about: {
      title: 'Dentaduras a tu medida',
      text: 'Las dentaduras pueden ser una opción para reemplazar varios o todos los dientes que faltan. El dentista revisa tu caso, el estado de tu boca y lo que necesitas para orientarte hacia la alternativa más adecuada. Durante el proceso, te acompaña y da seguimiento para que el tratamiento se adapte a ti.',
    },
    blogHref: BLOG.path,
  },
  '/periodoncia-en-tijuana/': {
    image: { src: '/images/servicios/periodoncia.webp', width: 2000, height: 1125 },
    title: 'Periodoncia para tus Encías',
    subtitle: 'Cuida la salud de tus encías.',
    highlights: ['Atención a encías que sangran.', 'Medición de bolsas en encías.', 'Mantenimiento tras el tratamiento.'],
    about: {
      title: 'Periodoncia',
      text: 'Si te sangran las encías al cepillarte, puede haber inflamación. La periodoncia atiende encías y hueso y busca frenar el daño. El dentista mide el espacio entre encía y diente.',
    },
    blogHref: BLOG.path,
  },
  '/extracciones-dentales-en-tijuana/': {
    image: { src: '/images/servicios/extracciones.webp', width: 2000, height: 1125, position: '75% center' },
    title: 'Extracciones Simples y de Juicio',
    subtitle: 'Atención dental cuando un diente necesita retirarse.',
    highlights: ['Extracción simple o quirúrgica.', 'Valoración de muelas del juicio.', 'Radiografías antes de decidir.'],
    about: {
      title: 'Extracciones dentales',
      text: 'Una extracción puede ser necesaria cuando un diente no se puede reparar, está causando un problema o una muela del juicio no tiene espacio. Antes de decidir, el dentista revisa la pieza y las radiografías. Esta opción se evalúa con un dentista, quien te orienta y te acompaña durante el proceso.',
    },
    blogHref: BLOG.path,
  },
}

// Falla al compilar (y al abrir la app) si una ruta marcada como servicio no tiene su contenido aquí:
// sin él, App la dibujaría como página vacía y los botones "Agendar" apuntarían a una agenda inexistente.
for (const route of [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES]) {
  if (route.template === 'service' && !SERVICE_PAGES[route.path]) {
    throw new Error(`Falta el contenido de ${route.path} en src/data/services.ts`)
  }
}

// Falla al compilar si a un servicio le faltan frases del hero o el texto de "Acerca del tratamiento".
for (const [path, page] of Object.entries(SERVICE_PAGES)) {
  if (page.highlights.filter((text) => text.trim()).length < 3 || !page.about.text.trim()) {
    throw new Error(`${path} necesita 3 frases (highlights) y un texto (about.text) en src/data/services.ts`)
  }
}
