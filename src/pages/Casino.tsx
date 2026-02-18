import MobileLayout from "@/components/MobileLayout";
import { Search, Star, Users, TrendingUp, Zap, X, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import casinoPromo from "@/assets/casino-promo.jpg";
import slotsGame from "@/assets/slots-game.jpg";
import blackjackGame from "@/assets/blackjack-game.jpg";

const categories = ["Tout", "Crash", "Slots", "Table", "Live", "Jackpot", "Nouveau"];

const games = [
  { id: 1, name: "Roulette VIP", image: casinoPromo, category: "Live", players: 234, rating: 4.8 },
  { id: 2, name: "Golden Slots", image: slotsGame, category: "Slots", players: 1205, rating: 4.5 },
  { id: 3, name: "Blackjack Pro", image: blackjackGame, category: "Table", players: 89, rating: 4.9 },
  { id: 4, name: "Mega Fortune", image: slotsGame, category: "Jackpot", players: 567, rating: 4.3 },
  { id: 5, name: "Baccarat Elite", image: casinoPromo, category: "Live", players: 156, rating: 4.7 },
  { id: 6, name: "Texas Hold'em", image: blackjackGame, category: "Table", players: 312, rating: 4.6 },
];

// Crash game component
const CrashGame = () => {
  const [phase, setPhase] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [betAmount, setBetAmount] = useState("100");
  const [cashedOut, setCashedOut] = useState(false);
  const [cashOutAt, setCashOutAt] = useState(0);
  const [history, setHistory] = useState([2.34, 1.12, 5.67, 1.89, 3.45, 1.02, 8.91, 1.56]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const crashPointRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>([]);

  const drawGraph = useCallback((points: number[]) => {
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

    // Grid
    ctx.strokeStyle = "hsla(0,0%,100%,0.05)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = h - (i / 5) * h;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    if (points.length < 2) return;

    const maxY = Math.max(...points, 2);

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "hsla(350, 72%, 40%, 0.3)");
    grad.addColorStop(1, "hsla(350, 72%, 40%, 0)");

    ctx.beginPath();
    ctx.moveTo(0, h);
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - 1) / (maxY - 1)) * h * 0.85;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - 1) / (maxY - 1)) * h * 0.85;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "hsl(350, 72%, 45%)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dot at end
    const lastX = w;
    const lastY = h - ((points[points.length - 1] - 1) / (maxY - 1)) * h * 0.85;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(350, 72%, 50%)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastX, lastY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "hsla(350, 72%, 50%, 0.3)";
    ctx.fill();
  }, []);

  const startGame = () => {
    if (phase !== "waiting") return;
    setCashedOut(false);
    setCashOutAt(0);
    setMultiplier(1.0);
    pointsRef.current = [1.0];
    crashPointRef.current = 1 + Math.random() * 9 + 0.1;
    setPhase("running");

    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.02 + prev * 0.008;
        const rounded = parseFloat(next.toFixed(2));
        pointsRef.current.push(rounded);
        drawGraph(pointsRef.current);
        if (rounded >= crashPointRef.current) {
          clearInterval(intervalRef.current!);
          setPhase("crashed");
          setHistory((h) => [parseFloat(crashPointRef.current.toFixed(2)), ...h.slice(0, 9)]);
          return crashPointRef.current;
        }
        return rounded;
      });
    }, 80);
  };

  const cashOut = () => {
    if (phase !== "running" || cashedOut) return;
    setCashedOut(true);
    setCashOutAt(multiplier);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("waiting");
    setMultiplier(1.0);
    setCashedOut(false);
    pointsRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const profit = cashedOut ? (parseFloat(betAmount) * cashOutAt - parseFloat(betAmount)).toFixed(0) : 0;

  return (
    <div className="space-y-3">
      {/* History */}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {history.map((h, i) => (
          <span key={i} className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg ${h >= 2 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
            {h.toFixed(2)}x
          </span>
        ))}
      </div>

      {/* Graph area */}
      <div className="relative rounded-2xl border border-border overflow-hidden bg-card h-44">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={multiplier}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            {phase === "waiting" && (
              <p className="text-muted-foreground text-sm font-medium">Prêt à décoller 🚀</p>
            )}
            {phase === "running" && (
              <p className={`text-3xl font-black ${multiplier > 3 ? "text-success" : "text-highlight"}`}>
                {multiplier.toFixed(2)}x
              </p>
            )}
            {phase === "crashed" && (
              <motion.div initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <p className="text-2xl font-black text-destructive">CRASH!</p>
                <p className="text-sm text-muted-foreground mt-1">{crashPointRef.current.toFixed(2)}x</p>
              </motion.div>
            )}
          </motion.div>
        </div>
        {cashedOut && phase === "running" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-success/90 px-4 py-1.5 rounded-xl"
          >
            <p className="text-xs font-bold text-success-foreground">+{profit} FC à {cashOutAt.toFixed(2)}x</p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary"
            disabled={phase === "running"}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">FC</span>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col">
            <button onClick={() => setBetAmount(String(Math.min(10000, Number(betAmount) + 50)))} className="text-muted-foreground hover:text-foreground"><ChevronUp size={12} /></button>
            <button onClick={() => setBetAmount(String(Math.max(10, Number(betAmount) - 50)))} className="text-muted-foreground hover:text-foreground"><ChevronDown size={12} /></button>
          </div>
        </div>
        {phase === "waiting" && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={startGame} className="px-6 py-2.5 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange">
            Lancer 🚀
          </motion.button>
        )}
        {phase === "running" && !cashedOut && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={cashOut} className="px-6 py-2.5 rounded-xl bg-success text-success-foreground text-sm font-bold animate-pulse">
            Cash Out
          </motion.button>
        )}
        {(phase === "crashed" || (phase === "running" && cashedOut)) && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={reset} className="px-6 py-2.5 rounded-xl bg-card border border-border text-sm font-bold flex items-center gap-2">
            <RotateCcw size={14} /> Rejouer
          </motion.button>
        )}
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
            {[{ user: "Joh***", amount: "12,500 FC" }, { user: "Pat***", amount: "8,200 FC" }, { user: "Kin***", amount: "45,000 FC" }].map((w, i) => (
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

  const filtered = activeCategory === 0 ? games : games.filter((g) => g.category === categories[activeCategory]);
  const showCrash = activeCategory === 0 || activeCategory === 1;

  return (
    <MobileLayout>
      {/* Search */}
      <section className="px-4 mt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
          />
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
            <TrendingUp size={16} className="text-highlight" />
            <h3 className="text-sm font-bold">CRASH GAME</h3>
            <Zap size={12} className="text-highlight animate-pulse" />
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
      </section>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default Casino;
