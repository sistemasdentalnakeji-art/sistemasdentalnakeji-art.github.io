import { useLang } from '@/app/lang'
import { UI } from '@/data/ui'

interface Crumb {
  label: string
  href?: string
}

/** Migas de pan: la última etiqueta es la página actual y no lleva enlace. */
export function BlogCrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label={UI[useLang()].blog.crumbs} className="blog-crumbs">
      <ol>
        {trail.map((c) => (
          <li key={c.label}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}
