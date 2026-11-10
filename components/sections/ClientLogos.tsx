import Image from 'next/image';
import cuvasa from '@/public/clients/cuvasa.png';
import efficient from '@/public/clients/efficient-plastic.png';
import leobe from '@/public/clients/grupo-leobe.png';
import lad from '@/public/clients/lad-laboratorios.jpg';
import { Marquee } from '../motion/Marquee';

export const CLIENTS = [
  { src: leobe, name: 'Grupo Leobe', country: 'México' },
  { src: lad, name: 'LAD Laboratorios', country: 'México' },
  { src: cuvasa, name: 'Cuvasa Industrial', country: 'México' },
  { src: efficient, name: 'Efficient Plastic', country: 'USA' },
];

export function ClientLogos() {
  return (
    <section className="clients" aria-label="Empresas que confían en INDUSECC">
      <div className="wrap clients-in">
        <p className="clients-label">Empresas que<b>confían en nosotros</b></p>
        <div className="clients-view">
          <Marquee duration={30}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <Image key={i} src={c.src} alt={c.name} sizes="170px" />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
