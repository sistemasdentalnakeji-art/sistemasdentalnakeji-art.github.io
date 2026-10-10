# Rúbrica de evaluación: /beneficios/ (modo diseño)

Puntaje por criterio 1–10. Umbral para aprobar: **7.5** ponderado.

### Calidad de diseño (peso 0.35)
Jerarquía, tipografía, espaciado, ritmo vertical, color dentro de la marca (azul `--color-ink`/`--color-brand`, celeste). ¿El titular domina? ¿Las tarjetas se escanean rápido? ¿Se siente de la misma familia que /servicios/ pero con composición propia?

### Originalidad (peso 0.30)
¿Hay una idea visual propia y memorable (no solo "tarjetas blancas con sombra")? ¿Evita patrones genéricos (blobs, degradados morados, tarjetas dentro de tarjetas)? ¿El detalle sobre "cuidar el dinero" se siente sutil e intencional?

### Oficio / ejecución (peso 0.25)
Alineación, consistencia de radios y sombras, estados hover/foco, texto que no se desborda, contraste AA, movimiento solo con transform/opacity y respeto de `prefers-reduced-motion` y `data-motion='paused'`. Sin `window`/`document` en el render.

### Funcionalidad (peso 0.10)
Responsive 1/2/3 columnas, sin scroll horizontal a 375 px, enlaces correctos de cada tarjeta (`/nuestras-promociones/`, `/convenios/`, `/insurance/`), `npm run typecheck` y `npm run lint` pasan, sin errores de consola.

## Descalificadores (puntaje máximo 4 en el criterio afectado)
- Se inventan promociones, descuentos, precios o nombres de empresas/aseguranzas.
- Se modifica `PlasmaBackground` o las páginas internas en blanco.
- Se agrega una dependencia.
