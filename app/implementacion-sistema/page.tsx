import Image from 'next/image';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHead } from '@/components/sections/SectionHead';
import { Steps } from '@/components/sections/Steps';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, pageMetadata, serviceLd } from '@/lib/seo';

const TITLE = 'Implementación de sistemas de gestión ISO';
const DESC = 'Implementamos tu sistema de gestión ISO 9001, 14001, 45001, 27001 o 37001 desde cero en 8 pasos: diagnóstico, planificación, capacitación, documentación, operación y auditoría.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/implementacion-sistema', image: photos.smartFactory });

const STEPS = [
  { title: 'Difusión del proyecto', text: 'Comunicamos a toda la organización el inicio del proyecto ISO, sus objetivos, alcance y beneficios. Generamos el compromiso de la alta dirección y del equipo operativo.', tag: 'Comunicación interna' },
  { title: 'Análisis de situación actual', text: 'Diagnóstico exhaustivo frente a los requisitos de la norma: identificamos brechas, fortalezas y áreas de mejora prioritarias con evidencia objetiva.', tag: 'Diagnóstico GAP' },
  { title: 'Planificación', text: 'Plan maestro con cronograma, responsables, recursos e hitos de control. Definimos objetivos medibles y los KPIs del sistema.', tag: 'Plan de trabajo' },
  { title: 'Capacitación', text: 'Formamos a los colaboradores en los fundamentos de la norma y en las responsabilidades de cada puesto. La competencia del equipo es la base del éxito.', tag: 'Training ISO' },
  { title: 'Documentación', text: 'Políticas, procedimientos, instrucciones de trabajo, formatos y registros, cada uno alineado a la cláusula correspondiente.', tag: 'Sistema documental' },
  { title: 'Implementación en campo', text: 'Ponemos el sistema en marcha en el día a día y acompañamos en campo para que controles y registros se apliquen correctamente.', tag: 'Operación' },
  { title: 'Auditoría del sistema', text: 'Auditoría interna con la misma rigurosidad de un organismo certificador: evaluamos cada requisito y detectamos no conformidades.', tag: 'Auditoría interna' },
  { title: 'Corrección y revisión', text: 'Cerramos no conformidades, verificamos la eficacia de las acciones y realizamos la revisión por la dirección. Listo para certificar.', tag: '¡Listo para certificar!' },
];

const NORMS = [
  ['ISO 9001', '2015', 'Gestión de la calidad', 'Satisfacción del cliente y mejora continua de procesos.'],
  ['ISO 14001', '2015', 'Gestión ambiental', 'Identifica, controla y mejora el impacto ambiental.'],
  ['ISO 45001', '2018', 'Seguridad y salud', 'Previene lesiones y enfermedades laborales.'],
  ['ISO 27001', '2022', 'Seguridad de la información', 'Protege datos críticos del negocio y de clientes.'],
  ['ISO 50001', '2018', 'Gestión de la energía', 'Mejora el desempeño energético y reduce costos.'],
  ['ISO 22000', '2018', 'Inocuidad alimentaria', 'Seguridad de los alimentos en toda la cadena.'],
  ['ISO 37001', '2025', 'Sistemas antisoborno', 'Previene, detecta y gestiona riesgos de soborno.'],
  ['ISO 39001', '2012', 'Seguridad vial', 'Reduce accidentes de tráfico en el entorno laboral.'],
  ['ISO 28001', '2007', 'Cadena de suministro', 'Protege mercancías y el comercio internacional.'],
];

const BENEFITS: { icon: IconName; t: string; p: string }[] = [
  { icon: 'layers', t: 'Procesos estandarizados', p: 'Operaciones documentadas, consistentes y replicables en toda la organización.' },
  { icon: 'heart', t: 'Clientes más satisfechos', p: 'Entregas consistentes que superan expectativas y construyen lealtad.' },
  { icon: 'chart', t: 'Reducción de costos', p: 'Menos errores, reprocesos y desperdicios; más eficiencia operativa.' },
  { icon: 'target', t: 'Ventaja competitiva', p: 'Acceso a licitaciones, contratos y mercados que exigen certificación.' },
  { icon: 'users', t: 'Equipo más competente', p: 'Personal formado y comprometido con los objetivos de la organización.' },
  { icon: 'award', t: 'Confianza y reputación', p: 'Un sello reconocido mundialmente que proyecta profesionalismo.' },
];

