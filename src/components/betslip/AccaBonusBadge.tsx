import { Trophy } from "lucide-react";

export const getAccaBonusPercent = (selectionCount: number): number => {
  if (selectionCount < 4) return 0;
  const bonuses: Record<number, number> = { 4: 5, 5: 10, 6: 15, 7: 20, 8: 30, 9: 40, 10: 50 };
  return bonuses[Math.min(selectionCount, 10)] || 50;
};

const AccaBonusBadge = ({ selectionCount }: { selectionCount: number }) => {
  const percent = getAccaBonusPercent(selectionCount);
  if (percent === 0) return null;

  return (
    <div className="rounded-2xl border border-highlight/30 bg-highlight/5 p-3 mb-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-highlight/20 flex items-center justify-center flex-shrink-0">
        <Trophy size={18} className="text-highlight" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-highlight">Acca Bonus +{percent}%</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Extra {percent}% on winnings for {selectionCount}+ selections
        </p>
      </div>
    </div>
  );
};

export default AccaBonusBadge;
