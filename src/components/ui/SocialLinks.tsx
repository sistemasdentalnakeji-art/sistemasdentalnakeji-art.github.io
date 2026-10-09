import { SITE, SOCIAL_LINKS } from '@/config/site'
import { cx } from '@/lib/cx'
import { BrandIcon } from '@/components/ui/BrandIcon'

interface SocialLinksProps {
  className?: string
  iconSize?: number
}

export function SocialLinks({ className, iconSize = 20 }: SocialLinksProps) {
  return (
    <ul className={cx('social-links', className)}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <a className="icon-button" href={link.href} target="_blank" rel="noopener">
            <BrandIcon name={link.id} size={iconSize} />
            <span className="visually-hidden">
              {link.label} de {SITE.name} (se abre en una pestaña nueva)
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
