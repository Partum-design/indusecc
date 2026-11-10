import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '../motion/Counter';
import { Parallax } from '../motion/Parallax';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';
import { Button } from '../ui/Button';
import { Icon, type IconName } from '../ui/Icon';
import { HeroMark } from './HeroMark';
import { photos } from '@/lib/photos';
import { SITE } from '@/lib/site';

const CARDS: { icon: IconName; n: number; s: string; l: string }[] = [
  { icon: 'award', n: 100, s: '+', l: 'empresas certificadas' },
  { icon: 'clock', n: 10, s: '+', l: 'años de experiencia' },
  { icon: 'users', n: 10000, s: '+', l: 'horas de capacitación' },
];

/**
 * Home hero: a slanted wine panel over a full-bleed photo (gold edge along
 * the cut), the brand hexagon as a CTA straddling the diagonal, and glass
 * stat cards along the bottom. On small screens the panel turns into a
 * bottom gradient so nothing has to fit inside a diagonal.
 */
export function HomeHero() {
  return (
    <section className="hx">
      <div className="hx-photo">
        <Parallax amount={7} className="parallax" scale={1.08}>
          <Image
            src={photos.sesionFormacion}
            alt="Equipo de calidad de INDUSECC revisando el control de procesos en una planta"
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            placeholder="blur"
            quality={75}
          />
        </Parallax>
      </div>
      <div className="hx-edge" aria-hidden="true" />
      <div className="hx-panel" aria-hidden="true" />

      <div className="hx-body wrap-wide">
        <div className="hx-copy">
          <Reveal immediate delay={0.05}>
            <span className="eyebrow on-dark">Consultoría ISO · México · desde {SITE.foundingYear}</span>
          </Reveal>
          <SplitLines as="h1" className="display" immediate delay={0.12} lines={['Soluciones', <>que <em>elevan</em></>, 'tu empresa']} />
          <Reveal immediate delay={0.55}>
            <p className="hx-sub">
              Implementamos, auditamos y certificamos sistemas de gestión <strong>ISO 9001, 14001, 45001, 27001 y 37001</strong>. Un solo equipo, del diagnóstico al certificado.
            </p>
          </Reveal>
          <Reveal immediate delay={0.7}>
            <div className="actions">
              <Button href="/servicios">Explorar servicios</Button>
              <Button href="/contacto" variant="ghost" icon="calendar">Diagnóstico gratuito</Button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal immediate delay={0.9} className="hx-hex-wrap">
        <Link href="/contacto" className="hx-hex" aria-label="Agenda tu diagnóstico gratuito">
          <svg className="hx-hex-line" viewBox="0 0 100 115" aria-hidden="true"><polygon points="50,1 99,29.5 99,85.5 50,114 1,85.5 1,29.5" /></svg>
          <HeroMark />
          <span>Agenda tu<br />diagnóstico</span>
        </Link>
      </Reveal>

      <div className="hx-foot wrap-wide">
        <div className="hx-cards">
          {CARDS.map((c, i) => (
            <Reveal immediate delay={0.85 + i * 0.08} key={c.l} className="glass-card">
              <span className="gc-ico"><Icon name={c.icon} /></span>
              <span>
                <b><Counter to={c.n} suffix={c.s} /></b>
                <small>{c.l}</small>
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal immediate delay={1.1} className="glass-card hx-rate">
          <span className="gc-ico ring"><Icon name="star" fill="currentColor" stroke="none" /></span>
          <span>
            <b>5.0</b>
            <small>satisfacción de nuestros clientes</small>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
