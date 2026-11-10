'use client';
import { motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { useSiteReady } from './ready';

type Props = {
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  immediate?: boolean;
  id?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Headline that rises line by line from behind a mask. Once the last line
 * lands the mask is released (`is-done`) so italics/descenders are never cut.
 */
export function SplitLines({ lines, as = 'h2', className = '', delay = 0, immediate, id }: Props) {
  const ready = useSiteReady();
  const [done, setDone] = useState(false);
  const Tag = motion[as];
  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: delay } },
  };
  const line = {
    hidden: { y: '115%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.15, ease } },
  };
  const trigger = immediate ? { animate: ready ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } };
  return (
    <Tag id={id} className={`lines ${done ? 'is-done' : ''} ${className}`} initial="hidden" variants={variants} {...trigger}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <motion.span variants={line} onAnimationComplete={i === lines.length - 1 ? () => setDone(true) : undefined}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
