import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, AlertTriangle, Ban, Clock, Shield, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const ResponsibleGaming = () => {
  const [dailyLimit, setDailyLimit] = useState("50000");
  const [weeklyLimit, setWeeklyLimit] = useState("200000");
  const [monthlyLimit, setMonthlyLimit] = useState("500000");
  const [sessionReminder, setSessionReminder] = useState("60");
  const [showExclusion, setShowExclusion] = useState(false);

  return (
    <MobileLayout>
      <section className="px-4 mt-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Jeu Responsable</h1>
        </div>

        <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 mb-4">
          <p className="text-xs text-primary leading-relaxed">
            Le jeu doit rester un divertissement. Ne pariez que ce que vous pouvez vous permettre de perdre. Si vous pensez avoir un problème de jeu, contactez notre service d'aide.
          </p>
        </div>

        {/* Deposit Limits */}
        <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
            <Wallet size={16} className="text-highlight" />
            Limites de dépôt
          </h3>
          <div className="space-y-3">
            {[
              { label: "Limite quotidienne (CDF)", value: dailyLimit, set: setDailyLimit },
              { label: "Limite hebdomadaire (CDF)", value: weeklyLimit, set: setWeeklyLimit },
              { label: "Limite mensuelle (CDF)", value: monthlyLimit, set: setMonthlyLimit },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">{item.label}</label>
                <input type="number" value={item.value} onChange={(e) => item.set(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary" />
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 rounded-xl orange-gradient text-highlight-foreground font-bold text-xs mt-3 glow-orange">
            Enregistrer les limites
          </button>
        </div>

        {/* Session Timer */}
        <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
            <Clock size={16} className="text-highlight" />
            Rappel de session
          </h3>
          <p className="text-[10px] text-muted-foreground mb-2">Recevez un rappel après une durée de jeu définie</p>
          <div className="flex gap-2">
            {["30", "60", "120", "180"].map((min) => (
              <button
                key={min}
                onClick={() => setSessionReminder(min)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  sessionReminder === min ? "orange-gradient text-highlight-foreground" : "bg-card-elevated border border-border text-muted-foreground"
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>

        {/* Self-Exclusion */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
            <Ban size={16} className="text-destructive" />
            Auto-exclusion
          </h3>
          <p className="text-xs text-muted-foreground mb-3">Suspendez temporairement ou définitivement votre accès aux paris</p>

          {!showExclusion ? (
            <button onClick={() => setShowExclusion(true)} className="w-full py-2.5 rounded-xl border border-destructive/30 text-destructive text-xs font-bold">
              Demander une auto-exclusion
            </button>
          ) : (
            <div className="space-y-2">
              {["24 heures", "7 jours", "30 jours", "6 mois", "Permanent"].map((period) => (
                <button key={period} className="w-full py-2.5 rounded-xl bg-card-elevated border border-border text-xs font-medium hover:border-destructive/40 transition-all text-left px-3">
                  {period}
                </button>
              ))}
              <button onClick={() => setShowExclusion(false)} className="w-full py-2 text-[10px] text-muted-foreground">
                Annuler
              </button>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="rounded-2xl border border-border card-gradient p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-highlight" />
            Besoin d'aide ?
          </h3>
          <p className="text-xs text-muted-foreground mb-3">Si vous ou un proche avez un problème de jeu, contactez-nous :</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card-elevated border border-border">
              <span className="text-xs">📞</span>
              <span className="text-xs font-medium">+243 800 123 456 (gratuit)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card-elevated border border-border">
              <span className="text-xs">✉️</span>
              <span className="text-xs font-medium">aide@trivelta.cd</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">18+ | Jouez avec modération</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default ResponsibleGaming;
