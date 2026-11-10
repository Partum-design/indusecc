import { wa } from '@/lib/site';
import { WhatsAppIcon } from '../ui/Icon';

export function WhatsAppFab({ text }: { text?: string }) {
  return (
    <a className="wa-fab" href={wa(text)} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
