'use client';
import { useEffect } from 'react';

/** Highlights the table-of-contents link for the section currently in view. */
export function TocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.article-side .iso-toc-link')];
    const map = new Map(links.map((a) => [a.getAttribute('href')?.slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.classList.remove('is-active'));
          map.get(e.target.id)?.classList.add('is-active');
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    map.forEach((_, id) => {
      const el = id && document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
