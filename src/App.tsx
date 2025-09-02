import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import { GetStartedScreen } from "@/components/GetStartedScreen";
import { SimpleAuthProvider, useSimpleAuth } from "@/hooks/useSimpleAuth";
import { MobileAuthPage } from "@/components/MobileAuthPage";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNavigation } from "@/components/BottomNavigation";
import Index from "./pages/Index";
import SOS from "./pages/SOS";
import Transfers from "./pages/Transfers";
import Profile from "./pages/Profile";
import Safebox from "./pages/Safebox";
import Ivy from "./pages/Ivy";
import PayBills from "./pages/PayBills";
import Statements from "./pages/Statements";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import Investments from "./pages/Investments";
import SquirrelLending from "./pages/SquirrelLending";
import SpendsToStocks from "./pages/SpendsToStocks";
import Maternity from "./pages/Maternity";
import NotFound from "./pages/NotFound";
import AddMoney from "./pages/AddMoney";
import SendMoney from "./pages/SendMoney";
import QRScanner from "./pages/QRScanner";
import RequestMoney from "./pages/RequestMoney";
import Recharge from "./pages/Recharge";
import Settings from "./pages/Settings";
import Rewards from "./pages/Rewards";
import SplitBills from "./pages/SplitBills";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import LogoutScreen from "./pages/LogoutScreen";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user, loading } = useSimpleAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Setting up your Lifelin3 experience</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <MobileAuthPage onSuccess={() => window.location.reload()} />;
  }

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 flex flex-col pb-16 md:pb-0">
            {/* Global Header with Sidebar Trigger */}
            <header className="h-14 flex items-center border-b border-border bg-card px-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex-1">
          <h1 className="text-sm font-medium text-muted-foreground">
            Lifelin3 Dashboard
          </h1>
              </div>
              <ThemeToggle />
            </header>
            
            {/* Page Content */}
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/Safebox" element={<Safebox />} />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/bills" element={<PayBills />} />
                <Route path="/statements" element={<Statements />} />
                <Route path="/sos" element={<SOS />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="/Ivy" element={<Ivy />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/lending" element={<SquirrelLending />} />
                <Route path="/maternity" element={<Maternity />} />
                <Route path="/add-money" element={<AddMoney />} />
                <Route path="/send-money" element={<SendMoney />} />
                <Route path="/qr-scanner" element={<QRScanner />} />
                <Route path="/request-money" element={<RequestMoney />} />
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/split-bills" element={<SplitBills />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/spends-to-stocks" element={<SpendsToStocks />} />
                <Route path="/logout" element={<LogoutScreen />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          
          {/* Mobile Bottom Navigation */}
          <div className="md:hidden">
            <BottomNavigation />
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("getStarted"); // "getStarted", "main"

  if (currentScreen === "getStarted") {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="lifelin3-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GetStartedScreen onGetStarted={() => setCurrentScreen("main")} />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="lifelin3-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SimpleAuthProvider>
            <AuthenticatedApp />
          </SimpleAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
