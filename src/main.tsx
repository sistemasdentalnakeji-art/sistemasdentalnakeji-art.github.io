// ─────────────────────────────────────────────────────────────────────────────
// PUNTO DE ENTRADA EN EL NAVEGADOR
//
// Carga los estilos globales y monta la aplicación (<App />) dentro de <div id="root">.
// • Si la página ya viene prerenderizada (HTML generado al compilar), solo la "hidrata":
//   React toma el HTML existente y le agrega la interactividad, sin volver a dibujarlo.
// • En desarrollo (npm run dev) no hay HTML previo: dibuja la página desde cero.
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { findRoute } from '@/config/routes'
import { applyHead } from '@/seo/head'
import '@/styles/index.css'

const container = document.getElementById('root')!
const path = window.location.pathname
const route = findRoute(path)
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
)

if (container.dataset.path === route.path) {
  // HTML prerenderizado para esta ruta: solo se hidrata.
  hydrateRoot(container, app)
} else {
  // Desarrollo (sin prerender) o una URL sin HTML propio.
  applyHead(route)
  createRoot(container).render(app)
}
