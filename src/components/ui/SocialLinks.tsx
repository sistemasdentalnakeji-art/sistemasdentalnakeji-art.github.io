import { useLang } from '@/app/lang'
import { SITE, SOCIAL_LINKS } from '@/config/site'
import { UI } from '@/data/ui'
import { cx } from '@/lib/cx'
import { BrandIcon } from '@/components/ui/BrandIcon'

interface SocialLinksProps {
  className?: string
  iconSize?: number
}

export function SocialLinks({ className, iconSize = 28 }: SocialLinksProps) {
  const ui = UI[useLang()]
  return (
    <ul className={cx('social-links', className)} aria-label={ui.socialLabel}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.id}>
          <a className="icon-button" href={link.href} target="_blank" rel="noopener">
            <BrandIcon name={link.id} size={iconSize} />
            <span className="visually-hidden">{ui.socialLink(link.label, SITE.name)}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
