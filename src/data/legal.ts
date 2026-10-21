// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /aviso-de-privacidad/ y /terminos-y-condiciones/ (pages/legal/LegalDocument.tsx).
//
// Son los documentos OFICIALES de la clínica, copiados tal cual (en inglés) de sus páginas de Google Sites.
// La versión en español (PRIVACY_PAGE_ES / TERMS_PAGE_ES, al final) es una traducción provisional que la clínica debe revisar.
// /en/ muestra la versión en inglés y /es/ la de español.
// Fuentes:
//  • /aviso-de-privacidad/ = "Notice of Privacy Practices" (HIPAA): https://sites.google.com/view/nakejinoticeofprivacypractice
//  • /terminos-y-condiciones/ = "SMS Terms & Conditions": https://sites.google.com/view/nakejidentalsmsterms
// Si la clínica cambia el original, se actualiza aquí. Cada sección conserva un `id` corto y único (ancla del índice).
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

export const PRIVACY_PAGE: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Notice of Privacy Practices',
  lead: 'This notice describes how your medical information may be used and disclosed and how you can access this information. Please review it carefully.',
  updated: 'Effective Date: 10/16/26',
  tocLabel: 'In this notice',
  sections: [
    {
      id: 'commitment',
      icon: 'shield',
      title: 'Our Commitment to Your Privacy',
      blocks: [
        'Nakeji Dental Group, doing business as Nakeji Dental, is committed to protecting the privacy of your health information.',
        'This Notice of Privacy Practices (“Notice”) explains how we may use and disclose your protected health information (“PHI”), our legal responsibilities, and your rights regarding your information.',
        'If we are subject to the Health Insurance Portability and Accountability Act of 1996 (“HIPAA”), we are required to maintain the privacy of your PHI, provide you with this Notice, and follow the privacy practices described in the Notice while it is in effect.',
        { h: 'Contact Information' },
        {
          ul: [
            'Privacy Officer: Nakeji Dental',
            'Mailing Address: Jose María Velasco, Av. Río Tijuana 2440-Int. PH3, Zona Urbana Rio Tijuana, 22010 Tijuana, B.C. Mexico.',
            'Telephone: 619-879-2202',
            'Privacy Email: appointments@nakejidental.com',
          ],
        },
        { link: 'Website: https://nakejidental.com/', href: 'https://nakejidental.com/' },
      ],
    },
    {
      id: 'information',
      icon: 'document',
      title: 'Information We Collect and Protect',
      blocks: [
        'In providing dental care and managing our practice, we may collect, create, receive, maintain, and use information about you, including:',
        { h: 'Identification and contact information' },
        {
          ul: [
            'Name, date of birth, address, telephone number, and email address.',
            'Emergency contact information and information about parents, guardians, or authorized representatives, when applicable.',
            'Insurance and billing information, when applicable.',
          ],
        },
        { h: 'Medical and dental information' },
        {
          ul: [
            'Medical and dental history, diagnoses, treatment plans, clinical notes, and progress records.',
            'Allergies, medications, health conditions, and other information relevant to your dental care.',
            'Dental X-rays, scans, intraoral and extraoral photographs, and other diagnostic images.',
            'Referrals, communications with other healthcare professionals, and information received from other providers.',
          ],
        },
        { h: 'Financial and payment information' },
        {
          ul: [
            'Payment records, invoices, balances, receipts, and information needed to process transactions.',
            'Insurance claims and related payment information, when applicable.',
            'Payment card information may be processed by third-party payment providers. We will describe and handle any payment information we maintain in accordance with applicable law and our actual payment practices.',
          ],
        },
        'When this information identifies you and is protected by applicable law, it will be handled in accordance with the privacy and security requirements that apply to our Practice.',
      ],
    },
    {
      id: 'uses',
      icon: 'share',
      title: 'How We May Use and Disclose Your Health Information',
      blocks: [
        'When HIPAA applies, we may use or disclose your PHI for the following purposes, as permitted by law.',
        { h: 'A. Treatment' },
        'We may use your information to provide, coordinate, and manage dental care.',
        'For example, we may review your medical history, evaluate dental X-rays, develop a treatment plan, or share relevant information with a specialist or dental laboratory involved in your care.',
        { h: 'B. Payment' },
        'We may use or disclose information to bill for services and collect payment.',
        'For example, we may submit claims to your dental insurer, verify coverage, determine benefits, or provide information needed to process payment.',
        { h: 'C. Healthcare Operations' },
        'We may use information to operate and improve our practice, manage appointments, review the quality of care, train authorized personnel, and perform administrative activities permitted by law.',
        { h: 'D. Appointment Reminders and Care Communications' },
        'We may contact you by telephone, email, text message, patient portal, or other agreed-upon communication method regarding appointments, treatment, follow-up care, billing, and related services, subject to applicable law.',
        'You may request reasonable confidential communication arrangements using the contact information above.',
        { h: 'E. Individuals Involved in Your Care' },
        'When permitted by law, we may share relevant information with a family member, caregiver, or other person involved in your care or payment for care.',
        'We will follow applicable legal requirements and respect your expressed preferences when required.',
        { h: 'F. Legal and Public Interest Purposes' },
        'We may use or disclose PHI when authorized or required by law, including certain public health activities, health oversight, judicial or administrative proceedings, law enforcement requests, reporting abuse or neglect, and responding to certain emergencies.',
        'These disclosures will be limited to what applicable law permits or requires.',
        { h: 'G. Other Permitted Disclosures' },
        'Additional disclosures may be permitted for purposes such as workers’ compensation, research, or other legally recognized activities, subject to applicable safeguards and requirements.',
        'Where HIPAA or other applicable law requires your written authorization, we will obtain it before making the relevant use or disclosure.',
      ],
    },
    {
      id: 'authorization',
      icon: 'lock',
      title: 'Uses That Require Your Authorization',
      blocks: [
        'We will obtain your written authorization when required by applicable law.',
        'For example, we generally will not use or disclose your PHI for marketing purposes requiring authorization, or sell your PHI, without the authorization required by law.',
        'Clinical photographs and dental images: Photographs and X-rays collected for examination, diagnosis, treatment, and clinical documentation may be used for those purposes as permitted by law. Using identifiable patient photographs, testimonials, or clinical images in advertising, promotional materials, social media, or public educational content will require separate authorization when required by law.',
        'Your decision about promotional use will not be treated as permission to use your information for unrelated purposes.',
        'You may revoke an authorization in writing, subject to limitations for actions already taken in reliance on it.',
      ],
    },
    {
      id: 'rights',
      icon: 'scale',
      title: 'Your Rights Regarding Your Health Information',
      blocks: [
        'If HIPAA applies, you have the following rights, subject to applicable legal exceptions.',
        { h: 'Right to inspect and obtain a copy' },
        'You may request access to your health and dental records and obtain copies in paper or electronic form, as permitted by law.',
        'Submit your request in writing to the Privacy Officer listed above. We will respond within the time required by law. Permitted fees may apply.',
        { h: 'Right to request an amendment' },
        'You may ask us to correct or amend information you believe is inaccurate or incomplete.',
        'We may deny a request in certain circumstances permitted by law. If we deny your request, we will provide an explanation and information about your options.',
        { h: 'Right to request confidential communications' },
        'You may ask us to contact you through a specific telephone number, email address, mailing address, or other reasonable method.',
        'We will accommodate reasonable requests as required by applicable law.',
        { h: 'Right to request restrictions' },
        'You may ask us to limit certain uses or disclosures of your information.',
        'We are not required to agree to every request. However, when you pay for a service or healthcare item entirely out of pocket and request that we not disclose information about that service to your health plan for payment or healthcare operations, we will honor the request when required by HIPAA, unless another law requires disclosure.',
        { h: 'Right to an accounting of disclosures' },
        'You may request a list of certain disclosures of your PHI made during the applicable period, subject to the exceptions established by law.',
        { h: 'Right to a paper copy' },
        'You may request a paper copy of this Notice at any time, even if you previously agreed to receive it electronically.',
        { h: 'Right to designate a personal representative' },
        "A person legally authorized to act on your behalf may exercise applicable rights for you. We may verify the person's authority before responding.",
        { h: 'Right to file a complaint' },
        'You may file a complaint with our Practice or with the U.S. Department of Health and Human Services, Office for Civil Rights, if you believe your privacy rights have been violated.',
        'We will not retaliate against you for filing a complaint.',
      ],
    },
    {
      id: 'responsibilities',
      icon: 'check',
      title: 'Our Privacy and Security Responsibilities',
      blocks: [
        'When HIPAA applies, we are required to:',
        {
          ul: [
            'Protect the privacy and security of your PHI.',
            'Provide you with this Notice describing our legal duties and privacy practices.',
            'Follow the terms of the Notice currently in effect.',
            'Notify you when a breach of unsecured PHI requires notification under applicable law.',
            'Use reasonable and appropriate safeguards to protect information against unauthorized access, use, or disclosure.',
            'Limit access to authorized personnel and service providers in accordance with applicable requirements.',
          ],
        },
        'We may use service providers to support scheduling, electronic records, secure storage, communications, billing, and payment processing.',
        'When required by HIPAA, we will obtain appropriate written assurances or business associate agreements from vendors that create, receive, maintain, or transmit PHI on our behalf.',
      ],
    },
    {
      id: 'minors',
      icon: 'users',
      title: 'Minors and Authorized Representatives',
      blocks: [
        'For patients who are minors or who have a legally authorized representative, we will handle requests, consent, access, and disclosures in accordance with applicable federal and state law.',
        'Certain state laws may give minors independent rights regarding specific types of healthcare. We will apply those requirements when relevant.',
      ],
    },
    {
      id: 'state',
      icon: 'pin',
      title: 'State-Specific Privacy Protections',
      blocks: [
        'Federal HIPAA requirements may be supplemented by state laws that provide greater privacy protections or additional patient rights.',
        'Where a more protective applicable law limits our use or disclosure of health information, we will follow the applicable legal requirements.',
        'Ley Federal de Protección de Datos Personales en Posesión de los Particulares,',
      ],
    },
    {
      id: 'changes',
      icon: 'refresh',
      title: 'Changes to This Notice',
      blocks: [
        'We reserve the right to change the terms of this Notice as permitted by law.',
        'Any revised Notice will apply to the health information we maintain, subject to applicable legal requirements. The current version will be available at our office and on our website.',
        'We will provide revised notices or notification of material changes as required by law.',
      ],
    },
    {
      id: 'contact',
      icon: 'mail',
      title: 'How to Contact Us or File a Complaint',
      blocks: [
        'For questions, requests, or complaints concerning your privacy, contact:',
        {
          ul: [
            'Privacy Officer: Joe Miranda',
            'Dental Practice: Nakeji Dental',
            'Mailing Address: Jose María Velasco, Av. Río Tijuana 2440-Int. PH3, Zona Urbana Rio Tijuana, 22010 Tijuana, B.C.',
            'Telephone: 619-879-2202',
            'Email: Appointments@nakejidental.com',
          ],
        },
        'You may also file a complaint with the U.S. Department of Health and Human Services, Office for Civil Rights:',
        {
          link: 'Website: https://www.hhs.gov/hipaa/filing-a-complaint/index.html',
          href: 'https://www.hhs.gov/hipaa/filing-a-complaint/index.html',
        },
        'Telephone: 1-800-368-1019',
        'We will not retaliate against you for filing a complaint.',
      ],
    },
  ],
}

