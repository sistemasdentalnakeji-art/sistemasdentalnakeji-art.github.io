# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Dental Nakeji — Homepage

Sitio de la clínica Dental Nakeji (Tijuana). **Alcance actual: solo el homepage (`/`).**
React 19 + Vite + TypeScript. Sin backend propio y sin router. Encargo original: `Prompt_Claude_Homepage_Nakeji.md`.

## Cómo se renderiza (leer antes de tocar componentes)
- Un solo árbol `<App path>` (`src/app/App.tsx`) se usa en dos entradas: `entry-server.tsx` (Node, `renderToString` al compilar)
  y `main.tsx` (navegador). Por eso **todo componente debe poder renderizarse en Node**: nada de `window`/`document`/`Date.now()`
  durante el render; ese código va en `useEffect`. Un render distinto entre servidor y cliente rompe la hidratación.
- `findRoute(path)` en `config/routes.ts` decide la página; `route.status` (`'ready'` | `'empty'`) decide si es indexable
  (solo con `--production`) y si entra al sitemap. Para "publicar" una página interna hay que cambiar su `status`; las rutas con `template: 'service'` se dibujan solas con la plantilla
  (y `data/services.ts` falla al compilar si a una le falta su contenido); las demás se eligen en `App.tsx`.
  Antes de pasar un servicio a `ready`: quitar el lorem ipsum (tiene título y descripción SEO propios en `routes.ts`; el canonical y Open Graph se emiten solos).
  Página nueva: `pages/<nombre>/<Nombre>Page.tsx` + `styles/pages/<nombre>.css` (importada en `styles/index.css`).
- `index.html` contiene los marcadores `<!--app-head-->` y `<div id="root"><!--app-html--></div>`; `prerender.mjs` falla si cambian.
  Las etiquetas `<head>` salen de `buildHead` (`seo/head.ts`) al compilar y de `applyHead` en desarrollo.
- `dist/` y `dist-server/` son salidas de compilación.

## Alcance (estructura aprobada)
Header → Hero → Historia animada (`CareStory`) → Agendar (con formulario) → Servicios destacados → Aseguranzas y convenios → Reseñas de Google → Contacto y ubicación → Footer.
- Las páginas internas (contacto, nosotros, aviso de privacidad y las tres de Beneficios: promociones, convenios y aseguranzas) son **destinos vacíos**
  (`EmptyPage`): noindex, fuera del sitemap. `/beneficios/` y `/servicios/` ya tienen su propia página (también noindex hasta publicar).
- **Páginas de servicio** (plantilla `pages/service/ServicePage.tsx`, estilos `styles/pages/service.css`): columnas 1 y 2 del
  los 12 servicios del submenú (las 3 columnas). Rutas creadas con `service(...)` en `routes.ts` (`template: 'service'`);
  textos, imagen y enlace al blog en `src/data/services.ts`. Estructura fija: 1) hero con foto de borde a borde + degradado,
  título, gancho, 3 frases, botones WhatsApp / Reservar cita; 2) info breve (hoy lorem ipsum) + botón al blog + contenedor
  vacío para animación 3D (`.service-about__media`, solo un comentario); 3) `Schedule` con el servicio preseleccionado.
  Siguen en `status: 'empty'` (noindex) hasta tener textos definitivos. Sin fotos por ahora (hero en azul de marca);
  las fotos HD con personas van en `public/images/servicios/`.
- No hacer: blog, panel, base de datos, bots, n8n, contenido de páginas internas, secciones extra sin pedirlo.
- Aseguranzas/convenios y reseñas: **solo marcadores** ("Aseguranza N", "Empresa N", "Paciente N"). No investigar empresas, no inventar reseñas.

## Decisiones
- **URLs**: se conservan las del sitio actual (`src/config/routes.ts`), con barra final. Nuevas: `/convenios/`, `/aviso-de-privacidad/`, `/blog/`.
- **Servicios**: 12 en `SERVICE_ROUTES`, ordenados por prioridad (doctores + demanda); el submenú los llena por columnas de 4.
  Otros 4 con página propia pero **fuera del submenú** en `MORE_SERVICE_ROUTES` (diseño de sonrisa, dentaduras, periodoncia, extracciones).
  Ambas listas llevan su contenido en `data/services.ts` (falla al compilar si falta alguno).
