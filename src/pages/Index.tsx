import { ChevronRight, Flame, Zap, Swords, Radio, Trophy, Dices } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const categories = [
  { icon: Flame, label: "Top Paris", sublabel: "Populaire", gradient: true },
  { icon: Dices, label: "Casino", sublabel: "Live", gradient: false },
  { icon: Radio, label: "Live", sublabel: "En direct", gradient: true },
  { icon: Trophy, label: "Tous les", sublabel: "Sports", gradient: false },
];

const liveMatches = [
  {
    id: 1,
    league: "Ligue 1, Journée 24",
    time: "67'",
    home: { name: "Paris Saint-Germain", abbr: "PSG" },
    away: { name: "Olympique de Marseille", abbr: "OM" },
    spread: { home: "-1.5", homeOdds: "-120", away: "+1.5", awayOdds: "+105" },
    moneyline: { home: "-250", away: "+680" },
    total: { over: "O 3.5", overOdds: "-110", under: "U 3.5", underOdds: "-110" },
  },
  {
    id: 2,
    league: "Premier League, MD 26",
    time: "45'",
    home: { name: "Arsenal", abbr: "ARS" },
    away: { name: "Liverpool FC", abbr: "LIV" },
    spread: { home: "-0.5", homeOdds: "-105", away: "+0.5", awayOdds: "-115" },
    moneyline: { home: "+140", away: "+210" },
    total: { over: "O 2.5", overOdds: "-130", under: "U 2.5", underOdds: "+110" },
  },
];

const upcomingMatches = [
  {
    id: 3,
    league: "Champions League, 1/8",
    date: "21:00",
    dateLabel: "DEMAIN",
    home: { name: "Bayern Munich", abbr: "BAY" },
    away: { name: "Manchester City", abbr: "MCI" },
    spread: { home: "-0.5", homeOdds: "-110", away: "+0.5", awayOdds: "-110" },
    moneyline: { home: "+130", away: "+210" },
    total: { over: "O 3.5", overOdds: "+100", under: "U 3.5", underOdds: "-120" },
  },
  {
    id: 4,
    league: "La Liga, Journée 25",
    date: "21:00",
    dateLabel: "MER",
    home: { name: "Real Madrid", abbr: "RMA" },
    away: { name: "FC Barcelona", abbr: "BAR" },
    spread: { home: "-0.5", homeOdds: "+100", away: "+0.5", awayOdds: "-120" },
    moneyline: { home: "+150", away: "+180" },
    total: { over: "O 2.5", overOdds: "-105", under: "U 2.5", underOdds: "-115" },
  },
];

const OddsCell = ({ top, bottom, positive }: { top: string; bottom: string; positive?: boolean }) => (
  <div className="odds-cell">
    <span className="text-[10px] text-muted-foreground leading-none">{top}</span>
    <span className={`text-xs font-bold leading-none mt-0.5 ${positive ? "text-success" : "text-highlight"}`}>{bottom}</span>
  </div>
);