export const TERMS_PAGE: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'SMS Terms & Conditions',
  lead: 'By opting in to receive SMS messages from Dental Nakeji, you agree to receive text messages related to appointments, updates, promotions, and customer service.',
  updated: 'Effective Date: 10/16/26',
  tocLabel: 'In these terms',
  sections: [
    { id: 'frequency', icon: 'clock', title: 'Message Frequency', blocks: ['Message frequency may vary.'] },
    {
      id: 'rates',
      icon: 'message',
      title: 'Message and Data Rates',
      blocks: ['Message and data rates may apply depending on your mobile carrier and plan.'],
    },
    { id: 'opt-out', icon: 'close', title: 'Opt-Out', blocks: ['You can opt out of receiving SMS messages at any time by replying STOP.'] },
    {
      id: 'help',
      icon: 'help',
      title: 'Help',
      blocks: ['For assistance, reply HELP or contact us at appointments@nakejidental.com.'],
    },
    {
      id: 'privacy',
      icon: 'lock',
      title: 'Privacy',
      blocks: [
        'Your information will be handled in accordance with our Privacy Policy. We do not sell or share your mobile number or SMS consent information with third parties for their marketing purposes.',
      ],
    },
    {
      id: 'consent',
      icon: 'check',
      title: 'Consent',
      blocks: ['Consent to receive SMS messages is not a condition of purchase.'],
    },
    {
      id: 'contact',
      icon: 'phone',
      title: 'Contact Information',
      blocks: [{ link: 'Dental Nakeji — https://nakejidental.com/', href: 'https://nakejidental.com/' }],
    },
  ],
}

