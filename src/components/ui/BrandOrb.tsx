// ─────────────────────────────────────────────────────────────────────────────
// ORBE DE MARCA: isotipo dentro de un círculo oscuro con contorno luminoso (.siri) y halo que "respira".
// Lo usan el hero del homepage y el footer. Estilos → src/styles/components/brand-orb.css.
// Fuera de pantalla se pausa como todo .siri (pauseOffscreen en lib/motion.ts + preferences.css).
// ─────────────────────────────────────────────────────────────────────────────

export function BrandOrb({ lazy = false }: { lazy?: boolean }) {
  return (
    <span className="brand-orb siri" aria-hidden="true">
      <span className="brand-orb__halo" />
      <img
        className="brand-orb__mark"
        src="/favicon-192.webp"
        width={192}
        height={192}
        alt=""
        loading={lazy ? 'lazy' : undefined}
        decoding="async"
      />
    </span>
  )
}
