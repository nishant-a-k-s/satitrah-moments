import { PremiumsafeboxCard } from "@/components/PremiumsafeboxCard";
import { JupiterStyleQuickActions } from "@/components/JupiterStyleQuickActions";
import { AdvancedInsights } from "@/components/AdvancedInsights";
import { BudgetingTools } from "@/components/BudgetingTools";
import { AIInsights } from "@/components/AIInsights";
import { GamifiedLearning } from "@/components/GamifiedLearning";
import { SpendsToStocks } from "@/components/SpendsToStocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Good morning, Sati 👋
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your Safe digital banking companion for security, stability, and financial growth
          </p>
        </div>

        {/* safebox Card */}
        <div className="mb-8">
          <PremiumsafeboxCard />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
