import MobileLayout from "@/components/MobileLayout";
import { Search, Star, Users } from "lucide-react";
import casinoPromo from "@/assets/casino-promo.jpg";
import slotsGame from "@/assets/slots-game.jpg";
import blackjackGame from "@/assets/blackjack-game.jpg";

const categories = ["Tout", "Slots", "Table", "Live", "Jackpot", "Nouveau"];

const games = [
  { id: 1, name: "Roulette VIP", image: casinoPromo, category: "Live", players: 234, rating: 4.8 },
  { id: 2, name: "Golden Slots", image: slotsGame, category: "Slots", players: 1205, rating: 4.5 },
  { id: 3, name: "Blackjack Pro", image: blackjackGame, category: "Table", players: 89, rating: 4.9 },
  { id: 4, name: "Mega Fortune", image: slotsGame, category: "Jackpot", players: 567, rating: 4.3 },
  { id: 5, name: "Baccarat Elite", image: casinoPromo, category: "Live", players: 156, rating: 4.7 },
  { id: 6, name: "Texas Hold'em", image: blackjackGame, category: "Table", players: 312, rating: 4.6 },
];

const Casino = () => {
  return (
    <MobileLayout>
      {/* Search */}
      <section className="px-4 mt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 mt-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                i === 0
                  ? "orange-gradient text-highlight-foreground glow-orange"
                  : "bg-card border border-border text-secondary-foreground hover:bg-card-elevated"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 mt-4">
        <div className="relative rounded-2xl overflow-hidden border border-highlight/20">
          <img src={casinoPromo} alt="Casino VIP" className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center pl-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Exclusif</span>
            <h2 className="text-lg font-bold mt-1">Roulette VIP</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Tables privées disponibles</p>
            <button className="mt-2 orange-gradient px-4 py-1.5 rounded-lg text-highlight-foreground text-xs font-bold w-fit glow-orange">
              Jouer maintenant
            </button>
          </div>
          <div className="absolute bottom-2 right-3">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground font-bold">18+</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="px-4 mt-4 mb-6">
        <h3 className="text-sm font-bold mb-3">JEUX POPULAIRES</h3>
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <div key={game.id} className="rounded-xl overflow-hidden border border-border group cursor-pointer hover:border-highlight/30 transition-all">
              <div className="relative">
                <img src={game.image} alt={game.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-card/80 text-[9px] font-semibold backdrop-blur-sm border border-border">
                    {game.category}
                  </span>
                </div>
              </div>
              <div className="p-2.5 card-gradient">
                <p className="text-xs font-semibold">{game.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <Star size={10} className="text-highlight fill-highlight" />
                    <span className="text-[10px] text-muted-foreground">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{game.players}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Casino;
