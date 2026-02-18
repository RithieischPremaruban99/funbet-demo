import { ChevronRight, Flame, Zap, Swords, Radio, Trophy, Dices, Shield } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Link } from "react-router-dom";
import TeamBadge from "@/components/TeamBadge";

const categories = [
  { icon: Flame, label: "Top Paris", sublabel: "Populaire", gradient: true, to: "/sports" },
  { icon: Dices, label: "Casino", sublabel: "Live", gradient: false, to: "/casino" },
  { icon: Radio, label: "Live", sublabel: "En direct", gradient: true, to: "/sports" },
  { icon: Trophy, label: "Tous les", sublabel: "Sports", gradient: false, to: "/sports" },
];

const liveMatches = [
  {
    id: 1,
    league: "Ligue 1 - Journée 24",
    time: "67'",
    home: { name: "Paris SG", abbr: "PSG" },
    away: { name: "Olympique Lyonnais", abbr: "OL" },
    odds: { home: "1.45", draw: "4.50", away: "6.00" },
    score: "2 - 1",
  },
  {
    id: 2,
    league: "Ligue 1 - Journée 24",
    time: "52'",
    home: { name: "RC Lens", abbr: "LENS" },
    away: { name: "AS Monaco", abbr: "ASM" },
    odds: { home: "2.30", draw: "3.20", away: "3.10" },
    score: "1 - 1",
  },
  {
    id: 3,
    league: "Ligue 1 - Journée 24",
    time: "38'",
    home: { name: "LOSC Lille", abbr: "LOSC" },
    away: { name: "OGC Nice", abbr: "NICE" },
    odds: { home: "1.90", draw: "3.40", away: "4.00" },
    score: "1 - 0",
  },
];

const upcomingMatches = [
  {
    id: 4,
    league: "Champions League",
    date: "21:00",
    dateLabel: "DEMAIN",
    home: { name: "Paris SG", abbr: "PSG" },
    away: { name: "FC Bayern", abbr: "BAY" },
    odds: { home: "2.20", draw: "3.40", away: "3.00" },
  },
  {
    id: 5,
    league: "Champions League",
    date: "21:00",
    dateLabel: "DEMAIN",
    home: { name: "FC Barcelona", abbr: "BAR" },
    away: { name: "Inter Milan", abbr: "INT" },
    odds: { home: "1.80", draw: "3.60", away: "4.20" },
  },
  {
    id: 6,
    league: "Ligue 1 - Journée 25",
    date: "17:00",
    dateLabel: "SAM",
    home: { name: "Olympique Marseille", abbr: "OM" },
    away: { name: "Paris SG", abbr: "PSG" },
    odds: { home: "3.40", draw: "3.30", away: "2.10" },
  },
  {
    id: 7,
    league: "Premier League",
    date: "16:00",
    dateLabel: "DIM",
    home: { name: "Liverpool FC", abbr: "LIV" },
    away: { name: "Manchester City", abbr: "MCI" },
    odds: { home: "2.00", draw: "3.50", away: "3.40" },
  },
];

const OddsButton = ({ label, value }: { label: string; value: string }) => (
  <button className="odds-cell flex-1">
    <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    <span className="text-xs font-bold leading-none mt-0.5 text-highlight">{value}</span>
  </button>
);

const Index = () => {
  return (
    <MobileLayout>
      {/* Top actions */}
      <section className="px-4 mt-3 flex items-center justify-between">
        <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Connexion</Link>
        <Link to="/register" className="px-5 py-2 rounded-full orange-gradient text-highlight-foreground text-sm font-bold glow-orange">
          Créer un compte
        </Link>
      </section>

      {/* 18+ Badge */}
      <section className="px-4 mt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary" />
          <span className="text-[10px] text-primary font-semibold">18+ | Jeu responsable | Licence ARJEL-RDC N°2024/GJ/001</span>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                to={cat.to}
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
              </Link>
            );
          })}
        </div>
      </section>

      {/* Challenge Banner */}
      <section className="px-4 mt-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
          <Swords size={18} className="text-primary" />
          <span className="text-sm font-bold text-primary">Défiez vos amis</span>
        </button>
      </section>

      {/* Live Matches */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            <span className="text-sm font-bold text-live">EN DIRECT</span>
          </div>
          <Link to="/sports" className="flex items-center gap-1 text-xs text-highlight font-semibold">
            Tous les matchs <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {liveMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-highlight/20 overflow-hidden card-gradient-warm animate-slide-up">
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
                  <OddsButton label="1" value={match.odds.home} />
                  <OddsButton label="X" value={match.odds.draw} />
                  <OddsButton label="2" value={match.odds.away} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <Link to="/sports" className="text-[10px] text-highlight font-semibold">Plus de paris →</Link>
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
          <Link to="/sports" className="flex items-center gap-1 text-xs text-highlight font-semibold">
            Tout voir <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient animate-slide-up">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-highlight font-bold">{match.dateLabel} {match.date}</span>
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
                  <OddsButton label="1" value={match.odds.home} />
                  <OddsButton label="X" value={match.odds.draw} />
                  <OddsButton label="2" value={match.odds.away} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 px-3 py-2 border-t border-border/50">
                <Link to="/sports" className="text-[10px] text-highlight font-semibold">Plus de paris →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
