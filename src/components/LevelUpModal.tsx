import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, X } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";

const LevelUpModal = () => {
  const { levelUpInfo, dismissLevelUp } = useGamification();

  return (
    <AnimatePresence>
      {levelUpInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          onClick={dismissLevelUp}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs rounded-3xl border border-primary/30 bg-card p-6 text-center overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-highlight/15 blur-3xl pointer-events-none" />

            {/* Close */}
            <button
              onClick={dismissLevelUp}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-card-elevated hover:bg-secondary transition-colors z-10"
            >
              <X size={14} className="text-muted-foreground" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
              className="relative z-10 mx-auto mb-4"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto">
                <Crown size={36} className="text-primary" />
              </div>
              {/* Sparkles around */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles size={14} className="text-highlight absolute -top-1 left-1/2" />
                <Sparkles size={10} className="text-primary absolute top-1/2 -right-2" />
                <Sparkles size={12} className="text-highlight absolute -bottom-1 left-1/4" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                Level Up!
              </p>
              <p className="text-4xl font-black text-primary mb-1">
                Level {levelUpInfo.newLevel}
              </p>

              {levelUpInfo.perk && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 px-4 py-2.5 rounded-xl bg-highlight/10 border border-highlight/20"
                >
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
                    New Perk Unlocked
                  </p>
                  <p className="text-sm font-bold text-highlight">
                    🎁 {levelUpInfo.perk}
                  </p>
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={dismissLevelUp}
                className="mt-5 w-full py-3 rounded-2xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
              >
                Awesome! 🔥
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpModal;
