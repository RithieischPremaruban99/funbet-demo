import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { ArrowLeft, Info, Shield, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";

const mockSelections = [
  { id: 1, match: "TP Mazembe vs AS Vita Club", pick: "TP Mazembe (1)", odds: 1.85, league: "Linafoot" },
  { id: 2, match: "RD Congo vs Zambie", pick: "RD Congo (1)", odds: 1.95, league: "Éliminatoires CAN" },
  { id: 3, match: "DCMP vs FC Lupopo", pick: "Nul (X)", odds: 3.20, league: "Linafoot" },
];

const BetSlip = () => {
  const [selections, setSelections] = useState(mockSelections);
  const [stake, setStake] = useState("5000");
  const [betType, setBetType] = useState<"single" | "combi">("combi");
  const [confirmed, setConfirmed] = useState(false);

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const numStake = Number(stake) || 0;
  const potentialWin = Math.round(numStake * (betType === "combi" ? totalOdds : selections[0]?.odds || 1));
  const tax = Math.round(potentialWin * 0.1);
  const netPayout = potentialWin - tax;

  const removeSelection = (id: number) => setSelections((prev) => prev.filter((s) => s.id !== id));

  if (confirmed) {
    return (
      <MobileLayout>
        <section className="px-4 mt-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <Shield size={32} className="text-success" />
          </div>
          <h2 className="text-lg font-bold">Pari confirmé !</h2>
          <p className="text-xs text-muted-foreground">Votre coupon a été enregistré avec succès</p>
          <div className="rounded-2xl border border-border card-gradient p-4 text-left">
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Type</span><span className="font-bold">{betType === "combi" ? "Combiné" : "Simple"}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Sélections</span><span className="font-bold">{selections.length}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Cote totale</span><span className="font-bold text-highlight">{totalOdds.toFixed(2)}</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Mise</span><span className="font-bold">{numStake.toLocaleString()} CDF</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Gain potentiel</span><span className="font-bold">{potentialWin.toLocaleString()} CDF</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Taxe (10%)</span><span className="font-medium text-destructive">-{tax.toLocaleString()} CDF</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-sm"><span className="font-bold">Net à percevoir</span><span className="font-bold text-highlight">{netPayout.toLocaleString()} CDF</span></div>
            </div>
          </div>
          <Link to="/sports" className="block w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
            Continuer à parier
          </Link>
          <Link to="/" className="block w-full py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium text-center">
            Retour à l'accueil
          </Link>
        </section>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/sports" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Coupon de paris</h1>
          <span className="ml-auto text-xs text-muted-foreground">{selections.length} sélection(s)</span>
        </div>

        {/* Bet Type Toggle */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "single" as const, label: "Simple" },
            { key: "combi" as const, label: "Combiné" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setBetType(t.key)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                betType === t.key ? "orange-gradient text-highlight-foreground glow-orange" : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Selections */}
        <div className="space-y-2 mb-4">
          {selections.map((s) => (
            <div key={s.id} className="rounded-xl border border-border card-gradient p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground">{s.league}</p>
                <p className="text-xs font-medium mt-0.5">{s.match}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-primary">{s.pick}</span>
                  <span className="text-xs font-bold text-highlight">@ {s.odds.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeSelection(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                <X size={14} className="text-destructive" />
              </button>
            </div>
          ))}
        </div>

        {selections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">Aucune sélection</p>
            <Link to="/sports" className="text-xs text-primary font-semibold mt-2 block">Parcourir les matchs →</Link>
          </div>
        ) : (
          <>
            {/* Stake */}
            <div className="rounded-2xl border border-border card-gradient p-4 mb-4">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Mise (CDF)</label>
              <input type="number" value={stake} onChange={(e) => setStake(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card-elevated border border-border text-lg font-bold text-foreground outline-none focus:ring-1 focus:ring-primary text-center" />
              <div className="flex gap-2 mt-2">
                {[1000, 5000, 10000, 25000].map((a) => (
                  <button key={a} onClick={() => setStake(String(a))} className="flex-1 py-1.5 rounded-lg bg-card-elevated border border-border text-[10px] font-bold hover:border-highlight/40 transition-all">
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground mt-2">Mise minimum : 500 CDF • Maximum : 200 000 CDF</p>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 mb-4">
              <h4 className="text-xs font-bold flex items-center gap-1.5 mb-2">
                <Info size={14} className="text-primary" />
                Récapitulatif
              </h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Cote totale</span><span className="font-bold text-highlight">{totalOdds.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Mise</span><span className="font-medium">{numStake.toLocaleString()} CDF</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Gain potentiel</span><span className="font-medium">{potentialWin.toLocaleString()} CDF</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Taxe sur gain (10%)</span><span className="font-medium text-destructive">-{tax.toLocaleString()} CDF</span></div>
                <div className="border-t border-border pt-1.5 flex justify-between text-sm"><span className="font-bold">Net à percevoir</span><span className="font-bold text-highlight">{netPayout.toLocaleString()} CDF</span></div>
              </div>
            </div>

            <button onClick={() => setConfirmed(true)} className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange mb-4">
              Placer le pari — {numStake.toLocaleString()} CDF
            </button>

            <button onClick={() => setSelections([])} className="w-full py-2 flex items-center justify-center gap-1.5 text-xs text-destructive">
              <Trash2 size={12} />
              Vider le coupon
            </button>
          </>
        )}

        <div className="mt-6 mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield size={14} className="text-primary flex-shrink-0" />
          <span className="text-[10px] text-primary">18+ | Jouez responsablement</span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default BetSlip;
