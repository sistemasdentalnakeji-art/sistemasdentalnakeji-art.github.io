# Brief: rediseño de "Aseguranzas y convenios" (homepage, Dental Nakeji)

## Objetivo
Reemplazar los dos carruseles de logos de `src/pages/home/sections/Partners.tsx` por **un solo carrusel con la misma dinámica que "Servicios destacados"** (`ConnectedCarousel`) pero con **diseño visual propio**: concepto **"credencial de afiliación"** (tarjeta tipo carné). Blueprint aprobado por el arquitecto; no se rediseña.

## Alcance de archivos
- `src/components/ui/ConnectedCarousel.tsx`: props opcionales `className`, `prevLabel`, `nextLabel` (defaults = textos actuales de Servicios). **Servicios no debe cambiar** (mismo DOM, mismas clases, mismos textos).
- `src/pages/home/sections/Partners.tsx`: un `ConnectedCarousel` con 12 tarjetas intercaladas (Aseguranza 1, Empresa 1, Aseguranza 2, Empresa 2, … hasta 6+6), `className="fc--partners"`. Se conserva `Band`, `SectionDecor rings`, `SectionIntro` y el CTA de WhatsApp (`PARTNERS_CTA`).
- `src/data/partners.ts`: campo `badge: 'Aseguranza' | 'Convenio'` en `PartnerGroup`.
- `src/styles/pages/home/partners.css` (se importa después de `services.css`): reglas nuevas, todas bajo `.fc--partners` / `.pc`. Se **eliminan** `.partner-groups`, `.partner-group*`, `.partner-card*` y `.carousel--partners` (en `carousel.css`; `Carousel` sigue en Reseñas).
- NO tocar: `services.css` (salvo nada), `data/services.ts`, `featuredServices.ts`, páginas internas, `routes.ts`, nuevas dependencias.

## Reglas del proyecto (obligatorias)
- Render en Node: nada de `window`/`document`/`Date.now()` durante el render.
- Sin dependencias nuevas. Solo marcadores: "Aseguranza N" / "Empresa N"; sin empresas, logos, descuentos ni coberturas inventadas.
- Movimiento solo `transform`/`opacity`; quieto con `prefers-reduced-motion: reduce`; `html[data-motion='paused']` ya lo cubre `preferences.css`.
- Tokens de `tokens.css`: `--color-ink #2a4269`, `--color-brand #3a70b0`, `--color-brand-light #7bc3eb` (solo decorativo), `--color-sky-strong #d5e8f6`, `--color-tint #eaf1fa`, `--radius-pill`, `--ease`.

## Dinámica (idéntica a Servicios, verificable)
1. Escritorio: 2 tarjetas activas al centro, una vecina colapsada por lado, resto ocultas; móvil (<900 px): 1 activa.
2. Flechas anterior/siguiente sobre el borde de las vecinas (en móvil, dentro de la tarjeta); dan la vuelta en bucle (12 → 1 y 1 → 12).
3. Autoplay: avanza cada 8 s (`fc-tick`); corre solo con el carrusel a la vista; se pausa con cursor, foco de teclado, botón de pausa, reduced motion (sin autoplay) y "Pausar animaciones".
4. Transiciones de papel (`data-role`, `--x/--w/--h/--o`) heredadas; `inert`/`aria-hidden` de las tarjetas no activas heredados.
5. `aria-label` del carrusel = título de la sección; `prevLabel`/`nextLabel` propios en Partners (p. ej. "Anterior aseguranza o convenio"); en Servicios siguen los textos actuales.

## Medidas (`.fc--partners .fc__viewport`)
- Escritorio: `--card-h:360px; --peek-h:250px; --peek:64px; --gap:20px; margin-inline:0` (sin el ensanche de 100 px de Servicios).
- Móvil (<900 px), con su propio `@media`: `--peek:30px; --gap:14px; --card-h:400px; --peek-h:300px`.

## Tarjeta `.pc` ("credencial")
Cada tarjeta es un enlace a `INSURANCE.path` (aseguranza) o `AGREEMENTS.path` (convenio); el botón pill es el elemento interactivo y su nombre accesible incluye el marcador ("Ver Aseguranza 1").
- **Aseguranza**: fondo `--color-ink` con resplandor `--color-brand` (radial), texto blanco.
- **Convenio**: fondo `--color-tint`, borde 1.5 px `--color-sky-strong`, texto `--color-ink`.
- Contenido de arriba abajo: placa blanca de 120 px de ancho para el logo (marcador: borde discontinuo + icono `building`, `aria-hidden`; si hay `logo`, `<img alt="">`), chip de tipo (`badge`), nombre Manrope 700 1.5 rem, texto de 3 líneas (`group.text`, con `line-clamp: 3`), botón pill.
- Banda lateral `--color-brand-light` decorativa (`aria-hidden`, sin significado).
- **Vecina colapsada**: color del tipo, círculo con icono arriba, banda vertical, nombre en vertical abajo.
- **Movimiento**: un destello diagonal único al activarse (`pc-shine`, solo `transform`/`opacity`), desactivado con reduced motion.
- Anti-slop: sin degradados morados, sin logos inventados, sin tarjetas blancas genéricas con sombra; el carné se distingue por tipo de un vistazo (oscuro vs claro).

## Accesibilidad / SSR
Contraste texto ≥ 4.5:1 en ambos tipos (incluido chip y botón); foco visible (outline global; blanco sobre fondos oscuros); sin `window`/`document` en el render; el prerender del homepage genera las 12 tarjetas en el HTML; sin errores de hidratación en `build` + `preview`.

## Casos límite
Sin JS: se ve la fila con las tarjetas del HTML prerenderizado sin desbordar. 360 px: sin scroll horizontal. Texto del nombre largo no desborda (ellipsis/wrap). Sin soporte de `@property`/`has()` no debe romper el layout.

## Definición de hecho
`npm run typecheck`, `npm run lint` y `npm run build` pasan; Servicios destacados se ve y se comporta igual que antes; no quedan clases viejas `partner-*` en CSS ni TSX; se actualiza la sección "Aseguranzas" de `CLAUDE.md` si aplica.
