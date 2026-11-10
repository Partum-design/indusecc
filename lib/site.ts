export const SITE = {
  name: 'INDUSECC',
  legalName: 'INDUSECC Soluciones ISO',
  url: 'https://www.indusecc.com.mx',
  tagline: 'Soluciones ISO para la mejora continua',
  description:
    'Consultoría, implementación, auditoría y certificación de normas ISO en México. Más de 10 años ayudando a empresas a certificarse en ISO 9001, 14001, 45001, 27001 y 37001.',
  foundingYear: 2014,
  locale: 'es_MX',
  phone: { display: '55 4015 2551', tel: '+525540152551' },
  phone2: { display: '56 1604 4547', tel: '+525616044547' },
  email: 'danna@indusecc.com.mx',
  email2: 'erick@indusecc.com.mx',
  whatsapp: 'https://wa.me/525540152551',
  hours: 'Lun – Vie · 9:00 – 18:00 h',
  city: 'Ciudad de México',
  brochure: 'https://indusecc.store/wp-content/uploads/2026/02/BROCHURE-CORPORATIVO-INDUSECC-2025.pdf',
  social: {
    instagram: 'https://www.instagram.com/indusecc/',
    facebook: 'https://www.facebook.com/share/18KwAC6TrD/',
  },
} as const;

export const wa = (text?: string) => (text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp);

export type NavItem = { href: string; label: string; desc?: string };

export const SERVICES: (NavItem & { n: string; short: string })[] = [
  { n: '01', href: '/implementacion-sistema', label: 'Implementación de sistema', short: 'Implementación', desc: 'Diseñamos procesos y documentación de tu sistema de gestión bajo la norma aplicable.' },
  { n: '02', href: '/certificacion-iso', label: 'Certificación ISO', short: 'Certificación', desc: 'ISO 9001, 14001, 45001 y más: del diagnóstico al certificado con organismo acreditado.' },
  { n: '03', href: '/consultoria-asesoria', label: 'Consultoría y asesoría', short: 'Consultoría', desc: 'Acompañamiento experto por hora, semana, mes o año en normatividad ISO.' },
  { n: '04', href: '/auditorias', label: 'Auditorías', short: 'Auditorías', desc: 'Auditorías internas y de segunda parte que revelan el estado real de tu sistema.' },
  { n: '05', href: '/anticorrupcion-iso-37001', label: 'Anticorrupción ISO 37001', short: 'ISO 37001', desc: 'Transición a ISO 37001:2025 y sistemas antisoborno que resisten auditoría.' },
];

export const NAV: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/curso-interno', label: 'Cursos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export const NORMS_TICKER = [
  'ISO 9001 · Calidad',
  'ISO 14001 · Ambiental',
  'ISO 45001 · Seguridad y salud',
  'ISO 27001 · Seguridad de la información',
  'ISO 37001 · Antisoborno',
  'ISO 50001 · Energía',
  'Auditoría interna',
  'Mejora continua',
];
