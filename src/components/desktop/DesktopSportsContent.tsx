import { useState } from "react";
import { Flame, ChevronRight } from "lucide-react";
import { useBetSlip } from "@/contexts/BetSlipContext";
import TeamBadge from "@/components/TeamBadge";
import { Link } from "react-router-dom";

// Icon pills row
const ICON_PILLS = [
  { label: "Live", emoji: "📡", live: true },
  { label: "Football", emoji: "⚽", active: true },
  { label: "Load Code", emoji: "🎟" },
  { label: "Virtuals", emoji: "🎮" },
  { label: "Peer to Peer", emoji: "P2P", text: true },
  { label: "Gamers Paradise", emoji: "🎰", special: true },
];

// League tabs
const LEAGUES = [
  { id: "europa", label: "UEFA Europa League", flag: "🏆" },
  { id: "premier", label: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "laliga", label: "LaLiga – Spain", flag: "🇪🇸" },
  { id: "bundesliga", label: "Bundesliga", flag: "🇩🇪" },
  { id: "seriea", label: "Serie A – Italy", flag: "🇮🇹" },
  { id: "ligue1", label: "Ligue 1", flag: "🇫🇷" },
];

// Market tabs
const MARKETS = ["1X2", "Over/Under", "Double Chance", "GG/NG", "1st Half O/U"];

// Live match cards
const LIVE_CARDS = [
  {
    id: 1, league: "DStv Premiership", time: "67'", home: { name: "Kaizer Chiefs", abbr: "KC" },
    away: { name: "Orlando Pirates", abbr: "OP" }, score: "1 - 1",
    odds: { home: "2.80", draw: "3.10", away: "2.50" }, live: true,
  },
  {
    id: 2, league: "DStv Premiership", time: "52'", home: { name: "Mamelodi Sundowns", abbr: "SUN" },
    away: { name: "SuperSport Utd", abbr: "SSU" }, score: "2 - 0",
    odds: { home: "1.35", draw: "4.20", away: "7.50" }, live: true,
  },
  {
    id: 3, league: "SA20 Cricket", time: "15th Over", home: { name: "Joburg Super Kings", abbr: "JSK" },
    away: { name: "Paarl Royals", abbr: "PR" }, score: "128/3",
    odds: { home: "1.75", draw: "-", away: "2.10" }, live: true,
  },
  {
    id: 4, league: "Bundesliga", time: "38'", home: { name: "Bayern München", abbr: "BAY" },
    away: { name: "Borussia Dortmund", abbr: "BVB" }, score: "1 - 0",
    odds: { home: "1.40", draw: "4.80", away: "6.50" }, live: true,
  },
  {
    id: 5, league: "Premier League", time: "72'", home: { name: "Arsenal", abbr: "ARS" },
    away: { name: "Chelsea", abbr: "CHE" }, score: "2 - 1",
    odds: { home: "1.30", draw: "5.20", away: "8.00" }, live: true,
  },
];

// Featured matches
const FEATURED_MATCHES = [
  {
    id: 10, league: "UEFA Europa League", date: "TOMORROW", time: "21:00",
    home: { name: "SC Freiburg", abbr: "FRE" }, away: { name: "Aston Villa", abbr: "AVL" },
    odds: { home: "5.40", draw: "3.80", away: "1.67" },
  },
  {
    id: 11, league: "UEFA Europa League", date: "TOMORROW", time: "21:00",
    home: { name: "Borussia Dortmund", abbr: "BVB" }, away: { name: "AS Roma", abbr: "ROMA" },
    odds: { home: "2.10", draw: "3.30", away: "3.50" },
  },
  {
    id: 12, league: "UEFA Europa League", date: "TOMORROW", time: "21:00",
    home: { name: "Real Sociedad", abbr: "RSOC" }, away: { name: "Olympique Lyon", abbr: "OL" },
    odds: { home: "2.60", draw: "3.10", away: "2.90" },
  },
  {
    id: 13, league: "Premier League", date: "SUN", time: "16:00",
    home: { name: "Liverpool FC", abbr: "LIV" }, away: { name: "Manchester City", abbr: "MANCI" },
    odds: { home: "1.80", draw: "3.50", away: "4.50" },
  },
  {
    id: 14, league: "DStv Premiership", date: "TOMORROW", time: "19:30",
    home: { name: "Cape Town City", abbr: "CTC" }, away: { name: "Stellenbosch FC", abbr: "SFC" },
    odds: { home: "2.10", draw: "3.00", away: "3.50" },
  },
];

