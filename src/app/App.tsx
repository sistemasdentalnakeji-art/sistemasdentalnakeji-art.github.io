// ─────────────────────────────────────────────────────────────────────────────
// ESQUELETO DE TODAS LAS PÁGINAS
//
// Orden: enlace "Saltar al contenido" → Header → contenido de la página → Footer.
// Decide qué página mostrar según la URL (rutas en src/config/routes.ts):
// • "/" → HomePage (src/pages/home/HomePage.tsx).
// • "/servicios/" → ServicesPage (tarjetas de todos los servicios, src/pages/services/ServicesPage.tsx).
// • "/beneficios/" → BenefitsPage (promociones, convenios y aseguranzas, src/pages/benefits/BenefitsPage.tsx).
// • "/nuestras-promociones/", "/convenios/" y "/insurance/" → PromotionsPage, AgreementsPage e InsurancePage (cada una con su diseño).
// • "/contacto/" → ContactPage (teléfonos, dirección y redes, src/pages/contact/ContactPage.tsx).
// • "/nosotros/" → AboutPage (historia, misión y visión, equipo; src/pages/about/AboutPage.tsx).
// • "/aviso-de-privacidad/", "/terminos-y-condiciones/" → PrivacyPage / TermsPage (src/pages/legal/).
// • "/preguntas-frecuentes/" → FaqPage (src/pages/faq/FaqPage.tsx).
// • Rutas con template 'service' y textos en src/data/services.ts → ServicePage (plantilla de servicio).
// • Cualquier otra ruta conocida → EmptyPage (destino en construcción, noindex).
// • Ruta desconocida → EmptyPage con el mensaje de "página no encontrada".
// ─────────────────────────────────────────────────────────────────────────────

import { ABOUT, AGREEMENTS, BENEFITS, CONTACT, FAQ, findRoute, HOME, INSURANCE, NOT_FOUND, PRIVACY, PROMOTIONS_PAGE, SERVICES, TERMS } from '@/config/routes'
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
        ) : route === PROMOTIONS_PAGE ? (
          <PromotionsPage />
        ) : route === AGREEMENTS ? (
          <AgreementsPage />
        ) : route === INSURANCE ? (
          <InsurancePage />
        ) : route === CONTACT ? (
          <ContactPage />
        ) : route === ABOUT ? (
          <AboutPage />
        ) : route === PRIVACY ? (
          <PrivacyPage />
        ) : route === TERMS ? (
          <TermsPage />
        ) : route === FAQ ? (
          <FaqPage />
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
