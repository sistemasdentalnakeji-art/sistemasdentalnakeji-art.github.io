import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/ui/Icon'

interface ContactItemProps {
  icon: IconName
  label: string
  children: ReactNode
  /** true = contorno luminoso (.siri) en la fila y en su ícono. */
  siri?: boolean
}

/** Fila de la lista de contacto: ícono, etiqueta y valor. */
export function ContactItem({ icon, label, children, siri }: ContactItemProps) {
  return (
    <li className={siri ? 'contact-item siri' : 'contact-item'}>
      <span className={siri ? 'contact-item__icon siri' : 'contact-item__icon'}>
        <Icon name={icon} size={20} />
      </span>
      <span className="contact-item__body">
        <span className="contact-item__label">{label}</span>
        {children}
      </span>
    </li>
  )
}
