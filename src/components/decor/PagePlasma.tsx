// ─────────────────────────────────────────────────────────────────────────────
// PLASMA DE PÁGINA: el fondo de plasma azul claro de las páginas internas (/contacto/ y las páginas legales), ya configurado.
// Va en el `decor` de una Band con la clase `band--clip` (si no, el sticky del plasma no se pega). Estilos → src/styles/components/page-plasma.css.
// ─────────────────────────────────────────────────────────────────────────────

import { PlasmaBackground } from '@/components/decor/PlasmaBackground'

export function PagePlasma() {
  return (
    <div className="page-plasma">
      <PlasmaBackground
        className="page-plasma__view"
        color="#7bc3eb"
        opacity={0.5}
        scale={0.6}
        speed={1.4}
        iterations={45}
        renderScale={0.4}
        targetFps={30}
        maxDpr={1}
      />
    </div>
  )
}
