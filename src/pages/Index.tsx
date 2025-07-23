import { Header } from "@/components/Header";
import { WalletCard } from "@/components/WalletCard";
import { QuickActions } from "@/components/QuickActions";
import { SquirrelInsights } from "@/components/SquirrelInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 pb-6 space-y-6">
        {/* Main Wallet Card */}
        <WalletCard balance={45267.80} />
        
        {/* Quick Actions Grid */}
        <QuickActions />
        
        {/* Insights & Goals */}
        <SquirrelInsights />
      </div>
    </div>
  );
};

export default Index;
