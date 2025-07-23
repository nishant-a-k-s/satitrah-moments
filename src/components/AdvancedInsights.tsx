import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Heart, 
  Shield, 
  Coins,
  ArrowRight,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export const AdvancedInsights = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Spending Analytics */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Spending Analytics</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Today</span>
              <TrendingDown className="text-success" size={16} />
            </div>
            <p className="text-2xl font-bold text-foreground">₹1,247</p>
            <p className="text-xs text-success">18% less than yesterday</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <TrendingUp className="text-destructive" size={16} />
            </div>
            <p className="text-2xl font-bold text-foreground">₹34,562</p>
            <p className="text-xs text-destructive">12% more than last month</p>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Food & Dining</span>
            <span className="text-sm font-medium">₹8,450</span>
          </div>
          <Progress value={65} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Healthcare</span>
            <span className="text-sm font-medium">₹12,300</span>
          </div>
          <Progress value={45} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Shopping</span>
            <span className="text-sm font-medium">₹6,750</span>
          </div>
          <Progress value={30} className="h-2" />
        </div>
      </Card>

      {/* Maternity Savings Goal */}
      <Card className="p-6 bg-gradient-secondary text-secondary-foreground border-0 shadow-elevated">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <Heart size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Maternity Savings Goal</h3>
            <p className="text-sm opacity-90">₹32,000 of ₹50,000 saved</p>
          </div>
          <Sparkles size={16} className="text-accent" />
        </div>
        
        <Progress value={64} className="mb-4 h-3" />
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="opacity-80">Target Date</p>
            <p className="font-semibold">March 2024</p>
          </div>
          <div>
            <p className="opacity-80">Monthly Goal</p>
            <p className="font-semibold">₹3,000</p>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-secondary-foreground border-0">
          <Target size={16} className="mr-2" />
          Boost Savings
        </Button>
      </Card>

      {/* SOS Status */}
      <Card className="p-6 bg-card-elevated border-l-4 border-l-destructive shadow-card">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-destructive" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Emergency Status</h4>
            <p className="text-sm text-muted-foreground">SOS contacts updated</p>
          </div>
          <div className="w-2 h-2 bg-success rounded-full" />
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ 3 Emergency contacts verified</p>
          <p>✓ Medical profile complete</p>
          <p>✓ Location services enabled</p>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-3 border-destructive/20 text-destructive hover:bg-destructive/10">
          <AlertTriangle size={14} className="mr-2" />
          Test SOS System
        </Button>
      </Card>

      {/* Squirrel Lending Stats */}
      <Card className="p-6 bg-gradient-accent text-accent-foreground border-0 shadow-elevated">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-black/10 rounded-lg">
            <Coins size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Squirrel Score</h3>
            <p className="text-sm opacity-80">Top 5% Helper Community</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">847</p>
            <p className="text-xs opacity-80">Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold">₹5.2K</p>
            <p className="text-xs opacity-80">Lent</p>
          </div>
          <div>
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs opacity-80">Helped</p>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-black/10 hover:bg-black/20 text-accent-foreground border-0">
          <Coins size={16} className="mr-2" />
          Lend & Earn
        </Button>
      </Card>
    </div>
  );
};