import { useEffect, type RefObject } from 'react'

export const EASE_IN_OUT = '0.45 0 0.55 1;0.45 0 0.55 1'

/**
 * Detiene las animaciones del SVG (SMIL y CSS) cuando el usuario pide reducir movimiento, pulsa
 * "Pausar animaciones" (evento `motionchange`) o el SVG está fuera de pantalla: así no gastan CPU
 * donde nadie las ve.
 */
export function useSmilMotion(ref: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true
    const apply = () => {
      const paused = media.matches || !visible || document.documentElement.dataset.motion === 'paused'
      if (paused) svg.pauseAnimations()
      else svg.unpauseAnimations()
      svg.classList.toggle('is-paused', paused)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      apply()
    })
    observer.observe(svg)
    apply()
    media.addEventListener('change', apply)
    window.addEventListener('motionchange', apply)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', apply)
      window.removeEventListener('motionchange', apply)
    }
  }, [ref])
}
