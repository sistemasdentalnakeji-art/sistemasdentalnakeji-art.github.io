import type { RouteDef } from '@/config/routes'
import { BlogPage } from '@/pages/blog/BlogPage'
import { BlogCategoryPage } from '@/pages/blog/BlogCategoryPage'
import { BlogArticlePage } from '@/pages/blog/BlogArticlePage'
import { articleOf, categoryOf } from '@/pages/blog/blogData'

/** Elige la vista del blog según la clave de la ruta: hub (`blog`), categoría o artículo (`blog:<clave>`), en el idioma de la ruta. */
export function BlogRoute({ route }: { route: RouteDef }) {
  if (route.key === 'blog') return <BlogPage route={route} />
  const key = route.key.slice('blog:'.length)
  const category = categoryOf(route.lang, key)
  if (category) return <BlogCategoryPage route={route} category={category} />
  const article = articleOf(route.lang, key)
  if (!article) throw new Error(`Blog sin contenido para ${route.key} (${route.lang})`)
  return <BlogArticlePage route={route} article={article} />
}
