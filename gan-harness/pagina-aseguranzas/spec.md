# Brief: página /insurance/ (diseño "Marco interior")

**Alcance:** solo diseño. Textos y logos son marcadores ("Aseguranza N"); los 3 pasos son provisionales.
**Archivos:** `src/pages/insurance/InsurancePage.tsx`, `src/styles/pages/insurance.css`, contenido en `src/data/benefitPages.ts`.

## Idea visual
Dos columnas. A la izquierda el texto (volver, etiqueta, H1, texto, 3 pasos numerados, botón de WhatsApp). A la derecha un **marco
redondeado** (un carrusel "interior") con un muro de logos en tres columnas verticales que suben y bajan alternadas, con bordes
que se desvanecen arriba y abajo. En celular el marco va debajo del texto.

## Restricciones
- **Sin fondo propio** de página. El marco solo lleva borde; las placas pueden ser celestes.
- Solo CSS, transform. Pausa con el cursor, "Pausar animaciones" y "reducir movimiento" (muro quieto, sin copias).
- Una sola `h1`. Copias `aria-hidden` + `inert`. Logo real vía `Partner.logo`.
