import Image from 'next/image';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { CLIENTS } from '@/components/sections/ClientLogos';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHead } from '@/components/sections/SectionHead';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Nosotros: consultores ISO con más de 10 años de experiencia',
  description:
    'Conoce a INDUSECC: equipo multidisciplinario de consultoría, auditoría y certificación ISO en México desde 2014. Más de 100 empresas beneficiadas y 25+ asociaciones aliadas.',
  path: '/nosotros',
  image: photos.managerPlans,
});

const PILLARS: { icon: IconName; t: string; p: string }[] = [
  { icon: 'bolt', t: 'Innovación continua', p: 'Implementamos nuevas tecnologías y metodologías para optimizar procesos y mantener a nuestros clientes a la vanguardia.' },
  { icon: 'shield', t: 'Cumplimiento normativo', p: 'Estándares internacionales de calidad y seguridad en cada proyecto, alineados a las normas ISO vigentes.' },
  { icon: 'layers', t: 'Mejora de recursos', p: 'Fortalecemos capacidades e infraestructura para entregar soluciones cada vez más eficientes y de mayor valor.' },
  { icon: 'leaf', t: 'Impacto sostenible', p: 'Promovemos prácticas que benefician a la sociedad y al medio ambiente, con responsabilidad empresarial.' },
];

