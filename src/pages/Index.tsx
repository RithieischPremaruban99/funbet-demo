import { ChevronRight, Crown, Flame, Zap, Swords, Radio, Trophy, Dices, Shield, ShoppingCart, ChevronDown, X, Target } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Link, useNavigate } from "react-router-dom";
import TeamBadge from "@/components/TeamBadge";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = [
  { icon: Flame, label: "Top Bets", sublabel: "Popular", gradient: true, to: "/sports" },
  { icon: Dices, label: "Casino", sublabel: "Live", gradient: false, to: "/casino" },
  { icon: Radio, label: "Live", sublabel: "Now", gradient: true, to: "/sports" },
  { icon: Trophy, label: "All", sublabel: "Sports", gradient: false, to: "/sports" },
];

const liveMatches = [
  {
    id: 1,
    league: "Ligue 1 - Matchday 24",
    time: "67'",
    home: { name: "Paris SG", abbr: "PSG" },
    away: { name: "Olympique Lyonnais", abbr: "OL" },
    odds: { home: "1.45", draw: "4.50", away: "6.00" },
    score: "2 - 1",
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.55" },
        { label: "Under 2.5", odds: "2.40" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.65" },
        { label: "Both Score - No", odds: "2.15" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.20" },
        { label: "12", odds: "1.15" },
        { label: "X2", odds: "2.80" },
      ],
    },
  },
  {
    id: 2,
    league: "Ligue 1 - Matchday 24",
    time: "52'",
    home: { name: "RC Lens", abbr: "LENS" },
    away: { name: "AS Monaco", abbr: "ASM" },
    odds: { home: "2.30", draw: "3.20", away: "3.10" },
    score: "1 - 1",
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.80" },
        { label: "Under 2.5", odds: "1.95" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.50" },
        { label: "Both Score - No", odds: "2.45" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.30" },
        { label: "12", odds: "1.35" },
        { label: "X2", odds: "1.55" },
      ],
    },
  },
  {
    id: 3,
    league: "Ligue 1 - Matchday 24",
    time: "38'",
    home: { name: "LOSC Lille", abbr: "LOSC" },
    away: { name: "OGC Nice", abbr: "NICE" },
    odds: { home: "1.90", draw: "3.40", away: "4.00" },
    score: "1 - 0",
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "2.10" },
        { label: "Under 2.5", odds: "1.70" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.85" },
        { label: "Both Score - No", odds: "1.90" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.25" },
        { label: "12", odds: "1.30" },
        { label: "X2", odds: "1.80" },
      ],
    },
  },
];

const upcomingMatches = [
  {
    id: 4,
    league: "Champions League",
    date: "21:00",
    dateLabel: "TOMORROW",
    home: { name: "Paris SG", abbr: "PSG" },
    away: { name: "FC Bayern", abbr: "BAY" },
    odds: { home: "2.20", draw: "3.40", away: "3.00" },
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.75" },
        { label: "Under 2.5", odds: "2.00" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.60" },
        { label: "Both Score - No", odds: "2.20" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.35" },
        { label: "12", odds: "1.25" },
        { label: "X2", odds: "1.55" },
      ],
    },
  },
  {
    id: 5,
    league: "Champions League",
    date: "21:00",
    dateLabel: "TOMORROW",
    home: { name: "FC Barcelona", abbr: "BAR" },
    away: { name: "Inter Milan", abbr: "INT" },
    odds: { home: "1.80", draw: "3.60", away: "4.20" },
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.65" },
        { label: "Under 2.5", odds: "2.15" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.70" },
        { label: "Both Score - No", odds: "2.05" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.20" },
        { label: "12", odds: "1.25" },
        { label: "X2", odds: "1.80" },
      ],
    },
  },
  {
    id: 6,
    league: "Ligue 1 - Matchday 25",
    date: "17:00",
    dateLabel: "SAT",
    home: { name: "Olympique Marseille", abbr: "OM" },
    away: { name: "Paris SG", abbr: "PSG" },
    odds: { home: "3.40", draw: "3.30", away: "2.10" },
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.85" },
        { label: "Under 2.5", odds: "1.90" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.55" },
        { label: "Both Score - No", odds: "2.30" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.60" },
        { label: "12", odds: "1.30" },
        { label: "X2", odds: "1.30" },
      ],
    },
  },
  {
    id: 7,
    league: "Premier League",
    date: "16:00",
    dateLabel: "SUN",
    home: { name: "Liverpool FC", abbr: "LIV" },
    away: { name: "Manchester City", abbr: "MCI" },
    odds: { home: "2.00", draw: "3.50", away: "3.40" },
    markets: {
      overUnder: [
        { label: "Over 2.5", odds: "1.70" },
        { label: "Under 2.5", odds: "2.05" },
      ],
      btts: [
        { label: "Both Score - Yes", odds: "1.60" },
        { label: "Both Score - No", odds: "2.20" },
      ],
      doubleChance: [
        { label: "1X", odds: "1.30" },
        { label: "12", odds: "1.20" },
        { label: "X2", odds: "1.65" },
      ],
    },
  },
];

