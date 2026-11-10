import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  ogDescription: string;
  date: string;
  image: string;
  category: string;
  heroLines: string[];
  lead: string;
  tags: string[];
  body: string;
  aside: string;
  tag: string;
  excerpt: string;
  keywords: string;
  readMinutes: number;
  featured: boolean;
};

const dir = path.join(process.cwd(), 'content/posts');
let cache: Post[] | null = null;

function load(): Post[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Post)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return cache;
}

/** Posts whose publish date has arrived (scheduled posts stay hidden until then). */
export function getPosts(now = new Date()): Post[] {
  return load().filter((p) => new Date(p.date) <= now);
}

export function getPost(slug: string): Post | undefined {
  return load().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return load().map((p) => p.slug);
}

export function relatedPosts(post: Post, n = 3): Post[] {
  const pool = getPosts().filter((p) => p.slug !== post.slug);
  const same = pool.filter((p) => p.tag === post.tag);
  return [...same, ...pool.filter((p) => p.tag !== post.tag)].slice(0, n);
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Mexico_City' }).format(new Date(iso));
