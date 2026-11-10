const cardData = {
  hector: {
    firstName: 'Héctor',
    lastName: 'Román',
    role: 'Consultor en INDUSECC',
    phone: '+52 5578485851',
    email: 'hector@indusecc.com.mx',
    slug: 'hector-roman'
  },
  danna: {
    firstName: 'Danna',
    lastName: 'Rodríguez',
    role: 'CEO de INDUSECC',
    phone: '+52 5540152551',
    email: 'danna@indusecc.com.mx',
    slug: 'danna-rodriguez'
  }
};

const page = document.body.dataset.person;
const person = cardData[page];
const toast = document.querySelector('#toast');
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function vCardEscape(value) {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

function createVCard() {
  const fullName = `${person.firstName} ${person.lastName}`;
  const pageUrl = window.location.href.split('#')[0];

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vCardEscape(person.lastName)};${vCardEscape(person.firstName)};;;`,
    `FN:${vCardEscape(fullName)}`,
    `ORG:INDUSECC`,
    `TITLE:${vCardEscape(person.role)}`,
    `TEL;TYPE=WORK,VOICE:${person.phone}`,
    `EMAIL;TYPE=WORK,INTERNET:${person.email}`,
    `URL:${pageUrl}`,
    'END:VCARD'
  ].join('\r\n');
}

document.querySelector('#saveContact')?.addEventListener('click', () => {
  if (!person) return;
  const blob = new Blob([createVCard()], { type: 'text/vcard;charset=utf-8' });
  const download = document.createElement('a');
  download.href = URL.createObjectURL(blob);
  download.download = `${person.slug}.vcf`;
  document.body.appendChild(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(download.href), 1000);
  showToast('Contacto listo para guardar en tu agenda.');
});

document.querySelector('#shareCard')?.addEventListener('click', async () => {
  const shareData = {
    title: `${person.firstName} ${person.lastName} · INDUSECC`,
    text: `${person.firstName} ${person.lastName} — ${person.role}`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast('Enlace de la tarjeta copiado.');
  } catch {
    showToast('Copia este enlace desde la barra del navegador.');
  }
});

const canvas = document.querySelector('#ambientCanvas');
const context = canvas?.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointer = { x: .5, y: .5 };
const particles = [];

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function seedParticles() {
  const count = Math.min(90, Math.floor(window.innerWidth / 16));
  particles.length = 0;
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + .2,
      alpha: Math.random() * .55 + .1,
      drift: Math.random() * .26 + .04,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function paint(time = 0) {
  if (!context || !canvas) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  context.clearRect(0, 0, width, height);

  for (const particle of particles) {
    const movement = reduceMotion ? 0 : Math.sin(time * .00035 * particle.drift + particle.phase) * 6;
    const x = particle.x + (pointer.x - .5) * 14;
    const y = particle.y + movement + (pointer.y - .5) * 10;
    context.beginPath();
    context.fillStyle = `rgba(232, 201, 122, ${particle.alpha})`;
    context.arc(x, y, particle.radius, 0, Math.PI * 2);
    context.fill();
  }

  if (!reduceMotion) window.requestAnimationFrame(paint);
}

window.addEventListener('resize', () => { resizeCanvas(); seedParticles(); });
window.addEventListener('pointermove', (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
}, { passive: true });

if (canvas && context) {
  resizeCanvas();
  seedParticles();
  paint();
}
