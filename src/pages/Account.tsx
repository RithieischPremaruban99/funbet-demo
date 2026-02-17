import MobileLayout from "@/components/MobileLayout";
import { ChevronRight, CreditCard, HelpCircle, LogOut, Settings, Shield, User, Wallet } from "lucide-react";

const menuItems = [
  { icon: Wallet, label: "Mon portefeuille", subtitle: "Dépôts & Retraits" },
  { icon: CreditCard, label: "Historique", subtitle: "Transactions & Paris" },
  { icon: Shield, label: "Vérification", subtitle: "Documents KYC" },
  { icon: Settings, label: "Paramètres", subtitle: "Préférences du compte" },
  { icon: HelpCircle, label: "Aide", subtitle: "Support & FAQ" },
];

const Account = () => {
  return (
    <MobileLayout>
      {/* Profile */}
      <section className="px-4 mt-3">
        <div className="rounded-2xl p-4 border border-border card-gradient">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full orange-gradient flex items-center justify-center glow-orange">
              <User size={24} className="text-highlight-foreground" />
            </div>
            <div>
              <h2 className="text-base font-bold">Joueur VIP</h2>
              <p className="text-xs text-muted-foreground">membre depuis 2024</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Solde", value: "250,00€" },
              { label: "Bonus", value: "75,00€" },
              { label: "Points", value: "1,240" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-xl bg-card-elevated border border-border">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-bold text-highlight">{stat.value}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 orange-gradient py-2.5 rounded-xl text-highlight-foreground text-sm font-bold glow-orange">
            Déposer
          </button>
        </div>
      </section>

      {/* Menu */}
      <section className="px-4 mt-4 mb-6">
        <div className="rounded-2xl border border-border overflow-hidden card-gradient divide-y divide-border">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="flex items-center gap-3 w-full p-3.5 hover:bg-card-elevated transition-colors">
                <div className="w-9 h-9 rounded-xl bg-card-elevated border border-border flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </section>
    </MobileLayout>
  );
};

export default Account;
