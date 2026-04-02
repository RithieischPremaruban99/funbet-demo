import MobileLayout from "@/components/MobileLayout";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, Trophy, TrendingUp, Flame, Target,
  Copy, Check, Crown, Medal, Award, Users, Calendar, Lock, Globe,
  Wallet, CreditCard, Smartphone, Banknote
} from "lucide-react";
import { useState } from "react";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { useFollow } from "@/contexts/FollowContext";
import { UserPlus, UserCheck } from "lucide-react";

// South African payment providers
const paymentMethods = [
  { id: "capitec", name: "Capitec Pay", icon: "💳", color: "text-primary" },
  { id: "fnb", name: "FNB eWallet", icon: "📱", color: "text-accent" },
  { id: "vodapay", name: "VodaPay", icon: "📲", color: "text-destructive" },
  { id: "ozow", name: "Ozow (EFT)", icon: "🏦", color: "text-success" },
];

// Mock user database — fully localized for South Africa
const usersData: Record<string, {
  name: string; avatar: string; verified: boolean; bio: string;
  winRate: string; profit: string; streak: number; rank: number;
  totalBets: number; memberSince: string; followers: number; following: number;
  isPrivate: boolean; city: string; favouriteTeam: string; preferredPayment: string;
  balance: number; totalDeposited: number; totalWithdrawn: number;
  recentBets: { match: string; pick: string; odds: number; status: "won" | "lost" | "pending"; league: string; matchId: number; stake: number; payout: number }[];
}> = {
  "patrice-m": {
    name: "Patrice M.", avatar: "PM", verified: true, isPrivate: false,
    bio: "Kaizer Chiefs fan forever ⚽ | Pro bettor | Jozi 🇿🇦",
    city: "Johannesburg", favouriteTeam: "Kaizer Chiefs", preferredPayment: "capitec",
    balance: 4_250, totalDeposited: 15_000, totalWithdrawn: 8_500,
    winRate: "64%", profit: "+R1,850", streak: 5, rank: 8,
    totalBets: 342, memberSince: "Mar 2024", followers: 128, following: 45,
    recentBets: [
      { match: "Kaizer Chiefs vs Orlando Pirates", pick: "Kaizer Chiefs (1)", odds: 1.85, status: "pending", league: "DStv Premiership", matchId: 101, stake: 500, payout: 0 },
      { match: "Bafana vs Nigeria", pick: "South Africa (1)", odds: 1.95, status: "won", league: "AFCON Qualifiers", matchId: 201, stake: 300, payout: 585 },
      { match: "Sundowns vs SuperSport", pick: "Sundowns (1)", odds: 2.10, status: "lost", league: "DStv Premiership", matchId: 301, stake: 200, payout: 0 },
    ],
  },
  "aimee-k": {
    name: "Aimée K.", avatar: "AK", verified: false, isPrivate: false,
    bio: "Bafana Bafana all the way 🇿🇦 | Cape Town",
    city: "Cape Town", favouriteTeam: "Bafana Bafana", preferredPayment: "fnb",
    balance: 6_800, totalDeposited: 20_000, totalWithdrawn: 12_000,
    winRate: "71%", profit: "+R2,900", streak: 8, rank: 4,
    totalBets: 215, memberSince: "Jan 2024", followers: 256, following: 89,
    recentBets: [
      { match: "Bafana vs Nigeria", pick: "South Africa (1)", odds: 1.95, status: "won", league: "AFCON Qualifiers", matchId: 201, stake: 1_000, payout: 1_950 },
      { match: "Chiefs vs Al Ahly", pick: "Chiefs (1)", odds: 2.60, status: "won", league: "CAF Champions", matchId: 202, stake: 500, payout: 1_300 },
      { match: "Pirates vs Sundowns", pick: "Draw (X)", odds: 3.10, status: "won", league: "DStv Premiership", matchId: 203, stake: 200, payout: 620 },
    ],
  },
  "david-n": {
    name: "David N.", avatar: "DN", verified: true, isPrivate: true,
    bio: "Football analyst | PSL specialist | Durban 🏖️",
    city: "Durban", favouriteTeam: "AmaZulu FC", preferredPayment: "ozow",
    balance: 2_100, totalDeposited: 8_000, totalWithdrawn: 3_500,
    winRate: "58%", profit: "+R950", streak: 2, rank: 15,
    totalBets: 178, memberSince: "Jun 2024", followers: 67, following: 34,
    recentBets: [
      { match: "Sundowns vs SuperSport", pick: "Draw (X)", odds: 3.20, status: "pending", league: "DStv Premiership", matchId: 301, stake: 150, payout: 0 },
      { match: "Pirates vs TS Galaxy", pick: "Pirates (1)", odds: 1.45, status: "won", league: "DStv Premiership", matchId: 302, stake: 500, payout: 725 },
    ],
  },
  "serge-t": {
    name: "Serge T.", avatar: "ST", verified: true, isPrivate: false,
    bio: "🏆 #1 Ranked | The combo king | Pretoria",
    city: "Pretoria", favouriteTeam: "Mamelodi Sundowns", preferredPayment: "vodapay",
    balance: 12_500, totalDeposited: 35_000, totalWithdrawn: 22_000,
    winRate: "78%", profit: "+R4,200", streak: 12, rank: 1,
    totalBets: 456, memberSince: "Dec 2023", followers: 1240, following: 23,
    recentBets: [
      { match: "SuperSport vs AmaZulu", pick: "AmaZulu (2)", odds: 2.30, status: "won", league: "DStv Premiership", matchId: 401, stake: 1_000, payout: 2_300 },
      { match: "Cape Town City vs Royal AM", pick: "CTC (1)", odds: 1.80, status: "won", league: "DStv Premiership", matchId: 402, stake: 800, payout: 1_440 },
      { match: "Stellenbosch vs TS Galaxy", pick: "Stellenbosch (1)", odds: 1.15, status: "won", league: "Nedbank Cup", matchId: 404, stake: 2_000, payout: 2_300 },
    ],
  },
  "gloire-m": {
    name: "Gloire M.", avatar: "GM", verified: false, isPrivate: false,
    bio: "Passionate bettor | Soweto 🏙️",
    city: "Soweto", favouriteTeam: "Orlando Pirates", preferredPayment: "capitec",
    balance: 7_300, totalDeposited: 18_000, totalWithdrawn: 10_000,
    winRate: "72%", profit: "+R3,150", streak: 8, rank: 2,
    totalBets: 389, memberSince: "Feb 2024", followers: 890, following: 56,
    recentBets: [
      { match: "Chiefs vs Pirates", pick: "Draw (X)", odds: 3.40, status: "lost", league: "DStv Premiership", matchId: 101, stake: 300, payout: 0 },
      { match: "Bafana vs Nigeria", pick: "Over 2.5 Goals", odds: 2.10, status: "won", league: "AFCON Qualifiers", matchId: 201, stake: 500, payout: 1_050 },
    ],
  },
  "rachel-b": {
    name: "Rachel B.", avatar: "RB", verified: false, isPrivate: true,
    bio: "The odds never lie 📊 | Bloemfontein",
    city: "Bloemfontein", favouriteTeam: "Chippa United", preferredPayment: "fnb",
    balance: 3_900, totalDeposited: 12_000, totalWithdrawn: 7_500,
    winRate: "69%", profit: "+R2,800", streak: 6, rank: 3,
    totalBets: 267, memberSince: "Apr 2024", followers: 456, following: 78,
    recentBets: [
      { match: "Pirates vs Sundowns", pick: "Pirates (1)", odds: 1.90, status: "won", league: "DStv Premiership", matchId: 203, stake: 1_000, payout: 1_900 },
    ],
  },
  "patrick-k": {
    name: "Patrick K.", avatar: "PK", verified: false, isPrivate: false,
    bio: "Orlando Pirates supporter 🏴‍☠️ | Port Elizabeth",
    city: "Port Elizabeth", favouriteTeam: "Orlando Pirates", preferredPayment: "ozow",
    balance: 1_800, totalDeposited: 6_000, totalWithdrawn: 3_200,
    winRate: "65%", profit: "+R1,950", streak: 5, rank: 4,
    totalBets: 198, memberSince: "May 2024", followers: 234, following: 67,
    recentBets: [],
  },
  "esther-l": {
    name: "Esther L.", avatar: "EL", verified: false, isPrivate: false,
    bio: "Weekend bettor 🎯 | Polokwane",
    city: "Polokwane", favouriteTeam: "Baroka FC", preferredPayment: "vodapay",
    balance: 950, totalDeposited: 4_000, totalWithdrawn: 2_500,
    winRate: "63%", profit: "+R1,700", streak: 4, rank: 5,
    totalBets: 156, memberSince: "Jul 2024", followers: 123, following: 45,
    recentBets: [],
  },
  "christian-w": {
    name: "Christian W.", avatar: "CW", verified: false, isPrivate: false,
    bio: "South African football lover ⚽ | Nelspruit",
    city: "Nelspruit", favouriteTeam: "TS Galaxy", preferredPayment: "capitec",
    balance: 2_200, totalDeposited: 5_500, totalWithdrawn: 2_800,
    winRate: "61%", profit: "+R1,450", streak: 3, rank: 6,
    totalBets: 134, memberSince: "Aug 2024", followers: 89, following: 34,
    recentBets: [],
  },
  "kinshasabet": {
    name: "JoziBet", avatar: "JB", verified: false, isPrivate: false,
    bio: "Bettor from Johannesburg 🏙️",
    city: "Johannesburg", favouriteTeam: "Kaizer Chiefs", preferredPayment: "capitec",
    balance: 1_200, totalDeposited: 3_000, totalWithdrawn: 1_500,
    winRate: "55%", profit: "+R450", streak: 1, rank: 22,
    totalBets: 89, memberSince: "Sep 2024", followers: 34, following: 12,
    recentBets: [],
  },
  "lubumparieur": {
    name: "DurbanFlash", avatar: "DF", verified: false, isPrivate: false,
    bio: "From Durban with passion 🔥",
    city: "Durban", favouriteTeam: "AmaZulu FC", preferredPayment: "fnb",
    balance: 600, totalDeposited: 2_000, totalWithdrawn: 800,
    winRate: "48%", profit: "-R150", streak: 0, rank: 45,
    totalBets: 67, memberSince: "Oct 2024", followers: 23, following: 8,
    recentBets: [],
  },
};

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown size={16} className="text-highlight" />;
  if (rank === 2) return <Medal size={16} className="text-muted-foreground" />;
  if (rank === 3) return <Award size={16} className="text-primary" />;
  return null;
};

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { toggleSelection, isSelected } = useBetSlip();
  const { isFollowing, toggleFollow } = useFollow();
  const [activeTab, setActiveTab] = useState<"bets" | "stats" | "wallet">("bets");

  const user = usersData[username || ""];

  if (!user) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <p className="text-lg font-bold">User not found</p>
          <Link to="/social" className="mt-3 text-sm text-primary font-semibold">← Back to community</Link>
        </div>
      </MobileLayout>
    );
  }

  const preferredPay = paymentMethods.find((p) => p.id === user.preferredPayment);

  return (
    <MobileLayout>
      {/* Header */}
      <div className="px-4 mt-3">
        <Link to="/social" className="flex items-center gap-2 text-muted-foreground mb-3">
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </Link>

        {/* Profile Card */}
        <motion.div
          className="rounded-2xl border border-border card-gradient p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full red-gradient flex items-center justify-center text-lg font-bold text-primary-foreground glow-orange">
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold">{user.name}</h1>
                {user.verified && <Star size={14} className="text-primary fill-primary" />}
                <RankIcon rank={user.rank} />
                {user.isPrivate ? (
                  <Lock size={12} className="text-muted-foreground" />
                ) : (
                  <Globe size={12} className="text-success" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{user.bio}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-muted-foreground">📍 {user.city}</span>
                <span className="text-[10px] text-muted-foreground">⚽ {user.favouriteTeam}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-muted-foreground"><strong className="text-foreground">{user.followers.toLocaleString()}</strong> followers</span>
                <span className="text-[10px] text-muted-foreground"><strong className="text-foreground">{user.following}</strong> following</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <motion.button
              onClick={() => username && toggleFollow(username)}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                username && isFollowing(username)
                  ? "border border-primary bg-primary/10 text-primary"
                  : "red-gradient text-primary-foreground glow-orange"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {username && isFollowing(username) ? (
                <><UserCheck size={14} /> Following</>
              ) : (
                <><UserPlus size={14} /> Follow</>
              )}
            </motion.button>
            <motion.button
              className="py-2 rounded-xl border border-border bg-card-elevated text-xs font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Message
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-4 gap-2 mt-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { icon: TrendingUp, label: "Win Rate", value: user.winRate },
            { icon: Trophy, label: "Rank", value: `#${user.rank}` },
            { icon: Flame, label: "Streak", value: `${user.streak}🔥` },
            { icon: Target, label: "Bets", value: user.totalBets.toString() },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-border card-gradient p-2.5 text-center">
                <Icon size={14} className="mx-auto text-primary mb-1" />
                <p className="text-xs font-bold">{stat.value}</p>
                <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Balance & Profit Card */}
        <motion.div
          className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">Balance</span>
            </div>
            <span className="text-sm font-bold text-primary">R{user.balance.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Member since {user.memberSince}</span>
            </div>
            <span className={`text-sm font-bold ${user.profit.startsWith("+") ? "text-success" : "text-destructive"}`}>
              {user.profit}
            </span>
          </div>
          {preferredPay && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
              <span className="text-sm">{preferredPay.icon}</span>
              <span className="text-[10px] text-muted-foreground">Preferred: <strong className="text-foreground">{preferredPay.name}</strong></span>
            </div>
          )}
        </motion.div>

        {/* Privacy Gate */}
        {user.isPrivate && !isFollowing(username || "") ? (
          <motion.div
            className="mt-6 rounded-2xl border border-border card-gradient p-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Lock size={32} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="text-sm font-bold">Private Profile</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Follow {user.name} to see their bets and stats.
            </p>
            <motion.button
              onClick={() => username && toggleFollow(username)}
              className="mt-4 px-6 py-2 rounded-xl red-gradient text-xs font-bold text-primary-foreground glow-orange"
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus size={14} className="inline mr-1.5" />
              Follow
            </motion.button>
          </motion.div>
        ) : (
          <>
        {/* Tabs */}
        <div className="flex border-b border-border mt-4">
          {[
            { key: "bets" as const, label: "Recent Bets" },
            { key: "stats" as const, label: "Statistics" },
            { key: "wallet" as const, label: "Wallet" },
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 red-gradient rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-3 pb-24 space-y-2">
          {activeTab === "bets" && (
            <>
              {user.recentBets.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No recent bets
                </div>
              ) : (
                user.recentBets.map((bet, idx) => {
                  const betId = `${bet.matchId}-${bet.pick}`;
                  const selected = isSelected(betId);
                  return (
                    <motion.div
                      key={idx}
                      className="rounded-xl border border-border card-gradient p-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">{bet.league}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          bet.status === "won" ? "bg-success/20 text-success" :
                          bet.status === "lost" ? "bg-destructive/20 text-destructive" :
                          "bg-highlight/20 text-highlight"
                        }`}>
                          {bet.status === "won" ? "WON" : bet.status === "lost" ? "LOST" : "IN PLAY"}
                        </span>
                      </div>
                      <p className="text-xs font-semibold">{bet.match}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-primary font-medium">{bet.pick}</span>
                        <span className="text-xs font-bold text-highlight">@{bet.odds.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                        <span>Stake: <strong className="text-foreground">R{bet.stake.toLocaleString()}</strong></span>
                        {bet.payout > 0 && (
                          <span>Payout: <strong className="text-success">R{bet.payout.toLocaleString()}</strong></span>
                        )}
                      </div>
                      {bet.status === "pending" && (
                        <motion.button
                          onClick={() => toggleSelection({
                            id: betId,
                            matchId: bet.matchId,
                            match: bet.match,
                            pick: bet.pick,
                            odds: bet.odds,
                            league: bet.league,
                          })}
                          className={`mt-2 w-full py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                            selected
                              ? "bg-highlight/20 text-highlight border border-highlight/30"
                              : "bg-card-elevated border border-border text-muted-foreground hover:border-highlight/40"
                          }`}
                          whileTap={{ scale: 0.97 }}
                        >
                          {selected ? <Check size={12} /> : <Copy size={12} />}
                          {selected ? "Added!" : "Copy this bet"}
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })
              )}
            </>
          )}

          {activeTab === "stats" && (
            <div className="space-y-3">
              {[
                { label: "Total bets", value: user.totalBets.toString() },
                { label: "Win rate", value: user.winRate },
                { label: "Total profit", value: user.profit },
                { label: "Best streak", value: `${user.streak} wins` },
                { label: "Ranking", value: `#${user.rank}` },
                { label: "Favourite team", value: user.favouriteTeam },
                { label: "City", value: user.city },
                { label: "Followers", value: user.followers.toLocaleString() },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center justify-between p-3 rounded-xl border border-border card-gradient"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="text-sm font-bold">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="space-y-3">
              {/* Balance Overview */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={16} className="text-primary" />
                  <span className="text-xs font-bold">Account Overview</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Balance", value: `R${user.balance.toLocaleString()}`, bold: true, color: "text-primary" },
                    { label: "Total deposited", value: `R${user.totalDeposited.toLocaleString()}`, bold: false, color: "text-success" },
                    { label: "Total withdrawn", value: `R${user.totalWithdrawn.toLocaleString()}`, bold: false, color: "text-foreground" },
                    { label: "Net profit", value: user.profit, bold: true, color: user.profit.startsWith("+") ? "text-success" : "text-destructive" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{row.label}</span>
                      <span className={`text-xs ${row.bold ? "font-bold" : "font-medium"} ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="rounded-xl border border-border card-gradient p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={16} className="text-accent" />
                  <span className="text-xs font-bold">Payment Methods (ZA)</span>
                </div>
                <div className="space-y-2">
                  {paymentMethods.map((pm) => {
                    const isPreferred = pm.id === user.preferredPayment;
                    return (
                      <div
                        key={pm.id}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          isPreferred ? "border-primary/30 bg-primary/5" : "border-border"
                        }`}
                      >
                        <span className="text-lg">{pm.icon}</span>
                        <div className="flex-1">
                          <p className="text-xs font-bold">{pm.name}</p>
                          {isPreferred && (
                            <p className="text-[9px] text-primary font-medium">Preferred method</p>
                          )}
                        </div>
                        {isPreferred && <Check size={14} className="text-primary" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/deposit"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl red-gradient text-primary-foreground text-xs font-bold glow-orange"
                >
                  <Banknote size={14} />
                  Deposit (ZAR)
                </Link>
                <Link
                  to="/withdrawal"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card-elevated text-xs font-bold"
                >
                  <Smartphone size={14} />
                  Withdraw
                </Link>
              </div>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default UserProfile;
