// Botón "Pausar animaciones" (criterio WCAG 2.2.2: el movimiento que dura más de 5 s debe poder pausarse).
// Marca <html data-motion="paused"> (pausa las animaciones CSS, ver styles/global/preferences.css) y avisa
// con el evento `motionchange` a las animaciones SVG (SectionDecor) y al WebGL (AuroraBackground).

import { useState } from 'react'

export function MotionToggle() {
  const [paused, setPaused] = useState(false)

  const toggle = () => {
    const next = !paused
    setPaused(next)
    const root = document.documentElement
    if (next) root.dataset.motion = 'paused'
    else delete root.dataset.motion
    window.dispatchEvent(new Event('motionchange'))
  }

  return (
    <button type="button" className="motion-toggle" aria-pressed={paused} onClick={toggle}>
      Pausar animaciones
    </button>
  )
}
