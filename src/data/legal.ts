// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /aviso-de-privacidad/ y /terminos-y-condiciones/ (pages/legal/LegalDocument.tsx).
//
// Base legal: Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP, México).
// El español (PRIVACY_PAGE_ES / TERMS_PAGE_ES, al final) es el texto redactado; el inglés (PRIVACY_PAGE / TERMS_PAGE) es su traducción.
// /en/ muestra el inglés y /es/ el español. Cada sección conserva un `id` corto y único (ancla del índice).
//
// PENDIENTE DE CONFIRMAR (clínica / abogado) antes de dar el texto por definitivo:
//  • Clínica: fecha de publicación (`updated`), plazo de cancelación (24 h), anticipos/reembolsos/garantías,
//    que el SSN se pida solo por teléfono y se borre tras verificar, que el sitio no use analítica ni cookies de rastreo.
//  • Abogado: plazo ARCO (20 días hábiles) y autoridad vigente (LFPDPPP 2025), conservación del expediente (NOM-004, 5 años),
//    alcance de HIPAA, tribunales de Tijuana y Profeco, fotos/testimonios (Cofepris), art. 83 de la Ley General de Salud.
// ─────────────────────────────────────────────────────────────────────────────

import type { IconName } from '@/components/ui/Icon'

/** Bloque de contenido de una sección: párrafo, subtítulo, lista o enlace (externo si empieza con http). */
export type LegalBlock = string | { h: string } | { ul: string[] } | { link: string; href: string }

interface LegalSection {
  id: string
  icon: IconName
  title: string
  blocks: LegalBlock[]
}

export interface LegalDoc {
  eyebrow: string
  title: string
  lead: string
  updated: string
  tocLabel: string
  sections: LegalSection[]
}

const HHS_URL = 'https://www.hhs.gov/hipaa/filing-a-complaint/index.html'
const SITE_URL = 'https://nakejidental.com/'

// ─── Español ───

