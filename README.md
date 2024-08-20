# La calle está dura

Aunque el proyecto hace parte del programa del Odin Project y tiene por objetivo mejorar el conocimiento sobre React y hacer más familiares los conceptos de algunos de sus hooks y patrones de diseño, quise extenderlo para hacer de este una herramienta útil a la hora de buscar trabajo.

## Recomendaciones formales CV

Las diferentes recomendaciones para la elaboración de una hoja de vida que he encontrado en mi búsqueda de trabajo, como la extensión, estructura y personalización para el cargo al que se aplica, ayudarán a determinar los aspectos funcionales claves de esta aplicación

-   Debe estar en el idioma de la oferta laboral.
-   La hoja de vida exportada no debe superar 1 hoja tamaño carta
-   Debe hablar sobre la persona, su experiencia, sus habilidades y capacidades, su formación y posibilidad de corroborarlo, en secciones fáciles de identificar.
-   Debe mencionar puntualmente las aptitudes mínimas que se piden y en lo posible las ideales.
-   Debe incluir foto y edad únicamente si es solicitado.

## Funciones que debe cumplir la aplicación

- [] Permite la creación de la hoja de vida en inglés y en español
- [] Al cambiar de idioma conserva las secciones y los modulos si tienen versión en ambos idiomas, de lo contrario muestra el formulario para crear la versión en el idioma necesitado.
- [] Permite almacenar la información diligenciada en una sesión dentro del localstorage.
- [] permite exportar la sesion en un archivo de texto plano e importarla (Sólo almacena en sesión a una persona).
- [] Permite elaborar la hoja de vida por bloques que componen cada sección.
- [] Permite la rápida iteración de cada bloque.
- [] Permite seleccionar qué bloques van y previsualizar el documento.
- [] Evita la repetición de información y los bloques.
- [] Permite almacenar nombrar y almacenar las diferentes iteraciones para su rehuso.
- [] Mantiene control sobre la longitud de cada sección al controlar la extensión de cada bloque y su relación con los otros bloques.

## Etapas para desarrollo

- [x] Establece plataforma desarrollo y testeo (Vite y Vitest).
- [x] Crea las clases para almacenamiento de la información.
- [x] Crear funciones CRUD para el manejo de la información.
- [x] Diseño funcional de la aplicación.
- [] Diseño visual de la aplicación.
- [] Implementa el almacenamiento para la información (Localstorage).
- [] Crear compornentes para la administración de la información.
- [] Crear componente de previsualización.
- [] Integrar con paquete para la exportación de paquete
- [] Exportación y carga de archivos externos.
