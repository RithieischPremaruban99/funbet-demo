import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";
import PageTransition from "./PageTransition";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
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
