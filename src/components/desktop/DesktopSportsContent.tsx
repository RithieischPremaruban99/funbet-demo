import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, ChevronRight } from "lucide-react";
import { useBetSlip } from "@/contexts/BetSlipContext";
import TeamBadge from "@/components/TeamBadge";
import { matchesBySport } from "@/data/sportsData";

const ICON_PILLS: { label: string; emoji: string; live?: boolean; special?: boolean; social?: boolean; text?: boolean }[] = [
  { label: "Live", emoji: "📡", live: true },
  { label: "Football", emoji: "⚽" },
  { label: "Load Code", emoji: "🎟" },
  { label: "Virtuals", emoji: "🎮" },
  { label: "Peer to Peer", emoji: "P2P", text: true, social: true },
  { label: "Gamers Paradise", emoji: "🎰", special: true },
];

const LEAGUES = [
  { id: "europa", label: "UEFA Europa League", flag: "🏆" },
  { id: "premier", label: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "laliga", label: "LaLiga – Spain", flag: "🇪🇸" },
  { id: "bundesliga", label: "Bundesliga", flag: "🇩🇪" },
  { id: "seriea", label: "Serie A – Italy", flag: "🇮🇹" },
  { id: "ligue1", label: "Ligue 1", flag: "🇫🇷" },
];

const MARKETS = ["1X2", "Over/Under", "Double Chance", "GG/NG", "1st Half O/U"];

const LIVE_SPORT_TABS = ["Football", "Basketball", "Tennis", "Table Tennis", "Baseball", "Boxing", "Rugby", "Cricket"];

interface DesktopSportsContentProps {
  activeSport: string;
  onSportChange: (sport: string) => void;
}

const OddsBtn = ({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    disabled={value === "-"}
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "8px 4px",
      borderRadius: 8,
      minWidth: 44,
      background: selected ? "hsl(var(--highlight) / 0.2)" : "hsl(var(--muted))",
      border: selected ? "1px solid hsl(var(--highlight) / 0.5)" : "1px solid transparent",
      opacity: value === "-" ? 0.3 : 1,
      cursor: value === "-" ? "not-allowed" : "pointer",
      transition: "all 0.1s",
    }}
  >
    <span style={{ color: "hsl(var(--muted-foreground))", fontSize: 9, fontWeight: 600 }}>{label}</span>
    <span style={{ color: "hsl(var(--highlight))", fontSize: 12, fontWeight: 800, lineHeight: 1.2, marginTop: 2 }}>
      {value === "-" ? "—" : value}
    </span>
  </button>
);

