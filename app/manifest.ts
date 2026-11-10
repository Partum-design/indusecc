import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INDUSECC · Consultoría y certificación ISO',
    short_name: 'INDUSECC',
    description: 'Consultoría, implementación, auditoría y certificación ISO en México.',
    start_url: '/',
    display: 'standalone',
    background_color: '#170507',
    theme_color: '#170507',
    lang: 'es-MX',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
