import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ChevronDown, CreditCard, HelpCircle, LogOut, Settings, Shield, User, Wallet, Smartphone, Users, TrendingUp, ArrowUp } from "lucide-react";

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
    amount: "5 000 FC",
    payout: "22 500 FC",
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
    amount: "10 000 FC",
    payout: "0 FC",
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "explore">("friends");

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
              <h2 className="text-base font-bold">Joueur VIP</h2>
              <p className="text-xs text-muted-foreground">Kinshasa, RDC</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
              <Settings size={18} className="text-muted-foreground" />
            </button>
            <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
              <HelpCircle size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mt-3 rounded-2xl p-3 border border-border card-gradient">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Solde", value: "125 000 FC" },
              { label: "Bonus", value: "37 500 FC" },
              { label: "Points", value: "1 240" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-xl bg-card-elevated border border-border">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="text-xs font-bold text-highlight">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="orange-gradient py-2.5 rounded-xl text-highlight-foreground text-sm font-bold glow-orange flex items-center justify-center gap-1.5">
              <Wallet size={14} />
              Déposer
            </button>
            <button className="py-2.5 rounded-xl text-sm font-medium border border-border bg-card-elevated hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
              <CreditCard size={14} />
              Retirer
            </button>
          </div>
        </div>

        {/* Mobile Money - DR Congo feature */}
        <div className="mt-3 rounded-2xl p-3 border border-border card-gradient-warm">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={16} className="text-highlight" />
            <span className="text-xs font-bold">Mobile Money</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success ml-auto">Actif</span>
          </div>
          <div className="flex items-center gap-2">
            {["M-Pesa", "Airtel Money", "Orange Money"].map((provider) => (
              <button key={provider} className="flex-1 text-[10px] py-2 rounded-lg bg-card-elevated border border-border hover:border-highlight/40 transition-all text-center font-medium">
                {provider}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs: Amis / Explorer */}
      <section className="px-4 mt-4">
        <div className="flex border-b border-border">
          {[
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

      {/* Bet Slip Cards */}
      <section className="px-4 mt-4 mb-6 space-y-4">
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

        {/* Quick Actions - DR Congo */}
        <div className="rounded-2xl border border-border card-gradient p-3">
          <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-highlight" />
            Populaire en RDC
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Linafoot", desc: "Championnat national" },
              { label: "TP Mazembe", desc: "Prochain match" },
              { label: "AS Vita Club", desc: "Ligue des Champions" },
              { label: "Léopards", desc: "Équipe nationale" },
            ].map((item) => (
              <button key={item.label} className="p-2.5 rounded-xl bg-card-elevated border border-border hover:border-highlight/40 transition-all text-left">
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="rounded-2xl border border-border overflow-hidden card-gradient divide-y divide-border">
          {[
            { icon: Shield, label: "Vérification KYC", subtitle: "Documents d'identité" },
            { icon: Users, label: "Parrainage", subtitle: "Invitez vos amis, gagnez des bonus" },
            { icon: Settings, label: "Paramètres", subtitle: "Langue, notifications" },
          ].map((item) => {
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
              </button>
            );
          })}
        </div>

        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </section>
    </MobileLayout>
  );
};

export default Account;
