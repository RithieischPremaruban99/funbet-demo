import { Bell, MessageCircle, Plus, Search, Wallet, PaintBucket } from "lucide-react";
import { Link } from "react-router-dom";
import funbetLogo from "@/assets/funbet-logo.svg";
import { useBrandTheme } from "@/contexts/BrandThemeContext";

const NAV_ITEMS = [
  { label: "Feed", to: "/home", icon: "🏠" },
  { label: "Sports", to: "/sports", icon: "⚽" },
  { label: "Discovery", to: "/sports", icon: "🔍" },
  { label: "Casino", to: "/casino", icon: "🎰" },
  { label: "Peer-to-peer", to: "/social", icon: "👥" },
];

interface DesktopTopBarProps {
  activePath: string;
}

const DesktopTopBar = ({ activePath }: DesktopTopBarProps) => {
  const { theme, showPanel, setShowPanel } = useBrandTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 gap-3 border-b"
      style={{
        background: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
        fontFamily: "var(--font-display)",
      }}
    >
      {/* Logo */}
      <Link to="/home" className="flex items-center shrink-0 mr-4">
        {theme.logoUrl && theme.isApplied ? (
          <img src={theme.logoUrl} alt="Brand" className="h-10 object-contain" />
        ) : (
          <img src={funbetLogo} alt="FunBet" className="h-11 w-32 object-contain" />
        )}
      </Link>

      {/* Nav Items */}
      <nav className="flex items-center gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activePath === item.to || (item.to === "/sports" && activePath === "/sports");
          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap"
              style={{
                background: isActive ? "hsl(var(--primary) / 0.15)" : "transparent",
                color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                border: isActive ? "1px solid hsl(var(--primary) / 0.3)" : "1px solid transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
        <button
          className="p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          style={{ color: "hsl(var(--primary))" }}
        >
          <PaintBucket size={16} />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "hsl(var(--primary))" }}
        >
          <Plus size={18} style={{ color: "hsl(var(--primary-foreground))" }} />
        </button>
        <button
          className="relative p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(var(--destructive))" }}
          />
        </button>
        <button
          className="p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <MessageCircle size={16} />
        </button>
        <Link
          to="/deposit"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          <Wallet size={13} />
          <span>R12,500</span>
        </Link>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          TN
        </div>
      </div>
    </header>
  );
};

export default DesktopTopBar;
