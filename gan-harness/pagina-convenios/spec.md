# Brief: página /convenios/ (diseño "El río")

**Alcance:** solo diseño. Textos y logos son marcadores ("Empresa N") hasta la siguiente instrucción.
**Archivos:** `src/pages/agreements/AgreementsPage.tsx`, `src/styles/pages/agreements.css`, contenido en `src/data/benefitPages.ts`.

## Idea visual
Tres carriles de placas de empresas que fluyen como un río, a ancho completo de la banda, cada uno con otro tamaño de placa,
otra velocidad y dirección alterna (izquierda / derecha / izquierda). Los tamaños y velocidades distintos dan profundidad.
Encima, un encabezado alineado a la izquierda (volver a Beneficios, etiqueta, H1, texto) y debajo un botón de WhatsApp.

## Restricciones
- **Sin fondo propio**: sin plasma, aurora, olas ni curvas. La banda queda en blanco liso (el fondo se define después).
- Solo CSS para el movimiento (transform), sin dependencias. Pausa con el cursor, con "Pausar animaciones" y con "reducir movimiento"
  (cinta quieta, sin copia, desplazable a mano). La copia del bucle va `aria-hidden` + `inert`.
- Una sola `h1`. Cuando llegue un logo real: `Partner.logo` en `data/partners.ts` y se pinta solo.
- Distinto de la cinta de la homepage (`Partners.tsx`): píldoras con borde, tres carriles, ancho completo.