export default function ImplementacionPage() {
  return (
    <>
      <JsonLd data={[serviceLd(TITLE, DESC, '/implementacion-sistema'), breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: 'Implementación', path: '/implementacion-sistema' }])]} />
      <PageHero
        image={photos.smartFactory}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Implementación' }]}
        eyebrow="Implementación ISO"
        title={['Tu sistema de gestión,', <><em>listo para certificar.</em></>]}
        lead={<>Diseñamos e implementamos tu sistema desde cero, con controles, mejoras y documentación que cumplen los <strong>más altos estándares internacionales</strong>.</>}
        actions={
          <>
            <Button href="#pasos">Ver los 8 pasos</Button>
            <Button href="/contacto" variant="ghost" icon="calendar">Solicitar consulta</Button>
          </>
        }
        chips={['ISO 9001:2015', 'ISO 14001', 'ISO 45001']}
        facts={[
          { value: '8', label: 'pasos de una metodología probada' },
          { value: <Counter to={100} suffix="%" />, label: 'tasa de certificación' },
          { value: <Counter to={100} suffix="+" />, label: 'empresas certificadas' },
        ]}
      />
      <Ticker />

      <section className="section">
        <div className="wrap split">
          <div className="split-copy">
            <Reveal><span className="eyebrow">¿Qué es?</span></Reveal>
            <SplitLines className="h2" lines={['Implementar un', <><em>sistema de gestión</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Es el planteamiento, la creación de controles, mejoras y documentos sobre requisitos normativos que influyen positivamente en la <strong>satisfacción del cliente</strong>.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead">Marca la diferencia en la competitividad: transforma procesos informales en sistemas robustos, medibles y auditables internacionalmente.</p>
            </Reveal>
            <div className="why-list">
              {[
                ['Documentación completa', 'Políticas, procedimientos e instrucciones alineados a la norma.'],
                ['Capacitación del equipo', 'Formación a todo el personal involucrado en el sistema.'],
                ['Mejora continua', 'Indicadores y controles para mantener el sistema vivo.'],
              ].map(([t, p], i) => (
                <Reveal key={t} delay={0.1 + i * 0.08} className="why-item">
                  <b>0{i + 1}</b>
                  <div><h3>{t}</h3><p>{p}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal y={40}>
            <div className="media tall">
              <Parallax amount={7}>
                <Image src={photos.engineerDocs} alt="Ingeniero revisando la documentación del sistema junto a la maquinaria" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
              <div className="media-badge"><b>ISO</b><small>9001 · 14001 · 45001<br />implementadas en campo</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section paper" id="pasos">
        <div className="wrap sticky-split">
          <div className="sticky">
            <Reveal><span className="eyebrow">Metodología probada</span></Reveal>
            <SplitLines className="h2" lines={['8 pasos hacia tu', <><em>certificación ISO.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 22 }}>Cada etapa tiene entregables concretos. Sabrás en todo momento en qué punto está tu proyecto y qué sigue.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="actions" style={{ marginTop: 30 }}>
                <Button href="/contacto" variant="wine">Empezar mi proyecto</Button>
              </div>
            </Reveal>
          </div>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Normas que implementamos" title={['Estándares', <><em>internacionales.</em></>]} lead="Implementamos sistemas individuales o integrados bajo la estructura de alto nivel común a todas las normas ISO." />
          <div className="cards">
            {NORMS.map(([code, year, name, desc], i) => (
              <Reveal key={code} delay={(i % 3) * 0.06}>
                <div className="norm-card">
                  <div className="top"><b>{code}</b><small>{year}</small></div>
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
          <SectionHead layout="split" eyebrow="¿Por qué implementar?" title={['Beneficios que', <>transforman tu <em>empresa.</em></>]} lead="Implementar un sistema ISO no es obtener un papel: es instalar una cultura de excelencia que impacta directamente en resultados." />
          <div className="cards c3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={(i % 3) * 0.08} className="card">
                <div className="card-ico"><Icon name={b.icon} /></div>
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="big-quote" style={{ marginTop: 'clamp(56px, 8vw, 110px)' }}>“La implementación no es un gasto, es <em>la inversión más rentable</em> que puede hacer una empresa.”</p>
          </Reveal>
        </div>
      </section>

      <CtaBand title={['¿Listo para implementar', <>tu sistema <em>ISO?</em></>]} lead="Agenda una consulta gratuita y sin compromiso: te explicamos el proceso completo adaptado a tu empresa." primary={{ href: '/contacto', label: 'Solicitar consulta gratuita' }} />
    </>
  );
}
