import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { HeroMark } from '@/components/sections/HeroMark';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { CtaBand } from '@/components/sections/CtaBand';
import { PostCard } from '@/components/sections/PostCard';
import { SectionHead } from '@/components/sections/SectionHead';
import { Steps } from '@/components/sections/Steps';
import { Testimonials, type Testimonial } from '@/components/sections/Testimonials';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { photos } from '@/lib/photos';
import { formatDate, getPosts } from '@/lib/posts';
import { pageMetadata } from '@/lib/seo';
import { SERVICES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Consultoría y certificación ISO en México',
    description:
      'INDUSECC: consultoría, implementación, auditoría y certificación ISO 9001, 14001, 45001, 27001 y 37001 en México. Más de 10 años y 100+ empresas certificadas. Diagnóstico gratuito.',
    path: '/',
  }),
  title: { absolute: 'INDUSECC · Consultoría y certificación ISO en México' },
};

const TESTIMONIALS: Testimonial[] = [
  { quote: 'Excelente Ing. Danna, gracias a tu equipo, muy buen trabajo. El proceso de certificación fue impecable y el acompañamiento de primer nivel.', name: 'Director General', company: 'Plus Secure de México', initials: 'PS', date: 'mar 2024' },
  { quote: 'El equipo de INDUSECC nos acompañó en todo el proceso de implementación ISO. Profesionales, puntuales y con un dominio extraordinario del tema.', name: 'CEO', company: 'Innovatech México', initials: 'IN', date: 'jun 2024' },
  { quote: 'Gracias a INDUSECC logramos obtener nuestra certificación ISO 9001:2015 en tiempo récord. Su metodología y atención al cliente son de primer nivel.', name: 'Gerente de Calidad', company: 'Grupo Industrial del Norte', initials: 'GI', date: 'sep 2024' },
  { quote: 'INDUSECC nos guió en todo el proceso de certificación ISO 9001. En menos de 7 meses logramos el certificado al primer intento. La transparencia y el seguimiento fueron clave.', name: 'María R.', company: 'Directora de Calidad · Manufactura, CDMX', initials: 'MR', date: '2024' },
];

