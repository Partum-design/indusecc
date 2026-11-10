import Image from 'next/image';
import type { Metadata } from 'next';
import { Counter } from '@/components/motion/Counter';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { CertProcess, CertSimulator, NormSelector } from '@/components/sections/CertTools';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHead } from '@/components/sections/SectionHead';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, pageMetadata, serviceLd } from '@/lib/seo';
import { wa } from '@/lib/site';

const TITLE = 'Certificación ISO 9001, 14001, 45001 y 27001 en México';
const DESC = 'Certificación ISO con organismo acreditado: análisis, implementación, capacitación, auditoría y certificado con validez internacional de 3 años. 100% de éxito al primer intento.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/certificacion-iso', image: photos.handshake });

const MODES = [
  { n: '01', k: 'La más completa', t: 'Servicio integral de certificación', p: 'Nos encargamos de todo: del diagnóstico inicial a la entrega del certificado. Ideal si empiezas desde cero o quieres delegar el proceso completo.', li: ['Diagnóstico y análisis de brechas', 'Implementación del sistema completo', 'Capacitación a todo el equipo', 'Auditoría interna y externa', 'Acompañamiento hasta el certificado'], cta: { label: 'Solicitar información', href: '/contacto' } },
  { n: '02', k: 'Sistema documental', t: 'Levantamiento de documentación', p: 'Para empresas con parte del sistema implementado que necesitan formalizar la documentación normativa completa, lista para auditoría.', li: ['Revisión del sistema existente', 'Creación de documentos faltantes', 'Alineación a requisitos normativos', 'Preparación para la certificación'], cta: { label: 'Solicitar información', href: '/contacto' } },
  { n: '03', k: 'Disponible para urgencias', t: 'Certificación express', p: 'Gestión total en tiempo reducido para licitaciones, contratos o requisitos de clientes con fecha límite, sin comprometer la calidad.', li: ['Equipo dedicado a tu caso', 'Proceso acelerado con máxima calidad', 'Coordinación prioritaria con el organismo', 'Seguimiento diario del avance'], cta: { label: 'Consultar disponibilidad', href: wa('Necesito certificación ISO urgente') } },
];

export default function CertificacionPage() {
  return (
    <>
      <JsonLd data={[serviceLd(TITLE, DESC, '/certificacion-iso'), breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: 'Certificación ISO', path: '/certificacion-iso' }])]} />
      <PageHero
        image={photos.handshake}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Certificación ISO' }]}
        eyebrow="Certificación internacional"
        title={['Certificación de', <><em>normas ISO.</em></>]}
        lead={<>Análisis, implementación, capacitación, auditoría y <strong>certificación</strong>. Te acompañamos desde el día uno hasta recibir tu sello reconocido globalmente.</>}
        actions={
          <>
            <Button href="#proceso">Ver el proceso</Button>
            <Button href="#simulador" variant="ghost" icon="chart">Simular mi certificación</Button>
          </>
        }
        chips={['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001']}
        facts={[
          { value: <Counter to={100} suffix="%" />, label: 'certificadas al primer intento' },
          { value: '3 años', label: 'de vigencia internacional' },
          { value: '48 h', label: 'tiempo de respuesta' },
        ]}
      />
      <Ticker />

      <section className="section paper" id="proceso">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Metodología probada" title={['El proceso de', <><em>certificación.</em></>]} lead="Selecciona cada etapa para conocer los detalles. Así de claro y transparente es nuestro proceso." />
          <Reveal><CertProcess /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Alternativas a tu medida" title={['3 modalidades de', <><em>certificación.</em></>]} lead="Elige el nivel de acompañamiento que necesitas según la madurez de tu sistema y tus tiempos." />
          <div className="cards c3 modal-cards">
            {MODES.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.08} className={`card ${i === 0 ? 'feature' : ''}`}>
                <span className="card-n" style={i === 0 ? { color: 'var(--gold-light)' } : undefined}>{m.n} · {m.k}</span>
                <h3>{m.t}</h3>
                <p>{m.p}</p>
                <ul>{m.li.map((l) => <li key={l}>{l}</li>)}</ul>
                <Button href={m.cta.href} variant={i === 0 ? 'gold' : 'line'} small magnetic={false}>{m.cta.label}</Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Normas que certificamos" title={['Normas ISO', <>más <em>solicitadas.</em></>]} lead="Selecciona una norma para ver de qué trata, a qué sectores aplica y cómo iniciar tu proceso." />
          <NormSelector />
        </div>
      </section>

      <section className="section" id="simulador">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Herramienta exclusiva" title={['Simula tu proceso de', <><em>certificación.</em></>]} lead="Elige tu norma, el tamaño de tu empresa y qué tan avanzado está tu sistema para ver una estimación de tiempos." />
          <Reveal><CertSimulator /></Reveal>
        </div>
      </section>

      <section className="section dark grain">
        <div className="wrap split" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-copy">
            <Reveal><span className="eyebrow">¿Por qué elegirnos?</span></Reveal>
            <SplitLines className="h2" lines={['Resultados que', <>hablan por <em>sí solos.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Historial de <strong>100% de certificaciones exitosas al primer intento</strong>, con más de 100 certificados entregados en múltiples industrias y normas ISO.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="stats" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="stat"><b><Counter to={100} suffix="+" /></b><strong>Empresas certificadas</strong></div>
                <div className="stat"><b><Counter to={7} /></b><strong>Normas ISO disponibles</strong></div>
                <div className="stat"><b><Counter to={10} suffix="+" /></b><strong>Años de experiencia</strong></div>
                <div className="stat"><b>48 h</b><strong>Respuesta inicial</strong></div>
              </div>
            </Reveal>
          </div>
          <Reveal y={40}>
            <div className="media tall">
              <Parallax amount={6}>
                <Image src={photos.kpiPresentation} alt="Presentación de resultados e indicadores del sistema de gestión" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
              <div className="media-badge" style={{ right: 18, maxWidth: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                <div className="stars">{Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" fill="currentColor" stroke="none" />)}</div>
                <small style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,.88)' }}>“En menos de 7 meses logramos el certificado ISO 9001 al primer intento. La transparencia y el seguimiento fueron clave.”</small>
                <small style={{ color: 'var(--gold-light)' }}>María R. · Directora de Calidad, manufactura CDMX</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title={['¿Tu empresa, lista para', <>certificarse en <em>ISO?</em></>]} lead="Agenda tu consulta gratuita: te decimos qué necesitas, cuánto tiempo toma y cómo empezar." primary={{ href: '/contacto', label: 'Solicitar consulta gratuita' }} />
    </>
  );
}
