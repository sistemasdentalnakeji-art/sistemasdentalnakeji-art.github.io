# Estructura de `src/`

Organización basada en la documentación de React (agrupar por funcionalidad y página, máximo 3 o 4 niveles de carpetas) y en la guía [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md), muy usada en proyectos de equipo:

- carpetas `app/`, `components/`, `config/`, `features/` y `lib/`;
- importaciones directas, sin archivos índice;
- alias `@/` para no escribir `../../../`.

```
src/
├── main.tsx             Entrada en el navegador (monta la app)
├── entry-server.tsx     Entrada al compilar (genera el HTML de cada página)
├── app/
│   └── App.tsx          Esqueleto de toda página: Header → contenido → Footer
├── pages/               Una carpeta por página
│   ├── home/
│   │   ├── HomePage.tsx Orden de las secciones del homepage
│   │   └── sections/    Hero, Schedule, FeaturedServices, Partners, Reviews, ContactLocation
│   └── empty/           Página para destinos aún sin contenido (y 404)
├── features/            Funcionalidades con lógica propia
│   └── booking/         Formulario de citas (componente + validación y fechas)
├── components/          Piezas reutilizables en cualquier página
│   ├── layout/          Header, Footer, Logo
│   ├── ui/              Íconos, enlaces, carrusel, estrellas, redes, filas de contacto…
│   └── decor/           Bandas, olas, curvas, anillos y la aurora (fondos animados)
├── config/              Datos de configuración: clínica, rutas, menú, horarios de citas
├── data/                Textos y contenido editable (homepage, footer, servicios, reseñas…)
├── seo/                 Etiquetas <head>: título, descripción, Open Graph, JSON-LD
├── lib/                 Utilidades pequeñas sin interfaz (p. ej. cx para unir clases)
└── styles/              CSS dividido por carpetas (ver styles/index.css)
    ├── global/          Variables de diseño, base, botones, accesibilidad
    ├── layout/          Header, footer, bandas, encabezados de sección
    ├── components/      Decoraciones de fondo, carrusel
    └── pages/home/      Una hoja por sección del homepage
```

## ¿Dónde edito…?

| Quiero cambiar… | Archivo |
|---|---|
| Teléfonos, dirección, correo, redes, horario, mapa | `config/site.ts` |
| Opciones del menú y submenús | `config/navigation.ts` |
| Páginas/rutas, títulos y descripciones para Google | `config/routes.ts` |
| Días y horarios del formulario de citas | `config/booking.ts` (y `integrations/google-calendar/Code.gs`) |
| Textos del homepage (hero, agenda, títulos de sección) | `data/home.ts` |
| Enlaces y columnas del footer | `data/footer.ts` |
| Tarjetas de servicios destacados | `data/featuredServices.ts` |
| Aseguranzas y convenios (nombres, logos) | `data/partners.ts` |
| Reseñas de Google | `data/reviews.ts` |
| Orden de las secciones del homepage | `pages/home/HomePage.tsx` |
| Colores, fuentes, medidas generales | `styles/global/tokens.css` |
| El estilo de una sección concreta | `styles/pages/home/<sección>.css` |

## Reglas para crecer sin desordenar

1. **Página nueva:** crea `pages/<nombre>/<Nombre>Page.tsx` y su hoja `styles/pages/<nombre>.css`. Registra la ruta en `config/routes.ts` y elige la página en `app/App.tsx`.
2. **Funcionalidad con lógica** (formularios, búsquedas, integraciones): va en `features/<nombre>/`.
3. **Componente reutilizable:** va en `components/ui/` o `components/layout/`. Si solo lo usa una página, déjalo en la carpeta de esa página.
4. **Textos:** van en `data/`. Los datos de configuración van en `config/`. Los componentes solo los leen.
5. **Importaciones con alias:** `import { SITE } from '@/config/site'`, nunca `../../config/site`.
6. **CSS nuevo:** agrégalo en `styles/index.css` en el lugar de su carpeta. El orden de los `@import` es la cascada.