const PROCESS = [
  { title: 'Diagnóstico', text: 'Evaluamos el estado actual de tu empresa frente a la norma y detectamos brechas y oportunidades.' },
  { title: 'Plan de acción', text: 'Diseñamos una hoja de ruta personalizada con responsables, tiempos y objetivos medibles.' },
  { title: 'Implementación', text: 'Ejecutamos contigo cada etapa: procesos, controles y documentación que sí se usan.' },
  { title: 'Capacitación', text: 'Formamos a tu personal para que el sistema siga vivo cuando nosotros no estemos.' },
  { title: 'Certificación', text: 'Coordinamos la auditoría con un organismo acreditado y te acompañamos hasta el sello.' },
];

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <div className="hero-media">
          <Parallax amount={9} className="parallax" scale={1.1}>
            <Image src={photos.heroInspector} alt="Inspector de calidad revisando una línea de producción industrial" fill priority sizes="100vw" placeholder="blur" quality={75} />
          </Parallax>
        </div>
        <HeroMark />
        <div className="hero-body">
          <div className="wrap-wide">
            <div className="hero-copy">
              <Reveal immediate delay={0.05}>
                <span className="hero-meta"><span className="dot" />Consultoría ISO en México · desde {SITE.foundingYear}</span>
              </Reveal>
              <SplitLines
                as="h1"
                className="display"
                immediate
                delay={0.12}
                lines={['Soluciones', <>que <em>elevan</em></>, 'tu empresa.']}
              />
              <Reveal immediate delay={0.55}>
                <p className="hero-sub">
                  Implementamos, auditamos y certificamos sistemas de gestión <strong>ISO 9001, 14001, 45001, 27001 y 37001</strong>. Transformamos procesos en ventajas competitivas, con un solo equipo de principio a fin.
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
        </div>
        <div className="hero-foot">
          <div className="wrap-wide hero-stats">
            {[
              { n: 10, s: '+', l: 'años de experiencia comprobada' },
              { n: 100, s: '+', l: 'empresas certificadas en México' },
              { n: 10000, s: '+', l: 'horas de capacitación impartidas' },
              { n: 25, s: '+', l: 'asociaciones y cámaras aliadas' },
            ].map((st, i) => (
              <Reveal immediate delay={0.85 + i * 0.08} key={st.l} className="hero-stat">
                <b><Counter to={st.n} suffix={st.s} /></b>
                <span>{st.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <span className="scroll-cue" aria-hidden="true">Scroll</span>
      </section>

      <Ticker />

      {/* ───────── SERVICES ───────── */}
      <section className="section dark grain" id="servicios" style={{ overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.16 }}>
          <Image src={photos.industry40} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} quality={70} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--night), rgba(23,5,7,.6) 40%, var(--night))' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead
            layout="split"
            eyebrow="Servicios especializados"
            title={[<>Calidad que <em>impulsa,</em></>, <>procesos que <em>certifican.</em></>]}
            lead={<>Soluciones a la medida, desde la implementación de tu sistema de gestión hasta la <strong>certificación internacional</strong>. Elige un servicio para ver el detalle.</>}
          />
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.06} y={24}>
                <Link href={s.href} className="svc-row">
                  <span className="svc-n">{s.n}</span>
                  <h3>{s.label}</h3>
                  <p>{s.desc}</p>
                  <span className="svc-arrow"><Icon name="arrowUpRight" /></span>
                </Link>
              </Reveal>
            ))}
            <Reveal y={24}>
              <Link href="/curso-interno" className="svc-row">
                <span className="svc-n">06</span>
                <h3>Capacitación empresarial</h3>
                <p>Curso de Auditor Interno ISO 9001:2015 con constancia DC-3 y programas in-company.</p>
                <span className="svc-arrow"><Icon name="arrowUpRight" /></span>
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <div className="actions" style={{ marginTop: 44, justifyContent: 'space-between' }}>
              <p className="lead on-dark" style={{ maxWidth: '44ch' }}>¿No sabes por dónde empezar? Responde 6 preguntas y recibe una recomendación en 2 minutos.</p>
              <Button href="/servicios#autodiagnostico">Hacer autodiagnóstico</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── WHY ───────── */}
      <section className="section">
        <div className="wrap why-grid">
          <Reveal y={40}>
            <div className="media tall">
              <Parallax amount={7}>
                <Image src={photos.executiveTablet} alt="Director de operaciones revisando indicadores de calidad en planta" fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
              <div className="media-badge">
                <b><Counter to={100} suffix="%" /></b>
                <small>de nuestros clientes<br />certificados al primer intento</small>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal><span className="eyebrow">Por qué INDUSECC</span></Reveal>
            <SplitLines className="h2" lines={['Un solo equipo,', <>del diagnóstico <em>al sello.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 22 }}>No vendemos papeles: instalamos sistemas que tu equipo entiende, usa y mantiene. Por eso nuestros clientes renuevan con nosotros.</p>
            </Reveal>
            <div className="why-list">
              {[
                { t: 'Más de una década de experiencia', p: 'Hemos acompañado a más de 100 organizaciones de manufactura, servicios, salud y gobierno.' },
                { t: 'Metodología de inicio a fin', p: 'Diagnóstico, implementación, auditoría y certificación con objetivos claros y medibles.' },
                { t: 'Respaldo internacional', p: 'Trabajamos con organismos acreditados y más de 25 asociaciones y cámaras industriales.' },
              ].map((w, i) => (
                <Reveal key={w.t} delay={0.1 + i * 0.08} className="why-item">
                  <b>0{i + 1}</b>
                  <div>
                    <h3>{w.t}</h3>
                    <p>{w.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section className="section paper">
        <div className="wrap split reverse">
          <Reveal y={40}>
            <div className="about-mosaic">
              <div className="media" style={{ aspectRatio: '4 / 5.4' }}>
                <Parallax amount={6}>
                  <Image src={photos.teamFactory} alt="Equipo de ingenieros y directivos en una planta industrial" fill sizes="(min-width: 960px) 30vw, 60vw" placeholder="blur" style={{ objectPosition: '45% center' }} />
                </Parallax>
              </div>
              <div className="about-quote">
                <p>“Experiencia y profesionalismo para garantizar tu cumplimiento normativo.”</p>
                <small>Avanzamos juntos</small>
              </div>
              <div className="panel-dark" style={{ padding: 24, display: 'grid', alignContent: 'end' }}>
                <b className="serif" style={{ fontSize: '2.6rem', lineHeight: 1, color: 'var(--gold-light)' }}>{SITE.foundingYear}</b>
                <small style={{ color: 'rgba(255,255,255,.7)', marginTop: 8 }}>Año en que empezamos a elevar empresas</small>
              </div>
            </div>
          </Reveal>
          <div className="split-copy">
            <Reveal><span className="eyebrow">Quiénes somos</span></Reveal>
            <SplitLines className="h2" lines={['Más que consultores,', <><em>tu aliado.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Somos un grupo de profesionales dedicados a la <strong>consultoría, capacitación, auditoría, implementación y certificación de normas ISO</strong>, además de servicios especializados industriales.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mv">
                <div><b>Misión</b><p>Ofrecer consultoría integral ISO y servicios industriales que mejoren procesos con calidad, compromiso y resultados medibles.</p></div>
                <div><b>Visión</b><p>Ser líderes en soluciones integrales, adaptándonos al mercado y fomentando la colaboración con excelencia operativa.</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="actions">
                <Button href="/nosotros" variant="wine">Conócenos</Button>
                <Button href={SITE.brochure} variant="line" icon="download">Brochure</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── IMPACT ───────── */}
      <section className="section dark impact">
        <div className="impact-bg" aria-hidden="true">
          <Parallax amount={10}>
            <Image src={photos.workerHeights} alt="" fill sizes="100vw" quality={70} />
          </Parallax>
        </div>
        <div className="wrap">
          <Reveal><span className="eyebrow">Nuestro impacto</span></Reveal>
          <Reveal delay={0.1} y={60}>
            <div className="fit" style={{ margin: '26px 0 clamp(36px, 5vw, 64px)' }} aria-label="Excelencia">
              <span>EXCELENCIA</span>
            </div>
          </Reveal>
          <div className="stats">
            {[
              { n: 10, s: '+', k: 'Años de experiencia', p: 'Más de una década de servicio continuo.' },
              { n: 100, s: '+', k: 'Empresas beneficiadas', p: 'En el sector industrial de todo el país.' },
              { n: 10000, s: '+', k: 'Horas de capacitación', p: 'Impartidas a equipos de alto desempeño.' },
              { n: 25, s: '+', k: 'Asociaciones activas', p: 'Cámaras industriales y de comercio.' },
            ].map((st, i) => (
              <Reveal key={st.k} delay={i * 0.08} className="stat">
                <b><Counter to={st.n} suffix={st.s} /></b>
                <strong>{st.k}</strong>
                <p>{st.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            layout="split"
            eyebrow="Nuestro proceso"
            title={[<>Cómo <em>trabajamos</em></>, 'contigo.']}
            lead={<>Una hoja de ruta clara en cinco etapas. Te acompañamos en cada una hasta obtener el <strong>sello internacional</strong> y mantenerlo en el tiempo.</>}
          />
          <Steps items={PROCESS} horizontal />
        </div>
      </section>

      {/* ───────── COURSE ───────── */}
      <section className="section paper" id="curso">
        <div className="wrap course">
          <div>
            <Reveal><span className="eyebrow">Curso destacado</span></Reveal>
            <SplitLines className="h2" lines={[<><em>Auditor Interno</em></>, 'ISO 9001:2015']} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 22 }}>Aprende a planear, ejecutar y documentar auditorías internas con casos reales. Incluye <strong>constancia DC-3</strong>, plantillas listas y pago seguro con Mercado Pago.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="course-meta">
                <div><small>Modalidad</small><b>Presencial y online</b></div>
                <div><small>Duración</small><b>2 jornadas</b></div>
                <div><small>Incluye</small><b>Diploma + DC-3</b></div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="actions" style={{ marginTop: 30 }}>
                <Button href="/curso-interno" variant="wine">Ver el curso</Button>
                <Button href="/curso-interno#temario" variant="line" icon="doc">Temario</Button>
              </div>
            </Reveal>
          </div>
          <Reveal y={40}>
            <div className="media square">
              <Image src={photos.cursoDestacado} alt="Curso de Auditor Interno ISO 9001 de INDUSECC" fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="section dark grain" id="testimonios">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead
            layout="split"
            eyebrow="Testimonios"
            title={['Lo que dicen', <>nuestros <em>clientes.</em></>]}
            lead="5.0 de satisfacción. Empresas que pasaron de procesos informales a sistemas certificados."
          />
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>

      <ClientLogos />

      {/* ───────── BLOG ───────── */}
      {posts.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead
              layout="split"
              eyebrow="Blog ISO"
              title={['Guías para decidir', <><em>con criterio.</em></>]}
              aside={<Button href="/blog" variant="line">Ver todos los artículos</Button>}
            />
            <div className="post-grid">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <PostCard post={{ ...p, dateLabel: formatDate(p.date) }} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand image={photos.cityNight} />
    </>
  );
}
