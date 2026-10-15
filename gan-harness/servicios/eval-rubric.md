# Rúbrica de evaluación: /servicios/ (modo implementación)

Puntaje por criterio 1-10. Umbral para aprobar: **8/10** ponderado. Referencia: `spec.md` de esta carpeta.

### Fidelidad al blueprint y SEO semántico (0.30)
5 categorías, 14 servicios, 4-3-3-2-2, cada uno una vez; títulos, ids e intros literales; H1 "Servicios dentales" + "en Tijuana"; CTA "Ver servicio"; 1 h1, 5 h2, 14 h3; nav "Categorías de servicios" con 5 anclas; un solo enlace por tarjeta con el nombre como texto; title/description actualizados; sigue noindex. `CATALOG` eliminado y build que falla si falta o sobra un servicio.

### Diseño y pulido (0.25)
Riel con numeral de trazo azul, h2 balanceado, intro, "N servicios"; líneas finas y espacios 56/72 px; radios concéntricos; sin tarjetas anidadas; hero, plasma, `.siri`, glow en hover y flecha de 46 px conservados; la última tarjeta impar ocupa 2 columnas; estados hover/foco claros; sin patrones genéricos.

### Accesibilidad y reduced-motion (0.15)
Chips >= 44 px; foco visible; contraste AA; flecha y numeral `aria-hidden`; sin enlaces anidados; movimiento solo `transform`/`opacity`; quieto con `prefers-reduced-motion` y `html[data-motion='paused']`; sin `transition: all`.

### Responsive (0.15)
360 (1 col, riel arriba, no sticky), 768 (2 col), 900 (riel 260 px + 1fr, sticky), 1280 (riel 320 px). Sin scroll horizontal; chips con wrap.

### Calidad de código y sin regresión (0.15)
Sin dependencias nuevas, render apto para Node, comentarios de encabezado al día, resto de páginas intactas, `CLAUDE.md` coherente con el cambio.

## Checks automatizables (todos deben pasar)
1. `npm run typecheck`, `npm run lint`, `npm run build` sin errores.
2. `dist/servicios/index.html`: exactamente 1 `<h1`, 5 `<h2`, 14 `<h3`; 14 enlaces a `/servicios/...` (rutas de servicio) dentro de las tarjetas; 5 `href="#id"` del nav que coinciden con 5 `id` de sección; contiene `noindex`.
3. `grep -rn "CATALOG\b" src` sin referencias al antiguo `CATALOG` (solo `CATALOG_GROUPS` y `CATALOG_HERO`); `grep "transition: *all"` en `services-index.css` sin resultados.
4. `package.json` y lockfile sin cambios.
5. `npm run preview`: consola sin errores ni avisos de hidratación en `/servicios/`.
6. Prueba negativa: quitar un servicio de un grupo (o duplicarlo) hace fallar `npm run build`.

## Checklist visual (360, 768, 900, 1280)
- [ ] Riel sticky solo desde 900 px; numerales 01-05 correctos.
- [ ] Chips envuelven en 360 px, sin scroll lateral.
- [ ] Grupos de 3: la tercera tarjeta ocupa 2 columnas desde 600 px.
- [ ] Hover: glow y flecha se mueven; con reduced-motion y "Pausar animaciones" quedan quietos.
- [ ] Clic en cualquier punto de la tarjeta navega al servicio correcto.
- [ ] Texto sin desbordes (p. ej. "Extracciones simples y de juicio").

## Descalificadores (máximo 4 en el criterio afectado)
- Servicio faltante, duplicado o en categoría distinta al blueprint.
- Precios, cifras o garantías inventados; intros alteradas.
- Dependencia nueva o `package.json` modificado.
- `transition: all` o animación de propiedades de layout.
- Página indexable (pierde noindex) o `PlasmaBackground` modificado.
- Más de un enlace por tarjeta o tarjeta no clicable por completo.
