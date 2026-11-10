'use client';
import { useRef, useState, type ReactNode } from 'react';
import { Icon } from '../ui/Icon';

type Opt = { v: string; l?: string };
const o = (...vals: string[]): Opt[] => vals.map((v) => ({ v }));

const AREAS = o('Compras y Proveedores', 'Recursos Humanos', 'Financiero y Contabilidad', 'Tecnologías de la Información (TI)', 'Producción y Operaciones', 'Ventas y Comercial', 'Legal y Cumplimiento', 'Otro');
const NORMAS = o('ISO 9001 — Gestión de Calidad', 'ISO 14001 — Gestión Ambiental', 'ISO 27001 — Seguridad de la Información', 'SOX — Sarbanes-Oxley', 'Normativas locales / gubernamentales', 'Otra norma');
const ENTREGABLES = o('Informe ejecutivo (resumen gerencial)', 'Informe detallado de hallazgos', 'Recomendaciones de mejora', 'Plan de acción correctiva', 'Presentación ejecutiva (PPT/slides)', 'Seguimiento de acciones correctivas');

const REQUIRED = ['objetivo', 'empleados', 'sedes', 'modalidad', 'manuales', 'auditorias_previas', 'empresa_nombre', 'contacto_nombre', 'contacto_email'];

const LABELS: [string, string][] = [
  ['objetivo', 'Objetivo principal'], ['areas', 'Áreas a auditar'], ['periodo', 'Periodo a auditar'], ['normas', 'Normas / regulaciones'],
  ['empleados', 'Número de empleados'], ['sedes', 'Sedes / sucursales'], ['modalidad', 'Modalidad'], ['nuevos_sistemas', 'Nuevos sistemas implementados'],
  ['manuales', 'Manuales / procedimientos'], ['auditorias_previas', 'Auditorías previas'], ['cambios_personal', 'Cambios en personal clave'], ['riesgos', 'Áreas de riesgo identificadas'],
  ['fechas', 'Fechas deseadas de auditoría'], ['fecha_informe', 'Fecha requerida del informe'], ['entregables', 'Entregables requeridos'],
  ['empresa', 'Empresa'], ['contacto', 'Contacto principal'], ['disponibilidad', 'Disponibilidad del personal'],
];

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="af-section">
      <legend><b>{n}</b>{title}</legend>
      <div className="form-grid">{children}</div>
    </fieldset>
  );
}

function Q({ label, hint, children, req }: { label: string; hint?: string; children: ReactNode; req?: boolean }) {
  return (
    <div className="field full">
      <span className="label">{label}{req && <i> *</i>}</span>
      {hint && <span className="field-hint">{hint}</span>}
      {children}
    </div>
  );
}

function Choices({ name, opts, multi }: { name: string; opts: Opt[]; multi?: boolean }) {
  return (
    <div className="choice-grid">
      {opts.map((x) => (
        <label className="choice" key={x.v}>
          <input type={multi ? 'checkbox' : 'radio'} name={name} value={x.v} />
          <span>{x.l ?? x.v}</span>
        </label>
      ))}
    </div>
  );
}

function Select({ name, placeholder, opts }: { name: string; placeholder: string; opts: string[] }) {
  return (
    <select className="select" name={name} defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {opts.map((x) => <option key={x}>{x}</option>)}
    </select>
  );
}

