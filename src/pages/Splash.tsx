import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import triveltaLogo from "@/assets/trivelta-logo.png";

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.05 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative z-10"
      >
        <img src={triveltaLogo} alt="Trivelta" className="w-52 h-auto" />
      </motion.div>

      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mb-6"
      >
        <div className="w-10 h-10 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
      </motion.div>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-muted-foreground text-sm text-center px-8"
      >
        Verifying your location{dots}
      </motion.p>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-muted-foreground/50 text-xs">License N°2024/GJ/001</p>
        <p className="text-muted-foreground/50 text-xs mt-1">🔞 Restricted to persons aged 18 and over</p>
      </motion.div>
    </motion.div>
  );
};

export default Splash;
