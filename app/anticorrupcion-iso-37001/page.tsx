import type { Metadata } from 'next';
import data from '@/content/iso-37001.json';
import { ArticleView } from '@/components/sections/ArticleView';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, faqLd, pageMetadata, serviceLd } from '@/lib/seo';

const TITLE = 'ISO 37001:2025 en México: transición, cambios y plazos';
const DESC = 'Todo sobre ISO 37001:2025: calendario de transición IAF, diferencias con la versión 2016, impacto legal en México (LGRA) y plan de acción para certificarte antes de 2027.';

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/anticorrupcion-iso-37001', image: photos.contractGlass });

const FAQ = [
  { q: '¿ISO 37001:2025 es obligatoria en México?', a: 'No. Sigue siendo una norma voluntaria. Existe un calendario de transición para la certificación acreditada y la LGRA valora políticas de integridad robustas.' },
  { q: '¿Qué pasa si mi certificado 2016 sigue vigente después de febrero de 2027?', a: 'Deja de ser válido como certificado acreditado. La transición a ISO 37001:2025 debe completarse antes de esa fecha.' },
  { q: '¿Puedo combinar la transición con mi auditoría de vigilancia o recertificación?', a: 'Sí. IAF MD 30:2025 permite integrar la transición en auditorías programadas, lo que suele reducir el sobrecosto.' },
  { q: '¿Qué es lo más difícil de migrar de 2016 a 2025?', a: 'La evidencia de cultura antisoborno, la gestión formal de conflictos de interés y la robustez del programa de auditoría interna y revisión por la dirección.' },
];

export default function Iso37001Page() {
  return (
    <>
      <JsonLd data={[serviceLd('Transición e implementación ISO 37001:2025', DESC, '/anticorrupcion-iso-37001'), faqLd(FAQ), breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Servicios', path: '/servicios' }, { name: 'ISO 37001', path: '/anticorrupcion-iso-37001' }])]} />
      <ArticleView
        image={photos.contractGlass.src}
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/servicios' }, { label: 'ISO 37001' }]}
        eyebrow={data.meta}
        heroLines={data.heroLines}
        lead={data.lead}
        tags={data.tags}
        body={data.body}
        aside={data.aside}
      >
        <CtaBand title={['Agenda tu diagnóstico', <>de <em>transición.</em></>]} lead="Revisamos tu sistema contra la matriz 2016 vs 2025 y te damos un plan con tiempos y costos para llegar a tiempo a tu auditoría." primary={{ href: '/contacto', label: 'Agendar diagnóstico' }} waText="Hola INDUSECC, quiero información sobre la transición a ISO 37001:2025." />
      </ArticleView>
    </>
  );
}
