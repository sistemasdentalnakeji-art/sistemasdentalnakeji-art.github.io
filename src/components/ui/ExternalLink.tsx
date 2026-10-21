import { LiquidGlassContent } from '@/components/ui/AnimatedButtons'
import type { ReactNode } from 'react'
import { useLang } from '@/app/lang'
import { SITE } from '@/config/site'
import { UI } from '@/data/ui'
import { cx } from '@/lib/cx'

interface ExternalLinkProps {
  href: string
  className?: string
  children: ReactNode
}

/** Enlace que abre una pestaña nueva y lo anuncia a lectores de pantalla. */
export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  const whatsapp = href === SITE.social.whatsapp
  const ui = UI[useLang()]
  return (
    <a className={cx(className, whatsapp && 'liquid-glass')} href={href} target="_blank" rel="noopener">
      {whatsapp ? <LiquidGlassContent>{children}</LiquidGlassContent> : children}
      <span className="visually-hidden">{ui.opensNewTab}</span>
    </a>
  )
}
