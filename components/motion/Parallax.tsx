'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/** Moves its content against the scroll direction. `amount` is in % of the box height. */
export function Parallax({ children, amount = 10, className = 'parallax', scale = 1 }: { children: ReactNode; amount?: number; className?: string; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, scale }}>
      {children}
    </motion.div>
  );
}
