import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false
  }
};

async function readRequestBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function getBoundary(contentType = '') {
  const match = contentType.match(/boundary=(.+)$/i);
  return match ? match[1] : null;
}

function parseMultipart(buffer, boundary) {
  const boundaryText = `--${boundary}`;
  const parts = buffer.toString('latin1').split(boundaryText).slice(1, -1);
  const fields = {};
  let pdfAttachment = null;

  for (const rawPart of parts) {
    const part = rawPart.replace(/^\r\n/, '').replace(/\r\n$/, '');
    const splitIndex = part.indexOf('\r\n\r\n');
    if (splitIndex === -1) continue;

    const rawHeaders = part.slice(0, splitIndex);
    const rawBody = part.slice(splitIndex + 4);
    const nameMatch = rawHeaders.match(/name="([^"]+)"/i);
    if (!nameMatch) continue;

    const fieldName = nameMatch[1];
    const filenameMatch = rawHeaders.match(/filename="([^"]*)"/i);

    if (filenameMatch && filenameMatch[1]) {
      pdfAttachment = {
        filename: filenameMatch[1],
        content: Buffer.from(rawBody, 'latin1')
      };
      continue;
    }

    const value = rawBody.replace(/\r\n$/, '');
    if (fields[fieldName]) {
      if (Array.isArray(fields[fieldName])) {
        fields[fieldName].push(value);
      } else {
        fields[fieldName] = [fields[fieldName], value];
      }
    } else {
      fields[fieldName] = value;
    }
  }

  return { fields, pdfAttachment };
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  return value || '-';
}

function buildHtml(fields) {
  const labels = {
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
    contacto_nombre: 'Nombre de contacto',
    contacto_puesto: 'Puesto del contacto',
    contacto_email: 'Correo del contacto',
    contacto_telefono: 'Telefono del contacto',
    disponibilidad: 'Disponibilidad del personal',
    disponibilidad_detalle: 'Detalle de disponibilidad',
    comentarios: 'Comentarios adicionales'
  };

  const rows = Object.entries(labels).map(([key, label]) => `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e5d7ad;font-weight:600;background:#faf5e8;">${label}</td>
      <td style="padding:10px 12px;border:1px solid #e5d7ad;">${formatValue(fields[key])}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#2f1720;">
      <h2 style="margin:0 0 16px;color:#5c1a2e;">Nuevo diagnostico de auditoria</h2>
      <p style="margin:0 0 18px;">Se recibio un nuevo formulario desde INDUSECC. El PDF viene adjunto en este correo.</p>
      <table style="border-collapse:collapse;width:100%;max-width:900px;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const boundary = getBoundary(req.headers['content-type']);
  if (!boundary) {
    return res.status(400).json({ error: 'Invalid multipart request' });
  }

  const buffer = await readRequestBuffer(req);
  const { fields, pdfAttachment } = parseMultipart(buffer, boundary);

  if (!pdfAttachment) {
    return res.status(400).json({ error: 'PDF attachment is required' });
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: ['danna@indusecc.com.mx', 'maricruz@partumdesign.com.mx'],
      subject: 'Nuevo diagnostico de auditoria - INDUSECC',
      html: buildHtml(fields),
      attachments: [
        {
          filename: pdfAttachment.filename,
          content: pdfAttachment.content,
          contentType: 'application/pdf'
        }
      ]
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('send-auditoria failed:', error);
    return res.status(502).json({
      error: error instanceof Error ? error.message : 'SMTP send failed'
    });
  }
}
