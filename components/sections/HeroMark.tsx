'use client';
import { motion } from 'motion/react';
import { useSiteReady } from '../motion/ready';
import { MARK_PATHS } from '../layout/Preloader';

/** The brand mark, drawn as a gold/white outline beside the hero copy (large screens). */
export function HeroMark() {
  const ready = useSiteReady();
  return (
    <svg className="hero-mark" viewBox="340 260 1250 1435" aria-hidden="true">
      {MARK_PATHS.map((p, i) => (
        <motion.path
          key={p.d}
          d={p.d}
          className={p.c === 'pg' ? 'g' : 'w'}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.4, delay: 0.4 + i * 0.18, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
