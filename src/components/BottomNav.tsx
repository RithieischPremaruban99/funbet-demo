import { NavLink, useLocation } from "react-router-dom";
import { Home, Trophy, Gamepad2, Gift, User } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Accueil" },
  { to: "/sports", icon: Trophy, label: "Sports" },
  { to: "/casino", icon: Gamepad2, label: "Casino" },
  { to: "/promotions", icon: Gift, label: "Promos" },
  { to: "/account", icon: User, label: "Compte" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "gold-gradient glow-gold" : ""}`}>
                <Icon
                  size={20}
                  className={`transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
