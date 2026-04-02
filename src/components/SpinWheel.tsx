import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, RotateCw } from "lucide-react";

const SEGMENTS = [
  { label: "R50 Free Bet", color: "hsl(var(--primary))", textColor: "hsl(var(--primary-foreground))" },
  { label: "25 XP", color: "hsl(var(--card-elevated))", textColor: "hsl(var(--foreground))" },
  { label: "R100 Bonus", color: "hsl(var(--accent))", textColor: "hsl(0 0% 10%)" },
  { label: "50 XP", color: "hsl(var(--card-elevated))", textColor: "hsl(var(--foreground))" },
  { label: "R200 Free Bet", color: "hsl(var(--primary))", textColor: "hsl(var(--primary-foreground))" },
  { label: "10 XP", color: "hsl(var(--card-elevated))", textColor: "hsl(var(--foreground))" },
  { label: "R500 Jackpot", color: "hsl(45 100% 50%)", textColor: "hsl(0 0% 10%)" },
  { label: "Try Again", color: "hsl(var(--card-elevated))", textColor: "hsl(var(--muted-foreground))" },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

interface SpinWheelProps {
  spinsLeft: number;
  onSpin: (prize: string) => void;
  compact?: boolean;
}

const WheelSVG = ({ segments }: { segments: typeof SEGMENTS }) => (
  <>
    {segments.map((seg, i) => {
      const startAngle = i * SEGMENT_ANGLE;
      const endAngle = startAngle + SEGMENT_ANGLE;
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      const x1 = 100 + 95 * Math.cos(startRad);
      const y1 = 100 + 95 * Math.sin(startRad);
      const x2 = 100 + 95 * Math.cos(endRad);
      const y2 = 100 + 95 * Math.sin(endRad);
      const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
      const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
      const textX = 100 + 62 * Math.cos(midAngle);
      const textY = 100 + 62 * Math.sin(midAngle);
      const textRotation = (startAngle + endAngle) / 2;

      return (
        <g key={i}>
          <path
            d={`M100,100 L${x1},${y1} A95,95 0 ${largeArc},1 ${x2},${y2} Z`}
            fill={seg.color}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
          />
          <text
            x={textX}
            y={textY}
            fill={seg.textColor}
            fontSize="6"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {seg.label}
          </text>
        </g>
      );
    })}
    <circle cx="100" cy="100" r="18" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
    <text x="100" y="100" fill="hsl(var(--primary))" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">SPIN</text>
  </>
);

const SpinWheel = ({ spinsLeft, onSpin, compact = false }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [idleRotation, setIdleRotation] = useState(0);

  // Slow idle rotation when not spinning
  useEffect(() => {
    if (spinning) return;
    const interval = setInterval(() => {
      setIdleRotation((prev) => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, [spinning]);

  const spin = useCallback(() => {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setResult(null);

    const winIndex = Math.floor(Math.random() * SEGMENTS.length);
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = 360 - winIndex * SEGMENT_ANGLE - SEGMENT_ANGLE / 2;
    const newRotation = rotation + extraRotations + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[winIndex].label);
      onSpin(SEGMENTS[winIndex].label);
    }, 4000);
  }, [spinning, spinsLeft, rotation, onSpin]);

  // --- Compact mode: small wheel always visible ---
  if (compact) {
    return (
      <div className="relative flex flex-col items-center cursor-pointer" onClick={spin}>
        {/* Mini pointer */}
        <div className="absolute -top-0.5 z-20 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[9px] border-l-transparent border-r-transparent border-t-primary" />

        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
          animate={{ rotate: spinning ? rotation : idleRotation }}
          transition={spinning ? { duration: 4, ease: [0.2, 0.8, 0.3, 1] } : { duration: 0, ease: "linear" }}
        >
          <WheelSVG segments={SEGMENTS} />
        </motion.svg>

        {/* Spins indicator */}
        <div className="mt-1 flex items-center gap-1">
          <Gift size={10} className="text-accent" />
          <span className="text-[9px] font-bold text-accent">
            {spinsLeft > 0 ? `${spinsLeft} spin${spinsLeft !== 1 ? "s" : ""}` : "No spins"}
          </span>
        </div>

        {result && !spinning && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] font-bold text-accent mt-0.5"
          >
            🎉 {result}
          </motion.p>
        )}
      </div>
    );
  }

  // --- Full mode ---
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Gift size={16} className="text-accent" />
          Daily Spin
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground">
          {spinsLeft} spin{spinsLeft !== 1 ? "s" : ""} left
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="absolute -top-1 z-20 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />

        <div className="relative w-64 h-64">
          <motion.svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            animate={{ rotate: spinning ? rotation : idleRotation }}
            transition={spinning ? { duration: 4, ease: [0.2, 0.8, 0.3, 1] } : { duration: 0, ease: "linear" }}
          >
            <WheelSVG segments={SEGMENTS} />
          </motion.svg>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={spin}
          disabled={spinning || spinsLeft <= 0}
          className={`mt-3 w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            spinning || spinsLeft <= 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "red-gradient text-primary-foreground glow-orange"
          }`}
        >
          <RotateCw size={16} className={spinning ? "animate-spin" : ""} />
          {spinning ? "Spinning..." : spinsLeft <= 0 ? "No spins left" : "Spin the Wheel!"}
        </motion.button>

        {result && !spinning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center"
          >
            <p className="text-xs font-bold text-accent">🎉 You won: {result}!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
