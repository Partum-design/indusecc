'use client';
import { useRef } from 'react';
import { Icon } from '../ui/Icon';

export type Testimonial = { quote: string; name: string; company: string; initials: string; date: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.testi');
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };
  return (
    <>
      <div className="testi-track" ref={track} data-lenis-prevent-horizontal="">
        {items.map((t) => (
          <figure className="testi" key={t.name + t.date}>
            <div className="stars" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" fill="currentColor" stroke="none" />)}
            </div>
            <blockquote><p>{t.quote}</p></blockquote>
            <footer>
              <i aria-hidden="true">{t.initials}</i>
              <figcaption>
                <b>{t.name}</b>
                <small>{t.company} · {t.date}</small>
              </figcaption>
            </footer>
          </figure>
        ))}
      </div>
      <div className="actions" style={{ marginTop: 28 }}>
        <button className="round-btn" type="button" onClick={() => go(-1)} aria-label="Testimonio anterior"><Icon name="arrowLeft" /></button>
        <button className="round-btn" type="button" onClick={() => go(1)} aria-label="Siguiente testimonio"><Icon name="arrow" /></button>
      </div>
    </>
  );
}
