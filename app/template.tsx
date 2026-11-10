import { Curtain } from '@/components/layout/Curtain';

export default function Template({ children }: { children: React.ReactNode }) {
  return <Curtain>{children}</Curtain>;
}
