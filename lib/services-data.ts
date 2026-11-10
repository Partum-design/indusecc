export type ServiceDetail = {
  id: string;
  category: 'iso' | 'capacitacion' | 'seguridad' | 'consultoria';
  kicker: string;
  title: string;
  summary: string;
  tags: string[];
  body: string[];
  bullets: string[];
  sideTitle: string;
  side: string[];
  cta: { label: string; href: string };
};

const waLink = (t: string) => `https://wa.me/525540152551?text=${encodeURIComponent(t)}`;

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: 'sistemas', category: 'iso', kicker: 'ISO 9001 · ISO 14001 · ISO 45001', title: 'Sistemas de gestión',
    summary: 'Diseño, implementación y mantenimiento de sistemas de gestión de calidad, ambiental y de seguridad ocupacional bajo normas ISO vigentes.',
    tags: ['Calidad', 'Ambiente', 'Seguridad'],
    body: [
      'Implementamos sistemas de gestión basados en las normas ISO más relevantes para tu industria, con metodología rigurosa y acompañamiento personalizado para que el sistema se integre a la cultura y operación de tu empresa.',
      'Trabajamos con enfoque por procesos y pensamiento basado en riesgos, asegurando la sostenibilidad del sistema y su capacidad de adaptarse al cambio.',
    ],
    bullets: ['Diagnóstico inicial y análisis de brechas (gap analysis)', 'Diseño y documentación del sistema de gestión', 'Capacitación del equipo interno en las normas aplicables', 'Implementación por fases con seguimiento continuo', 'Revisión por la dirección y mejora continua', 'Preparación para la auditoría de certificación'],
    sideTitle: 'Normas que abarcamos',
    side: ['ISO 9001:2015 · Calidad', 'ISO 14001:2015 · Ambiental', 'ISO 45001:2018 · Seguridad y salud', 'ISO 27001 · Seguridad de la información', 'ISO 50001 · Energía'],
    cta: { label: 'Ver implementación', href: '/implementacion-sistema' },
  },
  {
    id: 'certificacion', category: 'iso', kicker: 'Certificación · Auditoría · Seguimiento', title: 'Certificación ISO',
    summary: 'Preparación y acompañamiento integral para obtener la certificación ante organismos acreditados, del diagnóstico al certificado en mano.',
    tags: ['9001:2015', '14001:2015', '45001:2018'],
    body: ['Te acompañamos en cada etapa: desde la preparación documental hasta la auditoría de certificación con el organismo acreditado. Nuestro equipo tiene experiencia probada en certificar a la primera.'],
    bullets: ['Selección del organismo certificador adecuado', 'Preparación y revisión del expediente documental', 'Auditoría interna previa como simulacro', 'Atención de no conformidades detectadas', 'Acompañamiento durante la auditoría externa', 'Plan de mantenimiento y renovación del certificado'],
    sideTitle: 'Etapas del proceso',
    side: ['Diagnóstico y gap analysis', 'Implementación del sistema', 'Auditoría interna (simulacro)', 'Revisión por la dirección', 'Auditoría de certificación', 'Mantenimiento del certificado'],
    cta: { label: 'Ver certificación', href: '/certificacion-iso' },
  },
  {
    id: 'consultoria', category: 'consultoria', kicker: 'Diagnóstico · Estrategia · Implementación', title: 'Consultoría especializada',
    summary: 'Asesoría experta para identificar áreas de mejora, diseñar estrategias normativas y acompañar cambios orientados a la excelencia.',
    tags: ['Procesos', 'Normativa', 'Estrategia'],
    body: ['Analizamos a fondo la situación de tu organización para diseñar estrategias normativas y de mejora continua adaptadas a tu sector, tamaño y objetivos.'],
    bullets: ['Diagnóstico organizacional integral (procesos, personas, tecnología)', 'Mapeo de procesos y análisis de riesgos y oportunidades', 'Diseño de indicadores y tableros de desempeño (KPIs)', 'Plan de acción y hoja de ruta normativa personalizada', 'Acompañamiento durante la implementación de cambios', 'Due diligence normativo en fusiones y adquisiciones'],
    sideTitle: 'Sectores que atendemos',
    side: ['Manufactura e industria', 'Construcción e ingeniería', 'Servicios y comercio', 'Gobierno y sector público', 'Tecnología y TI', 'Salud y farmacéutica'],
    cta: { label: 'Ver consultoría', href: '/consultoria-asesoria' },
  },
  {
    id: 'auditorias', category: 'consultoria', kicker: 'Interna · Externa · Segunda parte', title: 'Auditorías',
    summary: 'Auditorías internas y de segunda parte para evaluar la conformidad de tu sistema e identificar no conformidades y oportunidades de mejora.',
    tags: ['Interna', 'Segunda parte', 'Diagnóstico'],
    body: ['Auditores certificados realizan evaluaciones objetivas e independientes de tus sistemas, procesos y controles, con hallazgos claros y planes de acción concretos.'],
    bullets: ['Auditorías internas de primera parte', 'Auditorías de segunda parte a proveedores', 'Auditorías de diagnóstico previas a la certificación', 'Auditorías de seguimiento y mantenimiento', 'Reportes detallados con hallazgos y oportunidades', 'Seguimiento de acciones correctivas'],
    sideTitle: 'Tipos de auditoría',
    side: ['Auditoría interna ISO 9001', 'Auditoría interna ISO 14001', 'Auditoría interna ISO 45001', 'Auditoría a proveedores', 'Auditoría combinada (sistemas integrados)'],
    cta: { label: 'Ver auditorías', href: '/auditorias' },
  },
  {
    id: 'capacitacion', category: 'capacitacion', kicker: 'In-company · Online · Certificada', title: 'Capacitación empresarial',
    summary: 'Programas presenciales y en línea para equipos operativos, mandos medios y alta dirección en normas ISO, liderazgo y mejora continua.',
    tags: ['In-company', 'E-learning', 'Diplomados'],
    body: ['Desarrollamos el talento de tu organización con programas a la medida. Combinamos teoría y práctica con metodologías activas para un aprendizaje aplicado y medible.'],
    bullets: ['Cursos y talleres de normas ISO (9001, 14001, 45001)', 'Formación de auditores internos', 'Liderazgo, trabajo en equipo y mejora continua', 'Diplomados en sistemas integrados de gestión', 'Capacitación en línea', 'Talleres de 5S, Lean y Kaizen'],
    sideTitle: 'Modalidades',
    side: ['In-house (en tu empresa)', 'Abierto (calendario público)', 'Online en vivo (Zoom / Teams / Meet)', 'E-learning asíncrono', 'Blended (combinado)'],
    cta: { label: 'Ver curso de Auditor Interno', href: '/curso-interno' },
  },
  {
    id: 'seguridad', category: 'seguridad', kicker: 'NOM · IMSS · STPS · ISO 45001', title: 'Seguridad e higiene industrial',
    summary: 'Diagnóstico y cumplimiento de seguridad e higiene conforme a las NOM de la STPS, el IMSS e ISO 45001 para entornos de trabajo seguros.',
    tags: ['STPS', 'IMSS', 'ISO 45001'],
    body: ['Ayudamos a cumplir la normatividad de seguridad e higiene de la STPS y el IMSS, reduciendo riesgos laborales y creando entornos de trabajo seguros y saludables.'],
    bullets: ['Diagnóstico NOM-STPS y plan de cumplimiento', 'Elaboración y actualización del programa de seguridad', 'Integración y capacitación de comisiones de seguridad e higiene', 'Identificación y evaluación de riesgos laborales', 'Atención a visitas de inspección STPS e IMSS', 'Implementación ISO 45001:2018'],
    sideTitle: 'Normas que aplicamos',
    side: ['ISO 45001:2018 · SST', 'NOM-030-STPS · Servicios preventivos', 'NOM-019-STPS · Comisiones de seguridad', 'NOM-035-STPS · Factores psicosociales', 'IMSS · Programa SIPA'],
    cta: { label: 'Solicitar diagnóstico', href: waLink('Hola, necesito apoyo en seguridad e higiene industrial.') },
  },
];

export const SERVICE_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'iso', label: 'Normas ISO' },
  { id: 'consultoria', label: 'Consultoría' },
  { id: 'capacitacion', label: 'Capacitación' },
  { id: 'seguridad', label: 'Seguridad' },
] as const;
