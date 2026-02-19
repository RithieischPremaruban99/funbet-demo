import { useState } from "react";
import { ChevronDown, ChevronRight, Minus, Plus, Search, ShoppingCart, Trash2, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBetSlip } from "@/contexts/BetSlipContext";

// --- Mock player data per match ---
interface PlayerData {
  name: string;
  team: string;
  stats: string[];
}

interface MatchPlayers {
  matchId: number;
  matchLabel: string;
  league: string;
  players: PlayerData[];
}

const availableMatches: MatchPlayers[] = [
  {
    matchId: 4,
    matchLabel: "FC Bayern vs FC Barcelona",
    league: "Champions League",
    players: [
      { name: "H. Kane", team: "FC Bayern", stats: ["Goals", "Shots", "Shots on Target", "Passes"] },
      { name: "J. Musiala", team: "FC Bayern", stats: ["Goals", "Assists", "Passes", "Dribbles"] },
      { name: "L. Sané", team: "FC Bayern", stats: ["Goals", "Assists", "Shots", "Crosses"] },
      { name: "J. Kimmich", team: "FC Bayern", stats: ["Passes", "Tackles", "Interceptions"] },
      { name: "R. Lewandowski", team: "FC Barcelona", stats: ["Goals", "Shots", "Shots on Target", "Headers"] },
      { name: "Lamine Yamal", team: "FC Barcelona", stats: ["Goals", "Assists", "Dribbles", "Crosses"] },
      { name: "Pedri", team: "FC Barcelona", stats: ["Passes", "Assists", "Key Passes", "Tackles"] },
      { name: "Gavi", team: "FC Barcelona", stats: ["Passes", "Tackles", "Interceptions", "Dribbles"] },
    ],
  },
  {
    matchId: 7,
    matchLabel: "Liverpool FC vs Manchester City",
    league: "Premier League",
    players: [
      { name: "M. Salah", team: "Liverpool FC", stats: ["Goals", "Shots", "Assists", "Dribbles"] },
      { name: "D. Núñez", team: "Liverpool FC", stats: ["Goals", "Shots", "Headers", "Shots on Target"] },
      { name: "T. Alexander-Arnold", team: "Liverpool FC", stats: ["Assists", "Passes", "Crosses", "Tackles"] },
      { name: "D. Szoboszlai", team: "Liverpool FC", stats: ["Goals", "Assists", "Key Passes", "Shots"] },
      { name: "E. Haaland", team: "Manchester City", stats: ["Goals", "Shots", "Headers", "Shots on Target"] },
      { name: "K. De Bruyne", team: "Manchester City", stats: ["Assists", "Key Passes", "Passes", "Shots"] },
      { name: "P. Foden", team: "Manchester City", stats: ["Goals", "Assists", "Dribbles", "Shots"] },
      { name: "B. Silva", team: "Manchester City", stats: ["Passes", "Key Passes", "Dribbles", "Tackles"] },
    ],
  },
  {
    matchId: 1,
    matchLabel: "Paris SG vs Olympique Lyonnais",
    league: "Ligue 1 - Matchday 24",
    players: [
      { name: "K. Mbappé", team: "Paris SG", stats: ["Goals", "Shots", "Dribbles", "Assists"] },
      { name: "O. Dembélé", team: "Paris SG", stats: ["Goals", "Assists", "Dribbles", "Crosses"] },
      { name: "M. Asensio", team: "Paris SG", stats: ["Goals", "Shots", "Key Passes", "Assists"] },
      { name: "V. Zaïre-Emery", team: "Paris SG", stats: ["Passes", "Tackles", "Interceptions", "Key Passes"] },
      { name: "A. Lacazette", team: "OL", stats: ["Goals", "Shots", "Headers", "Shots on Target"] },
      { name: "R. Cherki", team: "OL", stats: ["Goals", "Assists", "Dribbles", "Key Passes"] },
    ],
  },
];

