import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingDown, Target, Lightbulb, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BudgetSuggestions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([]);

  const monthlyExpenses = [
    { category: "Food & Dining", current: 12000, suggested: 10000, percentage: 24 },
    { category: "Transportation", current: 8000, suggested: 6000, percentage: 16 },
    { category: "Entertainment", current: 6000, suggested: 4000, percentage: 12 },
    { category: "Shopping", current: 5000, suggested: 3000, percentage: 10 },
    { category: "Utilities", current: 3000, suggested: 3000, percentage: 6 },
  ];

  const aiTips = [
    {
      id: 1,
      category: "Food & Dining",
      tip: "Reduce Food by ₹2,000",
      detail: "Cook at home 3 more days per week instead of ordering",
      savings: 2000,
      difficulty: "Easy"
    },
    {
      id: 2,
      category: "Transportation",
      tip: "Switch from cabs to metro twice a week",
      detail: "Use metro for office commute on Monday & Friday",
      savings: 2000,
      difficulty: "Medium"
    },
    {
      id: 3,
      category: "Entertainment",
      tip: "Choose home entertainment over cinema",
      detail: "Replace 2 movie tickets with streaming at home",
      savings: 2000,
      difficulty: "Easy"
    },
    {
      id: 4,
      category: "Shopping",
      tip: "Implement 24-hour rule for purchases",
      detail: "Wait 24 hours before buying non-essential items",
      savings: 2000,
      difficulty: "Hard"
    }
  ];

  const totalCurrentExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.current, 0);
  const totalSuggestedExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.suggested, 0);
  const totalSavings = totalCurrentExpense - totalSuggestedExpense;

  const applySuggestion = (tipId: number) => {
    setAppliedSuggestions(prev => [...prev, tipId]);
    const tip = aiTips.find(t => t.id === tipId);
    toast({
      title: "Suggestion Applied!",
      description: `You'll save ₹${tip?.savings} monthly by ${tip?.tip.toLowerCase()}.`
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Budget Suggestions</h1>
        </div>

        <div className="space-y-6">
          {/* Savings Overview */}
          <Card className="p-6 bg-gradient-success text-secondary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5" />
              <h3 className="font-medium">Potential Monthly Savings</h3>
            </div>
            <div className="text-3xl font-bold mb-2">₹{totalSavings.toLocaleString()}</div>
            <p className="text-sm opacity-90">
              From ₹{totalCurrentExpense.toLocaleString()} to ₹{totalSuggestedExpense.toLocaleString()}
            </p>
          </Card>

          {/* Expense Breakdown */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Monthly Expenses by Category</h3>
            <div className="space-y-4">
              {monthlyExpenses.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>{expense.category}</span>
                    <div className="text-right">
                      <span className="line-through text-muted-foreground">₹{expense.current.toLocaleString()}</span>
                      <span className="ml-2 font-medium text-success">₹{expense.suggested.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={expense.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {expense.percentage}% of budget
                    {expense.current !== expense.suggested && (
                      <span className="ml-2 text-success">
                        Save ₹{(expense.current - expense.suggested).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Tips */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-medium">AI Money-Saving Tips</h3>
            </div>
            
            {aiTips.map((tip) => (
              <Card key={tip.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      {tip.tip}
                      {appliedSuggestions.includes(tip.id) && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{tip.detail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">₹{tip.savings}</p>
                    <Badge variant={tip.difficulty === 'Easy' ? 'secondary' : tip.difficulty === 'Medium' ? 'outline' : 'destructive'} className="text-xs">
                      {tip.difficulty}
                    </Badge>
                  </div>
                </div>
                
                {!appliedSuggestions.includes(tip.id) ? (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => applySuggestion(tip.id)}
                  >
                    Apply Suggestion
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Applied
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Apply All */}
          <Card className="p-6">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => {
                const unapplied = aiTips.filter(tip => !appliedSuggestions.includes(tip.id));
                setAppliedSuggestions(prev => [...prev, ...unapplied.map(tip => tip.id)]);
                toast({
                  title: "All Suggestions Applied!",
                  description: `You'll save ₹${totalSavings.toLocaleString()} monthly with these changes.`
                });
              }}
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Apply All Suggestions
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Save ₹{totalSavings.toLocaleString()} per month
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetSuggestions;