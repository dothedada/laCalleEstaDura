# La Calle está dura

Aplicación web para crear y adaptar hojas de vida optimizadas para ATS (Applicant Tracking Systems), permitiendo generar, almacenar y reutilizar secciones de la hoja de vida personalizadas para cada convocatoria.

## Características principales

- Personalización – Adapta tu CV a cada vacante, resaltando las habilidades y experiencia relevantes.
- Modularización - Aunque las ofertas son diferentes, pueden tener cosas en común, crea módulos y reutilízalos según las convocatorias.
- Diseño ATS-friendly – Estructura limpia y legible para sistemas de reclutamiento automatizado.
- Control de formato – Exporta en 1 página (tamaño carta) y ajusta contenido según requisitos.
- Configuración flexible – Opción para incluir/excluir foto, edad y otros datos según la oferta.
- Almacenamiento local – Guarda tus plantillas y CVs sin necesidad de base de datos externa.

## Tecnologías

- Frontend: React + TypeScript
- Persistencia de datos: Almacenamiento local (localStorage)
- Exportación: PDF generado en cliente (usando librerías como react-pdf o html2pdf)

## Mejoras futuras

- Soporte para múltiples plantillas de diseño.
- Integración con análisis de ofertas laborales para sugerir keywords.
- Sincronización opcional con almacenamiento en la nube (Firebase, Supabase).
