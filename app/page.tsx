import Image from 'next/image';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { HomeHero } from '@/components/sections/HomeHero';
import { Mosaic } from '@/components/sections/Mosaic';
import { ServiceStrips, type Strip } from '@/components/sections/ServiceStrips';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { CtaBand } from '@/components/sections/CtaBand';
import { PostCard } from '@/components/sections/PostCard';
import { SectionHead } from '@/components/sections/SectionHead';
import { Steps } from '@/components/sections/Steps';
import { Testimonials, type Testimonial } from '@/components/sections/Testimonials';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
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

const STRIP_PHOTOS = [
  { image: photos.industry40, alt: 'Ingenieros revisando una línea automatizada' },
  { image: photos.teamFactory, alt: 'Equipo de planta certificado' },
  { image: photos.audienceConsultant, alt: 'Consultor asesorando a un equipo directivo' },
  { image: photos.ambienteCurso, alt: 'Auditora revisando registros de calidad en planta' },
  { image: photos.executiveTablet, alt: 'Directivo revisando indicadores de cumplimiento' },
];

const STRIPS: Strip[] = [
  ...SERVICES.map((s, i) => ({ n: s.n, href: s.href, title: s.label, short: s.short, desc: s.desc ?? '', ...STRIP_PHOTOS[i] })),
  { n: '06', href: '/servicios#portafolio', title: 'Capacitación empresarial', short: 'Capacitación', desc: 'Formación de auditores internos y programas in-company en normas ISO, con constancia DC-3.', image: photos.trainingClass, alt: 'Capacitación de personal en normas ISO' },
];

const WHY = [
  { t: 'Más de una década de experiencia', p: 'Más de 100 organizaciones de manufactura, servicios, salud y gobierno nos respaldan.' },
  { t: 'Metodología de inicio a fin', p: 'Diagnóstico, implementación, auditoría y certificación con objetivos claros y medibles.' },
  { t: 'Respaldo internacional', p: 'Organismos acreditados y más de 25 asociaciones y cámaras industriales aliadas.' },
];

export default function HomePage() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <HomeHero />

      <Ticker />

      {/* ───────── SERVICES ───────── */}
      <section className="section" id="servicios">
        <div className="wrap-wide">
          <SectionHead
            layout="split"
            eyebrow="Servicios especializados"
            title={[<>Calidad que <em>impulsa,</em></>, <>procesos que <em>certifican.</em></>]}
            lead={<>Soluciones a la medida, desde la implementación de tu sistema de gestión hasta la <strong>certificación internacional</strong>.</>}
          />
          <ServiceStrips items={STRIPS} />
          <Reveal>
            <div className="strip-note">
              <p>¿No sabes por dónde empezar? Responde 6 preguntas y recibe una recomendación en 2 minutos.</p>
              <Button href="/servicios#autodiagnostico" variant="wine">Hacer autodiagnóstico</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── WHY ───────── */}
      <section className="section paper why2">
        <div className="wrap">
          <div className="why2-top">
            <Reveal><span className="eyebrow">Por qué INDUSECC</span></Reveal>
            <Reveal><span className="pager"><b>01</b><i />03</span></Reveal>
          </div>
          <div className="why2-stage">
            <Reveal y={50}>
              <div className="fit white" aria-hidden="true" style={{ ['--k' as string]: '17.2cqi' }}><span>CALIDAD</span></div>
            </Reveal>
            <Reveal y={60} delay={0.15} className="why2-photo">
              <div className="media">
                <Parallax amount={6}>
                  <Image src={photos.heroInspector} alt="Inspector de calidad revisando una línea de producción" fill sizes="(min-width: 1024px) 64vw, 100vw" placeholder="blur" />
                </Parallax>
                <div className="media-badge">
                  <b><Counter to={100} suffix="%" /></b>
                  <small>de nuestros clientes<br />certificados al primer intento</small>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="why2-head">
            <SplitLines className="h2" lines={['Un solo equipo,', <>del diagnóstico <em>al certificado.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">No vendemos papeles: instalamos sistemas que tu equipo entiende, usa y mantiene. Por eso nuestros clientes renuevan con nosotros.</p>
            </Reveal>
          </div>
          <div className="tiles">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.08} className={`tile ${i === 2 ? 'is-brand' : ''}`}>
                <span className="tile-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.t}</h3>
                <p>{w.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section className="section about2">
        <span className="side-tag" aria-hidden="true">#Desde {SITE.foundingYear} · Ciudad de México</span>
        <div className="wrap split">
          <Mosaic image={photos.equipoTrabajo} alt="Equipo de INDUSECC revisando procesos de calidad en un almacén" />
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
            <Image src={photos.workerHeights} alt="" fill sizes="100vw" quality={65} />
          </Parallax>
        </div>
        <svg className="rays" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 34 }, (_, i) => (
            <line key={i} x1="1200" y1={300} x2={-200 + i * 30} y2={i % 2 ? 0 : 600} />
          ))}
        </svg>
        <div className="wrap">
          <Reveal><span className="eyebrow">Nuestro impacto</span></Reveal>
          <Reveal delay={0.1} y={60}>
            <div className="fit thin" style={{ margin: '22px 0 10px', ['--k' as string]: '11.8cqi' }} aria-label="Excelencia">
              <span>EXCELENCIA</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="spaced" aria-hidden="true">Calidad · Ambiente · Seguridad · Información · Integridad</p>
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
      <section className="section paper">
        <div className="wrap">
          <SectionHead
            layout="split"
            eyebrow="Nuestro proceso"
            title={[<>Cómo <em>trabajamos</em></>, 'contigo.']}
            lead={<>Una hoja de ruta clara en cinco etapas. Te acompañamos en cada una hasta obtener el <strong>certificado internacional</strong> y mantenerlo en el tiempo.</>}
          />
          <Steps items={PROCESS} horizontal />
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="section dark testi-sec" id="testimonios">
        <div className="testi-bg" aria-hidden="true">
          <Image src={photos.presenterTeam} alt="" fill sizes="100vw" quality={60} />
        </div>
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
