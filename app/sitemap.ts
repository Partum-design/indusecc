import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['/', 1, 'weekly'],
    ['/servicios', 0.9, 'monthly'],
    ['/certificacion-iso', 0.9, 'monthly'],
    ['/implementacion-sistema', 0.85, 'monthly'],
    ['/auditorias', 0.85, 'monthly'],
    ['/consultoria-asesoria', 0.8, 'monthly'],
    ['/anticorrupcion-iso-37001', 0.85, 'monthly'],
    ['/curso-interno', 0.8, 'weekly'],
    ['/nosotros', 0.7, 'yearly'],
    ['/contacto', 0.7, 'yearly'],
    ['/auditorias/formulario', 0.5, 'yearly'],
    ['/blog', 0.8, 'weekly'],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${SITE.url}${path}`, lastModified: now, priority, changeFrequency })),
    ...getPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6, changeFrequency: 'yearly' as const, images: [`${SITE.url}${p.image}`] })),
  ];
}
