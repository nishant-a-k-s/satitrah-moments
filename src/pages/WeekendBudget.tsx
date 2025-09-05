import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WeekendBudget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  const handleSave = () => {
    if (!amount || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Weekend Budget Set!",
      description: `₹${amount} ${isMonthly ? 'monthly' : 'weekly'} budget for ${category} saved successfully.`
    });
    
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Weekend Budget Setup</h1>
        </div>

        {/* Budget Form */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category Selection</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="travel">Travel & Transport</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="all">All Categories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Frequency</Label>
              <div className="text-sm text-muted-foreground">
                {isMonthly ? "Monthly" : "Weekly"} budget
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Weekly</span>
              <Switch
                checked={isMonthly}
                onCheckedChange={setIsMonthly}
              />
              <span className="text-sm">Monthly</span>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Budget Summary</h3>
            <p className="text-sm text-muted-foreground">
              You'll spend ₹{amount || "0"} {isMonthly ? "monthly" : "weekly"} on {category || "selected category"}
            </p>
            {amount && (
              <p className="text-xs text-muted-foreground mt-1">
                Daily limit: ₹{Math.round(parseInt(amount) / (isMonthly ? 30 : 7)) || 0}
              </p>
            )}
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Weekend Budget
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default WeekendBudget;