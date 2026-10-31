// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "ASEGURANZAS Y CONVENIOS": dos carruseles independientes (uno por grupo) en forma de "cinta" continua.
//
// • Cada cinta avanza sola y despacio: Aseguranzas hacia la izquierda y Convenios hacia la derecha. Se pausa con el
//   cursor y con "Pausar animaciones" (footer); con "reducir movimiento" no se mueve y se desplaza con el dedo/trackpad.
// • Es solo CSS (sin JS): la lista se repite dos veces y la copia va oculta para lectores de pantalla (aria-hidden + inert).
// • Aseguranzas (8, las elige HOME_INSURANCES) y Convenios (todos): logos reales sueltos, sin tarjeta ni nombre.
//   Logos y textos de cada grupo → src/data/partners.ts.
// • Título y texto de la sección → src/data/home.ts (PARTNERS_SECTION).
// • Estilos → src/styles/pages/home/partners.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react'
import { useLang } from '@/app/lang'
import { PARTNER_GROUPS, PARTNERS_CTA, PARTNERS_CTA_LABEL, type Partner } from '@/data/partners'
import { UI } from '@/data/ui'
import { PARTNERS_SECTION } from '@/data/home'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { InteractiveHoverContent } from '@/components/ui/AnimatedButtons'

/** Con logo real: solo el logo, sin tarjeta ni nombre (el nombre va en el alt). Sin logo: marcador con icono y nombre. */
function Plate({ partner, icon }: { partner: Partner; icon: 'shield' | 'building' }) {
  if (partner.logo) {
    return (
      <li className="plate plate--logo">
        <img
          className={partner.logo.framed ? 'is-framed' : undefined}
          src={partner.logo.src}
          width={partner.logo.width}
          height={partner.logo.height}
          alt={partner.name}
          style={{ '--ar': partner.logo.width / partner.logo.height, '--w': partner.logo.width } as CSSProperties}
          loading="lazy"
          decoding="async"
        />
      </li>
    )
  }
  return (
    <li className="plate">
      <span className="plate__mark" aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
      <span className="plate__name">{partner.name}</span>
    </li>
  )
}

export function Partners() {
  const lang = useLang()
  const groups = PARTNER_GROUPS[lang]
  const section = PARTNERS_SECTION[lang]
  return (
    <Band
      tone="white"
      className="partners-band"
      labelledBy="aseguranzas-titulo"
      waveTop="plain"
    >
      <div className="container">
        <header className="section-head">
          <h2 id="aseguranzas-titulo" className="section-title">{section.title}</h2>
          <p className="section-text">{section.text}</p>
        </header>

        <div className="rails">
          {groups.map((group, index) => {
            const icon = group.id === 'aseguranzas' ? 'shield' : 'building'
            return (
              <section key={group.id} className={`rail rail--${group.id}`} aria-labelledby={`rail-${group.id}`}>
                <div className="rail__head">
                  <div className="rail__top">
                    <span className="rail__icon" aria-hidden="true">
                      <Icon name={icon} size={26} />
                    </span>
                    <p className="rail__badge">{group.badge}</p>
                  </div>
                  <h3 id={`rail-${group.id}`} className="rail__title">
                    {group.title}
                  </h3>
                  <p className="rail__text">{group.text}</p>
                </div>

                <div
                  className="rail__marquee"
                  role="region"
                  aria-roledescription={UI[lang].carousel.role}
                  aria-label={group.title}
                  data-dir={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="rail__track">
                    <ul className="rail__list">
                      {group.items.map((partner) => (
                        <Plate key={partner.name} partner={partner} icon={icon} />
                      ))}
                    </ul>
                    {/* Copia para el bucle continuo: invisible para lectores de pantalla y sin foco. */}
                    <ul className="rail__list rail__list--copy" aria-hidden="true" inert>
                      {group.items.map((partner) => (
                        <Plate key={partner.name} partner={partner} icon={icon} />
                      ))}
                    </ul>
                  </div>
                </div>

                <a className="btn btn--primary btn--sm rail__cta interactive-hover" href={group.link.href}>
                  <InteractiveHoverContent>{group.link.label}</InteractiveHoverContent>
                </a>
                {/* WhatsApp dentro de cada tarjeta (escritorio y celular). */}
                <ExternalLink className="btn btn--secondary rail__whatsapp" href={PARTNERS_CTA.href}>
                  <Icon name="whatsapp" size={20} />
                  {PARTNERS_CTA_LABEL[lang]}
                </ExternalLink>
              </section>
            )
          })}
        </div>
      </div>
    </Band>
  )
}
