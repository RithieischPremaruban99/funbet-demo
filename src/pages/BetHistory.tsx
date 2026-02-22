import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Clock, XCircle, CheckCircle, Banknote, Search, X, ChevronDown } from "lucide-react";
import { useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TeamBadge from "@/components/TeamBadge";

type BetStatus = "all" | "pending" | "won" | "lost";

interface BetLeg {
  match: string;
  homeAbbr: string;
  awayAbbr: string;
  pick: string;
  odds: number;
  result?: "won" | "lost" | "pending";
}

interface BetRecord {
  id: number;
  type: "single" | "combi" | "system";
  date: string;
  timestamp: string;
  status: "pending" | "won" | "lost";
  stake: number;
  totalOdds: number;
  potentialWin: number;
  payout: number;
  cashoutValue?: number;
  legs: BetLeg[];
}

const mockBets: BetRecord[] = [
  {
    id: 1001, type: "combi", date: "2026-02-21", timestamp: "14:32",
    status: "pending", stake: 5000, totalOdds: 4.12, potentialWin: 20600, payout: 0, cashoutValue: 8750,
    legs: [
      { match: "Paris SG vs OL", homeAbbr: "PSG", awayAbbr: "OL", pick: "Paris SG (1)", odds: 1.45, result: "won" },
      { match: "RC Lens vs AS Monaco", homeAbbr: "LENS", awayAbbr: "ASM", pick: "Draw (X)", odds: 3.20, result: "pending" },
      { match: "Bayern vs Barcelona", homeAbbr: "BAY", awayAbbr: "BAR", pick: "Over 2.5 goals", odds: 1.75, result: "pending" },
    ],
  },
  {
    id: 1002, type: "single", date: "2026-02-21", timestamp: "12:15",
    status: "won", stake: 10000, totalOdds: 1.85, potentialWin: 18500, payout: 18500,
    legs: [
      { match: "TP Mazembe vs AS Vita", homeAbbr: "TPM", awayAbbr: "ASV", pick: "TP Mazembe (1)", odds: 1.85, result: "won" },
    ],
  },
  {
    id: 1003, type: "combi", date: "2026-02-20", timestamp: "19:45",
    status: "lost", stake: 3000, totalOdds: 6.84, potentialWin: 20520, payout: 0,
    legs: [
      { match: "Liverpool vs Man City", homeAbbr: "LIV", awayAbbr: "MCI", pick: "Liverpool (1)", odds: 1.80, result: "won" },
      { match: "OM vs PSG", homeAbbr: "OM", awayAbbr: "PSG", pick: "OM (1)", odds: 3.40, result: "lost" },
      { match: "LOSC vs Nice", homeAbbr: "LOSC", awayAbbr: "NICE", pick: "Over 1.5 goals", odds: 1.40, result: "won" },
    ],
  },
  {
    id: 1004, type: "single", date: "2026-02-20", timestamp: "16:00",
    status: "won", stake: 20000, totalOdds: 2.10, potentialWin: 42000, payout: 42000,
    legs: [
      { match: "LA Lakers vs Boston", homeAbbr: "LAL", awayAbbr: "BOS", pick: "Boston Celtics (2)", odds: 2.10, result: "won" },
    ],
  },
  {
    id: 1005, type: "combi", date: "2026-02-19", timestamp: "21:30",
    status: "won", stake: 2000, totalOdds: 8.55, potentialWin: 17100, payout: 17100,
    legs: [
      { match: "Alcaraz vs Djokovic", homeAbbr: "ALC", awayAbbr: "DJO", pick: "Alcaraz (1)", odds: 1.60, result: "won" },
      { match: "Barcelona vs Inter", homeAbbr: "BAR", awayAbbr: "INT", pick: "Barcelona (1)", odds: 1.80, result: "won" },
      { match: "Fury vs Usyk", homeAbbr: "FUR", awayAbbr: "USY", pick: "Usyk (2)", odds: 1.70, result: "won" },
      { match: "DCMP vs Don Bosco", homeAbbr: "DCMP", awayAbbr: "DON", pick: "Over 1.5 goals", odds: 1.55, result: "won" },
    ],
  },
  {
    id: 1006, type: "single", date: "2026-02-19", timestamp: "14:10",
    status: "lost", stake: 15000, totalOdds: 3.40, potentialWin: 51000, payout: 0,
    legs: [
      { match: "OM vs AS Monaco", homeAbbr: "OM", awayAbbr: "ASM", pick: "OM (1)", odds: 3.40, result: "lost" },
    ],
  },
  {
    id: 1007, type: "system", date: "2026-02-18", timestamp: "20:00",
    status: "pending", stake: 8000, totalOdds: 3.20, potentialWin: 25600, payout: 0, cashoutValue: 11200,
    legs: [
      { match: "PSG vs Bayern", homeAbbr: "PSG", awayAbbr: "BAY", pick: "PSG (1)", odds: 2.20, result: "pending" },
      { match: "Real Madrid vs Olympiacos", homeAbbr: "RMA", awayAbbr: "OLY", pick: "Real Madrid (1)", odds: 1.55, result: "won" },
    ],
  },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-highlight", bg: "bg-highlight/15", border: "border-highlight/30" },
  won: { label: "Won", icon: CheckCircle, color: "text-success", bg: "bg-success/15", border: "border-success/30" },
  lost: { label: "Lost", icon: XCircle, color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/30" },
};

const BetHistory = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<BetStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBet, setExpandedBet] = useState<number | null>(null);
  const [cashedOut, setCashedOut] = useState<Set<number>>(new Set());
  const [confirmingCashout, setConfirmingCashout] = useState<number | null>(null);
  const confirmingRef = useRef<number | null>(null);
  const cashoutLock = useRef(false);

  const filteredBets = useMemo(() => {
    return mockBets.filter((bet) => {
      if (activeFilter !== "all" && bet.status !== activeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return bet.legs.some(
          (l) => l.match.toLowerCase().includes(q) || l.pick.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: mockBets.length,
    pending: mockBets.filter((b) => b.status === "pending").length,
    won: mockBets.filter((b) => b.status === "won").length,
    lost: mockBets.filter((b) => b.status === "lost").length,
    totalStake: mockBets.reduce((a, b) => a + b.stake, 0),
    totalPayout: mockBets.reduce((a, b) => a + b.payout, 0),
  }), []);

  const profit = stats.totalPayout - stats.totalStake;

  const handleCashout = useCallback((betId: number) => {
    if (cashedOut.has(betId) || cashoutLock.current) return;
    cashoutLock.current = true;
    setTimeout(() => { cashoutLock.current = false; }, 300);

    if (confirmingRef.current === betId) {
      setCashedOut((s) => {
        const next = new Set(s);
        next.add(betId);
        return next;
      });
      confirmingRef.current = null;
      setConfirmingCashout(null);
    } else {
      confirmingRef.current = betId;
      setConfirmingCashout(betId);
      setTimeout(() => {
        if (confirmingRef.current === betId) {
          confirmingRef.current = null;
          setConfirmingCashout(null);
        }
      }, 5000);
    }
  }, [cashedOut]);

  return (
    <MobileLayout>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold">Bet History</h1>
      </div>

      {/* Stats Summary */}
      <section className="px-4 mb-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-card-elevated border border-border p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Total Staked</p>
            <p className="text-xs font-bold">{stats.totalStake.toLocaleString()} CDF</p>
          </div>
          <div className="rounded-xl bg-card-elevated border border-border p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Total Won</p>
            <p className="text-xs font-bold text-success">{stats.totalPayout.toLocaleString()} CDF</p>
          </div>
          <div className="rounded-xl bg-card-elevated border border-border p-2.5 text-center">
            <p className="text-[10px] text-muted-foreground">Profit</p>
            <p className={`text-xs font-bold ${profit >= 0 ? "text-success" : "text-destructive"}`}>
              {profit >= 0 ? "+" : ""}{profit.toLocaleString()} CDF
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 mb-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a match, a bet..."
            className="w-full pl-8 pr-8 py-2 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </section>

      {/* Status Filters */}
      <section className="px-4 mb-3 flex gap-2">
        {([
          { key: "all" as BetStatus, label: "All", count: stats.total },
          { key: "pending" as BetStatus, label: "Pending", count: stats.pending },
          { key: "won" as BetStatus, label: "Won", count: stats.won },
          { key: "lost" as BetStatus, label: "Lost", count: stats.lost },
        ]).map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${
              activeFilter === f.key
                ? "orange-gradient text-highlight-foreground"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </section>

      {/* Bet List */}
      <section className="px-4 pb-6 space-y-2">
        {filteredBets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-semibold text-muted-foreground">No bets found</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {searchQuery ? "Try a different search term" : "No bets in this category"}
            </p>
          </div>
        ) : (
          filteredBets.map((bet) => {
            const cfg = statusConfig[bet.status];
            const StatusIcon = cfg.icon;
            const isExpanded = expandedBet === bet.id;

            return (
              <div key={bet.id} className="rounded-xl border border-border card-gradient overflow-hidden">
                {/* Bet Header */}
                <button
                  onClick={() => setExpandedBet(isExpanded ? null : bet.id)}
                  className="w-full px-3 py-3 flex items-center justify-between"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-card-elevated border border-border">
                        {bet.type === "single" ? "Single" : bet.type === "combi" ? `Combi (${bet.legs.length})` : `System (${bet.legs.length})`}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{bet.date} • {bet.timestamp}</span>
                      <span className="text-[10px] text-highlight font-bold">@ {bet.totalOdds.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Stake</p>
                      <p className="text-xs font-bold">{bet.stake.toLocaleString()}</p>
                    </div>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Expanded Legs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-2">
                        {bet.legs.map((leg, i) => {
                          const legCfg = leg.result ? statusConfig[leg.result] : statusConfig.pending;
                          const LegIcon = legCfg.icon;
                          return (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-card-elevated border border-border">
                              <div className="flex items-center gap-1 flex-1">
                                <TeamBadge abbr={leg.homeAbbr} size={18} />
                                <span className="text-[9px] text-muted-foreground">vs</span>
                                <TeamBadge abbr={leg.awayAbbr} size={18} />
                              </div>
                              <div className="flex-[2] text-left">
                                <p className="text-[10px] font-semibold">{leg.pick}</p>
                                <p className="text-[9px] text-muted-foreground">@ {leg.odds.toFixed(2)}</p>
                              </div>
                              <LegIcon size={14} className={legCfg.color} />
                            </div>
                          );
                        })}

                        {/* Payout summary */}
                        <div className="pt-2 border-t border-border space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">Potential win</span>
                            <span className="text-xs font-bold">{bet.potentialWin.toLocaleString()} CDF</span>
                          </div>
                          {bet.status === "won" && (
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-success font-semibold">Paid out</span>
                              <span className="text-xs font-bold text-success">{bet.payout.toLocaleString()} CDF</span>
                            </div>
                          )}
                          {bet.status === "lost" && (
                            <p className="text-[10px] text-destructive font-semibold text-right">0 CDF</p>
                          )}
                          {bet.status === "pending" && !cashedOut.has(bet.id) && (
                            <p className="text-[10px] text-highlight font-semibold text-right">In progress...</p>
                          )}
                          {bet.status === "pending" && cashedOut.has(bet.id) && (
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-success font-semibold">Cashout collected</span>
                              <span className="text-xs font-bold text-success">{(bet.cashoutValue || 0).toLocaleString()} CDF</span>
                            </div>
                          )}
                        </div>

                        {/* Cashout Button */}
                        {bet.status === "pending" && bet.cashoutValue && !cashedOut.has(bet.id) && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCashout(bet.id); }}
                            className={`w-full mt-2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
                              confirmingCashout === bet.id
                                ? "bg-success text-success-foreground ring-2 ring-success/40 animate-pulse"
                                : "orange-gradient text-highlight-foreground glow-orange"
                            }`}
                          >
                            <Banknote size={14} />
                            {confirmingCashout === bet.id
                              ? `Confirm cashout — ${bet.cashoutValue.toLocaleString()} CDF`
                              : `Cashout — ${bet.cashoutValue.toLocaleString()} CDF`
                            }
                          </button>
                        )}
                        {bet.status === "pending" && cashedOut.has(bet.id) && (
                          <p className="text-center text-[10px] text-success font-semibold mt-2">
                            Cashout collected successfully
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </section>
    </MobileLayout>
  );
};

export default BetHistory;
