// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN ANIMADA DEBAJO DEL HERO: tres mensajes que entran al hacer scroll
//
//   1. Deseo cotidiano → entra desde la izquierda.
//   2. Lo importante del cuidado (h2) → sube desde abajo y queda centrado.
//   3. Comprender para decidir → entra desde la derecha.
// • Textos → src/data/story.ts.
// • Movimiento y estilos → src/styles/pages/home/story.css (animaciones CSS ligadas al scroll, sin JavaScript).
// ─────────────────────────────────────────────────────────────────────────────

import { STORY, type StoryLines } from '@/data/story'
import { Band } from '@/components/decor/Band'

function StoryText({ lines }: { lines: StoryLines }) {
  return lines.map((segments, index) => (
    <span key={index} className="story__line">
      {segments.map((segment) =>
        segment.accent ? (
          <span key={segment.text} className="story__accent">
            {segment.text}
          </span>
        ) : (
          segment.text
        ),
      )}
    </span>
  ))
}

export function CareStory() {
  return (
    <Band tone="tint" className="story" labelledBy="historia-titulo">
      <div className="container story__inner">
        <p className="story__item story__item--left">
          <StoryText lines={STORY.desire} />
        </p>

        <h2 id="historia-titulo" className="story__item story__item--up">
          <StoryText lines={STORY.priority} />
        </h2>

        <p className="story__item story__item--right">
          <StoryText lines={STORY.decision} />
        </p>
      </div>
    </Band>
  )
}
