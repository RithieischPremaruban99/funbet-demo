import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";
import PageTransition from "./PageTransition";
import DesktopLayout from "./desktop/DesktopLayout";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  // Desktop: BetCorrect-style 3-column web layout
  if (!isMobile) {
    return <DesktopLayout>{children}</DesktopLayout>;
  }

  // Mobile: existing layout unchanged
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <TopBar />
      <PageTransition>
        <main className="pb-20 pt-20">
          {children}
        </main>
      </PageTransition>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
