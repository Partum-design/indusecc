import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { SITE, wa } from '@/lib/site';
import { Parallax } from '../motion/Parallax';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

type Props = {
  image?: StaticImageData;
  eyebrow?: string;
  title?: ReactNode[];
  lead?: ReactNode;
  primary?: { href: string; label: string };
  waText?: string;
};

export function CtaBand({
  image,
  eyebrow = 'Comienza hoy',
  title = ['¿Listo para', <><em>transformar</em> tu empresa?</>],
  lead = <>Da el primer paso hacia la excelencia operativa. Te acompañamos desde el diagnóstico hasta la <strong>certificación internacional</strong>.</>,
  primary = { href: '/contacto', label: 'Agendar consulta gratuita' },
  waText,
}: Props) {
  return (
    <section className="cta section">
      {image && (
        <div className="cta-media">
          <Parallax amount={6} className="parallax">
            <Image src={image} alt="" fill sizes="100vw" placeholder="blur" quality={70} />
          </Parallax>
        </div>
      )}
      <div className="wrap cta-grid">
        <div>
          <Reveal>
            <span className="eyebrow on-dark">{eyebrow}</span>
          </Reveal>
          <SplitLines className="h2 on-dark" lines={title} delay={0.05} />
          <Reveal delay={0.15}>
            <p className="lead on-dark" style={{ marginTop: 22 }}>{lead}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="actions" style={{ marginTop: 32 }}>
              <Button href={primary.href}>{primary.label}</Button>
              <Button href={wa(waText)} variant="wa" icon="whatsapp">WhatsApp</Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ContactList />
        </Reveal>
      </div>
    </section>
  );
}

export function ContactList() {
  return (
    <div className="contact-list">
      <a className="contact-item" href={`tel:${SITE.phone.tel}`}>
        <span className="ci"><Icon name="phone" /></span>
        <span><small>Teléfono directo</small><b>{SITE.phone.display}</b></span>
      </a>
      <a className="contact-item" href={`mailto:${SITE.email}`}>
        <span className="ci"><Icon name="mail" /></span>
        <span><small>Correo electrónico</small><b>{SITE.email}</b></span>
      </a>
      <div className="contact-item">
        <span className="ci"><Icon name="pin" /></span>
        <span><small>Ubicación</small><b>{SITE.city} · cobertura nacional</b></span>
      </div>
    </div>
  );
}
