import { PremiumsafeboxCard } from "@/components/PremiumsafeboxCard";
import { JupiterStyleQuickActions } from "@/components/JupiterStyleQuickActions";
import { AdvancedInsights } from "@/components/AdvancedInsights";
import { BudgetingTools } from "@/components/BudgetingTools";
import { AIInsights } from "@/components/AIInsights";
import { GamifiedLearning } from "@/components/GamifiedLearning";
import SpendsToStocks from "@/components/SpendsToStocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { userData } = useAuth();
  const userName = userData?.name || "User";

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">
            Good morning, {userName} 👋
          </h1>
          <p className="text-xs md:text-base text-muted-foreground">
            Your Safe digital banking companion for security, stability, and financial growth
          </p>
        </div>

        {/* safebox Card */}
        <div className="mb-6 md:mb-8">
          <PremiumsafeboxCard />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 md:mb-8 text-xs md:text-sm">
            <TabsTrigger value="home" className="px-2 py-1 md:px-3 md:py-2">Home</TabsTrigger>
            <TabsTrigger value="budget" className="px-2 py-1 md:px-3 md:py-2">Budget</TabsTrigger>
            <TabsTrigger value="insights" className="px-2 py-1 md:px-3 md:py-2">AI Insights</TabsTrigger>
            <TabsTrigger value="learning" className="px-2 py-1 md:px-3 md:py-2">Learning</TabsTrigger>
            <TabsTrigger value="analytics" className="px-2 py-1 md:px-3 md:py-2">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="lg:col-span-2 space-y-4 md:space-y-8">
                <JupiterStyleQuickActions />
                <SpendsToStocks />
              </div>
              <div className="lg:col-span-1">
                <AdvancedInsights />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <BudgetingTools />
          </TabsContent>

          <TabsContent value="insights">
            <AIInsights />
          </TabsContent>

          <TabsContent value="learning">
            <GamifiedLearning />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              <AdvancedInsights />
              <BudgetingTools />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
