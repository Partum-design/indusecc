import Link from 'next/link';
import type { ReactNode } from 'react';
import { Magnetic } from '../motion/Magnetic';
import { Icon, WhatsAppIcon, type IconName } from './Icon';

type Variant = 'gold' | 'wine' | 'ghost' | 'line' | 'wa';

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName | 'whatsapp' | null;
  small?: boolean;
  magnetic?: boolean;
  className?: string;
};

export function Button({ href, children, variant = 'gold', icon = 'arrow', small, magnetic = true, className = '' }: Props) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="ico">{icon === 'whatsapp' ? <WhatsAppIcon /> : <Icon name={icon} />}</span>
      )}
    </>
  );
  const el = external ? (
    <a className={cls} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
