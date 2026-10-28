/**
 * Dental Nakeji - Solicitudes de cita desde el sitio web -> Google Calendar.
 *
 * Se publica como "Aplicacion web" desde la cuenta de Google de la clinica.
 * Recibe el formulario del homepage (POST, JSON), valida los datos, revisa que el
 * horario este libre y crea un evento "Solicitud de cita" en el calendario indicado.
 */

// Los horarios y servicios deben coincidir con src/config/booking.ts
const CONFIG = {
  /** ID del calendario de citas (Configuracion del calendario -> Integrar calendario). Vacio = calendario principal. */
  CALENDAR_ID: '',
  /** Duracion de cada cita en minutos. */
  DURATION_MINUTES: 60,
  /** Dias sin atencion: 0 = domingo ... 6 = sabado. */
  CLOSED_WEEKDAYS: [0],
  /** Horarios permitidos (24 h). */
  SLOTS: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ],
  /** Ultimo horario aceptado en ciertos dias (0 = domingo ... 6 = sabado): los sabados, hasta las 16:00. */
  LAST_SLOT_BY_WEEKDAY: { 6: '16:00' },
  /** Hasta cuantos dias adelante se aceptan solicitudes. */
  DAYS_AHEAD: 60,
  /** Rechazar si el horario ya esta lleno para ese servicio (ver MAX_PER_SERVICE_PER_SLOT). */
  CHECK_CONFLICTS: true,
  /** Citas permitidas del MISMO servicio a la MISMA hora (pendientes y confirmadas cuentan). La siguiente se rechaza como "busy". */
  MAX_PER_SERVICE_PER_SLOT: 5,
  /**
   * Palabras (en minusculas) con las que recepcion suele escribir cada servicio en el titulo de una cita a mano; sirven para contarla
   * en el cupo. Ademas siempre vale el nombre exacto del servicio (lo que escribe el formulario). Agrega aqui las que falten.
   */
  SERVICE_KEYWORDS: {
    'Valoración general': ['valoración', 'valoracion', 'evaluat', 'evaluac'],
    'Limpieza dental': ['limpieza', 'cleaning'],
    'Implantes dentales': ['implante'],
    'All on 4 implants': ['all on 4', 'all-on-4', 'all in 4'],
    'All on 6 implants': ['all on 6', 'all-on-6', 'all in 6'],
    'Coronas': ['corona', 'crown'],
    'Carillas dentales': ['carilla', 'veneer'],
    'Blanqueamiento dental': ['blanqueamiento', 'whitening'],
    'Endodoncias': ['endodoncia', 'root canal'],
    'Ortodoncia': ['ortodoncia', 'brackets', 'braces'],
    'Alineadores': ['alineador', 'invisalign', 'aligner'],
    'Odontopediatría': ['odontopediatr', 'pediatr'],
    'Dentaduras': ['dentadura', 'denture'],
    'Periodoncia': ['periodoncia'],
    'Extracciones simples y de juicio': ['extracci', 'extraction'],
  },
  /** Correo que recibe un aviso por cada solicitud (opcional). */
  NOTIFY_EMAIL: 'info@nakejidental.com',
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
    'Endodoncias',
    'Ortodoncia',
    'Alineadores',
    'Odontopediatría',
    'Dentaduras',
    'Periodoncia',
    'Extracciones simples y de juicio',
  ],
  /** Paginas desde donde se acepta el campo "source" (cualquier otra cosa se guarda como "-"). */
  SOURCE_PREFIXES: [
    'https://nakejidental.com/',
    'https://www.nakejidental.com/',
    'https://sistemasdentalnakeji-art.github.io/',
  ],
  /** Limite global de solicitudes por hora (frena que un script llene el calendario). */
  MAX_REQUESTS_PER_HOUR: 30,
  /** Limite de intentos por hora ANTES de verificar la casilla: cada verificacion gasta cuota de UrlFetch. */
  MAX_ATTEMPTS_PER_HOUR: 300,
  /** Tamano maximo del cuerpo recibido (una solicitud real pesa menos de 2 KB). */
  MAX_BODY_CHARS: 10000,
  /** Sitios para los que Cloudflare puede haber emitido el token, y accion del widget (igual que BookingForm.tsx). */
  TURNSTILE_HOSTNAMES: ['nakejidental.com', 'www.nakejidental.com', 'sistemasdentalnakeji-art.github.io'],
  TURNSTILE_ACTION: 'cita',
  /** Horas en las que un mismo telefono no puede pedir otra cita. */
  PHONE_COOLDOWN_HOURS: 6,
};

