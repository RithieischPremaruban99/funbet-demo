import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Info, Shield, Smartphone } from "lucide-react";
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

const Withdrawal = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");

  const numAmount = Number(amount) || 0;
  const balance = 12500;
  const winnings = Math.max(0, numAmount - 0);
  const tax = Math.round(winnings * 0.15);
  const netPayout = numAmount - tax;

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Withdraw</h1>
        </div>

        <div className="rounded-xl border border-border card-gradient p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Available Balance</span>
            <span className="text-sm font-bold text-highlight">R{balance.toLocaleString()}</span>
          </div>
        </div>

        {step === "select" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-highlight" />
                Withdrawal Provider
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedProvider === p.id ? "border-primary card-gradient-warm" : "border-border bg-card-elevated hover:border-highlight/30"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-card-elevated border border-border flex items-center justify-center mx-auto mb-1.5 p-2">
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain rounded" loading="lazy" />
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
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="82 345 6789"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>

                <div className="rounded-2xl border border-border card-gradient p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Withdrawal Amount (ZAR)</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500"
                    className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary text-center" />
                  <p className="text-[9px] text-muted-foreground mt-2">Minimum withdrawal: R100 • Maximum: R100,000</p>
                </div>

                {numAmount > 0 && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <h4 className="text-xs font-bold flex items-center gap-1.5 mb-2">
                      <Info size={14} className="text-primary" />
                      Tax Breakdown (SARS Withholding)
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Requested amount</span>
                        <span className="font-medium">R{numAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Withholding tax (15%)</span>
                        <span className="font-medium text-destructive">-R{tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-border pt-1.5 flex justify-between text-sm">
                        <span className="font-bold">Net amount</span>
                        <span className="font-bold text-highlight">R{netPayout.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

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
              <h3 className="text-sm font-bold mb-3">Confirm Withdrawal</h3>
              <div className="space-y-2">
                {[
                  { label: "Provider", value: providers.find((p) => p.id === selectedProvider)?.name },
                  { label: "Number", value: `+27 ${phone}` },
                  { label: "Gross amount", value: `R${numAmount.toLocaleString()}` },
                  { label: "Tax (15%)", value: `-R${tax.toLocaleString()}`, red: true },
                  { label: "Net amount", value: `R${netPayout.toLocaleString()}`, bold: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className={`text-sm ${(item as any).bold ? "font-bold text-highlight" : (item as any).red ? "font-medium text-destructive" : "font-bold"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep("select")} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">Edit</button>
              <button onClick={() => setStep("success")} className="flex-1 py-3 rounded-xl red-gradient text-primary-foreground font-bold text-sm glow-orange">Confirm</button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center mt-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-lg font-bold">Withdrawal in Progress!</h3>
            <p className="text-xs text-muted-foreground">You will receive R{netPayout.toLocaleString()} on your {providers.find((p) => p.id === selectedProvider)?.name} account</p>
            <p className="text-[10px] text-muted-foreground">Estimated time: 5-30 minutes</p>
            <Link to="/account" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
              Back to Account
            </Link>
          </div>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">15% withholding tax per SARS gambling regulations</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Withdrawal;
