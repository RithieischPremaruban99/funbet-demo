import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import crownLogo from "@/assets/peermont-crown.jpg";

// Gold particle component
const GoldParticle = ({ delay, x, y, size, duration }: { delay: number; x: number; y: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: "50%",
      top: "50%",
      background: `radial-gradient(circle, hsla(43, 90%, ${55 + Math.random() * 20}%, 0.9), hsla(43, 80%, 50%, 0))`,
    }}
    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
    animate={{
      x: x,
      y: y,
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 0.8, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// SVG Crown with stroke-dasharray animation
const AnimatedCrown = ({ visible }: { visible: boolean }) => (
  <svg
    viewBox="0 0 200 140"
    className="w-40 h-28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(43, 90%, 65%)" />
        <stop offset="30%" stopColor="hsl(38, 70%, 45%)" />
        <stop offset="60%" stopColor="hsl(43, 85%, 60%)" />
        <stop offset="100%" stopColor="hsl(40, 75%, 40%)" />
      </linearGradient>
      <linearGradient id="crownShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(43, 85%, 55%)">
          <animate attributeName="stop-color" values="hsl(43,85%,55%);hsl(43,95%,72%);hsl(43,85%,55%)" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stopColor="hsl(43, 95%, 72%)">
          <animate attributeName="stop-color" values="hsl(43,95%,72%);hsl(43,85%,55%);hsl(43,95%,72%)" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="hsl(38, 70%, 42%)">
          <animate attributeName="stop-color" values="hsl(38,70%,42%);hsl(43,90%,65%);hsl(38,70%,42%)" dur="3s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
      <filter id="crownGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Sweeping chevron base */}
    <motion.path
      d="M 30 110 Q 50 130 100 130 Q 150 130 170 110 L 155 95 Q 130 115 100 115 Q 70 115 45 95 Z"
      stroke="url(#crownGold)"
      strokeWidth="2.5"
      fill="url(#crownShimmer)"
      filter="url(#crownGlow)"
      initial={{ pathLength: 0, fillOpacity: 0 }}
      animate={visible ? { pathLength: 1, fillOpacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeInOut", fillOpacity: { delay: 0.5, duration: 0.5 } }}
    />

    {/* Left petal */}
    <motion.path
      d="M 45 90 Q 35 60 55 35 Q 60 28 65 35 Q 75 55 60 85 Z"
      stroke="url(#crownGold)"
      strokeWidth="2"
      fill="url(#crownShimmer)"
      filter="url(#crownGlow)"
      initial={{ pathLength: 0, fillOpacity: 0, scale: 0.5, opacity: 0 }}
      animate={visible ? { pathLength: 1, fillOpacity: 1, scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut", fillOpacity: { delay: 0.9, duration: 0.4 } }}
      style={{ transformOrigin: "55px 85px" }}
    />

    {/* Center petal (tallest) */}
    <motion.path
      d="M 85 80 Q 80 40 100 10 Q 120 40 115 80 Z"
      stroke="url(#crownGold)"
      strokeWidth="2"
      fill="url(#crownShimmer)"
      filter="url(#crownGlow)"
      initial={{ pathLength: 0, fillOpacity: 0, scale: 0.5, opacity: 0 }}
      animate={visible ? { pathLength: 1, fillOpacity: 1, scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.9, ease: "easeOut", fillOpacity: { delay: 1.2, duration: 0.4 } }}
      style={{ transformOrigin: "100px 80px" }}
    />

    {/* Right petal */}
    <motion.path
      d="M 140 85 Q 125 55 135 35 Q 140 28 145 35 Q 165 60 155 90 Z"
      stroke="url(#crownGold)"
      strokeWidth="2"
      fill="url(#crownShimmer)"
      filter="url(#crownGlow)"
      initial={{ pathLength: 0, fillOpacity: 0, scale: 0.5, opacity: 0 }}
      animate={visible ? { pathLength: 1, fillOpacity: 1, scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut", fillOpacity: { delay: 1.5, duration: 0.4 } }}
      style={{ transformOrigin: "145px 85px" }}
    />
  </svg>
);

const Splash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  // 0: void, 1: particles, 2: crown draws, 3: brand name, 4: exit

  // Generate particles once
  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 60 + Math.random() * 140;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 2 + Math.random() * 5,
        delay: 0.5 + Math.random() * 0.6,
        duration: 0.8 + Math.random() * 0.8,
      };
    }), []
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // particles start
      setTimeout(() => setPhase(2), 1500),   // crown draws
      setTimeout(() => setPhase(3), 2800),   // brand name
      setTimeout(() => setPhase(4), 3800),   // exit
      setTimeout(() => navigate("/age-check"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={{ opacity: phase === 4 ? 0 : 1, scale: phase === 4 ? 1.05 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ background: "#000" }}
    >
      {/* Phase 1: Gold particle explosion */}
      {phase >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <GoldParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} duration={p.duration} />
          ))}
        </div>
      )}

      {/* Ambient breathing glow */}
      <motion.div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, hsla(43, 75%, 50%, 0.04) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Phase 2: Crown materializes — SVG stroke animation */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedCrown visible={phase >= 2} />
      </motion.div>

      {/* Phase 3: Brand name reveal */}
      <motion.div
        className="relative z-10 mt-6 flex flex-col items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* Reveal mask animation */}
        <motion.div
          className="overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: phase >= 3 ? "auto" : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-4xl font-bold tracking-[0.3em] uppercase select-none whitespace-nowrap"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(110deg, hsl(43, 90%, 65%) 0%, hsl(38, 65%, 40%) 30%, hsl(43, 95%, 72%) 50%, hsl(38, 60%, 38%) 70%, hsl(43, 85%, 60%) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "textShimmer 4s ease-in-out infinite",
            }}
          >
            TSOGO
          </h1>
        </motion.div>

        {/* Gold line */}
        <motion.div
          className="mt-3"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: phase >= 3 ? 1 : 0, opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          style={{
            height: 1,
            width: 80,
            background: "linear-gradient(90deg, transparent, hsl(43, 72%, 52%), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-4 text-[9px] font-light tracking-[0.55em] uppercase"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "hsl(43, 35%, 40%)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 8 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Premium Gaming
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="relative z-10 w-32 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-[1px] rounded-full overflow-hidden" style={{ background: "hsl(0, 0%, 12%)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(43, 70%, 38%), hsl(43, 90%, 60%))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-7 text-[9px] font-light tracking-wider z-10"
        style={{ color: "hsl(0, 0%, 22%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 0.6 : 0 }}
        transition={{ duration: 0.5 }}
      >
        🔞 18+ | Gamble Responsibly
      </motion.p>

      {/* Shimmer keyframe for text */}
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
