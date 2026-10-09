// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "ASEGURANZAS Y CONVENIOS": dos grupos, cada uno con texto, enlace y carrusel de logos.
//
// • Empresas, logos y textos de cada grupo → src/data/partners.ts.
// • Título y texto de la sección → src/data/home.ts (PARTNERS_SECTION).
// • Estilos → src/styles/pages/home/partners.css (carrusel: src/styles/components/carousel.css).
// ─────────────────────────────────────────────────────────────────────────────

import { PARTNER_GROUPS, PARTNERS_CTA, type Partner } from '@/data/partners'
import { PARTNERS_SECTION } from '@/data/home'
import { Carousel } from '@/components/ui/Carousel'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { SectionDecor } from '@/components/decor/SectionDecor'
import { SectionIntro } from '@/components/ui/SectionIntro'

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="partner-card">
      {partner.logo ? (
        <img
          className="partner-card__logo"
          src={partner.logo.src}
          width={partner.logo.width}
          height={partner.logo.height}
          alt={partner.name}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="partner-card__placeholder" aria-hidden="true">
          <Icon name="building" size={28} />
        </span>
      )}
      <span className="partner-card__name">{partner.name}</span>
    </div>
  )
}

export function Partners() {
  return (
    <Band
      tone="white"
      labelledBy="aseguranzas-titulo"
      waveTop="plain"
      decor={<SectionDecor variant="rings" placement="partners" />}
    >
      <div className="container">
        <header className="section-head">
          <SectionIntro icon="shield" id="aseguranzas-titulo" title={PARTNERS_SECTION.title} text={PARTNERS_SECTION.text} />
        </header>

        <div className="partner-groups">
          {PARTNER_GROUPS.map((group) => (
            <div key={group.id} className="partner-group">
              <div className="partner-group__intro">
                <h3 className="card-title partner-group__title">
                  {group.title}
                </h3>
                <p className="card-text">{group.text}</p>
                <a className="text-link" href={group.link.href}>
                  {group.link.label}
                  <Icon name="arrowRight" size={16} />
                </a>
              </div>
              <Carousel
                label={group.title}
                className="carousel--partners"
                items={group.items.map((partner) => (
                  <PartnerCard partner={partner} />
                ))}
              />
            </div>
          ))}
        </div>

        <div className="section-cta">
          <ExternalLink className="btn btn--secondary" href={PARTNERS_CTA.href}>
            <Icon name="whatsapp" size={20} />
            {PARTNERS_CTA.label}
          </ExternalLink>
        </div>
      </div>
    </Band>
  )
}
