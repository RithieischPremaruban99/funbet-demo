import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, Filter, Flame } from "lucide-react";

const sports = [
  { name: "Football", emoji: "⚽", count: 245 },
  { name: "Basketball", emoji: "🏀", count: 89 },
  { name: "Tennis", emoji: "🎾", count: 156 },
  { name: "Rugby", emoji: "🏉", count: 34 },
  { name: "Hockey", emoji: "🏒", count: 67 },
  { name: "MMA", emoji: "🥊", count: 12 },
];

const matches = [
  {
    id: 1, league: "Ligue 1", live: true, time: "72'",
    home: { name: "PSG", full: "Paris Saint-Germain" },
    away: { name: "Lyon", full: "Olympique Lyonnais" },
    spread: { home: "-2.5", homeOdds: "-115", away: "+2.5", awayOdds: "-105" },
    moneyline: { home: "-400", away: "+900" },
    total: { over: "O 4.5", overOdds: "+110", under: "U 4.5", underOdds: "-130" },
  },
  {
    id: 2, league: "Ligue 1", live: true, time: "55'",
    home: { name: "Monaco", full: "AS Monaco" },
    away: { name: "Lille", full: "LOSC Lille" },
    spread: { home: "+0.5", homeOdds: "-110", away: "-0.5", awayOdds: "-110" },
    moneyline: { home: "+180", away: "+155" },
    total: { over: "O 2.5", overOdds: "-105", under: "U 2.5", underOdds: "-115" },
  },
  {
    id: 3, league: "Premier League", live: false, date: "AUJ 17:30",
    home: { name: "Chelsea", full: "Chelsea FC" },
    away: { name: "Tottenham", full: "Tottenham Hotspur" },
    spread: { home: "-0.5", homeOdds: "+100", away: "+0.5", awayOdds: "-120" },
    moneyline: { home: "+140", away: "+210" },
    total: { over: "O 2.5", overOdds: "-120", under: "U 2.5", underOdds: "+100" },
  },
  {
    id: 4, league: "La Liga", live: false, date: "DEMAIN 21:00",
    home: { name: "Atletico", full: "Atletico Madrid" },
    away: { name: "Sevilla", full: "Sevilla FC" },
    spread: { home: "-1.5", homeOdds: "+120", away: "+1.5", awayOdds: "-140" },
    moneyline: { home: "-150", away: "+400" },
    total: { over: "O 2.5", overOdds: "+105", under: "U 2.5", underOdds: "-125" },
  },
];

const OddsCell = ({ top, bottom, positive }: { top: string; bottom: string; positive?: boolean }) => (
  <div className="odds-cell">
    <span className="text-[10px] text-muted-foreground leading-none">{top}</span>
    <span className={`text-xs font-bold leading-none mt-0.5 ${positive ? "text-success" : "text-highlight"}`}>{bottom}</span>
  </div>
);

const Sports = () => {
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
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                i === 0
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
          {matches.filter(m => m.live).map((match) => (
            <div key={match.id} className="rounded-2xl border border-highlight/20 overflow-hidden card-gradient-warm">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <div className="flex items-center gap-1">
                  <Flame size={11} className="text-live" />
                  <span className="text-[10px] text-live font-bold">{match.time}</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] px-3 pb-1">
                <div />
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">Spread</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">ML</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">Total</span>
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] gap-1.5 px-3 py-1">
                <span className="text-sm font-bold truncate self-center">{match.home.full}</span>
                <OddsCell top={match.spread.home} bottom={match.spread.homeOdds} />
                <OddsCell top="" bottom={match.moneyline.home} positive={match.moneyline.home.startsWith("+")} />
                <OddsCell top={match.total.over} bottom={match.total.overOdds} positive={match.total.overOdds.startsWith("+")} />
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] gap-1.5 px-3 py-1 pb-3">
                <span className="text-sm font-bold truncate self-center">{match.away.full}</span>
                <OddsCell top={match.spread.away} bottom={match.spread.awayOdds} />
                <OddsCell top="" bottom={match.moneyline.away} positive={match.moneyline.away.startsWith("+")} />
                <OddsCell top={match.total.under} bottom={match.total.underOdds} />
              </div>
              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <button className="text-[10px] text-highlight font-semibold">Plus →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="mt-6 px-4 mb-6">
        <h3 className="text-sm font-bold mb-3">PROCHAINS MATCHS</h3>
        <div className="space-y-3">
          {matches.filter(m => !m.live).map((match) => (
            <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-highlight font-bold">{match.date}</span>
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] px-3 pb-1">
                <div />
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">Spread</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">ML</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase">Total</span>
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] gap-1.5 px-3 py-1">
                <span className="text-sm font-bold truncate self-center">{match.home.full}</span>
                <OddsCell top={match.spread.home} bottom={match.spread.homeOdds} />
                <OddsCell top="" bottom={match.moneyline.home} positive={match.moneyline.home.startsWith("+")} />
                <OddsCell top={match.total.over} bottom={match.total.overOdds} positive={match.total.overOdds.startsWith("+")} />
              </div>
              <div className="grid grid-cols-[1fr_75px_75px_75px] gap-1.5 px-3 py-1 pb-3">
                <span className="text-sm font-bold truncate self-center">{match.away.full}</span>
                <OddsCell top={match.spread.away} bottom={match.spread.awayOdds} />
                <OddsCell top="" bottom={match.moneyline.away} positive={match.moneyline.away.startsWith("+")} />
                <OddsCell top={match.total.under} bottom={match.total.underOdds} />
              </div>
              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <button className="text-[10px] text-highlight font-semibold">Plus →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Sports;
