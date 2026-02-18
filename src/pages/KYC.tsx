import MobileLayout from "@/components/MobileLayout";
import StepTransition from "@/components/StepTransition";
import { useState } from "react";
import { Camera, FileText, Shield, Upload, User } from "lucide-react";
import { motion } from "framer-motion";

const KYC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const goTo = (s: number) => {
    setDirection(s > step ? "forward" : "backward");
    setStep(s);
  };

  return (
    <MobileLayout>
      <motion.section
        className="px-4 mt-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-lg font-bold">Vérification KYC</h1>
        <p className="text-xs text-muted-foreground mt-1">Obligation légale - Vérification d'identité</p>

        {/* Progress */}
        <div className="flex items-center gap-1 mt-4">
          {["Identité", "Photo ID", "Selfie"].map((label, i) => (
            <div key={label} className="flex-1">
              <div className="h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: step > i ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground mt-1 block text-center">{label}</span>
            </div>
          ))}
        </div>

        <StepTransition stepKey={step} direction={direction}>
          {step === 1 && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border card-gradient p-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  Informations personnelles
                </h3>
                <div className="mt-3 space-y-3">
                  {[
                    { label: "Nom complet (tel que sur la pièce d'identité)", type: "text", placeholder: "Jean-Pierre Kabongo Mutombo" },
                    { label: "Date de naissance", type: "date", placeholder: "" },
                    { label: "Adresse", type: "text", placeholder: "Avenue Lumumba 45, Kinshasa" },
                  ].map((field, i) => (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      <label className="text-[10px] font-medium text-muted-foreground mb-1 block">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </motion.div>
                  ))}
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
              <motion.button
                onClick={() => goTo(2)}
                className="w-full py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
                whileTap={{ scale: 0.97 }}
              >
                Continuer
              </motion.button>
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
                  {["Recto", "Verso"].map((side, i) => (
                    <motion.button
                      key={side}
                      className="flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors bg-card-elevated"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Upload size={24} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">{side}</span>
                      <span className="text-[9px] text-muted-foreground">Appuyez pour charger</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => goTo(1)}
                  className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium"
                  whileTap={{ scale: 0.97 }}
                >
                  Retour
                </motion.button>
                <motion.button
                  onClick={() => goTo(3)}
                  className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
                  whileTap={{ scale: 0.97 }}
                >
                  Continuer
                </motion.button>
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

                <motion.button
                  className="mt-4 mx-auto flex flex-col items-center gap-2 py-8 px-12 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors bg-card-elevated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Camera size={32} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Prendre un selfie</span>
                </motion.button>
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => goTo(2)}
                  className="flex-1 py-3 rounded-xl border border-border bg-card-elevated text-sm font-medium"
                  whileTap={{ scale: 0.97 }}
                >
                  Retour
                </motion.button>
                <motion.button
                  className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground font-bold text-sm glow-orange"
                  whileTap={{ scale: 0.97 }}
                >
                  Soumettre
                </motion.button>
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
        </StepTransition>
      </motion.section>
    </MobileLayout>
  );
};

export default KYC;
