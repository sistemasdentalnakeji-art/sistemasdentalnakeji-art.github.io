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
    { label: 'Los inicios', title: 'Un consultorio con una idea clara', text: 'Texto provisional sobre cómo y por qué nació la clínica.' },
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
  role: string
}

// shortcut: el número de marcadores por área es un supuesto; se ajusta cuando la clínica mande su lista.
const placeholders = (count: number, role: string): Member[] =>
  Array.from({ length: count }, (_, i) => ({ name: `Integrante ${i + 1}`, role }))

export const TEAM = {
  title: 'Nuestro equipo',
  lead: 'Cinco áreas trabajando juntas para que tu visita sea sencilla, de la primera llamada al último ajuste.',
  areas: [
    { id: 'gerencia', icon: 'building', title: 'Gerencia', text: 'Dirige la clínica y cuida la calidad de la atención.', members: placeholders(4, 'Gerencia') },
    { id: 'administracion', icon: 'calendar', title: 'Administración', text: 'Citas, pagos, aseguranzas y convenios.', members: placeholders(4, 'Administración') },
    { id: 'ventas', icon: 'users', title: 'Ventas', text: 'Te orientan sobre tratamientos, presupuestos y promociones.', members: placeholders(2, 'Asesor de pacientes') },
    { id: 'doctores', icon: 'tooth', title: 'Doctores', text: 'Especialistas que planean y realizan tu tratamiento.', members: placeholders(8, 'Cirujano dentista') },
    { id: 'tecnico', icon: 'chip', title: 'Equipo técnico', text: 'Laboratorio y asistentes que preparan cada pieza y cada sillón.', members: placeholders(1, 'Técnico dental') },
  ] satisfies { id: string; icon: IconName; title: string; text: string; members: Member[] }[],
}