type MatchMarkets = {
  overUnder: { label: string; odds: string }[];
  btts: { label: string; odds: string }[];
  doubleChance: { label: string; odds: string }[];
};

const OddsButton = ({ label, value, selected, onSelect }: { label: string; value: string; selected: boolean; onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className={`odds-cell flex-1 transition-all ${
      selected ? "!border-highlight !bg-highlight/20 ring-1 ring-highlight/40" : ""
    }`}
  >
    <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    <span className={`text-xs font-bold leading-none mt-0.5 text-highlight`}>{value}</span>
  </button>
);

const MarketOddsButton = ({ label, odds, selected, onSelect }: { label: string; odds: string; selected: boolean; onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-left ${
      selected
        ? "border-highlight bg-highlight/20 ring-1 ring-highlight/40"
        : "border-border bg-card hover:bg-card-elevated"
    }`}
  >
    <span className="text-[10px] font-medium text-foreground">{label}</span>
    <span className={`text-xs font-bold ${selected ? "text-highlight" : "text-highlight"}`}>{odds}</span>
  </button>
);

const ExpandedMarkets = ({
  matchId,
  matchName,
  league,
  markets,
  isSelected,
  onSelect,
}: {
  matchId: number;
  matchName: string;
  league: string;
  markets: MatchMarkets;
  isSelected: (id: string) => boolean;
  onSelect: (matchId: number, match: string, league: string, pick: string, odds: string) => void;
}) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="overflow-hidden"
  >
    <div className="px-3 pb-3 space-y-3">
      {/* Over/Under */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase">Goals - Over/Under</p>
        <div className="grid grid-cols-2 gap-1.5">
          {markets.overUnder.map((m) => (
            <MarketOddsButton
              key={m.label}
              label={m.label}
              odds={m.odds}
              selected={isSelected(`${matchId}-${m.label}`)}
              onSelect={() => onSelect(matchId, matchName, league, m.label, m.odds)}
            />
          ))}
        </div>
      </div>
      {/* BTTS */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase">Both Teams to Score</p>
        <div className="grid grid-cols-2 gap-1.5">
          {markets.btts.map((m) => (
            <MarketOddsButton
              key={m.label}
              label={m.label}
              odds={m.odds}
              selected={isSelected(`${matchId}-${m.label}`)}
              onSelect={() => onSelect(matchId, matchName, league, m.label, m.odds)}
            />
          ))}
        </div>
      </div>
      {/* Double Chance */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase">Double Chance</p>
        <div className="grid grid-cols-3 gap-1.5">
          {markets.doubleChance.map((m) => (
            <MarketOddsButton
              key={m.label}
              label={m.label}
              odds={m.odds}
              selected={isSelected(`${matchId}-${m.label}`)}
              onSelect={() => onSelect(matchId, matchName, league, m.label, m.odds)}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Index = () => {
  const { selections, toggleSelection, isSelected, clearSelections } = useBetSlip();
  const navigate = useNavigate();
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

  const handleOddsSelect = (matchId: number, match: string, league: string, pick: string, odds: string) => {
    const id = `${matchId}-${pick}`;
    toggleSelection({ id, matchId, match, league, pick, odds: parseFloat(odds) });
  };

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);

  const toggleExpand = (id: number) => {
    setExpandedMatch((prev) => (prev === id ? null : id));
  };

  return (
    <MobileLayout>
      {/* Top actions */}
      <section className="px-4 mt-3 flex items-center justify-between">
        <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Log In</Link>
        <Link to="/register" className="px-5 py-2 rounded-full orange-gradient text-highlight-foreground text-sm font-bold glow-orange">
          Create Account
        </Link>
      </section>

      {/* 18+ Badge */}
      <section className="px-4 mt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary" />
          <span className="text-[10px] text-primary font-semibold">18+ | Responsible Gaming | License N°2024/GJ/001</span>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                to={cat.to}
                className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border transition-all ${
                  cat.gradient
                    ? "border-highlight/30 card-gradient-warm glow-orange"
                    : "border-border bg-card hover:bg-card-elevated"
                }`}
              >
                <Icon size={22} className={cat.gradient ? "text-highlight" : "text-muted-foreground"} />
                <div className="text-center">
                  <p className="text-[11px] font-bold leading-tight">{cat.label}</p>
                  <p className={`text-[10px] leading-tight ${cat.gradient ? "text-highlight" : "text-muted-foreground"}`}>{cat.sublabel}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Gamification Banner */}
      <section className="px-4 mt-4">
        <Link to="/rewards" className="rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-yellow-600/10 p-3 flex items-center gap-3 hover:border-yellow-400/70 hover:from-yellow-500/15 hover:to-yellow-600/15 transition-all shadow-[0_0_20px_hsla(45,90%,50%,0.12)]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500/30 to-amber-600/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
            <Crown size={22} className="text-yellow-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">Level 12</span>
              <span className="text-[10px] text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Flame size={11} className="text-live" />
                <span className="text-[10px] font-bold text-live">4-day streak</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-highlight" style={{ width: "78%" }} />
              </div>
              <span className="text-[9px] text-muted-foreground">2,340 / 3,000 XP</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Target size={10} className="text-primary" />
                <span className="text-[9px] text-muted-foreground">2/4 missions</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={10} className="text-highlight" />
                <span className="text-[9px] text-muted-foreground">3/8 badges</span>
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-yellow-400 flex-shrink-0" />
        </Link>
      </section>

      {/* Challenge Banner */}
      <section className="px-4 mt-3">
        <Link to="/challenge" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
          <Swords size={18} className="text-primary" />
          <span className="text-sm font-bold text-primary">Challenge your friends</span>
        </Link>
      </section>

      {/* Live Matches */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
            <span className="text-sm font-bold text-live">LIVE</span>
          </div>
          <Link to="/sports" className="flex items-center gap-1 text-xs text-highlight font-semibold">
            All matches <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {liveMatches.map((match) => {
            const matchName = `${match.home.name} vs ${match.away.name}`;
            const isExpanded = expandedMatch === match.id;
            return (
              <div key={match.id} className="rounded-2xl border border-highlight/20 overflow-hidden card-gradient-warm animate-slide-up">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                  <div className="flex items-center gap-1">
                    <Flame size={11} className="text-live" />
                    <span className="text-[10px] text-live font-bold">{match.time}</span>
                  </div>
                </div>

                <div className="px-3 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TeamBadge abbr={match.home.abbr} />
                      <span className="text-sm font-bold">{match.home.name}</span>
                    </div>
                    <span className="text-lg font-bold text-highlight">{match.score}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{match.away.name}</span>
                      <TeamBadge abbr={match.away.abbr} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <OddsButton label="1" value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                    <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Draw (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Draw (X)", match.odds.draw)} />
                    <OddsButton label="2" value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <ExpandedMarkets
                      matchId={match.id}
                      matchName={matchName}
                      league={match.league}
                      markets={match.markets}
                      isSelected={isSelected}
                      onSelect={handleOddsSelect}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                  <button
                    onClick={() => toggleExpand(match.id)}
                    className="flex items-center gap-1 text-[10px] text-highlight font-semibold"
                  >
                    <ChevronDown size={12} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    {isExpanded ? "Less markets" : "+3 markets"}
                  </button>
                  <Link to="/sports" className="text-[10px] text-muted-foreground font-semibold">All bets →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mt-6 px-4 mb-24">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-highlight" />
            <span className="text-sm font-bold">UPCOMING</span>
          </div>
          <Link to="/sports" className="flex items-center gap-1 text-xs text-highlight font-semibold">
            View all <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingMatches.map((match) => {
            const matchName = `${match.home.name} vs ${match.away.name}`;
            const isExpanded = expandedMatch === match.id;
            return (
              <div key={match.id} className="rounded-2xl border border-border overflow-hidden card-gradient animate-slide-up">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[10px] text-muted-foreground font-medium">{match.league}</span>
                  <span className="text-[10px] text-highlight font-bold">{match.dateLabel} {match.date}</span>
                </div>

                <div className="px-3 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TeamBadge abbr={match.home.abbr} />
                      <span className="text-sm font-bold">{match.home.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{match.away.name}</span>
                      <TeamBadge abbr={match.away.abbr} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <OddsButton label="1" value={match.odds.home} selected={isSelected(`${match.id}-${match.home.name} (1)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.home.name} (1)`, match.odds.home)} />
                    <OddsButton label="X" value={match.odds.draw} selected={isSelected(`${match.id}-Draw (X)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, "Draw (X)", match.odds.draw)} />
                    <OddsButton label="2" value={match.odds.away} selected={isSelected(`${match.id}-${match.away.name} (2)`)} onSelect={() => handleOddsSelect(match.id, matchName, match.league, `${match.away.name} (2)`, match.odds.away)} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <ExpandedMarkets
                      matchId={match.id}
                      matchName={matchName}
                      league={match.league}
                      markets={match.markets}
                      isSelected={isSelected}
                      onSelect={handleOddsSelect}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between px-3 py-2 border-t border-border/50">
                  <button
                    onClick={() => toggleExpand(match.id)}
                    className="flex items-center gap-1 text-[10px] text-highlight font-semibold"
                  >
                    <ChevronDown size={12} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    {isExpanded ? "Less markets" : "+3 markets"}
                  </button>
                  <Link to="/sports" className="text-[10px] text-muted-foreground font-semibold">All bets →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Bet Slip Indicator */}
      <AnimatePresence>
        {selections.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-20 left-4 right-4 z-50"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/betslip")}
                className="flex-1 flex items-center justify-between px-4 py-3.5 rounded-2xl orange-gradient glow-orange shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingCart size={20} className="text-highlight-foreground" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-card text-highlight text-[10px] font-bold flex items-center justify-center">
                      {selections.length}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-highlight-foreground">{selections.length} selection{selections.length > 1 ? "s" : ""}</p>
                    <p className="text-[10px] text-highlight-foreground/70">Total odds: {totalOdds.toFixed(2)}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-highlight-foreground">View slip →</span>
              </button>
              <button
                onClick={() => clearSelections()}
                className="w-12 h-12 rounded-2xl bg-primary/90 flex items-center justify-center shadow-2xl shrink-0"
              >
                <X size={18} className="text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Index;
