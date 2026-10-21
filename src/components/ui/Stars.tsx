import { useLang } from '@/app/lang'
import { UI } from '@/data/ui'
import { Icon } from '@/components/ui/Icon'

interface StarsProps {
  /** 0 a 5. `null` muestra estrellas neutras (marcador sin calificación). */
  rating: number | null
  size?: number
}

export function Stars({ rating, size = 18 }: StarsProps) {
  const ui = UI[useLang()].stars
  const label = rating === null ? ui.pending : ui.value(rating)
  return (
    <span className={`stars${rating === null ? ' stars--empty' : ''}`} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size={size}
          className={rating !== null && index < Math.round(rating) ? 'star is-filled' : 'star'}
        />
      ))}
    </span>
  )
}
