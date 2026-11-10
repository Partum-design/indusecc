import type { Metadata } from 'next';
import { AuditForm } from '@/components/forms/AuditForm';
import { Reveal } from '@/components/motion/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { ContactList } from '@/components/sections/CtaBand';
import { photos } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Cuestionario de diagnóstico de auditoría',
  description: 'Responde el cuestionario de diagnóstico y recibe una propuesta de auditoría ISO a la medida de tu organización en menos de 48 horas.',
  path: '/auditorias/formulario',
  image: photos.whiteboardPlan,
});

export default function AuditFormPage() {
  return (
    <>
      <PageHero
        compact
        image={photos.whiteboardPlan}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Auditorías', href: '/auditorias' }, { label: 'Diagnóstico' }]}
        eyebrow="Cuestionario de diagnóstico"
        title={['Cuéntanos sobre', <>tu <em>auditoría.</em></>]}
        lead="Cinco bloques breves. Al enviar, generamos un PDF con tus respuestas para que también tengas tu copia."
      />
      <section className="section paper">
        <div className="wrap sticky-split" style={{ gridTemplateColumns: undefined }}>
          <div className="sticky">
            <Reveal>
              <span className="eyebrow">Cómo funciona</span>
              <ol className="check-list" style={{ listStyle: 'none' }}>
                <li><b className="gold">01</b>Responde el cuestionario (5–7 minutos).</li>
                <li><b className="gold">02</b>Recibimos tus respuestas en PDF de forma confidencial.</li>
                <li><b className="gold">03</b>En menos de 48 horas te enviamos una propuesta a la medida.</li>
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel-dark" style={{ marginTop: 28 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>¿Prefieres hablar?</p>
                <ContactList />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <AuditForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
