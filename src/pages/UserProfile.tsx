import MobileLayout from "@/components/MobileLayout";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, Trophy, TrendingUp, Flame, Target,
  Copy, Check, Crown, Medal, Award, Users, Calendar, Lock, Globe
} from "lucide-react";
import { useState } from "react";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { useFollow } from "@/contexts/FollowContext";
import { UserPlus, UserCheck } from "lucide-react";

// Mock user database
const usersData: Record<string, {
  name: string; avatar: string; verified: boolean; bio: string;
  winRate: string; profit: string; streak: number; rank: number;
  totalBets: number; memberSince: string; followers: number; following: number;
  isPrivate: boolean;
  recentBets: { match: string; pick: string; odds: number; status: "won" | "lost" | "pending"; league: string; matchId: number }[];
}> = {
  "patrice-m": {
    name: "Patrice M.", avatar: "PM", verified: true, isPrivate: false,
    bio: "TP Mazembe fan forever 🐊 | Pro bettor",
    winRate: "64%", profit: "+$1,850", streak: 5, rank: 8,
    totalBets: 342, memberSince: "Mar 2024", followers: 128, following: 45,
    recentBets: [
      { match: "TP Mazembe vs AS Vita", pick: "TP Mazembe (1)", odds: 1.85, status: "pending", league: "Linafoot", matchId: 101 },
      { match: "DR Congo vs Zambia", pick: "DR Congo (1)", odds: 1.95, status: "won", league: "AFCON Qualifiers", matchId: 201 },
      { match: "DCMP vs FC Lupopo", pick: "DCMP (1)", odds: 2.10, status: "lost", league: "Linafoot", matchId: 301 },
    ],
  },
  "aimee-k": {
    name: "Aimée K.", avatar: "AK", verified: false, isPrivate: false,
    bio: "The Leopards never disappoint 🇨🇩",
    winRate: "71%", profit: "+$2,900", streak: 8, rank: 4,
    totalBets: 215, memberSince: "Jan 2024", followers: 256, following: 89,
    recentBets: [
      { match: "DR Congo vs Zambia", pick: "DR Congo (1)", odds: 1.95, status: "won", league: "AFCON Qualifiers", matchId: 201 },
      { match: "TP Mazembe vs Al Ahly", pick: "TP Mazembe (1)", odds: 2.60, status: "won", league: "CAF Champions", matchId: 202 },
      { match: "AS Vita vs DCMP", pick: "Draw (X)", odds: 3.10, status: "won", league: "Linafoot", matchId: 203 },
    ],
  },
  "david-n": {
    name: "David N.", avatar: "DN", verified: true, isPrivate: true,
    bio: "Football analyst | Linafoot specialist",
    winRate: "58%", profit: "+$950", streak: 2, rank: 15,
    totalBets: 178, memberSince: "Jun 2024", followers: 67, following: 34,
    recentBets: [
      { match: "DCMP vs FC Lupopo", pick: "Draw (X)", odds: 3.20, status: "pending", league: "Linafoot", matchId: 301 },
      { match: "AS Vita vs Rangers", pick: "AS Vita (1)", odds: 1.45, status: "won", league: "Linafoot", matchId: 302 },
    ],
  },
  "serge-t": {
    name: "Serge T.", avatar: "ST", verified: true, isPrivate: false,
    bio: "🏆 #1 Ranked | The combo king",
    winRate: "78%", profit: "+$4,200", streak: 12, rank: 1,
    totalBets: 456, memberSince: "Dec 2023", followers: 1240, following: 23,
    recentBets: [
      { match: "FC Lupopo vs CS Don Bosco", pick: "CS Don Bosco (2)", odds: 2.30, status: "won", league: "Linafoot", matchId: 401 },
      { match: "JS Bazano vs FC Blessing", pick: "JS Bazano (1)", odds: 1.80, status: "won", league: "Linafoot", matchId: 402 },
      { match: "Mazembe vs Renaissance", pick: "TP Mazembe (1)", odds: 1.15, status: "won", league: "Linafoot", matchId: 404 },
    ],
  },
  "gloire-m": {
    name: "Gloire M.", avatar: "GM", verified: false, isPrivate: false,
    bio: "Passionate bettor | Kinshasa 🏙️",
    winRate: "72%", profit: "+$3,150", streak: 8, rank: 2,
    totalBets: 389, memberSince: "Feb 2024", followers: 890, following: 56,
    recentBets: [
      { match: "TP Mazembe vs AS Vita", pick: "Draw (X)", odds: 3.40, status: "lost", league: "Linafoot", matchId: 101 },
      { match: "DR Congo vs Zambia", pick: "Over 2.5 Goals", odds: 2.10, status: "won", league: "AFCON Qualifiers", matchId: 201 },
    ],
  },
  "rachel-b": {
    name: "Rachel B.", avatar: "RB", verified: false, isPrivate: true,
    bio: "The odds never lie 📊",
    winRate: "69%", profit: "+$2,800", streak: 6, rank: 3,
    totalBets: 267, memberSince: "Apr 2024", followers: 456, following: 78,
    recentBets: [
      { match: "AS Vita vs DCMP", pick: "AS Vita (1)", odds: 1.90, status: "won", league: "Linafoot", matchId: 203 },
    ],
  },
  "patrick-k": {
    name: "Patrick K.", avatar: "PK", verified: false, isPrivate: false,
    bio: "DCMP supporter 💙",
    winRate: "65%", profit: "+$1,950", streak: 5, rank: 4,
    totalBets: 198, memberSince: "May 2024", followers: 234, following: 67,
    recentBets: [],
  },
  "esther-l": {
    name: "Esther L.", avatar: "EL", verified: false, isPrivate: false,
    bio: "Weekend bettor 🎯",
    winRate: "63%", profit: "+$1,700", streak: 4, rank: 5,
    totalBets: 156, memberSince: "Jul 2024", followers: 123, following: 45,
    recentBets: [],
  },
  "christian-w": {
    name: "Christian W.", avatar: "CW", verified: false, isPrivate: false,
    bio: "Congolese football lover ⚽",
    winRate: "61%", profit: "+$1,450", streak: 3, rank: 6,
    totalBets: 134, memberSince: "Aug 2024", followers: 89, following: 34,
    recentBets: [],
  },
  "kinshasabet": {
    name: "KinshasaBet", avatar: "KB", verified: false, isPrivate: false,
    bio: "Bettor from Kinshasa 🏙️",
    winRate: "55%", profit: "+$450", streak: 1, rank: 22,
    totalBets: 89, memberSince: "Sep 2024", followers: 34, following: 12,
    recentBets: [],
  },
  "lubumparieur": {
    name: "LubumBettor", avatar: "LP", verified: false, isPrivate: false,
    bio: "From Lubumbashi with passion 🔥",
    winRate: "48%", profit: "-$150", streak: 0, rank: 45,
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
  const [activeTab, setActiveTab] = useState<"bets" | "stats">("bets");

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
            <div className="w-16 h-16 rounded-full orange-gradient flex items-center justify-center text-lg font-bold text-highlight-foreground glow-orange">
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
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] text-muted-foreground"><strong className="text-foreground">{user.followers}</strong> followers</span>
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
                  : "orange-gradient text-highlight-foreground glow-orange"
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

        {/* Profit & Member Info */}
        <motion.div
          className="flex items-center justify-between mt-3 p-3 rounded-xl border border-border card-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Member since {user.memberSince}</span>
          </div>
          <span className={`text-sm font-bold ${user.profit.startsWith("+") ? "text-success" : "text-destructive"}`}>
            {user.profit}
          </span>
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
              className="mt-4 px-6 py-2 rounded-xl orange-gradient text-xs font-bold text-highlight-foreground glow-orange"
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
                { label: "Followers", value: user.followers.toString() },
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
        </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default UserProfile;