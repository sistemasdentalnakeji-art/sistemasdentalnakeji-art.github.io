# Revisión de las traducciones al inglés

Base: el texto en español. Solo se cambió el inglés cuando perdía el sentido del español, sonaba a traducción literal o tenía un error.
No se tocaron: textos en español, blog, textos legales oficiales, nombres de marca, nombres de servicios, teléfonos, direcciones ni URLs.

Total: 37 textos cambiados en 11 archivos.

## src/data/story.ts (2)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Home, historia animada bajo el hero (mensaje 1) | 35 años acompañando a nuestros pacientes | 35 years supporting our patients | 35 years caring for our patients | "Supporting" se lee como apoyar o mantener (incluso económicamente); "caring for" sí transmite acompañar y cuidar. |
| Home, historia animada (mensaje 2) | Todas las especialidades dentales y laboratorio dental | All dental specialties and dental laboratory | All dental specialties and a dental laboratory | Faltaba el artículo "a": sin él suena incorrecto en inglés. |

## src/data/home.ts (3)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Home, hero (párrafo bajo el título) | Desde la valoración hasta el desarrollo de diseños personalizados, nuestros doctores trabajan de la mano con el laboratorio dental de la clínica para dar continuidad a cada caso y agilizar el tratamiento, mientras nos esmeramos en brindar atención en todos los servicios dentales, que son prioridad en Dental Nakeji. | From the first evaluation to the development of personalized designs, (...) to keep every case moving and speed up treatment, while we strive to provide care in all dental services, which are a priority at Dental Nakeji. | From your first evaluation to the creation of personalized designs, (...) to keep every case on track and speed up treatment, while we take great care in every dental service we offer, each one a priority at Dental Nakeji. | La parte final era una traducción palabra por palabra y se leía torpe; "keep every case on track" expresa mejor "dar continuidad". |
| Home, sección "Aseguranzas y convenios" | ...para que aproveches los beneficios de tu plan. | ...so you can make use of your plan benefits. | ...so you can make the most of your plan benefits. | "Aprovechar" es sacarle provecho, no solo "usar". |
| Home, sección "Reseñas de Google" | Lo que dicen nuestros pacientes, publicado por ellos en nuestro perfil de Google. | What our patients say, posted by them on our Google profile. | What our patients say, in their own words, on our Google profile. | "Posted by them" suena forzado; "in their own words" dice lo mismo de forma natural. |

## src/data/about.ts (2)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Nosotros, historia "Inicios" | ...sonreír con confianza, seguridad y tranquilidad... atención profesional, humana y de calidad. | ...smile with confidence, security and peace of mind... professional, human, quality care. | ...smile with confidence, assurance and peace of mind... professional, compassionate, high-quality care. | "Security" suena a seguridad física o de datos; "human care" no se usa en inglés. "Compassionate" es la forma natural de decir "atención humana". |
| Nosotros, historia "Hoy" | Hoy, todo ese camino se refleja en una clínica dental... y se sienta escuchada y en confianza. | Today, all of that path shows in a dental clinic... and feel listened to and at ease. | Today, that whole journey is reflected in a dental clinic... and feel heard and at ease. | "All of that path shows" es traducción literal y no tiene sentido en inglés; "feel heard" es la expresión natural. |

## src/data/contact.ts (1)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Contacto, tarjeta de correo | Ideal para cotizaciones, enviar estudios o radiografías y dar seguimiento a tu tratamiento. | Ideal for quotes, sending studies or X-rays, and following up on your treatment. | Ideal for quotes, sending test results or X-rays, and following up on your treatment. | En inglés "studies" no se usa para estudios médicos del paciente; se dice "test results". |

