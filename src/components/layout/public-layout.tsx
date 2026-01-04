import { Header } from './header';
import { Footer } from './footer';
import { QuickMenu } from './quick-menu';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <QuickMenu />
    </div>
  );
}