const VALUES: { icon: IconName; t: string; p: string }[] = [
  { icon: 'award', t: 'Confianza', p: 'Relaciones sólidas y seguras a largo plazo.' },
  { icon: 'heart', t: 'Gratitud', p: 'Valoramos cada proyecto que nos confías.' },
  { icon: 'eye', t: 'Transparencia', p: 'Claridad en alcances, tiempos y costos.' },
  { icon: 'pulse', t: 'Compromiso', p: 'Excelencia en cada entrega, sin excusas.' },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Nosotros', path: '/nosotros' }])} />
      <PageHero
        image={photos.managerPlans}
        imagePosition="60% center"
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Nosotros' }]}
        eyebrow="Nuestra historia · desde 2014"
        title={['¿Quiénes', <><em>somos?</em></>]}
        lead={<>Confía en nuestros expertos para optimizar tus procesos y garantizar el <strong>cumplimiento normativo</strong>. Más de una década transformando organizaciones.</>}
        actions={
          <>
            <Button href="#historia">Conócenos</Button>
            <Button href={SITE.brochure} variant="ghost" icon="download">Brochure corporativo</Button>
          </>
        }
        facts={[
          { value: <Counter to={10} suffix="+" />, label: 'años de experiencia comprobada' },
          { value: <Counter to={100} suffix="+" />, label: 'empresas beneficiadas en México' },
          { value: <Counter to={25} suffix="+" />, label: 'cámaras y asociaciones activas' },
        ]}
      />
      <Ticker />

      <section className="section" id="historia">
        <div className="wrap split">
          <div className="split-copy">
            <Reveal><span className="eyebrow">Un equipo comprometido</span></Reveal>
            <SplitLines className="h2" lines={['Con tu', <><em>éxito.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Desde nuestra fundación trabajamos con un solo propósito: ofrecer soluciones de consultoría y capacitación que <strong>impulsen el crecimiento de las organizaciones</strong>.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead">Nuestro equipo multidisciplinario combina experiencia técnica con un enfoque personalizado, adaptándose a las características únicas de cada proyecto.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="stats light" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 34 }}>
                <div className="stat"><b><Counter to={10000} suffix="+" /></b><strong>Horas de capacitación</strong></div>
                <div className="stat"><b><Counter to={100} suffix="%" /></b><strong>Clientes satisfechos</strong></div>
              </div>
            </Reveal>
          </div>
          <Reveal y={40}>
            <div className="media tall">
              <Parallax amount={7}>
                <Image src={photos.plantWalk} alt="Ingeniero de INDUSECC guiando a personal de planta durante un recorrido" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
              <div className="media-badge">
                <b>ISO</b>
                <small>9001 · 14001 · 45001<br />27001 · 37001 · 50001</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark grain">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <p className="big-quote">“Experiencia y profesionalismo para <em>garantizar tu cumplimiento normativo.</em>”</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow" style={{ marginTop: 26 }}>INDUSECC · Avanzamos juntos</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            layout="split"
            eyebrow="Hacia la excelencia"
            title={['Avanzamos juntos', <>hacia la <em>excelencia.</em></>]}
            lead="Cuatro compromisos que guían cada proyecto, desde una auditoría puntual hasta un sistema integrado completo."
          />
          <div className="cards">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className={`card ${i === 1 ? 'feature' : ''}`}>
                <div className="card-ico"><Icon name={p.icon} /></div>
                <span className="card-n">0{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap split reverse">
          <div className="split-copy">
            <Reveal><span className="eyebrow">Nuestro enfoque</span></Reveal>
            <SplitLines className="h2" lines={['Hacemos que', <>las ideas <em>cobren vida.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Hemos tenido el privilegio de trabajar con clientes que nos confiaron sus desafíos más importantes, obteniendo <strong>resultados tangibles</strong> y relaciones de largo plazo basadas en la confianza.</p>
            </Reveal>
            <div className="why-list">
              {[
                { t: 'Tu aliado', p: 'Nos adaptamos a las necesidades de cada cliente con soluciones personalizadas.' },
                { t: 'Resultados certificados', p: 'Cada proyecto culmina con resultados medibles y verificables.' },
                { t: '25+ asociaciones activas', p: 'Colaboramos con cámaras industriales y de comercio en todo el país.' },
              ].map((w, i) => (
                <Reveal key={w.t} delay={0.1 + i * 0.08} className="why-item">
                  <b>0{i + 1}</b>
                  <div><h3>{w.t}</h3><p>{w.p}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal y={40}>
            <div className="media wide" style={{ aspectRatio: '4 / 4.4' }}>
              <Parallax amount={6}>
                <Image src={photos.meetingRoom} alt="Reunión de seguimiento de proyecto con el equipo del cliente" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal y={40}>
            <div className="media square" style={{ background: 'linear-gradient(160deg, var(--wine), var(--wine-deep))' }}>
              <Image src={photos.dannaRodriguez} alt="Ing. Danna Rodríguez, Directora General de INDUSECC" fill sizes="(min-width: 960px) 45vw, 100vw" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
            </div>
          </Reveal>
          <div className="split-copy">
            <Reveal><span className="eyebrow">Liderazgo</span></Reveal>
            <SplitLines className="h2" lines={['Ing. Danna', <><em>Rodríguez</em></>]} />
            <Reveal delay={0.1}><span className="badge-gold">Directora General</span></Reveal>
            <Reveal delay={0.15}>
              <p className="lead">Más de una década de experiencia en consultoría ISO y gestión empresarial. Ha guiado a <strong>más de 100 organizaciones</strong> hacia la excelencia operativa y la certificación internacional.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="actions">
                <Button href={`mailto:${SITE.email}`} variant="wine" icon="mail">Escribirle</Button>
                <Button href="/contacto" variant="line">Agendar reunión</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark grain">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead layout="split" eyebrow="Nuestros valores" title={['Comprometidos', <>con la <em>calidad.</em></>]} lead="Valores que guían cada proyecto que emprendemos." />
          <div className="cards">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08} className="card">
                <div className="card-ico"><Icon name={v.icon} /></div>
                <h3>{v.t}</h3>
                <p>{v.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <SectionHead layout="center" eyebrow="Confían en nosotros" title={['Nuestros', <><em>clientes.</em></>]} />
          <div className="cards">
            {CLIENTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className="card" style={{ textAlign: 'center' }}>
                <div style={{ height: 90, position: 'relative', marginBottom: 18 }}>
                  <Image src={c.src} alt={c.name} fill sizes="220px" style={{ objectFit: 'contain' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>{c.name}</h3>
                <p>{c.country}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand image={photos.stairsEngineers} />
    </>
  );
}
