import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ChevronDown, ChevronRight, CreditCard, FileText, HelpCircle, History, LogOut, Settings, Shield, Smartphone, Swords, User, Users, Wallet, AlertTriangle } from "lucide-react";

const activeBets = [
  { match: "TP Mazembe vs AS Vita Club", pick: "TP Mazembe (1)", odds: 1.85, stake: 10000, status: "live", time: "67'" },
  { match: "RD Congo vs Zambie", pick: "RD Congo (1)", odds: 1.95, stake: 5000, status: "upcoming", time: "SAM 17:00" },
];

const betSlips = [
  {
    user: "KinshasaBet",
    avatar: "KB",
    title: "Combi 3 Sélections",
    status: "GAGNÉ",
    statusColor: "bg-success text-success-foreground",
    wins: "3 sur 3",
    odds: "4.50x",
    picks: [
      { name: "V. Osimhen", team: "TP Mazembe", match: "vs. AS Vita - AUJOURD'HUI", stat: "Buts", value: "0.5", badge: "TPM", badgeColor: "bg-primary", status: "won" },
      { name: "C. Bakambu", team: "RD Congo", match: "vs. Zambie - DEMAIN", stat: "Tirs", value: "2.5", badge: "RDC", badgeColor: "bg-highlight", status: "won" },
    ],
    amount: "5 000 CDF",
    payout: "22 500 CDF",
  },
  {
    user: "LubumParieur",
    avatar: "LP",
    title: "Combi 2 Sélections",
    status: "PERDU",
    statusColor: "bg-destructive text-destructive-foreground",
    wins: "1 sur 2",
    odds: "2.00x",
    picks: [
      { name: "M. Chancel", team: "TP Mazembe", match: "@DCM - AUJOURD'HUI", stat: "Tacles", value: "1.5", badge: "TPM", badgeColor: "bg-primary", status: "lost" },
      { name: "Y. Mulumba", team: "AS Vita", match: "vs. Lupopo - HIER", stat: "Passes", value: "3.5", badge: "ASV", badgeColor: "bg-accent", status: "won" },
    ],
    amount: "10 000 CDF",
    payout: "0 CDF",
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState<"bets" | "friends" | "explore">("bets");

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
            <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
              <Settings size={18} className="text-muted-foreground" />
            </Link>
            <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
              <HelpCircle size={18} className="text-muted-foreground" />
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

      {/* Challenge Banner */}
      <section className="px-4 mt-3">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
          <Swords size={18} className="text-primary" />
          <span className="text-sm font-bold text-primary">Défiez vos amis</span>
        </button>
      </section>

      {/* Tabs: Paris actifs / Amis / Explorer */}
      <section className="px-4 mt-4">
        <div className="flex border-b border-border">
          {[
            { key: "bets" as const, label: "Paris actifs" },
            { key: "friends" as const, label: "Amis" },
            { key: "explore" as const, label: "Explorer" },
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

      {/* Active Bets Tab */}
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
          <Link to="/transactions" className="flex items-center justify-between p-3 rounded-xl border border-border card-gradient">
            <div className="flex items-center gap-2">
              <History size={16} className="text-highlight" />
              <span className="text-sm font-medium">Historique des transactions</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
        </section>
      )}

      {/* Friends / Explore - Social Bet Slip Cards */}
      {(activeTab === "friends" || activeTab === "explore") && (
        <section className="px-4 mt-4 space-y-4">
          {betSlips.map((slip, idx) => (
            <div key={idx} className="rounded-2xl border border-border card-gradient overflow-hidden">
              {/* Slip Header */}
              <div className="flex items-center gap-3 p-3 border-b border-border">
                <div className="w-9 h-9 rounded-full bg-card-elevated border border-border flex items-center justify-center text-xs font-bold text-highlight">
                  {slip.avatar}
                </div>
                <span className="text-sm font-semibold">{slip.user}</span>
              </div>

              {/* Slip Info */}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">{slip.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${slip.statusColor}`}>
                    {slip.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{slip.wins}</span>
                  <div className="flex items-center gap-1 text-highlight font-bold text-sm">
                    {slip.odds}
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Player Picks */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {slip.picks.map((pick, pIdx) => (
                    <div
                      key={pIdx}
                      className="rounded-xl bg-card-elevated border border-border p-3 flex flex-col items-center text-center relative overflow-hidden"
                    >
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold text-primary-foreground mb-2 ${pick.badgeColor}`}>
                        {pick.badge}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                        <User size={18} className="text-muted-foreground" />
                      </div>
                      <p className="text-xs font-bold">{pick.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{pick.match}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUp size={12} className="text-highlight" />
                        <span className="text-sm font-bold">{pick.value}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{pick.stat}</p>
                      <div className="w-full h-1 rounded-full mt-2 overflow-hidden bg-border">
                        <div
                          className={`h-full rounded-full ${pick.status === "won" ? "bg-success" : "bg-destructive"}`}
                          style={{ width: pick.status === "won" ? "100%" : "60%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">MISE</span>
                    <span className="text-sm font-bold">{slip.amount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{slip.payout}</span>
                    <span className="text-[10px] text-muted-foreground">GAIN</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Menu Items */}
      <section className="px-4 mt-4 mb-6 space-y-3">
        <div className="rounded-2xl border border-border overflow-hidden card-gradient divide-y divide-border">
          {[
            { icon: Shield, label: "Vérification KYC", subtitle: "Documents d'identité", to: "/kyc" },
            { icon: Users, label: "Parrainage", subtitle: "Invitez vos amis, gagnez des bonus", to: "/account" },
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
