import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { Reveal } from '../motion/Reveal';
import { Icon } from '../ui/Icon';

export type Strip = { n: string; href: string; title: string; short: string; desc: string; image: StaticImageData; alt: string };

/**
 * Slanted photo panels. On desktop they sit side by side and the hovered
 * (or focused) one widens to reveal its description; on touch screens they
 * stack as full cards with everything visible.
 */
export function ServiceStrips({ items }: { items: Strip[] }) {
  return (
    <div className="strips" role="list">
      {items.map((s, i) => (
        <Reveal key={s.href + s.n} delay={i * 0.07} y={40} className="strip-cell" role="listitem">
          <Link href={s.href} className="strip">
            <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" quality={70} placeholder="blur" />
            <span className="strip-n">{s.n}</span>
            <span className="strip-v" aria-hidden="true">{s.short}</span>
            <span className="strip-body">
              <b>{s.title}</b>
              <span className="strip-desc">{s.desc}</span>
            </span>
            <span className="strip-go"><Icon name="arrowUpRight" /></span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
