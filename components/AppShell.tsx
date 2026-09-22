import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">{children}</div>
      <Footer />
      <BottomNav />
    </>
  );
}
