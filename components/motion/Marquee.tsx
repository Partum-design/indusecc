import type { ReactNode } from 'react';

/** CSS-only infinite marquee; content is duplicated for a seamless loop. */
export function Marquee({ children, duration = 40, className = '' }: { children: ReactNode; duration?: number; className?: string }) {
  return (
    <div className={`marquee ${className}`} style={{ ['--dur' as string]: `${duration}s` }}>
      <div>{children}</div>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