## src/data/faq.ts (11)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Preguntas frecuentes, búsqueda sin resultados | No encontramos esa pregunta. | No matching questions yet. | We couldn’t find that question. | El "yet" (todavía) no está en el español y sugería que la pregunta se agregará después. |
| Preguntas frecuentes, texto de entrada | Queremos que llegues a tu cita con tranquilidad. Aquí podrás resolver tus dudas sobre citas, tratamientos y formas de pago. Si necesitas algo más, escríbenos y lo vemos contigo. | A little clarity before your visit. Find answers about appointments, treatments, and payment options—or reach out and we’ll help you with your question. | We want you to come to your appointment feeling at ease. Here you can find answers about appointments, treatments, and payment options. If you need anything else, message us and we’ll work it out together. | El inglés decía otra cosa (no hablaba de llegar tranquilo ni de "lo vemos contigo"). |
| Citas: ¿Puedo cambiar mi cita? (respuesta) | ...de acuerdo con la disponibilidad de nuestra agenda. | ...according to our schedule availability. | ...based on our availability. | "Schedule availability" es literal y repetitivo. |
| Citas (pregunta) | ¿Necesito reservar algún servicio con anticipación? | Do I need to book any service in advance? | Do I need to book services in advance? | "Any service" suena a "cualquier servicio" de forma rara; la nueva es la forma natural. |
| Servicios: ¿Cómo sé qué tratamiento necesito? (respuesta) | ...te indique el tratamiento adecuado. | ...tell you the right treatment. | ...recommend the right treatment. | "Tell you the treatment" no es natural; el dentista "recomienda". |
| Servicios: ¿Atienden a niños? (respuesta) | Sí, atendemos a niños a partir de los 5 años. | Yes, we see children from 5 years old. | Yes, we see children ages 5 and up. | "From 5 years old" es calco del español; "ages 5 and up" es lo usual en EE. UU. |
| Pagos: ¿Puedo pagar por etapas? (respuesta) | El pago por etapas está disponible para ciertos tratamientos. | Staged payment is available for certain treatments. | Paying in stages is available for certain treatments. | "Staged payment" suena técnico y poco natural. |
| Seguros y convenios (pregunta) | ¿Qué beneficios obtengo con mi convenio? | What benefits do I get with my agreement? | What benefits do I get with my company agreement? | "Agreement" solo es ambiguo (contrato de qué); en el resto del sitio se usa "company agreement". |
| Seguros y convenios (respuesta) | Tu convenio incluye una valoración sin costo... | Your agreement includes a free assessment... | Your company agreement includes a free assessment... | Igual que arriba: aclarar que es el convenio de la empresa. |
| Seguros y convenios (pregunta) | ¿Puedo combinar promociones, convenios y beneficios de mi seguro? | Can I combine promotions, agreements, and insurance benefits? | Can I combine promotions, company agreements, and insurance benefits? | Igual que arriba. |
| Urgencias: ¿Qué tipos atienden? (respuesta) | Atendemos casos como la pérdida o fractura de un diente. | We treat cases such as the loss or fracture of a tooth. | We treat cases such as a lost or broken tooth. | La versión anterior sonaba a texto clínico traducido; la nueva es como lo diría un paciente. |

## src/data/benefits.ts (2)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Beneficios, tarjeta "Aseguranzas americanas" | Aceptamos aseguranzas americanas. Consúltanos antes de tu cita para resolver tus dudas. | ...Contact us before your appointment to answer your questions. | ...Contact us before your appointment and we’ll answer your questions. | Como estaba, en inglés parecía que el paciente iba a responder sus propias dudas. |
| Beneficios, recuadro final "¿Tienes dudas sobre tu cobertura?" | ...te decimos si tu plan o tu empresa aplican. | ...whether your plan or your company applies. | ...whether your plan or your company qualifies. | "Applies" es calco de "aplica"; en inglés se dice "qualifies". |

## src/data/benefitPages.ts (2)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Página Aseguranzas, encabezado | Aceptamos aseguranzas americanas. Consúltanos antes de tu cita para resolver tus dudas. | ...Contact us before your appointment to answer your questions. | ...Contact us before your appointment and we’ll answer your questions. | Mismo error que en la tarjeta de Beneficios. |
| Página Promociones, carteles | Vigencia por definir | Validity to be announced | Dates to be announced | "Validity" no se usa así en inglés para promociones. |

## src/data/partners.ts (1)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Home, bloque "Aseguranzas" | ...revisamos si tu plan aplica para tu tratamiento. | ...whether your plan applies to your treatment. | ...whether your plan covers your treatment. | Con seguros en inglés se dice que el plan "cubre" (covers) el tratamiento. |

## src/data/servicesCatalog.ts (3)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Servicios, encabezado | ...para crear diseños a la medida y ofrecerte una atención ágil y cuidadosa. | ...give you agile, careful care. | ...give you efficient, attentive care. | "Agile" no se usa para atención médica y "careful care" repite palabra. |
| Servicios, categoría Ortodoncia y odontopediatría | Para alinear la sonrisa y cuidar los dientes de los más pequeños. | To align your smile and care for the teeth of the little ones. | To align your smile and care for children’s teeth. | La construcción "the teeth of the little ones" es literal y torpe. |
| Servicios, categoría Limpieza y encías | El cuidado de base: limpieza dental y atención de las encías. | Basic care: dental cleaning and gum treatment. | The foundation of your care: dental cleaning and gum care. | "Basic care" suena a atención mínima o de bajo nivel; "de base" significa fundamental. |

