import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import lottomaniaLogo from "@/assets/lottomania-logo.jpg";

const PETAL_COLORS = [
  "hsla(348, 80%, 55%, 0.9)", // red/pink
  "hsla(35, 95%, 55%, 0.9)",  // orange
  "hsla(45, 90%, 55%, 0.9)",  // yellow
  "hsla(140, 55%, 40%, 0.9)", // green
  "hsla(195, 85%, 50%, 0.9)", // cyan
  "hsla(260, 60%, 55%, 0.9)", // blue/purple
];

const ColorParticle = ({ delay, x, y, size, duration, color }: { delay: number; x: number; y: number; size: number; duration: number; color: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      background: `radial-gradient(circle, ${color}, transparent)`,
    }}
    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
    animate={{ x, y, opacity: [0, 1, 0.8, 0], scale: [0, 1.5, 0.6, 0] }}
    transition={{ duration, delay, ease: "easeOut" }}
  />
);

const DustMote = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 1.5 + Math.random() * 2,
      height: 1.5 + Math.random() * 2,
      background: color,
      left: `${x}%`,
      bottom: -10,
    }}
    animate={{ y: [0, -window.innerHeight - 50], opacity: [0, 0.4, 0.3, 0], x: [0, Math.sin(x) * 30] }}
    transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: "linear" }}
  />
);

const Splash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  const particles = useMemo(() =>
    Array.from({ length: 45 }, (_, i) => {
      const angle = (i / 45) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 50 + Math.random() * 160;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 2 + Math.random() * 6,
        delay: 0.5 + Math.random() * 0.5,
        duration: 0.6 + Math.random() * 0.7,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      };
    }), []
  );

  const dustMotes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 3,
      color: PETAL_COLORS[i % PETAL_COLORS.length].replace("0.9", `${0.15 + Math.random() * 0.2}`),
    })), []
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => navigate("/age-check"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={{ opacity: phase === 4 ? 0 : 1, scale: phase === 4 ? 1.05 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ background: "hsl(150, 20%, 4%)" }}
    >
      {dustMotes.map((m) => (
        <DustMote key={m.id} delay={m.delay} x={m.x} color={m.color} />
      ))}

      {/* Seed particle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 4, height: 4,
          background: "hsl(140, 55%, 35%)",
          boxShadow: "0 0 20px hsl(140, 55%, 35%), 0 0 40px hsla(140, 55%, 35%, 0.5)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === 0 ? [0, 1, 1.2, 1] : phase === 1 ? [1, 3, 0] : 0,
          opacity: phase === 0 ? [0, 1] : phase === 1 ? [1, 0.5, 0] : 0,
        }}
        transition={{ duration: phase === 0 ? 0.4 : 0.3, ease: "easeOut" }}
      />

      {/* Particle burst */}
      {phase >= 1 && phase < 3 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <ColorParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} duration={p.duration} color={p.color} />
          ))}
        </div>
      )}

      {/* Ambient glow */}
      <motion.div
        className="absolute"
        style={{ width: 600, height: 600, background: "radial-gradient(circle, hsla(140, 55%, 35%, 0.04) 0%, transparent 60%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: [1, 1.1, 1] }}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={lottomaniaLogo} alt="Lottomania" className="w-28 h-28 object-contain rounded-2xl" />
      </motion.div>

      {/* Brand name */}
      <motion.div
        className="relative z-10 mt-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.h1
          className="text-[32px] font-extrabold uppercase select-none"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, hsl(140,60%,25%) 0%, hsl(140,55%,35%) 30%, hsl(140,50%,48%) 50%, hsl(140,55%,35%) 70%, hsl(140,60%,25%) 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "textShimmer 4s ease-in-out infinite",
          }}
          initial={{ letterSpacing: "1em", opacity: 0, y: 15 }}
          animate={phase >= 3 ? { letterSpacing: "0.15em", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Lottomania
        </motion.h1>

        <motion.div
          className="mt-3"
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 3 ? { width: 200, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{ height: 1, background: "linear-gradient(90deg, transparent, hsl(140, 55%, 35%), transparent)" }}
        />

        <motion.p
          className="mt-4 text-[12px] font-light uppercase select-none"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.4em" }}
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Play & Win
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="relative z-10 w-32 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-[1px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(348,80%,55%), hsl(35,95%,55%), hsl(140,55%,35%), hsl(195,85%,50%))" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </motion.div>

      <motion.button
        className="absolute bottom-8 right-6 text-[11px] font-light z-20"
        style={{ color: "rgba(255,255,255,0.2)" }}
        onClick={() => navigate("/age-check")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ color: "rgba(255,255,255,0.5)" }}
      >
        Skip
      </motion.button>

      <motion.p
        className="absolute bottom-8 text-[9px] font-light tracking-wider z-10"
        style={{ color: "rgba(255,255,255,0.15)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        🔞 18+ | Gamble Responsibly
      </motion.p>

      <style>{`
        @keyframes textShimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default Splash;
