import MobileLayout from "@/components/MobileLayout";
import { ArrowDown, ArrowLeft, ArrowUp, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const mockTransactions = [
  { id: 1, type: "deposit", provider: "M-Pesa", amount: 50000, date: "18 fév. 14:32", status: "success" },
  { id: 2, type: "bet", provider: "Pari - TP Mazembe vs Vita", amount: -10000, date: "18 fév. 14:45", status: "pending" },
  { id: 3, type: "withdrawal", provider: "Airtel Money", amount: -30000, tax: 3000, netAmount: -27000, date: "17 fév. 10:15", status: "success" },
  { id: 4, type: "win", provider: "Gain - Linafoot Combi", amount: 45000, date: "16 fév. 21:00", status: "success" },
  { id: 5, type: "deposit", provider: "Orange Money", amount: 25000, date: "15 fév. 09:30", status: "success" },
  { id: 6, type: "withdrawal", provider: "M-Pesa", amount: -20000, tax: 2000, netAmount: -18000, date: "14 fév. 16:45", status: "success" },
  { id: 7, type: "bet", provider: "Pari - RDC vs Zambie", amount: -5000, date: "14 fév. 12:00", status: "lost" },
];

const typeLabels: Record<string, string> = { deposit: "Dépôt", withdrawal: "Retrait", bet: "Pari", win: "Gain" };
const statusLabels: Record<string, { label: string; color: string }> = {
  success: { label: "Réussi", color: "text-success" },
  pending: { label: "En cours", color: "text-highlight" },
  lost: { label: "Perdu", color: "text-destructive" },
};

const Transactions = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockTransactions : mockTransactions.filter((t) => t.type === filter);

  return (
    <MobileLayout>
      <section className="px-4 mt-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/account" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft size={18} className="text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold">Historique</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
          {[
            { key: "all", label: "Tout" },
            { key: "deposit", label: "Dépôts" },
            { key: "withdrawal", label: "Retraits" },
            { key: "bet", label: "Paris" },
            { key: "win", label: "Gains" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === f.key ? "orange-gradient text-highlight-foreground glow-orange" : "bg-card border border-border text-secondary-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          {filtered.map((tx) => {
            const isPositive = tx.amount > 0;
            const st = statusLabels[tx.status];
            return (
              <div key={tx.id} className="rounded-xl border border-border card-gradient p-3 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isPositive ? "bg-success/10" : "bg-destructive/10"}`}>
                  {isPositive ? <ArrowDown size={16} className="text-success" /> : <ArrowUp size={16} className="text-destructive" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold truncate">{tx.provider}</p>
                    <span className={`text-xs font-bold ${isPositive ? "text-success" : "text-foreground"}`}>
                      {isPositive ? "+" : ""}{tx.amount.toLocaleString()} CDF
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                    <span className={`text-[10px] font-medium ${st.color}`}>{st.label}</span>
                  </div>
                  {tx.type === "withdrawal" && tx.tax && (
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Taxe 10% : -{tx.tax.toLocaleString()} CDF | Net : {Math.abs(tx.netAmount || 0).toLocaleString()} CDF
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Transactions;
