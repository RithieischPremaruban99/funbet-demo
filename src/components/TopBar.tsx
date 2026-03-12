import { Bell, Search, Wallet, Paintbrush } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import goldenChanceLogo from "@/assets/golden-chance-logo.jpeg";

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
          <Link to="/" className="flex items-center gap-2.5">
            {theme.logoUrl && theme.isApplied ? (
              <img src={theme.logoUrl} alt="Brand logo" className="w-7 h-7 object-contain rounded" />
            ) : (
              <img src={goldenChanceLogo} alt="Golden Chance Lotto" className="w-8 h-8 object-contain rounded-full" />
            )}
            <span className="text-sm font-extrabold tracking-wide uppercase leading-none gold-text" style={{
              fontFamily: "var(--font-display)",
            }}>Golden Chance</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPanel(!showPanel)}
              className={`p-2 rounded-xl hover:bg-secondary transition-colors ${showPanel ? 'bg-secondary' : ''}`}
            >
              <Paintbrush size={18} className="text-primary" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Search size={18} className="text-primary" />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
              <Bell size={18} className="text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-live" />
            </button>
            <Link to="/deposit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-gold-shimmer red-gradient text-primary-foreground" style={{
              boxShadow: "0 0 12px hsl(var(--primary) / 0.15)",
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
