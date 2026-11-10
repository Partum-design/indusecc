import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import { SITE } from './site';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: StaticImageData | string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
};

export function pageMetadata({ title, description, path, image, type = 'website', noindex, publishedTime }: PageMeta): Metadata {
  const img = image ? (typeof image === 'string' ? image : image.src) : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(img ? { images: [{ url: img, width: 1200, height: 630, alt: title }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(img ? { images: [img] } : {}) },
  };
}

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function serviceLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: abs(path),
    serviceType: name,
    areaServed: { '@type': 'Country', name: 'México' },
    provider: { '@id': `${SITE.url}/#organization` },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
