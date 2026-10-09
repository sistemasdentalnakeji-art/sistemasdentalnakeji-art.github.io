import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/components/ui/Icon'

interface ContactItemProps {
  icon: IconName
  label: string
  children: ReactNode
}

/** Fila de la lista de contacto: ícono, etiqueta y valor. */
export function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <li className="contact-item">
      <span className="contact-item__icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="contact-item__body">
        <span className="contact-item__label">{label}</span>
        {children}
      </span>
    </li>
  )
}
