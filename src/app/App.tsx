// ─────────────────────────────────────────────────────────────────────────────
// ESQUELETO DE TODAS LAS PÁGINAS
//
// Orden: enlace "Saltar al contenido" → Header → contenido de la página → Footer.
// Decide qué página mostrar según la URL (rutas, en /en/ y /es/, en src/config/routes.ts) y fija el idioma
// (LangContext) para todo el árbol. La página se elige por la CLAVE de la ruta (PAGES), igual en los dos idiomas:
// • home → HomePage (src/pages/home/HomePage.tsx).
// • services → ServicesPage (tarjetas de todos los servicios, src/pages/services/ServicesPage.tsx).
// • benefits → BenefitsPage (promociones, convenios y aseguranzas, src/pages/benefits/BenefitsPage.tsx).
// • promotions, agreements, insurance → PromotionsPage, AgreementsPage e InsurancePage (cada una con su diseño).
// • contact → ContactPage (teléfonos, dirección y redes, src/pages/contact/ContactPage.tsx).
// • about → AboutPage (historia, misión y visión, equipo; src/pages/about/AboutPage.tsx).
// • privacy, terms → PrivacyPage / TermsPage (src/pages/legal/).
// • faq → FaqPage (src/pages/faq/FaqPage.tsx).
// • Rutas con template 'service' y textos en src/data/services.ts → ServicePage (plantilla de servicio).
// • Cualquier otra ruta conocida → EmptyPage (destino en construcción, noindex).
// • Ruta desconocida → EmptyPage con el mensaje de "página no encontrada".
// ─────────────────────────────────────────────────────────────────────────────

import { LangContext } from '@/app/lang'
import { UI } from '@/data/ui'
import { findRoute, type RouteKey, type ServiceKey } from '@/config/routes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/home/HomePage'
import { EmptyPage } from '@/pages/empty/EmptyPage'
import { ServicePage } from '@/pages/service/ServicePage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { BenefitsPage } from '@/pages/benefits/BenefitsPage'
import { PromotionsPage } from '@/pages/promotions/PromotionsPage'
import { AgreementsPage } from '@/pages/agreements/AgreementsPage'
import { ContactPage } from '@/pages/contact/ContactPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { PrivacyPage } from '@/pages/legal/PrivacyPage'
import { TermsPage } from '@/pages/legal/TermsPage'
import { FaqPage } from '@/pages/faq/FaqPage'
import { InsurancePage } from '@/pages/insurance/InsurancePage'
import { SERVICE_PAGES } from '@/data/services'

interface AppProps {
  path: string
}

/** Páginas con componente propio, por clave de ruta (cada una lee su idioma con useLang). */
const PAGES: Partial<Record<RouteKey, () => React.JSX.Element>> = {
  home: HomePage,
  services: ServicesPage,
  benefits: BenefitsPage,
  promotions: PromotionsPage,
  agreements: AgreementsPage,
  insurance: InsurancePage,
  contact: ContactPage,
  about: AboutPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  faq: FaqPage,
}

export function App({ path }: AppProps) {
  const route = findRoute(path)
  const Page = PAGES[route.key]
  const service = route.template === 'service' ? SERVICE_PAGES[route.lang][route.key as ServiceKey] : undefined

  return (
    <LangContext value={route.lang}>
      <a className="skip-link" href="#contenido">
        {UI[route.lang].skipLink}
      </a>
      <Header route={route} />
      <main id="contenido" tabIndex={-1}>
        {Page ? (
          <Page />
        ) : service ? (
          <ServicePage route={route} content={service} />
        ) : (
          <EmptyPage route={route} />
        )}
      </main>
      <Footer route={route} />
    </LangContext>
  )
}
