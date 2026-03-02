import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import crownLogo from "@/assets/peermont-crown.jpg";

const Splash = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState(0); // 0: crown reveal, 1: text reveal, 2: tagline

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => {
      setExiting(true);
      setTimeout(() => navigate("/age-check"), 800);
    }, 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ background: "#000" }}
      >
        {/* Ambient gold particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: `hsla(43, 80%, ${50 + Math.random() * 20}%, ${0.15 + Math.random() * 0.2})`,
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle radial glow behind crown */}
        <motion.div
          className="absolute"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, hsla(43, 70%, 50%, 0.06) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crown Logo */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0.6, opacity: 0, filter: "blur(12px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={crownLogo}
            alt="Peermont Crown"
            className="w-32 h-32 object-contain"
            style={{ filter: "drop-shadow(0 0 40px hsla(43, 80%, 50%, 0.25))" }}
            animate={{
              filter: [
                "drop-shadow(0 0 40px hsla(43, 80%, 50%, 0.2))",
                "drop-shadow(0 0 60px hsla(43, 80%, 50%, 0.35))",
                "drop-shadow(0 0 40px hsla(43, 80%, 50%, 0.2))",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          className="relative z-10 mt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-4xl font-semibold tracking-[0.25em] uppercase select-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: "linear-gradient(135deg, hsl(43, 85%, 65%), hsl(38, 60%, 42%), hsl(43, 80%, 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TSOGO
          </h1>
          {/* Gold separator line */}
          <motion.div
            className="mt-3"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: phase >= 1 ? 64 : 0, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, hsl(43, 72%, 52%), transparent)",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="relative z-10 mt-5 text-[10px] font-light tracking-[0.5em] uppercase"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "hsl(43, 40%, 45%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          Premium Gaming
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="relative z-10 w-36 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.8 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="h-[1px] rounded-full overflow-hidden"
            style={{ background: "hsl(0, 0%, 15%)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(43, 72%, 40%), hsl(43, 85%, 60%))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="absolute bottom-8 text-[9px] font-light tracking-wider z-10"
          style={{ color: "hsl(0, 0%, 28%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🔞 18+ | Gamble Responsibly
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Splash;
