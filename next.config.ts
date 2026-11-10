import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Content-Security-Policy for the Next.js app. Inline scripts are required by
// Next's hydration payload; everything else is locked to known origins.
const appCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://formspree.io",
  'frame-src https://www.youtube-nocookie.com https://www.youtube.com',
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

// Legacy standalone pages (digital business cards and a private proposal)
// load Google Fonts and an icon script from unpkg.
const legacyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ');

const baseHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const legacyPages = ['tarjetas', 'contactos', 'propuestas'];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 85],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: `/((?!${legacyPages.join('|')}).*)`,
        headers: [...baseHeaders, { key: 'Content-Security-Policy', value: appCsp }],
      },
      ...legacyPages.map((p) => ({
        source: `/${p}/:path*`,
        headers: [...baseHeaders, { key: 'Content-Security-Policy', value: legacyCsp }],
      })),
      {
        source: '/propuestas/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/img_blogs/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    // Old root-level .html URLs that may still be shared or indexed.
    const legacy: Record<string, string> = {
      '/index.html': '/',
      '/nosotros.html': '/nosotros',
      '/servicios.html': '/servicios',
      '/contacto.html': '/contacto',
      '/auditorias.html': '/auditorias',
      '/blogs.html': '/blog',
      '/certificacion-iso_.html': '/certificacion-iso',
      '/consultoria-asesoria.html': '/consultoria-asesoria',
      '/implementacion-sistema.html': '/implementacion-sistema',
      '/anticorrupcion-iso-37001.html': '/anticorrupcion-iso-37001',
      '/blog-iso-14001-2026-mexico-guia-transicion.html': '/blog/iso-14001-2026-mexico-guia-transicion',
    };
    return [
      ...Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: '/:path*/index.html', destination: '/:path*', permanent: true },
    ];
  },
  async rewrites() {
    // Folder-style legacy pages live as static index.html files in /public.
    return {
      beforeFiles: [],
      afterFiles: [
        { source: '/tarjetas/:name', destination: '/tarjetas/:name/index.html' },
        { source: '/contactos/:name', destination: '/contactos/:name/index.html' },
        { source: '/propuestas/:name', destination: '/propuestas/:name/index.html' },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
