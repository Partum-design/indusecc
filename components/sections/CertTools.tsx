'use client';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';

const ease = [0.22, 1, 0.36, 1] as const;

const PROCESS = [
  { k: 'Levantamiento', title: 'Levantamiento de información', text: 'Diagnóstico exhaustivo frente a los requisitos de la norma objetivo. Identificamos brechas, fortalezas y el estado actual de tu sistema de gestión.', bullets: ['Gap analysis completo', 'Entrevistas con líderes de proceso', 'Reporte de brechas con plan de acción'], time: '~4 semanas', timeLabel: 'Duración estimada' },
  { k: 'Desarrollo', title: 'Desarrollo del sistema de gestión', text: 'Diseñamos e implementamos el sistema documental completo, alineado a cada cláusula de la norma, y capacitamos a tu equipo en cada etapa.', bullets: ['Manual y políticas corporativas', 'Procedimientos e instrucciones de trabajo', 'Capacitación al 100% del equipo involucrado'], time: '3–5 meses', timeLabel: 'Duración promedio' },
  { k: 'Auditoría', title: 'Auditorías de etapa 1 y 2', text: 'Coordinamos con el organismo certificador acreditado las auditorías oficiales. Preparamos a tu organización y estamos presentes durante todo el proceso.', bullets: ['Pre-auditoría interna con metodología ISO', 'Consultor senior presente en auditorías oficiales', 'Cierre de no conformidades en tiempo real'], time: '2–4 semanas', timeLabel: 'Proceso de auditoría' },
  { k: 'Certificación', title: 'Certificación internacional', text: 'Tu organización recibe el certificado ISO con validez internacional de 3 años, que abre puertas a nuevos mercados, licitaciones y contratos.', bullets: ['Validez internacional de 3 años', 'Reconocido por organismos acreditados (IAF)', 'Derecho a usar la marca de certificación'], time: '100%', timeLabel: 'Tasa de éxito INDUSECC' },
  { k: 'Seguimiento', title: 'Seguimiento anual y renovación', text: 'El certificado requiere auditorías de seguimiento anuales y renovación cada 3 años. Te acompañamos en todo el ciclo para mantenerlo vigente.', bullets: ['Auditorías de seguimiento (años 1 y 2)', 'Recertificación al año 3', 'Soporte continuo y mejora del sistema'], time: '3 años', timeLabel: 'Vigencia del certificado' },
];