const Index = () => {
  return (
    <MobileLayout>
      {/* Top actions - Sign In / Create Account style from screenshot */}
      <section className="px-4 mt-3 flex items-center justify-between">
        <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">Connexion</button>
        <button className="px-5 py-2 rounded-full orange-gradient text-highlight-foreground text-sm font-bold glow-orange">
          Créer un compte
        </button>
      </section>

      {/* Category Cards - Rebet style */}
      <section className="px-4 mt-5">
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border transition-all ${
                  cat.gradient
                    ? "border-highlight/30 card-gradient-warm glow-orange"
                    : "border-border bg-card hover:bg-card-elevated"
                }`}
              >
                <Icon size={22} className={cat.gradient ? "text-highlight" : "text-muted-foreground"} />
                <div className="text-center">
                  <p className="text-[11px] font-bold leading-tight">{cat.label}</p>
                  <p className={`text-[10px] leading-tight ${cat.gradient ? "text-highlight" : "text-muted-foreground"}`}>{cat.sublabel}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Challenge Banner - like "Pick Against Friends" */}
      <section className="px-4 mt-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
          <Swords size={18} className="text-primary" />
          <span className="text-sm font-bold text-primary">Défiez vos amis</span>
        </button>
      </section>

      {/* Live Matches - Rebet table layout */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            <span className="text-sm font-bold text-live">EN DIRECT</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-highlight font-semibold">
            Tous les matchs <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {liveMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-highlight/20 overflow-hidden card-gradient-warm animate-slide-up">
              {/* League Header */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <div className="flex items-center gap-1">
                  <Flame size={11} className="text-live" />
                  <span className="text-[10px] text-live font-bold">{match.time}</span>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[1fr_80px_80px_80px] px-3 pb-1">
                <div />
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">Spread</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">ML</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">Total</span>
              </div>

              {/* Home Team */}
              <div className="grid grid-cols-[1fr_80px_80px_80px] gap-1.5 px-3 py-1">
                <div className="flex items-center">
                  <span className="text-sm font-bold truncate">{match.home.name}</span>
                </div>
                <OddsCell top={match.spread.home} bottom={match.spread.homeOdds} />
                <OddsCell top="" bottom={match.moneyline.home} positive={match.moneyline.home.startsWith("+")} />
                <OddsCell top={match.total.over} bottom={match.total.overOdds} />
              </div>

              {/* Away Team */}
              <div className="grid grid-cols-[1fr_80px_80px_80px] gap-1.5 px-3 py-1 pb-3">
                <div className="flex items-center">
                  <span className="text-sm font-bold truncate">{match.away.name}</span>
                </div>
                <OddsCell top={match.spread.away} bottom={match.spread.awayOdds} positive={match.spread.awayOdds.startsWith("+")} />
                <OddsCell top="" bottom={match.moneyline.away} positive={match.moneyline.away.startsWith("+")} />
                <OddsCell top={match.total.under} bottom={match.total.underOdds} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <button className="text-[10px] text-muted-foreground font-medium hover:text-foreground transition-colors">Match ↗</button>
                <button className="text-[10px] text-highlight font-semibold">Plus de paris →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mt-6 px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-highlight" />
            <span className="text-sm font-bold">À VENIR</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-highlight font-semibold">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient animate-slide-up">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-highlight font-bold">{match.dateLabel} {match.date}</span>
              </div>

              <div className="grid grid-cols-[1fr_80px_80px_80px] px-3 pb-1">
                <div />
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">Spread</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">ML</span>
                <span className="text-[9px] text-muted-foreground font-semibold text-center uppercase tracking-wider">Total</span>
              </div>

              <div className="grid grid-cols-[1fr_80px_80px_80px] gap-1.5 px-3 py-1">
                <div className="flex items-center">
                  <span className="text-sm font-bold truncate">{match.home.name}</span>
                </div>
                <OddsCell top={match.spread.home} bottom={match.spread.homeOdds} />
                <OddsCell top="" bottom={match.moneyline.home} positive={match.moneyline.home.startsWith("+")} />
                <OddsCell top={match.total.over} bottom={match.total.overOdds} positive={match.total.overOdds.startsWith("+")} />
              </div>

              <div className="grid grid-cols-[1fr_80px_80px_80px] gap-1.5 px-3 py-1 pb-3">
                <div className="flex items-center">
                  <span className="text-sm font-bold truncate">{match.away.name}</span>
                </div>
                <OddsCell top={match.spread.away} bottom={match.spread.awayOdds} />
                <OddsCell top="" bottom={match.moneyline.away} positive={match.moneyline.away.startsWith("+")} />
                <OddsCell top={match.total.under} bottom={match.total.underOdds} />
              </div>

              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <button className="text-[10px] text-muted-foreground font-medium hover:text-foreground transition-colors">Match ↗</button>
                <button className="text-[10px] text-highlight font-semibold">Plus de paris →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
