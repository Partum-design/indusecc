import { MercadoPagoConfig, Preference } from 'mercadopago';
import { cleanText, clientIp, json, rateLimit, sameOrigin } from '@/lib/security';

// Pricing and the Mercado Pago preference are unchanged from the original
// /api/create-course-preference endpoint; only input hardening was added.
const DEFAULT_BASE_PRICE = 3500;
const DEFAULT_PROMO_PRICE = 3000;
const DEFAULT_PROMO_CODES = ['OSESNA3000'];
const MAX_BODY = 8 * 1024;

export const runtime = 'nodejs';

function getBaseUrl(req: Request) {
  const env = (process.env.SITE_URL || '').trim();
  if (env) return env.replace(/\/+$/, '');
  const proto = (req.headers.get('x-forwarded-proto') || 'https').split(',')[0].trim();
  return `${proto}://${req.headers.get('host')}`;
}

function getCoursePricingConfig() {
  const basePrice = Number(process.env.COURSE_BASE_PRICE) || DEFAULT_BASE_PRICE;
  const promoPrice = Number(process.env.COURSE_PROMO_PRICE) || DEFAULT_PROMO_PRICE;
  const promoCodes = (process.env.COURSE_PROMO_CODES || DEFAULT_PROMO_CODES.join(','))
    .split(',')
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean);
  return { basePrice, promoPrice, promoCodes };
}

function resolveCoursePrice(discountCode: unknown) {
  const { basePrice, promoPrice, promoCodes } = getCoursePricingConfig();
  const normalizedCode = cleanText(discountCode, 40).toUpperCase();
  const promoApplied = Boolean(normalizedCode && promoCodes.includes(normalizedCode));
  return { amount: promoApplied ? promoPrice : basePrice, basePrice, promoPrice, promoApplied };
}

type Payload = { name: string; email: string; phone: string; profile: string };

function validatePayload(p: Record<string, unknown>): { error: string } | { value: Payload } {
  const name = cleanText(p.name, 80);
  const email = cleanText(p.email, 120).toLowerCase();
  const phone = cleanText(p.phone, 30);
  const profile = cleanText(p.profile, 60);
  if (!name || !email) return { error: 'Nombre y correo son obligatorios.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'El correo no tiene un formato valido.' };
  return { value: { name, email, phone, profile } };
}

function buildPreferenceBody(req: Request, payload: Payload, amount: number) {
  const base = getBaseUrl(req);
  const courseUrl = `${base}/curso-interno/`;
  const now = new Date();
  const expirationTo = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const body: Record<string, unknown> = {
    items: [
      {
        id: 'curso-auditor-interno-iso-9001-2015',
        title: 'Curso Auditor Interno ISO 9001:2015',
        description: 'Inscripcion al curso interno presencial de auditor interno bajo ISO 9001:2015',
        picture_url: `${base}/brand/logo-square-1200.jpg`,
        category_id: 'services',
        quantity: 1,
        currency_id: 'MXN',
        unit_price: amount,
      },
    ],
    payer: { name: payload.name, email: payload.email, phone: payload.phone ? { number: payload.phone } : undefined },
    back_urls: {
      success: `${courseUrl}?payment_status=approved`,
      pending: `${courseUrl}?payment_status=pending`,
      failure: `${courseUrl}?payment_status=failure`,
    },
    auto_return: 'approved',
    statement_descriptor: 'INDUSECC',
    external_reference: `curso-interno-${Date.now()}`,
    payment_methods: { excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }], installments: 12 },
    expires: true,
    expiration_date_from: now.toISOString(),
    expiration_date_to: expirationTo.toISOString(),
  };
  const notificationUrl = cleanText(process.env.MERCADOPAGO_NOTIFICATION_URL || '', 300);
  if (notificationUrl) body.notification_url = notificationUrl;
  return body;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Origen no permitido.' }, 403);
  if (!rateLimit(`mp:${clientIp(req)}`, 20, 10 * 60 * 1000)) return json({ error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' }, 429);

  let payload: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return json({ error: 'Solicitud demasiado grande.' }, 413);
    payload = raw ? JSON.parse(raw) : {};
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('bad');
  } catch {
    return json({ error: 'Solicitud invalida.' }, 400);
  }

  const pricing = resolveCoursePrice(payload.discountCode);
  if (payload.preview === true) {
    return json({ amount: pricing.amount, basePrice: pricing.basePrice, promoPrice: pricing.promoPrice, promoApplied: pricing.promoApplied });
  }

  const accessToken = cleanText(process.env.MERCADOPAGO_ACCESS_TOKEN || '', 250);
  const publicKey = cleanText(process.env.MERCADOPAGO_PUBLIC_KEY || '', 250);
  if (!accessToken || !publicKey) {
    return json({ error: 'Mercado Pago no esta configurado todavia. Agrega MERCADOPAGO_ACCESS_TOKEN y MERCADOPAGO_PUBLIC_KEY.' }, 503);
  }

  const validation = validatePayload(payload);
  if ('error' in validation) return json({ error: validation.error }, 400);

  try {
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
    const preference = await new Preference(client).create({
      body: buildPreferenceBody(req, validation.value, pricing.amount) as never,
      requestOptions: { idempotencyKey: `curso-interno-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
    });
    return json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
      publicKey,
      amount: pricing.amount,
      basePrice: pricing.basePrice,
      promoPrice: pricing.promoPrice,
      promoApplied: pricing.promoApplied,
      title: 'Curso Auditor Interno ISO 9001:2015',
    });
  } catch (error) {
    console.error('create-course-preference failed:', error);
    return json({ error: 'No fue posible conectar con Mercado Pago. Intenta de nuevo o escribenos por WhatsApp.' }, 502);
  }
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
}