export function CertProcess() {
  const [i, setI] = useState(0);
  const s = PROCESS[i];
  return (
    <div className="cert-proc">
      <LayoutGroup>
        <div className="cert-steps" role="tablist" aria-label="Etapas de certificación">
          {PROCESS.map((p, n) => (
            <button key={p.k} role="tab" aria-selected={i === n} className={`cert-step ${i === n ? 'is-active' : ''}`} onClick={() => setI(n)}>
              {i === n && <motion.span layoutId="cert-bg" className="cert-step-bg" transition={{ duration: 0.5, ease }} />}
              <b>{String(n + 1).padStart(2, '0')}</b>
              <span>{p.k}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div key={s.k} className="cert-panel" role="tabpanel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
          <div>
            <span className="eyebrow">Paso {String(i + 1).padStart(2, '0')}</span>
            <h3 className="h3" style={{ fontSize: 'clamp(1.5rem, 1.1rem + 1.4vw, 2.3rem)', margin: '12px 0 14px' }}>{s.title}</h3>
            <p className="lead">{s.text}</p>
            <ul className="check-list">
              {s.bullets.map((b) => <li key={b}><Icon name="check" />{b}</li>)}
            </ul>
          </div>
          <div className="cert-time">
            <b>{s.time}</b>
            <small>{s.timeLabel}</small>
            <div className="actions" style={{ marginTop: 22 }}>
              <button className="round-btn" onClick={() => setI((i + PROCESS.length - 1) % PROCESS.length)} aria-label="Etapa anterior"><Icon name="arrowLeft" /></button>
              <button className="round-btn" onClick={() => setI((i + 1) % PROCESS.length)} aria-label="Siguiente etapa"><Icon name="arrow" /></button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const NORMS = [
  { code: 'ISO 9001', tag: 'Calidad', year: '2015', name: 'Sistema de Gestión de Calidad', desc: 'La norma más adoptada mundialmente. Permite demostrar capacidad para entregar productos y servicios que satisfagan consistentemente los requisitos del cliente y mejorar continuamente.', sectors: ['Manufactura', 'Servicios', 'Salud', 'Educación', 'Gobierno', 'Tecnología'] },
  { code: 'ISO 14001', tag: 'Ambiente', year: '2015', name: 'Sistema de Gestión Ambiental', desc: 'Marco para proteger el medio ambiente y responder a condiciones ambientales cambiantes, equilibrando las necesidades socioeconómicas.', sectors: ['Manufactura', 'Construcción', 'Energía', 'Minería', 'Servicios ambientales'] },
  { code: 'ISO 45001', tag: 'SST', year: '2018', name: 'Seguridad y Salud en el Trabajo', desc: 'Marco para gestionar riesgos y oportunidades de SST. Reemplazó a OHSAS 18001 como estándar internacional para prevenir lesiones laborales.', sectors: ['Construcción', 'Manufactura', 'Minería', 'Logística', 'Servicios públicos'] },
  { code: 'ISO 27001', tag: 'Infosec', year: '2022', name: 'Seguridad de la Información', desc: 'Requisitos para un SGSI que protege la confidencialidad, integridad y disponibilidad de los activos de información.', sectors: ['Tecnología', 'Finanzas', 'Telecomunicaciones', 'Gobierno', 'Salud digital'] },
  { code: 'ISO 22000', tag: 'Inocuidad', year: '2018', name: 'Inocuidad de los Alimentos', desc: 'Requisitos de inocuidad alimentaria a lo largo de toda la cadena de suministro. Combina principios HACCP con gestión sistémica.', sectors: ['Alimentos', 'Restaurantes', 'Agricultura', 'Empaque', 'Logística alimentaria'] },
  { code: 'ISO 28000', tag: 'Cadena', year: '2022', name: 'Seguridad de la Cadena de Suministro', desc: 'Sistema de gestión de la seguridad logística para organizaciones que buscan proteger su cadena de suministro.', sectors: ['Logística', 'Transporte', 'Comercio internacional', 'Retail', 'Distribución'] },
  { code: 'ISO 39001', tag: 'Vialidad', year: '2013', name: 'Seguridad Vial', desc: 'Reduce y elimina el riesgo de muerte y lesiones graves relacionadas con el tráfico mediante la gestión sistemática de riesgos viales.', sectors: ['Transporte', 'Logística', 'Gobierno', 'Construcción vial', 'Empresas con flotas'] },
];

export function NormSelector() {
  const [i, setI] = useState(0);
  const n = NORMS[i];
  return (
    <div className="norm-select">
      <div className="norm-chip-grid">
        {NORMS.map((x, k) => (
          <button key={x.code} className={`norm-chip ${i === k ? 'is-active' : ''}`} onClick={() => setI(k)} aria-pressed={i === k}>
            <small>{x.tag} · {x.year}</small>
            <b>{x.code}</b>
            <span>{x.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.aside key={n.code} className="panel-dark norm-detail" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
          <span className="eyebrow">Versión {n.year} · renovación cada 3 años</span>
          <h3 className="serif" style={{ fontSize: 'clamp(2rem, 1.4rem + 2vw, 3rem)', color: 'var(--gold-light)', margin: '14px 0 6px', lineHeight: 1 }}>{n.code}</h3>
          <p style={{ fontWeight: 600, letterSpacing: '.02em' }}>{n.name}</p>
          <p style={{ color: 'rgba(255,255,255,.72)', margin: '16px 0 20px', lineHeight: 1.75 }}>{n.desc}</p>
          <div className="chips on-dark">{n.sectors.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          <Link className="btn btn-gold btn-sm" href="/contacto" style={{ marginTop: 26 }}><span>Certificarme en {n.code}</span><span className="ico"><Icon name="arrow" /></span></Link>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}

const BASE_MONTHS: Record<string, number> = { '9001': 6, '14001': 6, '45001': 7, '27001': 8, '22000': 7, '28000': 8 };
const SIZE_MULT: Record<string, number> = { micro: 0.7, small: 1, medium: 1.3, large: 1.7 };

export function CertSimulator() {
  const [norm, setNorm] = useState('9001');
  const [size, setSize] = useState('small');
  const [mat, setMat] = useState(50);

  const r = useMemo(() => {
    const mult = SIZE_MULT[size] ?? 1;
    const total = Math.round((BASE_MONTHS[norm] ?? 6) * mult * (1 - (mat / 100) * 0.5));
    const min = Math.max(3, total - 1);
    const max = total + 2;
    const mod = mat < 30 ? ['Servicio integral', 'Análisis + implementación + certificación'] : mat < 70 ? ['Documental + certificación', 'Levantamiento + certificación'] : ['Gestión express', 'Pre-auditoría + certificación'];
    const diag = Math.max(5, Math.round((100 / Math.max(total, 1)) * 2 * mult));
    const dev = Math.max(5, Math.round(100 * (1 - mat / 100) * 0.55));
    const phases = [diag, dev, 15, 10, Math.max(10, 100 - diag - dev - 25)];
    return { min, max, mod, phases };
  }, [norm, size, mat]);

  const colors = ['#7b1e22', '#9b2429', '#c9a84c', '#e8c97a', '#4a0f13'];
  const labels = ['Diagnóstico', 'Desarrollo', 'Pre-auditoría', 'Certificación', 'Seguimiento anual'];

  return (
    <div className="sim">
      <div className="form-card sim-form">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="simNorm">Norma ISO objetivo</label>
            <select id="simNorm" className="select" value={norm} onChange={(e) => setNorm(e.target.value)}>
              <option value="9001">ISO 9001:2015 · Calidad</option>
              <option value="14001">ISO 14001:2015 · Ambiental</option>
              <option value="45001">ISO 45001:2018 · SST</option>
              <option value="27001">ISO 27001:2022 · Información</option>
              <option value="22000">ISO 22000:2018 · Alimentos</option>
              <option value="28000">ISO 28000:2022 · Cadena de suministro</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="simSize">Tamaño de empresa</label>
            <select id="simSize" className="select" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="micro">Micro (1–10 personas)</option>
              <option value="small">Pequeña (11–50 personas)</option>
              <option value="medium">Mediana (51–250 personas)</option>
              <option value="large">Grande (250+ personas)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="simMat">Madurez del sistema actual: <span style={{ color: 'var(--wine)' }}>{mat}% implementado</span></label>
            <input id="simMat" className="range" type="range" min={0} max={100} step={10} value={mat} onChange={(e) => setMat(+e.target.value)} />
            <div className="legend" style={{ justifyContent: 'space-between' }}><span>Sin sistema</span><span>Parcial</span><span>Casi listo</span></div>
          </div>
        </div>
      </div>
      <div className="panel-dark sim-out" aria-live="polite">
        <div className="sim-kpis">
          <div><small>Tiempo estimado</small><b>{r.min}–{r.max} meses</b><span>del inicio al certificado</span></div>
          <div><small>Modalidad recomendada</small><b style={{ fontSize: '1.35rem' }}>{r.mod[0]}</b><span>{r.mod[1]}</span></div>
        </div>
        <div className="timeline-bar" style={{ marginTop: 26, background: 'rgba(255,255,255,.08)' }} aria-hidden="true">
          {r.phases.map((w, k) => <span key={k} style={{ flexGrow: w, background: colors[k] }} />)}
        </div>
        <div className="legend" style={{ marginTop: 14, color: 'rgba(255,255,255,.7)' }}>
          {labels.map((l, k) => <span key={l}><i style={{ background: colors[k] }} />{l}</span>)}
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Estimación orientativa. Te damos tiempos y costos exactos tras el diagnóstico gratuito.</p>
      </div>
    </div>
  );
}
