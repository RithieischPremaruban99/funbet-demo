import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame, Search, ShoppingCart, Wrench, X } from "lucide-react";
import BetBuilder from "@/components/BetBuilder";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { motion, AnimatePresence } from "framer-motion";
import TeamBadge from "@/components/TeamBadge";
import { matchesBySport } from "@/data/sportsData";
import type { MatchData } from "@/data/sportsData";

const sports = [
  { name: "Football", emoji: "⚽", count: 186 },
  { name: "Cricket", emoji: "🏏", count: 34 },
  { name: "Horse Racing", emoji: "🏇", count: 52 },
  { name: "Bet Builder", emoji: "🛠️", count: 0, isBetBuilder: true },
  { name: "Rugby", emoji: "🏉", count: 28 },
  { name: "Tennis", emoji: "🎾", count: 67 },
];


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
