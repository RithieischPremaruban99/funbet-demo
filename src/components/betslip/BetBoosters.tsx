import { useState } from "react";
import { Shield, Scissors, Timer, Star, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface BoosterState {
  insure: boolean;
  oneCut: boolean;
  earlyGoals: boolean;
  anyWin: boolean;
}

interface BetBoostersProps {
  boosters: BoosterState;
  onToggle: (key: keyof BoosterState) => void;
  selectionCount: number;
  stake: number;
  potentialWin: number;
}

const BOOSTER_CONFIG = [
  {
    key: "insure" as const,
    label: "Insure",
    icon: Shield,
    emoji: "🛡",
    color: "text-success",
    borderActive: "border-success",
    bgActive: "bg-success/10",
    bgIcon: "bg-success/20",
    description: "Get your stake back if your bet loses",
    detail: "A small insurance fee (15%) is deducted from your winnings. If all selections lose, your full stake is refunded.",
    feeLabel: "15% of winnings",
    minSelections: 1,
    feePercent: 15,
  },
  {
    key: "oneCut" as const,
    label: "1Cut",
    icon: Scissors,
    emoji: "✂️",
    color: "text-primary",
    borderActive: "border-primary",
    bgActive: "bg-primary/10",
    bgIcon: "bg-primary/20",
    description: "1 wrong selection is forgiven",
    detail: "Even if 1 of your selections loses, you still win! The payout is adjusted with a ×0.45 multiplier to compensate.",
    feeLabel: "×0.45 multiplier",
    minSelections: 3,
    feePercent: 0,
  },
  {
    key: "earlyGoals" as const,
    label: "EarlyGoals",
    icon: Timer,
    emoji: "⏱",
    color: "text-accent",
    borderActive: "border-accent",
    bgActive: "bg-accent/10",
    bgIcon: "bg-accent/20",
    description: "Win if your team scores early",
    detail: "If any of your selected teams scores a goal within the first 10 minutes, that selection is settled as won immediately.",
    feeLabel: "10% of winnings",
    minSelections: 1,
    feePercent: 10,
  },
  {
    key: "anyWin" as const,
    label: "AnyWin",
    icon: Star,
    emoji: "⭐",
    color: "text-highlight",
    borderActive: "border-highlight",
    bgActive: "bg-highlight/10",
    bgIcon: "bg-highlight/20",
    description: "Win if at least 1 selection is correct",
    detail: "Dramatically increases your chances of winning. You get a payout even if only 1 selection hits. Payout is significantly reduced.",
    feeLabel: "Reduced payout",
    minSelections: 3,
    feePercent: 0,
  },
];

const BetBoosters = ({ boosters, onToggle, selectionCount, stake, potentialWin }: BetBoostersProps) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const handleToggle = (key: keyof BoosterState, isDisabled: boolean) => {
    if (isDisabled) return;
    onToggle(key);
    if (!boosters[key]) setExpandedKey(key);
  };

  const handleExpand = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  return (
    <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
      <h4 className="text-xs font-bold mb-3">Bet Boosters</h4>
      <div className="space-y-2">
        {BOOSTER_CONFIG.map((booster) => {
          const Icon = booster.icon;
          const isActive = boosters[booster.key];
          const isDisabled = selectionCount < booster.minSelections;
          const isExpanded = expandedKey === booster.key;

          return (
            <div key={booster.key}>
              <div
                onClick={() => !isDisabled && handleExpand(booster.key)}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isActive ? `${booster.borderActive} ${booster.bgActive}` : "border-border hover:border-muted-foreground/30"
                } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggle(booster.key, isDisabled); }}
                  className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                    isActive ? `${booster.borderActive} ${booster.bgActive}` : "border-muted-foreground/30"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-[10px] font-bold">
                        ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <div className={`w-7 h-7 rounded-lg ${booster.bgIcon} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={14} className={booster.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">{booster.label}</span>
                    {isActive && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${booster.bgActive} ${booster.color}`}>
                        ON
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{booster.description}</p>
                </div>

                <div className="flex-shrink-0 text-muted-foreground">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && !isDisabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 mt-1 rounded-xl bg-card-elevated border border-border">
                      <p className="text-[10px] text-muted-foreground mb-2">{booster.detail}</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">Cost</span>
                          <span className={`font-bold ${booster.feePercent > 0 ? "text-destructive" : booster.color}`}>
                            {booster.feeLabel}
                          </span>
                        </div>

                        {isActive && booster.key === "insure" && (
                          <div className="flex justify-between text-[10px]">
                            <span className="text-muted-foreground">Refund if you lose</span>
                            <span className="font-bold text-success">R{stake.toLocaleString()}</span>
                          </div>
                        )}

                        {isActive && booster.feePercent > 0 && (
                          <div className="flex justify-between text-[10px]">
                            <span className="text-muted-foreground">Fee amount</span>
                            <span className="font-bold text-destructive">
                              -R{Math.round(potentialWin * booster.feePercent / 100).toLocaleString()}
                            </span>
                          </div>
                        )}

                        {booster.minSelections > 1 && selectionCount < booster.minSelections && (
                          <p className="text-[10px] text-destructive">Need {booster.minSelections}+ selections</p>
                        )}
                      </div>

                      {!isActive && (
                        <button
                          onClick={() => handleToggle(booster.key, isDisabled)}
                          className={`w-full py-2 rounded-lg text-xs font-bold transition-all mt-2 ${booster.bgIcon} ${booster.color} hover:opacity-80`}
                        >
                          Activate {booster.label}
                        </button>
                      )}

                      {isActive && (
                        <button
                          onClick={() => handleToggle(booster.key, isDisabled)}
                          className="w-full py-2 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all mt-2"
                        >
                          Deactivate
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getBoosterFeePercent = (boosters: BoosterState): number => {
  let fee = 0;
  if (boosters.insure) fee += 15;
  if (boosters.earlyGoals) fee += 10;
  return fee;
};

export const getOneCutMultiplier = (totalOdds: number, selectionCount: number): number => {
  if (selectionCount < 3) return 1;
  return 0.45;
};

export const getAnyWinMultiplier = (selectionCount: number): number => {
  if (selectionCount < 3) return 1;
  const reductions: Record<number, number> = { 3: 0.08, 4: 0.04, 5: 0.02, 6: 0.01, 7: 0.005, 8: 0.003 };
  return reductions[Math.min(selectionCount, 8)] || 0.002;
};

export default BetBoosters;
