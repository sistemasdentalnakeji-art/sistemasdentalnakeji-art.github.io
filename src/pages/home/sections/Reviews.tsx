// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN "RESEÑAS DE GOOGLE": resumen de calificación + carrusel de reseñas.
//
// • Reseñas y calificación → src/data/reviews.ts (hoy son marcadores de diseño).
// • Título y texto → src/data/home.ts (REVIEWS_SECTION).
// • Estilos → src/styles/pages/home/reviews.css.
// ─────────────────────────────────────────────────────────────────────────────

import { REVIEWS, REVIEWS_SUMMARY, type Review } from '@/data/reviews'
import { REVIEWS_SECTION } from '@/data/home'
import { Carousel } from '@/components/ui/Carousel'
import { Band } from '@/components/decor/Band'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Icon } from '@/components/ui/Icon'
import { Stars } from '@/components/ui/Stars'

function ReviewCard({ review }: { review: Review }) {
  const initial = review.author.trim().charAt(0).toUpperCase()
  return (
    <article className="card review-card">
      <header className="review-card__header">
        {review.photoUrl ? (
          <img
            className="review-card__avatar"
            src={review.photoUrl}
            width={44}
            height={44}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="review-card__avatar" aria-hidden="true">
            {initial}
          </span>
        )}
        <div>
          <h3 className="review-card__author">
            {review.authorUrl ? (
              <ExternalLink href={review.authorUrl}>{review.author}</ExternalLink>
            ) : (
              review.author
            )}
          </h3>
          <p className="review-card__time">{review.relativeTime}</p>
        </div>
      </header>
      <Stars rating={review.rating} />
      <p className="review-card__text">{review.text}</p>
    </article>
  )
}

export function Reviews() {
  const { rating, total, profileUrl } = REVIEWS_SUMMARY
  return (
    <Band tone="tint" labelledBy="resenas-titulo" waveTop="plain">
      <div className="container">
        <header className="section-head">
          <p className="pill">
            <Icon name="star" size={16} />
            {REVIEWS_SECTION.eyebrow}
          </p>
          <h2 id="resenas-titulo" className="section-title section-title--spaced">
            {REVIEWS_SECTION.title}
          </h2>
          <p className="section-text">{REVIEWS_SECTION.text}</p>
        </header>

        <div className="reviews">
          <aside className="card reviews-summary" aria-label="Resumen de calificaciones">
            <p className="reviews-summary__score">{rating === null ? '–' : rating.toFixed(1)}</p>
            <Stars rating={rating} size={22} />
            <p className="card-text">
              {total === null ? 'Calificación en Google' : `Basado en ${total} reseñas de Google`}
            </p>
            <ExternalLink className="btn btn--ghost" href={profileUrl}>
              {REVIEWS_SECTION.cta}
            </ExternalLink>
          </aside>

          <Carousel
            label="Reseñas de pacientes"
            className="carousel--reviews"
            items={REVIEWS.map((review) => (
              <ReviewCard review={review} />
            ))}
          />
        </div>
      </div>
    </Band>
  )
}
