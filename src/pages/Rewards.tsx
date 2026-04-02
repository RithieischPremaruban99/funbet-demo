import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Clock,
  Crown,
  Flame,
  Info,
  Lock,
  Star,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "@/contexts/GamificationContext";
import SpinWheel from "@/components/SpinWheel";

// Badge images
import rookieBadge from "@/assets/badges/rookie.png";
import varsityBadge from "@/assets/badges/varsity.png";
import proBadge from "@/assets/badges/pro.png";

// Challenge background images
import rugbyBg from "@/assets/challenges/rugby.jpg";
import cricketBg from "@/assets/challenges/cricket.jpg";
import footballBg from "@/assets/challenges/football.jpg";
import horseracingBg from "@/assets/challenges/horseracing.jpg";
import liveBg from "@/assets/challenges/live.jpg";
import parlay3Bg from "@/assets/challenges/parlay3.jpg";
import parlay4Bg from "@/assets/challenges/parlay4.jpg";
import parlay7Bg from "@/assets/challenges/parlay7.jpg";
import sgpBg from "@/assets/challenges/sgp.jpg";
import propsBg from "@/assets/challenges/props.jpg";

// --- League tiers with SA sports ---
const leagues = [
  {
    id: 1,
    name: "ROOKIE LEAGUE",
    desc: "Basic XP rewards and beginner challenges",
    badge: rookieBadge,
    color: "from-amber-700/40 to-amber-900/20",
    borderColor: "border-amber-600/40",
    xpMultiplier: 1,
    challenges: [
      { name: "PSL Team Challenge", xp: 100, milestone: 100, progress: 0, total: 3, bg: footballBg, sport: "PSL ⚽ URC 🏉" },
      { name: "3-Leg Multi Challenge", xp: 100, milestone: 200, progress: 0, total: 1, bg: parlay3Bg, sport: "SA20 🏏 PSL ⚽" },
      { name: "Live Pick Challenge", xp: 100, milestone: 300, progress: 0, total: 1, bg: liveBg, sport: "URC 🏉" },
    ],
  },
  {
    id: 2,
    name: "VARSITY LEAGUE",
    desc: "XP bonus on challenges, new categories unlocked.",
    badge: varsityBadge,
    color: "from-slate-400/30 to-slate-600/20",
    borderColor: "border-slate-400/40",
    xpMultiplier: 2.5,
    challenges: [
      { name: "Sport Challenge", xp: 250, milestone: 250, progress: 0, total: 3, bg: rugbyBg, sport: "URC 🏉 PSL ⚽" },
      { name: "4-Leg Multi Challenge", xp: 250, milestone: 500, progress: 0, total: 1, bg: parlay4Bg, sport: "SA20 🏏 PSL ⚽" },
      { name: "3-Leg SGP Challenge", xp: 250, milestone: 1000, progress: 0, total: 1, bg: sgpBg, sport: "URC 🏉" },
      { name: "Player Prop Challenge", xp: 250, milestone: 1250, progress: 0, total: 1, bg: propsBg, sport: "Golf ⛳" },
    ],
  },
  {
    id: 3,
    name: "PRO LEAGUE",
    desc: "Maximum XP multiplier, exclusive challenges unlocked.",
    badge: proBadge,
    color: "from-yellow-500/30 to-amber-700/20",
    borderColor: "border-yellow-500/40",
    xpMultiplier: 5,
    challenges: [
      { name: "League Challenge", xp: 500, milestone: 500, progress: 0, total: 4, bg: cricketBg, sport: "SA20 🏏 CSA" },
      { name: "Player Prop Challenge", xp: 500, milestone: 1000, progress: 0, total: 1, bg: propsBg, sport: "Golf ⛳" },
      { name: "Live Pick Challenge", xp: 500, milestone: 1500, progress: 0, total: 1, bg: liveBg, sport: "URC 🏉" },
      { name: "7-Leg Multi Challenge", xp: 500, milestone: 2000, progress: 0, total: 1, bg: parlay7Bg, sport: "PSL ⚽ URC 🏉" },
      { name: "4-Leg SGP Challenge", xp: 500, milestone: 2500, progress: 0, total: 1, bg: sgpBg, sport: "URC 🏉" },
    ],
  },
];

// --- Monthly challenges with SA context ---
const monthlyChallenges = [
  { id: 1, name: "Win a Pick on an Underdog", xp: 20, progress: 0, total: 1, timeLeft: "7h 49m", type: "Daily Challenge", bg: footballBg },
  { id: 2, name: "Place 5 Live Bets on URC", xp: 50, progress: 2, total: 5, timeLeft: "23h 12m", type: "Daily Challenge", bg: rugbyBg },
  { id: 3, name: "Win 3 PSL Multis", xp: 150, progress: 1, total: 3, timeLeft: "5d 11h", type: "Weekly Challenge", bg: parlay3Bg },
  { id: 4, name: "Bet on 4 SA Sports", xp: 100, progress: 2, total: 4, timeLeft: "5d 11h", type: "Weekly Challenge", bg: cricketBg },
  { id: 5, name: "Win R1,000+ in a Single Bet", xp: 200, progress: 0, total: 1, timeLeft: "12d", type: "Monthly Challenge", bg: horseracingBg },
];

