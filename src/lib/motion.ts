// "Reducir movimiento" del sistema o "Pausar animaciones" del footer (html[data-motion='paused']).
// Solo se llama desde efectos y eventos (nunca durante el render: en Node no hay window).
let reduceQuery: MediaQueryList | undefined
export const motionOff = () =>
  (reduceQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)')).matches ||
  document.documentElement.dataset.motion === 'paused'

// Contornos luminosos (.siri) y texto con brillo (.shiny-text): sus animaciones repintan en cada cuadro aunque estén lejos
// de la vista. Un solo observador les pone data-offscreen fuera de pantalla y el CSS (preferences.css) las pausa.
// shortcut: observa los elementos que existen al llamarla (los del HTML prerenderizado); uno que aparezca después no se pausa.
// Las demás animaciones infinitas (marquesinas, reseñas, plano…) reciben data-offscreen-loop. Los boletos de /beneficios/ se
// excluyen: su animación no cambia.
export function pauseOffscreen() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting)
  })
  for (const el of document.querySelectorAll('.siri, .shiny-text')) observer.observe(el)

  const loops = new IntersectionObserver((entries) => {
    for (const entry of entries) entry.target.toggleAttribute('data-offscreen-loop', !entry.isIntersecting)
  })
  for (const animation of document.getAnimations()) {
    const effect = animation.effect as KeyframeEffect | null
    const target = effect?.target
    if (
      target &&
      animation.timeline === document.timeline &&
      effect.getTiming().iterations === Infinity &&
      !target.closest('.siri, .shiny-text, .benefit-grid, .benefits-cta')
    )
      loops.observe(target)
  }
}
