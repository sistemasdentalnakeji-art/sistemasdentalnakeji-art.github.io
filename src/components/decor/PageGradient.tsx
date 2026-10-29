// ─────────────────────────────────────────────────────────────────────────────
// DEGRADADO DE PÁGINA: el fondo azul del hero del homepage (azul noche con luz azul y aguamarina), del tamaño de la
// pantalla y fijo mientras se baja (sticky). Lo pone App.tsx una sola vez en .page-shell, detrás de header, contenido y
// footer (las bandas con tono "gradient" y la home lo dejan ver). Va por debajo de todo: animaciones de fondo y contenido.
// El contenedor no debe tener overflow: hidden (rompe el sticky); usar overflow: clip. Estilos → components/page-gradient.css.
// ─────────────────────────────────────────────────────────────────────────────

export function PageGradient() {
  return (
    <div className="page-gradient" aria-hidden="true">
      <div className="page-gradient__view" />
    </div>
  )
}