type MainTab = "gamepass" | "challenges";

// --- Circular progress component ---
const CircularProgress = ({ progress, total, size = 44 }: { progress: number; total: number; size?: number }) => {
  const pct = total > 0 ? (progress / total) * 100 : 0;
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={3} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={pct > 0 ? "hsl(var(--primary))" : "rgba(255,255,255,0.15)"}
          strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold">
          <span className={pct > 0 ? "text-primary" : "text-muted-foreground"}>{progress}</span>
          <span className="text-muted-foreground">/{total}</span>
        </span>
      </div>
      {pct >= 100 && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border border-background" />
      )}
    </div>
  );
};

// --- Challenge Card with background image ---
const ChallengeCard = ({
  challenge,
  idx,
}: {
  challenge: { name: string; xp: number; milestone: number; progress: number; total: number; bg: string; sport: string };
  idx: number;
}) => (
  <div className="flex gap-4 mb-3">
    {/* Milestone marker */}
    <div className="flex-shrink-0 w-[44px] flex flex-col items-center relative z-10">
      <span className="text-[10px] font-bold text-muted-foreground bg-background px-1">{challenge.milestone}</span>
      <div className="w-2 h-2 rounded-full bg-border mt-1" />
    </div>

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.06 }}
      className="flex-1 rounded-2xl border border-primary/30 overflow-hidden relative min-h-[100px]"
    >
      {/* Background image */}
      <img
        src={challenge.bg}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay gradient - stronger on left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      {/* Content */}
      <div className="relative z-10 p-3.5 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold mb-1.5"
            style={{
              background: "linear-gradient(135deg, hsl(25 95% 53% / 0.9), hsl(35 95% 55% / 0.8))",
              color: "#fff",
              border: "1px solid hsl(25 95% 53% / 0.5)",
            }}
          >
            {challenge.xp} XP
          </span>
          <p className="text-sm font-bold text-white">{challenge.name}</p>
          <p className="text-[9px] text-white/50 mt-1">{challenge.sport}</p>
        </div>
        <CircularProgress progress={challenge.progress} total={challenge.total} size={48} />
      </div>
    </motion.div>
  </div>
);