interface DesktopSportsContentProps {
  activeSport: string;
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
    className="flex-1 flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-100 min-w-[44px]"
    style={{
      background: selected ? "hsl(var(--highlight) / 0.2)" : "hsl(var(--muted))",
      border: selected
        ? "1px solid hsl(var(--highlight) / 0.5)"
        : "1px solid transparent",
      opacity: value === "-" ? 0.3 : 1,
      cursor: value === "-" ? "not-allowed" : "pointer",
    }}
  >
    <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "9px", fontWeight: 600 }}>
      {label}
    </span>
    <span
      style={{
        color: selected ? "hsl(var(--highlight))" : "hsl(var(--highlight))",
        fontSize: "12px",
        fontWeight: 800,
        lineHeight: 1.2,
        marginTop: 2,
      }}
    >
      {value === "-" ? "—" : value}
    </span>
  </button>
);

const DesktopSportsContent = ({ activeSport }: DesktopSportsContentProps) => {
  const [activeLeague, setActiveLeague] = useState("europa");
  const [activeMarket, setActiveMarket] = useState("1X2");
  const [activeLiveSport, setActiveLiveSport] = useState("Football");
  const [activeIconPill, setActiveIconPill] = useState("Football");
  const { toggleSelection, isSelected } = useBetSlip();

  const handleOdds = (
    matchId: number,
    match: string,
    league: string,
    pick: string,
    odds: string
  ) => {
    if (odds === "-") return;
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const LIVE_SPORT_TABS = ["Football", "Basketball", "Tennis", "Table Tennis", "Baseball", "Boxing", "Rugby", "Cricket"];

  return (
    <div className="flex flex-col min-h-0">
      {/* Icon pills row */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b overflow-x-auto flex-shrink-0"
        style={{
          background: "hsl(var(--card))",
          borderColor: "hsl(var(--border))",
        }}
      >
        {ICON_PILLS.map((pill) => {
          const isActive = activeIconPill === pill.label;
          return (
            <button
              key={pill.label}
              onClick={() => !pill.live && !pill.special && setActiveIconPill(pill.label)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border flex-shrink-0 transition-all"
              style={{
                background: isActive
                  ? "hsl(var(--primary) / 0.12)"
                  : pill.special
                  ? "hsl(var(--highlight) / 0.1)"
                  : "hsl(var(--muted))",
                borderColor: isActive
                  ? "hsl(var(--primary) / 0.4)"
                  : pill.special
                  ? "hsl(var(--highlight) / 0.3)"
                  : "hsl(var(--border))",
                minWidth: 64,
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: isActive
                    ? "hsl(var(--primary))"
                    : pill.special
                    ? "hsl(var(--highlight))"
                    : "hsl(var(--card))",
                }}
              >
                {pill.text ? (
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                    }}
                  >
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
                  color: isActive
                    ? "hsl(var(--primary))"
                    : pill.special
                    ? "hsl(var(--highlight))"
                    : "hsl(var(--muted-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                {pill.live && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-1"
                    style={{ background: "hsl(var(--destructive))", animation: "pulse 2s infinite" }}
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
        className="flex gap-3 px-4 py-3 border-b flex-shrink-0"
        style={{ background: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
      >
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            SGP
          </span>
          BetBuilder
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border transition-colors"
          style={{
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            borderColor: "hsl(var(--border))",
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
        className="mx-4 my-3 rounded-xl p-4 flex items-center justify-between flex-shrink-0 border"
        style={{
          background: "linear-gradient(135deg, hsl(40,28%,8%) 0%, hsl(42,35%,14%) 50%, hsl(45,50%,18%) 100%)",
          borderColor: "hsl(var(--primary) / 0.3)",
        }}
      >
        <div>
          <span
            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1"
            style={{
              background: "hsl(var(--highlight))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            WELCOME BONUS
          </span>
          <p
            className="text-sm font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-display)" }}
          >
            Get a Free Sportsbook Pick
            <br />
            Or Enjoy 50% More Casino Cash!
          </p>
        </div>
        <span style={{ fontSize: 36 }}>🎁</span>
      </div>

      {/* Live & Upcoming section */}
      <section className="px-4 mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "hsl(var(--primary))" }}>
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
          </svg>
          <h2
            className="text-sm font-bold"
            style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-display)" }}
          >
            Live &amp; Upcoming Games
          </h2>
        </div>

        {/* Sport filter tabs */}
        <div
          className="flex gap-0 border-b mb-3 overflow-x-auto"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          {LIVE_SPORT_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveLiveSport(s)}
              className="pb-2 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex-shrink-0"
              style={{
                borderBottomColor:
                  activeLiveSport === s ? "hsl(var(--primary))" : "transparent",
                color:
                  activeLiveSport === s
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                marginBottom: -1,
              }}
            >
              {s} {s === "Football" ? "⚽" : s === "Tennis" ? "🎾" : s === "Cricket" ? "🏏" : ""}
            </button>
          ))}
        </div>

        {/* Live cards horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {LIVE_CARDS.map((match) => {
            const matchName = `${match.home.name} vs ${match.away.name}`;
            return (
              <div
                key={match.id}
                className="flex-shrink-0 rounded-xl border overflow-hidden"
                style={{
                  background: "hsl(var(--card-elevated))",
                  borderColor: "hsl(var(--primary) / 0.2)",
                  width: 168,
                }}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5"
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-1">
                    <Flame size={11} style={{ color: "hsl(var(--destructive))" }} />
                    <span style={{ color: "hsl(var(--destructive))", fontSize: 10, fontWeight: 700 }}>
                      LIVE {match.time}
                    </span>
                  </div>
                  <span style={{ color: "hsl(var(--muted-foreground))", fontSize: 9 }}>
                    {match.league}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <p className="text-xs font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                    {match.home.name}
                    <span style={{ color: "hsl(var(--highlight))", margin: "0 4px" }}>
                      {match.score}
                    </span>
                    {match.away.name}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {["home", "draw", "away"].map((type, i) => {
                      const val = type === "home" ? match.odds.home : type === "draw" ? match.odds.draw : match.odds.away;
                      const label = type === "home" ? "1" : type === "draw" ? "X" : "2";
                      const id = `${match.id}-${type}`;
                      return (
                        <OddsBtn
                          key={i}
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
      </section>

      {/* Football section */}
      <section className="px-4 mb-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 16 }}>⚽</span>
            <h2
              className="text-sm font-bold"
              style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-display)" }}
            >
              Football
            </h2>
          </div>
          <button
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: "hsl(var(--primary))" }}
          >
            SEE MORE <ChevronRight size={12} />
          </button>
        </div>

        {/* League tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              onClick={() => setActiveLeague(league.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border flex-shrink-0 transition-all"
              style={{
                background:
                  activeLeague === league.id ? "hsl(var(--primary) / 0.12)" : "hsl(var(--muted))",
                borderColor:
                  activeLeague === league.id ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))",
                color:
                  activeLeague === league.id
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
              }}
            >
              <span>{league.flag}</span>
              {league.label}
            </button>
          ))}
        </div>

        {/* Market tabs + odds table */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          {/* Market tabs header */}
          <div
            className="flex items-center px-3 py-2 gap-1 border-b"
            style={{
              background: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            {MARKETS.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMarket(m)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background:
                    activeMarket === m ? "hsl(var(--primary))" : "transparent",
                  color:
                    activeMarket === m
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Match rows */}
          {FEATURED_MATCHES.map((match, idx) => {
            const matchName = `${match.home.name} vs ${match.away.name}`;
            return (
              <div
                key={match.id}
                className="flex items-center border-b last:border-b-0 transition-colors hover:bg-white/[0.02]"
                style={{
                  borderColor: "hsl(var(--border))",
                  background: idx % 2 === 0 ? "hsl(var(--card))" : "hsl(var(--card-elevated))",
                }}
              >
                {/* Match info */}
                <div
                  className="flex flex-col justify-center px-3 py-3 border-r"
                  style={{ borderColor: "hsl(var(--border))", minWidth: 180 }}
                >
                  <span
                    className="text-[9px] font-bold uppercase mb-0.5"
                    style={{ color: "hsl(var(--highlight))" }}
                  >
                    {match.date} · {match.time}
                  </span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <TeamBadge abbr={match.home.abbr} size={18} />
                    <span className="text-xs font-bold" style={{ color: "hsl(var(--foreground))" }}>
                      {match.home.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TeamBadge abbr={match.away.abbr} size={18} />
                    <span className="text-xs font-bold" style={{ color: "hsl(var(--foreground))" }}>
                      {match.away.name}
                    </span>
                  </div>
                </div>

                {/* Odds */}
                <div className="flex items-center gap-2 px-3 py-2 flex-1">
                  {[
                    { label: "1", val: match.odds.home, pick: match.home.name + " (1)" },
                    { label: "X", val: match.odds.draw, pick: "Draw (X)" },
                    { label: "2", val: match.odds.away, pick: match.away.name + " (2)" },
                  ].map((btn) => (
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
                <div className="px-3 py-2 flex-shrink-0">
                  <button
                    className="flex items-center gap-1 text-[10px] font-bold px-2 py-1.5 rounded-lg"
                    style={{
                      background: "hsl(var(--primary) / 0.12)",
                      color: "hsl(var(--primary))",
                      border: "1px solid hsl(var(--primary) / 0.2)",
                    }}
                  >
                    <span
                      className="text-[8px] font-bold px-1 rounded"
                      style={{
                        background: "hsl(var(--highlight))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      SGP
                    </span>
                    More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DesktopSportsContent;
