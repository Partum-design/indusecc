import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Parallax } from '../motion/Parallax';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';

type Fact = { value: ReactNode; label: string };

type Props = {
  image: StaticImageData;
  imagePosition?: string;
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: ReactNode[];
  lead?: ReactNode;
  actions?: ReactNode;
  chips?: string[];
  facts?: Fact[];
  compact?: boolean;
};

export function PageHero({ image, imagePosition = 'center', crumbs, eyebrow, title, lead, actions, chips, facts, compact }: Props) {
  return (
    <section className={`phero ${compact ? 'compact' : ''}`}>
      <div className="phero-media">
        <Parallax amount={7} className="parallax" scale={1.08}>
          <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 66vw, 100vw" placeholder="blur" quality={75} style={{ objectPosition: imagePosition }} />
        </Parallax>
      </div>
      <div className="phero-edge" aria-hidden="true" />
      <div className="phero-panel" aria-hidden="true" />
      <div className="phero-body">
        <div className="wrap phero-grid">
          <div>
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
            {eyebrow && (
              <Reveal immediate delay={0.1}>
                <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-flex' }}>{eyebrow}</span>
              </Reveal>
            )}
            <SplitLines as="h1" className="h1 on-dark" lines={title} immediate delay={0.15} />
            {lead && (
              <Reveal immediate delay={0.45}>
                <p className="phero-lead">{lead}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal immediate delay={0.55}>
                <div className="actions">{actions}</div>
              </Reveal>
            )}
            {chips && (
              <Reveal immediate delay={0.65}>
                <div className="chips on-dark">
                  {chips.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
          {facts && (
            <div className="phero-aside">
              {facts.map((f, i) => (
                <Reveal immediate delay={0.6 + i * 0.1} key={f.label} className="phero-fact">
                  <b>{f.value}</b>
                  <span>{f.label}</span>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
