# Brief: página /nuestras-promociones/ (diseño "Carteles")

**Alcance:** solo diseño. Todo es marcador ("Promoción N", "Próximamente"): no hay promociones ni descuentos confirmados.
**Archivos:** `src/pages/promotions/PromotionsPage.tsx`, `src/styles/pages/promotions.css`, contenido en `src/data/benefitPages.ts`.

## Idea visual
Encabezado grande a la izquierda y, debajo, un carrusel de **carteles** (tarjetas con contorno azul marino grueso y sombra sólida
desplazada, numeral vacío "01", espacio de imagen vacío, etiqueta "Próximamente" en rojo) que se desliza con dedo, teclado y botones
(componente `Carousel` existente, scroll-snap). Es el único de los tres que se controla a mano.

## Restricciones
- **Sin fondo propio**. Sin plasma ni decoración.
- No es un enlace: sin efecto hover que sugiera clic. Sin autoplay.
- Una sola `h1`. No inventar promociones, precios ni fechas.