export const PRIVACY_PAGE_ES: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Aviso de privacidad',
  lead: 'En este aviso le explicamos qué datos personales recabamos, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos.',
  updated: 'Última actualización: 30/10/2026',
  tocLabel: 'En este aviso',
  sections: [
    {
      id: 'responsable',
      icon: 'shield',
      title: 'Quién es responsable de sus datos',
      blocks: [
        'Nakeji Dental Group, que opera con el nombre comercial Dental Nakeji ("la Clínica"), es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y demás normas aplicables en México.',
        { h: 'Datos de contacto' },
        {
          ul: [
            'Domicilio: Jose María Velasco, Av. Río Tijuana 2440, Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C., México.',
            'Departamento de Privacidad: info@nakejidental.com',
            'Teléfono: 619-879-2202',
          ],
        },
        { link: `Sitio web: ${SITE_URL}`, href: SITE_URL },
      ],
    },
    {
      id: 'datos',
      icon: 'document',
      title: 'Qué datos recabamos',
      blocks: [
        'Recabamos datos que usted nos da en persona, por teléfono, por WhatsApp, por correo electrónico o en el formulario de nuestro sitio web:',
        { h: 'Identificación y contacto' },
        {
          ul: [
            'Nombre, fecha de nacimiento, teléfono, correo electrónico y domicilio.',
            'Datos de su padre, madre o tutor, en el caso de menores de edad.',
          ],
        },
        { h: 'Datos de salud (datos sensibles)' },
        {
          ul: [
            'Historial médico y dental, padecimientos, alergias, medicamentos, diagnósticos y planes de tratamiento.',
            'Radiografías, escaneos y fotografías clínicas.',
            'Lo que usted escriba sobre su salud en el formulario o en mensajes.',
          ],
        },
        { h: 'Seguro y pagos' },
        {
          ul: [
            'Nombre de su aseguradora, número de póliza o de miembro y, en el caso de seguros de EE. UU., su número de seguro social (SSN), que es un dato sensible y solo se usa para verificar su cobertura.',
            'Presupuestos, pagos, facturas y saldos.',
          ],
        },
        { h: 'Datos de navegación' },
        {
          ul: ['Datos técnicos que generan servicios de terceros en nuestro sitio (ver "Cookies y contenido de terceros").'],
        },
        'Los datos de salud y el número de seguro social son datos personales sensibles. Solo los tratamos con su consentimiento expreso y con medidas de protección reforzadas.',
      ],
    },
    {
      id: 'finalidades',
      icon: 'check',
      title: 'Para qué usamos sus datos',
      blocks: [
        { h: 'Finalidades necesarias (sin ellas no podemos atenderle)' },
        {
          ul: [
            'Responder sus solicitudes y agendar, confirmar o cambiar sus citas.',
            'Brindarle atención dental, integrar y conservar su expediente clínico.',
            'Verificar la cobertura de su seguro, tramitar cobros con su aseguradora y emitir presupuestos, recibos y facturas.',
            'Comunicarnos con usted sobre su tratamiento, seguimiento y pagos.',
            'Cumplir obligaciones legales y atender requerimientos de autoridades.',
          ],
        },
        { h: 'Finalidades adicionales (opcionales)' },
        {
          ul: [
            'Enviarle promociones, novedades y encuestas de satisfacción.',
            'Usar fotografías, testimonios o casos clínicos en publicidad o redes sociales, solo con su autorización por escrito por separado.',
          ],
        },
        'Si no desea que usemos sus datos para las finalidades adicionales, escríbanos a info@nakejidental.com. Su negativa no afecta su atención.',
      ],
    },
    {
      id: 'consentimiento',
      icon: 'lock',
      title: 'Su consentimiento',
      blocks: [
        'Al enviar el formulario de nuestro sitio, marcar la casilla de aceptación o firmar nuestros formatos en la Clínica, usted otorga su consentimiento expreso para el tratamiento de sus datos, incluidos los de salud y los de su seguro, para las finalidades necesarias.',
        'Si nos da datos de otra persona (por ejemplo, de un menor o de un familiar), declara que cuenta con su autorización o que es su representante legal.',
      ],
    },
    {
      id: 'compartir',
      icon: 'share',
      title: 'Con quién compartimos sus datos',
      blocks: [
        { h: 'Proveedores que nos ayudan (por cuenta de la Clínica)' },
        {
          ul: [
            'Google (formulario, calendario y correo electrónico).',
            'Meta (WhatsApp).',
            'Vercel (alojamiento del sitio web) y Cloudflare (verificación contra robots en el formulario).',
            'Un proveedor de verificación de beneficios dentales, que revisa la cobertura de su seguro.',
          ],
        },
        'Estos proveedores solo pueden usar sus datos para darnos el servicio y deben protegerlos. Algunos guardan información en servidores fuera de México, principalmente en EE. UU.',
        { h: 'Terceros a los que podemos transferir sus datos' },
        {
          ul: [
            'Su aseguradora, para verificar la cobertura y cobrar el tratamiento que usted solicita.',
            'Especialistas, laboratorios dentales u otros profesionales de la salud que participen en su tratamiento.',
            'Autoridades, cuando una ley o una orden lo exija.',
          ],
        },
        'Estas transferencias no requieren su consentimiento porque son necesarias para su atención, para el contrato que celebra con nosotros o porque la ley las exige.',
        'No vendemos sus datos personales.',
      ],
    },
    {
      id: 'derechos',
      icon: 'scale',
      title: 'Sus derechos (ARCO)',
      blocks: [
        'Usted puede Acceder a sus datos, pedir su Rectificación si son inexactos, su Cancelación cuando ya no sean necesarios, u Oponerse a su uso para ciertos fines (derechos ARCO).',
        { h: 'Cómo ejercerlos' },
        {
          ul: [
            'Escriba a info@nakejidental.com con el asunto "Derechos ARCO".',
            'Incluya su nombre, una copia de su identificación (o la de su representante y el documento que lo acredite), qué derecho quiere ejercer, qué datos y cómo quiere recibir la respuesta.',
            'Le responderemos en un plazo máximo de 20 días hábiles. El trámite es gratuito; solo pueden cobrarse los costos de envío o de copias.',
          ],
        },
        'Algunos datos del expediente clínico deben conservarse por ley aunque usted pida su cancelación.',
      ],
    },
    {
      id: 'revocar',
      icon: 'close',
      title: 'Revocar su consentimiento o limitar el uso',
      blocks: [
        'Puede revocar su consentimiento o pedir que dejemos de enviarle promociones escribiendo a info@nakejidental.com, o respondiendo "BAJA" a nuestros mensajes de WhatsApp.',
        'También puede inscribir su teléfono en el Registro Público para Evitar Publicidad (REPEP) de la Profeco.',
        'La revocación no tiene efectos sobre lo ya realizado y puede impedir que sigamos atendiéndole si afecta las finalidades necesarias.',
      ],
    },
    {
      id: 'conservacion',
      icon: 'clock',
      title: 'Cuánto tiempo guardamos sus datos',
      blocks: [
        'Guardamos sus datos mientras sea su paciente y durante los plazos que exige la ley. El expediente clínico se conserva por lo menos 5 años desde la última atención.',
        'Su número de seguro social solo se guarda el tiempo necesario para verificar su cobertura. Después de verificarla, lo eliminamos de chats y notas.',
        'Cuando ya no los necesitemos, los eliminaremos de forma segura.',
      ],
    },
    {
      id: 'seguridad',
      icon: 'shield',
      title: 'Cómo protegemos sus datos',
      blocks: [
        'Usamos medidas administrativas, técnicas y físicas para proteger sus datos contra pérdida, robo o uso no autorizado, y solo el personal autorizado tiene acceso.',
        'WhatsApp y el correo electrónico no son canales cerrados. Le pedimos no enviar por esos medios su número de seguro social ni información médica detallada. Su número de seguro social se lo pediremos solo por teléfono.',
        'Si lo envía por error, avísenos y lo eliminaremos.',
        'Si ocurre una vulneración de seguridad que afecte de forma importante sus derechos, se lo informaremos.',
      ],
    },
    {
      id: 'cookies',
      icon: 'document',
      title: 'Cookies y contenido de terceros',
      blocks: [
        'Nuestro sitio no usa cookies propias de publicidad ni de rastreo.',
        'Algunas páginas muestran contenido de terceros, como Facebook e Instagram (Meta), que puede usar cookies y recabar datos de su navegación conforme a sus propias políticas. Nuestro formulario usa Cloudflare Turnstile para distinguir personas de robots, lo que analiza datos técnicos de su navegador.',
        'Puede bloquear o borrar las cookies desde la configuración de su navegador.',
      ],
    },
    {
      id: 'eeuu',
      icon: 'users',
      title: 'Pacientes con seguro de EE. UU.',
      blocks: [
        'Si usted tiene un seguro dental de EE. UU., compartimos con su aseguradora y con nuestro proveedor de verificación los datos necesarios para revisar su cobertura y cobrar su tratamiento.',
        'Cuando la ley de privacidad de salud de EE. UU. (HIPAA) aplique a esos trámites, usted también puede pedir una copia de su información, solicitar correcciones, pedir comunicaciones confidenciales, solicitar ciertas restricciones y pedir una lista de algunas divulgaciones.',
        'Para cualquier solicitud, escriba a info@nakejidental.com. Si considera que se violaron sus derechos conforme a HIPAA, también puede presentar una queja ante el Departamento de Salud y Servicios Humanos de EE. UU.:',
        { link: HHS_URL, href: HHS_URL },
        'No tomaremos represalias por presentar una queja.',
      ],
    },
    {
      id: 'menores',
      icon: 'users',
      title: 'Menores de edad',
      blocks: [
        'Los datos de menores de edad se tratan con el consentimiento de su padre, madre o tutor, quien puede ejercer los derechos ARCO en su nombre.',
      ],
    },
    {
      id: 'cambios',
      icon: 'refresh',
      title: 'Cambios a este aviso',
      blocks: [
        'Podemos modificar este aviso por cambios en la ley o en nuestros servicios. La versión vigente estará siempre en esta página y en la Clínica, con su fecha de actualización.',
      ],
    },
    {
      id: 'contacto',
      icon: 'mail',
      title: 'Dudas y quejas',
      blocks: [
        'Para cualquier duda sobre sus datos, escriba a info@nakejidental.com o llame al 619-879-2202.',
        'Si considera que su derecho a la protección de datos fue vulnerado, puede acudir ante la autoridad competente en México, que actualmente es la Secretaría Anticorrupción y Buen Gobierno.',
      ],
    },
  ],
}

