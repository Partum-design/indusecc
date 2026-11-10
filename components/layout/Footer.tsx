import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/brand/logo.png';
import { SERVICES, SITE } from '@/lib/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../ui/Icon';

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Image src={logo} alt="INDUSECC" sizes="130px" />
            <p>Consultoría, implementación, auditoría y certificación ISO en México. Desde {SITE.foundingYear}, elevando la calidad de las empresas.</p>
            <div className="soc">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de INDUSECC"><InstagramIcon /></a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de INDUSECC"><FacebookIcon /></a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de INDUSECC"><WhatsAppIcon /></a>
            </div>
          </div>
          <div>
            <h4>Navegación</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/servicios#portafolio">Capacitación empresarial</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
              ))}
              <li><Link href="/auditorias/formulario">Diagnóstico de auditoría</Link></li>
            </ul>
          </div>
          <div className="ftr-contact">
            <h4>Contacto</h4>
            <a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display} · Ing. Danna</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone2.tel}`}>{SITE.phone2.display} · Lic. Erick</a>
            <a href={`mailto:${SITE.email2}`}>{SITE.email2}</a>
            <span>{SITE.city} · {SITE.hours}</span>
            <a href={SITE.brochure} target="_blank" rel="noopener noreferrer">Descargar brochure corporativo ↗</a>
          </div>
        </div>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} <b>INDUSECC</b>. Todos los derechos reservados.</span>
          <span>Excelencia en gestión industrial y normativa · Hecho en México</span>
        </div>
      </div>
      <div className="fit wordmark ftr-giant" aria-hidden="true">
        <span>INDUSECC</span>
      </div>
    </footer>
  );
}
