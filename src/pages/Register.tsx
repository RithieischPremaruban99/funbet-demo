import MobileLayout from "@/components/MobileLayout";
import StepTransition from "@/components/StepTransition";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, User, Calendar, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    acceptTerms: false,
    acceptAge: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateForm = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  const goTo = (s: number) => {
    setDirection(s > step ? "forward" : "backward");
    setStep(s);
  };

  return (
    <MobileLayout>
      <motion.section
        className="px-4 mt-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-xl font-bold">Create Account</h1>
        <p className="text-xs text-muted-foreground mt-1">Registration in 2 steps</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <motion.div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s ? "orange-gradient text-highlight-foreground" : "bg-card-elevated border border-border text-muted-foreground"
                }`}
                animate={{ scale: step === s ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </motion.div>
              <span className="text-[10px] font-medium text-muted-foreground">
                {s === 1 ? "Information" : "Verification"}
              </span>
              {s < 2 && (
                <motion.div className="flex-1 h-0.5 rounded bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: step > 1 ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <StepTransition stepKey={step} direction={direction}>
          {step === 1 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+243</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="812 345 678"
                    className="w-full pl-20 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date of Birth</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => updateForm("dob", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">You must be at least 18 years old</p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.acceptTerms} onChange={(e) => updateForm("acceptTerms", e.target.checked)} className="mt-0.5 accent-primary" />
                  <span className="text-[11px] text-muted-foreground">
                    I accept the <Link to="/terms" className="text-primary">terms & conditions</Link> and <Link to="/privacy" className="text-primary">privacy policy</Link>
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.acceptAge} onChange={(e) => updateForm("acceptAge", e.target.checked)} className="mt-0.5 accent-primary" />
                  <span className="text-[11px] text-muted-foreground">I confirm I am 18 years or older</span>
                </label>
              </div>

              <motion.button
                onClick={() => goTo(2)}
                className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
                whileTap={{ scale: 0.97 }}
              >
                Continue
              </motion.button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border card-gradient p-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <Phone size={32} className="mx-auto text-highlight mb-3" />
                </motion.div>
                <h3 className="text-sm font-bold">SMS Verification</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  A 6-digit code has been sent to <span className="text-foreground font-medium">+243 {form.phone || "XXX XXX XXX"}</span>
                </p>

                <div className="flex gap-2 justify-center mt-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-10 h-12 rounded-xl bg-card-elevated border border-border text-center text-lg font-bold text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    />
                  ))}
                </div>

                <button className="text-xs text-primary font-medium mt-4">Resend code (59s)</button>
              </div>

              <motion.button
                className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
                whileTap={{ scale: 0.97 }}
              >
                Verify and Create Account
              </motion.button>

              <button onClick={() => goTo(1)} className="w-full py-2 text-xs text-muted-foreground">
                ← Back
              </button>
            </div>
          )}
        </StepTransition>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">Log In</Link>
        </p>

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">18+ | Registration required - DRC Gambling Law</span>
        </div>
      </motion.section>
    </MobileLayout>
  );
};

export default Register;
