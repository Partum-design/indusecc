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
        content: Buffer.from(rawBody, 'latin1').toString('base64')
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
  return value || '—';
}

function buildHtml(fields) {
  const labels = {
    objetivo: 'Objetivo principal',
    objetivo_detalle: 'Detalle del objetivo',
    areas: 'Áreas a auditar',
    areas_otro: 'Otra área',
    periodo_inicio: 'Periodo inicio',
    periodo_fin: 'Periodo fin',
    normas: 'Normas / regulaciones',
    normas_otro: 'Otra norma',
    empleados: 'Número de empleados',
    sedes: 'Sedes / sucursales',
    sedes_detalle: 'Detalle de sedes',
    modalidad: 'Modalidad de auditoría',
    nuevos_sistemas: 'Nuevos sistemas implementados',
    nuevos_sistemas_detalle: 'Detalle de nuevos sistemas',
    manuales: 'Manuales / procedimientos',
    auditorias_previas: 'Auditorías previas',
    auditorias_previas_detalle: 'Detalle de auditorías previas',
    cambios_personal: 'Cambios en personal clave',
    cambios_personal_detalle: 'Detalle de cambios de personal',
    riesgos: 'Riesgos identificados',
    riesgos_detalle: 'Detalle de riesgos',
    fecha_inicio_auditoria: 'Inicio deseado de auditoría',
    fecha_fin_auditoria: 'Fin deseado de auditoría',
    fecha_informe: 'Fecha requerida del informe',
    fecha_informe_obs: 'Observaciones del informe',
    entregables: 'Entregables requeridos',
    contacto_nombre: 'Nombre de contacto',
    contacto_puesto: 'Puesto del contacto',
    contacto_email: 'Correo del contacto',
    contacto_telefono: 'Teléfono del contacto',
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
      <h2 style="margin:0 0 16px;color:#5c1a2e;">Nuevo diagnóstico de auditoría</h2>
      <p style="margin:0 0 18px;">Se recibió un nuevo formulario desde INDUSECC. El PDF viene adjunto en este correo.</p>
      <table style="border-collapse:collapse;width:100%;max-width:900px;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
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

  const payload = {
    from: process.env.AUDITORIA_FROM_EMAIL || 'INDUSECC <onboarding@resend.dev>',
    to: ['danna@indusecc.com.mx', 'maricruz@partumdesign.com.mx'],
    subject: 'Nuevo diagnóstico de auditoría - INDUSECC',
    html: buildHtml(fields),
    attachments: [
      {
        filename: pdfAttachment.filename,
        content: pdfAttachment.content
      }
    ]
  };

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return res.status(502).json({ error: errorText });
  }

  const result = await resendResponse.json();
  return res.status(200).json({ ok: true, id: result.id });
}
