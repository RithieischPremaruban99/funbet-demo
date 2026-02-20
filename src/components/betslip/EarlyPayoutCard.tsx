import { Banknote } from "lucide-react";

const EarlyPayoutCard = () => {
  return (
    <div className="rounded-2xl border border-success/30 bg-success/5 p-3 mb-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
        <Banknote size={18} className="text-success" />
      </div>
      <div className="flex-1">
        <span className="text-xs font-bold text-success">Early Payout</span>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          If your team goes 2 goals ahead, your bet is paid out as a winner!
        </p>
      </div>
    </div>
  );
};

export default EarlyPayoutCard;
