// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LAS PÁGINAS DE SERVICIO (plantilla: src/pages/service/ServicePage.tsx)
//
// Cada servicio usa la misma estructura; aquí solo cambian nombre, imagen, textos y enlace al blog.
// Para dar página propia a otro servicio: agrega su entrada aquí (la clave es su ServiceKey de
// src/config/routes.ts) y créalo con `service(...)` en PAGES.
//
// • image: foto de fondo del hero (public/images/servicios/). PENDIENTE: conseguir las fotos HD con personas.
//   Sin imagen, el hero usa el azul marino de la marca.
// • highlights: textos definitivos, revisados médicamente.
// • about.text (sección 2 "Acerca del tratamiento"): un párrafo de 3 a 5 renglones. Se reescribió
//   para la versión corta: PENDIENTE de revisión médica. Su fuente (referencias y datos por confirmar
//   con la clínica) está en gan-harness/contenido/<slug>.json; si cambias un texto aquí, cámbialo también allí.
// • El enlace al blog de cada servicio es la página /blog/ de su idioma (ServiceAbout).
// ─────────────────────────────────────────────────────────────────────────────

import { ALL_SERVICE_KEYS, type Lang, type ServiceKey } from '@/config/routes'
import { SERVICE_TEXT_EN } from '@/data/servicesEn'

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
}

