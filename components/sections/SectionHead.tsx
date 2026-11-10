import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';

type Props = {
  eyebrow?: string;
  title: ReactNode[];
  lead?: ReactNode;
  layout?: 'stack' | 'split' | 'center';
  aside?: ReactNode;
  as?: 'h1' | 'h2';
  id?: string;
};

export function SectionHead({ eyebrow, title, lead, layout = 'stack', aside, as = 'h2', id }: Props) {
  return (
    <div className={`shead ${layout === 'stack' ? '' : layout}`}>
      <div>
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}
        <SplitLines as={as} id={id} className="h2" lines={title} delay={0.05} />
      </div>
      {(lead || aside) && (
        <Reveal delay={0.15}>
          {lead && <p className="lead">{lead}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
