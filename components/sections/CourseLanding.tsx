import Image from 'next/image';
import { CourseCheckout } from '../forms/CourseCheckout';
import { ParticipantProfile } from '../forms/ParticipantProfile';
import { Parallax } from '../motion/Parallax';
import { Reveal } from '../motion/Reveal';
import { SplitLines } from '../motion/SplitLines';
import { Button } from '../ui/Button';
import { Icon, type IconName } from '../ui/Icon';
import { JsonLd } from '../ui/JsonLd';
import { Faq } from './Faq';
import { SectionHead } from './SectionHead';
import { VideoFacade } from './VideoFacade';
import { photos } from '@/lib/photos';
import { abs, faqLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export type CourseConfig = {
  path: string;
  mode: 'presencial' | 'online';
  dateLabel: string;
  dateText: string;
  schedule: string[];
  startDate: string;
  endDate: string;
  place: { title: string; text: string; bullets: string[] };
  price: number;
  priceNote: string;
  priceBullets: string[];
};

const PROGRAM = 'Auditor Interno ISO 9001:2015';
const WA_COURSE = 'https://wa.me/5215616044547';
const waCourse = (t: string) => `${WA_COURSE}?text=${encodeURIComponent(t)}`;

const BENEFITS: { icon: IconName; t: string; p: string }[] = [
  { icon: 'award', t: 'Constancia oficial', p: 'Diploma y formato DC-3 incluidos para respaldo curricular inmediato.' },
  { icon: 'users', t: 'Talleres prácticos', p: 'Simulaciones de auditoría, entrevistas y hallazgos con enfoque real.' },
  { icon: 'doc', t: 'Plantillas listas', p: 'Listas de verificación, reportes y formatos para usar desde el curso.' },
  { icon: 'cap', t: 'Instructor experto', p: 'Experiencia aplicada en implementación, auditoría y mejora de sistemas.' },
  { icon: 'layers', t: 'Material didáctico', p: 'Alineado con ISO 9001:2015 e ISO 19011:2018 para auditoría interna.' },
  { icon: 'heart', t: 'Experiencia cuidada', p: 'Logística y atención profesional de principio a fin.' },
];

const MODULES = [
  'Introducción y fundamentos del control',
  'Auditorías internas bajo el estándar ISO 9001',
  'Tipos de auditorías y sus aplicaciones organizacionales',
  'Metodología estratégica para la auditoría interna',
  'El perfil del auditor interno: atribuciones y responsabilidades',
  'Desarrollo práctico: de la preparación a la ejecución en campo',
  'Resultados de la auditoría: comunicación y reportes de valor',
  'Gestión de no conformidades: seguimiento y cierre efectivo',
  'Evaluación y mejora continua del proceso de auditoría',
];

const FAQ = [
  { q: '¿Se requiere experiencia previa en auditoría?', a: 'No. El curso parte desde fundamentos y avanza hasta la ejecución práctica de una auditoría interna bajo ISO 9001:2015.' },
  { q: '¿La constancia DC-3 tiene costo adicional?', a: 'No. La inversión ya contempla la documentación académica y el trámite de la constancia DC-3.' },
  { q: '¿Pueden inscribirse varios colaboradores?', a: 'Sí. Puedes registrar participantes de forma individual o coordinar inscripciones para grupos y empresas.' },
  { q: '¿Puedo pedir factura?', a: 'Sí. Puedes solicitar factura una vez confirmado tu proceso de inscripción.' },
  { q: '¿Cómo pago?', a: 'En línea con Mercado Pago (tarjeta de crédito o débito, hasta 12 meses). No capturamos datos de tarjeta en nuestro sitio.' },
];

export function CourseLanding({ c }: { c: CourseConfig }) {
  const online = c.mode === 'online';
  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Curso ${PROGRAM}`,
    description: 'Formación práctica para planear, ejecutar y documentar auditorías internas bajo ISO 9001:2015 e ISO 19011:2018. Incluye diploma y constancia DC-3.',
    provider: { '@type': 'Organization', name: SITE.name, sameAs: SITE.url },
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: c.price, priceCurrency: 'MXN', category: 'Paid', url: abs(c.path), availability: 'https://schema.org/InStock' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: online ? 'Online' : 'Onsite',
      startDate: c.startDate,
      endDate: c.endDate,
      ...(online ? {} : { location: { '@type': 'Place', name: c.place.title, address: c.place.text } }),
    },
  };

  return (
    <>
      <JsonLd data={[courseLd, faqLd(FAQ)]} />

      <section className="course-hero" id="inicio">
        <div className="wrap course-hero-grid">
          <div>
            <Reveal immediate delay={0.05}><span className="hero-meta"><span className="dot" />Certificación oficial incluida · DC-3</span></Reveal>
            <SplitLines as="h1" className="h1 on-dark" immediate delay={0.12} lines={['Curso Auditor Interno', <><em>bajo ISO 9001:2015</em></>]} />
            <Reveal immediate delay={0.45}>
              <p className="phero-lead">Formación {online ? 'en línea, en vivo,' : 'presencial'} para aprender a auditar, documentar hallazgos y fortalecer sistemas de gestión de calidad con enfoque práctico desde el primer módulo.</p>
            </Reveal>
            <Reveal immediate delay={0.55}>
              <div className="actions" style={{ marginTop: 30 }}>
                <Button href="#inscripcion">Reservar mi lugar</Button>
                <Button href="#temario" variant="ghost" icon="doc">Ver temario</Button>
              </div>
            </Reveal>
            <Reveal immediate delay={0.65}>
              <div className="course-facts">
                <div><small>Fecha</small><b>{c.dateLabel}</b></div>
                <div><small>Modalidad</small><b>{online ? 'Online · Google Meet' : 'Presencial CDMX'}</b></div>
                <div><small>Inversión</small><b>${c.price.toLocaleString('es-MX')} MXN</b></div>
              </div>
            </Reveal>
          </div>
          <Reveal immediate delay={0.4} y={40}>
            <VideoFacade desktopId="YXGxAGfbFoU" mobileId="EK3oj8a1jKc" poster={photos.presenterTeam} title="Video del curso de Auditor Interno ISO 9001" />
          </Reveal>
        </div>
      </section>

      <nav className="subnav" aria-label="Secciones del curso">
        <div className="wrap subnav-in">
          <a href="#beneficios">Beneficios</a>
          <a href="#temario">Temario</a>
          <a href="#detalles">Fechas y sede</a>
          <a href="#inscripcion">Inscripción</a>
          <a href="#faqs">FAQs</a>
        </div>
      </nav>

      <section className="section" id="beneficios">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Ventajas del programa" title={['Una formación práctica', <>y de <em>alto valor.</em></>]} lead="Un formato concentrado para que conozcas el alcance del curso, su utilidad y lo que recibirás como participante." />
          <div className="cards c3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={(i % 3) * 0.08} className="card">
                <div className="card-ico"><Icon name={b.icon} /></div>
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </Reveal>
            ))}
          </div>
          <div className="gallery" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {[photos.ambienteCurso, photos.sesionFormacion, photos.equipoTrabajo].map((img, i) => (
              <Reveal key={i} delay={i * 0.08} y={30} className="media">
                <Parallax amount={5}>
                  <Image src={img} alt={['Ambiente del curso de capacitación', 'Sesión de implementación y formación', 'Equipo de trabajo durante el curso'][i]} fill sizes={i === 0 ? '100vw' : '50vw'} placeholder="blur" />
                </Parallax>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Público objetivo" title={['Ideal para empresas', <>y <em>profesionales.</em></>]} />
          <div className="cards">
            <Reveal className="card feature">
              <span className="card-n" style={{ color: 'var(--gold-light)' }}>Para empresas e instituciones</span>
              <h3>Capacita auditores internos con una formación enfocada en resultados.</h3>
              <ul>
                <li>Fortalece el sistema de gestión de calidad interno.</li>
                <li>Reduce la dependencia de apoyo externo.</li>
                <li>Facilita el registro y seguimiento de participantes.</li>
              </ul>
              <div style={{ marginTop: 24 }}><Button href="#inscripcion" small magnetic={false}>Registrar colaboradores</Button></div>
            </Reveal>
            <Reveal delay={0.08} className="card">
              <span className="card-n">Para profesionales y estudiantes</span>
              <h3>Impulsa tu perfil con una formación práctica y aplicada.</h3>
              <ul>
                <li>Mejora tu currículum con enfoque práctico.</li>
                <li>Conecta con oportunidades de supervisión y consultoría.</li>
                <li>Resuelve tu inscripción en pocos pasos.</li>
              </ul>
              <div style={{ marginTop: 24 }}><Button href="#inscripcion" variant="wine" small magnetic={false}>Inscribirme</Button></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark grain" id="temario">
        <div className="wrap sticky-split" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sticky">
            <Reveal><span className="eyebrow">Programa de capacitación ejecutiva</span></Reveal>
            <SplitLines className="h2" lines={['Temario', <><em>exclusivo.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 20 }}>Formación en auditoría interna de gestión en cumplimiento con el estándar internacional <strong>ISO 9001:2015</strong>.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="check-list on-dark" style={{ color: 'rgba(255,255,255,.82)', marginTop: 26 }}>
                {['Plan de auditoría y listas de verificación base', 'Material de trabajo y guía de reporte de hallazgos', 'Base para interpretación práctica de auditoría', 'Constancia de capacitación y trámite DC-3'].map((x) => (
                  <li key={x}><Icon name="check" />{x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="actions" style={{ marginTop: 30 }}>
                <Button href="#inscripcion">Asegurar mi lugar</Button>
                <Button href={waCourse(`Hola, me interesa el curso de ${PROGRAM}.`)} variant="wa" icon="whatsapp">Pedir informes</Button>
              </div>
            </Reveal>
          </div>
          <ol className="modules" style={{ listStyle: 'none' }}>
            {MODULES.map((m, i) => (
              <Reveal as="li" key={m} delay={i * 0.04} y={20} className="module">
                <b>{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i]}</b>
                <div><small>Módulo {i + 1}</small><h3>{m}</h3></div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="detalles">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Información técnica" title={['Todo lo importante', <>en una sola <em>vista.</em></>]} />
          <div className="info-cards">
            <Reveal className="info-card">
              <span className="eyebrow">Cuándo</span>
              <h3>{c.dateLabel}</h3>
              <p>{c.dateText}</p>
              <ul>{c.schedule.map((s) => <li key={s}><Icon name="clock" />{s}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.08} className="info-card">
              <span className="eyebrow">{online ? 'Plataforma' : 'Dónde'}</span>
              <h3>{c.place.title}</h3>
              <p>{c.place.text}</p>
              <ul>{c.place.bullets.map((s) => <li key={s}><Icon name={online ? 'video' : 'pin'} />{s}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.16} className="info-card price">
              <span className="eyebrow">Inversión</span>
              <h3>${c.price.toLocaleString('es-MX')} <small style={{ fontSize: '1rem' }}>MXN</small></h3>
              <p>{c.priceNote}</p>
              <ul>{c.priceBullets.map((s) => <li key={s}><Icon name="check" />{s}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section paper" id="inscripcion" style={{ scrollMarginTop: 60 }}>
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Paso final" title={['Inscripción y', <>pago <em>en línea.</em></>]} lead="Completa tus datos y te llevaremos al checkout oficial de Mercado Pago en una nueva pestaña." />
          <CourseCheckout basePrice={c.price} programName={PROGRAM} />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-copy">
            <Reveal><span className="eyebrow">Perfil del participante</span></Reveal>
            <SplitLines className="h2" lines={['¿Tienes dudas antes', <>de <em>inscribirte?</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Compártenos tu perfil y te orientamos por WhatsApp sobre si el curso es para ti. Tus datos se usan solo para contactarte.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ParticipantProfile waNumber={WA_COURSE} program={PROGRAM} />
          </Reveal>
        </div>
      </section>

      <section className="section paper" id="faqs">
        <div className="wrap sticky-split">
          <div className="sticky">
            <Reveal><span className="eyebrow">Preguntas frecuentes</span></Reveal>
            <SplitLines className="h2" lines={['Resuelve tus dudas', <>antes de <em>inscribirte.</em></>]} />
          </div>
          <Faq items={FAQ} />
        </div>
      </section>
    </>
  );
}
