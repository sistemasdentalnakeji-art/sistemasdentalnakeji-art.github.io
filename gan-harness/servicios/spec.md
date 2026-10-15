# Spec: rediseño de /servicios/ (Dental Nakeji)

Blueprint YA APROBADO: no se rediseña, se implementa tal cual.

## Archivos permitidos
`src/pages/services/ServicesPage.tsx`, `src/data/servicesCatalog.ts`, `src/styles/pages/services-index.css`, `src/config/routes.ts` (solo title/description de `/servicios/`). No tocar `PlasmaBackground`, `siri.css`, páginas de servicio ni `package.json`.

## Datos (`servicesCatalog.ts`)
`CATALOG_GROUPS`: `{id, navLabel, title, intro, services}`. Se elimina `CATALOG`. 14 servicios, una sola vez cada uno, repartidos 4-3-3-2-2. **El build debe fallar** si un servicio de las rutas queda fuera o duplicado.

| # | id | navLabel / title | Servicios |
|---|----|------------------|-----------|
| 01 | implantes-y-rehabilitacion | Implantes y rehabilitación dental | Implantes dentales, All on 4 implants, All on 6 implants, Dentaduras |
| 02 | estetica-dental | Estética y restauración | Coronas, Carillas dentales, Blanqueamiento dental |
| 03 | ortodoncia-y-odontopediatria | Ortodoncia y odontopediatría | Ortodoncia, Alineadores, Odontopediatría |
| 04 | limpieza-y-encias | Limpieza y salud de encías | Limpieza dental, Periodoncia |
| 05 | endodoncia-y-extracciones | Endodoncia y extracciones | Endodoncias, Extracciones simples y de juicio |

Intros (literales, sin precios, cifras ni garantías):
01 "Opciones para reponer dientes ausentes, desde una pieza hasta toda la arcada." · 02 "Coronas, carillas y blanqueamiento para cuidar la forma, el color y la apariencia de tus dientes." · 03 "Para alinear la sonrisa y cuidar los dientes de los más pequeños." · 04 "El cuidado de base: limpieza dental y atención de las encías." · 05 "Tratamientos para conservar una pieza dental o retirarla cuando es necesario."

H1: "Servicios dentales" + acento "en Tijuana". CTA de cada tarjeta: "Ver servicio".

## Semántica
- 1 `h1`, 1 `h2` por categoría (5), 1 `h3` por servicio (14).
- `<nav aria-label="Categorías de servicios">` con 5 chips: alto mínimo 44 px, enlace ancla `#id`, número 01-05 con `tabular-nums`, hacen wrap (sin scroll horizontal).
- Cada tarjeta: UN solo enlace, texto descriptivo = nombre del servicio, estirado a toda la tarjeta (`::after` con `inset: 0`). Flecha decorativa con `aria-hidden`. Sin enlaces anidados.
- Cada `<section>` lleva `id` = id de la categoría y `aria-labelledby` a su h2.

## Diseño
- Sección por categoría sin contenedor: línea fina arriba; 56 px entre grupos (móvil) / 72 px (escritorio).
- Riel izquierdo: numeral grande (contador CSS, solo trazo azul, `aria-hidden`), h2 con `text-wrap: balance`, intro con `text-wrap: pretty`, "N servicios". `position: sticky` solo en >= 900 px; en móvil va arriba y no es sticky.
- Rejilla de tarjetas: 1 col; 2 col desde 600 px; en grupos de 3 la última (impar) ocupa 2 columnas.
- Se mantienen: hero, plasma, `.siri` en iconos, glow en hover, flecha de 46 px.
- Radios concéntricos (radio externo = interno + padding). Sin tarjetas dentro de tarjetas.
- Prohibido `transition: all`. Movimiento solo `transform`/`opacity`; quieto con `prefers-reduced-motion` y `html[data-motion='paused']`.
- Sin dependencias nuevas. Render apto para Node (sin `window`/`document`).

## Responsive
360 px: 1 col, riel arriba. 768 px: 2 col, riel arriba. 900 px: riel 260 px + 1fr, sticky. 1280 px: riel 320 px. Sin scroll horizontal en ningún ancho.

## SEO
`/servicios/` sigue `status: 'empty'` (noindex, fuera del sitemap). Actualizar title y description en `routes.ts` con el tema "Servicios dentales en Tijuana".
