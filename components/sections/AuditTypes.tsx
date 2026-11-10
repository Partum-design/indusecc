'use client';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const TYPES = [
  { k: 'Sistema', t: 'Auditoría de sistema', p: 'Evaluación integral del sistema de gestión en su conjunto: coherencia, eficacia e implementación de todos sus elementos conforme a la norma.', tags: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 50001'],
    f: [['Análisis documental', 'Revisión de política, objetivos, procedimientos, registros y manuales.'], ['Entrevistas estructuradas', 'Verificamos el conocimiento real del sistema y la cultura de calidad.'], ['Informe detallado', 'Hallazgos, no conformidades y recomendaciones priorizadas.'], ['Plan de acción', 'Te acompañamos a definir y dar seguimiento a las acciones correctivas.']] },
  { k: 'Proceso', t: 'Auditoría de proceso', p: 'Evaluación profunda de procesos específicos para verificar su eficacia, eficiencia y conformidad, identificando oportunidades de optimización.', tags: ['Procesos clave', 'KPIs', 'Mapeo de flujos', 'Riesgos'],
    f: [['Mapeo de procesos', 'Entradas, salidas, controles, recursos y puntos críticos.'], ['Medición de eficacia', 'Indicadores de desempeño contra los objetivos establecidos.'], ['Identificación de riesgos', 'Riesgos y oportunidades que afectan la calidad final.'], ['Benchmarking sectorial', 'Comparación con mejores prácticas del sector.']] },
  { k: 'Producto', t: 'Auditoría de producto', p: 'Verificación de que productos o servicios cumplen los requisitos del cliente, los estándares normativos y las regulaciones aplicables.', tags: ['Requisitos del cliente', 'Inspección', 'Trazabilidad', 'Liberación'],
    f: [['Especificaciones', 'Cumplimiento técnico, normativo y contractual del producto.'], ['Trazabilidad', 'De las materias primas hasta la entrega al cliente final.'], ['Revisión de registros', 'Inspecciones, pruebas y controles aplicados.'], ['Criterios de aceptación', 'Gestión de producto no conforme y criterios de rechazo.']] },
  { k: 'Integrada', t: 'Auditoría integrada', p: 'Auditoría simultánea de varios sistemas (calidad, ambiente, seguridad, energía…) que optimiza recursos y da una visión completa de la organización.', tags: ['Multi-norma', 'Eficiencia', 'Visión global', 'Ahorro de tiempo'],
    f: [['Sinergias entre normas', 'Elementos comunes auditados una sola vez.'], ['Reducción de costos', 'Menos días de auditoría y menor impacto en la operación.'], ['Informe consolidado', 'Un solo informe con hallazgos cruzados.'], ['Equipo especializado', 'Auditores con competencia acreditada en cada norma.']] },
];

export function AuditTypes() {
  const [i, setI] = useState(0);
  const t = TYPES[i];
  return (
    <>
      <LayoutGroup>
        <div className="tabs" role="tablist" aria-label="Tipos de auditoría" style={{ marginBottom: 22 }}>
          {TYPES.map((x, n) => (
            <button key={x.k} role="tab" aria-selected={i === n} className={`tab ${i === n ? 'is-active' : ''}`} onClick={() => setI(n)}>
              {i === n && <motion.span layoutId="aud-pill" className="pill" transition={{ duration: 0.5, ease }} />}
              <span>{x.k}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div key={t.k} role="tabpanel" className="cert-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
          <div>
            <h3 className="h3" style={{ fontSize: 'clamp(1.5rem, 1.1rem + 1.4vw, 2.3rem)', marginBottom: 14 }}>{t.t}</h3>
            <p className="lead">{t.p}</p>
            <div className="chips" style={{ marginTop: 18 }}>{t.tags.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {t.f.map(([h, p], n) => (
              <motion.div key={h} className="mini-feat" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + n * 0.06, duration: 0.45, ease }}>
                <b>{h}</b>
                <p>{p}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
