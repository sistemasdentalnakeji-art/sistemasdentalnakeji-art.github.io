# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Dental Nakeji — Homepage

**Ponytail (proyecto):** en cualquier tarea de código, aplica la skill `ponytail` de `.claude/skills/ponytail/` (el cambio más pequeño que resuelve el problema completo; termina la respuesta con lo que no se revisó y los riesgos). Esto incluye construir o ampliar el proyecto, mover código entre archivos, crear estructuras nuevas y cualquier tarea compleja: se aplica siempre, sin esperar a que se pida.

Sitio de la clínica Dental Nakeji (Tijuana). **Alcance actual: solo el homepage (`/`).**
React 19 + Vite + TypeScript. Sin backend propio y sin router. Encargo original: `Prompt_Claude_Homepage_Nakeji.md`.

## Cómo se renderiza (leer antes de tocar componentes)
- Un solo árbol `<App path>` (`src/app/App.tsx`) se usa en dos entradas: `entry-server.tsx` (Node, `renderToString` al compilar)
  y `main.tsx` (navegador). Por eso **todo componente debe poder renderizarse en Node**: nada de `window`/`document`/`Date.now()`
  durante el render; ese código va en `useEffect`. Un render distinto entre servidor y cliente rompe la hidratación.
- `findRoute(path)` en `config/routes.ts` decide la página; `route.status` (`'ready'` | `'empty'`) decide si es indexable
  (solo con `--production`) y si entra al sitemap. Para "publicar" una página interna hay que cambiar su `status`; las rutas con `template: 'service'` se dibujan solas con la plantilla
  (y `data/services.ts` falla al compilar si a una le falta su contenido); las demás se eligen en `App.tsx`.
  Cada servicio tiene título y descripción SEO propios en `routes.ts` (el canonical y Open Graph se emiten solos); antes de pasarlo a `ready`, la clínica debe confirmar los textos (ver `gan-harness/contenido/`).
  Página nueva: `pages/<nombre>/<Nombre>Page.tsx` + `styles/pages/<nombre>.css` (importada en `styles/index.css`).
- `index.html` contiene los marcadores `<!--app-head-->` y `<div id="root"><!--app-html--></div>`; `prerender.mjs` falla si cambian.
  Las etiquetas `<head>` salen de `buildHead` (`seo/head.ts`) al compilar y de `applyHead` en desarrollo.
- `dist/` y `dist-server/` son salidas de compilación.

