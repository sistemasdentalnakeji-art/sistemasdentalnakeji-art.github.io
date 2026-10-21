// ─────────────────────────────────────────────────────────────────────────────
// BOTÓN DE IDIOMA (solo en el header): enlace a la MISMA página en el otro idioma (counterpart de config/routes.ts).
// Muestra la bandera del país del otro idioma y su nombre ("Español" / "English"); el aria-label va en el idioma de la página actual.
// Banderas simplificadas (sin escudo ni estrellas: a 22 px no se distinguirían). Estilos → .lang-switch en styles/layout/header.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactElement } from 'react'
import { counterpart, type Lang, type RouteDef } from '@/config/routes'

const US_FLAG = (
  <svg viewBox="0 0 7410 3900" aria-hidden="true" focusable="false" preserveAspectRatio="none">
    <rect width="7410" height="3900" fill="#fff" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} y={i * 600} width="7410" height="300" fill="#b22234" />
    ))}
    <rect width="2964" height="2100" fill="#3c3b6e" />
  </svg>
)

// Círculo café en el centro, en lugar del escudo (simplificado).
const MX_FLAG = (
  <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false" preserveAspectRatio="none">
    <rect width="1" height="2" fill="#006847" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce1126" />
    <circle cx="1.5" cy="1" r="0.25" fill="#8a5a2b" />
  </svg>
)

// La bandera es el enlace: lleva a la misma página en el otro idioma.
const TARGET: Record<Lang, { hreflang: string; label: string; flag: ReactElement }> = {
  // Se muestra la bandera del idioma al que cambia: EE. UU. si la página está en español, y México al revés.
  en: { hreflang: 'en', label: 'Ver esta página en inglés', flag: US_FLAG },
  es: { hreflang: 'es-MX', label: 'View this page in Spanish', flag: MX_FLAG },
}

export function LanguageSwitch({ route, className }: { route: RouteDef; className?: string }) {
  const other = counterpart(route)
  const target = TARGET[other.lang]
  return (
    <a
      className={className ? `lang-switch ${className}` : 'lang-switch'}
      href={other.path}
      hrefLang={target.hreflang}
      aria-label={target.label}
    >
      <span className="lang-switch__flag">{target.flag}</span>
    </a>
  )
}
