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
        background: "radial-gradient(ellipse at 50% 40%, hsl(220,40%,16%) 0%, hsl(220,40%,8%) 50%, hsl(220,42%,4%) 100%)",
      }}
    >
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white" />
      </div>

      {/* Red spotlight glow */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, hsla(0,72%,55%,0.1) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Yellow ambient glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, hsla(45,95%,55%,0.08) 0%, transparent 60%)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-2 flex flex-col items-center"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Brand name */}
          <span className="text-5xl font-black tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]">
            <span className="text-primary">bingo</span><span className="text-accent">bets</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-[10px] font-bold tracking-[0.35em] uppercase mb-12"
        style={{ color: "hsla(45,95%,60%,0.5)" }}
      >
        Bet. Win. Repeat.
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 w-40"
      >
        <div className="h-1 rounded-full bg-border/40 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(0,72%,51%), hsl(45,95%,55%))" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            backgroundColor: i % 2 === 0 ? "hsla(0,72%,55%,0.2)" : "hsla(45,95%,55%,0.2)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 text-center z-10"
      >
        <p className="text-muted-foreground/30 text-[10px] font-medium">Licensed & Regulated</p>
        <p className="text-muted-foreground/30 text-[10px] mt-1">🔞 18+ | Gamble Responsibly</p>
      </motion.div>
    </motion.div>
  );
};

export default Splash;