const Rewards = () => {
  const [mainTab, setMainTab] = useState<MainTab>("gamepass");
  const [spinsLeft, setSpinsLeft] = useState(1);
  const { xp, level, streak } = useGamification();

  const daysLeft = 28;
  const myRank = 754;
  const nextPositionXP = 0;
  const prevPositionXP = 30;

  const currentLeagueIndex = level >= 15 ? 2 : level >= 10 ? 1 : 0;
  const nextLeagueUnlockTime = "5d 11h 18m";

  return (
    <MobileLayout>
      <section className="px-4 mt-2 mb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/account" className="p-2 -ml-2 rounded-xl hover:bg-secondary/20 transition-colors">
            <ArrowLeft size={20} className="text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
            <Clock size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">{daysLeft} days left</span>
          </div>
          <button className="p-2 -mr-2 rounded-xl hover:bg-secondary/20 transition-colors">
            <Info size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* XP Balance Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">This month's balance</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="px-2.5 py-1 rounded-lg bg-primary/20 border border-primary/30">
                  <span className="text-[10px] font-black text-primary">XP</span>
                </div>
                <motion.p
                  key={xp}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-black text-foreground tracking-tight"
                >
                  {xp.toLocaleString()}
                </motion.p>
              </div>
            </div>

            {/* Unlock Circle */}
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full border-2 border-primary/50 flex flex-col items-center justify-center bg-primary/5"
                style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.15)" }}
              >
                <Lock size={16} className="text-primary/60 mb-1" />
                <p className="text-[9px] text-muted-foreground leading-tight text-center">Unlocks in</p>
                <p className="text-xs font-bold text-primary">7h 49m</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ranking Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-4 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Next position</span>
                <span className="text-xs font-bold">{nextPositionXP} XP</span>
                <ChevronUp size={12} className="text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Previous position</span>
                <span className="text-xs font-bold">{prevPositionXP} XP</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-foreground/80">#{myRank}</p>
            </div>
          </div>
        </motion.div>

        {/* Daily Challenge Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-primary/40 overflow-hidden relative mb-4"
        >
          <img src={footballBg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="relative z-10 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(25 95% 53% / 0.9), hsl(35 95% 55% / 0.8))",
                    color: "#fff",
                  }}
                >
                  20 XP
                </span>
                <h3 className="text-sm font-bold text-white">Win a Pick on an Underdog</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-white/50">Daily Challenge</span>
                  <div className="flex items-center gap-1">
                    <Flame size={10} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary">7h 49m left</span>
                  </div>
                </div>
              </div>
              <CircularProgress progress={0} total={1} size={48} />
            </div>
          </div>
        </motion.div>

        {/* Spin Wheel Toggle */}
        <motion.button
          onClick={() => setShowSpin(!showSpin)}
          className="w-full mb-4 py-3 rounded-2xl border border-accent/30 bg-accent/5 flex items-center justify-center gap-2 text-sm font-bold text-accent hover:bg-accent/10 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          <Star size={16} />
          {showSpin ? "Hide Spin Wheel" : `Daily Spin (${spinsLeft} left)`}
        </motion.button>

        <AnimatePresence>
          {showSpin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <SpinWheel spinsLeft={spinsLeft} onSpin={() => setSpinsLeft((p) => Math.max(0, p - 1))} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tabs */}
        <div className="flex border-b border-border mb-4">
          {([
            { key: "gamepass" as MainTab, label: "Game Pass" },
            { key: "challenges" as MainTab, label: "Monthly Challenges" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setMainTab(t.key)}
              className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
                mainTab === t.key ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t.label}
              {mainTab === t.key && (
                <motion.div
                  layoutId="gamification-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* ====== GAME PASS TAB ====== */}
        {mainTab === "gamepass" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            {leagues.map((league, leagueIdx) => {
              const isUnlocked = leagueIdx <= currentLeagueIndex;
              const isCurrent = leagueIdx === currentLeagueIndex;
              const isNext = leagueIdx === currentLeagueIndex + 1;

              return (
                <div key={league.id} className="relative">
                  {/* Unlock banner for next league */}
                  {isNext && (
                    <div className="flex items-center justify-between mb-3 px-2">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">Next League Unlocks In</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-foreground">{nextLeagueUnlockTime}</p>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
                          <Lock size={10} /> Unlock Now
                        </button>
                      </div>
                    </div>
                  )}

                  {/* League Badge & Title */}
                  <div className={`text-center py-6 ${!isUnlocked ? "opacity-40" : ""}`}>
                    <div className="relative mx-auto w-20 h-20 mb-2">
                      <img
                        src={league.badge}
                        alt={league.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                        loading="lazy"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 40px hsl(var(--primary) / 0.3)" }} />
                      )}
                    </div>
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold text-primary -mt-4 relative z-10">
                      {league.id}
                    </div>
                    <h2 className="text-lg font-black tracking-wide text-foreground/90 mt-1">{league.name}</h2>
                    <p className="text-[11px] text-muted-foreground mt-1 max-w-[250px] mx-auto leading-relaxed">{league.desc}</p>
                  </div>

                  {/* Challenge Timeline */}
                  <div className={`relative ${!isUnlocked ? "opacity-30 pointer-events-none" : ""}`}>
                    <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border" />
                    {league.challenges.map((challenge, idx) => (
                      <ChallengeCard key={idx} challenge={challenge} idx={idx} />
                    ))}
                  </div>

                  {/* Free Pass Rewards */}
                  {isCurrent && (
                    <div className="mt-4 rounded-2xl border border-border overflow-hidden">
                      <div className="grid grid-cols-2">
                        <div className="p-4 text-center border-r border-border">
                          <p className="text-xs text-muted-foreground mb-2">Free Pass Rewards</p>
                          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-1">
                            <Zap size={20} className="text-primary" />
                          </div>
                          <p className="text-sm font-black text-primary">R20k</p>
                        </div>
                        <div className="p-4 text-center relative bg-gradient-to-br from-accent/10 to-transparent">
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30">
                            <Crown size={10} className="text-accent" />
                            <span className="text-[8px] font-bold text-accent">Premium</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Premium Rewards</p>
                          <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-1">
                            <Lock size={14} className="text-accent" />
                            <span className="text-[8px] font-bold text-accent ml-0.5">UNLOCK</span>
                          </div>
                          <p className="text-sm font-black text-accent">R35k</p>
                        </div>
                      </div>
                      <div className="py-2 text-center border-t border-border">
                        <p className="text-[10px]">
                          <span className="text-primary font-bold">0/5 challenges</span>
                          <span className="text-foreground font-bold"> LEFT TO CLAIM REWARDS</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ====== MONTHLY CHALLENGES TAB ====== */}
        {mainTab === "challenges" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {monthlyChallenges.map((c, idx) => {
              const pct = Math.round((c.progress / c.total) * 100);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-primary/30 overflow-hidden relative min-h-[110px]"
                >
                  <img src={c.bg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

                  <div className="relative z-10 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{
                              background: "linear-gradient(135deg, hsl(25 95% 53% / 0.9), hsl(35 95% 55% / 0.8))",
                              color: "#fff",
                            }}
                          >
                            {c.xp} XP
                          </span>
                          <span className="text-[9px] text-white/40 font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                            {c.type}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{c.name}</h3>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Flame size={10} className="text-primary" />
                          <span className="text-[10px] font-bold text-primary">{c.timeLeft} left</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-white/50 font-bold">{c.progress}/{c.total}</span>
                        </div>
                      </div>

                      <CircularProgress progress={c.progress} total={c.total} size={48} />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Streak bonus */}
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame size={16} className="text-accent" />
                <span className="text-sm font-bold text-accent">{streak}-Day Streak Bonus</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Complete daily challenges to keep your streak alive!</p>
            </div>
          </motion.div>
        )}

        <div className="h-6" />
      </section>
    </MobileLayout>
  );
};

export default Rewards;
