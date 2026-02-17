import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame } from "lucide-react";

const sports = [
  { name: "Football", emoji: "⚽", count: 245 },
  { name: "Basketball", emoji: "🏀", count: 89 },
  { name: "Tennis", emoji: "🎾", count: 156 },
  { name: "Rugby", emoji: "🏉", count: 34 },
  { name: "Hockey", emoji: "🏒", count: 67 },
];

const matches = [
  { id: 1, league: "Ligue 1", home: "PSG", away: "Lyon", time: "72'", live: true, scoreH: 3, scoreA: 0, odds: [1.10, 9.00, 21.00] },
  { id: 2, league: "Ligue 1", home: "Monaco", away: "Lille", time: "55'", live: true, scoreH: 1, scoreA: 2, odds: [3.20, 3.50, 2.10] },
  { id: 3, league: "Premier League", home: "Chelsea", away: "Tottenham", date: "Auj. 17:30", live: false, odds: [2.10, 3.40, 3.50] },
  { id: 4, league: "Premier League", home: "Man Utd", away: "Newcastle", date: "Auj. 20:00", live: false, odds: [2.50, 3.30, 2.90] },
  { id: 5, league: "La Liga", home: "Atletico", away: "Sevilla", date: "Demain 21:00", live: false, odds: [1.80, 3.60, 4.50] },
  { id: 6, league: "Serie A", home: "Juventus", away: "Napoli", date: "Demain 20:45", live: false, odds: [2.40, 3.20, 3.00] },
];

const Sports = () => {
  return (
    <MobileLayout>
      {/* Sport Categories */}
      <section className="px-3 mt-3">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button className="flex-shrink-0 p-2 rounded-xl bg-secondary hover:bg-card-elevated transition-colors">
            <Filter size={16} className="text-muted-foreground" />
          </button>
          {sports.map((sport) => (
            <button
              key={sport.name}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-card-elevated transition-colors"
            >
              <span>{sport.emoji}</span>
              <span className="text-xs font-medium">{sport.name}</span>
              <span className="text-[10px] text-muted-foreground">({sport.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Live Matches */}
      <section className="mt-4 px-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-live/10">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-live" />
            <span className="text-xs font-semibold text-live">EN DIRECT</span>
          </div>
        </div>
        <div className="space-y-2">
          {matches.filter(m => m.live).map((match) => (
            <div key={match.id} className="card-gradient rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-live" />
                  <span className="text-[10px] text-live font-bold">{match.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold">{match.home}</p>
                  <p className="text-sm font-semibold">{match.away}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{match.scoreH}</p>
                  <p className="text-sm font-bold text-primary">{match.scoreA}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "X", "2"].map((label, i) => (
                  <button key={label} className="flex flex-col items-center py-1.5 rounded-lg bg-secondary hover:bg-card-elevated transition-colors">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="text-xs font-bold">{match.odds[i].toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="mt-6 px-3 mb-4">
        <h3 className="text-sm font-bold font-display mb-3">PROCHAINS MATCHS</h3>
        <div className="space-y-2">
          {matches.filter(m => !m.live).map((match) => (
            <div key={match.id} className="card-gradient rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-muted-foreground">{match.date}</span>
              </div>
              <p className="text-sm font-semibold mb-3">{match.home} vs {match.away}</p>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "X", "2"].map((label, i) => (
                  <button key={label} className="flex flex-col items-center py-1.5 rounded-lg bg-secondary hover:bg-card-elevated transition-colors">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="text-xs font-bold">{match.odds[i].toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Sports;
