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
        background: "radial-gradient(ellipse at 50% 40%, hsl(0,0%,10%) 0%, hsl(0,0%,4%) 60%, hsl(0,0%,2%) 100%)",
      }}
    >
      {/* Subtle ambient gold glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsla(43,55%,48%,0.12) 0%, transparent 70%)" }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center">
          {/* Gold circle ring with gradient shine */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ inset: "-3rem" }}
            initial={{ scale: 0.7, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(43, 60%, 58%)" />
                  <stop offset="30%" stopColor="hsl(43, 35%, 30%)" />
                  <stop offset="60%" stopColor="hsl(43, 60%, 55%)" />
                  <stop offset="100%" stopColor="hsl(43, 30%, 25%)" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="none" stroke="url(#ringGrad)" strokeWidth="2" />
            </svg>
          </motion.div>
          <h1 className="text-7xl font-black tracking-[0.2em] uppercase leading-none select-none">
            <span style={{ 
              background: "linear-gradient(135deg, hsl(43,50%,60%), hsl(0,0%,55%), hsl(43,50%,55%), hsl(0,0%,45%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>TSOGO</span>
          </h1>
          {/* Thin gold line below */}
          <div className="w-24 h-px mt-3 mx-auto" style={{ 
            background: "linear-gradient(90deg, transparent, hsl(43,55%,48%), transparent)" 
          }} />
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 text-[10px] font-medium tracking-[0.4em] uppercase mt-8"
        style={{ color: "hsl(43, 40%, 45%)" }}
      >
        Premium Gaming
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 w-40 mt-12"
      >
        <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0,0%,12%)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(43,55%,40%), hsl(43,55%,55%))" }}
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
        className="absolute bottom-10 text-[10px] font-medium z-10"
        style={{ color: "hsl(0,0%,25%)" }}
      >
        🔞 18+ | Gamble Responsibly
      </motion.p>
    </motion.div>
  );
};

export default Splash;
