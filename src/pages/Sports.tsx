import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { motion, AnimatePresence } from "framer-motion";
import TeamBadge from "@/components/TeamBadge";

const sports = [
  { name: "Football", emoji: "⚽", count: 245 },
  { name: "Basketball", emoji: "🏀", count: 42 },
  { name: "Tennis", emoji: "🎾", count: 67 },
  { name: "Boxing", emoji: "🥊", count: 8 },
  { name: "Athlétisme", emoji: "🏃", count: 15 },
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
      { id: 1, league: "Ligue 1 - Journée 24", time: "72'", score: "2 - 0", home: { name: "Paris SG", abbr: "PSG" }, away: { name: "Olympique Lyonnais", abbr: "OL" }, odds: { home: "1.15", draw: "7.50", away: "18.00" }, live: true },
      { id: 2, league: "Ligue 1 - Journée 24", time: "55'", score: "1 - 1", home: { name: "RC Lens", abbr: "LENS" }, away: { name: "AS Monaco", abbr: "ASM" }, odds: { home: "2.20", draw: "3.10", away: "3.40" }, live: true },
      { id: 3, league: "Ligue 1 - Journée 24", time: "38'", score: "0 - 1", home: { name: "LOSC Lille", abbr: "LOSC" }, away: { name: "OGC Nice", abbr: "NICE" }, odds: { home: "3.00", draw: "3.20", away: "2.30" }, live: true },
    ],
    upcoming: [
      { id: 4, league: "Champions League", date: "AUJ 20:00", home: { name: "FC Bayern", abbr: "BAY" }, away: { name: "FC Barcelona", abbr: "BAR" }, odds: { home: "2.60", draw: "3.10", away: "2.70" } },
      { id: 5, league: "Champions League", date: "DEMAIN 21:00", home: { name: "FC Barcelona", abbr: "BAR" }, away: { name: "Inter Milan", abbr: "INT" }, odds: { home: "1.80", draw: "3.60", away: "4.20" } },
      { id: 6, league: "Ligue 1 - Journée 25", date: "SAM 17:00", home: { name: "Olympique Marseille", abbr: "OM" }, away: { name: "AS Monaco", abbr: "ASM" }, odds: { home: "2.10", draw: "3.00", away: "3.60" } },
      { id: 7, league: "Premier League", date: "DIM 16:00", home: { name: "Liverpool FC", abbr: "LIV" }, away: { name: "Manchester City", abbr: "MCI" }, odds: { home: "1.80", draw: "3.50", away: "4.50" } },
    ],
  },
  Basketball: {
    live: [
      { id: 101, league: "NBA - Saison régulière", time: "Q3 5:42", score: "78 - 82", home: { name: "LA Lakers", abbr: "LAL" }, away: { name: "Boston Celtics", abbr: "BOS" }, odds: { home: "2.10", draw: "-", away: "1.75" }, live: true },
      { id: 102, league: "NBA - Saison régulière", time: "Q2 8:15", score: "45 - 51", home: { name: "Golden State", abbr: "GSW" }, away: { name: "Milwaukee Bucks", abbr: "MIL" }, odds: { home: "1.90", draw: "-", away: "1.95" }, live: true },
    ],
    upcoming: [
      { id: 103, league: "NBA - Saison régulière", date: "AUJ 01:00", home: { name: "Phoenix Suns", abbr: "PHX" }, away: { name: "Denver Nuggets", abbr: "DEN" }, odds: { home: "2.30", draw: "-", away: "1.65" } },
      { id: 104, league: "NBA - Saison régulière", date: "DEMAIN 02:00", home: { name: "Miami Heat", abbr: "MIA" }, away: { name: "NY Knicks", abbr: "NYK" }, odds: { home: "1.85", draw: "-", away: "2.00" } },
      { id: 105, league: "Euroleague", date: "MER 20:00", home: { name: "Real Madrid", abbr: "RMA" }, away: { name: "Olympiacos", abbr: "OLY" }, odds: { home: "1.55", draw: "-", away: "2.50" } },
      { id: 106, league: "Euroleague", date: "JEU 20:45", home: { name: "FC Barcelona", abbr: "FCB" }, away: { name: "Fenerbahçe", abbr: "FEN" }, odds: { home: "1.40", draw: "-", away: "2.90" } },
    ],
  },
  Tennis: {
    live: [
      { id: 201, league: "ATP Masters 1000 - Indian Wells", time: "Set 2 - 4:3", score: "6-4 / 4-3", home: { name: "C. Alcaraz", abbr: "ALC" }, away: { name: "N. Djokovic", abbr: "DJO" }, odds: { home: "1.60", draw: "-", away: "2.30" }, live: true },
    ],
    upcoming: [
      { id: 202, league: "ATP Masters 1000 - Indian Wells", date: "AUJ 18:00", home: { name: "J. Sinner", abbr: "SIN" }, away: { name: "D. Medvedev", abbr: "MED" }, odds: { home: "1.45", draw: "-", away: "2.70" } },
      { id: 203, league: "WTA 1000 - Indian Wells", date: "AUJ 20:00", home: { name: "I. Świątek", abbr: "SWI" }, away: { name: "A. Sabalenka", abbr: "SAB" }, odds: { home: "1.80", draw: "-", away: "2.00" } },
      { id: 204, league: "ATP 500 - Dubai", date: "DEMAIN 16:00", home: { name: "S. Tsitsipas", abbr: "TSI" }, away: { name: "A. Rublev", abbr: "RUB" }, odds: { home: "2.10", draw: "-", away: "1.75" } },
      { id: 205, league: "ATP 500 - Dubai", date: "DEMAIN 19:00", home: { name: "H. Rune", abbr: "RUN" }, away: { name: "T. Fritz", abbr: "FRI" }, odds: { home: "2.40", draw: "-", away: "1.58" } },
    ],
  },
  Boxing: {
    live: [],
    upcoming: [
      { id: 301, league: "WBC Heavyweight", date: "SAM 22:00", home: { name: "T. Fury", abbr: "FUR" }, away: { name: "O. Usyk", abbr: "USY" }, odds: { home: "2.20", draw: "21.00", away: "1.70" } },
      { id: 302, league: "WBA Middleweight", date: "SAM 20:00", home: { name: "C. Alvarez", abbr: "CAN" }, away: { name: "D. Benavidez", abbr: "BEN" }, odds: { home: "1.55", draw: "17.00", away: "2.50" } },
      { id: 303, league: "IBF Welterweight", date: "DIM 23:00", home: { name: "T. Crawford", abbr: "CRA" }, away: { name: "E. Spence", abbr: "SPE" }, odds: { home: "1.65", draw: "19.00", away: "2.25" } },
    ],
  },
  "Athlétisme": {
    live: [],
    upcoming: [
      { id: 401, league: "Diamond League - Doha", date: "VEN 18:00", home: { name: "N. Lyles", abbr: "LYL" }, away: { name: "F. Kerley", abbr: "KER" }, odds: { home: "1.50", draw: "-", away: "2.60" } },
      { id: 402, league: "Diamond League - Doha", date: "VEN 19:30", home: { name: "J. Ingebrigtsen", abbr: "ING" }, away: { name: "J. Nuguse", abbr: "NUG" }, odds: { home: "1.70", draw: "-", away: "2.15" } },
      { id: 403, league: "Diamond League - Doha", date: "VEN 20:00", home: { name: "S. El Hassan", abbr: "ELH" }, away: { name: "F. Kipyegon", abbr: "KIP" }, odds: { home: "3.20", draw: "-", away: "1.35" } },
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
  const { selections, toggleSelection, isSelected, clearSelections } = useBetSlip();
  const navigate = useNavigate();

  const currentSport = sports[activeSport].name;
  const { live: liveMatches, upcoming: upcomingMatches } = matchesBySport[currentSport] || { live: [], upcoming: [] };

  const handleOddsSelect = (matchId: number, match: string, league: string, pick: string, odds: string) => {
    if (odds === "-") return;
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);

  // Determine labels based on sport
  const getOddsLabels = () => {
    if (currentSport === "Tennis" || currentSport === "Basketball" || currentSport === "Athlétisme") return { home: "1", draw: "", away: "2" };
    return { home: "1", draw: "X", away: "2" };
  };
  const oddsLabels = getOddsLabels();
  const hasDraw = currentSport === "Football" || currentSport === "Boxing";

  return (
    <MobileLayout>
      {/* Sport filters */}
      <section className="px-4 mt-3">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button className="flex-shrink-0 p-2.5 rounded-xl bg-card border border-border hover:bg-card-elevated transition-colors">
            <Filter size={16} className="text-muted-foreground" />
          </button>
          {sports.map((sport, i) => (
            <button
              key={sport.name}
              onClick={() => setActiveSport(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                i === activeSport
                  ? "border-highlight/30 card-gradient-warm text-foreground"
                  : "border-border bg-card text-secondary-foreground hover:bg-card-elevated"
              }`}
            >
              <span>{sport.emoji}</span>
              <span className="text-xs font-semibold">{sport.name}</span>
              <span className="text-[10px] text-muted-foreground">({sport.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Live */}
      {liveMatches.length > 0 && (
        <section className="mt-5 px-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            <span className="text-sm font-bold text-live">EN DIRECT</span>
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
                      {hasDraw && <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Nul (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Nul (X)", match.odds.draw)} disabled={match.odds.draw === "-"} />}
                      <OddsButton label={oddsLabels.away} value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground">+45 marchés</span>
                    <span className="text-[10px] text-highlight font-semibold">Sélectionnez une cote ↑</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Upcoming */}
      <section className={`${liveMatches.length > 0 ? "mt-6" : "mt-5"} px-4 mb-24`}>
        <h3 className="text-sm font-bold mb-3">
          {liveMatches.length > 0 ? "PROCHAINS MATCHS" : `${currentSport.toUpperCase()} — PROCHAINS ÉVÉNEMENTS`}
        </h3>
        {upcomingMatches.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">Aucun événement à venir</div>
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
                      {hasDraw && <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Nul (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Nul (X)", match.odds.draw)} disabled={match.odds.draw === "-"} />}
                      <OddsButton label={oddsLabels.away} value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground">+38 marchés</span>
                    <span className="text-[10px] text-highlight font-semibold">Sélectionnez une cote ↑</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

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
                    <p className="text-xs font-bold text-highlight-foreground">{selections.length} sélection{selections.length > 1 ? "s" : ""}</p>
                    <p className="text-[10px] text-highlight-foreground/70">Cote totale: {totalOdds.toFixed(2)}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-highlight-foreground">Voir coupon →</span>
              </button>
              <button
                onClick={() => clearSelections()}
                className="w-12 h-12 rounded-2xl bg-destructive/90 flex items-center justify-center shadow-2xl shrink-0"
              >
                <X size={18} className="text-destructive-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Sports;
