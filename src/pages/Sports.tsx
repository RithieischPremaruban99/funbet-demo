import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame, Search, ShoppingCart, Wrench, X } from "lucide-react";
import BetBuilder from "@/components/BetBuilder";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { motion, AnimatePresence } from "framer-motion";
import TeamBadge from "@/components/TeamBadge";

const sports = [
  { name: "Football", emoji: "⚽", count: 186 },
  { name: "Cricket", emoji: "🏏", count: 34 },
  { name: "Horse Racing", emoji: "🏇", count: 52 },
  { name: "Bet Builder", emoji: "🛠️", count: 0, isBetBuilder: true },
  { name: "Rugby", emoji: "🏉", count: 28 },
  { name: "Tennis", emoji: "🎾", count: 67 },
];

interface MatchData {
  id: number;
  league: string;
  time?: string;
  score?: string;
  date?: string;
  home: { name: string; abbr: string };
  away: { name: string; abbr: string };
  odds: { home: string; draw: string; away: string };
  live?: boolean;
}

const matchesBySport: Record<string, { live: MatchData[]; upcoming: MatchData[] }> = {
  Football: {
    live: [
      { id: 1, league: "DStv Premiership - Matchday 22", time: "72'", score: "1 - 1", home: { name: "Kaizer Chiefs", abbr: "KC" }, away: { name: "Orlando Pirates", abbr: "OP" }, odds: { home: "2.80", draw: "3.10", away: "2.50" }, live: true },
      { id: 2, league: "DStv Premiership - Matchday 22", time: "55'", score: "2 - 0", home: { name: "Mamelodi Sundowns", abbr: "SUN" }, away: { name: "SuperSport Utd", abbr: "SSU" }, odds: { home: "1.35", draw: "4.20", away: "7.50" }, live: true },
      { id: 3, league: "DStv Premiership - Matchday 22", time: "38'", score: "0 - 0", home: { name: "AmaZulu FC", abbr: "AMA" }, away: { name: "Royal AM", abbr: "RAM" }, odds: { home: "2.10", draw: "3.00", away: "3.60" }, live: true },
    ],
    upcoming: [
      { id: 4, league: "DStv Premiership - Matchday 23", date: "TOMORROW 19:30", home: { name: "Cape Town City", abbr: "CTC" }, away: { name: "Stellenbosch FC", abbr: "SFC" }, odds: { home: "2.10", draw: "3.00", away: "3.50" } },
      { id: 5, league: "DStv Premiership - Matchday 23", date: "SAT 17:00", home: { name: "Chippa United", abbr: "CHI" }, away: { name: "TS Galaxy", abbr: "TSG" }, odds: { home: "2.40", draw: "2.90", away: "3.20" } },
      { id: 6, league: "Nedbank Cup - Quarter Final", date: "SAT 20:00", home: { name: "Orlando Pirates", abbr: "OP" }, away: { name: "Mamelodi Sundowns", abbr: "SUN" }, odds: { home: "2.60", draw: "3.10", away: "2.70" } },
      { id: 7, league: "Premier League", date: "SUN 16:00", home: { name: "Liverpool FC", abbr: "LIV" }, away: { name: "Manchester City", abbr: "MCI" }, odds: { home: "1.80", draw: "3.50", away: "4.50" } },
    ],
  },
  Cricket: {
    live: [
      { id: 101, league: "SA20 - Qualifier", time: "15th Over", score: "128/3", home: { name: "Joburg Super Kings", abbr: "JSK" }, away: { name: "Paarl Royals", abbr: "PR" }, odds: { home: "1.75", draw: "-", away: "2.10" }, live: true },
      { id: 102, league: "SA20 - Eliminator", time: "8th Over", score: "62/1", home: { name: "MI Cape Town", abbr: "MICT" }, away: { name: "Durban Super Giants", abbr: "DSG" }, odds: { home: "1.90", draw: "-", away: "1.95" }, live: true },
    ],
    upcoming: [
      { id: 103, league: "Proteas vs India - 2nd Test", date: "SAT 10:00", home: { name: "South Africa", abbr: "SA" }, away: { name: "India", abbr: "IND" }, odds: { home: "2.40", draw: "3.80", away: "2.60" } },
      { id: 104, league: "SA20 - Final", date: "SUN 14:00", home: { name: "Joburg Super Kings", abbr: "JSK" }, away: { name: "MI Cape Town", abbr: "MICT" }, odds: { home: "1.85", draw: "-", away: "2.00" } },
      { id: 105, league: "CSA T20 Challenge", date: "MON 18:00", home: { name: "Titans", abbr: "TIT" }, away: { name: "Dolphins", abbr: "DOL" }, odds: { home: "1.70", draw: "-", away: "2.20" } },
      { id: 106, league: "IPL", date: "FRI 16:00", home: { name: "Mumbai Indians", abbr: "MI" }, away: { name: "Chennai Super Kings", abbr: "CSK" }, odds: { home: "1.95", draw: "-", away: "1.90" } },
    ],
  },
  "Horse Racing": {
    live: [
      { id: 201, league: "Turffontein - Race 5", time: "Running", score: "1400m", home: { name: "#3 Star Gazer", abbr: "R5" }, away: { name: "8 Runners", abbr: "TF" }, odds: { home: "3.50", draw: "-", away: "2.80" }, live: true },
    ],
    upcoming: [
      { id: 202, league: "Turffontein - Race 6", date: "TODAY 14:30", home: { name: "#1 Cape Storm", abbr: "R6" }, away: { name: "10 Runners", abbr: "TF" }, odds: { home: "4.00", draw: "-", away: "3.20" } },
      { id: 203, league: "Kenilworth - Met Stakes", date: "SAT 15:00", home: { name: "#2 Rainbow", abbr: "MET" }, away: { name: "12 Runners", abbr: "KW" }, odds: { home: "5.50", draw: "-", away: "3.80" } },
      { id: 204, league: "Greyville - Gold Cup", date: "SAT 16:30", home: { name: "#5 Durban July", abbr: "GC" }, away: { name: "14 Runners", abbr: "GV" }, odds: { home: "6.00", draw: "-", away: "4.50" } },
      { id: 205, league: "Hollywoodbets Scottsville", date: "SUN 13:00", home: { name: "#4 Gold Rush", abbr: "R3" }, away: { name: "9 Runners", abbr: "SC" }, odds: { home: "3.20", draw: "-", away: "2.60" } },
    ],
  },
  Rugby: {
    live: [],
    upcoming: [
      { id: 301, league: "United Rugby Championship", date: "SAT 17:05", home: { name: "Stormers", abbr: "STO" }, away: { name: "Bulls", abbr: "BUL" }, odds: { home: "2.20", draw: "21.00", away: "1.70" } },
      { id: 302, league: "United Rugby Championship", date: "SAT 19:15", home: { name: "Sharks", abbr: "SHA" }, away: { name: "Lions", abbr: "LIO" }, odds: { home: "1.55", draw: "17.00", away: "2.50" } },
      { id: 303, league: "Currie Cup", date: "SUN 15:00", home: { name: "Western Province", abbr: "WP" }, away: { name: "Blue Bulls", abbr: "BB" }, odds: { home: "1.80", draw: "19.00", away: "2.10" } },
    ],
  },
  Tennis: {
    live: [
      { id: 401, league: "ATP Masters 1000 - Indian Wells", time: "Set 2 - 4:3", score: "6-4 / 4-3", home: { name: "C. Alcaraz", abbr: "ALC" }, away: { name: "N. Djokovic", abbr: "DJO" }, odds: { home: "1.60", draw: "-", away: "2.30" }, live: true },
    ],
    upcoming: [
      { id: 402, league: "ATP Masters 1000 - Indian Wells", date: "TODAY 18:00", home: { name: "J. Sinner", abbr: "SIN" }, away: { name: "D. Medvedev", abbr: "MED" }, odds: { home: "1.45", draw: "-", away: "2.70" } },
      { id: 403, league: "WTA 1000 - Indian Wells", date: "TODAY 20:00", home: { name: "I. Świątek", abbr: "SWI" }, away: { name: "A. Sabalenka", abbr: "SAB" }, odds: { home: "1.80", draw: "-", away: "2.00" } },
      { id: 404, league: "ATP 500 - Dubai", date: "TOMORROW 16:00", home: { name: "S. Tsitsipas", abbr: "TSI" }, away: { name: "A. Rublev", abbr: "RUB" }, odds: { home: "2.10", draw: "-", away: "1.75" } },
      { id: 405, league: "ATP 500 - Dubai", date: "TOMORROW 19:00", home: { name: "H. Rune", abbr: "RUN" }, away: { name: "T. Fritz", abbr: "FRI" }, odds: { home: "2.40", draw: "-", away: "1.58" } },
    ],
  },
};