const DesktopSportsContent = ({ activeSport, onSportChange }: DesktopSportsContentProps) => {
  const navigate = useNavigate();
  const [activeLeague, setActiveLeague] = useState("europa");
  const [activeMarket, setActiveMarket] = useState("1X2");
  const [activeIconPill, setActiveIconPill] = useState("Football");
  const { toggleSelection, isSelected } = useBetSlip();

  const sportData = matchesBySport[activeSport] ?? matchesBySport["Football"];
  const displayLive = sportData.live;
  const displayUpcoming = sportData.upcoming;

  const activeLeagueLabel = LEAGUES.find((l) => l.id === activeLeague)?.label ?? "";
  const filteredUpcoming = (() => {
    if (!activeLeagueLabel) return displayUpcoming;
    const keyword = activeLeagueLabel.split(" – ")[0].toLowerCase();
    const filtered = displayUpcoming.filter((m) => m.league.toLowerCase().includes(keyword));
    return filtered.length > 0 ? filtered : displayUpcoming;
  })();

  const handleOdds = (matchId: number, match: string, league: string, pick: string, odds: string) => {
    if (odds === "-") return;
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const handlePillClick = (pill: typeof ICON_PILLS[number]) => {
    if (pill.live) { navigate("/sports"); return; }
    if (pill.special) { navigate("/casino"); return; }
    if (pill.social) { navigate("/social"); return; }
    setActiveIconPill(pill.label);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Icon pills row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid hsl(var(--border))",
          overflowX: "auto",
          flexShrink: 0,
          background: "hsl(var(--card))",
        }}
      >
        {ICON_PILLS.map((pill) => {
          const isActive = activeIconPill === pill.label && !pill.live && !pill.special;
          return (
            <button
              key={pill.label}
              onClick={() => handlePillClick(pill)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                borderRadius: 12,
                border: `1px solid ${isActive ? "hsl(var(--primary) / 0.4)" : pill.special ? "hsl(var(--highlight) / 0.3)" : "hsl(var(--border))"}`,
                background: isActive ? "hsl(var(--primary) / 0.12)" : pill.special ? "hsl(var(--highlight) / 0.1)" : "hsl(var(--muted))",
                flexShrink: 0,
                cursor: "pointer",
                minWidth: 64,
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  background: isActive ? "hsl(var(--primary))" : pill.special ? "hsl(var(--highlight))" : "hsl(var(--card))",
                }}
              >
                {pill.text ? (
                  <span style={{ fontSize: 8, fontWeight: 800, color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}>
                    {pill.emoji}
                  </span>
                ) : (
                  <span>{pill.emoji}</span>
                )}
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: isActive ? "hsl(var(--primary))" : pill.special ? "hsl(var(--highlight))" : "hsl(var(--muted-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                {pill.live && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "hsl(var(--destructive))",
                      marginRight: 4,
                      animation: "pulse 2s infinite",
                    }}
                  />
                )}
                {pill.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "12px 16px",
          borderBottom: "1px solid hsl(var(--border))",
          flexShrink: 0,
          background: "hsl(var(--background))",
        }}
      >
        <button
          onClick={() => navigate("/betslip")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 0",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,0.2)" }}>SGP</span>
          BetBuilder
        </button>
        <button
          onClick={() => navigate("/social")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 0",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          Peer-to-Peer
        </button>
      </div>

      {/* Welcome bonus banner */}
      <div
        style={{
          margin: "12px 16px",
          borderRadius: 12,
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          border: "1px solid hsl(var(--primary) / 0.3)",
          background: "linear-gradient(135deg, hsl(40,28%,8%) 0%, hsl(42,35%,14%) 50%, hsl(45,50%,18%) 100%)",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              marginBottom: 4,
              background: "hsl(var(--highlight))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            WELCOME BONUS
          </span>
          <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: "hsl(var(--foreground))", fontFamily: "var(--font-display)", margin: 0 }}>
            Get a Free Sportsbook Pick
            <br />
            Or Enjoy 50% More Casino Cash!
          </p>
        </div>
        <span style={{ fontSize: 36 }}>🎁</span>
      </div>

      {/* Live & Upcoming section */}
      <section style={{ padding: "0 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "hsl(var(--primary))" }}>
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
          </svg>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--foreground))", fontFamily: "var(--font-display)", margin: 0 }}>
            Live &amp; Upcoming Games
          </h2>
        </div>

        {/* Sport filter tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid hsl(var(--border))", marginBottom: 12, overflowX: "auto" }}>
          {LIVE_SPORT_TABS.map((s) => (
            <button
              key={s}
              onClick={() => onSportChange(s)}
              style={{
                paddingBottom: 8,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 0,
                fontSize: 12,
                fontWeight: 700,
                color: activeSport === s ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeSport === s ? "hsl(var(--primary))" : "transparent"}`,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginBottom: -1,
              }}
            >
              {s}{s === "Football" ? " ⚽" : s === "Tennis" ? " 🎾" : s === "Cricket" ? " 🏏" : ""}
            </button>
          ))}
        </div>

        {/* Live cards horizontal scroll */}
        {displayLive.length > 0 ? (
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
            {displayLive.map((match) => {
              const matchName = `${match.home.name} vs ${match.away.name}`;
              return (
                <div
                  key={match.id}
                  style={{
                    flexShrink: 0,
                    borderRadius: 12,
                    border: "1px solid hsl(var(--primary) / 0.2)",
                    overflow: "hidden",
                    background: "hsl(var(--card-elevated))",
                    width: 168,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", borderBottom: "1px solid hsl(var(--border))" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Flame size={11} style={{ color: "hsl(var(--destructive))" }} />
                      <span style={{ color: "hsl(var(--destructive))", fontSize: 10, fontWeight: 700 }}>LIVE {match.time}</span>
                    </div>
                    <span style={{ color: "hsl(var(--muted-foreground))", fontSize: 9 }}>{match.league}</span>
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, margin: "0 0 4px", color: "hsl(var(--foreground))" }}>
                      {match.home.name}
                      <span style={{ color: "hsl(var(--highlight))", margin: "0 4px" }}>{match.score}</span>
                      {match.away.name}
                    </p>
                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                      {(["home", "draw", "away"] as const).map((type) => {
                        const val = match.odds[type];
                        const label = type === "home" ? "1" : type === "draw" ? "X" : "2";
                        const id = `${match.id}-${type}`;
                        if (val === "-" && type === "draw") return null;
                        return (
                          <OddsBtn
                            key={type}
                            label={label}
                            value={val}
                            selected={isSelected(id)}
                            onSelect={() => handleOdds(match.id, matchName, match.league, type, val)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 0", fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            No live matches for {activeSport}
          </div>
        )}
      </section>

      {/* Featured matches section */}
      <section style={{ padding: "0 16px 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>⚽</span>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--foreground))", fontFamily: "var(--font-display)", margin: 0 }}>
              {activeSport}
            </h2>
          </div>
          <button
            onClick={() => navigate("/sports")}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "hsl(var(--primary))", background: "none", border: "none", cursor: "pointer" }}
          >
            SEE MORE <ChevronRight size={12} />
          </button>
        </div>

        {/* League tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 8 }}>
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              onClick={() => setActiveLeague(league.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
                cursor: "pointer",
                background: activeLeague === league.id ? "hsl(var(--primary) / 0.12)" : "hsl(var(--muted))",
                border: `1px solid ${activeLeague === league.id ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))"}`,
                color: activeLeague === league.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                transition: "all 0.15s",
              }}
            >
              <span>{league.flag}</span>
              {league.label}
            </button>
          ))}
        </div>

        {/* Market tabs + odds table */}
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid hsl(var(--border))" }}>
          {/* Market tabs */}
          <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", gap: 4, borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}>
            {MARKETS.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMarket(m)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: activeMarket === m ? "hsl(var(--primary))" : "transparent",
                  color: activeMarket === m ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  border: "none",
                  transition: "all 0.15s",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Match rows */}
          {filteredUpcoming.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", fontSize: 12, color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))" }}>
              No upcoming matches
            </div>
          ) : (
            filteredUpcoming.map((match, idx) => {
              const matchName = `${match.home.name} vs ${match.away.name}`;
              const oddsButtons = [
                { label: "1", val: match.odds.home, pick: `${match.home.name} (1)` },
                ...(match.odds.draw !== "-" ? [{ label: "X", val: match.odds.draw, pick: "Draw (X)" }] : []),
                { label: "2", val: match.odds.away, pick: `${match.away.name} (2)` },
              ];
              return (
                <div
                  key={match.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: idx < filteredUpcoming.length - 1 ? "1px solid hsl(var(--border))" : "none",
                    background: idx % 2 === 0 ? "hsl(var(--card))" : "hsl(var(--card-elevated))",
                  }}
                >
                  {/* Match info */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 12, borderRight: "1px solid hsl(var(--border))", minWidth: 180 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", marginBottom: 2, color: "hsl(var(--highlight))" }}>
                      {match.date}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <TeamBadge abbr={match.home.abbr} size={18} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))" }}>{match.home.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <TeamBadge abbr={match.away.abbr} size={18} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))" }}>{match.away.name}</span>
                    </div>
                  </div>

                  {/* Odds */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", flex: 1 }}>
                    {oddsButtons.map((btn) => (
                      <OddsBtn
                        key={btn.label}
                        label={btn.label}
                        value={btn.val}
                        selected={isSelected(`${match.id}-${btn.pick}`)}
                        onSelect={() => handleOdds(match.id, matchName, match.league, btn.pick, btn.val)}
                      />
                    ))}
                  </div>

                  {/* More bets */}
                  <div style={{ padding: "8px 12px", flexShrink: 0 }}>
                    <button
                      onClick={() => navigate("/betslip")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "6px 8px",
                        borderRadius: 8,
                        background: "hsl(var(--primary) / 0.12)",
                        color: "hsl(var(--primary))",
                        border: "1px solid hsl(var(--primary) / 0.2)",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: 8, fontWeight: 700, padding: "1px 4px", borderRadius: 3, background: "hsl(var(--highlight))", color: "hsl(var(--primary-foreground))" }}>
                        SGP
                      </span>
                      More
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default DesktopSportsContent;
