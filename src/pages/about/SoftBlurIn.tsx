import { useEffect, useRef, type CSSProperties } from 'react'

/** Entrada de título basada en Soft Blur In de SmoothUI. */
export function SoftBlurIn({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const title = ref.current
    if (!title || typeof IntersectionObserver === 'undefined') {
      title?.setAttribute('data-visible', '')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        title.setAttribute('data-visible', '')
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(title)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className="soft-blur-in" aria-label={children}>
      {Array.from(children).map((character, index) => (
        <span
          key={index}
          className="soft-blur-in__character"
          aria-hidden="true"
          style={{ '--character': index } as CSSProperties}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  )
}
