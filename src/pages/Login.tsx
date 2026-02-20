import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MobileLayout>
      <motion.section
        className="px-4 mt-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex flex-col items-center">
            <div className="absolute flex items-center justify-center" style={{ inset: "-1.5rem" }}>
              <div className="w-32 h-32 rounded-full border-[1.5px]" style={{ borderColor: "hsl(40, 55%, 50%)" }} />
            </div>
            <h1 className="text-4xl font-black tracking-[0.15em] uppercase" style={{
              background: "linear-gradient(135deg, hsl(40,60%,62%), hsl(40,40%,45%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>TSOGO</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-6">Access your account</p>
        </div>

        <div className="mt-6 space-y-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+243</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="812 345 678"
                className="w-full pl-20 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.35 }}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          <motion.div className="text-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <button className="text-xs text-primary font-medium">Forgot password?</button>
          </motion.div>

          <motion.button className="w-full py-3 rounded-xl text-sm font-bold orange-gradient text-highlight-foreground glow-orange" whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            Log In
          </motion.button>

          <p className="text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-highlight font-semibold">Create Account</Link>
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ background: "hsla(40,55%,55%,0.06)", borderColor: "hsla(40,55%,55%,0.15)" }}>
          <Shield size={14} style={{ color: "hsl(40, 55%, 55%)" }} className="flex-shrink-0" />
          <span className="text-[10px]" style={{ color: "hsl(40, 55%, 55%)" }}>18+ | Gambling is prohibited for minors</span>
        </div>
      </motion.section>
    </MobileLayout>
  );
};

export default Login;
