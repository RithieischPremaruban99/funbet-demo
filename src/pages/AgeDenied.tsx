import { XCircle } from "lucide-react";

const AgeDenied = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center mb-8 opacity-50">
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-4 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border-2" style={{ borderColor: "hsl(43, 55%, 52%)" }} />
          </div>
          <span className="text-3xl font-black italic tracking-tight leading-none">
            <span style={{ color: "hsl(220, 10%, 55%)" }}>bingo</span>
            <span style={{ color: "hsl(43, 55%, 52%)" }}>bets</span>
          </span>
        </div>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-destructive/30 bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30">
          <XCircle size={32} className="text-destructive" />
        </div>

        <h1 className="text-xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You must be at least 18 years old to access this platform.
          If you think you have a gambling problem, contact support at{" "}
          <span className="text-primary font-semibold">+233 800 000 000</span>.
        </p>
      </div>
    </div>
  );
};

export default AgeDenied;
