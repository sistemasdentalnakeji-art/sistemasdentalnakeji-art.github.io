// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LA PÁGINA /nosotros/ (pages/about/AboutPage.tsx).
//
// PROVISIONALES: la historia, la misión, la visión y los integrantes del equipo los debe dar la clínica.
// No se inventan años, cifras ni nombres: los hitos no llevan fecha y cada integrante es un marcador ("Integrante N").
// Para poner una persona real: cambia `name` y `role` (las fotos se agregan cuando la clínica las mande).
// ─────────────────────────────────────────────────────────────────────────────

import type { IconName } from '@/components/ui/Icon'

export const ABOUT_INTRO = {
  eyebrow: 'Nosotros',
  title: 'Las personas detrás de tu sonrisa',
  lead: 'Conoce cómo empezó Dental Nakeji, qué nos mueve cada día y al equipo que te recibe en la Zona Río de Tijuana.',
}

export const HISTORY = {
  title: 'Nuestra historia',
  lead: 'Texto provisional: la clínica nos compartirá su historia.',
  // `photo: true` deja debajo del texto un espacio vacío para la foto (llega después).
  milestones: [
    { label: 'Los inicios', title: 'Un consultorio con una idea clara', text: 'Texto provisional sobre cómo y por qué nació la clínica.', photo: true },
    { label: 'Crecimiento', title: 'Más especialidades bajo el mismo techo', text: 'Texto provisional sobre la llegada de nuevos doctores y tratamientos.', photo: true },
    { label: 'Tecnología', title: 'Laboratorio y equipo propios', text: 'Texto provisional sobre el laboratorio y la tecnología de la clínica.', photo: true },
    { label: 'Hoy', title: 'Pacientes de ambos lados de la frontera', text: 'Texto provisional sobre la clínica hoy y los pacientes que atiende.', photo: true },
  ],
}

export const PURPOSE = [
  { id: 'mision', icon: 'target', title: 'Misión', text: 'Texto provisional: la misión de la clínica, en una o dos frases.' },
  { id: 'vision', icon: 'eye', title: 'Visión', text: 'Texto provisional: hacia dónde quiere llegar la clínica.' },
] satisfies { id: string; icon: IconName; title: string; text: string }[]

interface Member {
  name: string
}

// Marcadores hasta que la clínica mande la lista. Dentro de cada tarjeta solo va el nombre (sin cargo).
// shortcut: el número de marcadores por área es un supuesto; se ajusta cuando la clínica mande su lista.
const placeholders = (count: number): Member[] => Array.from({ length: count }, (_, i) => ({ name: `Integrante ${i + 1}` }))

export const TEAM = {
  title: 'Nuestro equipo',
  lead: 'Cinco áreas trabajando juntas para que tu visita sea sencilla, de la primera llamada al último ajuste.',
  areas: [
    { id: 'gerencia', icon: 'building', title: 'Gerencia', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(4) },
    { id: 'doctores', icon: 'tooth', title: 'Doctores', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(8) },
    { id: 'administracion', icon: 'calendar', title: 'Administración', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(4) },
    { id: 'tecnico', icon: 'chip', title: 'Infraestructura tecnológica', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(1) },
    { id: 'ventas', icon: 'users', title: 'Ventas', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(1) },
  ] satisfies { id: string; icon: IconName; title: string; text: string; members: Member[] }[],
}
