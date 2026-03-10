import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Gold particle component
const GoldParticle = ({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      background: `radial-gradient(circle, hsla(43, 90%, ${55 + Math.random() * 15}%, 0.9), hsla(43, 80%, 50%, 0))`,
    }}
    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
    animate={{
      x: x,
      y: y,
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1.5, 0.6, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// Floating ambient dust mote
const DustMote = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 1.5 + Math.random() * 2,
      height: 1.5 + Math.random() * 2,
      background: `hsla(43, 70%, 52%, ${0.15 + Math.random() * 0.2})`,
      left: `${x}%`,
      bottom: -10,
    }}
    animate={{
      y: [0, -window.innerHeight - 50],
      opacity: [0, 0.4, 0.3, 0],
      x: [0, Math.sin(x) * 30],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// SVG Crown with stroke-dasharray animation
const AnimatedBolt = ({ phase }: { phase: number }) => {
  const visible = phase >= 2;
  return (
    <svg viewBox="0 0 64 64" className="w-28 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="boltGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2D06B" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8960C" />
        </linearGradient>
        <filter id="boltGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path
        d="M36 4L12 36h16l-4 24 24-32H32l4-24z"
        stroke="url(#boltGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#boltGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M36 4L12 36h16l-4 24 24-32H32l4-24z"
        fill="url(#boltGold)"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
    </svg>
  );
};

const Splash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  // 0: black void, 1: particles, 2: crown draws, 3: brand reveal, 4: exit

  // Particle burst
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
      };
    }), []
  );

  // Ambient dust
  const dustMotes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 3,
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
      animate={{
        opacity: phase === 4 ? 0 : 1,
        scale: phase === 4 ? 1.05 : 1,
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ background: "#000000" }}
    >
      {/* Ambient floating dust motes */}
      {dustMotes.map((m) => (
        <DustMote key={m.id} delay={m.delay} x={m.x} />
      ))}

      {/* Phase 0: Single seed particle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 4,
          height: 4,
          background: "#D4AF37",
          boxShadow: "0 0 20px #D4AF37, 0 0 40px rgba(212,175,55,0.5)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === 0 ? [0, 1, 1.2, 1] : phase === 1 ? [1, 3, 0] : 0,
          opacity: phase === 0 ? [0, 1] : phase === 1 ? [1, 0.5, 0] : 0,
        }}
        transition={{ duration: phase === 0 ? 0.4 : 0.3, ease: "easeOut" }}
      />

      {/* Phase 1: Gold particle explosion */}
      {phase >= 1 && phase < 3 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <GoldParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} duration={p.duration} />
          ))}
        </div>
      )}

      {/* Radial ambient glow */}
      <motion.div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, scale: [1, 1.1, 1] }}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Phase 2: Crown materializes */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedBolt phase={phase} />
      </motion.div>

      {/* Phase 3: Brand name reveal */}
      <motion.div
        className="relative z-10 mt-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* PEERMONT with letter-spacing animation */}
        <motion.h1
          className="text-[32px] font-black uppercase select-none"
          style={{
            fontFamily: "'Inter', 'Arial Black', sans-serif",
            background: "linear-gradient(135deg, #B8960C 0%, #D4AF37 30%, #F2D06B 50%, #D4AF37 70%, #B8960C 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "textShimmer 4s ease-in-out infinite",
          }}
          initial={{ letterSpacing: "1em", opacity: 0, y: 15 }}
          animate={phase >= 3 ? { letterSpacing: "0.3em", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          WAZOBET
        </motion.h1>

        {/* Gold horizontal line extends from center */}
        <motion.div
          className="mt-3"
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 3 ? { width: 200, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-4 text-[12px] font-light uppercase select-none"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.4em",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Bold Betting
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
            style={{
              background: "linear-gradient(90deg, #B8960C, #D4AF37, #F2D06B)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Skip button */}
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

      {/* Footer */}
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
