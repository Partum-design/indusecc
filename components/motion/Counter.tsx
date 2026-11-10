'use client';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export function Counter({ to, prefix = '', suffix = '', duration = 2, group = true }: { to: number; prefix?: string; suffix?: string; duration?: number; group?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const fmt = (v: number) => `${prefix}${group ? Math.round(v).toLocaleString('es-MX') : Math.round(v)}${suffix}`;
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    // Plain rAF tween (ease-out expo) keeps the animation engine out of this component.
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      el.textContent = fmt(to * (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);
  // Server renders the final value so crawlers and no-JS readers see real numbers.
  return <span ref={ref}>{fmt(to)}</span>;
}