export const TERMS_PAGE_ES: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Términos y condiciones',
  lead: 'Estos términos regulan el uso de nuestro sitio web y la relación con nuestros pacientes. Al usar el sitio o enviarnos una solicitud, usted los acepta.',
  updated: 'Última actualización: 30/10/2026',
  tocLabel: 'En estos términos',
  sections: [
    {
      id: 'aceptacion',
      icon: 'check',
      title: 'Quiénes somos',
      blocks: [
        'Este sitio pertenece a Nakeji Dental Group, que opera como Dental Nakeji ("la Clínica"), con domicilio en Av. Río Tijuana 2440, Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C., México.',
        'Si no está de acuerdo con estos términos, le pedimos no usar el sitio.',
      ],
    },
    {
      id: 'informacion',
      icon: 'document',
      title: 'Información del sitio',
      blocks: [
        'El contenido de este sitio es informativo. No es un diagnóstico, no sustituye una consulta y no debe usarse para decidir un tratamiento sin valoración de un dentista.',
        'En una urgencia, llámenos o acuda al servicio de urgencias más cercano.',
      ],
    },
    {
      id: 'solicitudes',
      icon: 'clock',
      title: 'Solicitudes de cita',
      blocks: [
        'Enviar el formulario o un mensaje es una solicitud, no una cita confirmada. La cita queda confirmada solo cuando la Clínica se lo confirma por teléfono, WhatsApp o correo.',
        'La Clínica puede proponer otro día u horario según su disponibilidad.',
      ],
    },
    {
      id: 'cancelaciones',
      icon: 'close',
      title: 'Cambios y cancelaciones',
      blocks: [
        'Si no puede asistir, avísenos con al menos 24 horas de anticipación.',
        'Si se pagó un anticipo, su devolución o aplicación a una nueva cita se rige por lo acordado en su presupuesto firmado.',
      ],
    },
    {
      id: 'pagos',
      icon: 'scale',
      title: 'Precios y pagos',
      blocks: [
        'Los precios y promociones del sitio son de referencia y pueden cambiar sin aviso. Las promociones tienen la vigencia y condiciones que se indiquen en cada una.',
        'El costo de su tratamiento se fija en un presupuesto por escrito después de su valoración. Los anticipos, formas de pago, moneda, tipo de cambio y reembolsos se acuerdan en ese presupuesto, que usted firma antes de iniciar.',
      ],
    },
    {
      id: 'seguros',
      icon: 'shield',
      title: 'Seguros dentales',
      blocks: [
        'El resumen de cobertura que le enviamos es una estimación basada en la información de su aseguradora. La decisión final de pago es de su aseguradora.',
        'Usted es responsable de pagar lo que su seguro no cubra.',
      ],
    },
    {
      id: 'resultados',
      icon: 'help',
      title: 'Resultados y garantías',
      blocks: [
        'Cada caso es distinto y los resultados varían. La Clínica no garantiza resultados específicos.',
        'Si un tratamiento tiene garantía, sus condiciones se le entregan por escrito. Para mantenerla, es necesario seguir las indicaciones y acudir a las revisiones.',
      ],
    },
    {
      id: 'viajeros',
      icon: 'pin',
      title: 'Pacientes que viajan desde otro país',
      blocks: [
        'La atención se presta en México, conforme a las leyes mexicanas.',
        'Si presenta molestias o complicaciones después de regresar a su país, contáctenos de inmediato para orientarle. La Clínica no es responsable de la atención que le brinden otros profesionales.',
      ],
    },
    {
      id: 'mensajes',
      icon: 'message',
      title: 'Mensajes por WhatsApp, teléfono y correo',
      blocks: [
        'Nuestro personal atiende personalmente los mensajes y llamadas para dar seguimiento a solicitudes, citas, tratamientos y pagos, en horario de atención.',
        'Estos medios no son para urgencias.',
        'Le enviaremos promociones solo si nos autoriza. Puede dejar de recibirlas respondiendo "BAJA" o escribiendo a info@nakejidental.com.',
        'No envíe por WhatsApp ni por correo su número de seguro social ni información médica detallada. Si lo hace por error, avísenos y lo eliminaremos.',
      ],
    },
    {
      id: 'resenas',
      icon: 'users',
      title: 'Reseñas y opiniones',
      blocks: [
        'Las reseñas que mostramos provienen de Google y se publican tal como las escribieron sus autores. Son opiniones personales y no garantizan resultados.',
      ],
    },
    {
      id: 'responsabilidad',
      icon: 'lock',
      title: 'Uso del sitio y enlaces',
      blocks: [
        'Procuramos que el sitio esté disponible y actualizado, pero puede haber interrupciones o errores.',
        'Los enlaces a sitios de terceros (por ejemplo, redes sociales o Google) se rigen por sus propias condiciones y políticas.',
      ],
    },
    {
      id: 'propiedad',
      icon: 'document',
      title: 'Propiedad del contenido',
      blocks: [
        'Los textos, imágenes, logotipos y diseño del sitio pertenecen a la Clínica o se usan con autorización. No pueden copiarse ni usarse sin permiso por escrito.',
      ],
    },
    {
      id: 'ley',
      icon: 'scale',
      title: 'Ley aplicable',
      blocks: [
        'Estos términos se rigen por las leyes de México. Cualquier controversia se resolverá ante los tribunales competentes de Tijuana, Baja California, sin perjuicio de sus derechos como consumidor ante la Profeco.',
        'Este documento se publica en español y en inglés. En caso de diferencias, prevalece la versión en español.',
      ],
    },
    {
      id: 'cambios',
      icon: 'refresh',
      title: 'Cambios a estos términos',
      blocks: ['Podemos actualizar estos términos. La versión vigente estará siempre en esta página con su fecha de actualización.'],
    },
    {
      id: 'contacto',
      icon: 'phone',
      title: 'Contacto',
      blocks: [
        'Para dudas sobre estos términos, escriba a info@nakejidental.com o llame al 619-879-2202.',
        { link: `Dental Nakeji — ${SITE_URL}`, href: SITE_URL },
      ],
    },
  ],
}

