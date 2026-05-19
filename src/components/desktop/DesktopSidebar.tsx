import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const SPORTS = [
  { name: "Football", emoji: "⚽", count: 186 },
  { name: "Basketball", emoji: "🏀", count: 27 },
  { name: "Tennis", emoji: "🎾", count: 67 },
  { name: "Table Tennis", emoji: "🏓", count: 12 },
  { name: "Ice Hockey", emoji: "🏒", count: 8 },
  { name: "American Football", emoji: "🏈", count: 5 },
  { name: "Rugby", emoji: "🏉", count: 28 },
  { name: "Golf", emoji: "⛳", count: 9 },
  { name: "Darts", emoji: "🎯", count: 3 },
  { name: "Boxing", emoji: "🥊", count: 4 },
  { name: "Cricket", emoji: "🏏", count: 34 },
  { name: "Horse Racing", emoji: "🏇", count: 52 },
  { name: "Esports", emoji: "🎮", count: 15 },
  { name: "Baseball", emoji: "⚾", count: 6 },
];

interface DesktopSidebarProps {
  activeSport: string;
  onSportChange: (sport: string) => void;
}

const DesktopSidebar = ({ activeSport, onSportChange }: DesktopSidebarProps) => {
  const [search, setSearch] = useState("");

  const filtered = SPORTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "hsl(var(--card))" }}
    >
      {/* Search */}
      <div className="p-3 border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2"
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sports..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="px-3 py-2">
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          All Sports
        </span>
      </div>

      {/* Sport list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((sport) => {
          const isActive = activeSport === sport.name;
          return (
            <button
              key={sport.name}
              onClick={() => onSportChange(sport.name)}
              className="w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left group"
              style={{
                background: isActive ? "hsl(var(--primary) / 0.12)" : "transparent",
                borderRight: isActive ? "2px solid hsl(var(--primary))" : "2px solid transparent",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{
                  background: isActive ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))",
                }}
              >
                {sport.emoji}
              </div>
              <span
                className="flex-1 text-xs font-semibold truncate"
                style={{
                  color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {sport.name}
              </span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))",
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                }}
              >
                {sport.count}
              </span>
              <ChevronRight
                size={12}
                style={{ color: "hsl(var(--muted-foreground))", opacity: 0.5 }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default DesktopSidebar;
