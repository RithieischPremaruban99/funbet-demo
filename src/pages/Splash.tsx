import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => navigate("/age-check"), 600);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(130,50%,18%)] via-[hsl(140,40%,12%)] to-[hsl(140,30%,6%)]"
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.05 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Subtle field pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(120,40%,30%) 40px, hsl(120,40%,30%) 41px)`,
      }} />

      {/* Ambient glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-[hsl(45,95%,50%)]/8 blur-[120px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative z-10 flex flex-col items-center"
      >
        <div className="flex items-center gap-2">
          <span className="text-5xl font-black tracking-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">SOCCA</span>
            <span className="text-accent drop-shadow-[0_2px_15px_hsla(45,95%,50%,0.4)]">BET</span>
          </span>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            ⚽
          </motion.span>
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-semibold tracking-[0.3em] uppercase mt-2">
          Play • Win • Repeat
        </p>
      </motion.div>

      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mb-6"
      >
        <div className="w-10 h-10 border-[3px] border-accent/20 border-t-accent rounded-full animate-spin" />
      </motion.div>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-muted-foreground text-sm text-center px-8"
      >
        Loading{dots}
      </motion.p>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-muted-foreground/40 text-xs">Licensed & Regulated</p>
        <p className="text-muted-foreground/40 text-xs mt-1">🔞 18+ | Gamble Responsibly</p>
      </motion.div>
    </motion.div>
  );
};

export default Splash;
