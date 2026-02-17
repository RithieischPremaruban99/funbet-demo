import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <TopBar />
      <main className="pb-20 pt-14">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
