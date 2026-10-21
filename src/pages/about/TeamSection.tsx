// ─────────────────────────────────────────────────────────────────────────────
// EQUIPO de /nosotros/: áreas con una tarjeta por integrante.
//
// • Tarjeta que voltea al hacer clic o tocarla (inspirada en "Flip Card" de 21st.dev, código propio sin Motion):
//   al frente la foto (fondo transparente), la profesión y el nombre; atrás el orbe de marca del footer.
// • Cada tarjeta tiene sus propios lienzos animados, pintados por shaderPool (un WebGL por efecto para todas):
//   detrás de la foto, la aurora del hero; en el reverso, los hilos de luz del footer. Cada lienzo solo se anima mientras
//   su cara se ve (o la tarjeta está girando) y su primer cuadro se pinta al registrarse, así nada aparece vacío.
// • Textos y fotos → src/data/about.ts. Estilos → src/styles/pages/about.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type TransitionEvent } from 'react'
import { SITE } from '@/config/site'
import { useLang } from '@/app/lang'
import { ABOUT_A11Y, TEAM, type Member } from '@/data/about'
import { addAurora, addFibers } from '@/components/decor/shaderPool'
import { BrandOrb } from '@/components/ui/BrandOrb'
import { Icon } from '@/components/ui/Icon'
import { SoftBlurIn } from '@/pages/about/SoftBlurIn'

/** Registra el lienzo en un efecto de shaderPool mientras `active` sea verdadero. */
function useShader(add: typeof addAurora, active: boolean, offset: number) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!active || !canvas) return
    return add(canvas, offset)
  }, [add, active, offset])
  return ref
}

interface MemberCardProps {
  member: Member
  /** Posición de la tarjeta: desfasa su animación para que cada una se mueva por su cuenta. */
  order: number
  flipped: boolean
  onToggle: () => void
}

function MemberCard({ member, order, flipped, onToggle }: MemberCardProps) {
  const [turning, setTurning] = useState(false)
  // Desfase corto en la aurora (todas se ven igual, cada una a su ritmo) y largo en los hilos (dibujos distintos).
  const auroraRef = useShader(addAurora, !flipped || turning, order * 1.7)
  const fibersRef = useShader(addFibers, flipped || turning, order * 23)

  function turn(event: { currentTarget: HTMLElement }) {
    // Sin transición ("reducir movimiento", "Pausar animaciones") no hay transitionend: no se marca.
    if (getComputedStyle(event.currentTarget).transitionDuration !== '0s') setTurning(true)
    onToggle()
  }

  function settle(event: TransitionEvent<HTMLButtonElement>) {
    if (event.target === event.currentTarget && event.propertyName === 'transform') setTurning(false)
  }

  return (
    <li className="member" data-flipped={flipped || undefined}>
      <button
        type="button"
        className="member__flip"
        aria-label={ABOUT_A11Y[useLang()].flip(member.name, member.specialty)}
        aria-pressed={flipped}
        onClick={turn}
        onTransitionEnd={settle}
        onTransitionCancel={settle}
      >
        <span className="member__face member__face--front">
          <span className="member__photo">
            <canvas ref={auroraRef} className="member__canvas" />
            {member.photo ? (
              <img src={member.photo} alt="" width={480} height={600} loading="lazy" decoding="async" />
            ) : (
              <Icon name="user" size={48} />
            )}
          </span>
          <span className="member__text">
            <span className="member__name">
              {member.title && <span className="member__title">{member.title} </span>}
              {member.name}
            </span>
            {member.specialty && <span className="member__specialty">{member.specialty}</span>}
          </span>
        </span>
        <span className="member__face member__face--back" aria-hidden="true">
          <canvas ref={fibersRef} className="member__canvas" />
          <BrandOrb />
          <span className="member__brand">{SITE.name}</span>
        </span>
      </button>
    </li>
  )
}

export function TeamSection() {
  const team = TEAM[useLang()]
  const [flipped, setFlipped] = useState<ReadonlySet<string>>(new Set())

  function toggle(key: string) {
    setFlipped((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  let order = 0
  return (
    <section className="about-section" aria-labelledby="equipo-titulo">
      <h2 id="equipo-titulo" className="section-title">
        <SoftBlurIn>{team.title}</SoftBlurIn>
      </h2>
      <p className="section-text about-lead">{team.lead}</p>
      <div className="team-areas">
        {team.areas.map((area) => (
          <section key={area.id} className="team-area" aria-labelledby={`equipo-${area.id}`}>
            <header className="team-area__head">
              <span className="team-area__icon siri">
                <Icon name={area.icon} size={22} />
              </span>
              <div>
                <h3 id={`equipo-${area.id}`} className="team-area__title">
                  {area.title}
                </h3>
              </div>
            </header>
            <ul className={area.members.length === 4 ? 'team-grid team-grid--pairs' : 'team-grid'}>
              {area.members.map((member) => {
                const key = `${area.id}-${member.name}`
                return (
                  <MemberCard
                    key={key}
                    member={member}
                    order={order++}
                    flipped={flipped.has(key)}
                    onToggle={() => toggle(key)}
                  />
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
