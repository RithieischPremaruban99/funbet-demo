import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import partoucheLogo from "@/assets/partouche-logo.png";

const Splash = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timer = setTimeout(() => {
      navigate("/home");
    }, 3500);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center red-gradient">
      {/* Logo */}
      <div className="animate-fade-in mb-8">
        <img
          src={partoucheLogo}
          alt="Groupe Partouche"
          className="w-48 h-auto brightness-0 invert"
        />
      </div>

      {/* Spinner */}
      <div className="mb-6">
        <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      </div>

      {/* Status text */}
      <p className="text-primary-foreground/80 text-sm text-center px-8 animate-fade-in">
        Vérification de votre emplacement{dots}
      </p>

      {/* Footer branding */}
      <div className="absolute bottom-12 text-center">
        <p className="text-primary-foreground/40 text-xs">
          Licence N°2024/GJ/001 — RDC
        </p>
        <p className="text-primary-foreground/40 text-xs mt-1">
          🔞 Réservé aux personnes de 18 ans et plus
        </p>
      </div>
    </div>
  );
};

export default Splash;
