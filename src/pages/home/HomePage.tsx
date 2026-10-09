// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE: arma la página de inicio con sus secciones, en el orden en que se ven.
//
// Para mover, quitar o agregar una sección, edita la lista de abajo.
// Cada sección vive en ./sections/ y sus textos en src/data/ (home.ts y otros).
// Estilos de las secciones: src/styles/pages/home/.
// ─────────────────────────────────────────────────────────────────────────────

import { Hero } from '@/pages/home/sections/Hero'
import { CareStory } from '@/pages/home/sections/CareStory'
import { Schedule } from '@/pages/home/sections/Schedule'
import { FeaturedServices } from '@/pages/home/sections/FeaturedServices'
import { Partners } from '@/pages/home/sections/Partners'
import { Reviews } from '@/pages/home/sections/Reviews'
import { ContactLocation } from '@/pages/home/sections/ContactLocation'

export function HomePage() {
  return (
    <>
      {/* Primera pantalla con la aurora */}
      <Hero />
      {/* Tres mensajes animados con el scroll */}
      <CareStory />
      {/* Agenda tu visita + formulario (id="agendar") */}
      <Schedule />
      {/* Servicios destacados */}
      <FeaturedServices />
      {/* Aseguranzas y convenios */}
      <Partners />
      {/* Reseñas de Google */}
      <Reviews />
      {/* Contacto y ubicación (id="ubicacion") */}
      <ContactLocation />
    </>
  )
}