function collect(form: HTMLFormElement) {
  const fd = new FormData(form);
  const get = (k: string) => String(fd.get(k) ?? '').trim();
  const all = (k: string) => fd.getAll(k).map(String).filter(Boolean).join(', ');
  const join = (a: string, b: string, sep = ' — ') => [a, b].filter(Boolean).join(sep);
  return {
    objetivo: join(get('objetivo'), get('objetivo_detalle')),
    areas: join(all('areas'), get('areas_otro'), ' · '),
    periodo: [get('periodo_inicio'), get('periodo_fin')].filter(Boolean).join(' al '),
    normas: join(all('normas'), get('normas_otro'), ' · '),
    empleados: get('empleados'),
    sedes: join(get('sedes'), get('sedes_detalle')),
    modalidad: get('modalidad'),
    nuevos_sistemas: join(get('nuevos_sistemas'), get('nuevos_sistemas_detalle'), ': '),
    manuales: get('manuales'),
    auditorias_previas: join(get('auditorias_previas'), get('auditorias_previas_detalle'), ': '),
    cambios_personal: join(get('cambios_personal'), get('cambios_personal_detalle'), ': '),
    riesgos: join(get('riesgos'), get('riesgos_detalle'), ': '),
    fechas: [get('fecha_inicio_auditoria'), get('fecha_fin_auditoria')].filter(Boolean).join(' al '),
    fecha_informe: join(get('fecha_informe'), get('fecha_informe_obs')),
    entregables: all('entregables'),
    empresa: join(get('empresa_nombre'), get('empresa_giro')),
    contacto: [get('contacto_nombre'), get('contacto_puesto'), get('contacto_email'), get('contacto_telefono')].filter(Boolean).join(' · '),
    disponibilidad: join(get('disponibilidad'), get('disponibilidad_detalle'), ': '),
    empresa_nombre: get('empresa_nombre'),
  };
}

