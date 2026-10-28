// ─────────────────────────────────────────────────────────────────────────────
// DEGRADADO DE PÁGINA: el fondo azul del hero del homepage (azul noche con luz azul y aguamarina), del tamaño de la
// pantalla y fijo mientras se baja (sticky). Lo usan el homepage (HomePage.tsx) y las bandas con tono "gradient"
// (Band.tsx: /servicios/, /beneficios/, /contacto/). Va por debajo de todo: animaciones de fondo (plasma) y contenido.
// El contenedor no debe tener overflow: hidden (rompe el sticky); usar overflow: clip. Estilos → components/page-gradient.css.
// ─────────────────────────────────────────────────────────────────────────────

export function PageGradient() {
  return (
    <div className="page-gradient" aria-hidden="true">
      <div className="page-gradient__view" />
    </div>
  )
}