- **Página /servicios/** (`pages/services/ServicesPage.tsx`, textos/orden/iconos en `data/servicesCatalog.ts`, estilos `styles/pages/services-index.css`):
  16 tarjetas en filas de 4 (fila 1-3 = columnas del submenú, fila 4 = `MORE_SERVICE_ROUTES`), contenedor de 1360 px. Icono (con contorno
  `.siri`), título y lorem ipsum arriba; abajo "Conocer más del servicio" + botón redondo, que es **lo único clicable** (la tarjeta no es enlace).
  Encabezado arriba (`CATALOG_HERO` en `data/servicesCatalog.ts`): etiqueta, "Más servicios dentales", subtítulo, 4 beneficios con icono y, a la
  derecha, un **espacio de foto vacío** (`.catalog-hero__photo`, con instrucciones en `ServicesPage.tsx` para añadirla) con la tarjeta "Cuidamos más que sonrisas".
  Al pasar el cursor, un degradado con movimiento llena la tarjeta (solo transform/opacity) y el contorno del icono gira.
  Inspirada en "Features 6" de React Bits Pro (bloque de pago, **no instalado**, código propio).
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
  (`overview` en `config/navigation.ts`, igual que Servicios). Las tres páginas internas (`/nuestras-promociones/`, `/convenios/`, `/insurance/`) siguen vacías a propósito.
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
  botón a todo el ancho con destello y confirmación tipo "boleto". Es **un solo componente compartido**: la homepage y las 16 páginas de servicio lo
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
  un velo a la izquierda para leer el texto. Usa los colores y la tipografía del hero; el logo va en blanco con un filtro CSS.
  La unión con la sección anterior es una ola blanca dentro del footer (`SectionDecor` wave `inverse`), así los hilos llegan
  hasta la curva; la sección previa (Contacto, páginas vacías) no lleva ola inferior.
- **Componentes compartidos**: `decor/Band` (sección de la hoja: tono, olas, curvas y decor), `ui/SectionIntro`, `ui/ContactItem`,
  `ui/ExternalLink`, `ui/AddressText`, `layout/Logo`; `lib/cx`; `scheduleHref` y `ariaCurrent` en `config/routes.ts`.
- **Comentarios**: cada archivo principal abre con un encabezado (qué hace, dónde están sus textos y estilos).
- **Carrusel** reutilizable (`src/components/ui/Carousel.tsx`): scroll-snap, botones y teclado, sin autoplay (lo usan Aseguranzas y Reseñas).
- **Servicios destacados** (homepage): `components/ui/ConnectedCarousel.tsx` (inspirado en "Connected Carousel" de 21st.dev, código propio) con los
  **6 primeros de `SERVICE_ROUTES`** (`data/featuredServices.ts`), **de 2 en 2** en escritorio y de 1 en 1 bajo 900 px. Cada tarjeta toma título,
  gancho, 3 frases y foto (`image`) del hero de su página de servicio (`data/services.ts`); el espacio de la foto queda vacío mientras no haya foto.
  Flechas anterior/siguiente sobre el borde de las vecinas colapsadas (`.fc__nav`; en celular, dentro de la tarjeta sobre la franja de la foto); dan la vuelta en bucle.
  **Todas las tarjetas están en una fila** (como la referencia): 2 activas al centro (1 en celular), una vecina colapsada a cada lado (icono + nombre en vertical, o su foto)
  y el resto ocultas; cada una tiene un papel (`data-role`) y el componente le pone `--x/--w/--h/--o`, que `services.css` anima con transiciones (translate/width/height).
  El contenido de la activa tiene tamaño fijo y se va revelando al crecer la tarjeta. Medidas con `cqw` (variables `--peek`, `--gap` = 20 px, `--active`, `--card-h`).
  Cada tarjeta es independiente (se quitaron los puentes curvos y las pestañas de progreso). Activas de 500 px de alto (`--card-h`), vecinas de 340 px, y 20 % más largas que antes (la fila se ensancha hasta 100 px por lado con margen negativo en `.fc__viewport`, solo en escritorio: 598 px de ancho en pantallas grandes, ~514 px a 1280); el espacio de la foto
  (`.fc-card__media`, a la derecha) no lleva fondo azul: el degradado azul queda solo en las vecinas colapsadas. Sin `framer-motion`.
  **Autoplay**: solo corre con el carrusel a la vista (IntersectionObserver); avanza al terminar la animación CSS `fc-tick` (8 s, elemento invisible `.fc__tick`); se pausa con el cursor,
  foco de teclado, el botón de pausa de abajo (único control visible), "reducir movimiento" (sin autoplay) y "Pausar animaciones". Estilos en `styles/pages/home/services.css`.
- **Mapa**: iframe de Google Maps con `loading="lazy"` (`SITE.address.mapEmbedUrl`).
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
No hay pruebas automatizadas ni repositorio git. `build` ya corre `tsc -b`; `typecheck` + `lint` + `build` es la verificación completa.
En `npm run dev` no hay prerender ni hidratación: los errores de hidratación solo se ven con `build` + `preview`.
Verificación rápida: `dist/index.html` debe contener el H1, "Solicita tu cita", el JSON-LD y `<div id="root" data-path="/">`.

## Pendientes
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
