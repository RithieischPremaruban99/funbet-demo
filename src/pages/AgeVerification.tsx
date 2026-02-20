import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import scoramaLogo from "@/assets/scorama-logo.png";

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
        background: "radial-gradient(ellipse at 50% 40%, hsl(270,50%,22%) 0%, hsl(260,40%,10%) 50%, hsl(260,35%,5%) 100%)",
      }}
    >
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white" />
      </div>

      <div className="absolute w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsla(270,70%,55%,0.06) 0%, transparent 70%)" }} />

      {/* Logo */}
      <motion.div
        className="mb-8 relative z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={scoramaLogo} alt="Scorama" className="w-14 h-14 rounded-xl shadow-lg" />
      </motion.div>

      <motion.div
        className="w-full max-w-sm rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 text-center relative z-10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Shield size={32} className="text-primary" />
        </motion.div>

        <h1 className="text-xl font-bold mb-2">Age Verification</h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Gambling is strictly reserved for persons aged{" "}
          <span className="text-accent font-bold">18 and over</span>.
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
            className="flex-1 py-3 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-colors"
            whileTap={{ scale: 0.96 }}
          >
            No
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange"
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
        <p className="text-muted-foreground/30 text-[10px] font-medium">Licensed & Regulated</p>
        <p className="text-muted-foreground/30 text-[10px] mt-1">🔞 Gamble Responsibly</p>
      </motion.div>
    </motion.div>
  );
};

export default AgeVerification;
