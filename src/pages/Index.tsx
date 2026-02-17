import { ChevronRight, Flame, Zap } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import casinoPromo from "@/assets/casino-promo.jpg";
import slotsGame from "@/assets/slots-game.jpg";
import blackjackGame from "@/assets/blackjack-game.jpg";
import MobileLayout from "@/components/MobileLayout";

const liveSports = [
  { id: 1, league: "Ligue 1", home: "PSG", away: "OM", scoreHome: 2, scoreAway: 1, time: "67'", odds: [1.35, 5.20, 8.50] },
  { id: 2, league: "Premier League", home: "Arsenal", away: "Liverpool", scoreHome: 1, scoreAway: 1, time: "45'", odds: [2.10, 3.40, 3.60] },
  { id: 3, league: "La Liga", home: "Real Madrid", away: "Barcelona", scoreHome: 0, scoreAway: 0, time: "12'", odds: [2.50, 3.30, 2.80] },
];

const upcomingMatches = [
  { id: 4, league: "Champions League", home: "Bayern Munich", away: "Man City", date: "Demain 21:00", odds: [2.20, 3.50, 3.10] },
  { id: 5, league: "Serie A", home: "AC Milan", away: "Inter Milan", date: "Mer. 20:45", odds: [2.80, 3.20, 2.60] },
];

const casinoGames = [
  { id: 1, name: "Roulette VIP", image: casinoPromo, tag: "Live", players: 234 },
  { id: 2, name: "Golden Slots", image: slotsGame, tag: "Populaire", players: 1205 },
  { id: 3, name: "Blackjack Pro", image: blackjackGame, tag: "Nouveau", players: 89 },
];

const Index = () => {
  return (
    <MobileLayout>
      {/* Hero Banner */}
      <section className="relative mx-3 mt-3 rounded-2xl overflow-hidden">
        <img src={heroBanner} alt="Partouche Promo" className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Offre exclusive</p>
          <h2 className="text-lg font-display font-bold leading-tight mb-2">Bonus 100% jusqu'à 500€</h2>
          <button className="gold-gradient px-4 py-2 rounded-xl text-primary-foreground text-xs font-bold">
            Réclamer maintenant
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex gap-2 px-3 mt-4 overflow-x-auto hide-scrollbar">
        {["⚽ Football", "🏀 Basketball", "🎾 Tennis", "🏇 Courses", "🎰 Slots"].map((item) => (
          <button
            key={item}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-medium whitespace-nowrap hover:bg-card-elevated transition-colors"
          >
            {item}
          </button>
        ))}
      </section>

      {/* Live Sports */}
      <section className="mt-6 px-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-live/10">
              <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-live" />
              <span className="text-xs font-semibold text-live">EN DIRECT</span>
            </div>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2">
          {liveSports.map((match) => (
            <div key={match.id} className="card-gradient rounded-xl p-3 border border-border animate-slide-up">
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
                  <p className="text-sm font-bold text-primary">{match.scoreHome}</p>
                  <p className="text-sm font-bold text-primary">{match.scoreAway}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "X", "2"].map((label, i) => (
                  <button
                    key={label}
                    className="flex flex-col items-center py-1.5 rounded-lg bg-secondary hover:bg-card-elevated transition-colors"
                  >
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
      <section className="mt-6 px-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <h3 className="text-sm font-bold font-display">À VENIR</h3>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="card-gradient rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                <span className="text-[10px] text-muted-foreground">{match.date}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">{match.home} vs {match.away}</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {["1", "X", "2"].map((label, i) => (
                  <button
                    key={label}
                    className="flex flex-col items-center py-1.5 rounded-lg bg-secondary hover:bg-card-elevated transition-colors"
                  >
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="text-xs font-bold">{match.odds[i].toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Casino Section */}
      <section className="mt-6 px-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold font-display gold-text">🎰 CASINO</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {casinoGames.map((game) => (
            <div key={game.id} className="flex-shrink-0 w-36 rounded-xl overflow-hidden border border-border group cursor-pointer">
              <div className="relative">
                <img src={game.image} alt={game.name} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    game.tag === "Live" ? "bg-live text-live-foreground" :
                    game.tag === "Nouveau" ? "gold-gradient text-primary-foreground" :
                    "bg-secondary text-secondary-foreground"
                  }`}>
                    {game.tag}
                  </span>
                </div>
              </div>
              <div className="p-2 card-gradient">
                <p className="text-xs font-semibold truncate">{game.name}</p>
                <p className="text-[10px] text-muted-foreground">{game.players} joueurs</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
