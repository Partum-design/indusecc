import Image from 'next/image';
import type { Metadata } from 'next';
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

const TITLE = 'Consultoría y asesoría en normatividad ISO';
const DESC = 'Asesoría ISO personalizada por hora, semanal, mensual o anual. Acompañamiento experto para implementar, mantener y mejorar tu sistema de gestión conforme a la norma que necesites.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/consultoria-asesoria', image: photos.boardroomCharts });

const MODES: { icon: IconName; k: string; t: string; p: string }[] = [
  { icon: 'clock', k: 'Por hora', t: 'Asesoría por hora', p: 'Resuelve dudas puntuales y obtén orientación inmediata en normativas y certificaciones, sin compromisos de largo plazo.' },
  { icon: 'calendar', k: 'Semanal', t: 'Asesoría semanal', p: 'Seguimiento continuo para avanzar en la implementación de tu sistema, con sesiones estructuradas semana a semana.' },
  { icon: 'chart', k: 'Mensual', t: 'Asesoría mensual', p: 'Soporte estratégico para optimizar procesos y asegurar el cumplimiento, con revisión periódica del avance.' },
  { icon: 'award', k: 'Anual', t: 'Asesoría anual', p: 'Acompañamiento integral para mantener estándares y mejora continua. La opción más completa.' },
];

export default function ConsultoriaPage() {
  return (
    <>
      <JsonLd data={[serviceLd(TITLE, DESC, '/consultoria-asesoria'), breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: 'Consultoría y asesoría', path: '/consultoria-asesoria' }])]} />
      <PageHero
        image={photos.boardroomCharts}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'Consultoría y asesoría' }]}
        eyebrow="Servicios especializados"
        title={['Consultoría y', <>asesoría <em>ISO.</em></>]}
        lead={<>Acompañamiento y guía en la implementación de medidas para mejorar resultados, <strong>de acuerdo con la normatividad que necesites</strong>.</>}
        actions={
          <>
            <Button href="/contacto">Solicitar asesoría</Button>
            <Button href="#modalidades" variant="ghost" icon="layers">Ver modalidades</Button>
          </>
        }
        facts={[
          { value: '1 a 1', label: 'asesoría personalizada' },
          { value: '4', label: 'modalidades: hora, semana, mes o año' },
          { value: '0 $', label: 'evaluación inicial sin costo' },
        ]}
      />
      <Ticker />

      <section className="section">
        <div className="wrap split">
          <div className="split-copy">
            <Reveal><span className="eyebrow">Nuestro enfoque</span></Reveal>
            <SplitLines className="h2" lines={['Guía experta para tu', <><em>cumplimiento normativo.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead">Del diagnóstico inicial a la implementación completa, ofrecemos asesoría conforme al <strong>enfoque que tu empresa necesita</strong>, adaptada a su realidad y ritmo.</p>
            </Reveal>
            <div className="why-list">
              {[
                ['Enfoque personalizado', 'Adaptamos la asesoría a la normatividad y a los objetivos de tu organización.'],
                ['Flexibilidad de horario', 'Por hora, semana, mes o año, según la etapa de tu proyecto.'],
                ['Mejora continua', 'Te acompañamos desde la implementación hasta el mantenimiento.'],
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
                <Image src={photos.advisor} alt="Consultora de INDUSECC explicando un plan de acción a sus clientes" fill sizes="(min-width: 960px) 50vw, 100vw" placeholder="blur" />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark grain" id="modalidades">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead layout="split" eyebrow="Puede realizarse mediante" title={['Elige la modalidad', <>que mejor <em>te funcione.</em></>]} lead="Cambia de modalidad cuando tu proyecto lo requiera. Sin contratos rígidos." />
          <div className="cards">
            {MODES.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.08} className={`card ${i === 3 ? 'feature' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="card-ico"><Icon name={m.icon} /></div>
                <span className="card-n" style={{ color: 'var(--gold)' }}>0{i + 1} · {m.k}</span>
                <h3>{m.t}</h3>
                <p>{m.p}</p>
                <div style={{ marginTop: 'auto', paddingTop: 22 }}>
                  <Button href="/contacto" variant={i === 3 ? 'gold' : 'ghost'} small magnetic={false}>Solicitar</Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <SectionHead layout="split" eyebrow="Cómo trabajamos" title={['Nuestro proceso de', <><em>asesoría.</em></>]} lead="Cuatro etapas claras para que cada sesión se traduzca en avances concretos." />
          <Steps
            horizontal
            items={[
              { title: 'Diagnóstico', text: 'Analizamos tu situación actual e identificamos brechas respecto a la norma objetivo.' },
              { title: 'Plan de acción', text: 'Diseñamos un plan y cronograma adaptados a tu modalidad de asesoría.' },
              { title: 'Acompañamiento', text: 'Guiamos a tu equipo en cada etapa con sesiones presenciales o virtuales.' },
              { title: 'Seguimiento', text: 'Evaluamos resultados, ajustamos y aseguramos la mejora continua.' },
            ]}
          />
        </div>
      </section>

      <CtaBand image={photos.teamNight} title={['¿Listo para elevar', <>tus <em>estándares?</em></>]} lead="Recibe una evaluación sin costo y te orientamos hacia la modalidad de asesoría que mejor se adapte a tu empresa." primary={{ href: '/contacto', label: 'Solicitar diagnóstico' }} />
    </>
  );
}
