import { Bell, Search, Wallet, Paintbrush, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import brandLogo from "@/assets/fireplay-logo.png";

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, showPanel, setShowPanel } = useBrandTheme();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        background: "hsl(var(--background))",
        borderBottom: "1px solid hsl(var(--border))",
      }}>
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex items-center gap-2">
            {theme.logoUrl && theme.isApplied ? (
              <img src={theme.logoUrl} alt="Brand logo" className="h-12 object-contain" />
            ) : (
              <>
                <img src={brandLogo} alt="FirePlay" className="h-10 w-10 object-contain" />
                <span className="font-display font-extrabold text-lg tracking-wide leading-none">
                  <span className="red-text">FIRE</span>
                  <span className="text-foreground">PLAY</span>
                </span>
              </>
            )}
          </Link>
          <div className="flex items-center gap-1.5">
            <Link to="/rewards" className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, hsla(0,85%,42%,0.15), hsla(45,100%,50%,0.1))",
                border: "1px solid hsla(0,85%,42%,0.3)",
                boxShadow: "0 0 10px hsla(0,85%,42%,0.1)",
              }}
            >
              <Crown size={14} className="text-primary" />
              <span className="text-primary">Gamification</span>
            </Link>
            <button
              onClick={() => setShowPanel(!showPanel)}
              className={`p-2 rounded-xl hover:bg-secondary/20 transition-colors ${showPanel ? 'bg-secondary/20' : ''}`}
            >
              <Paintbrush size={18} className="text-primary" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary/20 transition-colors"
            >
              <Search size={18} className="text-primary" />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary/20 transition-colors relative">
              <Bell size={18} className="text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse-live" />
            </button>
            <Link to="/deposit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-gold-shimmer red-gradient text-primary-foreground" style={{
              boxShadow: "0 0 12px hsl(var(--primary) / 0.15)",
            }}>
              <Wallet size={14} />
              <span>R12,500</span>
            </Link>
          </div>
        </div>
      </header>
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default TopBar;
