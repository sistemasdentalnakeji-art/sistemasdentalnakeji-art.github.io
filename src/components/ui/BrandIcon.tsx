// Logos de marca de las redes sociales, en sus colores originales.
// Se usan en SocialLinks (header, footer y contacto). Son decorativos: el texto accesible
// lo aporta el enlace que los contiene.

import { useId } from 'react'

export type BrandName = 'facebook' | 'instagram' | 'whatsapp'

interface BrandIconProps {
  name: BrandName
  size?: number
}

export function BrandIcon({ name, size = 20 }: BrandIconProps) {
  const gradientId = useId()

  if (name === 'facebook') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          fill="#FFFFFF"
          d="M13.6 19.5v-6h2.1l.3-2.5h-2.4V9.5c0-.7.2-1.2 1.2-1.2h1.3V6.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V11H8.9v2.5h2.1v6z"
        />
      </svg>
    )
  }

  if (name === 'instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#FED576" />
            <stop offset="26%" stopColor="#F47133" />
            <stop offset="61%" stopColor="#BC3081" />
            <stop offset="100%" stopColor="#4C63D2" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${gradientId})`} />
        <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="15.9" cy="8.1" r="0.9" fill="#FFFFFF" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#FFFFFF"
        d="M12 4.2a7.8 7.8 0 0 0-6.7 11.7L4.2 19.8l4-1.1A7.8 7.8 0 1 0 12 4.2zm0 14.2c-1.3 0-2.5-.4-3.6-1l-.3-.2-2.4.6.6-2.3-.2-.3A6.4 6.4 0 1 1 12 18.4zm3.5-4.8c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0a5.2 5.2 0 0 1-2.6-2.3c-.2-.3.2-.3.5-1 .1-.1 0-.2 0-.3l-.6-1.4c-.2-.4-.3-.4-.4-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"
      />
    </svg>
  )
}
