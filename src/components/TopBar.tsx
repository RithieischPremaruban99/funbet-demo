import { Bell, Search, Wallet, Paintbrush } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import { useBrandTheme } from "@/contexts/BrandThemeContext";

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        background: "#000000",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
      }}>
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Wazobet lightning bolt icon */}
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
              <defs>
                <linearGradient id="topBolt" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2D06B" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8960C" />
                </linearGradient>
              </defs>
              <path d="M18 2L6 18h8l-2 12 12-16h-8l2-12z" fill="url(#topBolt)" />
            </svg>
            <span className="text-lg font-black tracking-[0.05em] uppercase leading-none" style={{
              fontFamily: "'Inter', 'Arial Black', sans-serif",
              background: "linear-gradient(135deg, #F2D06B, #D4AF37, #B8960C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>WAZOBET</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Search size={18} style={{ color: "#D4AF37" }} />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
              <Bell size={18} style={{ color: "#D4AF37" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-live" />
            </button>
            <Link to="/deposit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-gold-shimmer" style={{
              background: "linear-gradient(135deg, #B8960C, #D4AF37, #F2D06B, #D4AF37, #B8960C)",
              color: "#000000",
              boxShadow: "0 0 12px rgba(212,175,55,0.15)",
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
