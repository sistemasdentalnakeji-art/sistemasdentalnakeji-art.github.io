// Configuración del formulario de citas (Google Calendar vía Google Apps Script).
// Guía de instalación: integrations/google-calendar/README.md
//
// PENDIENTE: confirmar días y horarios reales con la clínica. Deben coincidir
// con CONFIG en integrations/google-calendar/Code.gs, que es quien valida al final.

import { SERVICE_ROUTES } from '@/config/routes'

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
  services: ['Valoración general / no estoy seguro', ...SERVICE_ROUTES.map((route) => route.label)],
}

export const isBookingConfigured =
  /^https:\/\/script\.google\.com\//.test(BOOKING.endpoint) ||
  // Solo en desarrollo: permite probar con un servidor simulado local.
  (import.meta.env.DEV && /^http:\/\/localhost:\d+/.test(BOOKING.endpoint))
