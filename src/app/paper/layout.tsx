import { SlantProvider } from '@/lib/slant-context';
import { MobileBottomDock } from '@/components/paper/MobileBottomDock';

export default function PaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SlantProvider>
      <div className="pb-20 sm:pb-0">{children}</div>
      <MobileBottomDock />
    </SlantProvider>
  );
}