function doPost(e) {
  try {
    const body = (e && e.postData && e.postData.contents) || '{}';
    if (body.length > CONFIG.MAX_BODY_CHARS) return json_({ ok: false, error: 'invalid', fields: [] });
    const data = JSON.parse(body);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json_({ ok: false, error: 'invalid', fields: [] });
    // Los textos se recortan una sola vez: validacion, llaves de cache y evento usan los mismos valores.
    ['firstName', 'lastName', 'phone', 'email', 'service', 'date', 'time', 'comments'].forEach((key) => {
      data[key] = String(data[key] || '').trim();
    });

    // Trampa anti-spam: si el campo oculto viene lleno se responde "ok" sin crear nada.
    if (data.hp_x) return json_({ ok: true });

    const errors = validate_(data);
    if (errors.length) return json_({ ok: false, error: 'invalid', fields: errors });

    // Tope de intentos antes de llamar a Cloudflare, para que un bot no agote la cuota de UrlFetch.
    // shortcut: este conteo va fuera del candado y puede pasarse por unos pocos; basta para frenar un abuso.
    const hour = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHH');
    const cache = CacheService.getScriptCache();
    const attemptsKey = 'attempts-' + hour;
    const attempts = Number(cache.get(attemptsKey) || 0);
    if (attempts >= CONFIG.MAX_ATTEMPTS_PER_HOUR) return json_({ ok: false, error: 'limit' });
    cache.put(attemptsKey, String(attempts + 1), 3600);

    // Casilla anti-bots. Va antes de los limites: un bot rechazado no gasta el cupo de los pacientes.
    if (!humanVerified_(data.turnstile)) return json_({ ok: false, error: 'captcha' });

    const start = toDate_(data.date, data.time);
    const end = new Date(start.getTime() + CONFIG.DURATION_MINUTES * 60 * 1000);
    const calendar = CONFIG.CALENDAR_ID
      ? CalendarApp.getCalendarById(CONFIG.CALENDAR_ID)
      : CalendarApp.getDefaultCalendar();
    if (!calendar) throw new Error('Calendario no encontrado: revisa CALENDAR_ID');

    // Los limites se leen y se escriben dentro del candado: dos solicitudes simultaneas no pasan ambas el tope.
    let notify = false;
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const hourKey = 'count-' + hour;
      const phoneKey = 'phone-' + String(data.phone).replace(/\D/g, '').slice(-10);
      // Un reintento de la misma solicitud (mismo telefono, fecha y hora; p. ej. por mala senal) responde "ok" sin crear otro evento.
      const sameRequestKey = phoneKey + '-' + data.date + '-' + data.time;
      if (cache.get(sameRequestKey)) return json_({ ok: true });
      const requestsThisHour = Number(cache.get(hourKey) || 0);
      if (requestsThisHour >= CONFIG.MAX_REQUESTS_PER_HOUR || cache.get(phoneKey)) {
        return json_({ ok: false, error: 'limit' });
      }
      // Cuentan tambien las solicitudes rechazadas por horario ocupado (si no, se podria insistir sin tope).
      cache.put(hourKey, String(requestsThisHour + 1), 3600);

      // Cupo: cuentan los eventos que empiezan a esa misma hora y nombran el mismo servicio (o una de sus palabras de SERVICE_KEYWORDS)
      // en el titulo o la descripcion. Las solicitudes del formulario siempre lo hacen. Los de todo el dia no cuentan.
      const words = [clean_(data.service).toLowerCase()].concat(CONFIG.SERVICE_KEYWORDS[data.service] || []);
      const sameSlot = calendar.getEvents(start, end).filter((event) => {
        if (event.isAllDayEvent() || event.getStartTime().getTime() !== start.getTime()) return false;
        const text = (event.getTitle() + ' ' + event.getDescription()).toLowerCase();
        return words.some((word) => text.indexOf(word) !== -1);
      });
      if (CONFIG.CHECK_CONFLICTS && sameSlot.length >= CONFIG.MAX_PER_SERVICE_PER_SLOT) {
        return json_({ ok: false, error: 'busy' });
      }

      const source = clean_(data.source);
      const event = calendar.createEvent(`Solicitud de cita: ${clean_(data.service)} - ${fullName_(data)}`, start, end, {
        description: [
          'Solicitud enviada desde el sitio web (pendiente de confirmar).',
          '',
          `Nombre(s): ${clean_(data.firstName)}`,
          `Apellidos: ${clean_(data.lastName)}`,
          `Telefono: ${clean_(data.phone)}`,
          `Correo: ${clean_(data.email) || '-'}`,
          `Servicio: ${clean_(data.service)}`,
          `Primera visita: ${data.firstVisit ? 'Si' : 'No'}`,
          `Comentarios: ${clean_(data.comments) || '-'}`,
          '',
          `Acepto el aviso de privacidad: Si`,
          `Pagina: ${CONFIG.SOURCE_PREFIXES.some((prefix) => source.indexOf(prefix) === 0) ? source : '-'}`,
        ].join('\n'),
      });
      event.setColor(CONFIG.EVENT_COLOR);
      // Un solo correo por hora: asi un abuso no agota la cuota diaria de correos de la cuenta.
      const mailKey = hourKey.replace('count-', 'mail-');
      notify = !cache.get(mailKey);
      if (notify) cache.put(mailKey, '1', 3600);
      cache.put(phoneKey, '1', CONFIG.PHONE_COOLDOWN_HOURS * 3600);
      cache.put(sameRequestKey, '1', CONFIG.PHONE_COOLDOWN_HOURS * 3600);
    } finally {
      lock.releaseLock();
    }

    // El aviso por correo es opcional: si falla (cuota, direccion), la cita ya quedo creada.
    if (CONFIG.NOTIFY_EMAIL && notify) {
      try {
        MailApp.sendEmail({
          to: CONFIG.NOTIFY_EMAIL,
          name: 'Dental Nakeji - Formulario Web',
          subject: `Nueva solicitud de cita: ${fullName_(data)}`,
          body: `${fullName_(data)} solicito ${clean_(data.service)} el ${data.date} a las ${data.time}.\nLos datos de contacto estan en el evento de Google Calendar.\nPara cuidar la cuota de correo solo se avisa de la primera solicitud de cada hora; las demas estan en Google Calendar.`,
        });
      } catch (mailError) {
        console.error(mailError);
        warnMailFailed_(calendar);
      }
    }

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'server' });
  }
}

