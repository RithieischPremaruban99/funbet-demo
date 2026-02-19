import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { title: "1. Purpose", content: "These general terms and conditions govern the use of the Trivelta online sports betting platform, operated under a license issued by the competent authorities of the Democratic Republic of Congo." },
  { title: "2. Registration Requirements", content: "Registration is reserved for individuals aged at least 18 years, residing in the Democratic Republic of Congo. Identity verification (KYC) is mandatory in accordance with current regulations. Every player must provide: full name, phone number (+243), date of birth, and a copy of their national identity document." },
  { title: "3. Deposits & Withdrawals", content: "Transactions are conducted exclusively in Congolese Franc (CDF) via Mobile Money (M-Pesa, Airtel Money, Orange Money, Africell Money). Deposits are credited instantly. Withdrawals are processed within 5 to 30 minutes. Minimum deposit: 1,000 CDF. Minimum withdrawal: 5,000 CDF." },
  { title: "4. Taxation", content: "In accordance with the DRC Finance Law 2025, a 10% tax is levied on winnings before any payout. Tax details are displayed at each withdrawal." },
  { title: "5. Sports Betting", content: "Bets are offered in single or accumulator format. Odds are displayed in decimal format. Bets are final after validation. The operator reserves the right to cancel a bet in case of an obvious error in odds." },
  { title: "6. Responsible Gaming", content: "Trivelta is committed to promoting responsible gaming. Players can set deposit limits (daily, weekly, monthly), request temporary or permanent self-exclusion, and contact the player support service." },
  { title: "7. Data Protection", content: "Personal data is processed in accordance with Law 20/017 of November 25, 2020 on telecommunications and the Digital Code 23/010 of 2023 of the DRC. See our privacy policy for more details." },
  { title: "8. License", content: "Trivelta operates under License N°2024/GJ/001 issued by the gaming regulatory authority of the Democratic Republic of Congo." },
];

const Terms = () => (
  <MobileLayout>
    <section className="px-4 mt-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">Terms & Conditions</h1>
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
        <span className="text-[10px] text-primary">License N°2024/GJ/001 | 18+ | Responsible Gaming</span>
      </div>
    </section>
  </MobileLayout>
);

export default Terms;
