// ─────────────────────────────────────────────────────────────────────────────
// FONDO DE FIBRAS: GhostFibers de React Bits con los colores del proyecto (azul de marca, aguamarina del hero y un celeste
// claro para los destellos). Lo usan el héroe del homepage y /nosotros/.
// Rellena a su contenedor (absolute, detrás del contenido). Dentro de una banda con `band--clip` (páginas largas) se queda
// fijo del tamaño de la pantalla (sticky, ver ghost-fibers.css). Respeta "Pausar animaciones" (evento `motionchange`);
// "reducir movimiento" lo respeta el propio GhostFibers.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { AURORA_PALETTES } from '@/components/decor/auroraShaders'
import { GhostFibers } from '@/components/decor/GhostFibers'
import { motionOff } from '@/lib/motion'

// Azul de marca y aguamarina: los mismos de la aurora del hero y del footer.
const [BRAND, , AQUA] = AURORA_PALETTES.dark.colors

export function FibersBackground({ lightMode = false }: { lightMode?: boolean }) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const sync = () => setPaused(motionOff())
    sync()
    window.addEventListener('motionchange', sync)
    return () => window.removeEventListener('motionchange', sync)
  }, [])

  return (
    <div className="fibers-bg" aria-hidden="true">
      <GhostFibers
        className="fibers-bg__view"
        glowColor={BRAND}
        secondaryColor={AQUA}
        lineColor="#bfe9f5"
        lightMode={lightMode}
        dpr={1}
        paused={paused}
      />
    </div>
  )
}
