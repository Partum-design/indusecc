import { Reveal } from '../motion/Reveal';

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.05} y={18}>
          <details className="faq-item" open={i === 0}>
            <summary>
              {f.q}
              <i aria-hidden="true" />
            </summary>
            <div className="faq-a">{f.a}</div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
