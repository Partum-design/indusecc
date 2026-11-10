import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/motion/Reveal';
import { ArticleView } from '@/components/sections/ArticleView';
import { CtaBand } from '@/components/sections/CtaBand';
import { PostCard } from '@/components/sections/PostCard';
import { SectionHead } from '@/components/sections/SectionHead';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { formatDate, getAllSlugs, getPost, relatedPosts } from '@/lib/posts';
import { abs, breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${slug}`, image: post.image, type: 'article', publishedTime: post.date });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Scheduled posts stay hidden until their publish date.
  if (new Date(post.date) > new Date()) {
    return (
      <section className="notfound">
        <div>
          <span className="eyebrow">Publicación programada</span>
          <h1 className="h2" style={{ margin: '18px 0' }}>Muy pronto</h1>
          <p className="lead on-dark" style={{ margin: '0 auto 28px' }}>Este artículo se publicará el {formatDate(post.date)}.</p>
          <a className="btn btn-gold" href="/blog"><span>Volver al blog</span></a>
        </div>
      </section>
    );
  }

  const related = relatedPosts(post);
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: abs(post.image),
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'es-MX',
      keywords: post.keywords || post.tags.join(', '),
      articleSection: post.tag,
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: { '@id': `${SITE.url}/#organization` },
      mainEntityOfPage: abs(`/blog/${post.slug}`),
    },
    breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <ArticleView
        image={post.image}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.tag }]}
        eyebrow={post.category}
        heroLines={post.heroLines}
        lead={post.lead}
        tags={post.tags}
        meta={
          <div className="article-hero-meta">
            <span><Icon name="calendar" /><time dateTime={post.date}>{formatDate(post.date)}</time></span>
            <span><Icon name="clock" />{post.readMinutes} min de lectura</span>
            <span><Icon name="users" />Equipo INDUSECC</span>
          </div>
        }
        body={post.body}
        aside={post.aside}
      >
        {related.length > 0 && (
          <section className="section">
            <div className="wrap">
              <SectionHead layout="split" eyebrow="Sigue leyendo" title={['Artículos', <><em>relacionados.</em></>]} />
              <div className="post-grid">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.08}>
                    <PostCard post={{ ...p, dateLabel: formatDate(p.date) }} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
        <CtaBand title={['¿Necesitas ayuda', <>con <em>tu sistema?</em></>]} lead="Te ayudamos a aterrizar estos cambios en tu empresa, con un plan claro y acompañamiento hasta la auditoría." />
      </ArticleView>
    </>
  );
}
