import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Parallax } from '../motion/Parallax';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';
import { TocSpy } from './TocSpy';

type Props = {
  image: string;
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  heroLines: string[];
  lead: string;
  tags: string[];
  meta?: ReactNode;
  body: string;
  aside: string;
  children?: ReactNode;
};

/** Hero lines come from our own extracted content and may contain <em>. */
const Rich = ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />;

export function ArticleView({ image, crumbs, eyebrow, heroLines, lead, tags, meta, body, aside, children }: Props) {
  return (
    <>
      <section className="phero compact">
        <div className="phero-media">
          <Parallax amount={8} scale={1.08}>
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 66vw, 100vw" quality={75} />
          </Parallax>
        </div>
        <div className="phero-edge" aria-hidden="true" />
        <div className="phero-panel" aria-hidden="true" />
        <div className="phero-body">
          <div className="wrap phero-solo">
            <Reveal immediate delay={0.05}>
              <nav className="crumbs" aria-label="Ruta de navegación">
                {crumbs.map((c, i) => (
                  <span key={c.label} style={{ display: 'contents' }}>
                    {i > 0 && <i aria-hidden="true" />}
                    {c.href ? <Link href={c.href}>{c.label}</Link> : <b aria-current="page">{c.label}</b>}
                  </span>
                ))}
              </nav>
            </Reveal>
            <Reveal immediate delay={0.1}><span className="eyebrow on-dark" style={{ marginBottom: 18, display: 'inline-flex' }}>{eyebrow}</span></Reveal>
            <SplitLines as="h1" className="h1 on-dark" immediate delay={0.15} lines={heroLines.map((l, i) => <Rich key={i} html={l} />)} />
            {lead && <Reveal immediate delay={0.4}><p className="phero-lead">{lead}</p></Reveal>}
            {meta && <Reveal immediate delay={0.5}>{meta}</Reveal>}
            {tags.length > 0 && (
              <Reveal immediate delay={0.6}>
                <div className="chips on-dark">{tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
      <section className="section-tight paper">
        <div className="wrap article-layout">
          <article className="prose" dangerouslySetInnerHTML={{ __html: body }} />
          <aside className="article-side" dangerouslySetInnerHTML={{ __html: aside }} />
        </div>
        <TocSpy />
      </section>
      {children}
    </>
  );
}