/** Contenido en español por servicio (clave de config/routes.ts). El inglés está en data/servicesEn.ts. */
const PAGES_ES: Record<ServiceKey, ServiceContent> = {
  // Columna 1
  implants: {
    title: 'Implantes Dentales',
    subtitle: 'Vuelve a sonreír y a masticar con confianza.',
    highlights: ['Una raíz artificial en el hueso.', 'Sostiene corona, puente o prótesis.', 'Valoración previa de hueso y encías.'],
    image: { src: '/images/servicios/implantes-dentales.webp', width: 2000, height: 1125, position: 'center', cardPosition: '75% center' },
    about: {
      title: 'Implantes dentales',
      text: 'Un implante dental es una pieza que se coloca en el hueso para sustituir la raíz de un diente perdido. Sobre él puede apoyarse una corona, un puente o una prótesis, según lo que necesites. Antes de recomendarlo, el dentista revisa tus encías, el hueso disponible y tu salud general para planear el tratamiento adecuado para ti.',
    },
  },
  'all-on-4': {
    image: { src: '/images/servicios/all-on-4.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'All on 4 implants',
    subtitle: 'Una prótesis fija para reemplazar una arcada con cuatro implantes.',
    highlights: ['Arcada completa sobre 4 implantes.', 'Dientes fijos en una sola prótesis.', 'Estudio del hueso de cada arcada.'],
    about: {
      title: 'All on 4 implants',
      text: 'All on 4 es una opción para reemplazar los dientes de una arcada completa mediante una prótesis fija apoyada en cuatro implantes. Los implantes se colocan en el hueso y sirven de soporte a los nuevos dientes. Antes del procedimiento, el especialista estudia la boca y el hueso para determinar si esta alternativa es apropiada para tu caso.',
    },
  },
  'all-on-6': {
    image: { src: '/images/servicios/all-on-6.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'All on 6 implants',
    subtitle: 'Una arcada completa y fija con seis puntos de apoyo.',
    highlights: ['Seis implantes por arcada.', 'Prótesis fija sobre implantes.', 'Plan según hueso y mordida.'],
    about: {
      title: 'All on 6 implants',
      text: 'All on 6 utiliza seis implantes para sostener una prótesis fija que reemplaza los dientes de una arcada. Puede considerarse cuando faltan casi todos los dientes superiores o inferiores. El número de implantes por sí solo no define cuál tratamiento conviene: el dentista evalúa el hueso, las encías y la mordida antes de proponerte un plan.',
    },
  },
  crowns: {
    image: { src: '/images/servicios/coronas.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'Coronas Dentales',
    subtitle: 'Protege tus dientes y devuélveles su forma.',
    highlights: ['Protege dientes debilitados.', 'Cubre todo el diente dañado.', 'Revisión de la mordida.'],
    about: {
      title: 'Coronas',
      text: 'Una corona es una restauración que cubre un diente para ayudar a recuperar su forma y protegerlo cuando está debilitado o dañado. También puede colocarse sobre un implante. Antes de hacerla, el dentista revisa el estado del diente y la forma en que muerdes; después prepara y ajusta la corona para que funcione con el resto de tu boca.',
    },
  },
  // Columna 2
  veneers: {
    image: { src: '/images/servicios/carillas.webp', width: 2000, height: 1125, cardPosition: '75% center' },
    title: 'Carillas Dentales',
    subtitle: 'Una opción para mejorar la apariencia de tus dientes.',
    highlights: ['Mejoran la forma de tus dientes.', 'Pueden ayudar a mejorar la apariencia.', 'Se planean de acuerdo con tu dentadura.'],
    about: {
      title: 'Carillas dentales',
      text: 'Las carillas son cubiertas delgadas que se colocan sobre la parte frontal de los dientes para mejorar aspectos de su forma o apariencia. El dentista primero revisa la salud de tus dientes y encías y conversa contigo sobre el cambio que buscas. Después planifica cómo adaptar las carillas a tu sonrisa y te explica la preparación y los cuidados necesarios.',
    },
  },
  whitening: {
    image: { src: '/images/servicios/blanqueamiento.webp', width: 2000, height: 1125, cardPosition: '60% center' },
    title: 'Blanqueamiento Dental',
    subtitle: 'Una forma de darle un tono más claro a tu sonrisa.',
    highlights: ['Evaluación antes de comenzar.', 'Plan según tu caso.', 'Acompañamiento durante el tratamiento.'],
    about: {
      title: 'Blanqueamiento dental',
      text: 'El blanqueamiento dental busca aclarar el color de los dientes naturales mediante un tratamiento elegido para cada persona. Antes de comenzar, el dentista revisa tus dientes, encías y posibles restauraciones para explicarte qué cambio puedes esperar. No todas las manchas responden igual, y las coronas o carillas existentes no cambian de color con el blanqueamiento.',
    },
  },
  cleaning: {
    image: { src: '/images/servicios/limpieza.webp', width: 2000, height: 1125 },
    title: 'Limpieza Dental',
    subtitle: 'Cuida tus dientes y encías desde hoy.',
    highlights: ['Retira sarro y placa acumulados.', 'Pulido de manchas superficiales.', 'Revisión de dientes y encías.'],
    about: {
      title: 'Limpieza dental',
      text: 'La limpieza dental profesional retira la placa y el sarro acumulados en los dientes, incluso en zonas difíciles de limpiar en casa. Puede incluir un pulido para reducir algunas manchas superficiales y una revisión de dientes y encías. Complementa el cepillado y la limpieza entre dientes, que siguen siendo necesarios todos los días.',
    },
  },
  // Columna 3
  'root-canal': {
    image: { src: '/images/servicios/endodoncias.webp', width: 2000, height: 1125 },
    title: 'Tratamiento de Endodoncia',
    subtitle: 'Atiende el interior de tu diente.',
    highlights: ['Ayuda a conservar tu diente.', 'Atiende la parte interna.', 'Ayuda a conservar la función del diente.'],
    about: {
      title: 'Endodoncias',
      text: 'Una endodoncia trata la parte interna de un diente cuando el tejido que contiene está inflamado o infectado. El dentista retira el tejido afectado, limpia el interior y sella el espacio para intentar conservar la pieza. Después evalúa qué restauración necesita el diente para protegerlo y ayudarlo a seguir funcionando al morder.',
    },
  },
  orthodontics: {
    image: { src: '/images/servicios/ortodoncia.webp', width: 2000, height: 1125, flip: true },
    title: 'Ortodoncia para tu Sonrisa',
    subtitle: 'Alinea tus dientes y mejora tu mordida.',
    highlights: ['Valoración de tu mordida.', 'Ajustes periódicos del aparato.', 'Seguimiento para revisar tu avance.'],
    about: {
      title: 'Ortodoncia',
      text: 'La ortodoncia ayuda a mover los dientes de manera gradual para mejorar su posición y la forma en que encajan al morder. Puede realizarse con brackets u otros aparatos, según las necesidades de cada persona. El tratamiento comienza con una valoración de los dientes y la mordida, y continúa con revisiones y ajustes para seguir el avance.',
    },
  },
  aligners: {
    image: { src: '/images/servicios/alineadores.webp', width: 2000, height: 1125, position: '70% center' },
    title: 'Alineadores Transparentes',
    subtitle: 'Una opción discreta para alinear tus dientes.',
    highlights: ['Una opción discreta para mejorar tu sonrisa.', 'Ayudan a mejorar la alineación dental.', 'Favorecen una sonrisa más equilibrada.'],
    about: {
      title: 'Alineadores',
      text: 'Los alineadores son piezas transparentes y removibles hechas para ajustarse a los dientes. Se utilizan en una secuencia planificada para moverlos poco a poco y requieren revisiones durante el tratamiento. Son una opción discreta, aunque no resultan adecuados para todos los casos. El dentista evalúa tu mordida y la posición de tus dientes antes de recomendarlos.',
    },
  },
  pediatric: {
    image: { src: '/images/servicios/odontopediatria.webp', width: 2000, height: 1125 },
    title: 'Odontopediatría para Niños',
    subtitle: 'Cuidado dental para los más pequeños.',
    highlights: ['Primera visita para conocernos.', 'Prevención de caries infantil.', 'Trato a la medida de cada niño.'],
    about: {
      title: 'Odontopediatría',
      text: 'La odontopediatría se dedica al cuidado dental de bebés, niños y adolescentes. En la consulta se revisa cómo crecen sus dientes, se buscan señales tempranas de caries y se orienta a la familia sobre hábitos de higiene. La atención se adapta a la edad y a las necesidades de cada niño para acompañarlo mientras desarrolla su salud bucal.',
    },
  },
  // Fuera del submenú (MORE_SERVICE_ROUTES): solo en /servicios/
  dentures: {
    image: { src: '/images/servicios/dentaduras.webp', width: 2000, height: 1125, position: '70% center' },
    title: 'Dentaduras a tu Medida',
    subtitle: 'Reemplaza los dientes que te faltan.',
    highlights: ['Completas, parciales o inmediatas.', 'Prótesis removible hecha a medida.', 'Ajustes y revisiones periódicas.'],
    about: {
      title: 'Dentaduras',
      text: 'Las dentaduras son prótesis removibles hechas a medida para reemplazar dientes faltantes. Pueden ser parciales, cuando aún conservas algunos dientes, o completas, cuando se necesita sustituir toda una arcada. El dentista revisa tu boca para diseñar una opción que se adapte a ti y realiza ajustes y revisiones para comprobar que siga encajando bien.',
    },
  },
  gum: {
    image: { src: '/images/servicios/periodoncia.webp', width: 2000, height: 1125 },
    title: 'Periodoncia para tus Encías',
    subtitle: 'Cuida la salud de tus encías.',
    highlights: ['Atención a encías que sangran.', 'Medición de bolsas en encías.', 'Mantenimiento tras el tratamiento.'],
    about: {
      title: 'Periodoncia',
      text: 'La periodoncia se ocupa de las encías y de los tejidos que sostienen los dientes. Si tus encías sangran, están inflamadas o presentan otros cambios, el dentista las examina y puede medir los espacios alrededor de los dientes. Según lo que encuentre, propone el cuidado o tratamiento necesario y un plan de seguimiento para mantener la salud de las encías.',
    },
  },
  extractions: {
    image: { src: '/images/servicios/extracciones.webp', width: 2000, height: 1125, position: '75% center' },
    title: 'Extracciones Simples y de Juicio',
    subtitle: 'Atención dental cuando un diente necesita retirarse.',
    highlights: ['Extracción simple o quirúrgica.', 'Valoración de muelas del juicio.', 'Radiografías antes de decidir.'],
    about: {
      title: 'Extracciones simples y de juicio',
      text: 'Una extracción consiste en retirar un diente cuando el dentista determina que es necesario. Puede ser simple o requerir un procedimiento quirúrgico, según la posición y el estado de la pieza. En el caso de las muelas del juicio, primero se revisa si están causando problemas; la exploración y las radiografías ayudan a decidir si conviene retirarlas o vigilarlas.',
    },
  },
}

// Falla al compilar (y al abrir la app) si una ruta marcada como servicio no tiene su contenido aquí:
// sin él, App la dibujaría como página vacía y los botones "Agendar" apuntarían a una agenda inexistente.
for (const key of ALL_SERVICE_KEYS) {
  if (!PAGES_ES[key]) throw new Error(`Falta el contenido de ${key} en src/data/services.ts`)
  if (!SERVICE_TEXT_EN[key]) throw new Error(`Falta el contenido en inglés de ${key} en src/data/servicesEn.ts`)
}

/** Contenido por idioma: el inglés reemplaza solo los textos; la foto y su encuadre son los mismos. */
export const SERVICE_PAGES: Record<Lang, Record<ServiceKey, ServiceContent>> = {
  es: PAGES_ES,
  en: Object.fromEntries(ALL_SERVICE_KEYS.map((key) => [key, { ...PAGES_ES[key], ...SERVICE_TEXT_EN[key] }])) as Record<
    ServiceKey,
    ServiceContent
  >,
}

// Falla al compilar si a un servicio le faltan frases del hero o el texto de "Acerca del tratamiento" (en cualquier idioma).
for (const [lang, pages] of Object.entries(SERVICE_PAGES)) {
  for (const [key, page] of Object.entries(pages)) {
    if (page.highlights.filter((text) => text.trim()).length < 3 || !page.about.text.trim()) {
      throw new Error(`${key} (${lang}) necesita 3 frases (highlights) y un texto (about.text) en src/data/services*.ts`)
    }
  }
}
