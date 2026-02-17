import MobileLayout from "@/components/MobileLayout";
import { Clock, Gift, Percent, Star, Trophy } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "Bonus de bienvenue",
    description: "100% jusqu'à 500€ sur votre premier dépôt",
    icon: Gift,
    tag: "Nouveau",
    expiry: "Offre permanente",
    featured: true,
  },
  {
    id: 2,
    title: "Paris gratuits",
    description: "10€ de paris gratuits chaque week-end",
    icon: Trophy,
    tag: "Sports",
    expiry: "Chaque semaine",
    featured: false,
  },
  {
    id: 3,
    title: "Cashback Casino",
    description: "10% de cashback sur vos pertes au casino",
    icon: Percent,
    tag: "Casino",
    expiry: "Expire dans 3 jours",
    featured: false,
  },
  {
    id: 4,
    title: "Programme VIP",
    description: "Points fidélité doublés ce mois-ci",
    icon: Star,
    tag: "VIP",
    expiry: "Jusqu'au 28 fév.",
    featured: false,
  },
];

const Promotions = () => {
  return (
    <MobileLayout>
      <section className="px-4 mt-3">
        <h2 className="text-lg font-bold">Découvrir</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Offres exclusives Partouche</p>
      </section>

      <section className="px-4 mt-4 mb-6 space-y-3">
        {promos.map((promo) => {
          const Icon = promo.icon;
          return (
            <div
              key={promo.id}
              className={`rounded-2xl p-4 border cursor-pointer transition-all hover:border-highlight/30 ${
                promo.featured
                  ? "border-highlight/20 card-gradient-warm glow-orange"
                  : "border-border card-gradient"
              }`}
            >
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  promo.featured ? "orange-gradient" : "bg-card-elevated"
                }`}>
                  <Icon size={20} className={promo.featured ? "text-highlight-foreground" : "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-bold">{promo.title}</h4>
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-[9px] font-semibold text-primary">{promo.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{promo.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{promo.expiry}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </MobileLayout>
  );
};

export default Promotions;