## src/data/servicesEn.ts (9)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Implantes dentales, "Acerca del tratamiento" | Un implante es una raíz de titanio que se coloca con cirugía y sostiene una corona. | An implant is a titanium root placed with surgery that supports a crown. | An implant is a titanium root, placed surgically, that supports a crown. | "Placed with surgery" no es natural. |
| All-on-4, frase del hero | Estudio del hueso de cada arcada. | Bone study for each arch. | Bone evaluation for each arch. | "Bone study" es calco; en inglés se dice evaluación. |
| All-on-4, "Acerca del tratamiento" | Es una cirugía con anestesia. | It is surgery under anesthesia. | It is a surgical procedure done under anesthesia. | Más natural y claro para el paciente. |
| All-on-6, "Acerca del tratamiento" | Es una cirugía. | It is surgery. | It is a surgical procedure. | Igual que arriba. |
| Limpieza dental, frase del hero | Pulido de manchas superficiales. | Polishing of surface stains. | Polishes away surface stains. | "Polishing of stains" da a entender que se pulen las manchas en vez de quitarlas. |
| Limpieza dental, frase del hero | Revisión de dientes y encías. | Check of teeth and gums. | Teeth and gum check-up. | "Check of" es calco; "check-up" es la palabra usual. |
| Limpieza dental, "Acerca del tratamiento" | Es un cuidado que realmente importa y que muchas personas omiten. | It is care that matters, and many people skip it. | It is care that really matters, yet many people skip it. | Faltaba "realmente" y el contraste del español. |
| Odontopediatría, "Acerca del tratamiento" | ...detectar a tiempo cualquier situación... | ...catch in time anything that could affect... | ...catch early anything that could affect... | "Catch in time" es calco; "catch early" es lo natural. |
| Dentaduras, frase del hero | Prótesis removible hecha a medida. | Removable prosthesis made to measure. | Custom-made removable prosthesis. | "Made to measure" se usa para ropa; para prótesis se dice "custom-made". |

## src/config/routes.ts (1)

| Sección / dónde se ve | Español (base) | Inglés antes | Inglés ahora | Motivo |
|---|---|---|---|---|
| Descripción SEO (Google) de Periodoncia | Periodoncia en Tijuana: atención de las encías y del soporte de tus dientes. | ...care for your gums and the support of your teeth. | ...care for your gums and the tissues that support your teeth. | "The support of your teeth" es literal y ambiguo en inglés. |

## Para revisar con alguien nativo

Textos que NO se cambiaron, pero conviene que los revise una persona nativa o la clínica:

- **Home, reseñas (src/data/home.ts):** "We don't lie. Our patients speak for us." Es fiel al español, pero en EE. UU. "We don't lie" puede sonar a la defensiva. Es texto de marketing: decide la clínica.
- **Home, historia (src/data/story.ts):** "Meet Nakeji in Zona Río". "Meet" suele usarse con personas; si "Nakeji" se entiende como nombre de persona puede confundir. Alternativa: "Visit Nakeji in Zona Río" o "Get to know Nakeji in Zona Río".
- **Home, hero (src/data/home.ts):** el párrafo principal sigue siendo largo porque el español también lo es. Ya se pulió, pero se puede acortar si la clínica acepta acortar el español.
- **Datos por confirmar con la clínica:** "Certified dentists", "Over 35 years caring for your oral health" (home), "Certified specialists" y "Lasting care" (página de Servicios; en inglés se suavizó a propósito para no prometer resultados, mientras que el español dice "Resultados que perduran").
- **Nosotros, equipo (src/data/about.ts):** los títulos "Lic.", "Asst.", "TDP" e "Ing. Mtro." aparecen en la versión en inglés, aunque el comentario del archivo dice que en inglés se omiten. Un lector de EE. UU. no reconoce "Lic." ni "TDP". Decidir si se quitan.
- **Nosotros, equipo:** "Health officer" para "responsable sanitario" (Dr. Sergio Palacio). En EE. UU. suena a funcionario de salud pública. Alternativas posibles: "health compliance officer" o "licensed health officer of record". Requiere confirmar con la clínica qué figura legal es.
- **Convenios con empresas:** en inglés se usan "Partner companies" (títulos) y "dental agreement" / "company agreement" (textos). Es entendible, pero un nativo podría preferir "corporate dental plan" o "employer partnership". En Preguntas frecuentes el filtro sigue diciendo "Insurance and agreements" para que el botón no crezca de largo.
- **Preguntas frecuentes:** "warranty" para "garantía" de tratamientos. En odontología en EE. UU. también se usa "guarantee". Ambas se entienden.
- **Beneficios:** "we also care about your wallet" es una frase de marketing equivalente a "también cuidamos tu dinero". Funciona, pero conviene que la valide la clínica.
- **Páginas de servicio (src/data/servicesEn.ts):** todos los textos médicos siguen pendientes de revisión médica en inglés (así lo dice el archivo). Solo se corrigió redacción, no contenido clínico. También quedó igual "Dental care for the little ones." (pediatría), que es natural en inglés.
- **Páginas legales (src/config/routes.ts):** las descripciones de Aviso de Privacidad y Términos SMS dicen "Nakeji Dental" (así aparece en el documento legal oficial), mientras el resto del sitio dice "Dental Nakeji". No se tocó por ser el nombre usado en el texto legal; conviene confirmar con la clínica cuál es el nombre oficial.
- **Archivo de contenido de servicios:** servicesEn.ts pide copiar cualquier cambio también a gan-harness/contenido/<slug>.json, pero esa carpeta no existe en el proyecto, así que no se pudo sincronizar.
