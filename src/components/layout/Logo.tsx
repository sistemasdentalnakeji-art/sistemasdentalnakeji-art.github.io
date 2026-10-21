// ─────────────────────────────────────────────────────────────────────────────
// LOGO OFICIAL (header y footer). Archivo de imagen y medidas → src/config/site.ts (SITE.logo).
// ─────────────────────────────────────────────────────────────────────────────

import { useLang } from '@/app/lang'
import { routeOf } from '@/config/routes'
import { SITE } from '@/config/site'
import { UI } from '@/data/ui'

interface LogoProps {
  isHome: boolean
  /** "lazy" para el logo del footer (fuera de la primera pantalla). */
  loading?: 'lazy'
}

/** Logo oficial; se respeta su proporción original (768×133). */
export function Logo({ isHome, loading }: LogoProps) {
  const lang = useLang()
  return (
    <a className="logo" href={routeOf('home', lang).path} aria-current={isHome ? 'page' : undefined}>
      <img
        className="logo__img"
        src={SITE.logo.src}
        width={SITE.logo.width}
        height={SITE.logo.height}
        alt={UI[lang].logoAlt(SITE.logo.alt)}
        loading={loading}
        decoding="async"
      />
    </a>
  )
}
