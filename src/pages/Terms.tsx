import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { title: "1. Objet", content: "Les présentes conditions générales régissent l'utilisation de la plateforme de paris sportifs en ligne Trivelta, exploitée sous licence délivrée par les autorités compétentes de la République Démocratique du Congo." },
  { title: "2. Conditions d'inscription", content: "L'inscription est réservée aux personnes physiques âgées d'au moins 18 ans, résidant en République Démocratique du Congo. Une vérification d'identité (KYC) est obligatoire conformément à la réglementation en vigueur. Tout joueur doit fournir : nom complet, numéro de téléphone (+243), date de naissance, et une copie de sa pièce d'identité nationale." },
  { title: "3. Dépôts et retraits", content: "Les transactions s'effectuent exclusivement en Franc Congolais (CDF) via Mobile Money (M-Pesa, Airtel Money, Orange Money, Africell Money). Les dépôts sont crédités instantanément. Les retraits sont traités dans un délai de 5 à 30 minutes. Dépôt minimum : 1 000 CDF. Retrait minimum : 5 000 CDF." },
  { title: "4. Fiscalité", content: "Conformément à la Loi de Finances 2025 de la RDC, une taxe de 10% est prélevée sur les gains avant tout versement. Le détail fiscal est affiché lors de chaque retrait." },
  { title: "5. Paris sportifs", content: "Les paris sont proposés en format simple ou combiné. Les cotes sont affichées en format décimal. Les paris sont définitifs après validation. L'opérateur se réserve le droit d'annuler un pari en cas d'erreur manifeste sur les cotes." },
  { title: "6. Jeu responsable", content: "Trivelta s'engage à promouvoir le jeu responsable. Les joueurs peuvent définir des limites de dépôt (quotidiennes, hebdomadaires, mensuelles), demander une auto-exclusion temporaire ou permanente, et contacter le service d'aide aux joueurs." },
  { title: "7. Protection des données", content: "Les données personnelles sont traitées conformément à la Loi 20/017 du 25 novembre 2020 relative aux télécommunications et au Code Numérique 23/010 de 2023 de la RDC. Voir notre politique de confidentialité pour plus de détails." },
  { title: "8. Licence", content: "Trivelta opère sous la licence N°2024/GJ/001 délivrée par l'autorité de régulation des jeux de la République Démocratique du Congo." },
];

const Terms = () => (
  <MobileLayout>
    <section className="px-4 mt-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">Conditions Générales</h1>
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border card-gradient p-4">
            <h3 className="text-sm font-bold mb-2">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
        <Shield size={14} className="text-primary flex-shrink-0" />
        <span className="text-[10px] text-primary">Licence N°2024/GJ/001 | 18+ | Jeu responsable</span>
      </div>
    </section>
  </MobileLayout>
);

export default Terms;