async function buildPdf(form: HTMLFormElement) {
  const { jsPDF } = await import('jspdf');
  const d = collect(form) as Record<string, string>;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 44;
  const header = () => {
    doc.setFillColor(43, 8, 11);
    doc.rect(0, 0, W, 86, 'F');
    doc.setFillColor(201, 168, 76);
    doc.rect(0, 86, W, 3, 'F');
    doc.setTextColor(232, 201, 122);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('INDUSECC', M, 42);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Cuestionario de diagnóstico de auditoría', M, 62);
    doc.text(new Date().toLocaleDateString('es-MX', { dateStyle: 'long' }), W - M, 62, { align: 'right' });
  };
  header();
  let y = 118;
  doc.setTextColor(43, 8, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(d.empresa_nombre || 'Empresa', M, y);
  y += 24;
  for (const [key, label] of LABELS) {
    const val = d[key] || '—';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(val, W - M * 2 - 170) as string[];
    const rowH = Math.max(28, lines.length * 14 + 14);
    if (y + rowH > H - 50) {
      doc.addPage();
      header();
      y = 118;
    }
    doc.setFillColor(250, 245, 232);
    doc.rect(M, y, 160, rowH, 'F');
    doc.setDrawColor(229, 215, 173);
    doc.rect(M, y, W - M * 2, rowH);
    doc.setTextColor(92, 26, 46);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(doc.splitTextToSize(label, 148) as string[], M + 8, y + 17);
    doc.setTextColor(40, 24, 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.text(lines, M + 170, y + 17);
    y += rowH;
  }
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFontSize(8.5);
    doc.setTextColor(120, 100, 100);
    doc.text('INDUSECC · danna@indusecc.com.mx · 55 4015 2551 · www.indusecc.com.mx', M, H - 24);
    doc.text(`${p} / ${pages}`, W - M, H - 24, { align: 'right' });
  }
  return doc;
}

export function AuditForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const validate = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const missing = REQUIRED.filter((k) => !String(fd.get(k) ?? '').trim());
    const email = String(fd.get('contacto_email') ?? '');
    if (missing.length) return 'Completa los campos marcados con * (objetivo, tamaño, modalidad, documentación, auditorías previas, empresa y contacto).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'El correo de contacto no tiene un formato válido.';
    return null;
  };

  const download = async () => {
    const form = formRef.current;
    if (!form) return;
    const doc = await buildPdf(form);
    doc.save('INDUSECC_Formulario_Auditoria.pdf');
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const err = validate(form);
    if (err) {
      setStatus({ type: 'error', text: err });
      return;
    }
    setBusy(true);
    setStatus({ type: 'info', text: 'Generando tu PDF y enviando el diagnóstico…' });
    try {
      const doc = await buildPdf(form);
      const payload = new FormData(form);
      payload.append('pdf', doc.output('blob'), 'INDUSECC_Formulario_Auditoria.pdf');
      const res = await fetch('/api/send-auditoria', { method: 'POST', body: payload });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'No fue posible enviar el formulario.');
      setStatus({ type: 'success', text: '¡Listo! Recibimos tu diagnóstico. Te contactaremos en menos de 48 horas con una propuesta.' });
      form.reset();
    } catch (error) {
      setStatus({ type: 'error', text: `${error instanceof Error ? error.message : 'Error de envío.'} Puedes descargar tu PDF y enviarlo a danna@indusecc.com.mx.` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form ref={formRef} className="form-card af" onSubmit={submit} noValidate>
      <Section n="I" title="Datos generales y alcance">
        <Q label="¿Cuál es el objetivo principal de la auditoría?" hint="Cumplimiento normativo, mejora de procesos, detección de fraudes, requerimiento de certificación…" req>
          <Select name="objetivo" placeholder="Selecciona una opción" opts={['Cumplimiento normativo', 'Mejora de procesos', 'Detección de fraudes o irregularidades', 'Requerimiento de certificación', 'Auditoría de due diligence', 'Otro']} />
          <textarea className="textarea" name="objetivo_detalle" placeholder="Detalle adicional (opcional)" rows={2} maxLength={600} style={{ minHeight: 80 }} />
        </Q>
        <Q label="¿Qué áreas, departamentos o procesos se van a auditar?">
          <Choices name="areas" opts={AREAS} multi />
          <input className="input" name="areas_otro" placeholder="Especifica otras áreas" maxLength={200} />
        </Q>
        <div className="field"><label htmlFor="pi">Periodo a auditar · inicio</label><input id="pi" className="input" type="date" name="periodo_inicio" /></div>
        <div className="field"><label htmlFor="pf">Periodo a auditar · fin</label><input id="pf" className="input" type="date" name="periodo_fin" /></div>
        <Q label="¿Existen normas, políticas o regulaciones específicas a cumplir?">
          <Choices name="normas" opts={NORMAS} multi />
          <input className="input" name="normas_otro" placeholder="Especifica otras normas o regulaciones" maxLength={200} />
        </Q>
      </Section>

      <Section n="II" title="Tamaño y complejidad">
        <div className="field">
          <label>¿Cuántos empleados tiene la organización? <i>*</i></label>
          <Select name="empleados" placeholder="Selecciona un rango" opts={['1 — 10 empleados', '11 — 50 empleados', '51 — 100 empleados', '101 — 250 empleados', '251 — 500 empleados', 'Más de 500 empleados']} />
        </div>
        <div className="field">
          <label>¿Cuántas sedes deben auditarse? <i>*</i></label>
          <Select name="sedes" placeholder="Selecciona una opción" opts={['1 — Sede única', '2 — 3 sedes', '4 — 6 sedes', '7 — 10 sedes', 'Más de 10 sedes']} />
        </div>
        <Q label="Ubicación de las sedes (opcional)"><input className="input" name="sedes_detalle" placeholder="Ciudades o estados, si aplica" maxLength={300} /></Q>
        <Q label="¿La auditoría será presencial, remota o híbrida?" req><Choices name="modalidad" opts={o('Presencial', 'Remota', 'Híbrida', 'Por definir')} /></Q>
        <Q label="¿Hay nuevos sistemas, software o líneas de producto recientes?">
          <Choices name="nuevos_sistemas" opts={o('Sí', 'No', 'En proceso')} />
          <textarea className="textarea" name="nuevos_sistemas_detalle" placeholder="Si aplica, descríbelos" maxLength={600} style={{ minHeight: 80 }} />
        </Q>
      </Section>

      <Section n="III" title="Información documental y contexto">
        <Q label="¿Cuentan con manuales de políticas y procedimientos documentados?" req><Choices name="manuales" opts={o('Sí, completos', 'Parcialmente', 'No', 'En elaboración')} /></Q>
        <Q label="¿Se han realizado auditorías internas anteriores?" req>
          <Choices name="auditorias_previas" opts={o('Sí, con informes', 'Sí, sin informes', 'No')} />
          <textarea className="textarea" name="auditorias_previas_detalle" placeholder="Año de la última auditoría y hallazgos relevantes (opcional)" maxLength={600} style={{ minHeight: 80 }} />
        </Q>
        <Q label="¿Ha habido cambios significativos en personal clave?">
          <Choices name="cambios_personal" opts={o('Sí', 'No')} />
          <textarea className="textarea" name="cambios_personal_detalle" placeholder="Si aplica, describe los cambios" maxLength={600} style={{ minHeight: 80 }} />
        </Q>
        <Q label="¿Han identificado áreas de alto riesgo o sospechas de irregularidades?">
          <Choices name="riesgos" opts={o('Sí', 'No', 'Sospecha no confirmada')} />
          <textarea className="textarea" name="riesgos_detalle" placeholder="Describe las áreas de riesgo (confidencial)" maxLength={600} style={{ minHeight: 80 }} />
        </Q>
      </Section>

      <Section n="IV" title="Cronograma y entregables">
        <div className="field"><label htmlFor="fi">Inicio deseado de la auditoría</label><input id="fi" className="input" type="date" name="fecha_inicio_auditoria" /></div>
        <div className="field"><label htmlFor="ff">Fin deseado de la auditoría</label><input id="ff" className="input" type="date" name="fecha_fin_auditoria" /></div>
        <div className="field"><label htmlFor="fr">¿Para cuándo necesitan el informe final?</label><input id="fr" className="input" type="date" name="fecha_informe" /></div>
        <div className="field"><label htmlFor="fo">Observaciones de plazos</label><input id="fo" className="input" name="fecha_informe_obs" placeholder="Urgencia, fechas límite…" maxLength={200} /></div>
        <Q label="¿Qué entregables requieren?"><Choices name="entregables" opts={ENTREGABLES} multi /></Q>
      </Section>

      <Section n="V" title="Logística y contacto">
        <div className="field"><label htmlFor="en">Empresa / razón social <i>*</i></label><input id="en" className="input" name="empresa_nombre" autoComplete="organization" maxLength={160} /></div>
        <div className="field"><label htmlFor="eg">Giro, industria o RFC</label><input id="eg" className="input" name="empresa_giro" maxLength={160} /></div>
        <div className="field"><label htmlFor="cn">Nombre del contacto <i>*</i></label><input id="cn" className="input" name="contacto_nombre" autoComplete="name" maxLength={120} /></div>
        <div className="field"><label htmlFor="cp">Cargo / puesto</label><input id="cp" className="input" name="contacto_puesto" autoComplete="organization-title" maxLength={120} /></div>
        <div className="field"><label htmlFor="ce">Correo electrónico <i>*</i></label><input id="ce" className="input" type="email" name="contacto_email" autoComplete="email" maxLength={160} /></div>
        <div className="field"><label htmlFor="ct">Teléfono / ext.</label><input id="ct" className="input" type="tel" name="contacto_telefono" autoComplete="tel" maxLength={40} /></div>
        <Q label="¿El personal estará disponible para entrevistas?">
          <Choices name="disponibilidad" opts={o('Disponibilidad completa', 'Disponibilidad parcial', 'Requiere coordinación')} />
          <textarea className="textarea" name="disponibilidad_detalle" placeholder="Restricciones de horario, áreas con acceso limitado u otras observaciones" maxLength={600} style={{ minHeight: 80 }} />
        </Q>
        {/* Honeypot: real people never fill this field. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>No llenar<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
      </Section>

      {status && <div className={`alert ${status.type}`} role="status" style={{ marginTop: 24 }}>{status.text}</div>}
      <div className="actions" style={{ marginTop: 28 }}>
        <button className="btn btn-wine" type="submit" disabled={busy}>
          <span>{busy ? 'Enviando…' : 'Enviar diagnóstico'}</span>
          <span className="ico"><Icon name="arrow" /></span>
        </button>
        <button className="btn btn-line" type="button" onClick={download}>
          <span>Descargar mi copia en PDF</span>
          <span className="ico"><Icon name="download" /></span>
        </button>
      </div>
      <p className="field-hint" style={{ marginTop: 14 }}>Tu información se usa solo para preparar tu propuesta de auditoría y se trata como confidencial.</p>
    </form>
  );
}
