// ─────────────────────────────────────────────────────────────────────────────
// FONDO AURORA DE PÁGINA: azul noche con luces difusas que derivan despacio (azul de marca, azul claro y aguamarina) y estrellas
// que titilan. Es un fondo propio en CSS (sin librerías) inspirado en "Aurora Background" de 21st.dev, con los colores de
// Dental Nakeji. Del tamaño de la pantalla y fijo mientras se baja (sticky), como PageGradient. Lo usan las bandas con tono
// "aurora" (Band.tsx): blog, preguntas frecuentes, aviso de privacidad y términos.
// Solo se animan transform y opacity; se detiene con "reducir movimiento", "Pausar animaciones" y fuera de pantalla.
// El contenedor no debe tener overflow: hidden (rompe el sticky); usar overflow: clip. Estilos → components/page-aurora.css.
// ─────────────────────────────────────────────────────────────────────────────

export function PageAurora() {
  return (
    <div className="page-aurora" aria-hidden="true">
      <div className="page-aurora__view">
        <span className="page-aurora__glow page-aurora__glow--blue" />
        <span className="page-aurora__glow page-aurora__glow--sky" />
        <span className="page-aurora__glow page-aurora__glow--aqua" />
        <span className="page-aurora__stars page-aurora__stars--far" />
        <span className="page-aurora__stars page-aurora__stars--near" />
      </div>
    </div>
  )
}
