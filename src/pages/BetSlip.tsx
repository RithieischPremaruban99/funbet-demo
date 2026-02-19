import MobileLayout from "@/components/MobileLayout";
import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Info, Shield, Trash2, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { motion, AnimatePresence } from "framer-motion";

const BetSlip = () => {
  const { selections, removeSelection, clearSelections } = useBetSlip();
  const [stake, setStake] = useState("5000");
  const [betType, setBetType] = useState<"single" | "combi">("combi");
  const [flexEnabled, setFlexEnabled] = useState(false);
  const [flexCount, setFlexCount] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const canUseFlex = betType === "combi" && selections.length >= 3;
  const maxFlex = Math.min(Math.max(0, selections.length - 1), 6);

  const getFlexMultiplier = (total: number, wrong: number): number => {
    if (wrong === 0) return 1;
    const reductionPerWrong = [1, 0.45, 0.18, 0.06, 0.02, 0.008, 0.003];
    return reductionPerWrong[Math.min(wrong, reductionPerWrong.length - 1)] || 0.001;
  };

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const numStake = Number(stake) || 0;
  const flexMultiplier = flexEnabled && canUseFlex ? getFlexMultiplier(selections.length, flexCount) : 1;
  const adjustedOdds = totalOdds * flexMultiplier;
  const potentialWin = Math.round(numStake * (betType === "combi" ? adjustedOdds : selections[0]?.odds || 1));
  const tax = Math.round(potentialWin * 0.1);
  const netPayout = potentialWin - tax;

  if (confirmed) {
    return (
      <MobileLayout>
        <section className="px-4 mt-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <Shield size={32} className="text-success" />
          </div>
          <h2 className="text-lg font-bold">Bet Confirmed!</h2>
          <p className="text-xs text-muted-foreground">Your slip has been successfully registered</p>
          <div className="rounded-2xl border border-border card-gradient p-4 text-left">
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Type</span><span className="font-bold">{betType === "combi" ? "Combo" : "Single"}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Selections</span><span className="font-bold">{selections.length}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Total odds</span><span className="font-bold text-highlight">{totalOdds.toFixed(2)}</span></div>
              {flexEnabled && canUseFlex && (
                <>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">FlexBet</span><span className="font-bold text-primary">{selections.length - flexCount}/{selections.length} correct</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Adjusted odds</span><span className="font-bold text-highlight">{adjustedOdds.toFixed(2)}</span></div>
                </>
              )}
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Stake</span><span className="font-bold">{numStake.toLocaleString()} CDF</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Potential win</span><span className="font-bold">{potentialWin.toLocaleString()} CDF</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Tax (10%)</span><span className="font-medium text-destructive">-{tax.toLocaleString()} CDF</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-sm"><span className="font-bold">Net payout</span><span className="font-bold text-highlight">{netPayout.toLocaleString()} CDF</span></div>
            </div>
          </div>
          <Link to="/sports" className="block w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
            Continue Betting
          </Link>
          <Link to="/" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
            Back to Home
          </Link>
        </section>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/sports" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Bet Slip</h1>
          <span className="ml-auto text-xs text-muted-foreground">{selections.length} selection(s)</span>
        </div>

        {/* Bet Type Toggle */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "single" as const, label: "Single" },
            { key: "combi" as const, label: "Combo" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setBetType(t.key)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                betType === t.key ? "orange-gradient text-highlight-foreground glow-orange" : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Selections */}
        <div className="space-y-2 mb-4">
          {selections.map((s) => (
            <div key={s.id} className="rounded-xl border border-border card-gradient p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground">{s.league}</p>
                <p className="text-xs font-medium mt-0.5">{s.match}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-primary">{s.pick}</span>
                  <span className="text-xs font-bold text-highlight">@ {s.odds.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeSelection(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                <X size={14} className="text-destructive" />
              </button>
            </div>
          ))}
        </div>

        {selections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No selections</p>
            <Link to="/sports" className="text-xs text-primary font-semibold mt-2 block">Browse matches →</Link>
          </div>
        ) : (
          <>
            {/* FlexBet Option */}
            {canUseFlex && (
              <motion.div
                animate={flexEnabled ? {
                  borderColor: "hsl(var(--primary))",
                  boxShadow: [
                    "0 0 0px hsl(var(--primary) / 0)",
                    "0 0 20px hsl(var(--primary) / 0.4)",
                    "0 0 8px hsl(var(--primary) / 0.2)",
                  ],
                } : {
                  borderColor: "hsl(var(--primary) / 0.3)",
                  boxShadow: "0 0 0px hsl(var(--primary) / 0)",
                }}
                transition={{ duration: 0.6, boxShadow: { duration: 1, ease: "easeOut" } }}
                className="rounded-2xl border border-primary/30 bg-primary/5 p-4 mb-4 relative overflow-hidden"
              >
                <AnimatePresence>
                  {flexEnabled && (
                    <>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.span
                          key={`particle-${i}`}
                          initial={{ opacity: 1, scale: 0, x: "50%", y: "50%" }}
                          animate={{
                            opacity: 0,
                            scale: 1,
                            x: `${50 + (Math.cos((i * 30 * Math.PI) / 180) * 120)}%`,
                            y: `${50 + (Math.sin((i * 30 * Math.PI) / 180) * 80)}%`,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-primary pointer-events-none"
                          style={{ left: 0, top: 0 }}
                        />
                      ))}
                      <motion.div
                        initial={{ opacity: 0.6, scale: 0.3 }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/30 pointer-events-none"
                      />
                    </>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={flexEnabled ? { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
                    >
                      <Zap size={16} className={`transition-colors ${flexEnabled ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary))]" : "text-primary"}`} />
                    </motion.div>
                    <div>
                      <h4 className="text-xs font-bold">FlexBet</h4>
                      <p className="text-[10px] text-muted-foreground">Win even without getting all right!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setFlexEnabled(!flexEnabled); setFlexCount(1); }}
                    className={`w-11 h-6 rounded-full transition-all ${flexEnabled ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" : "bg-muted"} relative`}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${flexEnabled ? "left-[22px]" : "left-0.5"}`}
                    />
                  </button>
                </div>
                {flexEnabled && (
                  <div className="mt-3 space-y-2">
                    <p className="text-[10px] text-muted-foreground">How many selections can be wrong?</p>
                    <div className="flex gap-2">
                      {Array.from({ length: maxFlex }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setFlexCount(n)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                            flexCount === n
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {n} wrong
                        </button>
                      ))}
                    </div>
                    <div className="rounded-lg bg-card-elevated border border-border p-2.5 mt-2">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Minimum correct</span>
                        <span className="font-bold text-primary">{selections.length - flexCount} / {selections.length}</span>
                      </div>
                      <div className="flex justify-between text-[10px] mt-1">
                        <span className="text-muted-foreground">Multiplier</span>
                        <span className="font-bold text-highlight">×{flexMultiplier.toFixed(2)}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-1.5">⚡ Lower payout but better chances of winning</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Stake */}
            <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Stake (CDF)</label>
              <input type="number" value={stake} onChange={(e) => setStake(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground outline-none focus:ring-1 focus:ring-primary text-center" />
              <div className="flex gap-2 mt-2">
                {[1000, 5000, 10000, 25000].map((a) => (
                  <button key={a} onClick={() => setStake(String(a))} className="flex-1 py-1.5 rounded-lg bg-card-elevated border border-border text-[10px] font-bold hover:border-highlight/40 transition-all">
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mt-2">Minimum stake: 500 CDF • Maximum: 200,000 CDF</p>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 mb-4">
              <h4 className="text-xs font-bold flex items-center gap-1.5 mb-2">
                <Info size={14} className="text-primary" />
                Summary
              </h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Total odds</span><span className="font-bold">{totalOdds.toFixed(2)}</span></div>
                {flexEnabled && canUseFlex && (
                  <>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">FlexBet ({selections.length - flexCount}/{selections.length})</span><span className="font-bold text-primary">×{flexMultiplier.toFixed(2)}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Adjusted odds</span><span className="font-bold text-highlight">{adjustedOdds.toFixed(2)}</span></div>
                  </>
                )}
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Stake</span><span className="font-medium">{numStake.toLocaleString()} CDF</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Potential win</span><span className="font-medium">{potentialWin.toLocaleString()} CDF</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Winnings tax (10%)</span><span className="font-medium text-destructive">-{tax.toLocaleString()} CDF</span></div>
                <div className="border-t border-border pt-1.5 flex justify-between text-sm"><span className="font-bold">Net payout</span><span className="font-bold text-highlight">{netPayout.toLocaleString()} CDF</span></div>
              </div>
            </div>

            <button onClick={() => setConfirmed(true)} className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange mb-4">
              Place Bet — {numStake.toLocaleString()} CDF
            </button>

            <button onClick={() => clearSelections()} className="w-full py-2 flex items-center justify-center gap-1.5 text-xs text-destructive">
              <Trash2 size={12} />
              Clear slip
            </button>
          </>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">18+ | Play responsibly</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default BetSlip;
