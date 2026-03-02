import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const AgeVerification = () => {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleConfirm = () => {
    sessionStorage.setItem("age_verified", "true");
    setExiting(true);
    setTimeout(() => navigate("/home"), 500);
  };

  const handleDeny = () => {
    setExiting(true);
    setTimeout(() => navigate("/age-denied"), 400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? -20 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.03) 0%, #000000 50%, #000000 100%)",
      }}
    >
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2" style={{ borderColor: "#D4AF37" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full" style={{ background: "#D4AF37" }} />
      </div>

      <div className="absolute w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

      {/* Crown SVG Logo */}
      <motion.div
        className="mb-8 relative z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 220 160" className="w-28 h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ageGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8960C" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F2D06B" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8960C" />
            </linearGradient>
            <filter id="ageGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d="M 25 125 Q 55 145 110 145 Q 165 145 195 125 L 175 105 Q 150 128 110 128 Q 70 128 45 105 Z" fill="url(#ageGold)" filter="url(#ageGlow)" />
          <path d="M 50 100 Q 30 65 55 30 Q 63 20 70 30 Q 85 58 65 95 Z" fill="url(#ageGold)" filter="url(#ageGlow)" />
          <path d="M 90 92 Q 85 40 110 5 Q 135 40 130 92 Z" fill="url(#ageGold)" filter="url(#ageGlow)" />
          <path d="M 155 95 Q 135 58 150 30 Q 157 20 165 30 Q 190 65 170 100 Z" fill="url(#ageGold)" filter="url(#ageGlow)" />
        </svg>

        <span className="text-2xl font-bold tracking-[0.3em] uppercase" style={{
          fontFamily: "'Playfair Display', serif",
          background: "linear-gradient(135deg, #B8960C, #D4AF37, #F2D06B, #D4AF37, #B8960C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>PEERMONT</span>
      </motion.div>

      <motion.div
        className="w-full max-w-sm rounded-2xl p-6 text-center relative z-10"
        style={{
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(212,175,55,0.15)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Shield size={32} style={{ color: "#D4AF37" }} />
        </motion.div>

        <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.1em" }}>Age Verification</h1>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          Gambling is strictly reserved for persons aged{" "}
          <span className="font-bold" style={{ color: "#D4AF37" }}>18 and over</span>.
        </p>

        <p className="text-sm font-semibold mb-6">Are you 18 or older?</p>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.button
            onClick={handleDeny}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors btn-gold-shimmer"
            style={{
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "#D4AF37",
            }}
            whileTap={{ scale: 0.96 }}
          >
            No
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-bold btn-gold-shimmer"
            style={{ 
              background: "linear-gradient(135deg, #B8960C, #D4AF37, #F2D06B, #D4AF37, #B8960C)",
              color: "#000000",
              boxShadow: "0 0 20px rgba(212,175,55,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
          >
            Yes, I'm 18+
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-[10px] font-medium" style={{ color: "rgba(212,175,55,0.5)" }}>Licensed & Regulated</p>
        <p className="text-[10px] mt-1" style={{ color: "rgba(212,175,55,0.5)" }}>🔞 Gamble Responsibly</p>
      </motion.div>
    </motion.div>
  );
};

export default AgeVerification;
