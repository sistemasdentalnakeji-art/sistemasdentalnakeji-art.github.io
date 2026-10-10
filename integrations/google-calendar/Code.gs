/**
 * Dental Nakeji — Solicitudes de cita desde el sitio web → Google Calendar.
 *
 * Se publica como "Aplicación web" desde la cuenta de Google de la clínica.
 * Recibe el formulario del homepage (POST, JSON), valida los datos, revisa que el
 * horario esté libre y crea un evento "Solicitud de cita" en el calendario indicado.
 * Instrucciones: integrations/google-calendar/README.md
 */

// PENDIENTE: confirmar horario real con la clínica. Debe coincidir con src/config/booking.ts
const CONFIG = {
  /** ID del calendario de citas (Configuración del calendario → Integrar calendario). Vacío = calendario principal. */
  CALENDAR_ID: '',
  /** Duración de cada cita en minutos. */
  DURATION_MINUTES: 60,
  /** Días sin atención: 0 = domingo … 6 = sábado. */
  CLOSED_WEEKDAYS: [0],
  /** Horarios permitidos (24 h). */
  SLOTS: ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00'],
  /** Hasta cuántos días adelante se aceptan solicitudes. */
  DAYS_AHEAD: 60,
  /** Rechazar si ya hay una cita confirmada en ese horario (las solicitudes pendientes, en amarillo, no bloquean). */
  CHECK_CONFLICTS: true,
  /** Correo que recibe un aviso por cada solicitud (opcional). */
  NOTIFY_EMAIL: '',
  /** Color del evento en Calendar (amarillo = por confirmar). */
  EVENT_COLOR: CalendarApp.EventColor.YELLOW,
  /** Servicios aceptados: deben coincidir, en el mismo orden, con SERVICES de src/config/booking.ts. */
  SERVICES: [
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
  ],
  /** Páginas desde donde se acepta el campo "source" (cualquier otra cosa se guarda como "—"). */
  SOURCE_PREFIXES: [
    'https://nakejidental.com/',
    'https://www.nakejidental.com/',
    'https://sistemasdentalnakeji-art.github.io/',
  ],
  /** Límite global de solicitudes por hora (frena que un script llene el calendario). */
  MAX_REQUESTS_PER_HOUR: 30,
  /** Horas en las que un mismo teléfono no puede pedir otra cita. */
  PHONE_COOLDOWN_HOURS: 6,
};

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Trampa anti-spam: si el campo oculto viene lleno, se responde "ok" sin crear nada.
    // Se llama hp_x (y no "website", "url"…) para que el autocompletado del navegador no lo rellene.
    if (data.hp_x) return json_({ ok: true });

    const errors = validate_(data);
    if (errors.length) return json_({ ok: false, error: 'invalid', fields: errors });

    const start = toDate_(data.date, data.time);
    const end = new Date(start.getTime() + CONFIG.DURATION_MINUTES * 60 * 1000);
    const calendar = CONFIG.CALENDAR_ID
      ? CalendarApp.getCalendarById(CONFIG.CALENDAR_ID)
      : CalendarApp.getDefaultCalendar();
    if (!calendar) throw new Error('Calendario no encontrado: revisa CALENDAR_ID');

    // Los límites se leen y se escriben dentro del candado: dos solicitudes simultáneas no pasan ambas el tope.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      const hourKey = 'count-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHH');
      const phoneKey = 'phone-' + String(data.phone).replace(/\D/g, '');
      const requestsThisHour = Number(cache.get(hourKey) || 0);
      if (requestsThisHour >= CONFIG.MAX_REQUESTS_PER_HOUR || cache.get(phoneKey)) {
        return json_({ ok: false, error: 'limit' });
      }

      // Los eventos de todo el día (cumpleaños, festivos) y las solicitudes pendientes no ocupan horario: así un
      // script no puede bloquear todos los horarios con solicitudes falsas.
      const busy = calendar
        .getEvents(start, end)
        .filter((event) => !event.isAllDayEvent() && event.getColor() !== CONFIG.EVENT_COLOR);
      if (CONFIG.CHECK_CONFLICTS && busy.length > 0) {
        return json_({ ok: false, error: 'busy' });
      }

      const source = clean_(data.source);
      const event = calendar.createEvent(`Solicitud de cita: ${clean_(data.service)} — ${fullName_(data)}`, start, end, {
        description: [
          'Solicitud enviada desde el sitio web (pendiente de confirmar).',
          '',
          `Nombre(s): ${clean_(data.firstName)}`,
          `Apellidos: ${clean_(data.lastName)}`,
          `Teléfono: ${clean_(data.phone)}`,
          `Correo: ${clean_(data.email) || '—'}`,
          `Servicio: ${clean_(data.service)}`,
          `Primera visita: ${data.firstVisit ? 'Sí' : 'No'}`,
          `Comentarios: ${clean_(data.comments) || '—'}`,
          '',
          `Aceptó el aviso de privacidad: Sí`,
          `Página: ${CONFIG.SOURCE_PREFIXES.some((prefix) => source.indexOf(prefix) === 0) ? source : '—'}`,
        ].join('\n'),
      });
      event.setColor(CONFIG.EVENT_COLOR);
      cache.put(hourKey, String(requestsThisHour + 1), 3600);
      cache.put(phoneKey, '1', CONFIG.PHONE_COOLDOWN_HOURS * 3600);
    } finally {
      lock.releaseLock();
    }

    // El aviso por correo es opcional: si falla (cuota, dirección), la cita ya quedó creada.
    if (CONFIG.NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: CONFIG.NOTIFY_EMAIL,
          subject: `Nueva solicitud de cita: ${fullName_(data)}`,
          body: `${fullName_(data)} solicitó ${clean_(data.service)} el ${data.date} a las ${data.time}.\nTeléfono: ${clean_(data.phone)}\nRevisa Google Calendar para confirmar.`,
        });
      } catch (mailError) {
        console.error(mailError);
      }
    }

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'server' });
  }
}

