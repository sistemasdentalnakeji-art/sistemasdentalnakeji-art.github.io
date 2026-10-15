# Correcciones aplicadas a los servicios

Fuente: `correcciones-servicios-completas.md` (textos aprobados). Aplicado en `src/data/services.ts` y en los JSON de
`gan-harness/contenido/` (`highlights` y `aboutText`, que copian lo mismo).

Equivalencias: **Gancho** = `subtitle` (lo que sale en la tarjeta destacada y en el hero); **Destacadas** = `highlights`;
**Descripción** = `about.text` (sección "Acerca del tratamiento").

## Qué cambió por servicio

| # | Servicio | Gancho | Destacadas | Descripción |
|---|----------|:------:|:----------:|:-----------:|
| 1 | Implantes Dentales | igual | puntos finales | igual |
| 2 | All on 4 implants | **cambió** | puntos finales | igual |
| 3 | All on 6 implants | igual | puntos finales | igual |
| 4 | Coronas Dentales | igual | puntos finales | **cambió** |
| 5 | Carillas Dentales | **cambió** | **cambió** | **cambió** |
| 6 | Blanqueamiento Dental | **cambió** | **cambió** | **cambió** |
| 7 | Limpieza Dental | igual | puntos finales | **cambió** |
| 8 | Tratamiento de Endodoncia | igual | **cambió** | **cambió** |
| 9 | Ortodoncia para tu Sonrisa | igual | **cambió** (3.ª) | **cambió** |
| 10 | Alineadores Transparentes | **cambió** | **cambió** | **cambió** |
| 11 | Odontopediatría para Niños | igual | puntos finales | **cambió** |
| 12 | Dentaduras a tu Medida | igual | puntos finales | **cambió** |
| 13 | Periodoncia para tus Encías | igual | puntos finales | igual |
| 14 | Extracciones Simples y de Juicio | **cambió** | puntos finales | **cambió** |

"Puntos finales" = el documento añade punto final a cada destacada. Son 42 destacadas; se copiaron tal cual.

Los títulos ya coincidían con el documento en los 14 servicios, así que no se tocaron.

No se cambió el título de cada sección "Acerca del tratamiento" (`about.title`, por ejemplo "El implante dental"): el
documento no lo incluye.

## Verificación

- Los 14 servicios: todos sus textos (gancho, destacadas y descripción) están en `services.ts` tal cual el documento.
- Build (`npm run build`) pasa: el filtro de `services.ts` (3 destacadas y descripción) no falla.
- Tarjetas destacadas (6 en la homepage): sin desbordes, el botón queda dentro de cada tarjeta y las destacadas ocupan una línea cada una.
- Descripción por página (escritorio, 1280 px): 3 a 5 renglones, según `CLAUDE.md`, en 13 de 14.

## Pendiente de decisión

- **Dentaduras a tu Medida**: la descripción ocupa **6 renglones** en escritorio (la guía es 3 a 5). Es texto aprobado, así que
  no lo cambié. Si quieres que quepa, la opción es quitar la última frase ("Durante el proceso, te acompaña y da seguimiento…").
