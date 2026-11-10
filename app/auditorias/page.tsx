import Image from 'next/image';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { AuditTypes } from '@/components/sections/AuditTypes';
import { CtaBand } from '@/components/sections/CtaBand';
import { Faq } from '@/components/sections/Faq';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHead } from '@/components/sections/SectionHead';
import { Steps } from '@/components/sections/Steps';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, faqLd, pageMetadata, serviceLd } from '@/lib/seo';

const TITLE = 'Auditorías ISO internas, externas y de segunda parte';
const DESC = 'Auditorías de sistema, proceso, producto e integradas para ISO 9001, 14001, 45001, 27001, 50001, 22000, 37001 y más. Informe preliminar en 48 horas y plan de acción.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/auditorias', image: photos.qcInspector });

const NORMS = [
  ['9001', 'Gestión de calidad', 'Capacidad de proporcionar productos y servicios que satisfagan los requisitos del cliente.', 'SGC'],
  ['14001', 'Gestión ambiental', 'Proteger el medio ambiente en equilibrio con las necesidades socioeconómicas.', 'SGA'],
  ['45001', 'Seguridad y salud', 'Lugares de trabajo seguros y saludables.', 'SST'],
  ['27001', 'Seguridad de la información', 'Protección de los activos de información críticos.', 'SGSI'],
  ['50001', 'Gestión de energía', 'Eficiencia, uso y consumo energético, menos costos y emisiones.', 'SGEn'],
  ['22000', 'Seguridad alimentaria', 'Inocuidad de los alimentos en toda la cadena.', 'SGSA'],
  ['37001', 'Antisoborno', 'Controles para prevenir, detectar y tratar el soborno.', 'SGAS'],
  ['+', 'Otras normas', 'IATF 16949, AS 9100, ISO 13485, FSSC 22000, SA 8000 y estándares sectoriales.', 'Sector'],
];

const VALUE: { icon: IconName; t: string; p: string }[] = [
  { icon: 'award', t: 'Auditores certificados', p: 'Auditores líderes certificados, con experiencia sectorial y formación continua en las últimas versiones normativas.' },
  { icon: 'refresh', t: 'Mejora continua real', p: 'No solo señalamos incumplimientos: proponemos soluciones prácticas que generan mejoras tangibles.' },
  { icon: 'bolt', t: 'Respuesta ágil', p: 'Informe preliminar en menos de 48 horas y disponibilidad para auditorías urgentes pre-certificación.' },
  { icon: 'globe', t: 'Cobertura nacional', p: 'Auditorías in situ en todo el país con la misma calidad, sin importar la ubicación de tus instalaciones.' },
  { icon: 'lock', t: 'Confidencialidad total', p: 'Acuerdos de no divulgación firmados antes de cada proceso de auditoría.' },
  { icon: 'scale', t: 'Relación calidad-precio', p: 'Planes adaptados al tamaño de tu organización, con precios transparentes y sin costos ocultos.' },
];

const FAQ = [
  { q: '¿Cuál es la diferencia entre auditoría interna y externa?', a: 'La auditoría interna la realiza personal de la propia organización o alguien en su nombre. La externa la realiza una entidad independiente, lo que aporta objetividad e imparcialidad. INDUSECC puede actuar como tu auditor externo para cumplir el requisito normativo de auditorías internas independientes.' },
  { q: '¿Con qué frecuencia debo realizar una auditoría?', a: 'Depende de tu programa de auditoría y de los requisitos normativos. Se recomienda al menos una auditoría completa del sistema al año; definimos contigo la frecuencia óptima según riesgo, madurez y ciclo de certificación.' },
  { q: '¿Cuánto tiempo dura una auditoría?', a: 'Para una pyme con un solo sistema suele ser de 1 a 2 días. En organizaciones medianas o grandes, o en auditorías integradas, puede ir de 3 a 5 días o más. Te damos una estimación personalizada antes de iniciar.' },
  { q: '¿Qué ocurre si se detectan no conformidades?', a: 'Son parte natural de la mejora. Documentamos cada hallazgo con evidencia objetiva y te acompañamos a definir acciones correctivas eficaces antes de tu auditoría de certificación o de cliente.' },
  { q: '¿Pueden auditar normas muy específicas o sectoriales?', a: 'Sí. Además de las principales normas ISO auditamos IATF 16949 (automotriz), AS 9100 (aeronáutica), ISO 13485 (dispositivos médicos), FSSC 22000 y otros. Consúltanos tu norma específica.' },
];

