import { XCircle } from "lucide-react";

const AgeDenied = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center mb-8 opacity-40">
        <div className="relative flex flex-col items-center">
          <div className="absolute flex items-center justify-center" style={{ inset: "-1.2rem" }}>
            <div className="w-24 h-24 rounded-full border-[1.5px]" style={{ borderColor: "hsl(40, 50%, 45%)" }} />
          </div>
          <span className="text-3xl font-black tracking-[0.15em] uppercase" style={{
            background: "linear-gradient(135deg, hsl(40,60%,58%), hsl(40,40%,40%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>TSOGO</span>
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
