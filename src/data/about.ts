// ─────────────────────────────────────────────────────────────────────────────
// TEXTOS DE LA PÁGINA /nosotros/ (pages/about/AboutPage.tsx).
//
// PROVISIONALES: la historia, la misión, la visión y los integrantes del equipo los debe dar la clínica.
// No se inventan años, cifras ni nombres: los hitos no llevan fecha y los lugares sin persona son marcadores ("Integrante N").
// Para poner una persona real: person('Profesión', 'Nombre', 'archivo') con la foto en public/images/equipo/archivo.webp.
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

// Valores: títulos de ejemplo hasta que la clínica confirme los suyos.
export const VALUES = {
  title: 'Nuestros valores',
  lead: 'Lo que nos guía en cada consulta, desde la primera llamada hasta el último ajuste.',
  items: [
    { id: 'respeto', icon: 'users', title: 'Respeto', text: 'Texto provisional: tratamos a cada paciente con paciencia y sin prisas.' },
    { id: 'honestidad', icon: 'shield', title: 'Honestidad', text: 'Texto provisional: explicamos cada opción de tratamiento con claridad.' },
    { id: 'calidad', icon: 'check', title: 'Calidad', text: 'Texto provisional: cuidamos los detalles del trabajo y del laboratorio.' },
    { id: 'cercania', icon: 'smile', title: 'Cercanía', text: 'Texto provisional: estamos disponibles para resolver tus dudas.' },
  ] satisfies { id: string; icon: IconName; title: string; text: string }[],
}

export const PURPOSE = [
  { id: 'mision', icon: 'target', title: 'Misión', text: 'Texto provisional: la misión de la clínica, en una o dos frases.' },
  { id: 'vision', icon: 'eye', title: 'Visión', text: 'Texto provisional: hacia dónde quiere llegar la clínica.' },
] satisfies { id: string; icon: IconName; title: string; text: string }[]

export interface Member {
  name: string
  /** Profesión: va arriba del nombre ("Doctora", "Licenciada"…). Sin ella solo se ve el nombre. */
  title?: string
  /** Foto en public/images/equipo/ (retrato con fondo blanco). Sin ella, la tarjeta lleva un icono. */
  photo?: string
}

const person = (title: string | undefined, name: string, photo: string): Member => ({ title, name, photo: `/images/equipo/${photo}.webp` })

// Marcadores para los lugares que aún no tienen persona, numerados a partir de `from`.
// shortcut: el número de lugares por área es un supuesto; se ajusta cuando la clínica mande su lista completa.
const placeholders = (count: number, from = 1): Member[] =>
  Array.from({ length: count }, (_, i) => ({ name: `Integrante ${from + i}` }))

export const TEAM = {
  title: 'Nuestro equipo',
  lead: 'Cinco áreas trabajando juntas para que tu visita sea sencilla, de la primera llamada al último ajuste.',
  areas: [
    {
      id: 'gerencia',
      icon: 'building',
      title: 'Gerencia',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      members: [person('Doctora', 'Abril Ramírez', 'abril-ramirez'), ...placeholders(3, 2)],
    },
    {
      id: 'doctores',
      icon: 'tooth',
      title: 'Doctores',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      members: [
        person('Doctora', 'Laura Tamez', 'laura-tamez'),
        person('Doctor', 'Sergio Palacio', 'sergio-palacio'),
        person('Doctor', 'Gustavo Garduño', 'gustavo-garduno'),
        person('Asistente', 'Fernanda López', 'fernanda-lopez'),
        ...placeholders(4, 5),
      ],
    },
    {
      id: 'administracion',
      icon: 'calendar',
      title: 'Administración',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      members: [
        person('Licenciada', 'Damaris Llamas', 'damaris-llamas'),
        person(undefined, 'Michelle López', 'michelle-lopez'),
        ...placeholders(2, 3),
      ],
    },
    // TDP: así lo dio la clínica (técnico del laboratorio dental, no de sistemas).
    {
      id: 'laboratorio',
      icon: 'crown',
      title: 'Laboratorio dental',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      members: [person('TDP', 'Isaac Ramírez', 'isaac-ramirez')],
    },
    { id: 'tecnico', icon: 'chip', title: 'Infraestructura tecnológica', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', members: placeholders(1) },
  ] satisfies { id: string; icon: IconName; title: string; text: string; members: Member[] }[],
}
