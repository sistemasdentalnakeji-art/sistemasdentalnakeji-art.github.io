# Fotos HD para el hero de las páginas de servicio

Objetivo: fotos que parezcan tomadas de verdad **dentro de Dental Nakeji**, con personas, en alta definición.
Las fotos reales del consultorio (ventanales, sillón, vista de la ciudad) son la **referencia** del lugar, no la imagen final.

## Cómo generarlas

1. Usa un generador que acepte imágenes de referencia: ChatGPT (imágenes), Gemini (Nano Banana),
   Midjourney (`--cref`/`--sref`) o Firefly.
2. **Adjunta 2–3 fotos reales del consultorio** como referencia (las de los ventanales y el sillón) y pega
   el prompt base + el del servicio.
3. Pide formato **horizontal 16:9, mínimo 2560×1440**.
4. Guarda cada imagen con el nombre indicado en `public/images/servicios/` (PNG o JPG está bien;
   yo la convierto a WebP optimizado y la conecto en `src/data/services.ts`).

## Prompt base (va primero, en cada imagen)

```
Fotografía profesional hiperrealista en alta definición, horizontal 16:9, tomada dentro de la clínica dental
de las imágenes de referencia: conserva el mismo lugar — ventanales de piso a techo con marcos de aluminio
negro, vista panorámica de Tijuana (colinas con casas, el canal de concreto del Río Tijuana, avenidas con
árboles, torres en construcción, cielo azul despejado), muebles blancos con cajones, piso de porcelanato
brillante, sillón dental azul marino con unidad dental, lámpara dental y brazo de instrumental.

Personas reales, tono de piel natural, textura de piel real, sin retoque excesivo ni aspecto plástico.
Las caras NO se ven de frente: personas de espaldas, de perfil parcial o vistas desde atrás del sillón
(del paciente se ve el cabello sobre el cabezal). Dentista con uniforme azul marino, cubrebocas y guantes.

Luz natural de día que entra por los ventanales, tonos fríos azules y blancos, nitidez alta.
Cámara full frame, lente 35 mm, f/2.8, profundidad de campo media, estilo fotografía editorial de salud.
Composición: la acción en la mitad DERECHA; el tercio izquierdo más simple y un poco más oscuro
(ahí va el texto de la página). Sin texto, sin logotipos, sin marcas de agua.
```

## Prompt por servicio (se agrega después del base) → nombre de archivo

| Servicio | Escena | Archivo |
|---|---|---|
| Implantes dentales | La dentista, de perfil, trabaja con instrumental sobre un paciente recostado en el sillón; del paciente solo se ve la nuca y el cabello. Asistente de espaldas al fondo. | `implantes-dentales.png` |
| All on 4 implants | Dentista y asistente de pie junto al sillón, de espaldas a la cámara, revisan una radiografía panorámica en un monitor; el paciente recostado, solo se ve su cabello. | `all-on-4.png` |
| All on 6 implants | Plano abierto del consultorio con la vista de la ciudad; el dentista, de espaldas, acomoda el brazo de instrumental junto al sillón con el paciente recostado visto desde atrás. | `all-on-6.png` |
| Coronas | Primer plano de las manos enguantadas del dentista sosteniendo una corona dental de cerámica, junto al sillón; ventanales y ciudad desenfocados al fondo. | `coronas.png` |
| Carillas dentales | La dentista, de perfil parcial, sostiene una guía de colores dentales junto a la paciente recostada, que se ve de espaldas con cabello largo sobre el cabezal. | `carillas-dentales.png` |
| Blanqueamiento dental | Paciente recostado visto desde atrás del sillón, lámpara dental encendida sobre él; la dentista de perfil a su lado. Ambiente tranquilo, luz azul suave. | `blanqueamiento-dental.png` |
| Cosmética dental | La dentista, de perfil parcial, muestra a la paciente (de espaldas, sentada en el sillón) un diseño de sonrisa en una tableta. | `cosmetica-dental.png` |
| Limpieza dental | Higienista dental de perfil realiza una limpieza con el instrumental al paciente recostado, visto desde atrás del sillón. | `limpieza-dental.png` |
| Endodoncias | El dentista, de perfil y con lupas de aumento, trabaja con instrumental fino; el paciente recostado visto desde atrás del sillón. | `endodoncias.png` |
| Ortodoncia | Primer plano de las manos enguantadas del dentista mostrando un modelo dental con brackets junto al sillón; ventanales desenfocados. | `ortodoncia.png` |
| Invisalign / Alineadores | La dentista, de perfil parcial, entrega un alineador transparente a la paciente sentada de espaldas en el sillón. | `invisalign-alineadores.png` |
| Odontopediatría | Un niño sentado en el sillón visto desde atrás (se ve su cabello); la dentista de perfil le muestra un espejo dental, ambiente tranquilo. | `odontopediatria.png` |

Consejo: genera 3–4 variantes por servicio y elige la que tenga manos, guantes e instrumental sin deformaciones.
