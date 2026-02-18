import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { title: "1. Introduction", content: "Partouche RDC s'engage à protéger la vie privée de ses utilisateurs. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles, conformément à la Loi 20/017 du 25 novembre 2020 relative aux télécommunications et technologies de l'information et de la communication, et au Code Numérique 23/010 de 2023 de la République Démocratique du Congo." },
  { title: "2. Données collectées", content: "Nous collectons : nom complet, numéro de téléphone (+243), date de naissance, adresse, pièce d'identité (carte nationale, passeport ou permis de conduire), historique des transactions et des paris. Ces données sont nécessaires pour la vérification KYC obligatoire et la fourniture de nos services." },
  { title: "3. Utilisation des données", content: "Vos données sont utilisées pour : vérifier votre identité (KYC), gérer votre compte et vos transactions, respecter les obligations légales et réglementaires, prévenir la fraude et le blanchiment d'argent, vous informer des promotions (avec votre consentement)." },
  { title: "4. Partage des données", content: "Vos données peuvent être partagées avec : les autorités de régulation des jeux de la RDC (obligation légale), les opérateurs Mobile Money pour le traitement des paiements, les autorités judiciaires sur réquisition légale. Nous ne vendons jamais vos données à des tiers." },
  { title: "5. Sécurité", content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données : chiffrement des données en transit et au repos, accès restreint aux données personnelles, surveillance continue des systèmes." },
  { title: "6. Vos droits", content: "Conformément au Code Numérique 23/010, vous disposez des droits suivants : droit d'accès à vos données, droit de rectification, droit à l'effacement (dans les limites légales), droit d'opposition au traitement à des fins marketing. Pour exercer vos droits, contactez-nous à privacy@partouche-rdc.cd." },
  { title: "7. Conservation", content: "Vos données sont conservées pendant la durée de votre compte actif, plus 5 ans après la clôture conformément aux obligations légales de la RDC en matière de lutte contre le blanchiment d'argent." },
];

const Privacy = () => (
  <MobileLayout>
    <section className="px-4 mt-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">Politique de Confidentialité</h1>
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
        <span className="text-[10px] text-primary">Loi 20/017 (2020) | Code Numérique 23/010 (2023)</span>
      </div>
    </section>
  </MobileLayout>
);

export default Privacy;
