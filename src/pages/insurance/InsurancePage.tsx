// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA /insurance/ — diseño "Tablero": encabezado con los 3 pasos y, debajo, TODAS las aseguranzas a la vista en
// una rejilla de líneas finas con marcas "+" en los cruces (inspirada en "Logo Cloud 2" de 21st.dev, código propio).
//
// • Los logos no se mueven nunca; lo único animado es la luz tipo "Snake" que recorre celdas al azar (InsuranceGrid.tsx).
// • Sin fondo propio (se define después). Logos → src/data/partners.ts (INSURANCES); textos → src/data/benefitPages.ts.
// • Estilos → src/styles/pages/insurance.css.
// ─────────────────────────────────────────────────────────────────────────────

import { BENEFITS_BACK, INSURANCE_GRID, INSURANCE_INTRO, INSURANCE_STEPS, PAGE_CTA } from '@/data/benefitPages'
import { INSURANCES, PARTNERS_CTA } from '@/data/partners'
import { InsuranceGrid } from '@/pages/insurance/InsuranceGrid'
import { BENEFITS } from '@/config/routes'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

export function InsurancePage() {
  return (
    <Band tone="white" className="insurance" labelledBy="aseguranzas-pagina-titulo">
      <div className="container">
        <a className="page-back" href={BENEFITS.path}>
          <Icon name="chevronLeft" size={16} />
          {BENEFITS_BACK}
        </a>

        <div className="insurance__head">
          <div>
            <p className="page-eyebrow">{INSURANCE_INTRO.eyebrow}</p>
            <h1 id="aseguranzas-pagina-titulo" className="page-title">
              {INSURANCE_INTRO.title}
            </h1>
            <p className="page-lead">{INSURANCE_INTRO.lead}</p>
          </div>

          <div className="insurance__steps-card">
            <ol className="insurance__steps" role="list">
              {INSURANCE_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <ExternalLink className="btn btn--secondary" href={PARTNERS_CTA.href}>
              <Icon name="whatsapp" size={20} />
              {PAGE_CTA}
            </ExternalLink>
          </div>
        </div>

        <section className="insurers" aria-labelledby="aseguranzas-lista">
          <div className="insurers__bar">
            <h2 id="aseguranzas-lista" className="insurers__count">
              {INSURANCE_GRID.title}
            </h2>
            <ExternalLink className="insurers__ask" href={PARTNERS_CTA.href}>
              {INSURANCE_GRID.missing}
            </ExternalLink>
          </div>

          <InsuranceGrid insurers={INSURANCES} />
        </section>
      </div>
    </Band>
  )
}
