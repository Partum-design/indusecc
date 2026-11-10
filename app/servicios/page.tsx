import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { SelfDiagnosis } from '@/components/forms/SelfDiagnosis';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHead } from '@/components/sections/SectionHead';
import { ServiceExplorer } from '@/components/sections/ServiceExplorer';
import { Ticker } from '@/components/sections/Ticker';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { SERVICE_DETAILS } from '@/lib/services-data';
import { abs, breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Servicios ISO: implementación, certificación, auditoría y capacitación',
  description:
    'Portafolio de servicios ISO de INDUSECC: sistemas de gestión, certificación ISO 9001/14001/45001, consultoría, auditorías, capacitación y seguridad e higiene. Autodiagnóstico gratuito.',
  path: '/servicios',
  image: photos.executiveDocs,
});

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'Servicios de INDUSECC',
            url: abs('/servicios'),
            itemListElement: SERVICE_DETAILS.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.summary, provider: { '@id': `${SITE.url}/#organization` } } })),
          },
        ]}
      />
      <PageHero
        image={photos.executiveDocs}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios' }]}
        eyebrow="Portafolio integral"
        title={['Servicios que', <>llevan al <em>sello ISO.</em></>]}
        lead="Sistemas de gestión, certificación, consultoría, auditoría y capacitación empresarial. Te acompañamos en el camino hacia la mejora continua."
        actions={
          <>
            <Button href="#autodiagnostico">Iniciar autodiagnóstico</Button>
            <Button href="/contacto" variant="ghost" icon="phone">Hablar con un experto</Button>
          </>
        }
        chips={['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 37001']}
        facts={[
          { value: '48 h', label: 'tiempo de respuesta' },
          { value: '6', label: 'servicios del diagnóstico a la certificación' },
          { value: '7+', label: 'normas ISO que dominamos' },
        ]}
      />
      <Ticker />

      <section className="section paper" id="portafolio">
        <div className="wrap">
          <SectionHead
            layout="split"
            eyebrow="Portafolio completo"
            title={['Todo lo que tu empresa', <>necesita para <em>crecer.</em></>]}
            lead="Soluciones integrales adaptadas a cada organización, desde la implementación inicial hasta la certificación y el seguimiento continuo."
          />
          <ServiceExplorer />
        </div>
      </section>

      <section className="section dark grain" id="autodiagnostico">
        <div className="wrap diag" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <Reveal><span className="eyebrow">Herramienta gratuita</span></Reveal>
            <SplitLines className="h2" lines={['Autodiagnóstico', <><em>empresarial.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 22 }}>Responde 6 preguntas sobre tu empresa y recibe una recomendación personalizada directamente en WhatsApp. <strong>Sin costo y sin compromiso.</strong></p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="check-list on-dark" style={{ color: 'rgba(255,255,255,.8)' }}>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>Menos de 2 minutos</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>Recomendación según tu sector y madurez</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>Tus respuestas no se guardan en ningún servidor</li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SelfDiagnosis />
          </Reveal>
        </div>
      </section>

      <CtaBand title={['¿Prefieres', <>hablarlo con <em>una persona?</em></>]} lead="Cuéntanos tu caso y en menos de 48 horas te enviamos una propuesta clara, con alcance, tiempos y costos." waText="Hola INDUSECC, quiero una cotización." />
    </>
  );
}
