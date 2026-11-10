'use client';
import { useState } from 'react';
import { WhatsAppIcon } from '../ui/Icon';

const OCCUPATIONS = ['Coordinación de calidad', 'Ingeniería industrial', 'Supervisión de procesos', 'Consultoría', 'Manufactura', 'Logística', 'Administración', 'Estudiante', 'Seguridad e higiene', 'Auditoría interna'];
const EDUCATION = ['Secundaria', 'Bachillerato', 'Técnico', 'Licenciatura', 'Especialidad', 'Maestría', 'Doctorado'];

/** Collects a short profile and hands it off to WhatsApp (nothing is stored on our servers). */
export function ParticipantProfile({ waNumber, program }: { waNumber: string; program: string }) {
  const [p, setP] = useState({ name: '', occupation: '', education: '' });
  const msg = `Hola, quiero orientación sobre el curso de ${program}.\n\n• Nombre: ${p.name || '–'}\n• Ocupación: ${p.occupation || '–'}\n• Último nivel de estudios: ${p.education || '–'}`;
  return (
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); window.open(`${waNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener'); }}>
      <div className="form-grid">
        <div className="field"><label htmlFor="pName">Nombre</label><input id="pName" className="input" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} maxLength={80} autoComplete="name" /></div>
        <div className="field">
          <label htmlFor="pOcc">¿A qué te dedicas?</label>
          <input id="pOcc" className="input" list="occupationOptions" value={p.occupation} onChange={(e) => setP({ ...p, occupation: e.target.value })} maxLength={80} placeholder="Escribe tu ocupación o área" />
          <datalist id="occupationOptions">{OCCUPATIONS.map((o) => <option key={o} value={o} />)}</datalist>
        </div>
        <div className="field">
          <label htmlFor="pEdu">Último nivel de estudios</label>
          <select id="pEdu" className="select" value={p.education} onChange={(e) => setP({ ...p, education: e.target.value })}>
            <option value="">Selecciona una opción</option>
            {EDUCATION.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn-wa" type="submit" style={{ marginTop: 24 }}><span>Recibir orientación por WhatsApp</span><span className="ico"><WhatsAppIcon /></span></button>
      <p className="field-hint" style={{ marginTop: 14 }}>Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
    </form>
  );
}
