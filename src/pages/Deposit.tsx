import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Phone, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const providers = [
  { id: "mpesa", name: "M-Pesa", color: "bg-green-600", prefix: "081/082" },
  { id: "airtel", name: "Airtel Money", color: "bg-red-600", prefix: "099/097" },
  { id: "orange", name: "Orange Money", color: "bg-orange-500", prefix: "084/085" },
  { id: "africell", name: "Africell Money", color: "bg-blue-600", prefix: "090/091" },
];

const quickAmounts = [5000, 10000, 20000, 50000, 100000];

const Deposit = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");

  const handleConfirm = () => setStep("success");

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Déposer</h1>
        </div>

        {step === "select" && (
          <div className="space-y-4">
            {/* Provider Selection */}
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-highlight" />
                Choisir le fournisseur
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedProvider === p.id
                        ? "border-primary card-gradient-warm"
                        : "border-border bg-card-elevated hover:border-highlight/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center mb-2`}>
                      <Phone size={14} className="text-white" />
                    </div>
                    <p className="text-xs font-bold">{p.name}</p>
                    <p className="text-[9px] text-muted-foreground">{p.prefix}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedProvider && (
              <>
                {/* Phone Number */}
                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Numéro Mobile Money</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+243</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="812 345 678"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Montant (CDF)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10 000"
                    className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary text-center"
                  />
                  <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                    {quickAmounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAmount(String(a))}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-card-elevated border border-border text-[10px] font-bold hover:border-highlight/40 transition-all"
                      >
                        {a.toLocaleString()} CDF
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-2">Dépôt minimum : 1 000 CDF • Maximum : 500 000 CDF</p>
                </div>

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
              <h3 className="text-sm font-bold mb-3">Confirmer le dépôt</h3>
              <div className="space-y-2">
                {[
                  { label: "Fournisseur", value: providers.find((p) => p.id === selectedProvider)?.name },
                  { label: "Numéro", value: `+243 ${phone}` },
                  { label: "Montant", value: `${Number(amount).toLocaleString()} CDF` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-primary/10 border border-primary/20 p-3">
              <p className="text-[10px] text-primary">Vous recevrez une notification de votre opérateur pour confirmer le paiement.</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep("select")} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">
                Modifier
              </button>
              <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
                Confirmer
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center mt-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-bold">Dépôt initié !</h3>
            <p className="text-xs text-muted-foreground">Confirmez le paiement sur votre téléphone via {providers.find((p) => p.id === selectedProvider)?.name}</p>
            <p className="text-lg font-bold text-highlight">{Number(amount).toLocaleString()} CDF</p>
            <Link to="/account" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
              Retour au compte
            </Link>
          </div>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">Transactions sécurisées et cryptées</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Deposit;
