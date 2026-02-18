import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Info, Phone, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import mpesaLogo from "@/assets/mpesa.svg";
import airtelLogo from "@/assets/airtel.svg";
import orangeLogo from "@/assets/orange.svg";
import africellLogo from "@/assets/africell.png";

const providers = [
  { id: "mpesa", name: "M-Pesa", logo: mpesaLogo, prefix: "081/082" },
  { id: "airtel", name: "Airtel Money", logo: airtelLogo, prefix: "099/097" },
  { id: "orange", name: "Orange Money", logo: orangeLogo, prefix: "084/085" },
  { id: "africell", name: "Africell Money", logo: africellLogo, prefix: "090/091" },
];

const Withdrawal = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");

  const numAmount = Number(amount) || 0;
  const balance = 125000;
  const winnings = Math.max(0, numAmount - 0);
  const tax = Math.round(winnings * 0.1);
  const netPayout = numAmount - tax;

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Retirer</h1>
        </div>

        {/* Balance */}
        <div className="rounded-xl border border-border card-gradient p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Solde disponible</span>
            <span className="text-sm font-bold text-highlight">{balance.toLocaleString()} CDF</span>
          </div>
        </div>

        {step === "select" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-highlight" />
                Fournisseur de retrait
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedProvider === p.id ? "border-primary card-gradient-warm" : "border-border bg-card-elevated hover:border-highlight/30"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center mb-2 p-1.5">
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs font-bold">{p.name}</p>
                    <p className="text-[9px] text-muted-foreground">{p.prefix}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedProvider && (
              <>
                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Numéro Mobile Money</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+243</span>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="812 345 678"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>

                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Montant à retirer (CDF)</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50 000"
                    className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary text-center" />
                  <p className="text-[9px] text-muted-foreground mt-2">Retrait minimum : 5 000 CDF • Maximum : 1 000 000 CDF</p>
                </div>

                {/* Tax Breakdown */}
                {numAmount > 0 && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <h4 className="text-xs font-bold flex items-center gap-1.5 mb-2">
                      <Info size={14} className="text-primary" />
                      Détail fiscal (Loi de Finances 2025)
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Montant demandé</span>
                        <span className="font-medium">{numAmount.toLocaleString()} CDF</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Taxe sur gains (10%)</span>
                        <span className="font-medium text-destructive">-{tax.toLocaleString()} CDF</span>
                      </div>
                      <div className="border-t border-border pt-1.5 flex justify-between text-sm">
                        <span className="font-bold">Montant net</span>
                        <span className="font-bold text-highlight">{netPayout.toLocaleString()} CDF</span>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => setStep("confirm")} className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
                  Continuer
                </button>
              </>
            )}
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold mb-3">Confirmer le retrait</h3>
              <div className="space-y-2">
                {[
                  { label: "Fournisseur", value: providers.find((p) => p.id === selectedProvider)?.name },
                  { label: "Numéro", value: `+243 ${phone}` },
                  { label: "Montant brut", value: `${numAmount.toLocaleString()} CDF` },
                  { label: "Taxe (10%)", value: `-${tax.toLocaleString()} CDF`, red: true },
                  { label: "Montant net", value: `${netPayout.toLocaleString()} CDF`, bold: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className={`text-sm ${item.bold ? "font-bold text-highlight" : item.red ? "font-medium text-destructive" : "font-bold"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep("select")} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">Modifier</button>
              <button onClick={() => setStep("success")} className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">Confirmer</button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center mt-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-bold">Retrait en cours !</h3>
            <p className="text-xs text-muted-foreground">Vous recevrez {netPayout.toLocaleString()} CDF sur votre compte {providers.find((p) => p.id === selectedProvider)?.name}</p>
            <p className="text-[10px] text-muted-foreground">Délai estimé : 5-30 minutes</p>
            <Link to="/account" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
              Retour au compte
            </Link>
          </div>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">Taxe de 10% prélevée conformément à la Loi de Finances 2025 RDC</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Withdrawal;
