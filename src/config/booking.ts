// Configuración del formulario de citas (Google Calendar vía Google Apps Script).
// Guía de instalación: integrations/google-calendar/README.md
//
// PENDIENTE: confirmar días y horarios reales con la clínica. Deben coincidir
// con CONFIG en integrations/google-calendar/Code.gs, que es quien valida al final.

import { MORE_SERVICE_ROUTES, SERVICE_ROUTES } from '@/config/routes'

/**
 * Opciones del campo "Servicio de interés", en el orden en que se muestran (cambia el orden aquí).
 * Deben ser idénticas, y en el mismo orden, a SERVICES de integrations/google-calendar/Code.gs.
 */
const SERVICES = [
  'Valoración general',
  'Limpieza dental',
  'Implantes dentales',
  'All on 4 implants',
  'All on 6 implants',
  'Coronas',
  'Carillas dentales',
  'Blanqueamiento dental',
  'Cosmética dental',
  'Endodoncias',
  'Ortodoncia',
  'Alineadores',
  'Odontopediatría',
  'Diseño de sonrisa',
  'Dentaduras',
  'Periodoncia',
  'Extracciones simples y de juicio',
]

// Las páginas de servicio preseleccionan su servicio por nombre: si falta en la lista, falla al compilar.
for (const route of [...SERVICE_ROUTES, ...MORE_SERVICE_ROUTES]) {
  if (!SERVICES.includes(route.label)) throw new Error(`Falta "${route.label}" en SERVICES de src/config/booking.ts`)
}

export const BOOKING = {
  /** URL /exec de la aplicación web de Apps Script (variable VITE_BOOKING_ENDPOINT). */
  endpoint: (import.meta.env.VITE_BOOKING_ENDPOINT ?? '').trim(),
  /** Zona horaria de la clínica (igual que appsscript.json). */
  timeZone: 'America/Tijuana',
  /** Hasta cuántos días adelante se puede pedir cita. */
  daysAhead: 60,
  /** Días sin atención: 0 = domingo … 6 = sábado. */
  closedWeekdays: [0] as number[],
  /** Horarios que puede elegir el paciente (formato 24 h). */
  slots: ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00'],
  /** Opciones del campo "Servicio de interés". */
  services: SERVICES,
}

export const isBookingConfigured =
  /^https:\/\/script\.google\.com\//.test(BOOKING.endpoint) ||
  // Solo en desarrollo: permite probar con un servidor simulado local.
  (import.meta.env.DEV && /^http:\/\/localhost:\d+/.test(BOOKING.endpoint))
