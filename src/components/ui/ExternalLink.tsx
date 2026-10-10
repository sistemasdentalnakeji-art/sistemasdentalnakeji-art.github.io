import type { ReactNode } from 'react'

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
      <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
    </a>
  )
}
