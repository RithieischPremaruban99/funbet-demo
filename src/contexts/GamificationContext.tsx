import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Mission {
  id: number;
  title: string;
  icon: string; // lucide icon name
  xp: number;
  progress: number;
  total: number;
  done: boolean;
  claimed: boolean;
}

interface LevelUpInfo {
  newLevel: number;
  perk?: string;
}

interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  dailyMissions: Mission[];
  weeklyMissions: Mission[];
  levelUpInfo: LevelUpInfo | null;
  claimMission: (id: number, type: "daily" | "weekly") => void;
  dismissLevelUp: () => void;
}

const XP_PER_LEVEL = [
  0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000,
  7500, 9000, 11000, 13000, 15000, 18000, 21000, 25000, 30000, 36000, 50000,
];

function getLevelFromXP(totalXP: number): number {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (totalXP >= XP_PER_LEVEL[i]) return i + 1;
  }
  return 1;
}

function getXPForLevel(level: number): number {
  return XP_PER_LEVEL[level - 1] || 0;
}

function getXPForNextLevel(level: number): number {
  return XP_PER_LEVEL[level] || XP_PER_LEVEL[XP_PER_LEVEL.length - 1];
}

const LEVEL_PERKS: Record<number, string> = {
  5: "Unlock FlexBet",
  10: "Bonus multiplier ×1.1",
  15: "Free bet R100",
  20: "VIP access",
};

const initialDaily: Mission[] = [
  { id: 1, title: "Daily Login", icon: "CalendarCheck", xp: 20, progress: 1, total: 1, done: true, claimed: false },
  { id: 2, title: "Place 3 bets", icon: "Target", xp: 50, progress: 2, total: 3, done: false, claimed: false },
  { id: 3, title: "Win a combo bet", icon: "Zap", xp: 100, progress: 0, total: 1, done: false, claimed: false },
  { id: 4, title: "Deposit $20+", icon: "TrendingUp", xp: 30, progress: 1, total: 1, done: true, claimed: false },
  { id: 5, title: "Share a bet slip", icon: "Gift", xp: 25, progress: 0, total: 1, done: false, claimed: false },
  { id: 6, title: "Try a live bet", icon: "Flame", xp: 40, progress: 0, total: 1, done: false, claimed: false },
];

const initialWeekly: Mission[] = [
  { id: 10, title: "Place 20 bets", icon: "Target", xp: 300, progress: 14, total: 20, done: false, claimed: false },
  { id: 11, title: "Win 5 combo bets", icon: "Trophy", xp: 500, progress: 3, total: 5, done: false, claimed: false },
  { id: 12, title: "7-day login streak", icon: "CalendarCheck", xp: 200, progress: 5, total: 7, done: false, claimed: false },
  { id: 13, title: "Bet on 3 different sports", icon: "Award", xp: 150, progress: 1, total: 3, done: false, claimed: false },
  { id: 14, title: "Invite a friend", icon: "Gift", xp: 250, progress: 0, total: 1, done: false, claimed: false },
  { id: 15, title: "Win $100+ total", icon: "TrendingUp", xp: 400, progress: 65, total: 100, done: false, claimed: false },
];

const GamificationContext = createContext<GamificationState | null>(null);

export const useGamification = () => {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXP] = useState(2340);
  const [dailyMissions, setDailyMissions] = useState<Mission[]>(initialDaily);
  const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>(initialWeekly);
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);

  const level = getLevelFromXP(xp);
  const streak = 4;
  const bestStreak = 12;

  const claimMission = useCallback((id: number, type: "daily" | "weekly") => {
    const setter = type === "daily" ? setDailyMissions : setWeeklyMissions;
    let missionXP = 0;

    setter((prev) =>
      prev.map((m) => {
        if (m.id === id && m.done && !m.claimed) {
          missionXP = m.xp;
          return { ...m, claimed: true };
        }
        return m;
      })
    );

    if (missionXP > 0) {
      setXP((prev) => {
        const newXP = prev + missionXP;
        const oldLevel = getLevelFromXP(prev);
        const newLevel = getLevelFromXP(newXP);
        if (newLevel > oldLevel) {
          setLevelUpInfo({ newLevel, perk: LEVEL_PERKS[newLevel] });
        }
        return newXP;
      });
    }
  }, []);

  const dismissLevelUp = useCallback(() => setLevelUpInfo(null), []);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        level,
        streak,
        bestStreak,
        dailyMissions,
        weeklyMissions,
        levelUpInfo,
        claimMission,
        dismissLevelUp,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export { getLevelFromXP, getXPForLevel, getXPForNextLevel, LEVEL_PERKS, XP_PER_LEVEL };
