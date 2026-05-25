import { MercadoPagoConfig, Preference } from 'mercadopago';

const DEFAULT_BASE_PRICE = 3500;
const DEFAULT_PROMO_PRICE = 3000;
const DEFAULT_PROMO_CODES = ['OSESNA3000'];

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', chunk => {
      raw += chunk;
    });

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function cleanText(value, maxLength = 160) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

function getBaseUrl(req) {
  if ((process.env.SITE_URL || '').trim()) {
    return process.env.SITE_URL.trim().replace(/\/+$/, '');
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : (forwardedProto || '').split(',')[0].trim() || 'http';

  return `${proto}://${req.headers.host}`;
}

function getCoursePricingConfig() {
  const basePrice = Number(process.env.COURSE_BASE_PRICE) || DEFAULT_BASE_PRICE;
  const promoPrice = Number(process.env.COURSE_PROMO_PRICE) || DEFAULT_PROMO_PRICE;
  const promoCodes = (process.env.COURSE_PROMO_CODES || DEFAULT_PROMO_CODES.join(','))
    .split(',')
    .map(code => code.trim().toUpperCase())
    .filter(Boolean);

  return { basePrice, promoPrice, promoCodes };
}

function resolveCoursePrice(discountCode) {
  const { basePrice, promoPrice, promoCodes } = getCoursePricingConfig();
  const normalizedCode = cleanText(discountCode, 40).toUpperCase();
  const promoApplied = Boolean(normalizedCode && promoCodes.includes(normalizedCode));

  return {
    amount: promoApplied ? promoPrice : basePrice,
    basePrice,
    promoPrice,
    promoApplied
  };
}

function buildPreferenceBody(req, payload, amount) {
  const courseUrl = `${getBaseUrl(req)}/curso-interno/`;
  const now = new Date();
  const expirationTo = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const externalReference = `curso-interno-${Date.now()}`;

  const basePreference = {
    items: [
      {
        id: 'curso-auditor-interno-iso-9001-2015',
        title: 'Curso Auditor Interno ISO 9001:2015',
        description: 'Inscripcion al curso interno presencial de auditor interno bajo ISO 9001:2015',
        picture_url: `${getBaseUrl(req)}/Imagenes/auditoria.jpg`,
        category_id: 'services',
        quantity: 1,
        currency_id: 'MXN',
        unit_price: amount
      }
    ],
    payer: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone ? { number: payload.phone } : undefined
    },
    back_urls: {
      success: `${courseUrl}?payment_status=approved`,
      pending: `${courseUrl}?payment_status=pending`,
      failure: `${courseUrl}?payment_status=failure`
    },
    auto_return: 'approved',
    statement_descriptor: 'INDUSECC',
    external_reference: externalReference,
    payment_methods: {
      excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
      installments: 12
    },
    expires: true,
    expiration_date_from: now.toISOString(),
    expiration_date_to: expirationTo.toISOString()
  };

  const notificationUrl = cleanText(process.env.MERCADOPAGO_NOTIFICATION_URL || '', 300);
  if (notificationUrl) {
    basePreference.notification_url = notificationUrl;
  }

  return basePreference;
}

function validatePayload(payload) {
  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 120).toLowerCase();
  const phone = cleanText(payload.phone, 30);
  const profile = cleanText(payload.profile, 60);
  const discountCode = cleanText(payload.discountCode, 40).toUpperCase();
  const company = cleanText(payload.company, 120);
  const role = cleanText(payload.role, 120);
  const career = cleanText(payload.career, 120);
  const school = cleanText(payload.school, 120);
  const area = cleanText(payload.area, 120);
  const experience = cleanText(payload.experience, 120);
  const participants = cleanText(payload.participants, 40);

  if (!name || !email) {
    return { error: 'Nombre y correo son obligatorios.' };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { error: 'El correo no tiene un formato valido.' };
  }

  return {
    value: { name, email, phone, profile, discountCode, company, role, career, school, area, experience, participants }
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await readJsonBody(req);
    const pricing = resolveCoursePrice(payload.discountCode);

    if (payload.preview === true) {
      return res.status(200).json({
        amount: pricing.amount,
        basePrice: pricing.basePrice,
        promoPrice: pricing.promoPrice,
        promoApplied: pricing.promoApplied
      });
    }

    const accessToken = cleanText(process.env.MERCADOPAGO_ACCESS_TOKEN || '', 250);
    const publicKey = cleanText(process.env.MERCADOPAGO_PUBLIC_KEY || '', 250);

    if (!accessToken || !publicKey) {
      return res.status(503).json({
        error: 'Mercado Pago no esta configurado todavia. Agrega MERCADOPAGO_ACCESS_TOKEN y MERCADOPAGO_PUBLIC_KEY.'
      });
    }

    const validation = validatePayload(payload);

    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 }
    });

    const preferenceClient = new Preference(client);
    const preference = await preferenceClient.create({
      body: buildPreferenceBody(req, validation.value, pricing.amount),
      requestOptions: {
        idempotencyKey: `curso-interno-${Date.now()}`
      }
    });

    return res.status(200).json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
      publicKey,
      amount: pricing.amount,
      basePrice: pricing.basePrice,
      promoPrice: pricing.promoPrice,
      promoApplied: pricing.promoApplied,
      title: 'Curso Auditor Interno ISO 9001:2015'
    });
  } catch (error) {
    console.error('create-course-preference failed:', error);
    return res.status(502).json({
      error: error instanceof Error ? error.message : 'Mercado Pago request failed'
    });
  }
}
