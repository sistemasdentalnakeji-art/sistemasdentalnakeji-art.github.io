// Puntos de quiebre del sitio: la misma lista que src/styles/global/tokens.css. Si cambia uno, cambia en los dos lados.

export const BP = { xs: 400, sm: 600, md: 768, lg: 960, nav: 1080, xl: 1280, wide: 1600, fhd: 1920 } as const

/** "Desde" este ancho (igual que `@media (width >= …px)`). */
export const atLeast = (px: number) => `(min-width: ${px}px)`

/** "Antes de" este ancho (igual que `@media (width < …px)`). */
export const below = (px: number) => `(max-width: ${px - 0.02}px)`
