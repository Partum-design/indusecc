'use client';
import { motion, type HTMLMotionProps } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { useSiteReady } from './ready';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'span' | 'header' | 'figure';
  /** Animate on mount once the preloader is gone (for above-the-fold content). */
  immediate?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 32, x = 0, className, as = 'div', immediate, amount = 0.2, ...rest }: Props) {
  const ready = useSiteReady();
  const Tag = motion[as as 'div'] as ElementType;
  const hidden = { opacity: 0, y, x };
  const shown = { opacity: 1, y: 0, x: 0, transition: { duration: 1, ease, delay } };
  return immediate ? (
    <Tag className={className} initial={hidden} animate={ready ? shown : hidden} {...rest}>
      {children}
    </Tag>
  ) : (
    <Tag className={className} initial={hidden} whileInView={shown} viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }} {...rest}>
      {children}
    </Tag>
  );
}
