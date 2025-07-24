import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  PiggyBank,
  Lightbulb,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const AIInsights = () => {
  const insights = [
    {
      title: "Spending Analysis",
      description: "You spend 23% more on weekends. Consider setting weekend budgets.",
      impact: "High",
      color: "primary",
      icon: Brain,
      action: "Set Weekend Budget"
    },
    {
      title: "Savings Optimization",
      description: "Switching to auto-invest could increase savings by 15%.",
      impact: "Medium",
      color: "success",
      icon: PiggyBank,
      action: "Enable Auto-Invest"
    },
    {
      title: "Investment Recommendation",
      description: "Based on your risk profile, consider diversifying into equity funds.",
      impact: "High",
      color: "accent",
      icon: TrendingUp,
      action: "View Recommendations"
    },
    {
      title: "Budget Optimization",
      description: "You can reduce food expenses by ₹2,000/month with smart planning.",
      impact: "Medium",
      color: "secondary",
      icon: Target,
      action: "See Suggestions"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-destructive";
      case "Medium": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "bg-primary/10 text-primary";
      case "success": return "bg-success/10 text-success";
      case "accent": return "bg-accent/10 text-accent";
      case "secondary": return "bg-secondary/10 text-secondary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground border-0 shadow-premium">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-6 w-6" />
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        </div>
        <p className="text-primary-foreground/80">
          Personalized financial guidance powered by AI to help you make smarter decisions.
        </p>
      </Card>

      {/* Progress Tracking */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Financial Health</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Score</span>
              <span className="text-sm font-medium text-foreground">78/100</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Savings Rate</span>
              <span className="text-sm font-medium text-success">15% improvement</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Budget Adherence</span>
              <span className="text-sm font-medium text-warning">Needs attention</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <Card key={index} className="p-5 bg-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${getColorClasses(insight.color)}`}>
                <insight.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getImpactColor(insight.impact)}`}>
                    {insight.impact} Impact
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-primary hover:bg-primary/10 p-0 h-auto font-medium"
                >
                  {insight.action}
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-card-elevated border-0 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Smart Suggestions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-auto py-3 px-4 flex-col gap-2 bg-primary/10 hover:bg-primary/20 text-primary">
            <Target size={20} />
            <span className="text-xs">Set Smart Goals</span>
          </Button>
          
          <Button className="h-auto py-3 px-4 flex-col gap-2 bg-success/10 hover:bg-success/20 text-success">
            <PiggyBank size={20} />
            <span className="text-xs">Auto Save</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};