// ─── English ───

export const PRIVACY_PAGE: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Privacy Notice',
  lead: 'This notice explains what personal data we collect, why we use it, who we share it with, and how you can exercise your rights.',
  updated: 'Last updated: 10/30/2026',
  tocLabel: 'In this notice',
  sections: [
    {
      id: 'responsable',
      icon: 'shield',
      title: 'Who is responsible for your data',
      blocks: [
        'Nakeji Dental Group, doing business as Dental Nakeji (“the Clinic”), is responsible for the handling of your personal data under Mexico’s Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP) and other applicable Mexican regulations.',
        { h: 'Contact information' },
        {
          ul: [
            'Address: Jose María Velasco, Av. Río Tijuana 2440, Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C., Mexico.',
            'Privacy Department: info@nakejidental.com',
            'Phone: 619-879-2202',
          ],
        },
        { link: `Website: ${SITE_URL}`, href: SITE_URL },
      ],
    },
    {
      id: 'datos',
      icon: 'document',
      title: 'What data we collect',
      blocks: [
        'We collect the data you give us in person, by phone, on WhatsApp, by email, or through the form on our website:',
        { h: 'Identification and contact' },
        {
          ul: [
            'Name, date of birth, phone number, email address, and home address.',
            'Details of a parent or guardian, for patients who are minors.',
          ],
        },
        { h: 'Health data (sensitive data)' },
        {
          ul: [
            'Medical and dental history, conditions, allergies, medications, diagnoses, and treatment plans.',
            'X-rays, scans, and clinical photographs.',
            'Anything you write about your health on the form or in messages.',
          ],
        },
        { h: 'Insurance and payments' },
        {
          ul: [
            'Your insurer’s name, policy or member number and, for U.S. insurance, your Social Security number (SSN), which is sensitive data and is used only to verify your coverage.',
            'Treatment estimates, payments, invoices, and balances.',
          ],
        },
        { h: 'Browsing data' },
        {
          ul: ['Technical data generated by third-party services on our website (see “Cookies and third-party content”).'],
        },
        'Health data and your Social Security number are sensitive personal data. We handle them only with your express consent and with stronger safeguards.',
      ],
    },
    {
      id: 'finalidades',
      icon: 'check',
      title: 'Why we use your data',
      blocks: [
        { h: 'Necessary purposes (we cannot care for you without them)' },
        {
          ul: [
            'Respond to your requests and schedule, confirm, or change your appointments.',
            'Provide dental care, and create and keep your clinical record.',
            'Verify your insurance coverage, process claims with your insurer, and issue estimates, receipts, and invoices.',
            'Contact you about your treatment, follow-up care, and payments.',
            'Meet legal obligations and respond to requests from authorities.',
          ],
        },
        { h: 'Additional purposes (optional)' },
        {
          ul: [
            'Send you promotions, news, and satisfaction surveys.',
            'Use photographs, testimonials, or clinical cases in advertising or on social media, only with your separate written authorization.',
          ],
        },
        'If you do not want us to use your data for the additional purposes, write to us at info@nakejidental.com. Saying no does not affect your care.',
      ],
    },
    {
      id: 'consentimiento',
      icon: 'lock',
      title: 'Your consent',
      blocks: [
        'By submitting the form on our website, checking the consent box, or signing our forms at the Clinic, you give your express consent to the handling of your data, including your health and insurance data, for the necessary purposes.',
        'If you give us someone else’s data (for example, a child’s or a relative’s), you confirm that you have their permission or are their legal representative.',
      ],
    },
    {
      id: 'compartir',
      icon: 'share',
      title: 'Who we share your data with',
      blocks: [
        { h: 'Service providers that help us (on the Clinic’s behalf)' },
        {
          ul: [
            'Google (form, calendar, and email).',
            'Meta (WhatsApp).',
            'Vercel (website hosting) and Cloudflare (anti-bot check on the form).',
            'A dental benefits verification provider, which checks your insurance coverage.',
          ],
        },
        'These providers may use your data only to provide their service to us, and they must protect it. Some store information on servers outside Mexico, mainly in the U.S.',
        { h: 'Third parties we may transfer your data to' },
        {
          ul: [
            'Your insurer, to verify coverage and bill for the treatment you request.',
            'Specialists, dental laboratories, or other health professionals involved in your treatment.',
            'Authorities, when a law or an order requires it.',
          ],
        },
        'These transfers do not need your consent because they are necessary for your care, for the agreement you make with us, or because the law requires them.',
        'We do not sell your personal data.',
      ],
    },
    {
      id: 'derechos',
      icon: 'scale',
      title: 'Your rights (ARCO)',
      blocks: [
        'You may Access your data, request Rectification if it is inaccurate, request Cancellation when it is no longer needed, or Object to its use for certain purposes (ARCO rights).',
        { h: 'How to exercise them' },
        {
          ul: [
            'Email info@nakejidental.com with the subject “ARCO Rights.”',
            'Include your name, a copy of your ID (or your representative’s ID and proof of authority), which right you want to exercise, which data it concerns, and how you would like to receive our answer.',
            'We will reply within 20 business days at most. There is no charge; only shipping or copying costs may be billed.',
          ],
        },
        'Some clinical record data must be kept by law even if you request its cancellation.',
      ],
    },
    {
      id: 'revocar',
      icon: 'close',
      title: 'Withdrawing consent or limiting use',
      blocks: [
        'You may withdraw your consent, or ask us to stop sending you promotions, by writing to info@nakejidental.com or by replying “BAJA” (opt out) to our WhatsApp messages.',
        'You may also register your phone number with Profeco’s Public Registry to Avoid Advertising (REPEP).',
        'Withdrawing consent does not affect what has already been done, and it may prevent us from continuing your care if it affects the necessary purposes.',
      ],
    },
    {
      id: 'conservacion',
      icon: 'clock',
      title: 'How long we keep your data',
      blocks: [
        'We keep your data while you are our patient and for the periods the law requires. Your clinical record is kept for at least 5 years after your last visit.',
        'We keep your Social Security number only as long as needed to verify your coverage. Once it is verified, we delete it from chats and notes.',
        'When we no longer need your data, we delete it securely.',
      ],
    },
    {
      id: 'seguridad',
      icon: 'shield',
      title: 'How we protect your data',
      blocks: [
        'We use administrative, technical, and physical safeguards to protect your data from loss, theft, or unauthorized use, and only authorized staff can access it.',
        'WhatsApp and email are not closed channels. Please do not send your Social Security number or detailed medical information through them. We will ask for your Social Security number by phone only.',
        'If you send it by mistake, let us know and we will delete it.',
        'If a security breach significantly affects your rights, we will tell you.',
      ],
    },
    {
      id: 'cookies',
      icon: 'document',
      title: 'Cookies and third-party content',
      blocks: [
        'Our website does not use our own advertising or tracking cookies.',
        'Some pages show third-party content, such as Facebook and Instagram (Meta), which may use cookies and collect browsing data under their own policies. Our form uses Cloudflare Turnstile to tell people from bots, which analyzes technical data from your browser.',
        'You can block or delete cookies in your browser settings.',
      ],
    },
    {
      id: 'eeuu',
      icon: 'users',
      title: 'Patients with U.S. insurance',
      blocks: [
        'If you have U.S. dental insurance, we share with your insurer and our verification provider the data needed to check your coverage and bill your treatment.',
        'When the U.S. health privacy law (HIPAA) applies to those transactions, you may also request a copy of your information, ask for corrections, ask for confidential communications, request certain restrictions, and request a list of certain disclosures.',
        'To make any request, email info@nakejidental.com. If you believe your rights under HIPAA were violated, you may also file a complaint with the U.S. Department of Health and Human Services:',
        { link: HHS_URL, href: HHS_URL },
        'We will not retaliate against you for filing a complaint.',
      ],
    },
    {
      id: 'menores',
      icon: 'users',
      title: 'Minors',
      blocks: [
        'Minors’ data is handled with the consent of a parent or guardian, who may exercise ARCO rights on the minor’s behalf.',
      ],
    },
    {
      id: 'cambios',
      icon: 'refresh',
      title: 'Changes to this notice',
      blocks: [
        'We may update this notice when the law or our services change. The current version is always on this page and at the Clinic, with its update date.',
      ],
    },
    {
      id: 'contacto',
      icon: 'mail',
      title: 'Questions and complaints',
      blocks: [
        'For any question about your data, email info@nakejidental.com or call 619-879-2202.',
        'If you believe your right to data protection has been violated, you may go to the competent authority in Mexico, which is currently the Secretaría Anticorrupción y Buen Gobierno (the Anti-Corruption and Good Governance Ministry).',
      ],
    },
  ],
}

