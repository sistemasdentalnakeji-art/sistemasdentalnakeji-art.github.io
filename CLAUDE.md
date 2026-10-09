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
- Las páginas internas (beneficios, contacto, nosotros, aviso de privacidad) son **destinos vacíos** (`EmptyPage`): noindex, fuera del sitemap.
- **Páginas de servicio** (plantilla `pages/service/ServicePage.tsx`, estilos `styles/pages/service.css`): columnas 1 y 2 del
  los 12 servicios del submenú (las 3 columnas). Rutas creadas con `service(...)` en `routes.ts` (`template: 'service'`);
  textos, imagen y enlace al blog en `src/data/services.ts`. Estructura fija: 1) hero con foto de borde a borde + degradado,
  título, gancho, 3 frases, botones WhatsApp / Reservar cita; 2) info breve (hoy lorem ipsum) + botón al blog + contenedor
  vacío para animación 3D (`.service-about__media`, solo un comentario); 3) `Schedule` con el servicio preseleccionado.
  Siguen en `status: 'empty'` (noindex) hasta tener textos definitivos. Sin fotos por ahora (hero en azul de marca);
  las fotos HD con personas van en `public/images/servicios/` (prompts en `docs/prompts-hero-servicios.md`).
- No hacer: blog, panel, base de datos, bots, n8n, contenido de páginas internas, secciones extra sin pedirlo.
- Aseguranzas/convenios y reseñas: **solo marcadores** ("Aseguranza N", "Empresa N", "Paciente N"). No investigar empresas, no inventar reseñas.

## Decisiones
- **URLs**: se conservan las del sitio actual (`src/config/routes.ts`), con barra final. Nuevas: `/convenios/`, `/aviso-de-privacidad/`, `/blog/`.
- **Servicios**: 12 en `SERVICE_ROUTES`, ordenados por prioridad (doctores + demanda); el submenú los llena por columnas de 4.
- **Navegación MPA**: enlaces `<a>`; cada ruta tiene HTML prerenderizado. `main.tsx` hidrata si `#root[data-path]` coincide.
- **Prerender** (`scripts/prerender.mjs`): `vite build` + `vite build --ssr` + `renderToString` → `dist/<ruta>/index.html`, `404.html`, `robots.txt`, `sitemap.xml`.
- **Indexación**: `npm run build` = vista previa (todo noindex). Solo `npm run build:prod` (o `SITE_ENV=production`) hace indexable el homepage y genera el sitemap.
- **Formulario de citas**: `src/features/booking/BookingForm.tsx` (lógica en `booking.ts`) → POST (text/plain, JSON) a una aplicación web de Google Apps Script
  (`integrations/google-calendar/`) que crea el evento en Google Calendar. URL en `VITE_BOOKING_ENDPOINT` (copiar `.env.example` a `.env.local` en desarrollo o `.env.production` al compilar).
  Horarios en `src/config/booking.ts` y en `CONFIG` de `Code.gs` (deben coincidir). Sin URL configurada (vista previa), el formulario valida y muestra la confirmación con la nota "Vista previa: no se envió ninguna solicitud", sin enviar nada.
- **Hero**: inspirado en "Hero 21" de React Bits Pro (bloque de pago, **no instalado**), recreado con código propio:
  aurora GLSL en WebGL (`components/decor/AuroraBackground.tsx` + `auroraShaders.ts`, sin dependencias), orbe con el isotipo y etiquetas
  ambientales decorativas. Contenido a la izquierda en escritorio (burbujas a la derecha desde 1280 px), centrado en móvil. Tema `HERO.theme` (`dark`/`light`).
- **Historia animada** (`pages/home/sections/CareStory.tsx`, textos e imagen en `data/story.ts`, estilos `styles/pages/home/story.css`):
  tres mensajes bajo el hero que entran con el scroll (1 desde la izquierda, 2 desde abajo al centro, 3 desde la derecha) con
  animaciones CSS `animation-timeline: view()`, solo transform/opacity, sin librerías ni JS. Los mensajes 1 y 3 llegan desde
  fuera de la pantalla (cada línea mide lo que su texto y se desplaza 110 % de su ancho, así van a la par; el 2 sube 320 px) y las tres aparecen con desvanecido; siguen invisibles mientras estén en el 35 % inferior
  de la pantalla (`view(block 0px 35%)`), así que no se ven al abrir la página ni en pantallas 2K. El `overflow` de esa banda es `clip` (con `hidden` la animación no avanza). Sin soporte
  (p. ej. Firefox) o con "reducir movimiento" todo se ve estático. Sin imagen. La banda es azul claro: la ola del hero es de
  ese tono y Agendar lleva ola superior.
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
- **Carrusel** reutilizable (`src/components/ui/Carousel.tsx`): scroll-snap, botones y teclado, sin autoplay.
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
- Confirmar con la clínica: frases del hero (`HERO.highlights`) y del mensaje 3 de la historia animada (`STORY.decision`: "Dentistas certificados", "Más de 35 años"), **días y horarios de citas** (`booking.ts` + `Code.gs`) y horario de atención (`SITE.hours`).
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