const OddsButton = ({ label, value, selected, onSelect, disabled }: { label: string; value: string; selected: boolean; onSelect: () => void; disabled?: boolean }) => (
  <button
    onClick={onSelect}
    disabled={disabled || value === "-"}
    className={`odds-cell flex-1 transition-all ${
      selected ? "!border-highlight !bg-highlight/20 ring-1 ring-highlight/40" : ""
    } ${value === "-" ? "opacity-30 cursor-not-allowed" : ""}`}
  >
    <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    <span className={`text-xs font-bold leading-none mt-0.5 ${selected ? "text-highlight" : "text-highlight"}`}>{value === "-" ? "—" : value}</span>
  </button>
);

const Sports = () => {
  const [activeSport, setActiveSport] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { selections, toggleSelection, isSelected, clearSelections } = useBetSlip();
  const navigate = useNavigate();

  const isBetBuilder = (sports[activeSport] as any).isBetBuilder;
  const currentSport = sports[activeSport].name;
  const allData = !isBetBuilder ? (matchesBySport[currentSport] || { live: [], upcoming: [] }) : { live: [], upcoming: [] };
  
  const filterMatches = (matches: MatchData[]) =>
    searchQuery.trim() === ""
      ? matches
      : matches.filter((m) =>
          m.home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.away.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.league.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const liveMatches = filterMatches(allData.live);
  const upcomingMatches = filterMatches(allData.upcoming);

  const handleOddsSelect = (matchId: number, match: string, league: string, pick: string, odds: string) => {
    if (odds === "-") return;
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);

  const getOddsLabels = () => {
    if (currentSport === "Tennis" || currentSport === "Cricket" || currentSport === "Horse Racing") return { home: "1", draw: "", away: "2" };
    return { home: "1", draw: "X", away: "2" };
  };
  const oddsLabels = getOddsLabels();
  const hasDraw = currentSport === "Football" || currentSport === "Rugby";

  return (
    <MobileLayout>
      {/* Sport filters */}
      <section className="px-4 mt-3">
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a match, team..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button className="flex-shrink-0 p-2.5 rounded-xl bg-card border border-border hover:bg-card-elevated transition-colors">
            <Filter size={16} className="text-muted-foreground" />
          </button>
          {sports.map((sport, i) => (
            <button
              key={sport.name}
              onClick={() => { setActiveSport(i); setSearchQuery(""); }}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                i === activeSport
                  ? (sport as any).isBetBuilder
                    ? "border-highlight/30 bg-highlight/10 text-highlight"
                    : "border-highlight/30 card-gradient-warm text-foreground"
                  : "border-border bg-card text-secondary-foreground hover:bg-card-elevated"
              }`}
            >
              <span>{sport.emoji}</span>
              <span className="text-xs font-semibold">{sport.name}</span>
              {!(sport as any).isBetBuilder && <span className="text-[10px] text-muted-foreground">({sport.count})</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Bet Builder Mode */}
      {isBetBuilder && (
        <section className="px-4 mt-4 mb-24">
          <BetBuilder />
        </section>
      )}

      {/* No results */}
      {!isBetBuilder && searchQuery && liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <div className="text-center py-12 px-4">
          <Search size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No results for "{searchQuery}"</p>
          <p className="text-xs text-muted-foreground mt-1">Try another search term</p>
        </div>
      )}

      {/* Live */}
      {!isBetBuilder && liveMatches.length > 0 && (
        <section className="mt-5 px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            <span className="text-sm font-bold text-live">LIVE</span>
          </div>
          <div className="space-y-3">
            {liveMatches.map((match) => {
              const matchName = `${match.home.name} vs ${match.away.name}`;
              return (
                <div key={match.id} className="rounded-2xl border border-highlight/20 overflow-hidden card-gradient-warm">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                    <div className="flex items-center gap-1">
                      <Flame size={11} className="text-live" />
                      <span className="text-[10px] text-live font-bold">{match.time}</span>
                    </div>
                  </div>
                  <div className="px-3 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TeamBadge abbr={match.home.abbr} />
                        <span className="text-sm font-bold">{match.home.name}</span>
                      </div>
                      <span className="text-lg font-bold text-highlight">{match.score}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{match.away.name}</span>
                        <TeamBadge abbr={match.away.abbr} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <OddsButton label={oddsLabels.home} value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                      {hasDraw && <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Draw (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Draw (X)", match.odds.draw)} disabled={match.odds.draw === "-"} />}
                      <OddsButton label={oddsLabels.away} value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground">+45 markets</span>
                    <span className="text-[10px] text-highlight font-semibold">Select an odd ↑</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {!isBetBuilder && (
      <section className={`${liveMatches.length > 0 ? "mt-6" : "mt-5"} px-4 mb-24`}>
        <h3 className="text-sm font-bold mb-3">
          {liveMatches.length > 0 ? "UPCOMING MATCHES" : `${currentSport.toUpperCase()} — UPCOMING EVENTS`}
        </h3>
        {upcomingMatches.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">No upcoming events</div>
        ) : (
          <div className="space-y-3">
            {upcomingMatches.map((match) => {
              const matchName = `${match.home.name} vs ${match.away.name}`;
              return (
                <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                    <span className="text-[10px] text-highlight font-bold">{match.date}</span>
                  </div>
                  <div className="px-3 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TeamBadge abbr={match.home.abbr} />
                        <span className="text-sm font-bold">{match.home.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{match.away.name}</span>
                        <TeamBadge abbr={match.away.abbr} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <OddsButton label={oddsLabels.home} value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                      {hasDraw && <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Draw (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Draw (X)", match.odds.draw)} disabled={match.odds.draw === "-"} />}
                      <OddsButton label={oddsLabels.away} value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground">+38 markets</span>
                    <span className="text-[10px] text-highlight font-semibold">Select an odd ↑</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      )}

      {/* Floating Bet Slip Indicator */}
      <AnimatePresence>
        {selections.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-20 left-4 right-4 z-50"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/betslip")}
                className="flex-1 flex items-center justify-between px-4 py-3.5 rounded-2xl orange-gradient glow-orange shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingCart size={20} className="text-highlight-foreground" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-card text-highlight text-[10px] font-bold flex items-center justify-center">
                      {selections.length}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-highlight-foreground">{selections.length} selection{selections.length > 1 ? "s" : ""}</p>
                    <p className="text-[10px] text-highlight-foreground/70">Total odds: {totalOdds.toFixed(2)}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-highlight-foreground">View slip →</span>
              </button>
              <button
                onClick={() => clearSelections()}
                className="w-12 h-12 rounded-2xl bg-primary/90 flex items-center justify-center shadow-2xl shrink-0"
              >
                <X size={18} className="text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Sports;
