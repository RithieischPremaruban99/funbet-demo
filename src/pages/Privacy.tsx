import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { title: "1. Introduction", content: "Scorama is committed to protecting the privacy of its users. This policy describes how we collect, use and protect your personal data, in accordance with Law 20/017 of November 25, 2020 on telecommunications and information and communication technologies, and the Digital Code 23/010 of 2023 of the Democratic Republic of Congo." },
  { title: "2. Data Collected", content: "We collect: full name, phone number (+243), date of birth, address, identity document (national card, passport or driver's license), transaction and betting history. This data is necessary for mandatory KYC verification and the provision of our services." },
  { title: "3. Use of Data", content: "Your data is used to: verify your identity (KYC), manage your account and transactions, comply with legal and regulatory obligations, prevent fraud and money laundering, inform you of promotions (with your consent)." },
  { title: "4. Data Sharing", content: "Your data may be shared with: DRC gaming regulatory authorities (legal obligation), Mobile Money operators for payment processing, judicial authorities upon legal request. We never sell your data to third parties." },
  { title: "5. Security", content: "We implement technical and organizational security measures to protect your data: encryption of data in transit and at rest, restricted access to personal data, continuous system monitoring." },
  { title: "6. Your Rights", content: "In accordance with Digital Code 23/010, you have the following rights: right of access to your data, right of rectification, right to erasure (within legal limits), right to object to processing for marketing purposes. To exercise your rights, contact us at privacy@scorama.com." },
  { title: "7. Retention", content: "Your data is retained for the duration of your active account, plus 5 years after closure in accordance with DRC legal obligations regarding anti-money laundering." },
];

const Privacy = () => (
  <MobileLayout>
    <section className="px-4 mt-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft size={18} className="text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">Privacy Policy</h1>
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
        <span className="text-[10px] text-primary">Law 20/017 (2020) | Digital Code 23/010 (2023)</span>
      </div>
    </section>
  </MobileLayout>
);

export default Privacy;
