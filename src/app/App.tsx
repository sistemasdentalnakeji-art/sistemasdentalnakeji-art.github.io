// ─────────────────────────────────────────────────────────────────────────────
// ESQUELETO DE TODAS LAS PÁGINAS
//
// Orden: enlace "Saltar al contenido" → Header → contenido de la página → Footer.
// Decide qué página mostrar según la URL (rutas en src/config/routes.ts):
// • "/" → HomePage (src/pages/home/HomePage.tsx).
// • "/servicios/" → ServicesPage (tarjetas de todos los servicios, src/pages/services/ServicesPage.tsx).
// • "/beneficios/" → BenefitsPage (promociones, convenios y aseguranzas, src/pages/benefits/BenefitsPage.tsx).
// • Rutas con template 'service' y textos en src/data/services.ts → ServicePage (plantilla de servicio).
// • Cualquier otra ruta conocida → EmptyPage (destino en construcción, noindex).
// • Ruta desconocida → EmptyPage con el mensaje de "página no encontrada".
// ─────────────────────────────────────────────────────────────────────────────

import { BENEFITS, findRoute, HOME, NOT_FOUND, SERVICES } from '@/config/routes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/home/HomePage'
import { EmptyPage } from '@/pages/empty/EmptyPage'
import { ServicePage } from '@/pages/service/ServicePage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { BenefitsPage } from '@/pages/benefits/BenefitsPage'
import { SERVICE_PAGES } from '@/data/services'

interface AppProps {
  path: string
}

export function App({ path }: AppProps) {
  const route = findRoute(path)
  const service = route.template === 'service' ? SERVICE_PAGES[route.path] : undefined

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header currentPath={route.path} />
      <main id="contenido" tabIndex={-1}>
        {route === HOME ? (
          <HomePage />
        ) : route === SERVICES ? (
          <ServicesPage />
        ) : route === BENEFITS ? (
          <BenefitsPage />
        ) : service ? (
          <ServicePage route={route} content={service} />
        ) : (
          <EmptyPage
            route={route}
            message={route === NOT_FOUND ? 'La página que buscas no existe o cambió de dirección.' : undefined}
          />
        )}
      </main>
      <Footer currentPath={route.path} />
    </>
  )
}