export const TERMS_PAGE: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Terms and Conditions',
  lead: 'These terms govern the use of our website and our relationship with patients. By using the site or sending us a request, you accept them.',
  updated: 'Last updated: 10/30/2026',
  tocLabel: 'In these terms',
  sections: [
    {
      id: 'aceptacion',
      icon: 'check',
      title: 'Who we are',
      blocks: [
        'This website belongs to Nakeji Dental Group, doing business as Dental Nakeji (“the Clinic”), located at Av. Río Tijuana 2440, Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C., Mexico.',
        'If you do not agree with these terms, please do not use the site.',
      ],
    },
    {
      id: 'informacion',
      icon: 'document',
      title: 'Information on the site',
      blocks: [
        'The content of this site is for information only. It is not a diagnosis, does not replace a consultation, and should not be used to decide on a treatment without an evaluation by a dentist.',
        'In an emergency, call us or go to the nearest emergency room.',
      ],
    },
    {
      id: 'solicitudes',
      icon: 'clock',
      title: 'Appointment requests',
      blocks: [
        'Submitting the form or sending a message is a request, not a confirmed appointment. Your appointment is confirmed only when the Clinic confirms it to you by phone, WhatsApp, or email.',
        'The Clinic may suggest another day or time depending on availability.',
      ],
    },
    {
      id: 'cancelaciones',
      icon: 'close',
      title: 'Changes and cancellations',
      blocks: [
        'If you cannot attend, please let us know at least 24 hours ahead.',
        'If a deposit was paid, whether it is refunded or applied to a new appointment follows what was agreed in your signed treatment estimate.',
      ],
    },
    {
      id: 'pagos',
      icon: 'scale',
      title: 'Prices and payments',
      blocks: [
        'Prices and promotions on the site are for reference and may change without notice. Promotions are valid for the period and under the conditions stated in each one.',
        'The cost of your treatment is set in a written estimate after your evaluation. Deposits, payment methods, currency, exchange rate, and refunds are agreed in that estimate, which you sign before treatment begins.',
      ],
    },
    {
      id: 'seguros',
      icon: 'shield',
      title: 'Dental insurance',
      blocks: [
        'The coverage summary we send you is an estimate based on the information from your insurer. Your insurer makes the final decision on payment.',
        'You are responsible for paying whatever your insurance does not cover.',
      ],
    },
    {
      id: 'resultados',
      icon: 'help',
      title: 'Results and warranties',
      blocks: [
        'Every case is different and results vary. The Clinic does not guarantee specific results.',
        'If a treatment comes with a warranty, its conditions are given to you in writing. To keep it valid, you need to follow the instructions and attend your checkups.',
      ],
    },
    {
      id: 'viajeros',
      icon: 'pin',
      title: 'Patients traveling from another country',
      blocks: [
        'Care is provided in Mexico, under Mexican law.',
        'If you have discomfort or complications after returning home, contact us right away so we can guide you. The Clinic is not responsible for care provided by other professionals.',
      ],
    },
    {
      id: 'mensajes',
      icon: 'message',
      title: 'Messages by WhatsApp, phone, and email',
      blocks: [
        'Our staff answers messages and calls personally to follow up on requests, appointments, treatments, and payments, during business hours.',
        'These channels are not for emergencies.',
        'We will send you promotions only if you authorize it. You can stop receiving them by replying “BAJA” (opt out) or writing to info@nakejidental.com.',
        'Do not send your Social Security number or detailed medical information by WhatsApp or email. If you do so by mistake, let us know and we will delete it.',
      ],
    },
    {
      id: 'resenas',
      icon: 'users',
      title: 'Reviews and opinions',
      blocks: [
        'The reviews we show come from Google and are published exactly as their authors wrote them. They are personal opinions and do not guarantee results.',
      ],
    },
    {
      id: 'responsabilidad',
      icon: 'lock',
      title: 'Use of the site and links',
      blocks: [
        'We aim to keep the site available and up to date, but there may be interruptions or errors.',
        'Links to third-party sites (for example, social networks or Google) are governed by their own terms and policies.',
      ],
    },
    {
      id: 'propiedad',
      icon: 'document',
      title: 'Content ownership',
      blocks: [
        'The text, images, logos, and design of the site belong to the Clinic or are used with permission. They may not be copied or used without written permission.',
      ],
    },
    {
      id: 'ley',
      icon: 'scale',
      title: 'Governing law',
      blocks: [
        'These terms are governed by the laws of Mexico. Any dispute will be resolved before the competent courts of Tijuana, Baja California, without prejudice to your rights as a consumer before Profeco.',
        'This document is published in Spanish and English. If they differ, the Spanish version prevails.',
      ],
    },
    {
      id: 'cambios',
      icon: 'refresh',
      title: 'Changes to these terms',
      blocks: ['We may update these terms. The current version is always on this page with its update date.'],
    },
    {
      id: 'contacto',
      icon: 'phone',
      title: 'Contact',
      blocks: [
        'For questions about these terms, email info@nakejidental.com or call 619-879-2202.',
        { link: `Dental Nakeji — ${SITE_URL}`, href: SITE_URL },
      ],
    },
  ],
}
