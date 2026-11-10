import nodemailer from 'nodemailer';
import { cleanText, clientIp, escapeHtml, json, rateLimit, sameOrigin } from '@/lib/security';

export const runtime = 'nodejs';

const MAX_PDF = 5 * 1024 * 1024;
const RECIPIENTS = ['danna@indusecc.com.mx', 'maricruz@partumdesign.com.mx'];

const LABELS: Record<string, string> = {
  objetivo: 'Objetivo principal',
  objetivo_detalle: 'Detalle del objetivo',
  areas: 'Areas a auditar',
  areas_otro: 'Otra area',
  periodo_inicio: 'Periodo inicio',
  periodo_fin: 'Periodo fin',
  normas: 'Normas / regulaciones',
  normas_otro: 'Otra norma',
  empleados: 'Numero de empleados',
  sedes: 'Sedes / sucursales',
  sedes_detalle: 'Detalle de sedes',
  modalidad: 'Modalidad de auditoria',
  nuevos_sistemas: 'Nuevos sistemas implementados',
  nuevos_sistemas_detalle: 'Detalle de nuevos sistemas',
  manuales: 'Manuales / procedimientos',
  auditorias_previas: 'Auditorias previas',
  auditorias_previas_detalle: 'Detalle de auditorias previas',
  cambios_personal: 'Cambios en personal clave',
  cambios_personal_detalle: 'Detalle de cambios de personal',
  riesgos: 'Riesgos identificados',
  riesgos_detalle: 'Detalle de riesgos',
  fecha_inicio_auditoria: 'Inicio deseado de auditoria',
  fecha_fin_auditoria: 'Fin deseado de auditoria',
  fecha_informe: 'Fecha requerida del informe',
  fecha_informe_obs: 'Observaciones del informe',
  entregables: 'Entregables requeridos',
  empresa_nombre: 'Empresa / razon social',
  empresa_giro: 'Giro, industria o RFC',
  contacto_nombre: 'Nombre de contacto',
  contacto_puesto: 'Puesto del contacto',
  contacto_email: 'Correo del contacto',
  contacto_telefono: 'Telefono del contacto',
  disponibilidad: 'Disponibilidad del personal',
  disponibilidad_detalle: 'Detalle de disponibilidad',
};

function createTransporter() {
  const host = (process.env.SMTP_HOST || '').trim();
  const port = Number((process.env.SMTP_PORT || '465').trim());
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  if (!host || !user || !pass) throw new Error('Missing SMTP configuration');
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Origen no permitido.' }, 403);
  if (!rateLimit(`aud:${clientIp(req)}`, 5, 15 * 60 * 1000)) return json({ error: 'Demasiados envíos. Intenta de nuevo más tarde.' }, 429);

  const length = Number(req.headers.get('content-length') || 0);
  if (length > MAX_PDF + 200 * 1024) return json({ error: 'El envío es demasiado grande.' }, 413);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: 'Formulario inválido.' }, 400);
  }

  // Honeypot filled → silently accept and drop (bots).
  if (cleanText(form.get('website'))) return json({ ok: true });

  const fields: Record<string, string> = {};
  for (const key of Object.keys(LABELS)) {
    const values = form.getAll(key).map((v) => (typeof v === 'string' ? cleanText(v, 600) : '')).filter(Boolean);
    fields[key] = values.join(', ').slice(0, 1200);
  }
  const email = fields.contacto_email.toLowerCase();
  if (!fields.empresa_nombre || !fields.contacto_nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Faltan datos de la empresa o del contacto.' }, 400);
  }

  const pdf = form.get('pdf');
  if (!(pdf instanceof File) || pdf.size === 0) return json({ error: 'Se requiere el PDF del diagnóstico.' }, 400);
  if (pdf.size > MAX_PDF) return json({ error: 'El PDF excede 5 MB.' }, 413);
  const buffer = Buffer.from(await pdf.arrayBuffer());
  if (buffer.subarray(0, 5).toString('latin1') !== '%PDF-') return json({ error: 'El archivo adjunto no es un PDF válido.' }, 400);

  const rows = Object.entries(LABELS)
    .map(([k, label]) => `<tr><td style="padding:10px 12px;border:1px solid #e5d7ad;font-weight:600;background:#faf5e8;">${label}</td><td style="padding:10px 12px;border:1px solid #e5d7ad;">${escapeHtml(fields[k] || '-')}</td></tr>`)
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#2f1720;"><h2 style="margin:0 0 16px;color:#5c1a2e;">Nuevo diagnostico de auditoria</h2><p style="margin:0 0 18px;">Se recibio un nuevo formulario desde indusecc.com.mx. El PDF viene adjunto.</p><table style="border-collapse:collapse;width:100%;max-width:900px;"><tbody>${rows}</tbody></table></div>`;
  const company = fields.empresa_nombre.replace(/[\r\n]/g, ' ').slice(0, 120);

  try {
    await createTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENTS,
      replyTo: email,
      subject: `Nuevo diagnostico de auditoria - ${company}`,
      html,
      attachments: [{ filename: 'INDUSECC_Formulario_Auditoria.pdf', content: buffer, contentType: 'application/pdf' }],
    });
    return json({ ok: true });
  } catch (error) {
    console.error('send-auditoria failed:', error);
    return json({ error: 'No fue posible enviar el correo en este momento.' }, 502);
  }
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
}
