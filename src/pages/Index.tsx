import { PremiumWalletCard } from "@/components/PremiumWalletCard";
import { PremiumQuickActions } from "@/components/PremiumQuickActions";
import { AdvancedInsights } from "@/components/AdvancedInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good morning, Priya 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your finances today
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PremiumWalletCard 
              balance={245267} 
              availableBalance={232450}
              cardNumber="•••• •••• •••• 4829"
            />
            <PremiumQuickActions />
          </div>

          {/* Right Column - Insights */}
          <div className="lg:col-span-1">
            <AdvancedInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
