'use client';
import { useEffect, useRef, useState } from 'react';
import { markReady } from '../motion/ready';

export const MARK_PATHS = [
  { d: 'M965 270 1082 338 865 482 486 700 487 1254 850 1462 1087 1612 967 1682 354 1332 353 624Z', c: 'pw' },
  { d: 'M1095 345 1578 622 1579 1330 1102 1605 1101 1452 1446 1253 1445 698 1095 497Z', c: 'pg' },
  { d: 'M854 521 1065 384 1065 596 854 711Z', c: 'pw' },
  { d: 'M854 802 1066 697 1073 1568 855 1433Z', c: 'pw' },
];

/**
 * Brand intro: the full animation plays once per browser session; later
 * full page loads get a quick curtain. Client-side navigations never show it.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const pre = ref.current;
    if (!pre) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const quick = document.documentElement.classList.contains('pre-quick');
    document.body.classList.add('is-locked');

    pre.querySelectorAll<SVGPathElement>('.pre-mark path').forEach((p) => p.style.setProperty('--len', String(Math.ceil(p.getTotalLength()))));
    pre.querySelectorAll<HTMLSpanElement>('.pre-word span').forEach((s, i) => (s.style.animationDelay = `${0.4 + i * 0.06}s`));
    requestAnimationFrame(() => pre.classList.add('run'));

    const num = pre.querySelector<HTMLDivElement>('.pre-num');
    const bar = pre.querySelector<HTMLElement>('.pre-bar i');
    const MIN = reduce ? 150 : quick ? 450 : 2300;
    const start = performance.now();
    let loaded = quick || document.readyState === 'complete';
    const onLoad = () => (loaded = true);
    window.addEventListener('load', onLoad);
    const safety = setTimeout(() => (loaded = true), quick ? 1200 : 5000);
    let shown = 0;
    let raf = 0;
    const timers: number[] = [];

    const finish = () => {
      try {
        sessionStorage.setItem('ind-pre', '1');
      } catch {}
      timers.push(
        window.setTimeout(() => {
          pre.classList.add('out');
          document.body.classList.remove('is-locked');
          timers.push(window.setTimeout(markReady, 250));
          timers.push(window.setTimeout(() => setGone(true), 1400));
        }, quick ? 60 : 250),
      );
    };
    const tick = (now: number) => {
      const t = Math.min((now - start) / MIN, 1);
      const target = loaded ? t : Math.min(t, 0.9);
      shown += (target - shown) * (quick ? 0.3 : 0.12);
      if (loaded && t >= 1 && shown > 0.99) shown = 1;
      const e = 1 - Math.pow(1 - shown, 2);
      if (num) num.textContent = `${Math.round(e * 100)}%`;
      if (bar) bar.style.transform = `scaleX(${e})`;
      if (shown < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      timers.forEach(clearTimeout);
      window.removeEventListener('load', onLoad);
      document.body.classList.remove('is-locked');
      markReady();
    };
  }, []);

  if (gone) return null;
  return (
    <div id="pre" ref={ref} aria-hidden="true">
      <div className="pre-panel l" />
      <div className="pre-panel r" />
      <div className="pre-grid" />
      <div className="pre-slash" />
      <div className="pre-core">
        <div className="pre-ring" />
        <div className="pre-ring b" />
        <svg className="pre-mark" viewBox="340 260 1250 1435" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="preGold" x1="0" x2="1">
              <stop offset="0" stopColor="#8B6914" />
              <stop offset=".35" stopColor="#C9A84C" />
              <stop offset="1" stopColor="#E8C97A" />
            </linearGradient>
          </defs>
          {MARK_PATHS.map((p) => (
            <path key={p.d} className={p.c} d={p.d} />
          ))}
        </svg>
        <div className="pre-word">
          {'INDUSECC'.split('').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
        <div className="pre-meta">
          <div className="pre-bar">
            <i />
          </div>
          <div className="pre-num">0%</div>
        </div>
        <div className="pre-tag">Soluciones ISO · Mejora continua</div>
      </div>
    </div>
  );
}
