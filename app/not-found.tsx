import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <div className="fit" style={{ maxWidth: 560, margin: '0 auto', ['--k' as string]: '36cqi' }} aria-hidden="true">
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,191,76,.7)', fontStretch: '125%' }}>404</span>
        </div>
        <h1 className="h2" style={{ margin: '10px 0 16px' }}>Esta página <em style={{ color: 'var(--gold-light)' }}>no existe.</em></h1>
        <p className="lead on-dark" style={{ margin: '0 auto 30px' }}>Puede que el enlace haya cambiado. Te llevamos de vuelta a lo importante.</p>
        <div className="actions" style={{ justifyContent: 'center' }}>
          <Link className="btn btn-gold" href="/"><span>Ir al inicio</span></Link>
          <Link className="btn btn-ghost" href="/servicios"><span>Ver servicios</span></Link>
        </div>
      </div>
    </section>
  );
}
