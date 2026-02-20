import { Bell, Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40" style={{
        background: "linear-gradient(180deg, hsl(0,0%,6%) 0%, hsl(0,0%,3%) 100%)",
      }}>
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Mini gold ring */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full" style={{
                border: "1.5px solid transparent",
                background: "linear-gradient(hsl(0,0%,6%), hsl(0,0%,6%)) padding-box, linear-gradient(135deg, hsl(43,60%,55%), hsl(43,35%,28%), hsl(43,60%,50%)) border-box",
              }} />
              <span className="text-[9px] font-black tracking-[0.1em] uppercase relative z-10" style={{
                background: "linear-gradient(135deg, hsl(43,55%,58%), hsl(43,40%,40%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>T</span>
            </div>
            <span className="text-lg font-black tracking-[0.18em] uppercase leading-none" style={{
              background: "linear-gradient(135deg, hsl(43,50%,58%), hsl(0,0%,55%), hsl(43,50%,50%))",
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
            <Link to="/deposit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg" style={{
              background: "linear-gradient(135deg, hsl(43,55%,45%), hsl(43,40%,32%))",
              color: "hsl(0,0%,4%)",
              boxShadow: "0 0 12px hsla(43,55%,48%,0.2)",
            }}>
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
