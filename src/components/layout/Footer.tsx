// ─────────────────────────────────────────────────────────────────────────────
// FOOTER (pie de página de todas las páginas)
//
// Estructura: marca (logo, descripción, redes y botón) → columnas de enlaces → contacto → aviso legal.
// Para agregar o quitar enlaces/columnas NO edites este archivo: usa src/data/footer.ts.
// Los datos de contacto salen de src/config/site.ts. Estilos: src/styles/layout/footer.css.
// Fondo: hilos de luz animados (AuroraBackground, efecto "fibers") con los colores del hero.
// ─────────────────────────────────────────────────────────────────────────────

import { ariaCurrent, HOME, PRIVACY, scheduleHref } from '@/config/routes'
import { SITE } from '@/config/site'
import { FOOTER, FOOTER_COLUMNS, type FooterLink } from '@/data/footer'
import { AuroraBackground } from '@/components/decor/AuroraBackground'
import { SectionDecor } from '@/components/decor/SectionDecor'
import { AddressText } from '@/components/ui/AddressText'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'

// Año calculado al cargar el módulo (no durante el render).
const YEAR = new Date().getFullYear()

interface FooterProps {
  /** Ruta de la página actual: marca el enlace activo y decide a dónde apunta "Agendar visita". */
  currentPath: string
}

export function Footer({ currentPath }: FooterProps) {
  const agendaHref = scheduleHref(currentPath)
  // Los enlaces marcados con `schedule: true` apuntan a la agenda del homepage.
  const hrefOf = (link: FooterLink) => (link.schedule ? agendaHref : (link.href ?? '#'))

  return (
    <footer className="site-footer band band--night">
      <AuroraBackground theme="dark" effect="fibers" className="site-footer__fibers" />
      <div className="site-footer__scrim" aria-hidden="true" />
      {/* Ola blanca arriba: los hilos de luz llegan hasta la curva, sin franja lisa. */}
      <SectionDecor variant="wave" position="top" inverse />
      <div className="container">
        <div className="footer-grid">
          {/* Marca: logo, descripción, redes sociales y botón de agenda */}
          <div className="footer-brand">
            <Logo isHome={currentPath === HOME.path} loading="lazy" />
            <p className="footer-brand__text">{FOOTER.description}</p>
            <SocialLinks className="footer-social" />
            <a className="btn btn--primary btn--sm" href={agendaHref}>
              Agendar visita
            </a>
          </div>

          {/* Columnas de enlaces (definidas en data/footer.ts) */}
          {FOOTER_COLUMNS.map((column) => (
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
            <h2 className="footer-title">Contacto</h2>
            <address className="footer-contact">
              <a href={SITE.address.mapsUrl} target="_blank" rel="noopener">
                <Icon name="pin" size={18} />
                <span>
                  <AddressText />
                  <span className="visually-hidden"> (abre Google Maps en una pestaña nueva)</span>
                </span>
              </a>
              {SITE.phones.map((phone) => (
                <a key={phone.href} href={phone.href}>
                  <Icon name="phone" size={18} />
                  <span>
                    <span className="visually-hidden">{phone.label}: </span>
                    {phone.display}
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

        {/* Línea final: derechos y aviso de privacidad */}
        <div className="footer-bottom">
          <p>
            © <span suppressHydrationWarning>{YEAR}</span> {SITE.name}. Todos los derechos reservados.
          </p>
          <a href={PRIVACY.path} aria-current={ariaCurrent(PRIVACY.path, currentPath)}>
            {PRIVACY.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
