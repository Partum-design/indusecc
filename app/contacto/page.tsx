import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/motion/Reveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { Icon, InstagramIcon, FacebookIcon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/ui/JsonLd';
import { photos } from '@/lib/photos';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { SITE, wa } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contacto: agenda tu consulta ISO gratuita',
  description: 'Contacta a INDUSECC en CDMX: 55 4015 2551 · danna@indusecc.com.mx. Te respondemos en menos de 24 horas con una propuesta personalizada de consultoría, auditoría o certificación ISO.',
  path: '/contacto',
  image: photos.avenueNight,
});

const CHANNELS = [
  { href: `tel:${SITE.phone.tel}`, icon: 'phone' as const, k: 'Ing. Danna Rodríguez', v: '+52 55 4015 2551' },
  { href: `mailto:${SITE.email}`, icon: 'mail' as const, k: 'Correo · Dirección', v: SITE.email },
  { href: `tel:${SITE.phone2.tel}`, icon: 'phone' as const, k: 'Lic. Erick', v: '+52 56 1604 4547' },
  { href: `mailto:${SITE.email2}`, icon: 'mail' as const, k: 'Correo · Comercial', v: SITE.email2 },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: 'Inicio', path: '/' }, { name: 'Contacto', path: '/contacto' }]),
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contacto INDUSECC', url: `${SITE.url}/contacto`, about: { '@id': `${SITE.url}/#organization` } },
        ]}
      />
      <PageHero
        image={photos.avenueNight}
        imagePosition="center 60%"
        crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]}
        eyebrow="Estamos para ti"
        title={['Ponte en', <><em>contacto.</em></>]}
        lead="Cuéntanos qué necesitas en consultoría y auditoría ISO. Te respondemos en menos de 24 horas con una propuesta personalizada."
        actions={
          <>
            <Button href="#formulario">Escribir mensaje</Button>
            <Button href={wa()} variant="wa" icon="whatsapp">WhatsApp</Button>
          </>
        }
        facts={[
          { value: '24 h', label: 'tiempo máximo de respuesta' },
          { value: 'L–V', label: '9:00 – 18:00 h, hora del centro' },
          { value: 'MX', label: 'cobertura en toda la República' },
        ]}
      />

      <section className="section paper" id="formulario">
        <div className="wrap sticky-split">
          <div className="sticky">
            <Reveal><span className="eyebrow">Información</span></Reveal>
            <SplitLines className="h2" lines={['Hablemos', <><em>hoy mismo.</em></>]} />
            <Reveal delay={0.1}>
              <p className="lead" style={{ margin: '20px 0 28px' }}>Escríbenos por el canal que prefieras. Para urgencias, WhatsApp es la vía más rápida.</p>
            </Reveal>
            <div className="contact-cards">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.v} delay={0.1 + i * 0.06}>
                  <a className="contact-card" href={c.href}>
                    <span className="ci"><Icon name={c.icon} /></span>
                    <span><small>{c.k}</small><b>{c.v}</b></span>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={0.35}>
                <div className="contact-card">
                  <span className="ci"><Icon name="pin" /></span>
                  <span><small>Ubicación</small><b>Ciudad de México · servicio en todo el país</b></span>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <div className="soc" style={{ marginTop: 22 }}>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--wine)', borderColor: 'var(--line)' }}><InstagramIcon /></a>
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--wine)', borderColor: 'var(--line)' }}><FacebookIcon /></a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div style={{ marginBottom: 22 }}>
              <span className="eyebrow">Formulario</span>
              <h2 className="h3" style={{ fontSize: 'clamp(1.6rem, 1.2rem + 1.2vw, 2.3rem)', marginTop: 12, color: 'var(--wine-deep)' }}>Cuéntanos sobre tu proyecto</h2>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
