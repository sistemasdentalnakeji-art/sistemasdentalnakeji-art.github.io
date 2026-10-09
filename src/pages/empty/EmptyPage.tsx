// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA VACÍA: contenedor para los destinos que aún no tienen contenido (y para el 404).
// Estas páginas se generan con "noindex" para que Google no las indexe todavía.
// Estilos → src/styles/pages/empty.css.
// ─────────────────────────────────────────────────────────────────────────────

import type { RouteDef } from '@/config/routes'
import { Band } from '@/components/decor/Band'
import { SectionDecor } from '@/components/decor/SectionDecor'

interface EmptyPageProps {
  route: RouteDef
  message?: string
}

/** Contenedor reutilizable para destinos que aún no tienen contenido (noindex). */
export function EmptyPage({ route, message = 'Esta sección estará disponible próximamente.' }: EmptyPageProps) {
  return (
    <Band className="empty-page" tone="white" labelledBy="pagina-titulo" decor={<SectionDecor variant="arcs" />}>
      <div className="container empty-page__inner">
        <h1 id="pagina-titulo" className="empty-page__title">
          {route.label}
        </h1>
        <p className="section-text">{message}</p>
        <a className="text-link" href="/">
          Volver a Inicio
        </a>
      </div>
    </Band>
  )
}
