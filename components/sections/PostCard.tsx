import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '../ui/Icon';

export type PostCardData = { slug: string; title: string; excerpt: string; image: string; tag: string; dateLabel: string; readMinutes: number };

export function PostCard({ post, featured, priority }: { post: PostCardData; featured?: boolean; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`post-card ${featured ? 'featured' : ''}`}>
      <div className="media">
        <span className="post-tag">{post.tag}</span>
        <Image src={post.image} alt="" fill sizes={featured ? '(min-width: 900px) 60vw, 100vw' : '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw'} priority={priority} />
      </div>
      <div className="post-body">
        <span className="post-meta">{post.dateLabel}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="post-foot">{post.readMinutes} min de lectura <Icon name="arrowUpRight" /></span>
      </div>
    </Link>
  );
}
