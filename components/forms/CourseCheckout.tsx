'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import mpLogo from '@/public/cursos/mercado-pago.svg';
import { wa } from '@/lib/site';

/*
 * Checkout flow ported 1:1 from the original course page script:
 * same payload ({ name, email, phone, profile, discountCode }), same
 * /api/create-course-preference contract, same pre-opened tab + fallback link.
 */

type Msg = { type: 'info' | 'success' | 'warning' | 'error'; text: string } | null;

const formatPrice = (amount: number) => `$${amount.toLocaleString('es-MX')} MXN`;

export function CourseCheckout({ basePrice, promoPrice = 3000, programName }: { basePrice: number; promoPrice?: number; programName: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', profile: '', discountCode: '' });
  const [promoApplied, setPromoApplied] = useState(false);
  const [banner, setBanner] = useState<Msg>(null);
  const [mpMessage, setMpMessage] = useState<Msg>({ type: 'info', text: 'Completa el formulario y presiona Generar pago para abrir el checkout oficial.' });
  const [loading, setLoading] = useState<string | null>(null);
  const [fallback, setFallback] = useState('');
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get('payment_status');
    if (status === 'approved') setBanner({ type: 'success', text: 'Pago aprobado. Tu inscripción quedó registrada correctamente.' });
    else if (status === 'pending') setBanner({ type: 'info', text: 'Tu pago está pendiente de confirmación. Revisa tu correo o tu cuenta de Mercado Pago para el siguiente paso.' });
    else if (status === 'failure') setBanner({ type: 'error', text: 'El pago no se completó. Puedes volver a intentarlo desde esta misma sección.' });
    if (status) document.getElementById('inscripcion')?.scrollIntoView({ block: 'start' });
  }, []);

  const refreshPricePreview = async (discountCode: string) => {
    setPromoApplied(false);
    if (!discountCode.trim()) return;
    try {
      const response = await fetch('/api/create-course-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preview: true, discountCode: discountCode.trim() }),
      });
      const result = await response.json();
      if (!response.ok) return;
      setPromoApplied(Boolean(result.promoApplied));
    } catch {
      // Keep the published price if the preview is unavailable.
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (k === 'discountCode') {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => refreshPricePreview(v), 320);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      profile: form.profile.trim(),
      discountCode: form.discountCode.trim(),
    };
    if (!payload.name || !payload.phone || !payload.email) {
      setBanner({ type: 'error', text: 'Completa nombre, número y correo para continuar.' });
      return;
    }

    setBusy(true);
    setLoading('Creando tu acceso a Mercado Pago...');
    setBanner(null);
    setFallback('');
    setMpMessage({ type: 'info', text: 'Estamos generando tu checkout oficial. Si la nueva pestaña no aparece, te dejamos un enlace de respaldo.' });

    let checkoutWindow: Window | null = null;
    try {
      checkoutWindow = window.open('', '_blank');
      if (checkoutWindow) {
        try {
          checkoutWindow.opener = null;
          checkoutWindow.document.write('<!doctype html><title>Abriendo Mercado Pago...</title><p style="font-family:sans-serif;padding:24px">Abriendo checkout seguro...</p>');
          checkoutWindow.document.close();
        } catch {
          // If the browser limits writing, the window is just used as a container.
        }
      }

      const response = await fetch('/api/create-course-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No fue posible crear la preferencia de pago.');
      if (result.promoApplied) setPromoApplied(true);

      const checkoutUrl: string = result.initPoint || result.sandboxInitPoint || '';
      if (!checkoutUrl) throw new Error('No fue posible obtener el enlace de Mercado Pago.');
      setFallback(checkoutUrl);

      if (checkoutWindow) {
        checkoutWindow.location.href = checkoutUrl;
        checkoutWindow.focus?.();
        setMpMessage({ type: 'success', text: 'Se abrió el checkout oficial de Mercado Pago en una nueva pestaña.' });
      } else {
        setMpMessage({ type: 'warning', text: 'Tu navegador bloqueó la nueva pestaña. Usa el enlace de respaldo para abrir el checkout.' });
      }
    } catch (error) {
      if (checkoutWindow && !checkoutWindow.closed) checkoutWindow.close();
      const message = error instanceof Error ? error.message : 'Ocurrió un error al preparar el checkout.';
      setMpMessage({ type: 'error', text: message });
      setBanner({ type: 'error', text: message });
    } finally {
      setLoading(null);
      setBusy(false);
    }
  };

  const total = promoApplied ? promoPrice : basePrice;

  return (
    <div className="checkout">
      {banner && <div className={`alert ${banner.type === 'info' ? 'pending' : banner.type}`} role="status" style={{ gridColumn: '1 / -1' }}>{banner.text}</div>}

      <form className="form-card" onSubmit={submit} noValidate>
        <span className="eyebrow">Paso 1</span>
        <h3 className="h3" style={{ color: 'var(--wine-deep)', margin: '10px 0 6px' }}>Datos del participante</h3>
        <p className="field-hint" style={{ marginBottom: 22 }}>Ingresa tus datos de contacto para generar tu pago y abrir el checkout oficial.</p>
        <div className="form-grid two">
          <div className="field"><label htmlFor="studentName">Nombre <i>*</i></label><input id="studentName" className="input" autoComplete="name" value={form.name} onChange={update('name')} maxLength={80} placeholder="Tu nombre completo" /></div>
          <div className="field"><label htmlFor="studentPhone">Número / WhatsApp <i>*</i></label><input id="studentPhone" className="input" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} maxLength={30} placeholder="55 1234 5678" /></div>
          <div className="field full"><label htmlFor="studentEmail">Correo <i>*</i></label><input id="studentEmail" className="input" type="email" autoComplete="email" value={form.email} onChange={update('email')} maxLength={120} placeholder="ejemplo@correo.com" /></div>
          <div className="field">
            <label htmlFor="studentWhatIs">¿Qué es? (opcional)</label>
            <select id="studentWhatIs" className="select" value={form.profile} onChange={update('profile')}>
              <option value="">Selecciona una opción</option>
              <option>Estudiante</option>
              <option>Trabajador</option>
              <option>Representante / Empresa</option>
              <option>Emprendedor</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="discountCode">Código promocional (opcional)</label>
            <input id="discountCode" className="input" value={form.discountCode} onChange={update('discountCode')} maxLength={40} autoComplete="off" style={{ textTransform: 'uppercase' }} />
            {promoApplied && <span className="field-hint" style={{ color: '#1d5b2e' }}>✓ Código aplicado</span>}
          </div>
        </div>
        <p className="field-hint" style={{ marginTop: 18 }}>No capturamos tarjetas aquí. Al hacer clic en Generar pago abriremos el checkout oficial de Mercado Pago en una nueva pestaña.</p>
        <div className="actions" style={{ marginTop: 22 }}>
          <button className="btn btn-wine" type="submit" disabled={busy}><span>{busy ? 'Generando pago...' : 'Generar pago'}</span></button>
          <a className="btn btn-line btn-sm" href={wa(`Hola, quiero apoyo para inscribirme al curso de ${programName}.`)} target="_blank" rel="noopener noreferrer"><span>Apoyo por WhatsApp</span></a>
        </div>
      </form>

      <aside className="panel-dark checkout-summary" aria-live="polite">
        <span className="eyebrow">Paso 2 · Checkout oficial</span>
        <dl>
          <div><dt>Programa</dt><dd>{programName}</dd></div>
          <div><dt>Participante</dt><dd>{form.name.trim() || 'Pendiente de registro'}</dd></div>
          <div><dt>Perfil</dt><dd>{form.profile || 'Sin especificar'}</dd></div>
          <div className="total">
            <dt>Total</dt>
            <dd>
              {promoApplied && <s>{formatPrice(basePrice)}</s>}
              <b>{formatPrice(total)}</b>
              {promoApplied && <small>Código promocional aplicado</small>}
            </dd>
          </div>
        </dl>
        <div className="mp-row">
          <Image src={mpLogo} alt="Mercado Pago" height={28} style={{ width: 'auto' }} />
          <span>Visa · Mastercard · hasta 12 MSI</span>
        </div>
        {loading && <div className="alert pending" style={{ marginTop: 16 }}>{loading}</div>}
        {mpMessage && <div className={`alert ${mpMessage.type === 'info' ? 'pending' : mpMessage.type}`} style={{ marginTop: 16 }}>{mpMessage.text}</div>}
        {fallback && (
          <a className="btn btn-gold btn-sm" href={fallback} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
            <span>Abrir checkout en nueva ventana</span>
          </a>
        )}
      </aside>
    </div>
  );
}
