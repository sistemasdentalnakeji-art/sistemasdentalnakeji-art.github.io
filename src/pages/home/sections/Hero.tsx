// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN HERO (primera pantalla del homepage)
//
// Fondo aurora animado + orbe con el isotipo + título, texto, botones y frases.
// • Textos y tema (oscuro/claro) → src/data/home.ts (HERO).
// • Burbujas flotantes → HERO.ambientLabels en src/data/home.ts.
// • Animación de fondo → src/components/decor/AuroraBackground.tsx.
// • Estilos → src/styles/pages/home/hero.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react'
import { SCHEDULE_ANCHOR } from '@/config/routes'
import { SITE } from '@/config/site'
import { HERO } from '@/data/home'
import { AuroraBackground } from '@/components/decor/AuroraBackground'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { SectionDecor } from '@/components/decor/SectionDecor'

export function Hero() {
  return (
    <section className={`hero hero--${HERO.theme}`} aria-labelledby="hero-titulo">
      <AuroraBackground theme={HERO.theme} className="hero__aurora" />
      <div className="hero__scrim" aria-hidden="true" />
      <SectionDecor variant="wave" position="bottom" />

      <ul className="hero__ambient" aria-hidden="true">
        {HERO.ambientLabels.map((label, index) => (
          <li key={label} className="ambient-label" style={{ '--i': index } as CSSProperties}>
            <Icon name="check" size={18} />
            {label}
          </li>
        ))}
      </ul>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero-orb" aria-hidden="true">
            <img className="hero-orb__mark" src="/favicon-192.webp" width={192} height={192} alt="" decoding="async" />
          </div>

          <p className="hero__eyebrow">{HERO.eyebrow}</p>

          <h1 id="hero-titulo" className="hero__title">
            <span className="hero__title-lead">{HERO.titleLead}</span>{' '}
            <span className="hero__title-muted">{HERO.titleMuted}</span>
          </h1>

          <p className="hero__lead">{HERO.lead}</p>

          <div className="hero__actions">
            <a className="btn btn--lg hero__cta" href={`#${SCHEDULE_ANCHOR}`}>
              {HERO.primaryCta}
              <Icon name="arrowRight" size={18} />
            </a>
            <ExternalLink className="btn btn--lg hero__cta-alt" href={SITE.social.whatsapp}>
              <Icon name="whatsapp" size={20} />
              {HERO.secondaryCta}
            </ExternalLink>
          </div>

          <ul className="hero__note">
            {HERO.highlights.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