## Alcance (estructura aprobada)
Header → Hero → Historia animada (`CareStory`) → Agendar (con formulario) → Servicios destacados → Aseguranzas y convenios → Reseñas de Google → Contacto y ubicación → Footer.
- El aviso de privacidad es un **destino vacío** (`EmptyPage`): noindex, fuera del sitemap.
  **/nosotros/** ya tiene diseño (`pages/about/AboutPage.tsx`, textos **provisionales** en `data/about.ts`, estilos `styles/pages/about.css`; sigue `status: 'empty'`/noindex):
  historia en línea de tiempo cuya línea se llena con el scroll (inspirada en "Growth Story Timeline" de 21st.dev, CSS `view-timeline`), misión (blanca) y visión (azul noche),
  y equipo por áreas (gerencia, administración, ventas, doctores, equipo técnico) con tarjetas "Integrante N" de marcador cuyo avatar `.siri` gira al pasar el cursor
  (inspirada en "Team Section with Glow Cards"). Sin años, cifras ni nombres inventados: los da la clínica. Plasma compartido con /contacto/ (`components/decor/PagePlasma.tsx` + `styles/components/page-plasma.css`, clase `page-plasma-band` en la Band). **/contacto/** ya tiene su diseño ("Bento", `pages/contact/ContactPage.tsx`, textos en `data/contact.ts`,
  estilos `styles/pages/contact.css`; sigue `status: 'empty'`/noindex): rejilla bento (teléfonos ancho arriba, plano `LocationMap` alto a la derecha, WhatsApp oscuro con burbuja "escribiendo", correo con copiar y horario si `SITE.hours` tiene datos), luz que sigue al cursor + borde iluminado (inspirado en "Spotlight" de 21st.dev, código propio: un `pointermove` en la rejilla escribe `--spot-x/y`), entrada escalonada con `animation-timeline: view()` (con "Pausar animaciones" se muestran completas). Bajo el H1 va una frase de atención al cliente (`CONTACT_INTRO.tagline`). Mismo plasma de fondo que /servicios/ y /beneficios/ (`.contact-page__plasma`). Orden en celular: teléfonos, WhatsApp, correo y al final la dirección (el DOM sigue ese orden; en escritorio lo coloca `grid-template-areas`).
  Redes: "muro" oscuro (texto y enlaces a la izquierda, dos ventanas a la derecha). **El contenido se carga solo** (a petición; iframes `loading="lazy"`, sin consentimiento previo):
  Facebook con el Page Plugin (no se adapta a su iframe: `facebookEmbed(width)` recibe el ancho medido en el navegador por un ref) e Instagram con la incrustación oficial del perfil
  (`instagram.com/<usuario>/embed/`, sin token; **solo muestra 6 publicaciones y no se puede paginar**, por eso cada ventana lleva abajo "Ver todo en…"). Las dos ventanas miden igual (620 px; 560 en celular). En el visor de Claude Desktop Facebook a veces sale en gris por la redirección a web.facebook.com. Pendiente: CSP con `frame-src https://www.facebook.com` al desplegar, texto de privacidad más completo y JSON-LD `ContactPage` al publicar. Las tres de Beneficios (promociones, convenios y aseguranzas) ya tienen diseño propio (ver "Páginas internas de Beneficios"). `/beneficios/` y `/servicios/` ya tienen su propia página (también noindex hasta publicar).
- **Páginas de servicio** (plantilla `pages/service/ServicePage.tsx`, estilos `styles/pages/service.css`): columnas 1 y 2 del
  los 11 servicios del submenú (las 3 columnas). Rutas creadas con `service(...)` en `routes.ts` (`template: 'service'`);
  textos, imagen y enlace al blog en `src/data/services.ts` (el contenido de las 14 páginas ya NO es lorem ipsum: lo redactó un agente a partir de fuentes oficiales y lo revisó un agente de cumplimiento médico; la fuente, con las fuentes citadas y lo que la clínica debe confirmar, está en `gan-harness/contenido/<slug>.json`; si se edita un texto en `services.ts`, copiarlo también al JSON). Estructura fija: 1) hero con foto de borde a borde + degradado,
  título, gancho, 3 frases, botones WhatsApp / Reservar cita; 2) "Acerca del tratamiento": en dos columnas, a la izquierda título-pregunta (h2), un párrafo de 3 a 5 renglones (`about.text`, informativo y con gancho) y botón al blog; a la derecha, el contenedor vacío `.service-about__media` reservado para la animación 3D (se deja en blanco, sin contenido); 3) `Schedule` con el servicio preseleccionado.
  Siguen en `status: 'empty'` (noindex) hasta tener textos definitivos. Hero a la manera del mockup (título hasta 6 rem, contenido a la izquierda);
  fondo **sin animación** (en escritorio la foto empieza al 28 % del ancho con el borde izquierdo difuminado y a su izquierda queda un degradado azul de marca; en celular, foto de borde a borde con velo; la aurora se probó y se quitó a petición). Tienen foto los 14 servicios (Dentaduras reutiliza la foto de alineadores/dentadura; `flip: true` solo en Ortodoncia)
  (`image` en `data/services.ts`, 2000x1125 en `public/images/servicios/`); el resto en azul de marca.
  Las fotos HD con personas van en `public/images/servicios/`.
- No hacer: blog, panel, base de datos, bots, n8n, contenido de páginas internas, secciones extra sin pedirlo.
- Aseguranzas y convenios: **logos reales que dio la clínica** (24 aseguranzas en `public/images/aseguranzas/`, 15 empresas de convenio en `public/images/convenios/`, ambas listas en `data/partners.ts`). Reseñas: **solo marcadores** ("Paciente N"). No investigar empresas, no inventar reseñas.
  Logos de convenio procesados (fondo quitado solo si toca el borde, recortados, 480 px máx., WebP) desde `Desktop/Logos - Convenios/` (ahí está `fuentes-logotipos.txt`) y, los de City Express, Marriott Tijuana, Toros, Cabeza de Vaca y Xolo Girls, desde imágenes que mandó la clínica por el chat. Xolo Girls conserva su cuadro rosa (letras blancas) y es el único con esquinas redondeadas (`Partner.logo.framed`, clase `is-framed`): **un `border-radius` en los demás logos les recorta las esquinas** (así se cortaban IMMUJER y Nissan). Colegio Reina Isabel venía en blanco sobre azul y se pasó a azul oscuro. Nissan (cromado, huecos del aro cerrados) usa `seeds` en el relleno. Pendientes sin logo: Dr. Omar Lazos, Dr. Elías Ortiz. `--w` evita estirar los archivos chicos.
  **Orden de `AGREEMENT_LOGOS`** (lo pidió la clínica): de más a menos popular y las relacionadas juntas: hoteles (City Express, Marriott, Ibis, Real Inn, Real del Río) · Colegio Reina Isabel · Grupo Caliente + Xolo Girls · Enerser + Toros + Zonkeys · Cabeza de Vaca + Lion Fish · IMMUJER · Nissan al final. La home muestra las 8 primeras.

## Decisiones
- **URLs**: se conservan las del sitio actual (`src/config/routes.ts`), con barra final. Nuevas: `/convenios/`, `/aviso-de-privacidad/`, `/blog/`.
- **Servicios**: 12 en `SERVICE_ROUTES`, ordenados por prioridad (doctores + demanda). El menú de Servicios muestra **9** en cuadrícula de 3×3 (lista explícita `MENU_SERVICE_PATHS` en `config/navigation.ts`).
  Otros 3 con página propia pero **fuera del submenú** en `MORE_SERVICE_ROUTES` (dentaduras, periodoncia, extracciones).
  Los 6 de la sección "Servicios destacados" de la home son la lista explícita `FEATURED_PATHS` en `data/featuredServices.ts`.
  Ambas listas llevan su contenido en `data/services.ts` (falla al compilar si falta alguno).
- **Página /servicios/** (`pages/services/ServicesPage.tsx`, textos/orden/iconos en `data/servicesCatalog.ts`, estilos `styles/pages/services-index.css`):
  **Rediseño (oct-2026)**: 14 servicios en **5 categorías** (`CATALOG_GROUPS`: implantes y rehabilitación 4 · estética y restauración 3 · ortodoncia y odontopediatría 3 ·
  limpieza y encías 2 · endodoncia y extracciones 2; el módulo falla al compilar si un servicio de las rutas falta o se repite). Estructura SEO: 1 `h1` ("Servicios dentales en Tijuana"). Sin chips de categoría ni numerales (se quitaron a petición):
  un `h2` por categoría y un `h3` por servicio. **Apilado actual (dentro de una ventana)**: héroe, sección de cartas y footer son **tres bloques quietos** (se pidió así: nada se monta sobre el héroe ni empuja al footer). `.catalog-groups` es una ventana con scroll propio (alto = 1 carta de `--card-h: 34rem` + 4 x 25 px, barra oculta); con la rueda encima, las cartas suben, se fijan con `top: i x 25px` dentro de la ventana y la anterior se encoge (rango `cover 0% cover calc(--deck-h - top - 25px)`); al terminar, la rueda sigue con la página. Las cartas 2-5 llevan `margin-top: 120px` (mayor que los 100 px de desfases) para que la siguiente **no asome** bajo la carta fija mientras espera el scroll; ojo: debe ser margen **superior**, uno inferior limita hasta dónde puede seguir fija cada carta y deshace el escalonado final. El héroe ya no es sticky y no hay márgenes de salida en `vh`. Lo que sigue describe el mecanismo anterior a nivel de página (sticky en la página, héroe fijo, márgenes en vh), ya reemplazado: cada categoría es una **carta apilada** que replica solo la animación de "glass-cards" de 21st.dev **en CSS puro** (sin GSAP): sticky con `top` = encabezado + 20 px + i x 25 px, fondo blanco **opaco** y alto mínimo común (`34rem`, así la de encima tapa por completo a la de atrás); la siguiente sube con el scroll normal y la anterior se encoge a `scale(1 - (5 - i) x 0.05)` con `animation-timeline` ligado a la entrada de la carta siguiente (hermana; una animación no puede leer la línea de tiempo de su propio ancestro; `timeline-scope` en `.catalog-groups`). Solo desde 900 px de ancho y 760 de alto y sin "reducir movimiento"; si no, lista normal. El héroe también queda fijo (sticky) y las cartas lo cubren; los márgenes de salida (héroe 45vh con compensación en `.catalog-groups`, cartas 8vh, última 20vh (antes 30/42vh: dejaban un hueco en blanco antes del footer; la última siempre lleva 12vh más y `.catalog-groups` compensa con -(última)+6vh), `flow-root`) son deliberados: un sticky no puede salirse del contenedor contando su margen. Sin conteos "N servicios" (se quitaron). Cada categoría lleva título grande, descripción (`intro`) y un párrafo de relleno (`body`, lorem ipsum pendiente de redactar en `data/servicesCatalog.ts`); las tarjetas llenan la altura de la carta (`grid-auto-rows: 1fr`), así que en categorías de 2 servicios quedan alargadas. **Se eliminó el "modo alto"** (escenario fijo con héroe + primera carta para pantallas ≥1400×1130): dejaba vacía la parte baja de la pantalla durante toda la animación y el footer solo aparecía al final; además el héroe nuevo ya no cabía en él. Ahora todas las pantallas ≥900×760 usan el mismo apilado. Contenedor de hasta **1800 px** (antes 1360) y, en escritorio, el héroe da más ancho a la foto (`0.8fr / 1.35fr`, foto 16:9). Exenta de "Pausar animaciones" (depende del scroll). Pendiente conocido: las cartas tapadas siguen siendo enfocables con el teclado. Las tarjetas van
  en 2 columnas y la última impar ocupa las 2. Cada tarjeta tiene **un solo enlace** (el nombre del servicio) estirado a toda la tarjeta (`::after`); la flecha es decorativa.
  Se eliminaron "Cosmética dental" y "Diseño de sonrisa" (categorías generales; 301 a `/servicios/` en `public/_redirects`). Ciclo de diseño en `gan-harness/servicios/`.
  Contenedor de 1360 px. Icono (con contorno `.siri`), título y lorem ipsum.
  Encabezado arriba (`CATALOG_HERO` en `data/servicesCatalog.ts`): etiqueta, "Servicios dentales en Tijuana", subtítulo, 4 beneficios con icono y, a la
  derecha, la **foto del laboratorio de la clínica** (`public/images/servicios/laboratorio.webp`, 1600x900; datos en `CATALOG_HERO.photo`) **sola** (sin etiquetas ni pie, se pidió así) y con el contorno luminoso azul `.siri` (la figura no lleva `overflow: hidden`: recortaría el contorno; la imagen se redondea sola). Bajo el subtítulo: beneficios en chips y un **índice numerado de las 5 categorías**: con el apilado activo, `goToCategory` (`ServicesPage.tsx`) cancela el ancla y lleva la ventana de cartas con `scrollTo` suave a `i/4` de su scroll máximo (hacia delante o atrás, recorriendo la animación igual que la rueda); sin apilado (celular, reduced-motion) queda el ancla normal. Un ancla simple solo funcionaba una vez porque la ventana tiene scroll propio. En la ventana de cartas (≥900x760) la carta mide `--card-h: 41rem` con letras y tarjetas más grandes.
  Al pasar el cursor, un degradado con movimiento llena la tarjeta (solo transform/opacity) y el contorno del icono gira.
  Inspirada en "Features 6" de React Bits Pro (bloque de pago, **no instalado**, código propio).
- **Spin Shutter en /servicios/** (`components/ui/SpinShutter.tsx`, estilos `styles/components/spin-shutter.css`, fotos en `data/servicesShowcase.ts`): **solo carrusel de fotos**, sin título, leyenda ni enlaces (se pidió quitarlos; las fotos serán del establecimiento de la clínica, por ahora son miniaturas de los servicios y `SHOWCASE_PHOTOS` se reemplaza). Órbita 3D de 12 fotos que se abre girando desde una pila al entrar a pantalla, **inclinada en diagonal como la página oficial** (`tilt` 30° con la cámara por encima del anillo + `roll` 26° sobre la pantalla; perspectiva cercana: arco cercano abajo, grande y nítido; arco lejano arriba, chico, difuminado y apagado). **Las fotos miran siempre de frente** (cada una se contra-gira con `--spin`, `--tilt` y `--roll`, que escribe el bucle rAF en el anillo). Giro automático (2.2 vueltas/min) que se frena con el cursor encima o con el foco del teclado dentro; **rebote**: con el mouse la órbita se inclina hasta 7° hacia el cursor con un resorte suave y vuelve al salir; arrastre con inercia (el puntero solo se captura tras moverse 8 px); **solo quedan los botones** anterior/siguiente (dos clics seguidos avanzan dos). **Inspirado en "Spin Shutter" de React Bits Pro (bloque de pago, NO instalado)**: su comando `npx shadcn@latest add @reactbits-starter/spin-shutter-tw` pide Tailwind y shadcn (el proyecto no los usa); es código propio sin librerías. Geometría en CSS (`--k`, `--n`, `--radius`, `--ss-spread` con `@property`); el giro, la profundidad (opacity/blur por tarjeta) y el foco los calcula un bucle `requestAnimationFrame` en un efecto (para fuera de pantalla, `IntersectionObserver`). **No se mueve con la rueda del mouse** (se la quitaría al scroll de la página). Sin movimiento ("reducir movimiento" / "Pausar animaciones", vía `lib/motion.ts`): anillo quieto y completo. Las fotos llevan su `alt` y los botones su etiqueta. Miniaturas de 720 px en `public/images/servicios/spin/` (mismo nombre que la foto original). Se coloca **a la derecha de las cartas de categorías** (`.catalog-split`: dos secciones lado a lado desde 1440 x 760 px con el apilado activo; el Spin Shutter mide lo mismo que la ventana de cartas, `--deck-h`, medidas movidas a `.catalog-split`); ahí las cartas quedan más angostas (riel de 200 px, sin el párrafo de relleno `body`, tarjetas compactas) pero con la misma altura, así el apilado no cambia. En pantallas menores o con "reducir movimiento", el Spin Shutter va debajo de las cartas.
- **Fondo de plasma en /servicios/**: `components/decor/PlasmaBackground.tsx`, el **Plasma original de React Bits con la librería `ogl`** (dependencia añadida a petición:
  `npm install ogl`). Shader original, con una adaptación para fondos claros (la fuerza del plasma decide la transparencia y el color es azul claro `#7bc3eb`).
  Como el plasma calcula su perspectiva con las proporciones del lienzo, se dibuja del tamaño de la pantalla (`100svh`) y queda fijo (`position: sticky`) detrás de la
  banda (`.catalog__plasma-view`; la banda usa `overflow: clip`, no `hidden`, para que el sticky funcione). Se dibuja a 0.4 de resolución y 30 fps; se pausa fuera de pantalla,
  con "reducir movimiento" y con "Pausar animaciones". `ogl` solo se usa dentro de `useEffect` (prerender en Node).
- **Contorno estilo Siri** (`.siri`, `styles/components/siri.css`): contorno nítido + resplandor que giran con `@property --siri-angle`
  (Chromium/Safari/Firefox recientes; sin soporte queda estático). Lo usan el orbe del hero (`.hero-orb`, siempre en movimiento, ~2 s por vuelta)
  y los iconos de las tarjetas de servicios (se animan solo con hover/foco). El elemento no debe crear contexto de apilamiento.
- **Texto con brillo** (`.shiny-text`, `styles/components/shiny-text.css`, inspirado en "Shiny Text" de React Bits, código propio): franja de luz blanco perla
  que cruza el texto (`background-clip: text`, ciclo de 4.2 s con pausa). Lo llevan el H1 del hero de la homepage (dos líneas: la segunda sobre tono atenuado)
  y el H1 de las páginas de servicio. Los títulos de servicio (`title` en `data/services.ts`) van en una sola cadena, con mayúscula en cada palabra
  importante (All on 4/6 se quedan igual) y **sin acento azul**. Solo sirve sobre fondos oscuros.
- **Página /beneficios/** (`pages/benefits/BenefitsPage.tsx`, estilos `styles/pages/benefits.css`, textos en `data/benefits.ts`): encabezado con la idea
  "No solo cuidamos tu sonrisa, también cuidamos tu dinero" (lista de beneficios + espacio de foto de recepción vacío, con el contorno luminoso `.siri`),
  tres tarjetas en este orden: Promociones ("Próximamente" en rojo, se sacude sutilmente), Aseguranzas americanas y Convenios con empresas (sin chips de marcadores),
  y franja de WhatsApp. Mismo plasma que /servicios/. Textos del agente de marketing de ECC, provisionales.
  Diseño "cuentas claras": tarjetas y franja como boletos de recibo (muescas y renglón punteado con máscara CSS, "Nº 01" por contador CSS). Cada boleto son **dos piezas** (información y talón, cada una con su máscara de muescas). Al pasar el cursor
  por el botón de la tarjeta, el talón se "arranca" de derecha a izquierda (bisagra a la izquierda: gira con `transform` y el lado del botón cae), el renglón se recorta en rojo
  (`clip-path`), la silueta del boleto queda marcada en rojo (`:has()` + `::after`) y las muescas desaparecen (`@property --notch` animado a 0). La esquina superior derecha del talón
  se corta (`clip-path` del talón) y se dobla: `.ticket-fold` (triángulo con degradado, línea de pliegue y `drop-shadow`; tamaño `--fold`). En la franja de WhatsApp pasa lo mismo
  pero con el **verde de WhatsApp** (`--wa-green: #25d366`) en vez de rojo y sin separarse del todo: se abre un poco por arriba (bisagra abajo a la izquierda en escritorio) y lleva el mismo doblez.
  Cada pieza lleva su contorno verde (`.benefits-cta__body::after` y `.benefits-cta__outline`, dentro de `.benefits-cta__tear`, que es el que gira) y al pasar el cursor el botón se pinta
  de ese verde (texto en tinta oscura por contraste). El botón tiene una zona de contacto
  extra (`::after` con `inset: -14px`) para no perder el hover mientras se mueve.
  El contorno rojo sigue la forma de **cada pieza** (no un rectángulo): la de arriba lleva el suyo (`.benefit-card__top::after`) y el talón otro (`.benefit-card__outline`, con la esquina
  cortada en diagonal) dentro de `.benefit-card__stub`, que es el contenedor que gira (el recorte del talón está en `.benefit-card__footer`, así que el contorno y el doblez no se recortan).
  Todo se detiene con "reducir movimiento" y "Pausar animaciones". Ciclo de diseño en `gan-harness/beneficios/`. `status: 'empty'` (noindex). Se llega desde el submenú Beneficios con "Ver todos los beneficios"
  (`overview` en `config/navigation.ts`, igual que Servicios). Las tres páginas internas (`/nuestras-promociones/`, `/convenios/`, `/insurance/`) ya tienen su propio diseño (ver "Páginas internas de Beneficios").
- **Páginas internas de Beneficios** (`/nuestras-promociones/`, `/convenios/`, `/insurance/`; **un diseño distinto cada una y sin fondo propio**: ni plasma, ni olas, ni curvas; el fondo de estas páginas se define después).
  Componentes `pages/{promotions,agreements,insurance}/…Page.tsx`, hojas `styles/pages/{promotions,agreements,insurance}.css` más `benefit-pages.css` (eyebrow, H1, texto, botón y "volver", compartidos), textos y marcadores en `data/benefitPages.ts`
  (los textos son provisionales: llegan en otra instrucción; las empresas de convenio son `AGREEMENT_PARTNERS` de `data/partners.ts`, las mismas de la home).
  Los tres son `status: 'empty'` (noindex). Cada una lleva arriba un enlace "Beneficios" de vuelta a `/beneficios/`.
  **Los logos de las páginas de Aseguranzas y Convenios no se mueven (se pidió expresamente; no volver a cintas ni carruseles). Lo único animado es la luz "Snake" del tablero de Aseguranzas (abajo).**
  · **Convenios, "Muro de marcas"** (rediseño oct-2026; reemplazó a los "Gafetes"): tarjeta azul marino con título llamativo + subtítulo (`AGREEMENT_SUMMARY`; **sin el número de empresas**, se quitó a petición) que ocupa 2/3/3 celdas + una ficha por empresa (logo y nombre) en rejilla de 2/3/6 columnas (con 15 fichas, filas completas en tableta y escritorio; en celular la última ficha ocupa la fila). Con mouse los logos van en gris y una ficha a la vez está **encendida** (`data-lit="true"`, estado en `pages/agreements/BrandWall.tsx`): logo a color, **ola que respira** (`.brand-tile__glow`, mismo recurso que las categorías de /servicios/: degradado que sube + 2 manchas que derivan, recortado por `.brand-tile__clip`), **contorno estilo Siri** (`.brand-tile__ring`, cónico que gira con `siri-spin`/`--siri-angle` de `siri.css`, recortado a anillo) y sombra, todo en el color de su marca (`accent` en `data/partners.ts`, el color más llamativo del logo, `--brand` inline; los puntos de antes se quitaron). **Ciclo automático (JS, `setInterval` de `STEP_MS` = 2 s)**: corre **solo, sin mouse**, mientras el muro está a la vista (`IntersectionObserver`, umbral 0.2; arranca en la primera ficha cada vez que entra a pantalla), en el orden de la lista y en bucle. **El mouse es independiente**: la ficha bajo el cursor también se enciende pero no frena ni reinicia el ciclo (puede haber dos encendidas). Solo con `(hover: hover)` y `pointerType === 'mouse'`. Encendida, el nombre pasa a **blanco sobre un chip** del color de la marca (oscurecido para contraste). Las manchas y el anillo usan `animation-play-state` (pausado/running), no se quitan, para que no salten al apagarse. Táctil, "reducir movimiento" y "Pausar animaciones": siempre a color, sin ola ni anillo ni ciclo. Entrada con `animation-timeline: view()`. Abajo, franja "¿Tu empresa aún no tiene convenio?". Inspirado en "Pixel Logo Grid" de 21st.dev (código propio, solo CSS, sin JS).
  · **Aseguranzas, "Tablero"**: encabezado con tarjeta de 3 pasos + WhatsApp; debajo, las **24 aseguranzas reales** (`INSURANCES` en `data/benefitPages.ts`, logos de la clínica recortados a 480 px máx. en `public/images/aseguranzas/`) en una rejilla de líneas finas (2/3/4/6 columnas; 24 llena filas completas) con marcas "+" en los cruces interiores. Cada logo recibe `--ar` (ancho/alto) y el CSS iguala su área con `sqrt()`. Inspirado en "Logo Cloud 2" de 21st.dev.
    **Línea "Snake"** (`pages/insurance/InsuranceGrid.tsx`): **es una línea, no el contorno de la celda** (se pidió así con un boceto). Cada ~0.7-2 s, si el tablero está a la vista, se dibuja un trazo SVG azul (degradado de marca + resplandor) sobre las líneas de la rejilla: nace en un cruce al azar y recorre de 2 a 4 tramos (nunca más de 4 casillas) con vueltas, sin retroceder ni cruzarse y sin usar las 4 esquinas (redondeadas); crece y se borra por la cola (`stroke-dashoffset`, `pathLength=1`; máx. 2 a la vez). El SVG (`.insurers__beams`, sobre `.insurers__board`) se crea en `useEffect` midiendo las celdas; no corre con "reducir movimiento", "Pausar animaciones" (`data-motion`), pestaña oculta ni fuera de pantalla.
  · **Promociones, "Carteles"**: carrusel manual (`Carousel`, scroll-snap, sin autoplay, 1/2/3 carteles completos por vista) de carteles con contorno azul marino grueso y sombra sólida, numeral hueco, espacio de imagen vacío y "Próximamente" en rojo.
  Ciclo de diseño anterior en `gan-harness/pagina-{convenios,aseguranzas,promociones}/` (las specs de convenios y aseguranzas describen los diseños con movimiento, ya descartados).
- **Footer al fondo en páginas cortas**: `#root` es flex en columna con `min-height: 100svh` y, cuando `main` tiene una sola banda (`main:has(> .band:only-child)`), esa banda se estira (`global/base.css`).
- **Menú de Servicios**: 9 enlaces en cuadrícula de 3 x 3 que se lee por filas (`MENU_SERVICE_PATHS` en `config/navigation.ts`: Implantes, All on 4, Coronas, Carillas, Ortodoncia, Alineadores, Limpieza, Endodoncias, Extracciones) y "Ver todos los servicios" abajo; las demás se ven en `/servicios/`.
- **Menú**: en escritorio con mouse, "Servicios" y "Beneficios" se abren al pasar el cursor (`NavDropdown` en `Header.tsx`, cierre con 150 ms de
  retraso por el hueco de 10 px); táctil y teclado siguen con clic/flechas.
  Sigue en `status: 'empty'` (noindex) hasta tener los textos reales.
- **Formulario de citas, servicios**: lista escrita a mano en `SERVICES` de `config/booking.ts` (aquí se cambia el orden); debe ser idéntica,
  y en el mismo orden, a `SERVICES` de `Code.gs`: `npm run build` falla si no coinciden. "Valoración general" va primero y "Limpieza dental" segundo.
- **Navegación MPA**: enlaces `<a>`; cada ruta tiene HTML prerenderizado. `main.tsx` hidrata si `#root[data-path]` coincide.
- **Prerender** (`scripts/prerender.mjs`): `vite build` + `vite build --ssr` + `renderToString` → `dist/<ruta>/index.html`, `404.html`, `robots.txt`, `sitemap.xml`.
- **Indexación**: `npm run build` = vista previa (todo noindex). Solo `npm run build:prod` (o `SITE_ENV=production`) hace indexable el homepage y genera el sitemap.
- **Diseño del formulario de citas** (rediseño completo, solo presentación; la lógica y el payload no cambian): tarjeta con velo azul y luz difusa,
  encabezado con icono `.siri` (gira mientras hay foco dentro), tres bloques numerados (Tus datos · Tu cita · Para terminar), campos con icono y halo de foco,
  **horario como botones** (radios `name="time"` sobre `BOOKING.slots`, ya no es un `<select>`), primera visita en dos tarjetas, consentimiento en caja,
  botón a todo el ancho con destello y confirmación tipo "boleto". Es **un solo componente compartido**: la homepage y las 14 páginas de servicio lo
  usan vía `Schedule` (en servicios, `defaultService` preselecciona el servicio y adapta el texto de apoyo). Estilos en `styles/pages/home/schedule.css`.
  Propuesta y rúbrica del rediseño en `gan-harness/`.
- **Datos del formulario** (pensados para pasarlos a Google Sheets): el envío al Apps Script lleva `firstName` y `lastName` por separado (no hay campo `name`),
  más `phone`, `email`, `service`, `date` (AAAA-MM-DD), `time` (HH:MM), `firstVisit` (booleano), `comments`, `consent`, `hp_x` (trampa anti-spam; nombre raro a propósito para que el autocompletado no lo rellene) y `source` (URL; el script solo la guarda si empieza por un dominio de `SOURCE_PREFIXES` de `Code.gs`).
  El script rechaza teléfonos con letras o símbolos (`^[+\d\s()-]{10,20}$`), correos de más de 120 caracteres y `firstVisit` que no sea booleano; quita `<` y `>` de todo texto; lee los límites anti-abuso dentro del candado;
  y **las solicitudes pendientes (amarillas) no bloquean horario**: solo lo ocupan las citas confirmadas, así un script no puede llenar el calendario con solicitudes falsas (a cambio, dos pacientes pueden pedir la misma hora y la clínica elige).
  Reglas: nombre y apellidos de 2 a 50 caracteres (en `booking.ts` y en `validate_` de `Code.gs`); el script los une solo para el título del evento.
- **Formulario de citas**: `src/features/booking/BookingForm.tsx` (lógica en `booking.ts`) → POST (text/plain, JSON) a una aplicación web de Google Apps Script
  (`integrations/google-calendar/`) que crea el evento en Google Calendar. URL en `VITE_BOOKING_ENDPOINT` (copiar `.env.example` a `.env.local` en desarrollo o `.env.production` al compilar).
  Horarios en `src/config/booking.ts` y en `CONFIG` de `Code.gs` (deben coincidir). Sin URL configurada (vista previa), el formulario valida y muestra la confirmación con la nota "Vista previa: no se envió ninguna solicitud", sin enviar nada.
- **Hero**: inspirado en "Hero 21" de React Bits Pro (bloque de pago, **no instalado**), recreado con código propio:
  aurora GLSL en WebGL (`components/decor/AuroraBackground.tsx` + `auroraShaders.ts`, sin dependencias), orbe con el isotipo y etiquetas
  ambientales decorativas. Contenido a la izquierda en escritorio (burbujas a la derecha desde 1280 px), centrado en móvil. Tema `HERO.theme` (`dark`/`light`).
- **Historia animada** (`pages/home/sections/CareStory.tsx`, textos e imagen en `data/story.ts`, estilos `styles/pages/home/story.css`):
  tres mensajes bajo el hero que entran con el scroll (1 desde la izquierda, 2 desde abajo al centro, 3 desde la derecha) con
  animaciones CSS `animation-timeline: view()`, sin librerías ni JS. **Rediseño "hilo de sonrisa"**: cada línea entra enfocándose (blur→nítido), las palabras
  se encienden en cascada (`--i` por palabra; línea de tiempo `--beat` por mensaje), las frases en azul se subrayan con un marcador (`background-size`) y un hilo SVG
  se revela de arriba abajo (`clip-path`) uniendo los tres mensajes. Estilos base = estado final (sin soporte o con "reducir movimiento" todo se ve completo); "Pausar animaciones"
  excluye todo `[class*='story__']`. Los mensajes 1 y 3 llegan desde
  fuera de la pantalla (cada línea mide lo que su texto y se desplaza 110 % de su ancho, así van a la par; el 2 sube 320 px) y las tres aparecen con desvanecido; siguen invisibles mientras estén en el 35 % inferior
  de la pantalla (`view(block 0px 35%)`), así que no se ven al abrir la página ni en pantallas 2K. El `overflow` de esa banda es `clip` (con `hidden` la animación no avanza). Sin soporte
  (p. ej. Firefox) o con "reducir movimiento" todo se ve estático. Sin imagen. La banda es azul claro: la ola del hero es de
  ese tono y Agendar lleva ola superior.
- **Hilo de la historia animada**: es **una sola curva** (`threadPath` en `CareStory.tsx`, trazada sobre un boceto del cliente: baja por la derecha del mensaje 1, rodea al 2 por la izquierda y da la vuelta bajo el 3; sus coordenadas se salen de 0–100 a propósito para quedar lejos del texto) con las **mismas curvas animadas de Agendar** (`AnimatedLines` exportado desde `SectionDecor.tsx`: ondulan con SMIL y las
  recorre una luz) y además se dibuja con el scroll a lo largo de su recorrido (máscara `.decor-reveal`: prop `revealId` de `AnimatedLines`, `stroke-dashoffset` con la línea de tiempo `--thread`).
  **Punta del hilo** (`ThreadTip` en `CareStory.tsx`, `.story__tip`): caja que recorre la misma curva con `offset-path` (en píxeles: `useAreaSize` mide el
  área y el hilo también se dibuja en píxeles tras medir) con la misma línea de tiempo y rango que la máscara (animación `story-tooth-path`), así va en la punta del trazo y se detiene al final. Esa línea de tiempo (`--thread`) ignora el 30 % inferior de la pantalla (`view-timeline-inset`) y la punta nace con opacidad 0, así el diente no se ve al abrir la página ni antes de llegar a la historia.
  Lleva 3 destellos de cuatro puntas (`.tooth-sparkle`, tipo ✨, el grande con interior blanco y un contorno amarillo fino con halo suave, y dos blancos con halo azul; titilan; sí se pausan
  con "Pausar animaciones"). **Diente** (`Tooth` en `CareStory.tsx`, `.story__tooth`): ícono de caricatura gordito y amigable (corona redonda, 2 raíces cortas), con volumen en CSS 3D (7 copias SVG de la
  silueta apiladas en Z; lados casi blancos, caras con degradado y brillo; sombra en el contenedor porque un `filter` sobre `preserve-3d` aplanaría las capas). Se mece de lado a lado con la misma
  línea de tiempo del hilo (`story-tooth-sway`) y termina de frente. Sin WebGL ni librerías. **Las versiones anteriores en WebGL/ogl (muela realista, perla, 2 y 3 raíces) se descartaron
  porque no convencieron al cliente.** Sin soporte de scroll o con "reducir movimiento": hilo completo y diente de frente al final. Las curvas de Agendar y los anillos
  **no** llevan animación de scroll (se pidió expresamente dejarlas como estaban). "Con confianza" empieza bajo "taparte" con `data-indent` (contenido generado por CSS, no es texto de la página).
- **Bandas**: hero, secciones y footer forman una sola hoja continua del mismo ancho (`--band-gap`, `--band-radius`),
  sin espacios grises: se alternan `band--white` / `band--tint` y cada unión es una ola de un solo color (`SectionDecor` wave).
  Solo Agendar lleva curvas de esquina a esquina (`flow`) por debajo del contenido (Reseñas ya no), con ondulación SMIL lenta y un
  destello que las recorre; en < 960 px pasan a una franja al pie de la sección. Aseguranzas y Contacto llevan un
  círculo azul (sin logo) con 5 arcos animados (`rings`) que van de la ola de su propia banda al borde (Contacto: arriba
  a la derecha en escritorio; en móvil/tableta, a la derecha de "Síguenos"). "Síguenos" va bajo el correo, a la derecha, centrado con las redes. Todo se pausa con
  "reducir movimiento". Contenido interior a 1200 px.
  La aurora se dibuja a baja resolución, máx. 30 fps, y se pausa fuera de pantalla o con "reducir movimiento".
  Espaciado compacto: `--band-padding` en `tokens.css`; el hero tiene su propio `padding-block` en `hero.css`.
- **Footer**: banda oscura `band--night` (`--color-night`) con "hilos de luz" en WebGL, inspirado en Ghost Fibers de
  React Bits (código propio): `<AuroraBackground effect="fibers">` (shader `FIBERS_FRAGMENT` en `auroraShaders.ts`) y
  un velo a la izquierda para leer el texto. Usa los colores y la tipografía del hero. Marca: el **mismo orbe iluminado del hero** (`components/ui/BrandOrb.tsx`, estilos `styles/components/brand-orb.css`: contorno `.siri` que gira + halo que respira; lo pidió el jefe de la clínica en lugar del corazón blanco) con el nombre debajo, a la izquierda de las listas en escritorio y arriba en celular. El orbe se pausa fuera de pantalla (`data-offscreen`, IntersectionObserver) y con "reducir movimiento"/"Pausar animaciones"; su resplandor queda sobre los hilos. `public/images/logo-isotipo-blanco.png` ya no se usa. Barra inferior: derechos a la izquierda, redes sociales **centradas** (48 px), enlaces a la derecha.
  La unión con la sección anterior es una ola blanca dentro del footer (`SectionDecor` wave `inverse`), así los hilos llegan
  hasta la curva; la sección previa (Contacto, páginas vacías) no lleva ola inferior.
- **Componentes compartidos**: `decor/Band` (sección de la hoja: tono, olas, curvas y decor), `ui/SectionIntro`, `ui/ContactItem`,
  `ui/ExternalLink`, `ui/AddressText`, `layout/Logo`; `lib/cx`; `scheduleHref` y `ariaCurrent` en `config/routes.ts`.
- **Comentarios**: cada archivo principal abre con un encabezado (qué hace, dónde están sus textos y estilos).
- **Carrusel** reutilizable (`src/components/ui/Carousel.tsx`): scroll-snap, botones y teclado, sin autoplay (lo usan Reseñas, Servicios destacados y Promociones). Botones centrados debajo; avanzan una página exacta (ancho útil + gap). Cada uso solo cambia variables de la pista en `styles/components/carousel.css`: `--per-view` (tarjetas completas por vista; 1 en celular, 2 desde 700 px), `--gap` y `--pad`; así la siguiente tarjeta nunca asoma y las cuentas no se desfasan.
- **Aseguranzas y convenios** (`pages/home/sections/Partners.tsx`, estilos `styles/pages/home/partners.css`): Aseguranzas muestra **8 logos reales sueltos** (sin tarjeta, sin nombre visible; el nombre va en el `alt`; los elige `HOME_INSURANCES` en `data/partners.ts`) y Convenios **los 8 más populares** (`AGREEMENT_PARTNERS.slice(0, 8)`) igual. Logos de 370 x 148 px de celda (img hasta 312 px, `--w` evita estirar los chicos). El **panel izquierdo** de cada carril lleva icono con degradado, chip (`badge`), título grande, texto y botón (`btn--secondary btn--sm`), con divisor punteado azul de marca en escritorio que va de borde a borde de la tarjeta (el encabezado ocupa las dos filas y se extiende por el padding con `--rail-pad`; el botón va con `position: absolute` abajo a la izquierda y el encabezado le reserva 64 px) y luz celeste en la esquina. **Dos carruseles independientes** (uno por grupo de `data/partners.ts`),
  en forma de **cinta continua solo con CSS** (sin JS ni `Carousel`): Aseguranzas avanza a la izquierda y Convenios a la derecha (`rail-scroll`, 38 s);
  la lista se repite dos veces (la copia lleva `aria-hidden` + `inert`). **No se pausa con el cursor** (se pidió así); sí con "Pausar animaciones"; con "reducir movimiento" no se mueve y se desliza a mano.
  Se pidió expresamente que **no se parezca al carrusel de Servicios destacados**. Ciclo de diseño en `gan-harness/aseguranzas/` (la spec describe un diseño anterior, ya descartado).
- **Servicios destacados** (homepage): usa el **mismo carrusel de Reseñas** (`components/ui/Carousel.tsx`, scroll-snap, sin autoplay; modificador `.carousel--services` en `styles/pages/home/services.css`). **6 servicios elegidos en `FEATURED_PATHS`** (`data/featuredServices.ts`: Implantes, All on 4, Ortodoncia, Coronas, Carillas, Blanqueamiento).
  Una tarjeta **completa** por vista en celular, 2 desde 700 px y 3 desde 1100 px (`--slide` exacto: `calc((100% - gaps) / N)`), así nunca asoma la siguiente. Los botones anterior/siguiente van **centrados debajo** y avanzan una página exacta
  (`Carousel.tsx` calcula ancho útil + `column-gap`, así aterriza justo en una tarjeta); el movimiento es el desplazamiento suave nativo con scroll-snap.
  Tarjeta (`FeaturedServices.tsx`, `.service-card`): foto arriba de borde a borde (16:9) con la etiqueta "Más solicitado" y el icono `.siri` a caballo entre foto y texto (gira solo con hover/foco); debajo título, gancho, 3 frases y botón al pie.
  Cada tarjeta toma título, gancho, 3 frases y foto (`image`) del hero de su página de servicio (`data/services.ts`; `image.cardPosition` ajusta el encuadre, `flip` solo en Ortodoncia); sin foto queda el degradado de marca. Sin `framer-motion`.
  **Se eliminó** el carrusel conectado anterior (`ConnectedCarousel`, con autoplay y vecinas colapsadas): se veía raro y las vecinas cortaban los nombres.
- **Mapa / ubicación** (`components/ui/LocationMap.tsx`, estilos `styles/components/location-map.css`, dibujo en `data/locationMap.ts`, usado en `sections/ContactLocation.tsx`): **reemplaza al mapa de Google** (se quitó el iframe). Inspirado en "Location Map" de 21st.dev, código propio, **sin `motion` ni Tailwind** (el prompt original los pedía; el proyecto no los usa) y en azul oscuro de la marca (`--color-ink` → `--color-night`) con trazos celestes.
  En reposo es una tarjeta de 240 x 140 centrada en el recuadro `.contact__map` (que conserva el espacio del mapa antiguo), con cuadrícula tenue, icono, etiqueta "Zona Río" con punto pulsante y nombre; con el mouse se inclina en 3D (±8°, solo `pointerType === 'mouse'`). **Se abre y se cierra sola**: al llegar a la sección (IntersectionObserver, `threshold: 0.35`, ≥ 35 % visible) espera **2 s** (`OPEN_DELAY` en `LocationMap.tsx`) y se abre; al salir de la zona (< 35 %) se cierra, y se repite al volver a entrar. Si la persona la abre o la cierra a mano, no se automatiza hasta que salga de la zona; tampoco se abre si el foco ya está dentro. También con clic (un `<button>` cubre la tarjeta), Enter/Espacio; Escape cierra.
  Al expandirse **llena todo el recuadro** (transición de `width/height` con resorte) y se dibuja un **plano propio de las calles de alrededor** (SVG con `viewBox` y `slice`, coordenadas en el lienzo 767 x 866 de la captura de referencia): Av. Vía Rápida Pte. (diagonal grande), José María Velasco, David Alfaro Siqueiros, Av. Diego Rivera, Frida Kahlo y Saturnino Herrán, bloques, parque y el canal del río; las calles se trazan una a una (`stroke-dashoffset` con `pathLength=1`), los bloques aparecen escalonados y el **pin rojo de Dental Nakeji** (`PIN` en `data/locationMap.ts`, rojo `--loc-pin`) cae con rebote con halo, anillo pulsante y su nombre; el encuadre (`MAP_VIEW`, `0 0 767 866`) muestra todo el lienzo para dar contexto de los alrededores. Las calles van rectas sobre las dos direcciones de la cuadrícula (la de la Vía Rápida, 37°, y la perpendicular de Velasco/Siqueiros), con su ancho real, y los edificios son **rectángulos girados esos mismos 37°** (`rect()` en `data/locationMap.ts`) para que queden cuadrados y alineados; la pista ovalada del estacionamiento se genera con `stadium()`. Solo nombres de calles, **sin negocios de terceros**; no es un mapa real ni usa imágenes de Google. Expandida **no lleva texto encima** (solo el nombre en el pin): la dirección y el botón **"Cómo llegar"** (`SITE.address.mapsUrl`, `btn btn--secondary btn--sm`) están en el panel de contacto de la izquierda. Se eliminó `SITE.address.mapEmbedUrl` (ya nada lo usa); `mapsUrl` alimenta "Cómo llegar". Un solo `<button>` cubre la tarjeta y la alterna.
- **Diseño**: referencia Refero/Lovi con colores del logo (`--color-ink #2a4269`, `--color-brand #3a70b0`). Tokens en `src/styles/global/tokens.css`.
- **Estructura** (ver `src/README.md`): `app/`, `pages/<página>/` (+ `sections/`), `features/` (lógica propia: booking),
  `components/{layout,ui,decor}`, `config/`, `data/` (textos editables, incl. `data/footer.ts`), `seo/`, `lib/`.
  Importaciones con alias `@/` (vite.config.ts + tsconfig.app.json), sin archivos índice.
- **Estilos**: `src/styles/{global,layout,components,pages/home}`; `index.css` solo importa **en orden de cascada**; no reordenar.
- **Fuentes**: Manrope (titulares) e Inter, autoalojadas; se precargan solo las latinas.
- **Datos editables**: contacto/redes/horario en `src/config/site.ts`; textos en `src/data/home.ts`; footer en `src/data/footer.ts`; servicios en `src/data/featuredServices.ts`;
  aseguranzas/convenios en `src/data/partners.ts`; reseñas en `src/data/reviews.ts`; menú en `src/config/navigation.ts`.
- **JSON-LD** (`src/seo/head.ts`): `Dentist` con datos publicados en nakejidental.com. Sin horarios, coordenadas ni calificaciones.

## Comandos
```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run lint
npm run build        # vista previa (noindex)
npm run build:prod   # producción (indexable + sitemap)
npm run preview      # sirve dist/ en http://localhost:4173
```
No hay pruebas automatizadas. `build` ya corre `tsc -b`; `typecheck` + `lint` + `build` es la verificación completa.
En `npm run dev` no hay prerender ni hidratación: los errores de hidratación solo se ven con `build` + `preview`.
Verificación rápida: `dist/index.html` debe contener el H1, "Solicita tu cita", el JSON-LD y `<div id="root" data-path="/">`.

## Pendientes
- Páginas nuevas (noindex, lorem ipsum por ahora): `/aviso-de-privacidad/`, `/terminos-y-condiciones/` y `/preguntas-frecuentes/`. Sus textos viven en `src/data/legal.ts` y `src/data/faq.ts`; la historia y el equipo de `/nosotros/`, en `src/data/about.ts`. Falta el texto real de cada una.
- Reseñas: se dejan con marcadores "Paciente N" hasta tener las reales (decisión del usuario).
- Botón "Pausar animaciones" también arriba, además del del footer (WCAG 2.2.2). Para después.
- Versión en inglés (`/en/`) y en español. Para después.
- Botón "Conocer más" del blog: se queda visible aunque `/blog/` esté vacío (decisión del usuario).
- Confirmar con la clínica: frases del hero (`HERO.highlights`: "Dentistas certificados", "Más de 35 años"), **días y horarios de citas** (`booking.ts` + `Code.gs`) y horario de atención (`SITE.hours`).
- Instalar el Apps Script con la cuenta de Google de la clínica y poner la URL en `.env.production` (guía: `integrations/google-calendar/README.md`).
- Publicar el texto legal del **aviso de privacidad** (el formulario recoge datos personales y de salud).
- Reseñas reales: Google Places API o widget, respetando la atribución de Google (`src/data/reviews.ts`).
- Nombres/logos reales de aseguranzas y convenios (`src/data/partners.ts`).
- Fotos reales de la clínica y una imagen para compartir de 1200×630 (hoy `og:image` es el logo). Favicons PNG/ICO opcionales.
- Al publicar: redirecciones 301 del sitio actual. Borrador en `public/_redirects` (formato Netlify / Cloudflare Pages; GitHub Pages
  no las aplica). Los slugs retirados llevan `-en-tijuana` (odontologia-general-en-tijuana, periodoncia-en-tijuana,
  diseno-de-sonrisa-en-tijuana, dentaduras-en-tijuana). Faltan por mapear ~28 artículos `blog-*` de la raíz (van a `/blog/`).
  `build:prod` falla si el homepage sale con noindex.
- SEO pendiente: imagen para compartir 1200×630 (hoy `og:image` es el logo, `twitter:card` summary), favicons PNG/ICO y
  `apple-touch-icon` PNG de 180 px, JSON-LD de servicio (`Service` + `BreadcrumbList`) cuando las páginas tengan contenido.
- **No publicar** hasta tener las páginas internas: sus URLs ya están indexadas en el sitio actual y aquí serían noindex.
- Publicación: hosting estático que sirva `dist/<ruta>/index.html` y `404.html`; `X-Robots-Tag: noindex` en vistas previas.
- Search Console, Google Business Profile (NAP idéntico a `site.ts`) y analítica (el sitio actual usa GA4 `G-25XL0E88DQ`).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Accesibilidad y movimiento (revisión de oct. 2026)
- Foco: `:focus-visible` usa `outline` (no box-shadow) en `global/base.css`; en bandas oscuras (hero, hero de servicio, footer) es blanco.
- Botón "Pausar animaciones" en el footer (`components/ui/MotionToggle.tsx`): pone `html[data-motion='paused']` (CSS) y emite el
  evento `motionchange` que escuchan `SectionDecor` (SMIL/CSS) y `AuroraBackground` (WebGL). La historia animada no se pausa.
- Los SVG animados se pausan fuera de pantalla; el WebGL del footer solo se inicia a ~800 px de verse.
- Menú móvil abierto: `main` y `footer` quedan `inert`. Carrusel y botón de envío usan `aria-disabled` (conservan el foco).
- El texto del botón de WhatsApp es azul marino sobre `#25D366` (el blanco daba 1.98:1).

## Contenido de los servicios (guía para editar)
- Los textos de cada página de servicio viven en `src/data/services.ts` (highlights, `about`), y su fuente documentada en `gan-harness/contenido/<slug>.json` (fuentes, originalityCheck y lo que la clínica debe confirmar). Si editas un texto en uno, cópialo al otro: no hay nada que los mantenga iguales.
- Verificación rápida: los textos de `services.ts` deben coincidir con los JSON (se comprobó con un script, no hay comando del proyecto para hacerlo).
- Lista de servicios del formulario: `src/config/booking.ts` y `integrations/google-calendar/Code.gs` deben coincidir (en nombres y orden); `npm run build` falla si no coinciden.
- Las reglas de la carta apilada de `/servicios/` (760 px de alto, 1130 px en modo alto, márgenes en `vh`) dependen unas de otras: revisa el apilado en el navegador antes de tocarlas.
