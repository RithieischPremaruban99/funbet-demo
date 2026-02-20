import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => navigate("/age-check"), 700);
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.08 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 50% 40%, hsl(220,40%,14%) 0%, hsl(220,42%,6%) 60%, hsl(220,45%,4%) 100%)",
      }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsla(0,72%,50%,0.15) 0%, transparent 70%)" }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          <h1 className="text-6xl font-black italic tracking-tight leading-none select-none">
            <span style={{ color: "hsl(0, 72%, 51%)" }}>bingo</span>
            <span style={{ color: "hsl(45, 95%, 55%)" }}>bets</span>
          </h1>
          {/* Swoosh underline */}
          <svg viewBox="0 0 200 20" className="w-48 mx-auto mt-1 opacity-80" fill="none">
            <path d="M10 15 Q60 2 190 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 text-[11px] font-semibold tracking-[0.3em] uppercase mt-4 text-white/30"
      >
        Bet · Win · Repeat
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 w-40 mt-12"
      >
        <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(0,72%,51%), hsl(45,95%,55%))" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 text-white/20 text-[10px] font-medium z-10"
      >
        🔞 18+ | Gamble Responsibly
      </motion.p>
    </motion.div>
  );
};

export default Splash;
