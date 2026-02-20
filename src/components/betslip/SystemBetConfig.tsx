import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface SystemBetConfigProps {
  selectionCount: number;
  systemSize: number;
  onSystemSizeChange: (size: number) => void;
  stake: number;
}

export const combinations = (n: number, k: number): number => {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
};

const SYSTEM_NAMES: Record<string, string> = {
  "2": "Doubles",
  "3": "Trebles",
  "4": "4-folds",
  "5": "5-folds",
  "6": "6-folds",
  "7": "7-folds",
};

const SystemBetConfig = ({ selectionCount, systemSize, onSystemSizeChange, stake }: SystemBetConfigProps) => {
  if (selectionCount < 3) {
    return (
      <div className="rounded-2xl border border-border card-gradient p-4 mb-4 text-center">
        <p className="text-xs text-muted-foreground">Add at least 3 selections for system bets</p>
      </div>
    );
  }

  const possibleSizes = Array.from({ length: selectionCount - 1 }, (_, i) => i + 2).filter((s) => s < selectionCount);
  const numCombos = combinations(selectionCount, systemSize);
  const totalStake = stake * numCombos;

  return (
    <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Info size={14} className="text-primary" />
        <h4 className="text-xs font-bold">System Bet</h4>
        <span className="ml-auto text-[10px] text-muted-foreground">{selectionCount} selections</span>
      </div>

      <p className="text-[10px] text-muted-foreground mb-3">
        Split your selections into multiple combos. Win if enough sub-combos are correct.
      </p>

      <div className="flex gap-2 mb-3">
        {possibleSizes.map((size) => {
          const combos = combinations(selectionCount, size);
          return (
            <button
              key={size}
              onClick={() => onSystemSizeChange(size)}
              className={`flex-1 py-2 rounded-xl text-center transition-all ${
                systemSize === size
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              <span className="text-xs font-bold block">{size}/{selectionCount}</span>
              <span className="text-[9px] opacity-70">{combos} bets</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-lg bg-card-elevated border border-border p-2.5 space-y-1.5">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">System type</span>
          <span className="font-bold">{systemSize}/{selectionCount} {SYSTEM_NAMES[String(systemSize)] || `${systemSize}-folds`}</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Number of combos</span>
          <span className="font-bold text-primary">{numCombos}</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Stake per combo</span>
          <span className="font-bold">${stake.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[10px] border-t border-border pt-1.5">
          <span className="font-bold">Total stake</span>
          <span className="font-bold text-highlight">${totalStake.toLocaleString()}</span>
        </div>
      </div>

      <p className="text-[9px] text-muted-foreground mt-2">
        💡 You need at least {systemSize} correct selections to win. More correct = higher payout!
      </p>
    </div>
  );
};

export default SystemBetConfig;
