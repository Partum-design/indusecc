'use client';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useRef, useState, type ReactNode } from 'react';

type Step = { title: string; text: ReactNode; tag?: string };

/** Timeline whose connecting line draws itself as you scroll through it. */
export function Steps({ items, horizontal }: { items: Step[]; horizontal?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setLit(Math.ceil(v * items.length + 0.001)));
  return (
    <div ref={ref} role="list" className={`steps ${horizontal ? 'horizontal' : ''}`} style={{ ['--n' as string]: items.length }}>
      <div className="steps-line" aria-hidden="true">
        <motion.i style={horizontal ? { scaleX: p, scaleY: p } : { scaleY: p }} />
      </div>
      {items.map((s, i) => (
        <motion.div
          role="listitem"
          key={s.title}
          className={`step ${i < lit ? 'is-lit' : ''}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: horizontal ? i * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="step-dot">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {s.tag && <span className="chip">{s.tag}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
