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
        background: "radial-gradient(ellipse at 50% 40%, hsl(220,28%,18%) 0%, hsl(220,30%,12%) 60%, hsl(220,32%,8%) 100%)",
      }}
    >
      {/* Subtle ambient gold glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsla(40,55%,55%,0.1) 0%, transparent 70%)" }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center justify-center" style={{ width: "180px", height: "180px" }}>
          {/* Gold circle ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full rounded-full border-[2.5px]" style={{
              borderColor: "hsl(40, 55%, 50%)",
            }} />
          </motion.div>
          <h1 className="text-5xl font-black tracking-[0.18em] uppercase leading-none select-none relative z-10">
            <span style={{ 
              background: "linear-gradient(135deg, hsl(40,60%,62%), hsl(40,40%,45%), hsl(40,60%,58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>TSOGO</span>
          </h1>
          <div className="w-16 h-px mt-2 mx-auto relative z-10" style={{ 
            background: "linear-gradient(90deg, transparent, hsl(40,55%,55%), transparent)" 
          }} />
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 text-[10px] font-medium tracking-[0.4em] uppercase mt-8"
        style={{ color: "hsl(40, 45%, 50%)" }}
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
        <div className="h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(220,25%,20%)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(40,55%,42%), hsl(40,60%,58%))" }}
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
        style={{ color: "hsl(220,15%,35%)" }}
      >
        🔞 18+ | Gamble Responsibly
      </motion.p>
    </motion.div>
  );
};

export default Splash;
