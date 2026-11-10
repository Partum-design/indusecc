'use client';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { SERVICE_DETAILS, SERVICE_FILTERS } from '@/lib/services-data';
import { Icon } from '../ui/Icon';

const ease = [0.22, 1, 0.36, 1] as const;

export function ServiceExplorer() {
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const list = SERVICE_DETAILS.filter((s) => filter === 'all' || s.category === filter);
  const current = SERVICE_DETAILS.find((s) => s.id === open);

  const toggle = (id: string) => {
    setOpen((o) => (o === id ? null : id));
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 380);
  };

  return (
    <>
      <LayoutGroup>
        <div className="tabs" role="tablist" aria-label="Filtrar servicios" style={{ marginBottom: 28 }}>
          {SERVICE_FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`tab ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => {
                setFilter(f.id);
                setOpen(null);
              }}
            >
              {filter === f.id && <motion.span layoutId="svc-pill" className="pill" transition={{ duration: 0.5, ease }} />}
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <motion.div layout className="cards c3">
        <AnimatePresence mode="popLayout">
          {list.map((s) => (
            <motion.article
              layout
              key={s.id}
              className={`card svc-card ${open === s.id ? 'feature' : ''}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="card-n">{String(SERVICE_DETAILS.indexOf(s) + 1).padStart(2, '0')} · {s.kicker}</span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <div className="chips" style={{ marginTop: 16 }}>
                {s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              <button className="link-arrow" style={{ marginTop: 22 }} onClick={() => toggle(s.id)} aria-expanded={open === s.id} aria-controls="svc-detail">
                {open === s.id ? 'Cerrar detalle' : 'Ver detalle'} <Icon name={open === s.id ? 'plus' : 'arrow'} style={open === s.id ? { rotate: '45deg' } : undefined} />
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div ref={detailRef} id="svc-detail" style={{ scrollMarginTop: 110 }}>
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              className="svc-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="svc-detail-in">
                <div>
                  <span className="eyebrow">{current.kicker}</span>
                  <h3 className="h3" style={{ fontSize: 'clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem)', margin: '14px 0 16px' }}>{current.title}</h3>
                  {current.body.map((b) => <p className="lead" key={b} style={{ marginBottom: 12 }}>{b}</p>)}
                  <ul className="check-list">
                    {current.bullets.map((b) => <li key={b}><Icon name="check" />{b}</li>)}
                  </ul>
                </div>
                <aside className="panel-dark">
                  <h4 className="eyebrow">{current.sideTitle}</h4>
                  <ul className="side-list">
                    {current.side.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  {current.cta.href.startsWith('http') ? (
                    <a className="btn btn-gold btn-sm" href={current.cta.href} target="_blank" rel="noopener noreferrer"><span>{current.cta.label}</span></a>
                  ) : (
                    <Link className="btn btn-gold btn-sm" href={current.cta.href}><span>{current.cta.label}</span></Link>
                  )}
                </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