// ─── Versión en español (traducción provisional, pendiente de revisión de la clínica) ───

export const PRIVACY_PAGE_ES: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Aviso de Prácticas de Privacidad',
  lead: 'Este aviso describe cómo se puede usar y divulgar su información médica y cómo puede acceder a ella. Por favor, léalo con atención.',
  updated: 'Fecha de vigencia: 16/10/2026',
  tocLabel: 'En este aviso',
  sections: [
    {
      id: 'commitment',
      icon: 'shield',
      title: 'Nuestro compromiso con su privacidad',
      blocks: [
        'Nakeji Dental Group, que opera como Nakeji Dental, se compromete a proteger la privacidad de su información de salud.',
        'Este Aviso de Prácticas de Privacidad ("Aviso") explica cómo podemos usar y divulgar su información protegida de salud ("PHI", por sus siglas en inglés), nuestras responsabilidades legales y sus derechos sobre su información.',
        'Si estamos sujetos a la Ley de Portabilidad y Responsabilidad de Seguros Médicos de 1996 de los Estados Unidos ("HIPAA"), estamos obligados a mantener la privacidad de su PHI, entregarle este Aviso y seguir las prácticas de privacidad descritas en él mientras esté vigente.',
        { h: 'Información de contacto' },
        {
          ul: [
            'Responsable de privacidad: Nakeji Dental',
            'Domicilio: Jose María Velasco, Av. Río Tijuana 2440-Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C., México.',
            'Teléfono: 619-879-2202',
            'Correo de privacidad: appointments@nakejidental.com',
          ],
        },
        { link: 'Sitio web: https://nakejidental.com/', href: 'https://nakejidental.com/' },
      ],
    },
    {
      id: 'information',
      icon: 'document',
      title: 'Información que recabamos y protegemos',
      blocks: [
        'Al brindarle atención dental y administrar nuestro consultorio, podemos recabar, crear, recibir, conservar y usar información sobre usted, incluida:',
        { h: 'Información de identificación y de contacto' },
        {
          ul: [
            'Nombre, fecha de nacimiento, domicilio, número telefónico y correo electrónico.',
            'Información de contacto de emergencia e información sobre padres, tutores o representantes autorizados, cuando aplique.',
            'Información de seguros y facturación, cuando aplique.',
          ],
        },
        { h: 'Información médica y dental' },
        {
          ul: [
            'Antecedentes médicos y dentales, diagnósticos, planes de tratamiento, notas clínicas y registros de evolución.',
            'Alergias, medicamentos, condiciones de salud y otra información relevante para su atención dental.',
            'Radiografías dentales, escáneres, fotografías intraorales y extraorales, y otras imágenes diagnósticas.',
            'Referencias, comunicaciones con otros profesionales de la salud e información recibida de otros prestadores.',
          ],
        },
        { h: 'Información financiera y de pagos' },
        {
          ul: [
            'Registros de pagos, facturas, saldos, recibos e información necesaria para procesar transacciones.',
            'Reclamaciones de seguro e información de pagos relacionada, cuando aplique.',
            'Los datos de tarjetas de pago pueden ser procesados por proveedores de pago externos. Manejaremos cualquier información de pago que conservemos conforme a la ley aplicable y a nuestras prácticas de pago reales.',
          ],
        },
        'Cuando esta información lo identifique y esté protegida por la ley aplicable, se manejará conforme a los requisitos de privacidad y seguridad que aplican a nuestro consultorio.',
      ],
    },
    {
      id: 'uses',
      icon: 'share',
      title: 'Cómo podemos usar y divulgar su información de salud',
      blocks: [
        'Cuando aplique HIPAA, podemos usar o divulgar su PHI para los siguientes fines, según lo permita la ley.',
        { h: 'A. Tratamiento' },
        'Podemos usar su información para brindarle, coordinar y administrar la atención dental.',
        'Por ejemplo, podemos revisar su historial médico, evaluar sus radiografías dentales, elaborar un plan de tratamiento o compartir información relevante con un especialista o con un laboratorio dental que participe en su atención.',
        { h: 'B. Pagos' },
        'Podemos usar o divulgar información para facturar los servicios y cobrar el pago.',
        'Por ejemplo, podemos presentar reclamaciones a su aseguradora dental, verificar la cobertura, determinar beneficios o proporcionar la información necesaria para procesar el pago.',
        { h: 'C. Operaciones de la clínica' },
        'Podemos usar información para operar y mejorar nuestro consultorio, administrar citas, revisar la calidad de la atención, capacitar al personal autorizado y realizar actividades administrativas permitidas por la ley.',
        { h: 'D. Recordatorios de citas y comunicaciones sobre su atención' },
        'Podemos comunicarnos con usted por teléfono, correo electrónico, mensaje de texto, portal de pacientes u otro medio acordado, sobre citas, tratamiento, seguimiento, facturación y servicios relacionados, según la ley aplicable.',
        'Puede solicitar acuerdos razonables de comunicación confidencial usando la información de contacto de arriba.',
        { h: 'E. Personas involucradas en su atención' },
        'Cuando la ley lo permita, podemos compartir información relevante con un familiar, cuidador u otra persona involucrada en su atención o en el pago de la misma.',
        'Seguiremos los requisitos legales aplicables y respetaremos sus preferencias expresas cuando sea obligatorio.',
        { h: 'F. Fines legales y de interés público' },
        'Podemos usar o divulgar PHI cuando lo autorice o lo requiera la ley, incluidas ciertas actividades de salud pública, vigilancia sanitaria, procedimientos judiciales o administrativos, solicitudes de autoridades, denuncias de maltrato o negligencia y respuesta a ciertas emergencias.',
        'Estas divulgaciones se limitarán a lo que la ley aplicable permita o requiera.',
        { h: 'G. Otras divulgaciones permitidas' },
        'Pueden permitirse otras divulgaciones para fines como compensación laboral, investigación u otras actividades reconocidas por la ley, sujetas a las salvaguardas y requisitos aplicables.',
        'Cuando HIPAA u otra ley aplicable requiera su autorización por escrito, la obtendremos antes de hacer el uso o la divulgación correspondiente.',
      ],
    },
    {
      id: 'authorization',
      icon: 'lock',
      title: 'Usos que requieren su autorización',
      blocks: [
        'Obtendremos su autorización por escrito cuando la ley aplicable lo requiera.',
        'Por ejemplo, en general no usaremos ni divulgaremos su PHI con fines de mercadotecnia que requieran autorización, ni venderemos su PHI, sin la autorización que exige la ley.',
        'Fotografías clínicas e imágenes dentales: las fotografías y radiografías tomadas para el examen, diagnóstico, tratamiento y documentación clínica pueden usarse con esos fines, según lo permita la ley. Usar fotografías identificables de pacientes, testimonios o imágenes clínicas en publicidad, materiales promocionales, redes sociales o contenido educativo público requerirá una autorización por separado cuando la ley lo exija.',
        'Su decisión sobre el uso promocional no se considerará permiso para usar su información con fines no relacionados.',
        'Puede revocar una autorización por escrito, con las limitaciones aplicables a las acciones ya realizadas con base en ella.',
      ],
    },
    {
      id: 'rights',
      icon: 'scale',
      title: 'Sus derechos sobre su información de salud',
      blocks: [
        'Si aplica HIPAA, usted tiene los siguientes derechos, sujetos a las excepciones legales aplicables.',
        { h: 'Derecho a inspeccionar y obtener una copia' },
        'Puede solicitar acceso a sus expedientes médicos y dentales y obtener copias en papel o en formato electrónico, según lo permita la ley.',
        'Envíe su solicitud por escrito al responsable de privacidad indicado arriba. Responderemos dentro del plazo que exija la ley. Pueden aplicarse cuotas permitidas.',
        { h: 'Derecho a solicitar una modificación' },
        'Puede pedirnos que corrijamos o modifiquemos información que considere inexacta o incompleta.',
        'Podemos rechazar una solicitud en ciertas circunstancias permitidas por la ley. Si la rechazamos, le daremos una explicación e información sobre sus opciones.',
        { h: 'Derecho a solicitar comunicaciones confidenciales' },
        'Puede pedirnos que nos comuniquemos con usted por un número telefónico, correo electrónico, domicilio u otro medio razonable específico.',
        'Atenderemos las solicitudes razonables según lo exija la ley aplicable.',
        { h: 'Derecho a solicitar restricciones' },
        'Puede pedirnos que limitemos ciertos usos o divulgaciones de su información.',
        'No estamos obligados a aceptar todas las solicitudes. Sin embargo, cuando usted pague un servicio o un artículo de atención de salud totalmente de su bolsillo y solicite que no divulguemos información sobre ese servicio a su plan de salud para fines de pago u operaciones, lo respetaremos cuando lo exija HIPAA, salvo que otra ley exija la divulgación.',
        { h: 'Derecho a un informe de divulgaciones' },
        'Puede solicitar una lista de ciertas divulgaciones de su PHI realizadas durante el periodo aplicable, sujeta a las excepciones establecidas por la ley.',
        { h: 'Derecho a una copia en papel' },
        'Puede solicitar una copia en papel de este Aviso en cualquier momento, aunque antes haya aceptado recibirlo electrónicamente.',
        { h: 'Derecho a designar a un representante personal' },
        'Una persona legalmente autorizada para actuar en su nombre puede ejercer por usted los derechos aplicables. Podemos verificar la autoridad de la persona antes de responder.',
        { h: 'Derecho a presentar una queja' },
        'Puede presentar una queja ante nuestro consultorio o ante el Departamento de Salud y Servicios Humanos de los Estados Unidos, Oficina de Derechos Civiles, si considera que se han violado sus derechos de privacidad.',
        'No tomaremos represalias contra usted por presentar una queja.',
      ],
    },
    {
      id: 'responsibilities',
      icon: 'check',
      title: 'Nuestras responsabilidades de privacidad y seguridad',
      blocks: [
        'Cuando aplica HIPAA, estamos obligados a:',
        {
          ul: [
            'Proteger la privacidad y la seguridad de su PHI.',
            'Entregarle este Aviso, que describe nuestras obligaciones legales y prácticas de privacidad.',
            'Cumplir los términos del Aviso vigente.',
            'Notificarle cuando una violación de PHI no protegida requiera notificación conforme a la ley aplicable.',
            'Usar salvaguardas razonables y adecuadas para proteger la información contra el acceso, uso o divulgación no autorizados.',
            'Limitar el acceso al personal autorizado y a los proveedores de servicios, conforme a los requisitos aplicables.',
          ],
        },
        'Podemos usar proveedores de servicios para apoyar la programación de citas, los registros electrónicos, el almacenamiento seguro, las comunicaciones, la facturación y el procesamiento de pagos.',
        'Cuando HIPAA lo exija, obtendremos las garantías escritas correspondientes o los acuerdos de socio comercial de los proveedores que creen, reciban, conserven o transmitan PHI en nuestro nombre.',
      ],
    },
    {
      id: 'minors',
      icon: 'users',
      title: 'Menores y representantes autorizados',
      blocks: [
        'En el caso de pacientes menores de edad o que tengan un representante legalmente autorizado, manejaremos las solicitudes, los consentimientos, el acceso y las divulgaciones conforme a la ley federal y estatal aplicable.',
        'Ciertas leyes estatales pueden otorgar a los menores derechos independientes sobre tipos específicos de atención de salud. Aplicaremos esos requisitos cuando sea pertinente.',
      ],
    },
    {
      id: 'state',
      icon: 'pin',
      title: 'Protecciones de privacidad específicas de cada estado',
      blocks: [
        'Los requisitos federales de HIPAA pueden complementarse con leyes estatales que brinden mayor protección de la privacidad o derechos adicionales al paciente.',
        'Cuando una ley aplicable más protectora limite nuestro uso o divulgación de información de salud, seguiremos los requisitos legales correspondientes.',
        'Ley Federal de Protección de Datos Personales en Posesión de los Particulares,',
      ],
    },
    {
      id: 'changes',
      icon: 'refresh',
      title: 'Cambios a este Aviso',
      blocks: [
        'Nos reservamos el derecho de modificar los términos de este Aviso según lo permita la ley.',
        'Cualquier Aviso revisado aplicará a la información de salud que conservemos, sujeto a los requisitos legales aplicables. La versión vigente estará disponible en nuestro consultorio y en nuestro sitio web.',
        'Entregaremos avisos revisados o notificaremos los cambios importantes según lo exija la ley.',
      ],
    },
    {
      id: 'contact',
      icon: 'mail',
      title: 'Cómo comunicarse con nosotros o presentar una queja',
      blocks: [
        'Para preguntas, solicitudes o quejas sobre su privacidad, comuníquese con:',
        {
          ul: [
            'Responsable de privacidad: Joe Miranda',
            'Consultorio dental: Nakeji Dental',
            'Domicilio: Jose María Velasco, Av. Río Tijuana 2440-Int. PH3, Zona Urbana Río Tijuana, 22010 Tijuana, B.C.',
            'Teléfono: 619-879-2202',
            'Correo: Appointments@nakejidental.com',
          ],
        },
        'También puede presentar una queja ante el Departamento de Salud y Servicios Humanos de los Estados Unidos, Oficina de Derechos Civiles:',
        {
          link: 'Sitio web: https://www.hhs.gov/hipaa/filing-a-complaint/index.html',
          href: 'https://www.hhs.gov/hipaa/filing-a-complaint/index.html',
        },
        'Teléfono: 1-800-368-1019',
        'No tomaremos represalias contra usted por presentar una queja.',
      ],
    },
  ],
}

