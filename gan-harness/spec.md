# Brief: rediseño del formulario de citas

Rediseño completo (no un retoque) del formulario de reservación de Dental Nakeji: moderno, elegante y profesional, para el sector salud.

## Alcance
- Componente compartido: `src/features/booking/BookingForm.tsx` (+ estilos del formulario en `src/styles/pages/home/schedule.css`).
- Se usa en la homepage y, vía `Schedule`, en las 16 páginas individuales de servicio (ya lo tienen todas; el catálogo `/servicios/` y las páginas vacías no).
- En páginas de servicio se adapta con la info existente (servicio preseleccionado en el texto de apoyo).

## Libertad creativa
Estructura, agrupación de campos, inputs/selects/botones, bordes, fondos, microinteracciones, escritorio y móvil.
Inspiración: React Bits, 21st.dev, Aceternity UI, Shadcnblocks (solo ideas, código propio).

## Restricciones
- Paleta existente (tokens en `styles/global/tokens.css`). Tipografía actual (Manrope / Inter).
- No alterar lógica, validaciones ni conexión con Apps Script (`booking.ts`, `config/booking.ts`, `Code.gs`).
- Sin dependencias nuevas. No tocar secciones ajenas al formulario.
- No inventar servicios, campos obligatorios ni información médica.
- Accesibilidad: etiquetas, errores con aria, foco visible, `prefers-reduced-motion`.
