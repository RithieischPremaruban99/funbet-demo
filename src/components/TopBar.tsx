import { Bell, Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[hsl(0,0%,7%)] to-[hsl(0,0%,4%)] border-b border-border/60">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-black tracking-[0.12em] uppercase leading-none" style={{
              background: "linear-gradient(180deg, hsl(0,0%,65%) 0%, hsl(0,0%,38%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>TSOGO</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Search size={18} className="text-muted-foreground" />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-live" />
            </button>
            <Link to="/deposit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl orange-gradient text-highlight-foreground text-xs font-bold shadow-lg glow-orange">
              <Wallet size={14} />
              <span>$1,250</span>
            </Link>
          </div>
        </div>
      </header>
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default TopBar;
