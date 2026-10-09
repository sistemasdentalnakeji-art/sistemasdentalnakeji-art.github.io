import type { ReactNode } from 'react'
import { ExternalLabel } from '@/components/ui/ExternalLabel'

interface ExternalLinkProps {
  href: string
  className?: string
  children: ReactNode
}

/** Enlace que abre una pestaña nueva y lo anuncia a lectores de pantalla. */
export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener">
      {children}
      <ExternalLabel />
    </a>
  )
}
