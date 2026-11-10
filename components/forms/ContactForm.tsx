'use client';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { Icon } from '../ui/Icon';

const ENDPOINT = 'https://formspree.io/f/meepqkdw';
const ease = [0.22, 1, 0.36, 1] as const;
const STEPS = ['Datos', 'Servicio', 'Mensaje'];

type Errors = Partial<Record<'nombre' | 'email' | 'tel' | 'servicio' | 'mensaje', string>>;

export function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');
  const [chars, setChars] = useState(0);

  const val = (n: string) => String(new FormData(ref.current!).get(n) ?? '').trim();

  const validate = (s: number) => {
    const e: Errors = {};
    if (s === 0) {
      if (!val('nombre')) e.nombre = 'Ingresa tu nombre.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) e.email = 'Ingresa un correo válido.';
      if (val('tel').replace(/\D/g, '').length < 7) e.tel = 'Ingresa tu número de teléfono.';
    }
    if (s === 1 && !val('servicio')) e.servicio = 'Selecciona un servicio.';
    if (s === 2 && val('mensaje').length < 10) e.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (n: number) => {
    if (n > step && !validate(step)) return;
    setStep(n);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return go(step + 1);
    if (!validate(2)) return;
    const fd = new FormData(ref.current!);
    if (String(fd.get('_gotcha') ?? '')) return setSent(true);
    setBusy(true);
    setFailure('');
    const payload = {
      Nombre: val('nombre'),
      Apellidos: val('apellidos'),
      Email: val('email'),
      Teléfono: val('tel'),
      Empresa: val('empresa'),
      Servicio: val('servicio'),
      Normas_ISO: fd.getAll('norma').join(', '),
      Método_Contacto: val('contactmethod'),
      Mensaje: val('mensaje'),
      Empleados: val('empleados'),
      Urgencia: val('urgencia'),
    };
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setFailure('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.');
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    ref.current?.reset();
    setStep(0);
    setSent(false);
    setChars(0);
  };

  if (sent) {
    return (
      <motion.div className="form-card" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} role="status" style={{ textAlign: 'center', padding: 'clamp(36px, 6vw, 72px)' }}>
        <div className="card-ico" style={{ margin: '0 auto 22px', width: 72, height: 72, borderRadius: '50%' }}><Icon name="check" width={32} height={32} /></div>
        <h3 className="h3" style={{ fontSize: '2rem', color: 'var(--wine-deep)' }}>¡Mensaje enviado!</h3>
        <p className="lead" style={{ margin: '14px auto 28px' }}>Gracias por contactar a INDUSECC. Te responderemos en un plazo máximo de 24 horas hábiles.</p>
        <button className="btn btn-line" type="button" onClick={reset}><span>Enviar otro mensaje</span></button>
      </motion.div>
    );
  }

  const err = (k: keyof Errors) => errors[k] && <span className="field-err">{errors[k]}</span>;

  return (
    <form ref={ref} className="form-card" onSubmit={submit} noValidate style={{ scrollMarginTop: 110 }}>
      <div className="stepbar" aria-hidden="true">
        {STEPS.map((s, i) => (
          <div key={s} className={i <= step ? 'is-on' : ''}><i /><span>{i + 1}. {s}</span></div>
        ))}
      </div>
      <div>
          <div className="form-grid two step-pane" hidden={step !== 0}>
            <div className={`field ${errors.nombre ? 'has-error' : ''}`}><label htmlFor="c-nombre">Nombre <i>*</i></label><input id="c-nombre" className="input" name="nombre" autoComplete="given-name" maxLength={80} />{err('nombre')}</div>
            <div className="field"><label htmlFor="c-apellidos">Apellidos</label><input id="c-apellidos" className="input" name="apellidos" autoComplete="family-name" maxLength={80} /></div>
            <div className={`field ${errors.email ? 'has-error' : ''}`}><label htmlFor="c-email">Correo electrónico <i>*</i></label><input id="c-email" className="input" type="email" name="email" autoComplete="email" maxLength={120} />{err('email')}</div>
            <div className={`field ${errors.tel ? 'has-error' : ''}`}><label htmlFor="c-tel">Teléfono <i>*</i></label><input id="c-tel" className="input" type="tel" name="tel" autoComplete="tel" maxLength={30} />{err('tel')}</div>
            <div className="field full"><label htmlFor="c-empresa">Empresa / organización</label><input id="c-empresa" className="input" name="empresa" autoComplete="organization" maxLength={120} /></div>
          </div>
          <div className="form-grid step-pane" hidden={step !== 1}>
            <div className={`field ${errors.servicio ? 'has-error' : ''}`}>
              <label htmlFor="c-servicio">¿En qué servicio estás interesado? <i>*</i></label>
              <select id="c-servicio" className="select" name="servicio" defaultValue="">
                <option value="" disabled>Selecciona un servicio…</option>
                <option>Certificación ISO (obtención del sello)</option>
                <option>Consultoría y asesoría en normatividad ISO</option>
                <option>Auditorías (ISO 9001, 14001, 45001…)</option>
                <option>Implementación de sistemas de gestión</option>
                <option>Capacitación y formación</option>
                <option>Transición ISO 37001:2025</option>
                <option>Diagnóstico inicial gratuito</option>
                <option>Otro / aún no lo sé</option>
              </select>
              {err('servicio')}
            </div>
            <div className="field">
              <span className="label">Norma(s) de interés</span>
              <div className="choice-grid">
                {['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 37001', 'ISO 50001', 'Otras'].map((n) => (
                  <label className="choice" key={n}><input type="checkbox" name="norma" value={n} /><span>{n}</span></label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="label">¿Cómo prefieres que te contactemos?</span>
              <div className="choice-grid">
                {['Correo', 'Llamada', 'WhatsApp'].map((n, i) => (
                  <label className="choice" key={n}><input type="radio" name="contactmethod" value={n} defaultChecked={i === 2} /><span>{n}</span></label>
                ))}
              </div>
            </div>
          </div>
          <div className="form-grid two step-pane" hidden={step !== 2}>
            <div className={`field full ${errors.mensaje ? 'has-error' : ''}`}>
              <label htmlFor="c-mensaje">¿Cómo te podemos ayudar? <i>*</i></label>
              <textarea id="c-mensaje" className="textarea" name="mensaje" maxLength={600} onChange={(e) => setChars(e.target.value.length)} />
              <span className="field-hint" style={{ textAlign: 'right' }}>{chars} / 600</span>
              {err('mensaje')}
            </div>
            <div className="field">
              <label htmlFor="c-empleados">Número de empleados</label>
              <select id="c-empleados" className="select" name="empleados" defaultValue="">
                <option value="">Selecciona…</option>
                <option>1 – 10</option><option>11 – 50</option><option>51 – 200</option><option>201 – 500</option><option>+ 500</option>
              </select>
            </div>
            <div className="field">
              <span className="label">Urgencia</span>
              <div className="choice-grid">
                {['Este mes', 'Estándar (4 meses)', 'Flexible (> 4 meses)'].map((n, i) => (
                  <label className="choice" key={n}><input type="radio" name="urgencia" value={n} defaultChecked={i === 1} /><span>{n}</span></label>
                ))}
              </div>
            </div>
          </div>
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1 }} />
      {failure && <div className="alert error" role="alert" style={{ marginTop: 20 }}>{failure}</div>}
      <div className="actions" style={{ marginTop: 28, justifyContent: 'space-between' }}>
        {step > 0 ? <button type="button" className="btn btn-line btn-sm" onClick={() => go(step - 1)}><span>Anterior</span></button> : <span />}
        <button type="submit" className="btn btn-wine" disabled={busy}>
          <span>{step < 2 ? 'Siguiente' : busy ? 'Enviando…' : 'Enviar solicitud'}</span>
          <span className="ico"><Icon name="arrow" /></span>
        </button>
      </div>
      <p className="field-hint" style={{ marginTop: 16 }}>Usamos tus datos solo para responder tu solicitud, conforme a la Ley Federal de Protección de Datos Personales.</p>
    </form>
  );
}
