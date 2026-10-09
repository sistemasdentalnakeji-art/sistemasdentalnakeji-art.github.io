# Formulario de citas → Google Calendar

El formulario del homepage (sección **Agenda tu visita**) envía cada solicitud a una
**aplicación web de Google Apps Script** que vive en la cuenta de Google de la clínica.
El script valida los datos, revisa que el horario esté libre y crea un evento amarillo
"Solicitud de cita" en Google Calendar. La clínica confirma después por teléfono o WhatsApp.

No hace falta servidor propio ni claves secretas.

## 1. Preparar el calendario (recomendado)
1. Entra a Google Calendar con la cuenta de la clínica.
2. **Otros calendarios → + → Crear calendario**, por ejemplo "Citas web". Déjalo **privado**:
   los eventos incluyen nombre, teléfono y servicio del paciente.
3. En la configuración de ese calendario, copia el **ID del calendario** (sección "Integrar calendario").

## 2. Crear el script
1. Abre <https://script.google.com> con la misma cuenta → **Nuevo proyecto**. Nómbralo "Dental Nakeji – Citas".
2. Borra el contenido de `Código.gs` y pega el de [`Code.gs`](Code.gs).
3. **Configuración del proyecto (⚙)** → activa *Mostrar el archivo de manifiesto "appsscript.json"*.
   Abre `appsscript.json` y reemplázalo con [`appsscript.json`](appsscript.json) (zona horaria `America/Tijuana`).
4. En `CONFIG` (arriba de `Code.gs`) ajusta:
   - `CALENDAR_ID`: el ID del paso 1 (vacío = calendario principal).
   - `CLOSED_WEEKDAYS`, `SLOTS`, `DURATION_MINUTES`: **horario real de la clínica**.
   - `NOTIFY_EMAIL`: correo que recibirá un aviso por cada solicitud (opcional).

> Los horarios deben coincidir con `src/config/booking.ts` del sitio.

## 3. Publicar
1. **Implementar → Nueva implementación → Tipo: Aplicación web**.
2. *Ejecutar como*: **Yo**. *Quién tiene acceso*: **Cualquier usuario**.
3. Autoriza los permisos (Calendar y envío de correo). Si aparece "Google no verificó esta app",
   entra en *Configuración avanzada → Ir a Dental Nakeji – Citas*: es tu propio script.
4. Copia la **URL de la aplicación web** (termina en `/exec`).
   Para comprobarla, ábrela en el navegador: debe responder `{"ok":true,"service":"dental-nakeji-citas"}`.

## 4. Conectar el sitio
1. En la raíz del proyecto, copia `.env.example` como `.env.local` (desarrollo) y/o `.env.production` (build).
2. Pega la URL: `VITE_BOOKING_ENDPOINT=https://script.google.com/macros/s/XXXX/exec`
3. Reinicia `npm run dev` o vuelve a compilar con `npm run build:prod`.

Si la variable está vacía, el formulario se muestra pero avisa que aún no está conectado y ofrece WhatsApp.

## Cambios posteriores
Cada vez que edites `Code.gs`: **Implementar → Administrar implementaciones → ✏ → Versión: Nueva versión → Implementar**.
La URL `/exec` no cambia.

## Respuestas del script
| Respuesta | Significado | Lo que ve el paciente |
|---|---|---|
| `{"ok":true}` | Evento creado | Confirmación con resumen |
| `{"ok":false,"error":"busy"}` | Ya hay un evento en ese horario | "Ese horario ya está ocupado" |
| `{"ok":false,"error":"invalid"}` | Datos fuera de reglas | "Revisa los datos" |
| `{"ok":false,"error":"server"}` | Error del script | Mensaje + enlace a WhatsApp |
| `{"ok":false,"error":"limit"}` | Límite anti-abuso (por hora o mismo teléfono) | Mensaje + enlace a WhatsApp |

## Privacidad y seguridad
- El formulario exige aceptar el **aviso de privacidad** (`/aviso-de-privacidad/`). Falta publicar el texto legal de la clínica (LFPDPPP).
- La URL `/exec` es pública por diseño. Protecciones incluidas: campo trampa anti-spam, validación en el servidor (incluida la
  lista de servicios), límite de solicitudes por hora y por teléfono (`MAX_REQUESTS_PER_HOUR`,
  `PHONE_COOLDOWN_HOURS`) y bloqueo para evitar dobles reservas. Si llega spam, se puede añadir reCAPTCHA.
- Alternativa sin código: **Google Calendar → Agenda de citas** genera una página de reservas propia
  que se puede enlazar o insertar. Tiene menos control del diseño y de los campos.