export default function AuditoriasPage() {
  return (
    <>
      <JsonLd data={[serviceLd(TITLE, DESC, '/auditorias'), faqLd(FAQ), breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: 'Auditorías', path: '/auditorias' }])]} />
      <PageHero
        image={photos.qcInspector}
        imagePosition="65% center"
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Auditorías' }]}
        eyebrow="Servicio especializado"
        title={['Auditorías de', <><em>excelencia.</em></>]}
        lead="Auditoría externa para el cumplimiento de auditorías internas, seguimiento del sistema de gestión y mejora continua con valor añadido."
        actions={
          <>
            <Button href="/auditorias/formulario">Solicitar diagnóstico</Button>
            <Button href="#tipos" variant="ghost" icon="layers">Ver tipos</Button>
          </>
        }
        chips={['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 50001']}
        facts={[
          { value: <Counter to={200} suffix="+" />, label: 'auditorías realizadas' },
          { value: <Counter to={120} suffix="+" />, label: 'empresas auditadas' },
          { value: <Counter to={98} suffix="%" />, label: 'satisfacción del cliente' },
        ]}
      />
      <Ticker />

      <section className="section">
        <div className="wrap split">
          <Reveal y={40}>
            <div className="media tall">
              <Parallax amount={7}>
                <Image src={photos.checklistDark} alt="Auditor completando una lista de verificación durante la auditoría" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
              <div className="media-badge"><b>48 h</b><small>para tu informe<br />preliminar</small></div>
            </div>
          </Reveal>
          <div className="split-copy">
            <Reveal><span className="eyebrow">¿Qué ofrecemos?</span></Reveal>
            <SplitLines className="h2" lines={['Auditoría externa', <><em>experta.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Auditorías externas para cumplir con las auditorías internas que exige el seguimiento de tu sistema, <strong>para cualquier norma</strong>, con aportes de valor para la mejora continua.</p>
            </Reveal>
            <div className="why-list">
              {[
                ['Cumplimiento normativo', 'Verificación exhaustiva de los requisitos de cualquier norma de sistema de gestión.'],
                ['Seguimiento del sistema', 'Detectamos desviaciones antes de que se conviertan en problemas.'],
                ['Valor añadido', 'Recomendaciones estratégicas, benchmarking y oportunidades de innovación.'],
              ].map(([t, p], i) => (
                <Reveal key={t} delay={0.1 + i * 0.08} className="why-item">
                  <b>0{i + 1}</b>
                  <div><h3>{t}</h3><p>{p}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section paper" id="tipos">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Modalidades" title={['Tipos de', <><em>auditoría.</em></>]} lead="Elegimos contigo el enfoque adecuado según tu objetivo: sistema completo, procesos críticos, producto o varios sistemas a la vez." />
          <AuditTypes />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Estándares internacionales" title={['Cualquier norma', <><em>solicitada.</em></>]} lead="Nuestros auditores cubren el amplio espectro de normas ISO y sectoriales." />
          <div className="cards">
            {NORMS.map(([code, name, desc, tag], i) => (
              <Reveal key={code} delay={(i % 4) * 0.06}>
                <div className="norm-card">
                  <div className="top"><b>{code === '+' ? '+' : `ISO ${code}`}</b><small>{tag}</small></div>
                  <strong>{name}</strong>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark grain">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead layout="split" eyebrow="Metodología" title={['Nuestro proceso', <>de <em>auditoría.</em></>]} />
          <Steps
            horizontal
            items={[
              { title: 'Planificación', text: 'Alcance, objetivos, criterios y logística de la auditoría.' },
              { title: 'Revisión documental', text: 'Análisis previo de documentación y registros del sistema.' },
              { title: 'Ejecución in situ', text: 'Entrevistas, observación directa e inspección de procesos.' },
              { title: 'Análisis e informe', text: 'Hallazgos, evidencias y recomendaciones priorizadas.' },
              { title: 'Seguimiento', text: 'Verificamos la implementación de las acciones correctivas.' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Diferencial INDUSECC" title={['Valor añadido', <>en cada <em>auditoría.</em></>]} />
          <div className="cards c3">
            {VALUE.map((v, i) => (
              <Reveal key={v.t} delay={(i % 3) * 0.08} className="card">
                <div className="card-ico"><Icon name={v.icon} /></div>
                <h3>{v.t}</h3>
                <p>{v.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap sticky-split">
          <div className="sticky">
            <Reveal><span className="eyebrow">Preguntas frecuentes</span></Reveal>
            <SplitLines className="h2" lines={['Resolvemos', <>tus <em>dudas.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ margin: '22px 0 30px' }}>¿Tienes un caso particular? Llena el cuestionario de diagnóstico y te enviamos una propuesta a la medida.</p>
              <Button href="/auditorias/formulario" variant="wine">Consulta personalizada</Button>
            </Reveal>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <CtaBand title={['Lleva tu sistema al', <>siguiente <em>nivel.</em></>]} lead="Responde el cuestionario de diagnóstico y recibe una propuesta de auditoría a la medida de tu organización." primary={{ href: '/auditorias/formulario', label: 'Llenar formulario' }} />
    </>
  );
}
