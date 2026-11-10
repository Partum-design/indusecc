import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { BlogExplorer } from '@/components/sections/BlogExplorer';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { formatDate, getPosts } from '@/lib/posts';
import { abs, breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: 'Blog ISO: guías, transiciones y actualizaciones de normas',
  description: 'Guías prácticas y análisis sobre ISO 9001:2026, ISO 14001:2026, ISO 45001, ISO 27001 e ISO 37001:2025 en México: cambios por cláusula, transición, auditoría y cumplimiento.',
  path: '/blog',
  image: photos.reportHands,
});

export default function BlogPage() {
  const posts = getPosts();
  const items = posts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.image, tag: p.tag, dateLabel: formatDate(p.date), readMinutes: p.readMinutes, keywords: p.keywords, category: p.category }));
  const counts = new Map<string, number>();
  posts.forEach((p) => counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1));
  const topics = [...counts.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Blog', path: '/blog' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Blog ISO de INDUSECC',
            url: abs('/blog'),
            publisher: { '@id': `${SITE.url}/#organization` },
            blogPost: posts.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`), datePublished: p.date, image: abs(p.image) })),
          },
        ]}
      />
      <PageHero
        compact
        image={photos.reportHands}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Blog' }]}
        eyebrow="Blog ISO · actualizado cada semana"
        title={['Noticias y guías', <>de normas <em>ISO.</em></>]}
        lead="Contenido para dirección, responsables de sistemas de gestión y equipos de auditoría: cambios por cláusula, calendarios de transición y casos prácticos en México."
        facts={[
          { value: String(posts.length), label: 'artículos publicados' },
          { value: '5+', label: 'normas ISO cubiertas' },
          { value: '2026', label: 'transiciones clave' },
        ]}
      />
      <section className="section paper">
        <div className="wrap">
          <BlogExplorer posts={items} topics={topics} />
          <Reveal>
            <div className="panel-dark" style={{ marginTop: 'clamp(48px, 7vw, 88px)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="eyebrow">Sección especial</span>
                <h2 className="h3" style={{ color: '#fff', marginTop: 10, fontSize: 'clamp(1.5rem, 1.1rem + 1.2vw, 2.2rem)' }}>ISO 37001:2025: todo sobre la transición</h2>
              </div>
              <Button href="/anticorrupcion-iso-37001">Ver la guía completa</Button>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand title={['¿Quieres aplicar esto', <>en tu <em>empresa?</em></>]} lead="Agenda un diagnóstico y te decimos qué cambia para tu sistema, cuánto toma y cómo empezar." />
    </>
  );
}