/** Permite comprobar en el navegador que la aplicación web está publicada. */
function doGet() {
  return json_({ ok: true, service: 'dental-nakeji-citas' });
}

function validate_(data) {
  const errors = [];
  const text = (value) => String(value || '').trim();

  if (text(data.firstName).length < 2 || text(data.firstName).length > 50) errors.push('firstName');
  if (text(data.lastName).length < 2 || text(data.lastName).length > 50) errors.push('lastName');
  // Solo dígitos y los signos normales de un teléfono: sin letras ni etiquetas HTML.
  if (!/^[+\d\s()-]{10,20}$/.test(text(data.phone))) errors.push('phone');
  if (text(data.email) && (text(data.email).length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text(data.email)))) {
    errors.push('email');
  }
  if (CONFIG.SERVICES.indexOf(text(data.service)) === -1) errors.push('service');
  if (typeof data.firstVisit !== 'boolean') errors.push('firstVisit');
  if (text(data.comments).length > 500) errors.push('comments');
  if (data.consent !== true) errors.push('consent');
  if (CONFIG.SLOTS.indexOf(text(data.time)) === -1) errors.push('time');

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text(data.date))) {
    errors.push('date');
  } else {
    const day = toDate_(data.date, '00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((day.getTime() - today.getTime()) / 86400000);
    if (diffDays < 1 || diffDays > CONFIG.DAYS_AHEAD) errors.push('date');
    else if (CONFIG.CLOSED_WEEKDAYS.indexOf(day.getDay()) !== -1) errors.push('date');
  }

  return errors;
}

/** Fecha y hora en la zona horaria del proyecto (appsscript.json → America/Tijuana). */
function toDate_(date, time) {
  const [y, m, d] = String(date).split('-').map(Number);
  const [h, min] = String(time).split(':').map(Number);
  return new Date(y, m - 1, d, h, min, 0);
}

/** Nombre completo para el título del evento y el aviso por correo (en los datos van separados). */
function fullName_(data) {
  return clean_(data.firstName) + ' ' + clean_(data.lastName);
}

/** Quita caracteres de control y `<` `>` (Calendar muestra HTML en la descripción) y acota el largo. */
function clean_(value) {
  return String(value || '').replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, 500);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
