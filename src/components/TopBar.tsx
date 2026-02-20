import { Bell, Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40" style={{
        background: "linear-gradient(180deg, hsl(220,30%,14%) 0%, hsl(220,30%,10%) 100%)",
      }}>
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Mini gold ring */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full" style={{
                border: "1.5px solid transparent",
                background: "linear-gradient(hsl(220,30%,14%), hsl(220,30%,14%)) padding-box, linear-gradient(135deg, hsl(40,65%,60%), hsl(40,40%,35%), hsl(40,65%,55%)) border-box",
              }} />
              <span className="text-[9px] font-black tracking-[0.1em] uppercase relative z-10" style={{
                background: "linear-gradient(135deg, hsl(40,60%,62%), hsl(40,45%,42%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>T</span>
            </div>
            <span className="text-lg font-black tracking-[0.18em] uppercase leading-none" style={{
              background: "linear-gradient(135deg, hsl(40,60%,62%), hsl(40,40%,45%), hsl(40,60%,55%))",
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
              background: "linear-gradient(135deg, hsl(40,60%,55%), hsl(40,45%,38%))",
              color: "hsl(220,30%,10%)",
              boxShadow: "0 0 12px hsla(40,55%,55%,0.2)",
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
