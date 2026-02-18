import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, FileText, HelpCircle, History, LogOut, Settings, Shield, Smartphone, User, Wallet, AlertTriangle } from "lucide-react";

const activeBets = [
  { match: "TP Mazembe vs AS Vita Club", pick: "TP Mazembe (1)", odds: 1.85, stake: 10000, status: "live", time: "67'" },
  { match: "RD Congo vs Zambie", pick: "RD Congo (1)", odds: 1.95, stake: 5000, status: "upcoming", time: "SAM 17:00" },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState<"bets" | "history">("bets");

  return (
    <MobileLayout>
      {/* Profile Header */}
      <section className="px-4 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center glow-orange">
              <User size={22} className="text-highlight-foreground" />
            </div>
            <div>
              <h2 className="text-base font-bold">Jean-Pierre K.</h2>
              <p className="text-xs text-muted-foreground">Kinshasa, RDC • Vérifié ✓</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="p-2 rounded-xl hover:bg-secondary transition-colors">
              <Settings size={18} className="text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mt-3 rounded-2xl p-3 border border-border card-gradient">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Solde", value: "125 000 CDF" },
              { label: "Bonus", value: "37 500 CDF" },
              { label: "Points", value: "1 240" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-xl bg-card-elevated border border-border">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="text-xs font-bold text-highlight">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link to="/deposit" className="orange-gradient py-2.5 rounded-xl text-highlight-foreground text-sm font-bold glow-orange flex items-center justify-center gap-1.5">
              <Wallet size={14} />
              Déposer
            </Link>
            <Link to="/withdrawal" className="py-2.5 rounded-xl text-sm font-medium border border-border bg-card-elevated hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
              <CreditCard size={14} />
              Retirer
            </Link>
          </div>
        </div>

        {/* Mobile Money */}
        <div className="mt-3 rounded-2xl p-3 border border-border card-gradient-warm">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={16} className="text-highlight" />
            <span className="text-xs font-bold">Mobile Money</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success ml-auto">Actif</span>
          </div>
          <div className="flex items-center gap-2">
            {["M-Pesa", "Airtel Money", "Orange Money", "Africell"].map((provider) => (
              <Link key={provider} to="/deposit" className="flex-1 text-[10px] py-2 rounded-lg bg-card-elevated border border-border hover:border-highlight/40 transition-all text-center font-medium">
                {provider}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 mt-4">
        <div className="flex border-b border-border">
          {[
            { key: "bets" as const, label: "Paris actifs" },
            { key: "history" as const, label: "Historique" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors relative ${
                activeTab === tab.key ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 orange-gradient rounded-full" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Active Bets */}
      {activeTab === "bets" && (
        <section className="px-4 mt-4 space-y-2">
          {activeBets.map((bet, idx) => (
            <div key={idx} className="rounded-xl border border-border card-gradient p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold">{bet.match}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  bet.status === "live" ? "bg-live/20 text-live" : "bg-highlight/20 text-highlight"
                }`}>
                  {bet.status === "live" ? `🔴 ${bet.time}` : bet.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-primary font-medium">{bet.pick}</span>
                  <span className="text-xs text-highlight font-bold ml-2">@ {bet.odds.toFixed(2)}</span>
                </div>
                <span className="text-xs font-bold">{bet.stake.toLocaleString()} CDF</span>
              </div>
            </div>
          ))}
          <Link to="/betslip" className="block text-center text-xs text-primary font-semibold py-2">
            Voir le coupon →
          </Link>
        </section>
      )}

      {activeTab === "history" && (
        <section className="px-4 mt-4">
          <Link to="/transactions" className="flex items-center justify-between p-3 rounded-xl border border-border card-gradient">
            <div className="flex items-center gap-2">
              <History size={16} className="text-highlight" />
              <span className="text-sm font-medium">Voir l'historique complet</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
        </section>
      )}

      {/* Menu Items */}
      <section className="px-4 mt-4 mb-6 space-y-3">
        <div className="rounded-2xl border border-border overflow-hidden card-gradient divide-y divide-border">
          {[
            { icon: Shield, label: "Vérification KYC", subtitle: "Documents d'identité", to: "/kyc" },
            { icon: AlertTriangle, label: "Jeu responsable", subtitle: "Limites, auto-exclusion", to: "/responsible-gaming" },
            { icon: FileText, label: "Conditions générales", subtitle: "CGU et mentions légales", to: "/terms" },
            { icon: Shield, label: "Confidentialité", subtitle: "Loi 20/017, Code 23/010", to: "/privacy" },
            { icon: Settings, label: "Paramètres", subtitle: "Langue, notifications", to: "/account" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.to} className="flex items-center gap-3 w-full p-3.5 hover:bg-card-elevated transition-colors">
                <div className="w-9 h-9 rounded-xl bg-card-elevated border border-border flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>

        {/* Footer License */}
        <div className="text-center py-2">
          <p className="text-[9px] text-muted-foreground">Licence N°2024/GJ/001 | 18+ | Jeu responsable</p>
          <p className="text-[9px] text-muted-foreground">© 2025 Partouche RDC - Tous droits réservés</p>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Account;
