import { Bell, Search, Wallet } from "lucide-react";

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-1">
          <span className="text-lg font-display font-bold gold-text tracking-wide">PARTOUCHE</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <Search size={18} className="text-muted-foreground" />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
            <Bell size={18} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-live animate-pulse-live" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl gold-gradient text-primary-foreground text-xs font-semibold">
            <Wallet size={14} />
            <span>250€</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
