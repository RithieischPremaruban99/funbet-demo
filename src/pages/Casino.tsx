import MobileLayout from "@/components/MobileLayout";
import { Search, Star, Users, TrendingUp, Zap, X, ChevronUp, ChevronDown, RotateCcw, Rocket, Target, Shield, Volume2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import casinoPromo from "@/assets/casino-promo.jpg";
import slotsGame from "@/assets/slots-game.jpg";
import blackjackGame from "@/assets/blackjack-game.jpg";
import crashRocket from "@/assets/crash-rocket.png";

const categories = ["Tout", "Crash", "Slots", "Table", "Live", "Jackpot", "Nouveau"];

const games = [
  { id: 1, name: "Roulette VIP", image: casinoPromo, category: "Live", players: 234, rating: 4.8 },
  { id: 2, name: "Golden Slots", image: slotsGame, category: "Slots", players: 1205, rating: 4.5 },
  { id: 3, name: "Blackjack Pro", image: blackjackGame, category: "Table", players: 89, rating: 4.9 },
  { id: 4, name: "Mega Fortune", image: slotsGame, category: "Jackpot", players: 567, rating: 4.3 },
  { id: 5, name: "Baccarat Elite", image: casinoPromo, category: "Live", players: 156, rating: 4.7 },
  { id: 6, name: "Texas Hold'em", image: blackjackGame, category: "Table", players: 312, rating: 4.6 },
];

// Fake live player names
const fakeNames = ["Kin***", "Pat***", "Joh***", "Mbu***", "Elo***", "Fab***", "Ben***", "God***", "Sam***", "Ali***", "Ced***", "Dav***", "Eri***", "Geo***"];

interface LiveBet {
  id: number;
  name: string;
  amount: number;
  cashedAt?: number;
  active: boolean;
}

// Enhanced Crash game component
const CrashGame = () => {
  const [phase, setPhase] = useState<"waiting" | "countdown" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [betAmount, setBetAmount] = useState("1000");
  const [cashedOut, setCashedOut] = useState(false);
  const [cashOutAt, setCashOutAt] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState("");
  const [history, setHistory] = useState([2.34, 1.12, 5.67, 1.89, 3.45, 1.02, 8.91, 1.56, 12.3, 1.44]);
  const [countdown, setCountdown] = useState(3);
  const [liveBets, setLiveBets] = useState<LiveBet[]>([]);
  const [showLiveBets, setShowLiveBets] = useState(true);
  const [totalPlayers, setTotalPlayers] = useState(47);
  const [screenShake, setScreenShake] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const crashPointRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>([]);
  const betIdRef = useRef(0);

  // Generate fake live bets
  const generateFakeBets = useCallback(() => {
    const count = 5 + Math.floor(Math.random() * 8);
    const bets: LiveBet[] = [];
    for (let i = 0; i < count; i++) {
      bets.push({
        id: betIdRef.current++,
        name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
        amount: [500, 1000, 2000, 5000, 10000, 25000][Math.floor(Math.random() * 6)],
        active: true,
      });
    }
    setLiveBets(bets);
    setTotalPlayers(30 + Math.floor(Math.random() * 40));
  }, []);

  // Simulate other players cashing out
  useEffect(() => {
    if (phase !== "running") return;
    const simInterval = setInterval(() => {
      setLiveBets(prev => {
        const active = prev.filter(b => b.active);
        if (active.length === 0) return prev;
        // Random player cashes out
        if (Math.random() < 0.3) {
          const idx = Math.floor(Math.random() * active.length);
          const target = active[idx];
          return prev.map(b => b.id === target.id ? { ...b, active: false, cashedAt: multiplier } : b);
        }
        return prev;
      });
    }, 400);
    return () => clearInterval(simInterval);
  }, [phase, multiplier]);

  const drawGraph = useCallback((points: number[], crashed = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    // Animated grid
    ctx.strokeStyle = "hsla(0,0%,100%,0.04)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const y = h - (i / 6) * h;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      // Labels
      ctx.fillStyle = "hsla(0,0%,100%,0.15)";
      ctx.font = "10px sans-serif";
      ctx.fillText(`${(i * 2).toFixed(0)}x`, 4, y - 4);
    }

    if (points.length < 2) return;
    const maxY = Math.max(...points, 2.5);

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    if (crashed) {
      grad.addColorStop(0, "hsla(0, 72%, 50%, 0.3)");
      grad.addColorStop(1, "hsla(0, 72%, 50%, 0)");
    } else {
      const hue = points[points.length - 1] > 3 ? 120 : points[points.length - 1] > 2 ? 60 : 350;
      grad.addColorStop(0, `hsla(${hue}, 72%, 40%, 0.3)`);
      grad.addColorStop(1, `hsla(${hue}, 72%, 40%, 0)`);
    }

    ctx.beginPath();
    ctx.moveTo(0, h);
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - 1) / (maxY - 1)) * h * 0.85;
      ctx.lineTo(x, y);
    });
    ctx.lineTo((points.length - 1) / (points.length - 1) * w, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line with glow
    const lineHue = crashed ? 0 : points[points.length - 1] > 3 ? 120 : points[points.length - 1] > 2 ? 60 : 350;
    ctx.shadowColor = `hsla(${lineHue}, 72%, 50%, 0.5)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - 1) / (maxY - 1)) * h * 0.85;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = `hsl(${lineHue}, 72%, 50%)`;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pulsing dot at end
    const lastX = (points.length - 1) / (points.length - 1) * w;
    const lastY = h - ((points[points.length - 1] - 1) / (maxY - 1)) * h * 0.85;
    
    if (!crashed) {
      // Outer glow
      ctx.beginPath();
      ctx.arc(lastX, lastY, 10, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${lineHue}, 72%, 50%, 0.15)`;
      ctx.fill();
      // Inner glow
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${lineHue}, 72%, 50%, 0.3)`;
      ctx.fill();
    }
    // Dot
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${lineHue}, 72%, 55%)`;
    ctx.fill();
  }, []);

  const startGame = () => {
    if (phase !== "waiting") return;
    setCashedOut(false);
    setCashOutAt(0);
    setMultiplier(1.0);
    pointsRef.current = [1.0];
    crashPointRef.current = 1 + Math.random() * 12 + 0.1;
    generateFakeBets();

    // Countdown phase
    setCountdown(3);
    setPhase("countdown");
    let c = 3;
    countdownRef.current = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(countdownRef.current!);
        setPhase("running");
        // Start the actual game
        intervalRef.current = setInterval(() => {
          setMultiplier((prev) => {
            const next = prev + 0.02 + prev * 0.008;
            const rounded = parseFloat(next.toFixed(2));
            pointsRef.current.push(rounded);
            drawGraph(pointsRef.current);

            if (rounded >= crashPointRef.current) {
              clearInterval(intervalRef.current!);
              setPhase("crashed");
              setScreenShake(true);
              setTimeout(() => setScreenShake(false), 500);
              drawGraph(pointsRef.current, true);
              setHistory((h) => [parseFloat(crashPointRef.current.toFixed(2)), ...h.slice(0, 11)]);
              // Mark all remaining active bets as lost
              setLiveBets(prev => prev.map(b => b.active ? { ...b, active: false } : b));
              return crashPointRef.current;
            }
            return rounded;
          });
        }, 70);
      }
    }, 1000);
  };

  // Auto cash out
  useEffect(() => {
    if (phase === "running" && !cashedOut && autoCashOut) {
      const target = parseFloat(autoCashOut);
      if (target > 0 && multiplier >= target) {
        setCashedOut(true);
        setCashOutAt(multiplier);
      }
    }
  }, [multiplier, phase, cashedOut, autoCashOut]);

  const cashOut = () => {
    if (phase !== "running" || cashedOut) return;
    setCashedOut(true);
    setCashOutAt(multiplier);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setPhase("waiting");
    setMultiplier(1.0);
    setCashedOut(false);
    setScreenShake(false);
    pointsRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }, []);

  const numBet = Number(betAmount) || 0;
  const profit = cashedOut ? Math.round(numBet * cashOutAt - numBet) : 0;
  const potentialWin = phase === "running" && !cashedOut ? Math.round(numBet * multiplier) : 0;

  return (
    <div className="space-y-3">
      {/* History strip */}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {history.map((h, i) => (
          <motion.span
            key={`${i}-${h}`}
            initial={i === 0 ? { scale: 0, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg ${
              h >= 5 ? "bg-primary/20 text-primary" : h >= 2 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            }`}
          >
            {h.toFixed(2)}x
          </motion.span>
        ))}
      </div>

      {/* Graph area */}
      <motion.div
        animate={screenShake ? { x: [0, -4, 4, -3, 3, -1, 1, 0], y: [0, 2, -2, 1, -1, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl border border-border overflow-hidden bg-card h-48"
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Player count badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
          <Users size={10} className="text-muted-foreground" />
          <span className="text-[10px] font-bold text-muted-foreground">{totalPlayers}</span>
        </div>

        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {phase === "waiting" && (
              <motion.div key="waiting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                  <Rocket size={32} className="text-primary mx-auto mb-2" />
                </motion.div>
                <p className="text-muted-foreground text-sm font-medium">Prêt à décoller 🚀</p>
                <p className="text-[10px] text-muted-foreground mt-1">Placez votre mise et lancez</p>
              </motion.div>
            )}
            {phase === "countdown" && (
              <motion.div key="countdown" className="text-center">
                <motion.span
                  key={countdown}
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="text-5xl font-black text-primary"
                >
                  {countdown}
                </motion.span>
                <p className="text-xs text-muted-foreground mt-2">Décollage imminent...</p>
              </motion.div>
            )}
            {phase === "running" && (
              <motion.div key="running" className="text-center">
                <motion.p
                  key={multiplier}
                  initial={{ scale: 0.97 }}
                  animate={{ scale: 1 }}
                  className={`text-4xl font-black tabular-nums ${
                    multiplier > 5 ? "text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
                    : multiplier > 3 ? "text-success drop-shadow-[0_0_15px_hsl(120,60%,40%,0.5)]"
                    : multiplier > 2 ? "text-highlight"
                    : "text-foreground"
                  }`}
                >
                  {multiplier.toFixed(2)}x
                </motion.p>
                {!cashedOut && potentialWin > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-muted-foreground mt-1">
                    Gain: <span className="text-highlight font-bold">{potentialWin.toLocaleString()} CDF</span>
                  </motion.p>
                )}
              </motion.div>
            )}
            {phase === "crashed" && (
              <motion.div key="crashed" initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }} className="text-center">
                <p className="text-3xl font-black text-destructive">💥 CRASH!</p>
                <p className="text-sm text-muted-foreground mt-1">{crashPointRef.current.toFixed(2)}x</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cash out success banner */}
        <AnimatePresence>
          {cashedOut && (
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-success px-5 py-2 rounded-2xl shadow-lg shadow-success/30"
            >
              <p className="text-sm font-bold text-success-foreground">+{profit.toLocaleString()} CDF à {cashOutAt.toFixed(2)}x 🎉</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rocket trail particles */}
        <AnimatePresence>
          {phase === "running" && !cashedOut && multiplier > 2 && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`trail-${i}`}
                  initial={{ opacity: 0.6, y: "40%", x: "50%", scale: 0.5 }}
                  animate={{
                    opacity: 0,
                    y: `${60 + i * 8}%`,
                    x: `${45 + Math.random() * 10}%`,
                    scale: 0,
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full bg-primary/50 pointer-events-none"
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Live Bets Feed */}
      <AnimatePresence>
        {showLiveBets && liveBets.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-border bg-card p-2.5 max-h-28 overflow-y-auto hide-scrollbar">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Joueurs en direct</p>
                <button onClick={() => setShowLiveBets(false)} className="text-muted-foreground"><X size={12} /></button>
              </div>
              <div className="space-y-1">
                {liveBets.map((bet) => (
                  <motion.div
                    key={bet.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-[10px]"
                  >
                    <span className="text-foreground font-medium">{bet.name}</span>
                    <span className="text-muted-foreground">{bet.amount.toLocaleString()} CDF</span>
                    {bet.cashedAt ? (
                      <span className="text-success font-bold">✓ {bet.cashedAt.toFixed(2)}x</span>
                    ) : bet.active ? (
                      <span className="text-highlight font-bold animate-pulse">En jeu</span>
                    ) : (
                      <span className="text-destructive font-bold">✗</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="space-y-2">
        {/* Bet amount + Auto cash out */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <label className="text-[9px] text-muted-foreground font-bold uppercase absolute -top-1.5 left-2 bg-card px-1 z-10">Mise</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary"
              disabled={phase === "running" || phase === "countdown"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">CDF</span>
          </div>
          <div className="w-28 relative">
            <label className="text-[9px] text-muted-foreground font-bold uppercase absolute -top-1.5 left-2 bg-card px-1 z-10">Auto ×</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={autoCashOut}
                onChange={(e) => setAutoCashOut(e.target.value)}
                placeholder="—"
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary text-center"
                disabled={phase === "running" || phase === "countdown"}
              />
              <Target size={14} className={`absolute right-2 ${autoCashOut ? "text-primary" : "text-muted-foreground"}`} />
            </div>
          </div>
        </div>

        {/* Quick bet amounts */}
        <div className="flex gap-1.5">
          {[500, 1000, 5000, 10000, 25000].map((a) => (
            <button
              key={a}
              onClick={() => setBetAmount(String(a))}
              disabled={phase === "running" || phase === "countdown"}
              className={`flex-1 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                betAmount === String(a)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card-elevated text-muted-foreground hover:border-highlight/40"
              }`}
            >
              {a >= 1000 ? `${a / 1000}K` : a}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {phase === "waiting" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange flex items-center justify-center gap-2"
            >
              <Rocket size={16} /> Lancer — {numBet.toLocaleString()} CDF
            </motion.button>
          )}
          {phase === "countdown" && (
            <div className="flex-1 py-3 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-bold text-center animate-pulse">
              Décollage dans {countdown}...
            </div>
          )}
          {phase === "running" && !cashedOut && (
            <motion.button
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.02 }}
              onClick={cashOut}
              className="flex-1 py-3 rounded-xl bg-success text-success-foreground text-sm font-bold shadow-lg shadow-success/30 flex items-center justify-center gap-2"
            >
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                💰
              </motion.div>
              Cash Out — {potentialWin.toLocaleString()} CDF
            </motion.button>
          )}
          {(phase === "crashed" || (phase === "running" && cashedOut)) && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex-1 py-3 rounded-xl bg-card border border-border text-sm font-bold flex items-center justify-center gap-2 hover:bg-card-elevated transition-colors"
            >
              <RotateCcw size={14} /> Rejouer
            </motion.button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="text-[9px] text-muted-foreground">
            Max: <span className="text-highlight font-bold">{Math.max(...history).toFixed(2)}x</span>
          </div>
          <div className="text-[9px] text-muted-foreground">
            Moy: <span className="font-bold">{(history.reduce((a, b) => a + b, 0) / history.length).toFixed(2)}x</span>
          </div>
        </div>
        <button
          onClick={() => setShowLiveBets(!showLiveBets)}
          className="text-[9px] text-primary font-bold flex items-center gap-1"
        >
          <Users size={10} /> {showLiveBets ? "Masquer" : "Joueurs"}
        </button>
      </div>
    </div>
  );
};

// Game detail modal
const GameModal = ({ game, onClose }: { game: typeof games[0]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="w-full max-h-[85vh] rounded-t-3xl border-t border-border overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full glass-effect">
          <X size={18} />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-0.5 rounded-full bg-highlight/20 text-highlight text-[10px] font-bold border border-highlight/30">{game.category}</span>
          <h2 className="text-xl font-bold mt-2">{game.name}</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star size={12} className="text-highlight fill-highlight" /> {game.rating}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Users size={12} /> {game.players} joueurs</span>
          </div>
        </div>
      </div>
      <div className="p-4 card-gradient space-y-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
        >
          🎮 Jouer maintenant
        </motion.button>
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl bg-card border border-border text-xs font-semibold">Démo gratuite</button>
          <button className="flex-1 py-2.5 rounded-xl bg-card border border-border text-xs font-semibold">Règles du jeu</button>
        </div>
        <div className="rounded-xl border border-border p-3 card-gradient">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Derniers gains</p>
          <div className="space-y-2">
            {[{ user: "Joh***", amount: "12,500 CDF" }, { user: "Pat***", amount: "8,200 CDF" }, { user: "Kin***", amount: "45,000 CDF" }].map((w, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-foreground">{w.user}</span>
                <span className="text-xs font-bold text-success">+{w.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Casino = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = (activeCategory === 0 ? games : games.filter((g) => g.category === categories[activeCategory]))
    .filter((g) => searchQuery.trim() === "" || g.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const showCrash = activeCategory === 0 || activeCategory === 1;

  return (
    <MobileLayout>
      {/* Search */}
      <section className="px-4 mt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un jeu..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 mt-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                i === activeCategory
                  ? "orange-gradient text-highlight-foreground glow-orange"
                  : "bg-card border border-border text-secondary-foreground hover:bg-card-elevated"
              }`}
            >
              {cat === "Crash" ? `🚀 ${cat}` : cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Crash Game Section */}
      {showCrash && (
        <section className="px-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <img src={crashRocket} alt="Crash Game" className="w-7 h-7 rounded-lg object-cover" />
            <h3 className="text-sm font-bold">CRASH GAME</h3>
            <Zap size={12} className="text-highlight animate-pulse" />
            <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-live/20 text-live font-bold animate-pulse">● LIVE</span>
          </div>
          <div className="rounded-2xl border border-highlight/20 p-4 card-gradient-warm">
            <CrashGame />
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="px-4 mt-4">
        <div className="relative rounded-2xl overflow-hidden border border-highlight/20">
          <img src={casinoPromo} alt="Casino VIP" className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center pl-4">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Exclusif</span>
            <h2 className="text-lg font-bold mt-1">Roulette VIP</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Tables privées disponibles</p>
            <motion.button whileTap={{ scale: 0.95 }} className="mt-2 orange-gradient px-4 py-1.5 rounded-lg text-highlight-foreground text-xs font-bold w-fit glow-orange">
              Jouer maintenant
            </motion.button>
          </div>
          <div className="absolute bottom-2 right-3">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground font-bold">18+</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="px-4 mt-4 mb-6">
        <h3 className="text-sm font-bold mb-3">JEUX POPULAIRES</h3>
        {filtered.length === 0 ? (
          <div className="text-center py-8">
            <Search size={28} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Aucun jeu trouvé</p>
            <p className="text-xs text-muted-foreground mt-1">Essayez un autre terme</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((game) => (
            <motion.div
              key={game.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedGame(game)}
              className="rounded-xl overflow-hidden border border-border group cursor-pointer hover:border-highlight/30 transition-all"
              layout
            >
              <div className="relative">
                <img src={game.image} alt={game.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-card/80 text-[9px] font-semibold backdrop-blur-sm border border-border">
                    {game.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-highlight/0 group-hover:bg-highlight/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-bold bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">▶ Jouer</span>
                </div>
              </div>
              <div className="p-2.5 card-gradient">
                <p className="text-xs font-semibold">{game.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <Star size={10} className="text-highlight fill-highlight" />
                    <span className="text-[10px] text-muted-foreground">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{game.players}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </section>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Casino;
