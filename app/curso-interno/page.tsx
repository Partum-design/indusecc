import type { Metadata } from 'next';
import { CourseLanding, type CourseConfig } from '@/components/sections/CourseLanding';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Curso Auditor Interno ISO 9001:2015 con DC-3 en CDMX',
  description: 'Curso presencial de Auditor Interno ISO 9001:2015 en CDMX: 9 módulos prácticos, plantillas, diploma y constancia DC-3. Inscripción y pago en línea con Mercado Pago.',
  path: '/curso-interno',
  image: photos.cursoDestacado,
});

const COURSE: CourseConfig = {
  path: '/curso-interno',
  mode: 'presencial',
  dateLabel: '24 y 25 de julio',
  dateText: 'Dos jornadas intensivas con ritmo práctico y estructura orientada a la aplicación.',
  schedule: ['Viernes: 9:00 a 18:00 h', 'Sábado: 9:00 a 14:00 h'],
  startDate: '2026-07-24',
  endDate: '2026-07-25',
  place: {
    title: 'Centro de Negocios Reforma',
    text: 'Av. Paseo de la Reforma 250, piso 12, Juárez, Cuauhtémoc, C.P. 06600, Ciudad de México.',
    bullets: ['Transporte público cercano', 'Estacionamiento en sitio'],
  },
  price: 3500,
  priceNote: 'IVA incluido. Facturación disponible. Código promocional al inscribirte.',
  priceBullets: ['Material y coffee break', 'Diploma y formato DC-3', 'Pago en línea con confirmación inmediata'],
};

export default function CursoInternoPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Curso Auditor Interno', path: '/curso-interno' }])} />
      <CourseLanding c={COURSE} />
    </>
  );
}
