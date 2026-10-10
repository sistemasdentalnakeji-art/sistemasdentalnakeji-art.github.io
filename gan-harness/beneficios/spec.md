# Brief: rediseño de /beneficios/ (Dental Nakeji)

## Objetivo
Subir la calidad visual de la página `/beneficios/` sin cambiar su estructura aprobada:
1. Encabezado con la idea "No solo cuidamos tu sonrisa, también cuidamos tu dinero" + lista de 4 beneficios + espacio de foto con tarjeta.
2. Tres tarjetas: Promociones (marcada "Próximamente"), Convenios con empresas, Aseguranzas.
3. Franja oscura de WhatsApp.
4. Fondo de plasma (`PlasmaBackground`) idéntico al de /servicios/. NO se modifica el componente ni sus parámetros.

## Archivos que se pueden tocar (solo estos)
- `src/pages/benefits/BenefitsPage.tsx`
- `src/styles/pages/benefits.css`
- `src/data/benefits.ts` (solo si hace falta un campo nuevo; no cambiar los textos aprobados)

NO tocar: `/nuestras-promociones/`, `/convenios/`, `/insurance/` (quedan en blanco), `routes.ts`, `App.tsx`, `PlasmaBackground.tsx`, ni nada de otras páginas.

## Reglas del proyecto (obligatorias)
- Todo componente debe poder renderizarse en Node (prerender): nada de `window`/`document` durante el render.
- Solo CSS/SVG/React; **sin dependencias nuevas**.
- Movimiento: solo `transform`/`opacity`; debe quedar quieto con `prefers-reduced-motion: reduce` y con `html[data-motion='paused']`.
- Accesibilidad: contraste AA, foco visible (ya global), el botón redondo de cada tarjeta es lo único clicable, nombres accesibles.
- Colores y medidas con los tokens de `src/styles/global/tokens.css` (`--color-ink`, `--color-brand`, `--color-sky-strong`, `--shadow`, `--radius-pill`, `--ease`…). Contorno luminoso `.siri` ya existe (`styles/components/siri.css`).
- Contenido: solo marcadores. Sin promociones, descuentos, precios ni nombres de empresas inventados.
- Responsive: 3 columnas ≥1024 px, 2 columnas en tableta, 1 en celular; sin scroll horizontal a 375 px.

## Dirección visual pedida
- Parecida en estructura a /servicios/, pero con composición propia (no una copia).
- Idea memorable sugerida (elige una y ejecútala bien): el "cuidado del dinero" como detalle visual sutil (p. ej. un trazo o monedero/moneda hecha con formas simples que se integra al diente/escudo del icono), sin literalidad cursi.
- Jerarquía clara: el titular domina; las tarjetas se leen de un vistazo.
- Prioridad: excelencia visual > funcionalidad extra. Una página pulida vale más que muchas ideas a medias.
