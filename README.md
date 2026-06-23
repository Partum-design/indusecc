# INDUSECC website

Sitio estatico con endpoints locales/serverless en `api/`.

## Estructura principal

- `index.html`: pagina de inicio.
- `servicios/index.html`, `contacto/index.html`, `nosotros/index.html`: paginas canonicas.
- `consultoria-asesoria/index.html`, `implementacion-sistema/index.html`, `certificacion-iso/index.html`, `auditorias/index.html`: servicios canonicos.
- `blog/index.html` y `blog/iso-14001-2026-mexico-guia-transicion/index.html`: blog y articulos.
- `curso-interno/` y `curso-interno-agosto-2026/`: landing pages de cursos con sus assets propios.
- `Imagenes/` e `img_blogs/`: assets existentes usados por las paginas.
- `api/`: endpoints para formularios y Mercado Pago.
- `scripts/check-links.mjs`: verificador de enlaces y recursos locales.

## Compatibilidad

Los archivos antiguos de raiz como `servicios.html`, `contacto.html` y `blogs.html` se mantienen como redirecciones ligeras hacia las rutas canonicas por carpeta. Asi no se rompen enlaces compartidos o indexados previamente.

## Comandos utiles

```bash
npm start
npm run check:links
```
