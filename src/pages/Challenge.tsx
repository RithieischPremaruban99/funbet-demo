import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import { Swords, Trophy, Users, Share2, Plus, Crown, Flame, ChevronRight, Copy, Check, Zap, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TeamBadge from "@/components/TeamBadge";

type ChallengeStep = "menu" | "create" | "pending" | "leaderboard";

const activeChallenges = [
  {
    id: 1,
    opponent: "Mike K.",
    match: "PSG vs Bayern",
    myPick: "PSG (1)",
    opponentPick: "Bayern (2)",
    stake: 5000,
    status: "En cours",
    myOdds: "2.20",
  },
  {
    id: 2,
    opponent: "Sarah M.",
    match: "OM vs PSG",
    myPick: "Plus de 2.5 buts",
    opponentPick: "Moins de 2.5 buts",
    stake: 2000,
    status: "En attente",
    myOdds: "1.85",
  },
];

const leaderboard = [
  { rank: 1, name: "Vous", wins: 12, losses: 3, profit: "+45 000 FC" },
  { rank: 2, name: "Mike K.", wins: 10, losses: 5, profit: "+32 000 FC" },
  { rank: 3, name: "Sarah M.", wins: 9, losses: 4, profit: "+28 500 FC" },
  { rank: 4, name: "Amine L.", wins: 8, losses: 6, profit: "+15 000 FC" },
  { rank: 5, name: "Jean-P.", wins: 7, losses: 7, profit: "+2 000 FC" },
];

const challengeMatches = [
  { id: 101, home: "Paris SG", homeAbbr: "PSG", away: "FC Bayern", awayAbbr: "BAY", league: "Champions League", date: "DEMAIN 21:00" },
  { id: 102, home: "FC Barcelona", homeAbbr: "BAR", away: "Inter Milan", awayAbbr: "INT", league: "Champions League", date: "DEMAIN 21:00" },
  { id: 103, home: "Olympique Marseille", homeAbbr: "OM", away: "Paris SG", awayAbbr: "PSG", league: "Ligue 1", date: "SAM 17:00" },
  { id: 104, home: "Liverpool FC", homeAbbr: "LIV", away: "Manchester City", awayAbbr: "MCI", league: "Premier League", date: "DIM 16:00" },
];

const stakeOptions = [1000, 2000, 5000, 10000, 25000];

const Challenge = () => {
  const [step, setStep] = useState<ChallengeStep>("menu");
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [selectedPick, setSelectedPick] = useState<string | null>(null);
  const [selectedStake, setSelectedStake] = useState(5000);
  const [linkCopied, setLinkCopied] = useState(false);
  const [challengeCreated, setChallengCreated] = useState(false);

  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCreateChallenge = () => {
    setChallengCreated(true);
  };

  const matchData = challengeMatches.find((m) => m.id === selectedMatch);

  return (
    <MobileLayout>
      <div className="px-4 mt-3 mb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-10 h-10 rounded-2xl orange-gradient flex items-center justify-center glow-orange">
            <Swords size={20} className="text-highlight-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Défi entre amis</h1>
            <p className="text-[11px] text-muted-foreground">Pariez contre vos potes</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-5">
          {[
            { key: "menu" as ChallengeStep, label: "Mes défis", icon: Target },
            { key: "create" as ChallengeStep, label: "Créer", icon: Plus },
            { key: "leaderboard" as ChallengeStep, label: "Classement", icon: Crown },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = step === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => { setStep(tab.key); setChallengCreated(false); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isActive
                    ? "border-highlight/30 card-gradient-warm text-highlight"
                    : "border-border bg-card text-muted-foreground hover:bg-card-elevated"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* ========== MES DÉFIS ========== */}
          {step === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
              {activeChallenges.length === 0 ? (
                <div className="text-center py-12">
                  <Swords size={40} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Aucun défi en cours</p>
                  <button onClick={() => setStep("create")} className="mt-3 px-5 py-2 rounded-full orange-gradient text-highlight-foreground text-sm font-bold">
                    Lancer un défi
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Défis actifs</p>
                  {activeChallenges.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl border border-border overflow-hidden card-gradient"
                    >
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-[10px] text-muted-foreground font-medium">{c.match}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === "En cours" ? "bg-live/20 text-live" : "bg-highlight/20 text-highlight"
                        }`}>{c.status}</span>
                      </div>
                      <div className="px-3 pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-center flex-1">
                            <p className="text-[10px] text-muted-foreground">Vous</p>
                            <p className="text-xs font-bold text-primary">{c.myPick}</p>
                          </div>
                          <div className="px-3">
                            <Swords size={16} className="text-highlight" />
                          </div>
                          <div className="text-center flex-1">
                            <p className="text-[10px] text-muted-foreground">{c.opponent}</p>
                            <p className="text-xs font-bold text-foreground">{c.opponentPick}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-background/50 border border-border">
                          <span className="text-[10px] text-muted-foreground">Mise</span>
                          <span className="text-xs font-bold text-highlight">{c.stake.toLocaleString()} FC</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <button
                    onClick={() => setStep("create")}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-highlight/30 text-highlight text-sm font-bold hover:bg-highlight/5 transition-colors"
                  >
                    <Plus size={16} /> Nouveau défi
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* ========== CRÉER UN DÉFI ========== */}
          {step === "create" && !challengeCreated && (
            <motion.div key="create" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              {/* Step 1: Choose match */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full orange-gradient text-highlight-foreground text-[10px] font-bold flex items-center justify-center">1</span>
                  Choisir un match
                </p>
                <div className="space-y-2">
                  {challengeMatches.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setSelectedMatch(m.id); setSelectedPick(null); }}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${
                        selectedMatch === m.id
                          ? "border-highlight bg-highlight/10"
                          : "border-border bg-card hover:bg-card-elevated"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">{m.league}</span>
                        <span className="text-[10px] text-highlight font-bold">{m.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TeamBadge abbr={m.homeAbbr} />
                        <span className="text-xs font-bold">{m.home}</span>
                        <span className="text-[10px] text-muted-foreground mx-1">vs</span>
                        <span className="text-xs font-bold">{m.away}</span>
                        <TeamBadge abbr={m.awayAbbr} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose your pick */}
              {selectedMatch && matchData && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full orange-gradient text-highlight-foreground text-[10px] font-bold flex items-center justify-center">2</span>
                    Votre pronostic
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: `${matchData.home} (1)`, pick: "home" },
                      { label: "Nul (X)", pick: "draw" },
                      { label: `${matchData.away} (2)`, pick: "away" },
                    ].map((opt) => (
                      <button
                        key={opt.pick}
                        onClick={() => setSelectedPick(opt.pick)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedPick === opt.pick
                            ? "border-highlight bg-highlight/20 text-highlight"
                            : "border-border bg-card text-foreground hover:bg-card-elevated"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Stake */}
              {selectedPick && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full orange-gradient text-highlight-foreground text-[10px] font-bold flex items-center justify-center">3</span>
                    Mise du défi
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {stakeOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedStake(s)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          selectedStake === s
                            ? "border-highlight bg-highlight/20 text-highlight"
                            : "border-border bg-card text-foreground hover:bg-card-elevated"
                        }`}
                      >
                        {s.toLocaleString()} FC
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Create button */}
              {selectedPick && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    onClick={handleCreateChallenge}
                    className="w-full py-3.5 rounded-2xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Créer le défi — {selectedStake.toLocaleString()} FC
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ========== CHALLENGE CREATED ========== */}
          {step === "create" && challengeCreated && (
            <motion.div
              key="created"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 rounded-full orange-gradient mx-auto flex items-center justify-center glow-orange"
              >
                <Swords size={28} className="text-highlight-foreground" />
              </motion.div>
              <div>
                <h2 className="text-lg font-bold">Défi créé ! 🔥</h2>
                <p className="text-xs text-muted-foreground mt-1">Partagez le lien avec votre ami pour qu'il accepte</p>
              </div>

              {matchData && (
                <div className="rounded-2xl border border-highlight/20 card-gradient-warm p-3">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <TeamBadge abbr={matchData.homeAbbr} />
                    <span className="text-xs font-bold">{matchData.home} vs {matchData.away}</span>
                    <TeamBadge abbr={matchData.awayAbbr} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">Votre prono: <span className="text-highlight font-bold">{
                    selectedPick === "home" ? `${matchData.home} (1)` : selectedPick === "draw" ? "Nul (X)" : `${matchData.away} (2)`
                  }</span></p>
                  <p className="text-[10px] text-muted-foreground">Mise: <span className="text-highlight font-bold">{selectedStake.toLocaleString()} FC</span></p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-sm font-bold hover:bg-card-elevated transition-colors"
                >
                  {linkCopied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                  {linkCopied ? "Copié !" : "Copier le lien"}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange">
                  <Share2 size={16} />
                  Partager
                </button>
              </div>

              <button
                onClick={() => { setChallengCreated(false); setSelectedMatch(null); setSelectedPick(null); }}
                className="text-xs text-highlight font-semibold"
              >
                Créer un autre défi →
              </button>
            </motion.div>
          )}

          {/* ========== CLASSEMENT ========== */}
          {step === "leaderboard" && (
            <motion.div key="leaderboard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5">
                <Crown size={12} className="text-highlight" /> Classement entre amis
              </p>
              {leaderboard.map((player, i) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    player.rank === 1
                      ? "border-highlight/30 card-gradient-warm"
                      : "border-border bg-card"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    player.rank === 1
                      ? "orange-gradient text-highlight-foreground"
                      : player.rank === 2
                      ? "bg-muted text-foreground"
                      : player.rank === 3
                      ? "bg-muted text-foreground"
                      : "bg-background text-muted-foreground"
                  }`}>
                    {player.rank <= 3 ? (
                      player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"
                    ) : (
                      player.rank
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${player.rank === 1 ? "text-highlight" : ""}`}>{player.name}</p>
                    <p className="text-[10px] text-muted-foreground">{player.wins}V - {player.losses}D</p>
                  </div>
                  <span className={`text-xs font-bold ${player.profit.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                    {player.profit}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
};

export default Challenge;
