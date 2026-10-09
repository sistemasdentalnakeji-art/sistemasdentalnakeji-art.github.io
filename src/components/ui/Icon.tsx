// Iconos SVG en línea (sin dependencias). Son decorativos: el texto accesible
// siempre lo aporta el elemento que los contiene.

const PATHS = {
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.6 21.5v-8.2h2.8l.4-3.3h-3.2V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.4v3.3h2.8v8.2h3.4z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.6 20.4l1.3-4.2a8.4 8.4 0 1 1 3.2 3z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M9 8.7c0-.5.4-.9.8-.9h.6c.3 0 .5.2.6.4l.6 1.5c.1.3 0 .6-.2.8l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.5-.3.8-.2l1.5.6c.3.1.4.4.4.6v.6c0 .5-.4.8-.9.8A6.4 6.4 0 0 1 9 8.7z"
      />
    </>
  ),
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronLeft: <path d="M14.5 6l-6 6 6 6" />,
  chevronRight: <path d="M9.5 6l6 6-6 6" />,
  star: (
    <path d="M12 3.6l2.5 5.1 5.6.8-4.1 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: (
    <path d="M6.2 3.8h2.6l1.4 3.6-1.8 1.3a10.5 10.5 0 0 0 6.9 6.9l1.3-1.8 3.6 1.4v2.6a1.9 1.9 0 0 1-1.9 1.9A15.9 15.9 0 0 1 4.3 5.7a1.9 1.9 0 0 1 1.9-1.9z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  tooth: (
    <path d="M7.6 3.6c-2.4 0-4 1.9-4 4.4 0 2 .8 3.4 1.3 5.3.6 2.3.7 7.2 2.7 7.2 1.7 0 1.6-4.7 4.4-4.7s2.7 4.7 4.4 4.7c2 0 2.1-4.9 2.7-7.2.5-1.9 1.3-3.3 1.3-5.3 0-2.5-1.6-4.4-4-4.4-1.8 0-2.7 1-4.4 1s-2.6-1-4.4-1z" />
  ),
  implant: (
    <>
      <path d="M7.2 4.6c0-.9.8-1.6 1.7-1.6h6.2c.9 0 1.7.7 1.7 1.6 0 2.1-1 3.9-2.1 3.9H9.3c-1.1 0-2.1-1.8-2.1-3.9z" />
      <path d="M9.6 8.5h4.8l-.5 9.6L12 21l-1.9-2.9z" />
      <path d="M9.8 11.6h4.4M10 14.4h4M10.2 17.1h3.6" />
    </>
  ),
  aligner: (
    <>
      <path d="M3.5 9.5c2.2 6.2 14.8 6.2 17 0" />
      <path d="M3.5 9.5h17" />
      <path d="M7.5 9.5v2.9M12 9.5v3.8M16.5 9.5v2.9" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5l1.7 4.9 4.8 1.7-4.8 1.7L11 16.7l-1.7-4.9-4.8-1.7 4.8-1.7z" />
      <path d="M18 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  building: (
    <path d="M4.5 20.5V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15.5M14.5 9h4a1 1 0 0 1 1 1v10.5M3 20.5h18M8 8h3M8 12h3M8 16h3" />
  ),
} as const

export type IconName = keyof typeof PATHS

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
