import MobileLayout from "@/components/MobileLayout";
import { Clock, Gift, Percent, Star, Trophy } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const promos = [
  {
    id: 1,
    title: "Bonus de bienvenue",
    description: "100% jusqu'à 500€ sur votre premier dépôt",
    icon: Gift,
    tag: "Nouveau",
    expiry: "Offre permanente",
    color: "gold-gradient",
  },
  {
    id: 2,
    title: "Paris gratuits",
    description: "10€ de paris gratuits chaque week-end",
    icon: Trophy,
    tag: "Sports",
    expiry: "Chaque semaine",
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "Cashback Casino",
    description: "10% de cashback sur vos pertes au casino",
    icon: Percent,
    tag: "Casino",
    expiry: "Expire dans 3 jours",
    color: "bg-secondary",
  },
  {
    id: 4,
    title: "Programme VIP",
    description: "Points fidélité doublés ce mois-ci",
    icon: Star,
    tag: "VIP",
    expiry: "Jusqu'au 28 fév.",
    color: "bg-secondary",
  },
];

const Promotions = () => {
  return (
    <MobileLayout>
      {/* Hero */}
      <section className="relative mx-3 mt-3 rounded-2xl overflow-hidden">
        <img src={heroBanner} alt="Promotions" className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h2 className="text-lg font-display font-bold gold-text">Promotions</h2>
          <p className="text-xs text-muted-foreground">Offres exclusives Partouche</p>
        </div>
      </section>

      {/* Promo List */}
      <section className="px-3 mt-4 mb-4 space-y-3">
        {promos.map((promo) => {
          const Icon = promo.icon;
          return (
            <div key={promo.id} className="card-gradient rounded-xl p-4 border border-border cursor-pointer hover:border-primary/30 transition-colors">
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${promo.color} flex items-center justify-center`}>
                  <Icon size={20} className={promo.color === "gold-gradient" ? "text-primary-foreground" : "text-primary"} />
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
