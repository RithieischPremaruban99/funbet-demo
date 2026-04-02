import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import capitecLogo from "@/assets/payments/capitec.png";
import fnbLogo from "@/assets/payments/fnb.png";
import vodapayLogo from "@/assets/payments/vodapay.png";
import ozowLogo from "@/assets/payments/ozow.png";
import snapscanLogo from "@/assets/payments/snapscan.png";
import standardbankLogo from "@/assets/payments/standardbank.png";

const providers = [
  { id: "capitec", name: "Capitec Pay", logo: capitecLogo, prefix: "Bank Transfer" },
  { id: "fnb", name: "FNB eWallet", logo: fnbLogo, prefix: "eWallet" },
  { id: "vodapay", name: "VodaPay", logo: vodapayLogo, prefix: "Mobile Wallet" },
  { id: "ozow", name: "Ozow (EFT)", logo: ozowLogo, prefix: "Instant EFT" },
  { id: "snapscan", name: "SnapScan", logo: snapscanLogo, prefix: "QR Payment" },
  { id: "standardbank", name: "Standard Bank", logo: standardbankLogo, prefix: "Bank Transfer" },
];

const quickAmounts = [50, 100, 500, 1000, 5000];

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
          <h1 className="text-lg font-bold">Deposit</h1>
        </div>

        {step === "select" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-highlight" />
                Choose Provider
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedProvider === p.id
                        ? "border-primary card-gradient-warm"
                        : "border-border bg-card-elevated hover:border-highlight/30"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center mx-auto mb-1.5 p-1">
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <p className="text-[10px] font-bold leading-tight">{p.name}</p>
                    <p className="text-[8px] text-muted-foreground">{p.prefix}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedProvider && (
              <>
                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Phone / Account Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+27</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="82 345 6789"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Amount (ZAR)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1,000"
                    className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary text-center"
                  />
                  <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                    {quickAmounts.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAmount(String(a))}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-card-elevated border border-border text-[10px] font-bold hover:border-highlight/40 transition-all"
                      >
                        R{a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-2">Minimum deposit: R50 • Maximum: R50,000</p>
                </div>

                <button onClick={() => setStep("confirm")} className="w-full py-3 rounded-xl red-gradient text-primary-foreground font-bold text-sm glow-orange">
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold mb-3">Confirm Deposit</h3>
              <div className="space-y-2">
                {[
                  { label: "Provider", value: providers.find((p) => p.id === selectedProvider)?.name },
                  { label: "Number", value: `+27 ${phone}` },
                  { label: "Amount", value: `R${Number(amount).toLocaleString()}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-primary/10 border border-primary/20 p-3">
              <p className="text-[10px] text-primary">You will receive a notification to confirm the payment.</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep("select")} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">
                Edit
              </button>
              <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl red-gradient text-primary-foreground font-bold text-sm glow-orange">
                Confirm
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center mt-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-bold">Deposit Initiated!</h3>
            <p className="text-xs text-muted-foreground">Confirm the payment via {providers.find((p) => p.id === selectedProvider)?.name}</p>
            <p className="text-lg font-bold text-highlight">R{Number(amount).toLocaleString()}</p>
            <Link to="/account" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
              Back to Account
            </Link>
          </div>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">Secure and encrypted transactions</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Deposit;
