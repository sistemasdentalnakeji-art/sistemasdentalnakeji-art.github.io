// Adapted from Slit Type FAQ by kedhareswer on 21st.dev.
// Draft items are development-only. Remove draft when the clinic approves each answer.
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { useLang } from '@/app/lang'
import { routeOf, type Lang } from '@/config/routes'
import { SITE } from '@/config/site'
import { FAQ_GROUPS, FAQ_INTERFACE, FAQ_PAGE } from '@/data/faq'
import { UI } from '@/data/ui'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()

export function FaqPage() {
  const lang = useLang()
  return <FaqContent key={lang} lang={lang} />
}

function FaqContent({ lang }: { lang: Lang }) {
  const page = FAQ_PAGE[lang]
  const copy = FAQ_INTERFACE[lang]
  const soon = UI[lang].faqSoon
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [open, setOpen] = useState<string | null>('citas-1')
  const searchRef = useRef<HTMLInputElement>(null)
  const buttons = useRef(new Map<string, HTMLButtonElement>())
  const items = FAQ_GROUPS[lang].flatMap((group) => group.items
    .map((item, index) => ({ ...item, id: `${group.id}-${index + 1}`, category: group.id, topic: group.title, index }))
    .filter((item) => !item.draft || import.meta.env.DEV)
    .map((item) => item.draft ? {
      ...item, question: `${item.topic} · ${copy.sample} ${item.index + 1}`,
      answer: copy.sampleAnswer,
    } : item))
  const words = normalize(query).trim().split(/\s+/).filter(Boolean)
  const visible = items.filter((item) => (category === 'all' || item.category === category)
    && words.every((word) => normalize(`${item.question} ${item.answer} ${item.topic}`).includes(word)))
  const hasDrafts = items.some((item) => item.draft)
  const reset = () => { setQuery(''); setCategory('all'); setOpen(null) }
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number
    if (event.key === 'ArrowDown') next = (index + 1) % visible.length
    else if (event.key === 'ArrowUp') next = (index - 1 + visible.length) % visible.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = visible.length - 1
    else return
    event.preventDefault()
    buttons.current.get(visible[next].id)?.focus()
  }

  return (
    <Band tone="aurora" className="faq-page" labelledBy="faq-titulo">
      <div className="container">
        <header className="faq-head">
          <p className="page-eyebrow">FAQ</p>
          <h1 id="faq-titulo" className="faq-title" aria-label={page.title}>
            {copy.headline.map((line, lineIndex) => (
              <span className="faq-title__line" key={line} aria-hidden="true">
                {Array.from(line).map((letter, index) => (
                  <span className="faq-title__letter" key={index}
                    style={{ '--letter': index + lineIndex * 8 } as CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>
                ))}
              </span>
            ))}
          </h1>
          <div className="faq-intro">
            <p className="faq-intro__text">{page.lead}</p>
            <div className="faq-search" role="search" aria-label={copy.search}>
              <label htmlFor="faq-search">{copy.search}</label>
              <div className="faq-search__field">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
                <input id="faq-search" type="search" ref={searchRef} value={query} placeholder={copy.placeholder}
                  aria-controls="faq-results" onChange={(event) => { setQuery(event.target.value); setOpen(null) }} />
                {query && <button type="button" className="faq-search__clear" aria-label={copy.clear}
                  onClick={() => { setQuery(''); searchRef.current?.focus() }}>×</button>}
              </div>
            </div>
          </div>
        </header>

        {hasDrafts && <p className="faq-preview">{copy.preview}</p>}
        {items.length > 0 && <div className="faq-filters" role="group" aria-label={copy.categories}>
          {[{ id: 'all', title: copy.all }, ...FAQ_GROUPS[lang]].map((group) => (
            <button key={group.id} type="button" aria-pressed={category === group.id}
              onClick={() => { setCategory(group.id); setOpen(null) }}>{group.title}</button>
          ))}
        </div>}
        {items.length > 0 && <p className="faq-count" role="status" aria-live="polite" aria-atomic="true">
          {`${String(visible.length).padStart(2, '0')} ${copy.results}`}
        </p>}
        <div className="faq-list" id="faq-results">
          {visible.map((item, index) => {
            const expanded = open === item.id
            return <article className="faq-item" data-open={expanded} key={item.id}>
              <div className="faq-item__fill" aria-hidden="true" />
              <h2 className="faq-item__heading">
                <button className="faq-item__question" type="button" id={`q-${item.id}`}
                  aria-expanded={expanded} aria-controls={`a-${item.id}`}
                  ref={(node) => { if (node) buttons.current.set(item.id, node); else buttons.current.delete(item.id) }}
                  onKeyDown={(event) => onKey(event, index)} onClick={() => setOpen(expanded ? null : item.id)}>
                  <span className="faq-item__row"><span>{item.question}</span><span className="faq-item__plus" aria-hidden="true">+</span></span>
                  <span className="faq-item__row faq-item__row--inverse" aria-hidden="true"><span>{item.question}</span><span className="faq-item__plus">+</span></span>
                </button>
              </h2>
              <div className="faq-item__panel" id={`a-${item.id}`} aria-labelledby={`q-${item.id}`} role="region"
                aria-hidden={!expanded} inert={!expanded}>
                <div className="faq-item__panel-inner"><p className="faq-item__answer">{item.answer}</p></div>
              </div>
            </article>
          })}
          {visible.length === 0 && <div className="faq-empty">
            <h2>{items.length > 0 ? copy.empty : soon.title}</h2>
            <p>{items.length > 0 ? copy.emptyText : soon.text}</p>
            {items.length > 0
              ? <button type="button" className="btn btn--ghost" onClick={reset}>{copy.reset}</button>
              : <a className="btn btn--ghost" href={routeOf('contact', lang).path}>{soon.contact}</a>}
          </div>}
        </div>

        <aside className="faq-help" aria-labelledby="faq-ayuda">
          <div><h2 id="faq-ayuda">{page.helpTitle}</h2><p>{page.helpText}</p></div>
          <ExternalLink className="btn btn--secondary" href={SITE.social.whatsapp}>
            <Icon name="whatsapp" size={20} />{page.helpCta}
          </ExternalLink>
        </aside>
      </div>
    </Band>
  )
}
