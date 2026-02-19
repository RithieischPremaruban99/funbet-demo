import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import triveltaLogo from "@/assets/trivelta-logo.png";

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? -20 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="absolute w-48 h-48 rounded-full bg-primary/8 blur-[80px]" />

      <motion.img
        src={triveltaLogo}
        alt="Trivelta"
        className="w-40 h-auto mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center relative z-10"
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
          In accordance with applicable legislation, gambling is
          strictly reserved for persons aged{" "}
          <span className="text-primary font-bold">18 and over</span>.
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
        className="absolute bottom-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-muted-foreground/50 text-xs">License N°2024/GJ/001</p>
        <p className="text-muted-foreground/50 text-xs mt-1">🔞 Responsible gaming | gamble in moderation</p>
      </motion.div>
    </motion.div>
  );
};

export default AgeVerification;
