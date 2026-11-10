import { getImageProps, type StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '../motion/Reveal';

// Tiles in percent of the frame: [left, top, width, height]. Together they
// show one photo cut into pieces with gaps, a few nudged out of line.
const TILES: [number, number, number, number][] = [
  [0, 9, 25, 21],
  [27, 0, 31, 30],
  [60, 12, 22, 18],
  [10, 32, 48, 38],
  [60, 32, 34, 30],
  [0, 72, 30, 24],
  [32, 72, 26, 28],
  [60, 64, 22, 20],
];

/** One photo split into offset tiles that assemble as they scroll in. */
export function Mosaic({ image, alt }: { image: StaticImageData; alt: string }) {
  const { props } = getImageProps({ src: image, alt: '', sizes: '(min-width: 960px) 46vw, 92vw', quality: 75 });
  const { style: _style, ...img } = props;
  return (
    <div className="mosaic" role="img" aria-label={alt}>
      <span className="mosaic-dots a" aria-hidden="true" />
      <span className="mosaic-dots b" aria-hidden="true" />
      {TILES.map(([l, t, w, h], i) => (
        <Reveal
          key={i}
          className="mosaic-tile"
          delay={0.05 + ((i * 3) % TILES.length) * 0.06}
          y={i % 2 ? 36 : -36}
          style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            {...img}
            aria-hidden="true"
            loading="lazy"
            style={{ width: `${(100 / w) * 100}%`, height: `${(100 / h) * 100}%`, left: `${(-l / w) * 100}%`, top: `${(-t / h) * 100}%` }}
          />
        </Reveal>
      ))}
    </div>
  );
}
