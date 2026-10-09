// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "CONTACTO Y UBICACIÓN": datos de contacto, redes sociales y mapa de Google.
//
// • Dirección, teléfonos, correo, horario y mapa → src/config/site.ts.
// • Título y texto → src/data/home.ts (CONTACT_SECTION).
// • Estilos → src/styles/pages/home/contact.css.
// ─────────────────────────────────────────────────────────────────────────────

import { SITE } from '@/config/site'
import { CONTACT_SECTION } from '@/data/home'
import { AddressText } from '@/components/ui/AddressText'
import { Band } from '@/components/decor/Band'
import { ContactItem } from '@/components/ui/ContactItem'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionDecor } from '@/components/decor/SectionDecor'
import { SectionIntro } from '@/components/ui/SectionIntro'
import { SocialLinks } from '@/components/ui/SocialLinks'

const { address } = SITE

export function ContactLocation() {
  return (
    <Band
      id="ubicacion"
      tone="white"
      labelledBy="contacto-titulo"
      waveTop="flip"
      decor={<SectionDecor variant="rings" placement="contact" />}
    >
      <div className="container">
        <div className="contact">
          <div className="contact__info">
            <SectionIntro icon="pin" id="contacto-titulo" title={CONTACT_SECTION.title} text={CONTACT_SECTION.text} />

            <address>
              <ul className="contact-list">
                <ContactItem icon="pin" label="Dirección">
                  <span className="contact-item__value contact-item__value--text">
                    <AddressText />
                  </span>
                  <ExternalLink className="text-link" href={address.mapsUrl}>
                    Cómo llegar
                  </ExternalLink>
                </ContactItem>
                {SITE.phones.map((phone) => (
                  <ContactItem key={phone.href} icon="phone" label={phone.label}>
                    <a className="contact-item__value" href={phone.href}>
                      {phone.display}
                    </a>
                  </ContactItem>
                ))}
                <ContactItem icon="mail" label="Correo">
                  <a className="contact-item__value contact-item__value--email" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </ContactItem>
                {SITE.hours.length > 0 && (
                  <ContactItem icon="clock" label="Horario">
                    {SITE.hours.map((row) => (
                      <span key={row.days} className="contact-item__value contact-item__value--text">
                        {row.days}: {row.hours}
                      </span>
                    ))}
                  </ContactItem>
                )}
              </ul>
            </address>

            <div className="contact__social">
              <SectionDecor variant="rings" placement="contact-mobile" />
              <span className="contact-item__label">Síguenos</span>
              <SocialLinks />
            </div>
          </div>

          <div className="contact__map">
            <iframe
              title={`Mapa de ubicación de ${SITE.name} en ${address.city}`}
              src={address.mapEmbedUrl}
              width={600}
              height={480}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Band>
  )
}
