// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /aviso-de-privacidad/ y /terminos-y-condiciones/ (pages/legal/LegalDocument.tsx).
//
// Son los documentos OFICIALES de la clínica, copiados tal cual (en inglés, sin traducir) de sus páginas de Google Sites:
//  • /aviso-de-privacidad/ = "Notice of Privacy Practices" (HIPAA): https://sites.google.com/view/nakejinoticeofprivacypractice
//  • /terminos-y-condiciones/ = "SMS Terms & Conditions": https://sites.google.com/view/nakejidentalsmsterms
// Si la clínica cambia el original, se actualiza aquí. Cada sección conserva un `id` corto y único (ancla del índice).
// ─────────────────────────────────────────────────────────────────────────────

/** Bloque de contenido de una sección: párrafo, subtítulo, lista o enlace (externo si empieza con http). */
export type LegalBlock = string | { h: string } | { ul: string[] } | { link: string; href: string }

interface LegalSection {
  id: string
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
      title: 'Minors and Authorized Representatives',
      blocks: [
        'For patients who are minors or who have a legally authorized representative, we will handle requests, consent, access, and disclosures in accordance with applicable federal and state law.',
        'Certain state laws may give minors independent rights regarding specific types of healthcare. We will apply those requirements when relevant.',
      ],
    },
    {
      id: 'state',
      title: 'State-Specific Privacy Protections',
      blocks: [
        'Federal HIPAA requirements may be supplemented by state laws that provide greater privacy protections or additional patient rights.',
        'Where a more protective applicable law limits our use or disclosure of health information, we will follow the applicable legal requirements.',
        'Ley Federal de Protección de Datos Personales en Posesión de los Particulares,',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Notice',
      blocks: [
        'We reserve the right to change the terms of this Notice as permitted by law.',
        'Any revised Notice will apply to the health information we maintain, subject to applicable legal requirements. The current version will be available at our office and on our website.',
        'We will provide revised notices or notification of material changes as required by law.',
      ],
    },
    {
      id: 'contact',
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
    { id: 'frequency', title: 'Message Frequency', blocks: ['Message frequency may vary.'] },
    {
      id: 'rates',
      title: 'Message and Data Rates',
      blocks: ['Message and data rates may apply depending on your mobile carrier and plan.'],
    },
    { id: 'opt-out', title: 'Opt-Out', blocks: ['You can opt out of receiving SMS messages at any time by replying STOP.'] },
    {
      id: 'help',
      title: 'Help',
      blocks: ['For assistance, reply HELP or contact us at appointments@nakejidental.com.'],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      blocks: [
        'Your information will be handled in accordance with our Privacy Policy. We do not sell or share your mobile number or SMS consent information with third parties for their marketing purposes.',
      ],
    },
    {
      id: 'consent',
      title: 'Consent',
      blocks: ['Consent to receive SMS messages is not a condition of purchase.'],
    },
    {
      id: 'contact',
      title: 'Contact Information',
      blocks: [{ link: 'Dental Nakeji — https://nakejidental.com/', href: 'https://nakejidental.com/' }],
    },
  ],
}
