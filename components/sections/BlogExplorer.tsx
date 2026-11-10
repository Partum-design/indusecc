'use client';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useDeferredValue, useMemo, useState } from 'react';
import { PostCard, type PostCardData } from './PostCard';
import { Icon } from '../ui/Icon';

type Item = PostCardData & { keywords: string; category: string };

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function BlogExplorer({ posts, topics }: { posts: Item[]; topics: string[] }) {
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState('Todos');
  const dq = useDeferredValue(q);

  const list = useMemo(() => {
    const terms = norm(dq).split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (topic !== 'Todos' && p.tag !== topic) return false;
      if (!terms.length) return true;
      const hay = norm(`${p.title} ${p.excerpt} ${p.keywords} ${p.tag} ${p.category}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [posts, dq, topic]);

  const showFeatured = !dq && topic === 'Todos';

  return (
    <>
      <div className="blog-tools">
        <label className="search field">
          <span className="sr-only">Buscar artículos</span>
          <Icon name="search" />
          <input className="input" type="search" placeholder="Buscar por norma, cláusula o tema: 14001, auditoría, riesgos…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label="Filtrar por tema">
            {['Todos', ...topics].map((t) => (
              <button key={t} role="tab" aria-selected={topic === t} className={`tab ${topic === t ? 'is-active' : ''}`} onClick={() => setTopic(t)}>
                {topic === t && <motion.span layoutId="blog-pill" className="pill" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />}
                <span>{t}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <p className="field-hint" aria-live="polite">{list.length === 1 ? '1 artículo' : `${list.length} artículos`}</p>
      </div>

      <motion.div layout className="post-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.slug}
              className={showFeatured && i === 0 ? 'featured' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.03 }}
            >
              <PostCard post={p} featured={showFeatured && i === 0} priority={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <div className="form-card" style={{ textAlign: 'center' }}>
          <p className="lead" style={{ margin: '0 auto' }}>No encontramos artículos con “{q}”. Prueba con otra palabra o escríbenos tu duda.</p>
        </div>
      )}
    </>
  );
}
