// ─────────────────────────────────────────────────────────────────────────────
// LOGO DEL HEADER: "Dental" y "nakeji" en blanco con un barrido de luz (el del texto brillante del hero) y, en medio,
// el isotipo en un orbe con contorno luminoso (.siri, el mismo del hero). El archivo del logotipo y sus medidas
// → src/config/site.ts (SITE.logo); las palabras se recortan de ese mismo archivo con una máscara (header.css).
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react'
import { useLang } from '@/app/lang'
import { routeOf } from '@/config/routes'
import { SITE } from '@/config/site'
import { UI } from '@/data/ui'

interface LogoProps {
  isHome: boolean
}

export function Logo({ isHome }: LogoProps) {
  const lang = useLang()
  return (
    <a
      className="logo"
      href={routeOf('home', lang).path}
      aria-current={isHome ? 'page' : undefined}
      style={{ '--logo-mask': `url(${SITE.logo.src})` } as CSSProperties}
    >
      <span className="visually-hidden">{UI[lang].logoAlt(SITE.logo.alt)}</span>
      <span className="logo__word logo__word--left" aria-hidden="true" />
      <span className="logo__orb siri" aria-hidden="true">
        <img className="logo__mark" src="/favicon-192.webp" width={192} height={192} alt="" decoding="async" />
      </span>
      <span className="logo__word logo__word--right" aria-hidden="true" />
    </a>
  )
}