/** Verifica el token de Cloudflare Turnstile. Sin TURNSTILE_SECRET (Propiedades del script) se rechaza todo: falla cerrado. */
function humanVerified_(token) {
  const secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) {
    console.error('Falta TURNSTILE_SECRET en las Propiedades del script');
    return false;
  }
  if (!token || String(token).length > 2048) return false;
  try {
    const response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: { secret: secret, response: String(token) },
      muteHttpExceptions: true,
    });
    const result = JSON.parse(response.getContentText());
    // Un token valido emitido para otro sitio o para otra accion tampoco sirve.
    return (
      result.success === true &&
      CONFIG.TURNSTILE_HOSTNAMES.indexOf(result.hostname) !== -1 &&
      result.action === CONFIG.TURNSTILE_ACTION
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

/** Si el correo falla (cuota o direccion), deja un aviso visible en el calendario; como maximo uno cada 6 horas. */
function warnMailFailed_(calendar) {
  try {
    const cache = CacheService.getScriptCache();
    if (cache.get('mailwarn')) return;
    cache.put('mailwarn', '1', 21600);
    calendar.createAllDayEvent('AVISO: fallo el correo de solicitudes. Revisa las solicitudes en amarillo', new Date());
  } catch (error) {
    console.error(error);
  }
}

/** Permite comprobar en el navegador que la aplicacion web esta publicada. */
function doGet() {
  return json_({ ok: true, service: 'dental-nakeji-citas' });
}

function validate_(data) {
  const errors = [];
  const text = (value) => String(value || '').trim();

  // Mismas reglas que la web (src/features/booking/BookingForm.tsx): nombre solo con letras Unicode; telefono solo digitos con "+" opcional al inicio.
  if (!/^\p{L}{2,}(?: \p{L}+)*$/u.test(text(data.firstName)) || text(data.firstName).length > 50) errors.push('firstName');
  if (!/^\p{L}{2,}(?: \p{L}+)*$/u.test(text(data.lastName)) || text(data.lastName).length > 50) errors.push('lastName');
  if (!/^\+?\d{10,15}$/.test(text(data.phone))) errors.push('phone');
  if (text(data.email) && (text(data.email).length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text(data.email)))) {
    errors.push('email');
  }
  if (CONFIG.SERVICES.indexOf(text(data.service)) === -1) errors.push('service');
  if (typeof data.firstVisit !== 'boolean') errors.push('firstVisit');
  if (text(data.comments).length > 500) errors.push('comments');
  if (/https?:\/\/|www\./i.test(text(data.comments))) errors.push('comments');
  if (data.consent !== true) errors.push('consent');
  if (CONFIG.SLOTS.indexOf(text(data.time)) === -1) errors.push('time');

  // La fecha de hoy se toma en la zona horaria del proyecto (no la del servidor) y las fechas inexistentes (31 de febrero) se rechazan.
  const requested = dayNumber_(text(data.date));
  const today = dayNumber_(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
  if (requested === null) {
    errors.push('date');
  } else {
    const diffDays = requested - today;
    const weekday = new Date(requested * 86400000).getUTCDay();
    if (diffDays < 1 || diffDays > CONFIG.DAYS_AHEAD) errors.push('date');
    else if (CONFIG.CLOSED_WEEKDAYS.indexOf(weekday) !== -1) errors.push('date');
    else if (CONFIG.LAST_SLOT_BY_WEEKDAY[weekday] && text(data.time) > CONFIG.LAST_SLOT_BY_WEEKDAY[weekday]) errors.push('time');
  }

  return errors;
}

/** Numero de dia (desde 1970) de una fecha "AAAA-MM-DD", o null si el formato o la fecha no existen. */
function dayNumber_(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const time = Date.UTC(y, m - 1, d);
  const back = new Date(time);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== m - 1 || back.getUTCDate() !== d) return null;
  return time / 86400000;
}

/** Fecha y hora en la zona horaria del proyecto (appsscript.json -> America/Tijuana). */
function toDate_(date, time) {
  const [y, m, d] = String(date).split('-').map(Number);
  const [h, min] = String(time).split(':').map(Number);
  return new Date(y, m - 1, d, h, min, 0);
}

/** Nombre completo para el titulo del evento y el aviso por correo (en los datos van separados). */
function fullName_(data) {
  return clean_(data.firstName) + ' ' + clean_(data.lastName);
}

/** Quita caracteres de control y "<" ">" (Calendar muestra HTML en la descripcion) y acota el largo. */
function clean_(value) {
  return String(value || '').replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, 500);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
