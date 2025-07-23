import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const SquirrelInsights = () => {
  const savingsGoal = 50000;
  const currentSavings = 32000;
  const progressPercentage = (currentSavings / savingsGoal) * 100;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Daily Spend Summary */}
      <Card className="p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-card-foreground">Today's Spending</h4>
            <p className="text-2xl font-bold text-destructive">₹1,247</p>
          </div>
          <div className="flex flex-col items-end">
            <TrendingDown className="text-success" size={20} />
            <span className="text-xs text-success">12% less than yesterday</span>
          </div>
        </div>
      </Card>

      {/* Savings Goal */}
      <Card className="p-4 shadow-card">
        <div className="flex items-center gap-3 mb-3">
          <Target className="text-accent" size={20} />
          <div className="flex-1">
            <h4 className="font-medium text-card-foreground">Maternity Savings Goal</h4>
            <p className="text-sm text-muted-foreground">₹{currentSavings.toLocaleString()} of ₹{savingsGoal.toLocaleString()}</p>
          </div>
        </div>
        <Progress value={progressPercentage} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progressPercentage.toFixed(0)}% Complete</span>
          <span>₹{(savingsGoal - currentSavings).toLocaleString()} to go</span>
        </div>
      </Card>

      {/* Squirrel Lending Stats */}
      <Card className="p-4 shadow-card bg-gradient-success text-secondary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Your Squirrel Score</h4>
            <p className="text-2xl font-bold">847</p>
            <p className="text-xs opacity-90">Top 10% Helper</p>
          </div>
          <div className="text-right">
            <TrendingUp size={20} />
            <p className="text-sm">₹5,200 lent</p>
            <p className="text-xs opacity-90">This month</p>
          </div>
        </div>
      </Card>

      {/* Partner Offers */}
      <Card className="p-4 shadow-card bg-gradient-accent text-accent-foreground">
        <div className="flex items-center gap-3">
          <Gift size={20} />
          <div className="flex-1">
            <h4 className="font-medium">Special Offers</h4>
            <p className="text-sm opacity-90">3 new deals for expecting mothers</p>
          </div>
          <Button size="sm" variant="elevated">
            View
          </Button>
        </div>
      </Card>
    </div>
  );
};