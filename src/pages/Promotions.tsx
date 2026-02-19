import MobileLayout from "@/components/MobileLayout";
import { Clock, Gift, Percent, Star, Trophy, Smartphone } from "lucide-react";

const promos = [
  { id: 1, title: "Welcome Bonus", description: "100% up to 50,000 CDF on your first deposit", icon: Gift, tag: "New", expiry: "Permanent offer", featured: true },
  { id: 2, title: "Free Bets Linafoot", description: "5,000 CDF in free bets every weekend", icon: Trophy, tag: "Sports", expiry: "Every week", featured: false },
  { id: 3, title: "Mobile Money Bonus", description: "5% bonus on every deposit via M-Pesa or Airtel Money", icon: Smartphone, tag: "Deposit", expiry: "Until March 31", featured: false },
  { id: 4, title: "Casino Cashback", description: "10% cashback on your casino losses", icon: Percent, tag: "Casino", expiry: "Expires in 3 days", featured: false },
  { id: 5, title: "VIP Program", description: "Double loyalty points this month", icon: Star, tag: "VIP", expiry: "Until Feb 28", featured: false },
];

const Promotions = () => {
  return (
    <MobileLayout>
      <section className="px-4 mt-3">
        <h2 className="text-lg font-bold">Discover</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Exclusive Trivelta offers</p>
      </section>

      <section className="px-4 mt-4 mb-6 space-y-3">
        {promos.map((promo) => {
          const Icon = promo.icon;
          return (
            <div key={promo.id} className={`rounded-2xl p-4 border cursor-pointer transition-all hover:border-highlight/30 ${promo.featured ? "border-highlight/20 card-gradient-warm glow-orange" : "border-border card-gradient"}`}>
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${promo.featured ? "orange-gradient" : "bg-card-elevated"}`}>
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
