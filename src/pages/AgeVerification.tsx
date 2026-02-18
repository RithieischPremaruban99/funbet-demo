import { useNavigate } from "react-router-dom";
import { Shield, XCircle } from "lucide-react";
import partoucheLogo from "@/assets/partouche-logo.png";

const AgeVerification = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    sessionStorage.setItem("age_verified", "true");
    navigate("/home");
  };

  const handleDeny = () => {
    navigate("/age-denied");
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      {/* Logo */}
      <img
        src={partoucheLogo}
        alt="Groupe Partouche"
        className="w-40 h-auto mb-8 animate-fade-in"
      />

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
          <Shield size={32} className="text-primary" />
        </div>

        <h1 className="text-xl font-bold mb-2">Vérification d'âge</h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Conformément à la législation de la RDC, les jeux d'argent sont
          strictement réservés aux personnes âgées de{" "}
          <span className="text-primary font-bold">18 ans et plus</span>.
        </p>

        <p className="text-sm font-semibold mb-6">
          Avez-vous 18 ans ou plus ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDeny}
            className="flex-1 py-3 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-colors"
          >
            Non
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl orange-gradient text-highlight-foreground text-sm font-bold glow-orange transition-all"
          >
            Oui, j'ai 18+
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 text-center">
        <p className="text-muted-foreground/50 text-xs">
          Licence N°2024/GJ/001 — RDC
        </p>
        <p className="text-muted-foreground/50 text-xs mt-1">
          🔞 Jeu responsable | jouez avec modération
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;
