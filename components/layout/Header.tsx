'use client';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo from '@/public/brand/logo.png';
import { NAV, SERVICES, SITE, wa } from '@/lib/site';
import { Icon } from '../ui/Icon';

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > last && y > 480);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const inServices = SERVICES.some((s) => pathname.startsWith(s.href)) || pathname.startsWith('/servicios');

  return (
    <>
      <header className={`hdr ${scrolled || open ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="hdr-in">
          <Link className="hdr-logo" href="/" aria-label="INDUSECC, ir al inicio">
            <Image src={logo} alt="INDUSECC" priority sizes="120px" />
          </Link>

          <nav className="nav" aria-label="Principal">
            {NAV.map((item) =>
              item.href === '/servicios' ? (
                <div key={item.href} className={`nav-dd ${inServices ? 'is-active' : ''}`}>
                  <Link href="/servicios" className="nav-dd-link">
                    Servicios
                    <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
                  </Link>
                  <div className="mega">
                    <div className="mega-in">
                      {SERVICES.map((s) => (
                        <Link key={s.href} href={s.href}>
                          <b>{s.n}</b>
                          <strong>{s.label}</strong>
                          <small>{s.desc}</small>
                        </Link>
                      ))}
                      <Link className="mega-all" href="/servicios">
                        Ver todos los servicios y el autodiagnóstico gratuito <Icon name="arrow" width={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? 'is-active' : ''} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hdr-cta">
            <a className="hdr-phone" href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
            <Link className="btn btn-gold btn-sm" href="/contacto">
              <span>Consulta gratuita</span>
            </Link>
            <button className="burger" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((o) => !o)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mnav"
            className="mnav"
            aria-label="Menú móvil"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mnav-links">
              {NAV.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }}>
                  <Link href={item.href} className={isActive(item.href) ? 'is-active' : ''}>
                    <small>0{i + 1}</small>
                    {item.label}
                  </Link>
                  {item.href === '/servicios' && (
                    <div className="mnav-sub">
                      {SERVICES.map((s) => (
                        <Link key={s.href} href={s.href}>{s.short}</Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div className="mnav-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="actions">
                <Link className="btn btn-gold btn-sm" href="/contacto"><span>Consulta gratuita</span></Link>
                <a className="btn btn-wa btn-sm" href={wa()} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span></a>
              </div>
              <div className="mnav-contact">
                <a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <span>{SITE.city}</span>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
