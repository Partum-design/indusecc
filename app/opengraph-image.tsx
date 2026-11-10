import { ImageResponse } from 'next/og';

export const alt = 'INDUSECC · Consultoría y certificación ISO en México';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MARK = [
  { d: 'M965 270 1082 338 865 482 486 700 487 1254 850 1462 1087 1612 967 1682 354 1332 353 624Z', f: '#ffffff' },
  { d: 'M1095 345 1578 622 1579 1330 1102 1605 1101 1452 1446 1253 1445 698 1095 497Z', f: '#C9A84C' },
  { d: 'M854 521 1065 384 1065 596 854 711Z', f: '#ffffff' },
  { d: 'M854 802 1066 697 1073 1568 855 1433Z', f: '#ffffff' },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: 'linear-gradient(135deg, #170507 0%, #2b080b 55%, #4a0f13 100%)', color: '#fff', padding: 72, fontFamily: 'serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 8, color: '#C9A84C' }}>INDUSECC · DESDE 2014</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -2 }}>Soluciones que</div>
            <div style={{ fontSize: 84, lineHeight: 1.02, color: '#E8C97A', fontStyle: 'italic' }}>elevan tu empresa.</div>
            <div style={{ marginTop: 28, fontSize: 28, color: 'rgba(255,255,255,.75)', fontFamily: 'sans-serif' }}>Consultoría, auditoría y certificación ISO en México</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 22, fontFamily: 'sans-serif', color: 'rgba(255,255,255,.8)' }}>
            {['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001'].map((t) => (
              <div key={t} style={{ display: 'flex', border: '1px solid rgba(201,168,76,.5)', borderRadius: 999, padding: '8px 20px' }}>{t}</div>
            ))}
          </div>
        </div>
        <svg width="300" height="345" viewBox="340 260 1250 1435" style={{ alignSelf: 'center' }}>
          {MARK.map((p) => <path key={p.d} d={p.d} fill={p.f} />)}
        </svg>
      </div>
    ),
    size,
  );
}
