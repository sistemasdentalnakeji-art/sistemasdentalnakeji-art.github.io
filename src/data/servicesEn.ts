// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS EN INGLÉS DE LAS PÁGINAS DE SERVICIO (los de español están en src/data/services.ts; imagen y estructura, compartidas).
//
// • Traducción de los textos en español de cada servicio, con gan-harness/glosario-en.md. Sin promesas de resultados.
// • PENDIENTE (clínica): confirmar con ella los datos de cada servicio (lista "claimsToConfirmWithClinic" en
//   gan-harness/contenido/<slug>.json) y la revisión médica de la versión en inglés, igual que la de español.
// • Si cambias un texto aquí, cámbialo también en gan-harness/contenido/<slug>.json (campo `en`).
// • Este archivo no importa nada del proyecto (solo tipos): scripts/ puede leerlo directo con Node.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceTextEn {
  title: string
  subtitle: string
  highlights: [string, string, string]
  about: { title: string; text: string }
}

export const SERVICE_TEXT_EN: Record<string, ServiceTextEn> = {
  implants: {
    title: 'Dental Implants',
    subtitle: 'Smile and chew with confidence again.',
    highlights: ['An artificial root placed in the jawbone.', 'Supports a crown, bridge or denture.', 'Bone and gum evaluation first.'],
    about: {
      title: 'The dental implant',
      text: 'If you are missing a tooth, chewing can be hard. An implant is a titanium root placed with surgery that supports a crown. The dentist evaluates your bone and gums.',
    },
  },
  'all-on-4': {
    title: 'All-on-4 Implants',
    subtitle: 'A fixed prosthesis that replaces a full arch with four implants.',
    highlights: ['A full arch on 4 implants.', 'Fixed teeth in a single prosthesis.', 'Bone study for each arch.'],
    about: {
      title: 'All-on-4: a fixed full arch',
      text: 'If you are missing almost all the teeth in an arch, All-on-4 replaces them with a fixed prosthesis on four implants. It is surgery under anesthesia. The dentist evaluates your bone.',
    },
  },
  'all-on-6': {
    title: 'All-on-6 Implants',
    subtitle: 'A fixed full arch with six support points.',
    highlights: ['Six implants per arch.', 'Fixed prosthesis on implants.', 'Plan based on bone and bite.'],
    about: {
      title: 'All-on-6: a fixed full arch',
      text: 'If you are missing almost all the teeth in an arch, All-on-6 uses six implants, not four, to support a fixed prosthesis. It is surgery. The dentist decides based on your bone.',
    },
  },
  crowns: {
    title: 'Dental Crowns',
    subtitle: 'Protect your teeth and restore their shape.',
    highlights: ['Protects weakened teeth.', 'Covers the whole damaged tooth.', 'Bite check.'],
    about: {
      title: 'The dental crown',
      text: 'To place a crown, the dentist prepares the tooth, checks how much healthy tissue remains and evaluates your bite so the restoration fits well.',
    },
  },
  veneers: {
    title: 'Dental Veneers',
    subtitle: 'An option to improve how your teeth look.',
    highlights: ['Improve the shape of your teeth.', 'Can help improve their appearance.', 'Planned to fit your teeth.'],
    about: {
      title: 'Dental veneers',
      text: 'Veneers can be an option if you want to improve how your teeth look. At the consultation, we review what you want to change and how your smile looks as a whole. Then the dentist explains how the procedure works and what to expect during treatment.',
    },
  },
  whitening: {
    title: 'Teeth Whitening',
    subtitle: 'A way to give your smile a lighter shade.',
    highlights: ['Evaluation before starting.', 'A plan based on your case.', 'Support throughout the treatment.'],
    about: {
      title: 'Teeth whitening',
      text: 'Whitening can help you get a lighter smile. Before starting, we evaluate the condition of your teeth and gums to choose the right option and explain the process in simple terms.',
    },
  },
  cleaning: {
    title: 'Dental Cleaning',
    subtitle: 'Take care of your teeth and gums, starting today.',
    highlights: ['Removes built-up tartar and plaque.', 'Polishing of surface stains.', 'Check of teeth and gums.'],
    about: {
      title: 'Professional dental cleaning',
      text: 'A toothbrush does not always reach every area. A dental cleaning is a simple way to look after the health of your teeth and gums and keep your smile fresh and healthy. It is care that matters, and many people skip it.',
    },
  },
  'root-canal': {
    title: 'Root Canal Treatment',
    subtitle: 'Treat the inside of your tooth.',
    highlights: ['Helps keep your natural tooth.', 'Treats the inner part of the tooth.', 'Helps preserve the tooth’s function.'],
    about: {
      title: 'Root canal treatment',
      text: 'If a tooth is causing pain or discomfort, a root canal can help save it. The dentist works on the inner part of the tooth, removes what is affected and prepares it for its restoration. The process is explained step by step.',
    },
  },
  orthodontics: {
    title: 'Orthodontics for Your Smile',
    subtitle: 'Align your teeth and improve your bite.',
    highlights: ['Bite evaluation.', 'Regular adjustments to the appliance.', 'Follow-up to check your progress.'],
    about: {
      title: 'Orthodontics',
      text: 'Orthodontics moves teeth gradually with braces or other appliances. It can help when teeth are crowded, spaced apart or the bite does not close well. Treatment time and type are reviewed with a professional based on your case.',
    },
  },
  aligners: {
    title: 'Clear Aligners',
    subtitle: 'A discreet option to align your teeth.',
    highlights: ['A discreet option to improve your smile.', 'Help improve tooth alignment.', 'Support a more balanced smile.'],
    about: {
      title: 'Clear aligners',
      text: 'Aligner treatment is planned based on the position of your teeth and the result you are looking for. Along the way, check-ups track the changes and make any needed adjustments. The dentist explains each stage and the estimated time for your case.',
    },
  },
  pediatric: {
    title: 'Pediatric Dentistry for Kids',
    subtitle: 'Dental care for the little ones.',
    highlights: ['A first visit to get to know us.', 'Prevention of childhood cavities.', 'Care tailored to each child.'],
    about: {
      title: 'Pediatric dentistry for kids',
      text: 'Your children’s dental health matters. Pediatric dentistry helps care for their teeth from an early age, prevent cavities and catch in time anything that could affect their smile. The visit is adapted to their age and aims to help them feel safe, supported and calm.',
    },
  },
  dentures: {
    title: 'Dentures Made to Fit You',
    subtitle: 'Replace the teeth you are missing.',
    highlights: ['Complete, partial or immediate.', 'Removable prosthesis made to measure.', 'Regular adjustments and check-ups.'],
    about: {
      title: 'Dentures made to fit you',
      text: 'Dentures can be an option to replace several or all missing teeth. The dentist reviews your case, the condition of your mouth and what you need to guide you toward the most suitable alternative. During the process, they support you and follow up so the treatment fits you.',
    },
  },
  gum: {
    title: 'Gum (Periodontal) Treatment',
    subtitle: 'Take care of your gum health.',
    highlights: ['Care for bleeding gums.', 'Measurement of gum pockets.', 'Maintenance after treatment.'],
    about: {
      title: 'Periodontal treatment',
      text: 'If your gums bleed when you brush, there may be inflammation. Periodontal treatment cares for the gums and bone and aims to stop the damage. The dentist measures the space between gum and tooth.',
    },
  },
  extractions: {
    title: 'Simple and Wisdom Tooth Extractions',
    subtitle: 'Dental care when a tooth needs to come out.',
    highlights: ['Simple or surgical extraction.', 'Wisdom tooth evaluation.', 'X-rays before deciding.'],
    about: {
      title: 'Tooth extractions',
      text: 'An extraction may be needed when a tooth cannot be repaired, is causing a problem or a wisdom tooth has no room. Before deciding, the dentist reviews the tooth and the X-rays. This option is evaluated with a dentist, who guides and supports you through the process.',
    },
  },
}
