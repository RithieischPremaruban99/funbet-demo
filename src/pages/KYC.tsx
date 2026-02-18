import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { Camera, CheckCircle, FileText, Shield, Upload, User } from "lucide-react";

const KYC = () => {
  const [step, setStep] = useState(1);

  return (
    <MobileLayout>
      <section className="px-4 mt-4">
        <h1 className="text-lg font-bold">Vérification KYC</h1>
        <p className="text-xs text-muted-foreground mt-1">Obligation légale - Vérification d'identité</p>

        {/* Progress */}
        <div className="flex items-center gap-1 mt-4">
          {["Identité", "Photo ID", "Selfie"].map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full ${step > i ? "bg-primary" : "bg-border"}`} />
              <span className="text-[9px] text-muted-foreground mt-1 block text-center">{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <User size={16} className="text-primary" />
                Informations personnelles
              </h3>
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Nom complet (tel que sur la pièce d'identité)</label>
                  <input type="text" placeholder="Jean-Pierre Kabongo Mutombo" className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Date de naissance</label>
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Adresse</label>
                  <input type="text" placeholder="Avenue Lumumba 45, Kinshasa" className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Type de pièce d'identité</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-primary">
                    <option>Carte d'identité nationale</option>
                    <option>Passeport</option>
                    <option>Permis de conduire</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Numéro de la pièce d'identité</label>
                  <input type="text" placeholder="ID-XXXXXXXXX" className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                Photo de la pièce d'identité
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">Prenez une photo claire de votre carte d'identité nationale (recto et verso)</p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                {["Recto", "Verso"].map((side) => (
                  <button key={side} className="flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors bg-card-elevated">
                    <Upload size={24} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{side}</span>
                    <span className="text-[9px] text-muted-foreground">Appuyez pour charger</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">
                Retour
              </button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border card-gradient p-4 text-center">
              <h3 className="text-sm font-bold flex items-center justify-center gap-2">
                <Camera size={16} className="text-primary" />
                Selfie de vérification
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">Prenez un selfie en tenant votre pièce d'identité à côté de votre visage</p>
              
              <button className="mt-4 mx-auto flex flex-col items-center gap-2 py-8 px-12 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors bg-card-elevated">
                <Camera size={32} className="text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Prendre un selfie</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium">
                Retour
              </button>
              <button className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange">
                Soumettre
              </button>
            </div>

            <div className="rounded-xl bg-primary/10 border border-primary/20 p-3">
              <div className="flex items-start gap-2">
                <Shield size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-primary font-medium">Vos documents sont sécurisés</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Conformément à la Loi 20/017 et au Code Numérique 23/010 de la RDC</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </MobileLayout>
  );
};

export default KYC;
