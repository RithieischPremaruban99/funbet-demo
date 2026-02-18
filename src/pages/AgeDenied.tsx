import { XCircle } from "lucide-react";
import partoucheLogo from "@/assets/partouche-logo.png";

const AgeDenied = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <img
        src={partoucheLogo}
        alt="Groupe Partouche"
        className="w-36 h-auto mb-8 opacity-50"
      />

      <div className="w-full max-w-sm rounded-2xl border border-destructive/30 bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30">
          <XCircle size={32} className="text-destructive" />
        </div>

        <h1 className="text-xl font-bold mb-2">Accès refusé</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vous devez avoir au moins 18 ans pour accéder à cette plateforme.
          Si vous pensez avoir un problème de jeu, contactez l'aide au{" "}
          <span className="text-primary font-semibold">+243 800 000 000</span>.
        </p>
      </div>
    </div>
  );
};

export default AgeDenied;
