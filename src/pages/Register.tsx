import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, User, Calendar, Shield, CheckCircle } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
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

  return (
    <MobileLayout>
      <section className="px-4 mt-6">
        <h1 className="text-xl font-bold">Créer un compte</h1>
        <p className="text-xs text-muted-foreground mt-1">Inscription en 2 étapes</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s ? "orange-gradient text-highlight-foreground" : "bg-card-elevated border border-border text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">
                {s === 1 ? "Informations" : "Vérification"}
              </span>
              {s < 2 && <div className={`flex-1 h-0.5 rounded ${step > 1 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nom complet</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateForm("fullName", e.target.value)}
                  placeholder="Jean-Pierre Kabongo"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Numéro de téléphone</label>
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
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date de naissance</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => updateForm("dob", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Vous devez avoir au moins 18 ans</p>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  placeholder="Min. 8 caractères"
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
                  J'accepte les <Link to="/terms" className="text-primary">conditions générales</Link> et la <Link to="/privacy" className="text-primary">politique de confidentialité</Link>
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.acceptAge} onChange={(e) => updateForm("acceptAge", e.target.checked)} className="mt-0.5 accent-primary" />
                <span className="text-[11px] text-muted-foreground">Je confirme avoir 18 ans ou plus</span>
              </label>
            </div>

            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4 text-center">
              <Phone size={32} className="mx-auto text-highlight mb-3" />
              <h3 className="text-sm font-bold">Vérification SMS</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Un code à 6 chiffres a été envoyé au <span className="text-foreground font-medium">+243 {form.phone || "XXX XXX XXX"}</span>
              </p>

              <div className="flex gap-2 justify-center mt-4">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-10 h-12 rounded-xl bg-card-elevated border border-border text-center text-lg font-bold text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                  />
                ))}
              </div>

              <button className="text-xs text-primary font-medium mt-4">Renvoyer le code (59s)</button>
            </div>

            <button className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
              Vérifier et créer mon compte
            </button>

            <button onClick={() => setStep(1)} className="w-full py-2 text-xs text-muted-foreground">
              ← Retour
            </button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-4">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-primary font-semibold">Se connecter</Link>
        </p>

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">18+ | Inscription obligatoire - Loi RDC sur les jeux d'argent</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Register;
