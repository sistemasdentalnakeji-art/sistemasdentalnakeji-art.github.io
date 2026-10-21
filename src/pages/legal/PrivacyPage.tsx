// PÁGINA /aviso-de-privacidad/ — índice a la izquierda y cartas apiladas a la derecha (ver LegalDocument.tsx).
// Textos → src/data/legal.ts (PRIVACY_PAGE).

import { useLang } from '@/app/lang'
import { PRIVACY_PAGE, PRIVACY_PAGE_ES } from '@/data/legal'
import { LegalDocument } from '@/pages/legal/LegalDocument'

export function PrivacyPage() {
  return <LegalDocument doc={useLang() === 'es' ? PRIVACY_PAGE_ES : PRIVACY_PAGE} titleId="privacidad-titulo" />
}
