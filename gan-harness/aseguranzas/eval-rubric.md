# Rúbrica de evaluación: Aseguranzas y convenios (carrusel "credencial")

Puntaje por criterio 1–10. **Umbral para aprobar: 8/10 ponderado.**

### Fidelidad a la dinámica de Servicios destacados (peso 0.35)
- 12 tarjetas intercaladas (Aseguranza 1, Empresa 1, …) en un solo carrusel; 2 activas + 1 vecina colapsada por lado en escritorio; 1 activa en <900 px.
- Flechas en bucle (de la 12 a la 1 y al revés), sobre el borde de las vecinas (en móvil dentro de la tarjeta).
- Autoplay de 8 s solo con el carrusel a la vista; se pausa con cursor, foco, botón de pausa, reduced motion y "Pausar animaciones".
- Transiciones de papel suaves (ancho/alto/posición); contenido de la activa se revela sin saltos; vecinas y ocultas con `inert`/`aria-hidden`.
- Cada tarjeta enlaza a `/insurance/` (aseguranza) o `/convenios/` (convenio); el CTA de WhatsApp sigue.

### Diseño distinto y pulido visual (peso 0.25)
- Se lee como "credencial de afiliación" y no como copia de Servicios: aseguranza oscura (ink + resplandor brand, texto blanco) vs convenio claro (tint, borde sky-strong, texto ink).
- Placa de logo de 120 px con marcador (borde discontinuo + icono building), chip de tipo, nombre Manrope 700 1.5 rem, 3 líneas, botón pill, banda lateral brand-light; vecina colapsada con círculo-icono, banda y nombre vertical.
- Jerarquía, alineación, radios y sombras consistentes con la marca; sin degradados abusivos ni logos inventados; destello `pc-shine` único y sutil.

### Accesibilidad y movimiento reducido (peso 0.15)
- Contraste ≥ 4.5:1 (texto, chip, botón) en ambos tipos; foco visible en flechas, pausa y botones; nombres accesibles distintos por tarjeta; decoración `aria-hidden`.
- Con `prefers-reduced-motion: reduce` y `html[data-motion='paused']`: sin destello, sin autoplay/movimiento; solo `transform`/`opacity` animados.

### Responsive (peso 0.15)
- Probar 360, 768, 900 y 1280 px: sin scroll horizontal, sin texto cortado, `--card-h`/`--peek` correctos (escritorio 360/64/20; móvil 400/30/14), flechas alcanzables con el pulgar, ≥ 900 px muestra 2 activas.

### Calidad de código y regresión de Servicios (peso 0.10)
- `ConnectedCarousel`: solo props opcionales `className`, `prevLabel`, `nextLabel`; defaults = textos actuales; Servicios sin cambio de DOM/CSS/aspecto.
- Reglas nuevas solo en `partners.css` bajo `.fc--partners`/`.pc`; CSS viejo (`.partner-groups`, `.partner-group*`, `.partner-card*`, `.carousel--partners`) eliminado; `Carousel` intacto en Reseñas.
- Sin `window`/`document` en el render; sin dependencias nuevas; encabezado de archivo actualizado.

## Checks automatizables (todos deben pasar)
1. `npm run typecheck`
2. `npm run lint`
3. `npm run build` y luego revisar `dist/index.html`: contiene 12 tarjetas ("Aseguranza 6" y "Empresa 6"), "Consultar mi cobertura" y `<div id="root" data-path="/">`.
4. Grep sin resultados: `partner-card`, `partner-group`, `carousel--partners` en `src/`.
5. `package.json` sin cambios en dependencias.
6. `npm run preview`: consola sin errores ni avisos de hidratación.

## Checklist de verificación visual
- [ ] Aseguranza (oscura) y convenio (clara) se distinguen de un vistazo, también como vecinas colapsadas.
- [ ] Flecha siguiente 12 veces vuelve a la tarjeta 1; anterior desde la 1 va a la 12.
- [ ] Autoplay avanza a los 8 s; cursor/foco/pausa lo detienen.
- [ ] Tab recorre flechas, pausa y botones de las activas; las no activas no reciben foco.
- [ ] Servicios destacados idéntico a antes (captura comparada) y con sus textos de flechas originales.
- [ ] Reseñas (`Carousel`) sigue funcionando.
- [ ] Reduced motion y "Pausar animaciones": sin destello ni autoplay.

## Descalificadores (máximo 4 en el criterio afectado)
- Se inventan empresas, aseguranzas, logos, coberturas o descuentos.
- Se agrega una dependencia o cambia el aspecto/comportamiento de Servicios destacados.
- Hay `window`/`document` en el render o error de hidratación.
- Scroll horizontal a 360 px.
