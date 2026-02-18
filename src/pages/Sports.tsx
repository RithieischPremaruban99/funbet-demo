import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame, ShoppingCart } from "lucide-react";
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

const liveMatches = [
  {
    id: 1, league: "Linafoot - Journée 18", time: "72'", score: "2 - 0",
    home: { name: "TP Mazembe", abbr: "TPM" }, away: { name: "FC Renaissance", abbr: "REN" },
    odds: { home: "1.15", draw: "7.50", away: "18.00" },
  },
  {
    id: 2, league: "Linafoot - Journée 18", time: "55'", score: "1 - 1",
    home: { name: "AS Vita Club", abbr: "ASV" }, away: { name: "DC Motema Pembe", abbr: "DCMP" },
    odds: { home: "2.20", draw: "3.10", away: "3.40" },
  },
  {
    id: 3, league: "Linafoot - Journée 18", time: "38'", score: "0 - 1",
    home: { name: "FC Lupopo", abbr: "LUP" }, away: { name: "CS Don Bosco", abbr: "DON" },
    odds: { home: "3.00", draw: "3.20", away: "2.30" },
  },
];

const upcomingMatches = [
  {
    id: 4, league: "Ligue des Champions CAF", date: "AUJ 20:00",
    home: { name: "TP Mazembe", abbr: "TPM" }, away: { name: "Al Ahly SC", abbr: "AHL" },
    odds: { home: "2.60", draw: "3.10", away: "2.70" },
  },
  {
    id: 5, league: "Éliminatoires CAN 2026", date: "DEMAIN 17:00",
    home: { name: "RD Congo", abbr: "RDC" }, away: { name: "Zambie", abbr: "ZAM" },
    odds: { home: "1.95", draw: "3.30", away: "3.90" },
  },
  {
    id: 6, league: "Coupe du Congo", date: "SAM 15:00",
    home: { name: "AS Maniema Union", abbr: "MAN" }, away: { name: "Rangers FC", abbr: "RNG" },
    odds: { home: "2.10", draw: "3.00", away: "3.60" },
  },
  {
    id: 7, league: "Linafoot - Journée 19", date: "DIM 16:00",
    home: { name: "JS Groupe Bazano", abbr: "BAZ" }, away: { name: "FC Blessing", abbr: "BLE" },
    odds: { home: "1.80", draw: "3.50", away: "4.50" },
  },
];

const OddsButton = ({ label, value, selected, onSelect }: { label: string; value: string; selected: boolean; onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className={`odds-cell flex-1 transition-all ${
      selected ? "!border-highlight !bg-highlight/20 ring-1 ring-highlight/40" : ""
    }`}
  >
    <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    <span className={`text-xs font-bold leading-none mt-0.5 ${selected ? "text-highlight" : "text-highlight"}`}>{value}</span>
  </button>
);

const Sports = () => {
  const [activeSport, setActiveSport] = useState(0);
  const { selections, toggleSelection, isSelected } = useBetSlip();
  const navigate = useNavigate();

  const handleOddsSelect = (matchId: number, match: string, league: string, pick: string, odds: string) => {
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);

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
                    <OddsButton label="1" value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                    <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Nul (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Nul (X)", match.odds.draw)} />
                    <OddsButton label="2" value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
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

      {/* Upcoming */}
      <section className="mt-6 px-4 mb-24">
        <h3 className="text-sm font-bold mb-3">PROCHAINS MATCHS</h3>
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
                    <OddsButton label="1" value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                    <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Nul (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Nul (X)", match.odds.draw)} />
                    <OddsButton label="2" value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
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
            <button
              onClick={() => navigate("/betslip")}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl orange-gradient glow-orange shadow-2xl"
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
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Sports;
