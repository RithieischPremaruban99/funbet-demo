import { NavLink, useLocation } from "react-router-dom";
import { Home, Trophy, Gamepad2, Compass, User } from "lucide-react";

const tabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/sports", icon: Trophy, label: "Sports" },
  { to: "/casino", icon: Gamepad2, label: "Casino" },
  { to: "/social", icon: Compass, label: "Social" },
  { to: "/account", icon: User, label: "Account" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" style={{
      background: "hsl(0, 20%, 6%)",
      borderTop: "1px solid hsl(0, 12%, 20%)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    }}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200`}
                style={isActive ? {
                  background: "hsl(0, 65%, 47%)",
                  boxShadow: "0 0 12px hsla(0,65%,47%,0.3)",
                } : {}}
              >
                <Icon
                  size={20}
                  style={{ color: isActive ? "#FFFFFF" : "hsl(224, 15%, 55%)" }}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span className="text-[10px] font-semibold transition-colors"
                style={{ color: isActive ? "#F9A825" : "hsl(224, 15%, 55%)" }}
              >
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
