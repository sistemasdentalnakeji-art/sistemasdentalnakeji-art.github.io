// ─────────────────────────────────────────────────────────────────────────────
// FOOTER (pie de página de todas las páginas)
//
// Estructura: marca (logo, descripción, redes y botón) → columnas de enlaces → contacto → aviso legal.
// Para agregar o quitar enlaces/columnas NO edites este archivo: usa src/data/footer.ts.
// Los datos de contacto salen de src/config/site.ts. Estilos: src/styles/layout/footer.css.
// Fondo: hilos de luz animados (AuroraBackground, efecto "fibers") con los colores del hero.
// ─────────────────────────────────────────────────────────────────────────────

import { ariaCurrent, routeOf, scheduleHref, type RouteDef } from '@/config/routes'
import { SITE } from '@/config/site'
import { FOOTER_COLUMNS, type FooterLink } from '@/data/footer'
import { UI } from '@/data/ui'
import { AuroraBackground } from '@/components/decor/AuroraBackground'
import { SectionDecor } from '@/components/decor/SectionDecor'
import { AddressText } from '@/components/ui/AddressText'
import { BrandOrb } from '@/components/ui/BrandOrb'
import { Icon } from '@/components/ui/Icon'
import { MotionToggle } from '@/components/ui/MotionToggle'
import { SocialLinks } from '@/components/ui/SocialLinks'

// Año calculado al cargar el módulo (no durante el render). Queda fijo al del build del HTML estático;
// `suppressHydrationWarning` solo evita el aviso si el navegador cambia de año.
const YEAR = new Date().getFullYear()

interface FooterProps {
  /** Página actual: marca el enlace activo, decide a dónde apunta "Agendar visita" y a dónde lleva el botón de idioma. */
  route: RouteDef
}

export function Footer({ route }: FooterProps) {
  const currentPath = route.path
  const ui = UI[route.lang]
  const agendaHref = scheduleHref(route)
  // Los enlaces marcados con `schedule: true` apuntan a la agenda del homepage.
  const hrefOf = (link: FooterLink) => (link.schedule ? agendaHref : (link.href ?? '#'))

  return (
    <footer className="site-footer band band--night">
      <AuroraBackground theme="dark" effect="fibers" fiberCount={10} className="site-footer__fibers" />
      <div className="site-footer__scrim" aria-hidden="true" />
      {/* Ola blanca arriba: los hilos de luz llegan hasta la curva, sin franja lisa. */}
      <SectionDecor variant="wave" position="top" inverse />
      <div className="container">
        <div className="footer-grid">
          {/* Marca: el mismo orbe iluminado del hero (BrandOrb), a la izquierda de las listas */}
          <div className="footer-brand">
            <a className="footer-brand__mark" href={routeOf('home', route.lang).path}>
              <BrandOrb lazy />
              <span className="footer-brand__name">{SITE.name}</span>
            </a>
          </div>

          {/* Columnas de enlaces (definidas en data/footer.ts) */}
          {FOOTER_COLUMNS[route.lang].map((column) => (
            <nav key={column.id} className="footer-column" aria-labelledby={`footer-${column.id}`}>
              <h2 id={`footer-${column.id}`} className="footer-title">
                {column.title}
              </h2>
              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={hrefOf(link)}>
                    <a href={hrefOf(link)} aria-current={ariaCurrent(hrefOf(link), currentPath)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto: se llena con config/site.ts */}
          <div className="footer-column">
            <h2 className="footer-title">{ui.contact.title}</h2>
            <address className="footer-contact">
              <a href={SITE.address.mapsUrl} target="_blank" rel="noopener">
                <Icon name="pin" size={18} />
                <span>
                  <AddressText />
                  <span className="visually-hidden">{ui.opensMaps}</span>
                </span>
              </a>
              {SITE.phones.map((phone) => (
                <a key={phone.href} href={phone.href}>
                  <Icon name="phone" size={18} />
                  <span>
                    <span className="visually-hidden">{phone.labels[route.lang]}: </span>
                    {phone.displays[route.lang]}
                  </span>
                </a>
              ))}
              <a href={`mailto:${SITE.email}`}>
                <Icon name="mail" size={18} />
                <span>{SITE.email}</span>
              </a>
            </address>
          </div>
        </div>

        {/* Línea final: derechos, aviso de privacidad y términos */}
        <div className="footer-bottom">
          <p>
            © <span suppressHydrationWarning>{YEAR}</span> {SITE.name}. {ui.rights}
          </p>
          <SocialLinks className="footer-social" iconSize={34} />
          <ul className="footer-bottom__links">
            {(['privacy', 'terms'] as const).map((key) => {
              const legal = routeOf(key, route.lang)
              return (
                <li key={key}>
                  <a href={legal.path} aria-current={ariaCurrent(legal.path, currentPath)}>
                    {legal.label}
                  </a>
                </li>
              )
            })}
            <li>
              <MotionToggle />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
