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
      title: 'Dental implants',
      text: 'A dental implant is a piece placed in the jawbone to replace the root of a missing tooth. A crown, a bridge or a prosthesis can rest on it, depending on what you need. Before recommending it, the dentist checks your gums, the available bone and your general health to plan the right treatment for you.',
    },
  },
  'all-on-4': {
    title: 'All-on-4 Implants',
    subtitle: 'A fixed prosthesis that replaces a full arch with four implants.',
    highlights: ['A full arch on 4 implants.', 'Fixed teeth in a single prosthesis.', 'Bone evaluation for each arch.'],
    about: {
      title: 'All-on-4 implants',
      text: 'All-on-4 is an option for replacing the teeth of a full arch with a fixed prosthesis supported by four implants. The implants are placed in the bone and support the new teeth. Before the procedure, the specialist studies your mouth and bone to determine whether this alternative is right for your case.',
    },
  },
  'all-on-6': {
    title: 'All-on-6 Implants',
    subtitle: 'A fixed full arch with six support points.',
    highlights: ['Six implants per arch.', 'Fixed prosthesis on implants.', 'Plan based on bone and bite.'],
    about: {
      title: 'All-on-6 implants',
      text: 'All-on-6 uses six implants to support a fixed prosthesis that replaces the teeth of an arch. It can be considered when almost all of the upper or lower teeth are missing. The number of implants alone does not determine which treatment is best: the dentist evaluates the bone, gums and bite before proposing a plan.',
    },
  },
  crowns: {
    title: 'Dental Crowns',
    subtitle: 'Protect your teeth and restore their shape.',
    highlights: ['Protects weakened teeth.', 'Covers the whole damaged tooth.', 'Bite check.'],
    about: {
      title: 'Crowns',
      text: 'A crown is a restoration that covers a tooth to help restore its shape and protect it when it is weakened or damaged. It can also be placed on an implant. Before making it, the dentist checks the condition of the tooth and the way you bite; then the crown is prepared and adjusted so it works with the rest of your mouth.',
    },
  },
  veneers: {
    title: 'Dental Veneers',
    subtitle: 'An option to improve how your teeth look.',
    highlights: ['Improve the shape of your teeth.', 'Can help improve their appearance.', 'Planned to fit your teeth.'],
    about: {
      title: 'Dental veneers',
      text: 'Veneers are thin coverings placed on the front surface of teeth to improve aspects of their shape or appearance. The dentist first checks the health of your teeth and gums and talks with you about the change you are looking for. Then they plan how to adapt the veneers to your smile and explain the preparation and care needed.',
    },
  },
  whitening: {
    title: 'Teeth Whitening',
    subtitle: 'A way to give your smile a lighter shade.',
    highlights: ['Evaluation before starting.', 'A plan based on your case.', 'Support throughout the treatment.'],
    about: {
      title: 'Teeth whitening',
      text: 'Teeth whitening aims to lighten the color of natural teeth through a treatment chosen for each person. Before starting, the dentist checks your teeth, gums and any restorations you may have to explain what change you can expect. Not all stains respond the same way, and existing crowns or veneers do not change color with whitening.',
    },
  },
  cleaning: {
    title: 'Dental Cleaning',
    subtitle: 'Take care of your teeth and gums, starting today.',
    highlights: ['Removes built-up tartar and plaque.', 'Polishes away surface stains.', 'Teeth and gum check-up.'],
    about: {
      title: 'Dental cleaning',
      text: 'A professional dental cleaning removes the plaque and tartar built up on teeth, even in areas that are hard to clean at home. It can include polishing to reduce some surface stains, and a check-up of your teeth and gums. It complements brushing and cleaning between teeth, which are still needed every day.',
    },
  },
  'root-canal': {
    title: 'Root Canal Treatment',
    subtitle: 'Treat the inside of your tooth.',
    highlights: ['Helps keep your natural tooth.', 'Treats the inner part of the tooth.', 'Helps preserve the tooth’s function.'],
    about: {
      title: 'Root canals',
      text: 'A root canal treats the inside of a tooth when the tissue it contains is inflamed or infected. The dentist removes the affected tissue, cleans the inside and seals the space to try to keep the tooth. Afterward, they evaluate which restoration the tooth needs to protect it and help it keep working when you bite.',
    },
  },
  orthodontics: {
    title: 'Orthodontics for Your Smile',
    subtitle: 'Align your teeth and improve your bite.',
    highlights: ['Bite evaluation.', 'Regular adjustments to the appliance.', 'Follow-up to check your progress.'],
    about: {
      title: 'Orthodontics',
      text: 'Orthodontics helps move teeth gradually to improve their position and the way they fit together when you bite. It can be done with braces or other appliances, depending on each person’s needs. Treatment begins with an evaluation of your teeth and bite, and continues with check-ups and adjustments to track progress.',
    },
  },
  aligners: {
    title: 'Clear Aligners',
    subtitle: 'A discreet option to align your teeth.',
    highlights: ['A discreet option to improve your smile.', 'Help improve tooth alignment.', 'Support a more balanced smile.'],
    about: {
      title: 'Aligners',
      text: 'Aligners are clear, removable pieces made to fit your teeth. They are used in a planned sequence to move teeth little by little, and they require check-ups during treatment. They are a discreet option, although they are not suitable for every case. The dentist evaluates your bite and the position of your teeth before recommending them.',
    },
  },
  pediatric: {
    title: 'Pediatric Dentistry for Kids',
    subtitle: 'Dental care for the little ones.',
    highlights: ['A first visit to get to know us.', 'Prevention of childhood cavities.', 'Care tailored to each child.'],
    about: {
      title: 'Pediatric dentistry',
      text: 'Pediatric dentistry focuses on the dental care of babies, children and teenagers. At the visit, the dentist checks how their teeth are growing, looks for early signs of cavities and guides the family on hygiene habits. Care is adapted to each child’s age and needs to support them as they develop their oral health.',
    },
  },
  dentures: {
    title: 'Dentures Made to Fit You',
    subtitle: 'Replace the teeth you are missing.',
    highlights: ['Complete, partial or immediate.', 'Custom-made removable prosthesis.', 'Regular adjustments and check-ups.'],
    about: {
      title: 'Dentures',
      text: 'Dentures are removable prostheses made to measure to replace missing teeth. They can be partial, when you still have some teeth, or complete, when a whole arch needs to be replaced. The dentist checks your mouth to design an option that suits you, and makes adjustments and check-ups to make sure it keeps fitting well.',
    },
  },
  gum: {
    title: 'Gum (Periodontal) Treatment',
    subtitle: 'Take care of your gum health.',
    highlights: ['Care for bleeding gums.', 'Measurement of gum pockets.', 'Maintenance after treatment.'],
    about: {
      title: 'Periodontics',
      text: 'Periodontics deals with the gums and the tissues that support the teeth. If your gums bleed, are swollen or show other changes, the dentist examines them and may measure the spaces around the teeth. Depending on what they find, they propose the care or treatment needed and a follow-up plan to keep your gums healthy.',
    },
  },
  extractions: {
    title: 'Simple and Wisdom Tooth Extractions',
    subtitle: 'Dental care when a tooth needs to come out.',
    highlights: ['Simple or surgical extraction.', 'Wisdom tooth evaluation.', 'X-rays before deciding.'],
    about: {
      title: 'Simple and wisdom tooth extractions',
      text: 'An extraction means removing a tooth when the dentist determines it is necessary. It can be simple or require a surgical procedure, depending on the position and condition of the tooth. For wisdom teeth, the dentist first checks whether they are causing problems; the exam and X-rays help decide whether to remove them or keep watching them.',
    },
  },
}
