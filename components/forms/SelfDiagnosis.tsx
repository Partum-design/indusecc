'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { wa } from '@/lib/site';
import { Icon, WhatsAppIcon } from '../ui/Icon';

const QUESTIONS = [
  { id: 'sector', label: 'Sector', text: '¿En qué sector opera tu empresa?', opts: ['Manufactura e Industria', 'Construcción e Ingeniería', 'Servicios y Comercio', 'Salud / Farmacéutica', 'Tecnología y TI', 'Otro / Múltiples sectores'] },
  { id: 'size', label: 'Tamaño', text: '¿Cuántos empleados tiene tu empresa?', opts: ['1 – 10 (Microempresa)', '11 – 50 (Pequeña empresa)', '51 – 250 (Mediana empresa)', '251 – 1,000 (Grande empresa)', 'Más de 1,000 empleados'] },
  { id: 'goal', label: 'Objetivo', text: '¿Cuál es tu principal objetivo ahora mismo?', opts: ['Obtener una certificación ISO', 'Mejorar mis procesos internos', 'Cumplir con requisitos de clientes', 'Reducir accidentes / riesgos laborales', 'Capacitar a mi equipo', 'No sé, necesito orientación'] },
  { id: 'status', label: 'Estado actual', text: '¿Cuál es el estado actual de tus sistemas de gestión?', opts: ['No tenemos ningún sistema implementado', 'Tenemos procesos informales sin documentar', 'Tenemos algo documentado pero sin certificar', 'Estamos certificados y queremos mejorar/renovar', 'Tenemos varias normas implementadas'] },
  { id: 'urgency', label: 'Urgencia', text: '¿Con qué urgencia necesitas iniciar?', opts: ['Lo necesito ahora mismo (urgente)', 'En el próximo mes', 'En los próximos 3 meses', 'En los próximos 6 meses', 'Solo estoy explorando opciones'] },
  { id: 'budget', label: 'Presupuesto', text: '¿Cuál es tu disponibilidad de presupuesto aproximada?', opts: ['Menos de $20,000 MXN', '$20,000 – $60,000 MXN', '$60,000 – $150,000 MXN', 'Más de $150,000 MXN', 'No lo he definido aún'] },
] as const;

type Rec = { name: string; desc: string };

function buildRecs(a: Record<string, string>): Rec[] {
  const recs: Rec[] = [];
  if (a.goal === 'Obtener una certificación ISO') {
    recs.push({ name: 'Certificación ISO', desc: 'Proceso completo de preparación y acompañamiento para obtener tu certificado ISO con el organismo acreditado.' });
    recs.push({ name: 'Sistemas de Gestión ISO', desc: 'Implementación del sistema de gestión requerido como base para la certificación.' });
  } else if (a.goal === 'Mejorar mis procesos internos') {
    recs.push({ name: 'Consultoría Especializada', desc: 'Análisis de procesos, identificación de áreas de mejora y diseño de un plan de acción personalizado.' });
    recs.push({ name: 'Sistemas de Gestión ISO', desc: 'Estandarización y documentación de procesos bajo normas internacionales.' });
  } else if (a.goal === 'Cumplir con requisitos de clientes') {
    recs.push({ name: 'Certificación ISO 9001:2015', desc: 'La certificación más reconocida globalmente que avala la calidad de tus productos y servicios ante clientes.' });
    recs.push({ name: 'Auditorías de Segunda Parte', desc: 'Preparación para auditorías de clientes y gestión de la cadena de suministro.' });
  } else if (a.goal === 'Reducir accidentes / riesgos laborales') {
    recs.push({ name: 'Seguridad e Higiene Industrial', desc: 'Diagnóstico y cumplimiento NOM-STPS, programa de seguridad e implementación ISO 45001.' });
    recs.push({ name: 'Capacitación en Seguridad', desc: 'Formación de comisiones de seguridad, brigadas y cultura de prevención.' });
  } else if (a.goal === 'Capacitar a mi equipo') {
    recs.push({ name: 'Capacitación Empresarial', desc: 'Programas formativos en normas ISO, liderazgo, mejora continua y formación de auditores internos.' });
  } else {
    recs.push({ name: 'Consultoría de Diagnóstico', desc: 'Sesión gratuita de orientación con nuestros expertos para identificar el camino más adecuado para tu empresa.' });
  }
  if (a.status === 'Estamos certificados y queremos mejorar/renovar') recs.push({ name: 'Auditoría Interna de Seguimiento', desc: 'Evaluación del sistema existente y preparación para la auditoría de renovación del certificado.' });
  return recs.slice(0, 3);
}

