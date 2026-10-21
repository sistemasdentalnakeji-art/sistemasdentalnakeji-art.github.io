// PÁGINA /terminos-y-condiciones/ — mismo diseño que el aviso de privacidad (ver LegalDocument.tsx).
// Textos → src/data/legal.ts (TERMS_PAGE).

import { useLang } from '@/app/lang'
import { TERMS_PAGE, TERMS_PAGE_ES } from '@/data/legal'
import { LegalDocument } from '@/pages/legal/LegalDocument'

export function TermsPage() {
  // `compact`: las cartas de SMS tienen poco texto, así que son bajas (ver legal.css).
  return <LegalDocument doc={useLang() === 'es' ? TERMS_PAGE_ES : TERMS_PAGE} titleId="terminos-titulo" compact />
}
