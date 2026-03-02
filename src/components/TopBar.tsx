import { Bell, Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";

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
            {/* Crown mini icon */}
            <svg viewBox="0 0 220 160" className="w-7 h-5" fill="none">
              <defs>
                <linearGradient id="topGold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8960C" />
                  <stop offset="50%" stopColor="#F2D06B" />
                  <stop offset="100%" stopColor="#B8960C" />
                </linearGradient>
              </defs>
              <path d="M 25 125 Q 55 145 110 145 Q 165 145 195 125 L 175 105 Q 150 128 110 128 Q 70 128 45 105 Z" fill="url(#topGold)" />
              <path d="M 50 100 Q 30 65 55 30 Q 63 20 70 30 Q 85 58 65 95 Z" fill="url(#topGold)" />
              <path d="M 90 92 Q 85 40 110 5 Q 135 40 130 92 Z" fill="url(#topGold)" />
              <path d="M 155 95 Q 135 58 150 30 Q 157 20 165 30 Q 190 65 170 100 Z" fill="url(#topGold)" />
            </svg>
            <span className="text-lg font-bold tracking-[0.2em] uppercase leading-none" style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #B8960C, #D4AF37, #F2D06B, #D4AF37, #B8960C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>TSOGO</span>
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
