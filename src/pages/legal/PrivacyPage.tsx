// PÁGINA /aviso-de-privacidad/ — índice a la izquierda y cartas apiladas a la derecha (ver LegalDocument.tsx).
// Textos → src/data/legal.ts (PRIVACY_PAGE).

import { PRIVACY_PAGE } from '@/data/legal'
import { LegalDocument } from '@/pages/legal/LegalDocument'

export function PrivacyPage() {
  return <LegalDocument doc={PRIVACY_PAGE} titleId="privacidad-titulo" />
}
