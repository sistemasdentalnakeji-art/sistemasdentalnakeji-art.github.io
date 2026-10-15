// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /convenios/ — diseño "Muro de marcas": una rejilla de fichas con los logos reales de las empresas con convenio
// y una tarjeta grande con título y texto (el muro y su ciclo automático viven en BrandWall.tsx). Abajo, una franja para
// empresas que aún no tienen convenio.
// Inspirado en "Pixel Logo Grid" de 21st.dev (código propio, sin librerías).
//
// • Empresas, orden (de más a menos popular), logos y color de marca → src/data/partners.ts (AGREEMENT_PARTNERS).
// • Textos → src/data/benefitPages.ts. Estilos → src/styles/pages/agreements.css.
// ─────────────────────────────────────────────────────────────────────────────

import { AGREEMENT_COMPANIES, AGREEMENT_JOIN, AGREEMENT_SUMMARY, AGREEMENTS_INTRO, BENEFITS_BACK, PAGE_CTA } from '@/data/benefitPages'
import { PARTNERS_CTA } from '@/data/partners'
import { BENEFITS } from '@/config/routes'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { BrandWall } from '@/pages/agreements/BrandWall'

export function AgreementsPage() {
  return (
    <Band tone="white" className="agreements" labelledBy="convenios-titulo">
      <div className="container">
        <a className="page-back" href={BENEFITS.path}>
          <Icon name="chevronLeft" size={16} />
          {BENEFITS_BACK}
        </a>
        <header className="agreements__head">
          <p className="page-eyebrow">{AGREEMENTS_INTRO.eyebrow}</p>
          <h1 id="convenios-titulo" className="page-title">
            {AGREEMENTS_INTRO.title}
          </h1>
          <p className="page-lead">{AGREEMENTS_INTRO.lead}</p>
        </header>

        <BrandWall companies={AGREEMENT_COMPANIES} summary={AGREEMENT_SUMMARY} />

        <div className="agreements__join">
          <div>
            <h2 className="agreements__join-title">{AGREEMENT_JOIN.title}</h2>
            <p className="agreements__join-text">{AGREEMENT_JOIN.text}</p>
          </div>
          <ExternalLink className="btn btn--secondary" href={PARTNERS_CTA.href}>
            <Icon name="whatsapp" size={20} />
            {PAGE_CTA}
          </ExternalLink>
        </div>
      </div>
    </Band>
  )
}
