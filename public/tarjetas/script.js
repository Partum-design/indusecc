const people = {
  hector: {
    firstName: 'Héctor',
    lastName: 'Román',
    role: 'Consultor en INDUSECC',
    phone: '+52 5578485851',
    email: 'hector@indusecc.com.mx',
    file: 'hector-roman.vcf'
  },
  danna: {
    firstName: 'Danna',
    lastName: 'Rodríguez',
    role: 'CEO de INDUSECC',
    phone: '+52 5540152551',
    email: 'danna@indusecc.com.mx',
    file: 'danna-rodriguez.vcf'
  }
};

const person = people[document.body.dataset.person];
const toast = document.querySelector('#toast');
let toastTimer;

const escapeVCard = (value) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

function notify(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function downloadContact() {
  const fullName = `${person.firstName} ${person.lastName}`;
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(person.lastName)};${escapeVCard(person.firstName)};;;`,
    `FN:${escapeVCard(fullName)}`,
    'ORG:INDUSECC',
    `TITLE:${escapeVCard(person.role)}`,
    `TEL;TYPE=WORK,VOICE:${person.phone}`,
    `EMAIL;TYPE=WORK,INTERNET:${person.email}`,
    'URL:https://indusecc.com.mx/',
    'END:VCARD'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = person.file;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify('Contacto listo para guardarse en tu agenda.');
}

document.querySelector('#saveContact').addEventListener('click', downloadContact);

document.querySelector('#shareCard').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${person.firstName} ${person.lastName} · INDUSECC`,
        text: `${person.firstName} ${person.lastName} — ${person.role}`,
        url: window.location.href
      });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(window.location.href);
    notify('Enlace de la tarjeta copiado.');
  } catch {
    notify('Copia el enlace desde la barra del navegador.');
  }
});