export const TERMS_PAGE_ES: LegalDoc = {
  eyebrow: 'Dental Nakeji',
  title: 'Términos y condiciones de SMS',
  lead: 'Al aceptar recibir mensajes SMS de Dental Nakeji, usted acepta recibir mensajes de texto relacionados con citas, actualizaciones, promociones y atención al cliente.',
  updated: 'Fecha de vigencia: 16/10/2026',
  tocLabel: 'En estos términos',
  sections: [
    { id: 'frequency', icon: 'clock', title: 'Frecuencia de mensajes', blocks: ['La frecuencia de los mensajes puede variar.'] },
    {
      id: 'rates',
      icon: 'message',
      title: 'Tarifas de mensajes y datos',
      blocks: ['Pueden aplicar tarifas de mensajes y datos según su compañía telefónica y su plan.'],
    },
    {
      id: 'opt-out',
      icon: 'close',
      title: 'Cancelar la suscripción',
      blocks: ['Puede dejar de recibir mensajes SMS en cualquier momento respondiendo STOP.'],
    },
    {
      id: 'help',
      icon: 'help',
      title: 'Ayuda',
      blocks: ['Para obtener ayuda, responda HELP o escríbanos a appointments@nakejidental.com.'],
    },
    {
      id: 'privacy',
      icon: 'lock',
      title: 'Privacidad',
      blocks: [
        'Su información se manejará de acuerdo con nuestro Aviso de Privacidad. No vendemos ni compartimos su número celular ni la información de su consentimiento para SMS con terceros para fines de mercadotecnia.',
      ],
    },
    {
      id: 'consent',
      icon: 'check',
      title: 'Consentimiento',
      blocks: ['El consentimiento para recibir mensajes SMS no es condición para ninguna compra.'],
    },
    {
      id: 'contact',
      icon: 'phone',
      title: 'Información de contacto',
      blocks: [{ link: 'Dental Nakeji — https://nakejidental.com/', href: 'https://nakejidental.com/' }],
    },
  ],
}