type Condition = "at_least" | "over" | "under" | "exactly";

interface PropBuild {
  player: PlayerData | null;
  match: MatchPlayers | null;
  stat: string | null;
  condition: Condition;
  value: number;
}

const conditionLabels: Record<Condition, string> = {
  at_least: "At least",
  over: "Over",
  under: "Under",
  exactly: "Exactly",
};

// Generate a pseudo-random odds based on inputs
const calcOdds = (stat: string, condition: Condition, value: number): number => {
  const base: Record<string, number> = {
    Goals: 3.5,
    Assists: 3.2,
    Shots: 1.6,
    "Shots on Target": 2.0,
    Passes: 1.2,
    Tackles: 1.8,
    Interceptions: 2.1,
    Dribbles: 1.9,
    Crosses: 1.7,
    Headers: 3.0,
    "Key Passes": 2.2,
  };
  let odds = (base[stat] || 2.0) + value * 0.5;
  if (condition === "exactly") odds *= 1.8;
  if (condition === "under") odds *= 0.7;
  if (condition === "at_least") odds *= 0.9;
  return Math.max(1.1, Math.round(odds * 100) / 100);
};

type Step = "match" | "player" | "build";

const BetBuilder = () => {
  const { toggleSelection, isSelected } = useBetSlip();
  const [step, setStep] = useState<Step>("match");
  const [search, setSearch] = useState("");
  const [build, setBuild] = useState<PropBuild>({
    player: null,
    match: null,
    stat: null,
    condition: "at_least",
    value: 0,
  });

  const handleSelectMatch = (match: MatchPlayers) => {
    setBuild((p) => ({ ...p, match, player: null, stat: null, value: 0 }));
    setStep("player");
    setSearch("");
  };

  const handleSelectPlayer = (player: PlayerData) => {
    setBuild((p) => ({ ...p, player, stat: null, value: 0 }));
    setStep("build");
    setSearch("");
  };

  const handleAddToSlip = () => {
    if (!build.player || !build.stat || !build.match) return;
    const odds = calcOdds(build.stat, build.condition, build.value);
    const pick = `${build.player.name} ${conditionLabels[build.condition]} ${build.value} ${build.stat}`;
    const id = `bb-${build.match.matchId}-${pick}`;
    toggleSelection({
      id,
      matchId: build.match.matchId,
      match: build.match.matchLabel,
      league: build.match.league,
      pick,
      odds,
    });
    // Reset for next build
    setBuild({ player: null, match: null, stat: null, condition: "at_least", value: 0 });
    setStep("match");
  };

  const handleClear = () => {
    setBuild({ player: null, match: null, stat: null, condition: "at_least", value: 0 });
    setStep("match");
    setSearch("");
  };

  const odds = build.stat ? calcOdds(build.stat, build.condition, build.value) : null;

  // ====== STEP: SELECT MATCH ======
  if (step === "match") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
        {/* Header */}
        <div className="rounded-2xl border border-highlight/30 bg-highlight/5 p-4">
          <h3 className="text-sm font-black uppercase tracking-wide text-highlight mb-1">Bet Builder</h3>
          <p className="text-[10px] text-muted-foreground">Build your own custom player props. Choose a match to start.</p>
        </div>

        {/* Match List */}
        <div className="space-y-2">
          {availableMatches.map((m) => (
            <motion.button
              key={m.matchId}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectMatch(m)}
              className="w-full rounded-xl border border-border card-gradient p-3 flex items-center justify-between hover:border-highlight/30 transition-all"
            >
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground">{m.league}</p>
                <p className="text-xs font-bold mt-0.5">{m.matchLabel}</p>
                <p className="text-[10px] text-primary mt-0.5">{m.players.length} players available</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  // ====== STEP: SELECT PLAYER ======
  if (step === "player" && build.match) {
    const filtered = search.trim()
      ? build.match.players.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      : build.match.players;

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
        {/* Back + Title */}
        <div className="flex items-center gap-2">
          <button onClick={() => setStep("match")} className="text-[10px] text-primary font-semibold">← Back</button>
          <span className="text-[10px] text-muted-foreground">|</span>
          <span className="text-[10px] text-muted-foreground truncate">{build.match.matchLabel}</span>
        </div>

        <h3 className="text-sm font-bold">1. Select a Player</h3>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search player..."
            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Player list */}
        <div className="space-y-1.5">
          {filtered.map((player) => (
            <motion.button
              key={player.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectPlayer(player)}
              className="w-full rounded-xl border border-border card-gradient p-3 flex items-center gap-3 hover:border-primary/40 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-card-elevated border border-border flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold">{player.name}</p>
                <p className="text-[10px] text-muted-foreground">{player.team}</p>
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                {player.stats.slice(0, 2).map((s) => (
                  <span key={s} className="text-[8px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{s}</span>
                ))}
              </div>
              <Plus size={16} className="text-muted-foreground flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  // ====== STEP: BUILD PROP ======
  if (step === "build" && build.match && build.player) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
        {/* Back + Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setStep("player")} className="text-[10px] text-primary font-semibold">← Back</button>
            <span className="text-[10px] text-muted-foreground">|</span>
            <span className="text-[10px] text-muted-foreground truncate">Build Mode</span>
          </div>
          <button onClick={handleClear} className="flex items-center gap-1 text-[10px] text-destructive font-semibold">
            <Trash2 size={10} /> Clear All
          </button>
        </div>

        {/* Player Card */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold">{build.player.name}</p>
            <p className="text-[10px] text-muted-foreground">{build.player.team} — {build.match.matchLabel}</p>
          </div>
        </div>

        {/* 2. Select Statistic */}
        <div>
          <h4 className="text-xs font-bold mb-2">2. Select Statistic</h4>
          <div className="grid grid-cols-2 gap-1.5">
            {build.player.stats.map((stat) => (
              <button
                key={stat}
                onClick={() => setBuild((p) => ({ ...p, stat, value: stat === "Goals" ? 1 : 0 }))}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-left ${
                  build.stat === stat
                    ? "orange-gradient text-highlight-foreground glow-orange"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Condition */}
        {build.stat && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h4 className="text-xs font-bold mb-2">3. Will have</h4>
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(conditionLabels) as Condition[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setBuild((p) => ({ ...p, condition: c }))}
                  className={`py-2 rounded-xl text-[10px] font-bold transition-all ${
                    build.condition === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {conditionLabels[c]}
                </button>
              ))}
            </div>

            {/* 4. Value */}
            <div className="mt-3">
              <h4 className="text-xs font-bold mb-2">4. Value</h4>
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBuild((p) => ({ ...p, value: Math.max(0, p.value - 1) }))}
                  className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-card-elevated transition-colors"
                >
                  <Minus size={18} className="text-primary" />
                </motion.button>
                <div className="flex-1 h-12 rounded-xl border border-border bg-card-elevated flex items-center justify-center">
                  <span className="text-2xl font-black text-foreground">{build.value}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBuild((p) => ({ ...p, value: Math.min(20, p.value + 1) }))}
                  className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-card-elevated transition-colors"
                >
                  <Plus size={18} className="text-primary" />
                </motion.button>
              </div>
            </div>

            {/* Summary + Add */}
            <div className="mt-4 rounded-xl border border-highlight/30 bg-highlight/5 p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Your custom prop</p>
              <p className="text-xs font-bold">
                {build.player.name} — {conditionLabels[build.condition]} {build.value} {build.stat}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="px-3 py-2 rounded-lg bg-card border border-border">
                  <p className="text-[9px] text-muted-foreground">Odds</p>
                  <p className="text-sm font-black text-highlight">{odds?.toFixed(2)}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToSlip}
                  className="flex-1 ml-3 py-3 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Bet Slip
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return null;
};

export default BetBuilder;
