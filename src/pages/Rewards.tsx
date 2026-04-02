import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import SpinWheel from "@/components/SpinWheel";
import {
  ArrowLeft,
  Award,
  CalendarCheck,
  ChevronRight,
  Crown,
  Flame,
  Gift,
  Medal,
  Star,
  Target,
  Trophy,
  TrendingUp,
  Zap,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGamification, getXPForNextLevel, LEVEL_PERKS } from "@/contexts/GamificationContext";

const iconMap: Record<string, any> = {
  CalendarCheck, Target, Zap, TrendingUp, Gift, Flame, Trophy, Award,
};

// --- Achievement Badges ---
const achievements = [
  { id: "first_win", name: "First Victory", desc: "Win your first bet", icon: "🏆", unlocked: true, date: "Jan 12" },
  { id: "combo_3", name: "Combo Master", desc: "Win a 3-leg combo", icon: "⚡", unlocked: true, date: "Jan 28" },
  { id: "streak_5", name: "Hot Streak", desc: "Win 5 bets in a row", icon: "🔥", unlocked: true, date: "Feb 3" },
  { id: "high_roller", name: "High Roller", desc: "Stake R5,000+ in one bet", icon: "💎", unlocked: false, date: null },
  { id: "social_star", name: "Social Star", desc: "Get 10 bet copies", icon: "⭐", unlocked: false, date: null },
  { id: "parlay_king", name: "Parlay King", desc: "Win a 6+ leg combo", icon: "👑", unlocked: false, date: null },
  { id: "flexbet_pro", name: "FlexBet Pro", desc: "Win 3 FlexBets", icon: "🎯", unlocked: false, date: null },
  { id: "loyal", name: "Loyal Player", desc: "30-day login streak", icon: "🛡️", unlocked: false, date: null },
];

// --- Leaderboard ---
const leaderboard = [
  { rank: 1, name: "JoziPunter", xp: 12_450, streak: 8, avatar: "KB" },
  { rank: 2, name: "CapeTownBet", xp: 11_200, streak: 5, avatar: "LP" },
  { rank: 3, name: "DurbanKing", xp: 9_800, streak: 12, avatar: "MK" },
  { rank: 4, name: "PretoriaBoss", xp: 8_600, streak: 3, avatar: "GS" },
  { rank: 5, name: "SowetoBoss", xp: 7_900, streak: 6, avatar: "MB" },
  { rank: 6, name: "BloubergFlash", xp: 6_300, streak: 4, avatar: "KF" },
];

type Tab = "missions" | "badges" | "leaderboard" | "spin";

