import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StepTransitionProps {
  children: ReactNode;
  stepKey: number | string;
  direction?: "forward" | "backward";
}

const variants = {
  enter: (direction: string) => ({
    x: direction === "forward" ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === "forward" ? -60 : 60,
    opacity: 0,
  }),
};

const StepTransition = ({ children, stepKey, direction = "forward" }: StepTransitionProps) => (
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={stepKey}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default StepTransition;
