import type { Metadata, Viewport } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/layout/Preloader';
import { Providers } from '@/components/layout/Providers';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { JsonLd } from '@/components/ui/JsonLd';
import { SITE } from '@/lib/site';

const serif = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '500', '600', '700', '900'], variable: '--font-serif', display: 'swap' });
const sans = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'INDUSECC · Consultoría y certificación ISO en México', template: '%s | INDUSECC' },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['consultoría ISO', 'certificación ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001', 'auditoría interna', 'sistemas de gestión', 'CDMX', 'México'],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: SITE.locale, siteName: SITE.name, url: SITE.url },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = {
  themeColor: '#170507',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/brand/logo-square-1200.jpg`,
      image: `${SITE.url}/brand/logo-square-1200.jpg`,
      description: SITE.description,
      foundingDate: String(SITE.foundingYear),
      telephone: SITE.phone.tel,
      email: SITE.email,
      priceRange: '$$',
      address: { '@type': 'PostalAddress', addressLocality: 'Ciudad de México', addressRegion: 'CDMX', addressCountry: 'MX' },
      areaServed: { '@type': 'Country', name: 'México' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }],
      sameAs: [SITE.social.instagram, SITE.social.facebook],
      contactPoint: [
        { '@type': 'ContactPoint', telephone: SITE.phone.tel, contactType: 'sales', areaServed: 'MX', availableLanguage: 'es' },
        { '@type': 'ContactPoint', telephone: SITE.phone2.tel, contactType: 'customer service', areaServed: 'MX', availableLanguage: 'es' },
      ],
      knowsAbout: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 37001', 'ISO 50001', 'Auditoría interna', 'Sistemas de gestión'],
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, inLanguage: 'es-MX', publisher: { '@id': `${SITE.url}/#organization` } },
  ],
};

// Before paint: returning visitors in the same session get the short intro.
const preScript = `try{if(sessionStorage.getItem('ind-pre'))document.documentElement.classList.add('pre-quick')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${serif.variable} ${sans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preScript }} />
        <noscript>
          <style>{'#pre{display:none!important}'}</style>
        </noscript>
        <JsonLd data={orgLd} />
      </head>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <SmoothScroll />
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
