import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUp, Check, ChevronDown, ChevronRight, Copy, CreditCard, Eye, EyeOff, FileText, Globe, HelpCircle, History, Lock, LogOut, Settings, Shield, ShoppingCart, Smartphone, Swords, Trophy, User, Users, Wallet, AlertTriangle } from "lucide-react";
import { useFollow } from "@/contexts/FollowContext";
import { useBetSlip } from "@/contexts/BetSlipContext";
import capitecLogo from "@/assets/payments/capitec.png";
import fnbLogo from "@/assets/payments/fnb.png";
import vodapayLogo from "@/assets/payments/vodapay.png";
import ozowLogo from "@/assets/payments/ozow.png";

const activeBets = [
  { match: "Kaizer Chiefs vs Orlando Pirates Club", pick: "Kaizer Chiefs (1)", odds: 1.85, stake: 100, status: "live", time: "67'" },
  { match: "DR Congo vs Zambia", pick: "DR Congo (1)", odds: 1.95, stake: 50, status: "upcoming", time: "SAT 5:00 PM" },
];

const betSlips = [
  {
    user: "KinshasaBet",
    avatar: "KB",
    slug: "kinshasabet",
    title: "Combo 3 Selections",
    status: "WON",
    statusColor: "bg-success text-success-foreground",
    wins: "3 of 3",
    odds: "4.50x",
    picks: [
      { name: "V. Osimhen", team: "Kaizer Chiefs", match: "vs. Orlando Pirates - TODAY", stat: "Goals", value: "0.5", badge: "TPM", badgeColor: "bg-primary", status: "won", matchId: 501, fullMatch: "Kaizer Chiefs vs Orlando Pirates", pick: "V. Osimhen +0.5 Goals", pickOdds: 1.75, league: "DStv Premiership" },
      { name: "C. Bakambu", team: "DR Congo", match: "vs. Zambia - TOMORROW", stat: "Shots", value: "2.5", badge: "RDC", badgeColor: "bg-highlight", status: "won", matchId: 502, fullMatch: "DR Congo vs Zambia", pick: "C. Bakambu +2.5 Shots", pickOdds: 1.90, league: "AFCON Qualifiers" },
    ],
    amount: "R50",
    payout: "R225",
  },
  {
    user: "LubumParieur",
    avatar: "LP",
    slug: "lubumparieur",
    title: "Combo 2 Selections",
    status: "LOST",
    statusColor: "bg-destructive text-destructive-foreground",
    wins: "1 of 2",
    odds: "2.00x",
    picks: [
      { name: "M. Chancel", team: "Kaizer Chiefs", match: "vs Mamelodi Sundowns - TODAY", stat: "Tackles", value: "1.5", badge: "TPM", badgeColor: "bg-primary", status: "lost", matchId: 503, fullMatch: "Kaizer Chiefs vs Mamelodi Sundowns", pick: "M. Chancel +1.5 Tackles", pickOdds: 2.10, league: "DStv Premiership" },
      { name: "Y. Mulumba", team: "Orlando Pirates", match: "vs. Lupopo - YESTERDAY", stat: "Passes", value: "3.5", badge: "ASV", badgeColor: "bg-accent", status: "won", matchId: 504, fullMatch: "Orlando Pirates vs Lupopo", pick: "Y. Mulumba +3.5 Passes", pickOdds: 1.65, league: "DStv Premiership" },
    ],
    amount: "R100",
    payout: "R0",
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState<"bets" | "friends" | "explore">("bets");
  const { isProfilePrivate, toggleProfilePrivacy } = useFollow();
  const { toggleSelection, isSelected, selections } = useBetSlip();
  const navigate = useNavigate();
  const [copiedSlip, setCopiedSlip] = useState<number | null>(null);

  const handleCopySlip = (slip: typeof betSlips[0], idx: number) => {
    slip.picks.forEach((pick) => {
      const id = `${pick.matchId}-${pick.pick}`;
      if (!isSelected(id)) {
        toggleSelection({
          id,
          matchId: pick.matchId,
          match: pick.fullMatch,
          pick: pick.pick,
          odds: pick.pickOdds,
          league: pick.league,
        });
      }
    });
    setCopiedSlip(idx);
    setTimeout(() => setCopiedSlip(null), 2000);
  };

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
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-muted-foreground">Kinshasa, DRC • Verified ✓</p>
                {isProfilePrivate ? (
                  <Lock size={10} className="text-muted-foreground" />
                ) : (
                  <Globe size={10} className="text-success" />
                )}
              </div>
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
              { label: "Balance", value: "R1,250" },
              { label: "Bonus", value: "R375" },
              { label: "Points", value: "1,240" },
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
              Deposit
            </Link>
            <Link to="/withdrawal" className="py-2.5 rounded-xl text-sm font-medium border border-border bg-card-elevated hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
              <CreditCard size={14} />
              Withdraw
            </Link>
          </div>
        </div>

        {/* Mobile Money */}
        <div className="mt-3 rounded-2xl p-3 border border-border card-gradient-warm">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={16} className="text-highlight" />
            <span className="text-xs font-bold">Mobile Money</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success ml-auto">Active</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { name: "Capitec", logo: capitecLogo },
              { name: "FNB", logo: fnbLogo },
              { name: "VodaPay", logo: vodapayLogo },
              { name: "Ozow", logo: ozowLogo },
            ].map((provider) => (
              <Link key={provider.name} to="/deposit" className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-card-elevated border border-border hover:border-highlight/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-card-elevated border border-border flex items-center justify-center p-1.5">
                  <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain rounded" loading="lazy" />
                </div>
                <span className="text-[9px] font-bold text-muted-foreground">{provider.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Toggle */}
      <section className="px-4 mt-3">
        <button
          onClick={toggleProfilePrivacy}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
            isProfilePrivate
              ? "border-highlight/30 bg-highlight/5"
              : "border-border card-gradient"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isProfilePrivate ? "bg-highlight/15" : "bg-card-elevated border border-border"
            }`}>
              {isProfilePrivate ? <Lock size={16} className="text-highlight" /> : <Globe size={16} className="text-success" />}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">
                {isProfilePrivate ? "Private Profile" : "Public Profile"}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {isProfilePrivate ? "Only followers can see your bets" : "Everyone can see your profile"}
              </p>
            </div>
          </div>
          <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
            isProfilePrivate ? "bg-highlight" : "bg-border"
          }`}>
            <div className={`w-5 h-5 rounded-full bg-background shadow transition-transform ${
              isProfilePrivate ? "translate-x-4" : "translate-x-0"
            }`} />
          </div>
        </button>
      </section>

      {/* Gamification Banner */}
      <section className="px-4 mt-3">
        <Link to="/rewards" className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-highlight/30 bg-highlight/5 hover:bg-highlight/10 transition-colors">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-highlight" />
            <div>
              <span className="text-sm font-bold text-highlight">Gamification & Missions</span>
              <p className="text-[10px] text-muted-foreground">Level 12 • 2,340 XP • 4-day streak 🔥</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-highlight" />
        </Link>
      </section>

      {/* Challenge Banner */}
      <section className="px-4 mt-3">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
          <Swords size={18} className="text-primary" />
          <span className="text-sm font-bold text-primary">Challenge your friends</span>
        </button>
      </section>

      {/* Tabs: Paris actifs / Amis / Explorer */}
      <section className="px-4 mt-4">
        <div className="flex border-b border-border">
          {[
            { key: "bets" as const, label: "Active Bets" },
            { key: "friends" as const, label: "Friends" },
            { key: "explore" as const, label: "Explore" },
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
                <span className="text-xs font-bold">R{bet.stake.toLocaleString()}</span>
              </div>
            </div>
          ))}
          <Link to="/betslip" className="block text-center text-xs text-primary font-semibold py-2">
            View slip →
          </Link>
          <Link to="/transactions" className="flex items-center justify-between p-3 rounded-xl border border-border card-gradient">
            <div className="flex items-center gap-2">
              <History size={16} className="text-highlight" />
              <span className="text-sm font-medium">Transaction History</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
          <Link to="/bet-history" className="flex items-center justify-between p-3 rounded-xl border border-border card-gradient">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <span className="text-sm font-medium">Bet History</span>
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
                <Link to={`/profile/${slip.slug}`} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-card-elevated border border-border flex items-center justify-center text-xs font-bold text-highlight">
                    {slip.avatar}
                  </div>
                  <span className="text-sm font-semibold">{slip.user}</span>
                </Link>
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
                    <span className="text-[10px] text-muted-foreground">STAKE</span>
                    <span className="text-sm font-bold">{slip.amount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{slip.payout}</span>
                    <span className="text-[10px] text-muted-foreground">WIN</span>
                  </div>
                </div>

                {/* Copy Bet Button */}
                <button
                  onClick={() => handleCopySlip(slip, idx)}
                  className={`mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    copiedSlip === idx
                      ? "bg-highlight/20 text-highlight border border-highlight/30"
                      : "orange-gradient text-highlight-foreground glow-orange"
                  }`}
                >
                  {copiedSlip === idx ? (
                    <><Check size={14} /> Added to slip!</>
                  ) : (
                    <><Copy size={14} /> Copy this bet</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Menu Items */}
      <section className="px-4 mt-4 mb-6 space-y-3">
        <div className="rounded-2xl border border-border overflow-hidden card-gradient divide-y divide-border">
          {[
            { icon: Shield, label: "KYC Verification", subtitle: "Identity documents", to: "/kyc" },
            { icon: Users, label: "Referral", subtitle: "Invite friends, earn bonuses", to: "/account" },
            { icon: AlertTriangle, label: "Responsible Gaming", subtitle: "Limits, self-exclusion", to: "/responsible-gaming" },
            { icon: FileText, label: "Terms & Conditions", subtitle: "Legal terms and notices", to: "/terms" },
            { icon: Shield, label: "Privacy", subtitle: "Law 20/017, Code 23/010", to: "/privacy" },
            { icon: Settings, label: "Settings", subtitle: "Language, notifications", to: "/account" },
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
          <span>Log Out</span>
        </button>

        {/* Footer License */}
        <div className="text-center py-2">
          <p className="text-[9px] text-muted-foreground">License N°2024/GJ/001 | 18+ | Responsible Gaming</p>
          <p className="text-[9px] text-muted-foreground">© 2025 Trivelta - All rights reserved</p>
        </div>
      </section>

      {/* Floating Bet Slip Indicator */}
      {selections.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-50">
          <button
            onClick={() => navigate("/betslip")}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl orange-gradient glow-orange shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={20} className="text-highlight-foreground" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-card text-highlight text-[10px] font-bold flex items-center justify-center">
                  {selections.length}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-highlight-foreground">{selections.length} selection{selections.length > 1 ? "s" : ""}</p>
                <p className="text-[10px] text-highlight-foreground/70">Total odds: {selections.reduce((acc, s) => acc * s.odds, 1).toFixed(2)}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-highlight-foreground">View slip →</span>
          </button>
        </div>
      )}
    </MobileLayout>
  );
};

export default Account;
