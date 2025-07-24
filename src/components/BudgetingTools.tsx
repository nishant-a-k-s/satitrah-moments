import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  Calendar,
  Plus,
  AlertCircle
} from "lucide-react";

export const BudgetingTools = () => {
  const budgetCategories = [
    { 
      name: "Food & Dining", 
      spent: 8500, 
      budget: 12000, 
      color: "bg-primary",
      icon: "🍽️"
    },
    { 
      name: "Transportation", 
      spent: 4200, 
      budget: 5000, 
      color: "bg-secondary",
      icon: "🚗"
    },
    { 
      name: "Shopping", 
      spent: 15600, 
      budget: 10000, 
      color: "bg-destructive",
      icon: "🛍️"
    },
    { 
      name: "Entertainment", 
      spent: 2800, 
      budget: 4000, 
      color: "bg-accent",
      icon: "🎬"
    },
  ];

  const savingsGoals = [
    { name: "Emergency Fund", current: 45000, target: 100000, color: "bg-success" },
    { name: "Vacation Fund", current: 18000, target: 50000, color: "bg-accent" },
    { name: "New Phone", current: 12000, target: 80000, color: "bg-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Monthly Budget
          </h3>
          <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
            <Plus size={16} className="mr-1" />
            Add Category
          </Button>
        </div>

        <div className="space-y-4">
          {budgetCategories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-foreground">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
                      ₹{category.spent.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of ₹{category.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${isOverBudget ? 'progress-destructive' : ''}`}
                />
                {isOverBudget && (
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle size={12} />
                    Over budget by ₹{(category.spent - category.budget).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Savings Goals */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Savings Goals
          </h3>
          <Button size="sm" className="bg-accent/10 text-accent hover:bg-accent/20">
            <Plus size={16} className="mr-1" />
            New Goal
          </Button>
        </div>

        <div className="space-y-4">
          {savingsGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{goal.name}</span>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ₹{goal.current.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of ₹{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-success">
                  {percentage.toFixed(1)}% complete
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Monthly Summary */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-secondary" />
          This Month's Summary
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Saved</p>
            <p className="text-lg font-bold text-success">₹12,450</p>
          </div>
          <div className="text-center p-4 bg-destructive/10 rounded-lg">
            <TrendingDown className="h-6 w-6 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Overspent</p>
            <p className="text-lg font-bold text-destructive">₹5,600</p>
          </div>
        </div>
      </Card>
    </div>
  );
};