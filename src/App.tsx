import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BetSlipProvider } from "@/contexts/BetSlipContext";
import { FollowProvider } from "@/contexts/FollowContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { BrandThemeProvider } from "@/contexts/BrandThemeContext";
import LevelUpModal from "@/components/LevelUpModal";
import BrandThemingPanel from "@/components/BrandThemingPanel";
import { AnimatePresence } from "framer-motion";
import Splash from "./pages/Splash";
import AgeVerification from "./pages/AgeVerification";
import AgeDenied from "./pages/AgeDenied";
import Index from "./pages/Index";
import Sports from "./pages/Sports";
import Casino from "./pages/Casino";
import Promotions from "./pages/Promotions";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KYC from "./pages/KYC";
import Deposit from "./pages/Deposit";
import Withdrawal from "./pages/Withdrawal";
import BetSlip from "./pages/BetSlip";
import Transactions from "./pages/Transactions";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Social from "./pages/Social";
import Challenge from "./pages/Challenge";
import UserProfile from "./pages/UserProfile";
import Rewards from "./pages/Rewards";
import BetHistory from "./pages/BetHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/age-check" element={<AgeVerification />} />
        <Route path="/age-denied" element={<AgeDenied />} />
        <Route path="/home" element={<Index />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/social" element={<Social />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/betslip" element={<BetSlip />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/bet-history" element={<BetHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BetSlipProvider>
      <FollowProvider>
      <GamificationProvider>
      <BrandThemeProvider>
      <Toaster />
      <Sonner />
      <LevelUpModal />
      <BrandThemingPanel />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      </BrandThemeProvider>
      </GamificationProvider>
      </FollowProvider>
      </BetSlipProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
