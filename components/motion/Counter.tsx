'use client';
import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export function Counter({ to, prefix = '', suffix = '', duration = 2, group = true }: { to: number; prefix?: string; suffix?: string; duration?: number; group?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const fmt = (v: number) => `${prefix}${group ? Math.round(v).toLocaleString('es-MX') : Math.round(v)}${suffix}`;
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);
  // Server renders the final value so crawlers and no-JS readers see real numbers.
  return <span ref={ref}>{fmt(to)}</span>;
}
