import { NORMS_TICKER } from '@/lib/site';
import { Marquee } from '../motion/Marquee';

export function Ticker({ items = NORMS_TICKER }: { items?: readonly string[] }) {
  return (
    <div className="ticker" aria-hidden="true">
      <Marquee duration={46}>
        {items.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </Marquee>
    </div>
  );
}
