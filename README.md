# INDUSECC · sitio web

Sitio de INDUSECC construido con **Next.js 16 (App Router) + React 19 + TypeScript**, animaciones con **Motion** y scroll suave con **Lenis**.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm start        # sirve la compilación
npm run lint     # chequeo de tipos
```

Copia `.env.example` a `.env.local` y llena las credenciales (SMTP y Mercado Pago). En Vercel se configuran como variables de entorno del proyecto.

## Estructura

- `app/` — páginas (una carpeta por ruta), `api/` (Mercado Pago y envío del diagnóstico), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.
- `components/layout` — preloader, header, footer, transición entre páginas.
- `components/motion` — animaciones reutilizables (aparición por líneas, contadores, parallax, scroll suave).
- `components/sections` — bloques de página (hero, CTA, pasos, FAQ, blog, curso…).
- `components/forms` — contacto (Formspree), autodiagnóstico, diagnóstico de auditoría (PDF), checkout del curso.
- `content/posts/*.json` — artículos del blog. Para publicar uno nuevo, agrega un JSON con el mismo formato; si su `date` es futura, se publica solo al llegar la fecha (revalidación cada hora).
- `assets/photos/` — fotografías optimizadas (`npm run images -- <carpeta>` para reprocesar nuevas).
- `public/` — archivos estáticos: imágenes del blog, logos, tarjetas digitales (`/tarjetas`, `/contactos`) y la propuesta privada (`/propuestas`).
- `styles/globals.css` — sistema de diseño (colores, tipografía, componentes).

## Seguridad

- Cabeceras HTTP estrictas (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) en `next.config.ts`.
- Endpoints con validación de entrada, verificación de origen, límite de solicitudes, honeypot anti-spam, verificación de que el adjunto sea PDF real y escape de HTML en correos.

## Compatibilidad

Las URLs antiguas (`/nosotros.html`, `/blogs.html`, `/ruta/index.html`, rutas con `/` final) redirigen con 301/308 a las nuevas.
