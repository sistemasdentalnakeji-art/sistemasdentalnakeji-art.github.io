// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE /aviso-de-privacidad/ y /terminos-y-condiciones/ (pages/legal/PrivacyPage.tsx y TermsPage.tsx).
//
// PROVISIONALES: todo es lorem ipsum (solo el diseño). El texto legal real lo da la clínica; al reemplazarlo,
// conserva un `id` corto y único por sección (es el ancla del índice: /aviso-de-privacidad/#datos).
// ─────────────────────────────────────────────────────────────────────────────

interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
  'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
]

const section = (id: string, title: string): LegalSection => ({ id, title, paragraphs: LOREM })

export const PRIVACY_PAGE = {
  eyebrow: 'Legal',
  title: 'Aviso de privacidad',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam, nulla quis sem at nibh.',
  updated: 'Última actualización: pendiente',
  tocLabel: 'En este aviso',
  sections: [
    section('responsable', 'Responsable de tus datos'),
    section('datos', 'Datos que recabamos'),
    section('finalidades', 'Para qué los usamos'),
    section('transferencias', 'Transferencias'),
    section('arco', 'Derechos ARCO'),
    section('revocacion', 'Revocación del consentimiento'),
    section('cookies', 'Cookies y tecnologías similares'),
    section('cambios', 'Cambios a este aviso'),
  ],
}

export const TERMS_PAGE = {
  eyebrow: 'Legal',
  title: 'Términos y condiciones',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero, sed cursus ante dapibus diam.',
  updated: 'Última actualización: pendiente',
  sections: [
    section('uso', 'Uso del sitio'),
    section('citas', 'Citas y cancelaciones'),
    section('presupuestos', 'Presupuestos y pagos'),
    section('tratamientos', 'Tratamientos y garantías'),
    section('aseguranzas', 'Aseguranzas y convenios'),
    section('propiedad', 'Propiedad intelectual'),
    section('responsabilidad', 'Limitación de responsabilidad'),
    section('ley', 'Ley aplicable'),
  ],
}
