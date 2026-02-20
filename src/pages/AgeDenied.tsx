import { XCircle } from "lucide-react";
import scoramaLogo from "@/assets/scorama-logo.png";

const AgeDenied = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center mb-8 opacity-50">
        <img src={scoramaLogo} alt="Scorama" className="w-16 h-16 rounded-xl mb-2" />
        <span className="text-xl font-black text-white">Scorama</span>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-destructive/30 bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30">
          <XCircle size={32} className="text-destructive" />
        </div>

        <h1 className="text-xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You must be at least 18 years old to access this platform.
          If you think you have a gambling problem, contact support at{" "}
          <span className="text-primary font-semibold">+243 800 000 000</span>.
        </p>
      </div>
    </div>
  );
};

export default AgeDenied;
