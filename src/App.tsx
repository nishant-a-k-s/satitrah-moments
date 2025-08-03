import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthWrapper } from "@/components/AuthWrapper";
import { GetStartedScreen } from "@/components/GetStartedScreen";
import { LoginPage } from "@/components/LoginPage";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNavigation } from "@/components/BottomNavigation";
import Index from "./pages/Index";
import SOS from "./pages/SOS";
import Transfers from "./pages/Transfers";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import PayBills from "./pages/PayBills";
import Statements from "./pages/Statements";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import SatiSafe from "./pages/SatiSafe";
import Investments from "./pages/Investments";
import SquirrelLending from "./pages/SquirrelLending";
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
import { SpendsToStocks } from "./pages/SpendsToStocks";
import { supabase } from "@/integrations/supabase/client"; // ✅ IMPORT this

const queryClient = new QueryClient();

const App = () => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Detect Supabase session and auth state changes
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setIsLoggedIn(true);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleGetStarted = () => {
    setShowGetStarted(false);
  };

  // ✅ If not logged in
  if (!isLoggedIn) {
    if (showGetStarted) {
      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <GetStartedScreen onGetStarted={handleGetStarted} />
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  }

  // ✅ If logged in — full app
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthWrapper>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <main className="flex-1 flex flex-col pb-16 md:pb-0">
                    <header className="h-14 flex items-center border-b border-border bg-card px-4">
                      <SidebarTrigger className="mr-4" />
                      <div className="flex-1">
                        <h1 className="text-sm font-medium text-muted-foreground">
                          Dashboard
                        </h1>
                      </div>
                      <ThemeToggle />
                    </header>

                    <div className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/transfers" element={<Transfers />} />
                        <Route path="/bills" element={<PayBills />} />
                        <Route path="/statements" element={<Statements />} />
                        <Route path="/sos" element={<SOS />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/help" element={<HelpSupport />} />
                        <Route path="/satisafe" element={<SatiSafe />} />
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
                        <Route path="/spends-to-stocks" element={<SpendsToStocks />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>

                  <div className="md:hidden">
                    <BottomNavigation />
                  </div>
                </div>
              </SidebarProvider>
            </AuthWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