const Rewards = () => {
  const [tab, setTab] = useState<Tab>("missions");
  const [missionType, setMissionType] = useState<"daily" | "weekly">("daily");
  const { xp, level, streak, bestStreak, dailyMissions, weeklyMissions, claimMission } = useGamification();

  const xpNext = getXPForNextLevel(level);
  const xpCurrent = getXPForNextLevel(level - 1);
  const xpProgress = ((xp - xpCurrent) / (xpNext - xpCurrent)) * 100;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const myRank = { rank: 8, name: "Jean-Pierre K.", xp, streak, avatar: "JP" };

  const missions = missionType === "daily" ? dailyMissions : weeklyMissions;

  return (
    <MobileLayout>
      <section className="px-4 mt-4 mb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Gamification</h1>
        </div>

        {/* XP & Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/30 bg-primary/5 p-4 mb-4 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Crown size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-2xl font-black text-primary">{level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total XP</p>
              <motion.p
                key={xp}
                initial={{ scale: 1.3, color: "hsl(var(--highlight))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                transition={{ duration: 0.4 }}
                className="text-lg font-bold"
              >
                {xp.toLocaleString()}
              </motion.p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="relative z-10">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Level {level}</span>
              <span>{xp.toLocaleString()} / {xpNext.toLocaleString()} XP</span>
              <span>Level {level + 1}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-card-elevated border border-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-highlight"
              />
            </div>
          </div>

          {/* Next Perk */}
          {(() => {
            const nextPerkLevel = Object.keys(LEVEL_PERKS).map(Number).find((l) => l > level);
            if (!nextPerkLevel) return null;
            return (
              <div className="mt-3 flex items-center gap-2 text-[10px] relative z-10">
                <Gift size={12} className="text-highlight" />
                <span className="text-muted-foreground">Next reward at Level {nextPerkLevel}:</span>
                <span className="font-bold text-highlight">{LEVEL_PERKS[nextPerkLevel]}</span>
              </div>
            );
          })()}

          {/* Streak */}
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-card-elevated border border-border relative z-10">
            <Flame size={16} className="text-live" />
            <span className="text-xs font-bold">{streak}-day streak</span>
            <span className="text-[10px] text-muted-foreground ml-auto">Best: {bestStreak} days</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {([
            { key: "missions" as Tab, label: "Missions", icon: Target },
            { key: "badges" as Tab, label: "Badges", icon: Award },
            { key: "leaderboard" as Tab, label: "Ranking", icon: Trophy },
          ] as const).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  tab === t.key
                    ? "orange-gradient text-highlight-foreground glow-orange"
                    : "bg-card border border-border text-muted-foreground"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ====== MISSIONS TAB ====== */}
        {tab === "missions" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex gap-2 mb-2">
              {(["daily", "weekly"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setMissionType(type)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    missionType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-card-elevated border border-border text-muted-foreground"
                  }`}
                >
                  {type === "daily" ? "Daily" : "Weekly"}
                </button>
              ))}
            </div>

            {missions.map((m) => {
              const Icon = iconMap[m.icon] || Target;
              const pct = Math.round((m.progress / m.total) * 100);
              const canClaim = m.done && !m.claimed;
              return (
                <motion.div
                  key={m.id}
                  layout
                  className={`rounded-xl border p-3 flex items-center gap-3 transition-all ${
                    m.claimed
                      ? "border-success/30 bg-success/5 opacity-60"
                      : m.done
                      ? "border-highlight/40 bg-highlight/5"
                      : "border-border card-gradient"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.claimed ? "bg-success/20" : m.done ? "bg-highlight/20" : "bg-primary/10"
                  }`}>
                    <Icon size={18} className={m.claimed ? "text-success" : m.done ? "text-highlight" : "text-primary"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold ${m.claimed ? "text-success line-through" : ""}`}>{m.title}</p>
                      <span className="text-[10px] font-bold text-highlight">+{m.xp} XP</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${m.claimed ? "bg-success" : m.done ? "bg-highlight" : "bg-primary"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{m.progress}/{m.total}</span>
                    </div>
                  </div>

                  {/* Claim button */}
                  {canClaim && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => claimMission(m.id, missionType)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg orange-gradient text-highlight-foreground text-[10px] font-bold glow-orange"
                    >
                      Claim
                    </motion.button>
                  )}
                  {m.claimed && (
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-success" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ====== BADGES TAB ====== */}
        {tab === "badges" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">{unlockedCount} of {achievements.length} unlocked</p>
              <div className="flex items-center gap-1">
                <Medal size={14} className="text-highlight" />
                <span className="text-xs font-bold text-highlight">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-border overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-highlight to-primary"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {achievements.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    badge.unlocked
                      ? "border-highlight/30 bg-highlight/5"
                      : "border-border card-gradient opacity-60"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{badge.icon}</div>
                  <p className="text-xs font-bold">{badge.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{badge.desc}</p>
                  {badge.unlocked && badge.date && (
                    <p className="text-[9px] text-success font-medium mt-1.5">✓ {badge.date}</p>
                  )}
                  {!badge.unlocked && (
                    <p className="text-[9px] text-muted-foreground mt-1.5">🔒 Locked</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ====== LEADERBOARD TAB ====== */}
        {tab === "leaderboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <div className="flex items-end justify-center gap-3 mb-4 pt-2">
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, idx) => {
                const heights = ["h-16", "h-20", "h-12"];
                const colors = ["text-muted-foreground", "text-highlight", "text-orange-400"];
                const bgColors = ["bg-card-elevated", "bg-highlight/10", "bg-card-elevated"];
                const icons = [Medal, Crown, Medal];
                const Icon = icons[idx];
                return (
                  <div key={p.rank} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-card-elevated border border-border flex items-center justify-center text-[10px] font-bold mb-1">
                      {p.avatar}
                    </div>
                    <p className="text-[10px] font-bold mb-1 truncate max-w-[70px]">{p.name}</p>
                    <div className={`w-16 ${heights[idx]} rounded-t-xl ${bgColors[idx]} border border-border border-b-0 flex flex-col items-center justify-center`}>
                      <Icon size={14} className={colors[idx]} />
                      <span className="text-[10px] font-bold mt-0.5">#{p.rank}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {leaderboard.map((p) => (
              <div
                key={p.rank}
                className={`rounded-xl border p-3 flex items-center gap-3 ${
                  p.rank <= 3 ? "border-highlight/20 bg-highlight/5" : "border-border card-gradient"
                }`}
              >
                <span className={`w-7 text-center text-xs font-black ${
                  p.rank === 1 ? "text-highlight" : p.rank === 2 ? "text-muted-foreground" : p.rank === 3 ? "text-orange-400" : "text-muted-foreground"
                }`}>
                  #{p.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-card-elevated border border-border flex items-center justify-center text-[10px] font-bold">
                  {p.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.xp.toLocaleString()} XP</p>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-live" />
                  <span className="text-[10px] font-bold">{p.streak}</span>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-center gap-3 mt-2">
              <span className="w-7 text-center text-xs font-black text-primary">#{myRank.rank}</span>
              <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center text-[10px] font-bold text-highlight-foreground">
                {myRank.avatar}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{myRank.name} <span className="text-[10px] text-primary">(You)</span></p>
                <p className="text-[10px] text-muted-foreground">{myRank.xp.toLocaleString()} XP</p>
              </div>
              <div className="flex items-center gap-1">
                <Flame size={12} className="text-live" />
                <span className="text-[10px] font-bold">{myRank.streak}</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="h-6" />
      </section>
    </MobileLayout>
  );
};

export default Rewards;
