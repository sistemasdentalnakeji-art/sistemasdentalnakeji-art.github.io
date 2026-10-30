// PÁGINA /terminos-y-condiciones/ — mismo diseño que el aviso de privacidad (ver LegalDocument.tsx).
// Textos → src/data/legal.ts (TERMS_PAGE).

import { useLang } from '@/app/lang'
import { TERMS_PAGE, TERMS_PAGE_ES } from '@/data/legal'
import { LegalDocument } from '@/pages/legal/LegalDocument'

export function TermsPage() {
  // `compact`: las secciones de los términos tienen poco texto, así que las cartas son bajas (ver legal.css).
  return <LegalDocument doc={useLang() === 'es' ? TERMS_PAGE_ES : TERMS_PAGE} titleId="terminos-titulo" compact />
}
