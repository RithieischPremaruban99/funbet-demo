import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    home: "TP Mazembe", away: "FC Renaissance",
    odds: { home: "1.15", draw: "7.50", away: "18.00" },
  },
  {
    id: 2, league: "Linafoot - Journée 18", time: "55'", score: "1 - 1",
    home: "AS Vita Club", away: "DC Motema Pembe",
    odds: { home: "2.20", draw: "3.10", away: "3.40" },
  },
  {
    id: 3, league: "Linafoot - Journée 18", time: "38'", score: "0 - 1",
    home: "FC Lupopo", away: "CS Don Bosco",
    odds: { home: "3.00", draw: "3.20", away: "2.30" },
  },
];

const upcomingMatches = [
  {
    id: 4, league: "Ligue des Champions CAF", date: "AUJ 20:00",
    home: "TP Mazembe", away: "Al Ahly SC",
    odds: { home: "2.60", draw: "3.10", away: "2.70" },
  },
  {
    id: 5, league: "Éliminatoires CAN 2026", date: "DEMAIN 17:00",
    home: "RD Congo", away: "Zambie",
    odds: { home: "1.95", draw: "3.30", away: "3.90" },
  },
  {
    id: 6, league: "Coupe du Congo", date: "SAM 15:00",
    home: "AS Maniema Union", away: "Rangers FC",
    odds: { home: "2.10", draw: "3.00", away: "3.60" },
  },
  {
    id: 7, league: "Linafoot - Journée 19", date: "DIM 16:00",
    home: "JS Groupe Bazano", away: "FC Blessing",
    odds: { home: "1.80", draw: "3.50", away: "4.50" },
  },
];

const OddsButton = ({ label, value, onSelect }: { label: string; value: string; onSelect: () => void }) => (
  <button onClick={onSelect} className="odds-cell flex-1">
    <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    <span className="text-xs font-bold leading-none mt-0.5 text-highlight">{value}</span>
  </button>
);

const Sports = () => {
  const [activeSport, setActiveSport] = useState(0);

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
          {liveMatches.map((match) => (
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
                  <span className="text-sm font-bold">{match.home}</span>
                  <span className="text-lg font-bold text-highlight">{match.score}</span>
                  <span className="text-sm font-bold">{match.away}</span>
                </div>
                <div className="flex gap-2">
                  <OddsButton label="1" value={match.odds.home} onSelect={() => {}} />
                  <OddsButton label="X" value={match.odds.draw} onSelect={() => {}} />
                  <OddsButton label="2" value={match.odds.away} onSelect={() => {}} />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground">+45 marchés</span>
                <Link to="/betslip" className="text-[10px] text-highlight font-semibold">Ajouter au coupon →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="mt-6 px-4 mb-6">
        <h3 className="text-sm font-bold mb-3">PROCHAINS MATCHS</h3>
        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-highlight font-bold">{match.date}</span>
              </div>
              <div className="px-3 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{match.home}</span>
                  <span className="text-xs text-muted-foreground">vs</span>
                  <span className="text-sm font-bold">{match.away}</span>
                </div>
                <div className="flex gap-2">
                  <OddsButton label="1" value={match.odds.home} onSelect={() => {}} />
                  <OddsButton label="X" value={match.odds.draw} onSelect={() => {}} />
                  <OddsButton label="2" value={match.odds.away} onSelect={() => {}} />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground">+38 marchés</span>
                <Link to="/betslip" className="text-[10px] text-highlight font-semibold">Ajouter au coupon →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Sports;