const ease = [0.22, 1, 0.36, 1] as const;

export function SelfDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const q = QUESTIONS[step];

  const restart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  if (done) {
    const recs = buildRecs(answers);
    const a = answers;
    const summary = `Empresa del sector ${a.sector || '–'} · ${a.size || '–'}\nObjetivo principal: ${a.goal || '–'}\nEstado actual: ${a.status || '–'}\nUrgencia: ${a.urgency || '–'}\nPresupuesto aprox.: ${a.budget || '–'}`;
    const msg = `¡Hola INDUSECC! 👋 Acabo de completar el autodiagnóstico en su página web.\n\n📊 *Mis respuestas:*\n• Sector: ${a.sector || '–'}\n• Tamaño: ${a.size || '–'}\n• Objetivo: ${a.goal || '–'}\n• Estado actual: ${a.status || '–'}\n• Urgencia: ${a.urgency || '–'}\n• Presupuesto: ${a.budget || '–'}\n\n✅ *Servicios recomendados:*\n${recs.map((r, i) => `${i + 1}. ${r.name}`).join('\n')}\n\n¿Podríamos agendar una sesión para recibir una propuesta personalizada?`;
    return (
      <motion.div className="diag-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} aria-live="polite">
        <span className="eyebrow">Resultado de tu diagnóstico</span>
        <h3 className="diag-q">Recomendación para tu empresa <em style={{ color: 'var(--gold-light)' }}>{a.sector}</em></h3>
        <p style={{ color: 'rgba(255,255,255,.7)' }}>Con base en tus respuestas, estos son los servicios que mejor se adaptan a tu situación:</p>
        <div className="diag-recs">
          {recs.map((r, i) => (
            <motion.div key={r.name} className="diag-rec" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease }}>
              <b>{i + 1}</b>
              <div><strong>{r.name}</strong><p>{r.desc}</p></div>
            </motion.div>
          ))}
        </div>
        <div className="diag-summary">{summary}</div>
        <div className="diag-nav">
          <button className="btn btn-ghost btn-sm" type="button" onClick={restart}><span>Reiniciar</span><span className="ico"><Icon name="refresh" /></span></button>
          <a className="btn btn-wa btn-sm" href={wa(msg)} target="_blank" rel="noopener noreferrer"><span>Enviar por WhatsApp</span><span className="ico"><WhatsAppIcon /></span></a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="diag-card">
      <div className="diag-progress" aria-hidden="true">
        {QUESTIONS.map((x, i) => <i key={x.id} className={i <= step ? 'on' : ''} />)}
      </div>
      <span className="eyebrow">Pregunta {step + 1} de {QUESTIONS.length} · {q.label}</span>
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease }}>
          <h3 className="diag-q" id={`dq-${q.id}`}>{q.text}</h3>
          <div className="diag-opts" role="radiogroup" aria-labelledby={`dq-${q.id}`}>
            {q.opts.map((opt) => (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={answers[q.id] === opt}
                className={`diag-opt ${answers[q.id] === opt ? 'is-on' : ''}`}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="diag-nav">
        <button className="btn btn-ghost btn-sm" type="button" onClick={() => setStep((s) => s - 1)} style={{ visibility: step > 0 ? 'visible' : 'hidden' }}>
          <span>Anterior</span>
        </button>
        <button
          className="btn btn-gold btn-sm"
          type="button"
          disabled={!answers[q.id]}
          onClick={() => (step < QUESTIONS.length - 1 ? setStep((s) => s + 1) : setDone(true))}
        >
          <span>{step === QUESTIONS.length - 1 ? 'Ver resultado' : 'Siguiente'}</span>
          <span className="ico"><Icon name="arrow" /></span>
        </button>
      </div>
    </div>
  );
}
