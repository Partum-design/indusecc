import type { Metadata } from 'next';
import { CourseLanding, type CourseConfig } from '@/components/sections/CourseLanding';
import { photos } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Curso Auditor Interno ISO 9001:2015 online · agosto 2026',
  description: 'Curso online en vivo de Auditor Interno ISO 9001:2015 por Google Meet: 9 módulos prácticos, diploma y constancia DC-3. Pago en línea con Mercado Pago.',
  path: '/curso-interno-agosto-2026',
  image: photos.cursoDestacado,
});

const COURSE: CourseConfig = {
  path: '/curso-interno-agosto-2026',
  mode: 'online',
  dateLabel: '15 y 16 de agosto',
  dateText: 'Dos jornadas online con ritmo práctico y estructura orientada a la aplicación.',
  schedule: ['Viernes 15: 10:30 a 18:30 h', 'Sábado 16: 10:30 a 18:30 h'],
  startDate: '2026-08-15',
  endDate: '2026-08-16',
  place: {
    title: 'Google Meet',
    text: 'Sesiones en vivo con enlace privado para cada participante.',
    bullets: ['Modalidad online en vivo', 'Acceso por enlace privado'],
  },
  price: 3000,
  priceNote: 'IVA incluido. Facturación disponible. Cupo limitado.',
  priceBullets: ['Material y acompañamiento en línea', 'Diploma y formato DC-3', 'Pago en línea con confirmación inmediata'],
};

export default function CursoAgostoPage() {
  return <CourseLanding c={COURSE} />;
}
