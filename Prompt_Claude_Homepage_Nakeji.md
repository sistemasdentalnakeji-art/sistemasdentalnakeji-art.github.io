Actúa como un desarrollador senior especializado en React con Vite, UX/UI, accesibilidad, rendimiento web y SEO técnico y local. Ayúdame a desarrollar únicamente el homepage de Dental Nakeji en Visual Studio Code, siguiendo estas instrucciones.

**CONTEXTO Y REFERENCIAS**

Trabajo para esta clínica dental en Tijuana. Mi jefe me encargó mejorar su página: busca una imagen moderna y profesional, información ordenada, facilidad para contactarnos y agendar, y mejores condiciones para aparecer en búsquedas relevantes de Google. Las bases del SEO deben considerarse desde el inicio, sin prometer posiciones específicas.

Sitio oficial: [https://nakejidental.com/](https://nakejidental.com/)

Referencia de diseño en Styles Refero/Refero: [PEGAR AQUÍ EL ENLACE EXACTO].

Verifica visualmente la imagen que pegue en esta conversación. Es una referencia para el diseño del menú, su distribución y sus rutas; no asumas que existe como un archivo dentro del proyecto ni me pidas su ruta local. Si no puedes verla, indícalo.

Usa Refero como inspiración para el diseño general del homepage. Conserva el logo oficial, sus proporciones y los colores de la clínica. Si la imagen y Refero se contradicen respecto al menú, da prioridad a mi imagen y mis instrucciones.

**TECNOLOGÍA**

El stack de esta etapa es React con Vite, trabajando en Visual Studio Code. El producto es un sitio web que funciona en el navegador y se adapta a celular, tableta y escritorio.

Conserva TypeScript o JavaScript según el proyecto existente; si empezamos desde cero, utiliza TypeScript. Mantén una estructura sencilla e instala únicamente las dependencias necesarias para esta etapa. No añadas otro framework ni un backend.

**ALCANCE: SOLO EL HOMEPAGE**

Desarrolla la página de inicio (/) con estos bloques, en este orden:

1. **Header:** logo oficial, menú principal, submenús indicados más adelante, accesos a redes sociales y botón visible de “Agendar visita”. Debe incluir una navegación adaptable a pantallas pequeñas.
2. **Sección hero:** composición moderna y clara, título principal, texto breve y llamada a agendar. Adapta el estilo de Refero a nuestra identidad; evita afirmaciones clínicas o comerciales inventadas.
3. **Módulo para agendar:** un bloque visual sencillo con llamada a la acción. El botón puede dirigir al WhatsApp oficial. No implementes un sistema de reservas, disponibilidad de horarios, formularios con envío ni almacenamiento de datos.
4. **Servicios destacados:** muestra únicamente 3 o 4 servicios reales mediante tarjetas con información breve. Añade el botón “Ver todos los servicios”, conectado a la ruta interna de Servicios. Esa página permanecerá vacía por ahora; no desarrolles el catálogo completo ni las fichas de cada tratamiento.
5. **Aseguranzas y convenios:** diseña el apartado utilizando marcadores como “Empresa 1”, “Empresa 2”, “Empresa 3”, etc. No pongas nombres de empresas reales, logos, pólizas ni condiciones de cobertura. Yo verificaré los convenios y completaré manualmente los nombres e imágenes.

En aseguranzas y convenios, usa tarjetas o una distribución simple inicialmente. Si te indico que quiero un carrusel, implementa uno sencillo con esos mismos marcadores. No investigues empresas ni descargues sus logos. Mantén estos elementos fáciles de editar.

La imagen sirve como referencia del menú; aunque muestre solo el encabezado, el alcance del homepage incluye los cinco bloques anteriores. No añadas otras secciones por iniciativa propia.

**MENÚ Y DESTINOS INTERNOS**

Respeta la distribución y las rutas que aparezcan en mi imagen. El menú principal tendrá Inicio, Servicios, Beneficios, Contacto y About us/Nosotros, según la etiqueta de la imagen.

- **Inicio:** dirige al homepage.
- **Servicios:** despliega un submenú con los nombres de los servicios. Incluye Odontopediatría, Periodoncia, Implantes dentales, Diseño de sonrisa, All on 4 implants, All on 6 implants, Coronas, Dentaduras, Blanqueamiento dental, Endodoncias, Cosmética dental, Ortodoncia e Invisalign/Alineadores. El sitio también tiene páginas de Carillas dentales y Odontología general; incluye esas opciones sin duplicar nombres.
- **Beneficios:** despliega únicamente Promociones, Convenios y Aseguranzas.
- **Contacto:** conserva el acceso y prepara su ruta, sin desarrollar su página.
- **About us/Nosotros:** será un enlace simple, sin submenú de historia, misión, visión o equipo. Su página permanecerá vacía.

Los nombres de los submenús sí deben aparecer al desplegarlos. Lo que debe permanecer vacío es el contenido de sus páginas de destino.

Prepara únicamente la navegación mínima y un contenedor vacío reutilizable para esos destinos; no crees diseños ni contenido para páginas internas. Si la imagen no especifica una ruta, propón su nombre en el plan inicial. El botón “Ver todos los servicios” debe usar el mismo destino que Servicios.

Los submenús deben funcionar mediante clic o toque y teclado, sin depender exclusivamente de pasar el cursor. Permite cerrarlos de forma accesible.

**REDES SOCIALES Y CONTACTO**

Conecta los iconos a estos enlaces publicados en el sitio oficial:

- Facebook: [https://www.facebook.com/DentalNakeji/?locale=es_LA](https://www.facebook.com/DentalNakeji/?locale=es_LA)
- Instagram: [https://www.instagram.com/dentalnakeji/](https://www.instagram.com/dentalnakeji/)
- WhatsApp: [https://wa.me/message/VVH7OKKWM2W7O1](https://wa.me/message/VVH7OKKWM2W7O1)

Usa esos destinos concretos, con nombres accesibles para los iconos. El botón del header puede llevar al módulo de agendar y el botón del módulo al WhatsApp oficial.

**DISEÑO, SEO Y RENDIMIENTO**

Busca una estética moderna, minimalista, profesional y fácil de recorrer. Mantén el contenido editable, evita duplicados y cuida el contraste, el foco visible, la navegación por teclado y la adaptación entre tamaños de pantalla.

Para el homepage, incorpora:

- HTML semántico, un H1 descriptivo y encabezados ordenados.
- Título y descripción específicos, idioma del documento y contenido local natural.
- Metadatos para compartir, favicon y URL canónica con el dominio de producción confirmado.
- Datos estructurados JSON-LD de la clínica, únicamente con información real y verificable. No incluyas las empresas de ejemplo como convenios reales.
- Imágenes optimizadas, dimensiones definidas, textos alternativos adecuados y fuentes eficientes.
- Configuración de robots y sitemap para las páginas reales y terminadas. Los destinos vacíos deben quedar fuera del sitemap y no ser indexables; las vistas previas deben permanecer fuera del índice.

Con React y Vite, verifica cómo se genera el HTML de producción. Incluye en el plan una solución sencilla de prerenderizado para el homepage y comprueba que su contenido principal esté presente en el HTML generado. No des por hecho que instalar Vite resuelve este punto automáticamente ni migres a otro framework.

Revisa los factores de Core Web Vitals que puedas evaluar. No inventes puntuaciones ni presentes pruebas locales como métricas reales de usuarios.

Trabaja localmente. No modifiques el dominio, DNS ni el sitio publicado, ni reemplaces su sitemap o sus URLs. Deja anotadas las tareas posteriores relacionadas con publicación, Search Console, Google Business Profile y analítica.

**FORMA DE TRABAJAR Y CONTROL DEL CONSUMO**

1. Antes de programar, revisa la imagen pegada, la referencia de Refero y únicamente los archivos y datos necesarios. Si una referencia no es accesible, dilo sin simular haberla estudiado.
2. Presenta un plan breve con los bloques, rutas y archivos afectados. Espera a que te proporcione las referencias que falten y confirme el primer bloque.
3. Trabaja por bloques del homepage. Después de aprobar cada bloque, completa los ajustes rutinarios y verifica su resultado. Detente al terminarlo antes de avanzar al siguiente.
4. Reutiliza componentes, mantén pocas dependencias y evita reescrituras completas, variantes e investigaciones innecesarias.
5. No desarrolles blog, panel administrativo, base de datos, bots, integraciones con n8n ni contenido de las páginas internas.
6. Mantén respuestas breves. Resume los cambios y conserva un CLAUDE.md conciso con el alcance, las decisiones y los comandos de verificación.

**VERIFICACIÓN Y ENTREGA**

Comprueba que el proyecto compile, revisa los tipos si usa TypeScript y ejecuta el lint configurado. Verifica la vista en celular y escritorio, los submenús, los enlaces de redes, el botón de agendar y los metadatos. Compara visualmente el menú con la imagen si dispones de herramientas para hacerlo.

Entrega un resumen de lo implementado, cómo verlo localmente, qué verificaste y qué falta completar. Declara cualquier comprobación que no hayas podido realizar.

Tu primera respuesta debe confirmar que trabajaremos únicamente en el homepage con React y Vite, resumir el plan y señalar las referencias imprescindibles que falten. No escribas código todavía.
