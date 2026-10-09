// ─────────────────────────────────────────────────────────────────────────────
// LOGO OFICIAL (header y footer). Archivo de imagen y medidas → src/config/site.ts (SITE.logo).
// ─────────────────────────────────────────────────────────────────────────────

import { HOME } from '@/config/routes'
import { SITE } from '@/config/site'

interface LogoProps {
  isHome: boolean
  /** "lazy" para el logo del footer (fuera de la primera pantalla). */
  loading?: 'lazy'
}

/** Logo oficial; se respeta su proporción original (768×133). */
export function Logo({ isHome, loading }: LogoProps) {
  return (
    <a className="logo" href={HOME.path} aria-current={isHome ? 'page' : undefined}>
      <img
        className="logo__img"
        src={SITE.logo.src}
        width={SITE.logo.width}
        height={SITE.logo.height}
        alt={`${SITE.logo.alt}, ir a Inicio`}
        loading={loading}
        decoding="async"
      />
    </a>
  )
}
