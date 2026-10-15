// "Reducir movimiento" del sistema o "Pausar animaciones" del footer (html[data-motion='paused']).
// Solo se llama desde efectos y eventos (nunca durante el render: en Node no hay window).
export const motionOff = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'paused'
