import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Index />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/promotions" element={<Promotions />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
