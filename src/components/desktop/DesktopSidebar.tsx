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
    <aside style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "hsl(var(--card))" }}>
      {/* Search */}
      <div style={{ flexShrink: 0, padding: 12, borderBottom: "1px solid hsl(var(--border))" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={13}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sports..."
            style={{
              width: "100%",
              paddingLeft: 30,
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 8,
              fontSize: 12,
              outline: "none",
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div style={{ flexShrink: 0, padding: "8px 12px" }}>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted-foreground))" }}>
          All Sports
        </span>
      </div>

      {/* Sport list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map((sport) => {
          const isActive = activeSport === sport.name;
          return (
            <button
              key={sport.name}
              onClick={() => onSportChange(sport.name)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: isActive ? "hsl(var(--primary) / 0.12)" : "transparent",
                borderRight: isActive ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                border: "none",
                borderTop: "none",
                borderBottom: "none",
                borderLeft: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, background: isActive ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))" }}>
                {sport.emoji}
              </div>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
                {sport.name}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 9999, background: isActive ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))", color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}>
                {sport.count}
              </span>
              <ChevronRight size={12} style={{ color: "hsl(var(--muted-foreground))", opacity: 0.5 }} />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default DesktopSidebar;
