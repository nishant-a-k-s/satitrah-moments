import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plane, Shield, CreditCard, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SmartGoalsSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goalType, setGoalType] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [timeline, setTimeline] = useState("");

  const goalTypes = [
    { id: "travel", name: "Travel", icon: Plane, description: "Dream vacation or trip" },
    { id: "emergency", name: "Emergency Fund", icon: Shield, description: "Financial safety net" },
    { id: "debt", name: "Debt Repayment", icon: CreditCard, description: "Pay off loans or credit" },
    { id: "custom", name: "Custom Goal", icon: Target, description: "Define your own goal" }
  ];

  const timelineOptions = [
    { value: "3", label: "3 months" },
    { value: "6", label: "6 months" },
    { value: "12", label: "1 year" },
    { value: "24", label: "2 years" },
    { value: "36", label: "3 years" },
    { value: "60", label: "5 years" }
  ];

  const calculateMonthlyAmount = () => {
    if (!targetAmount || !timeline) return 0;
    return Math.round(parseInt(targetAmount) / parseInt(timeline));
  };

  const handleCreateGoal = () => {
    if (!goalType || !targetAmount || !timeline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (goalType === "custom" && !customGoal) {
      toast({
        title: "Missing Goal Name",
        description: "Please enter a name for your custom goal",
        variant: "destructive"
      });
      return;
    }

    const goalName = goalType === "custom" ? customGoal : goalTypes.find(g => g.id === goalType)?.name;
    
    toast({
      title: "Smart Goal Created!",
      description: `Your ${goalName} goal of ₹${targetAmount} has been created successfully.`
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
          <h1 className="text-xl font-bold text-foreground">Smart Goals Setup</h1>
        </div>

        <div className="space-y-6">
          {/* Goal Type Selection */}
          <Card className="p-6">
            <Label className="mb-4 block">Goal Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {goalTypes.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    goalType === goal.id
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setGoalType(goal.id)}
                >
                  <goal.icon className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-medium text-sm">{goal.name}</h4>
                  <p className="text-xs text-muted-foreground">{goal.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Custom Goal Name */}
          {goalType === "custom" && (
            <Card className="p-6">
              <div className="space-y-2">
                <Label htmlFor="customGoal">Goal Name</Label>
                <Input
                  id="customGoal"
                  placeholder="Enter your goal name"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                />
              </div>
            </Card>
          )}

          {/* Target Amount */}
          <Card className="p-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Target Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <div className="space-y-2">
              <Label>Timeline</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Goal Summary */}
          {goalType && targetAmount && timeline && (
            <Card className="p-6 bg-gradient-subtle">
              <h3 className="font-medium mb-3">Goal Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Goal:</span>
                  <span className="font-medium">
                    {goalType === "custom" ? customGoal : goalTypes.find(g => g.id === goalType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Target Amount:</span>
                  <span className="font-medium">₹{parseInt(targetAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">{timelineOptions.find(t => t.value === timeline)?.label}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>Monthly Savings Needed:</span>
                  <span className="font-bold text-primary">₹{calculateMonthlyAmount().toLocaleString()}</span>
                </div>
              </div>
            </Card>
          )}

          <Button onClick={handleCreateGoal} className="w-full">
            Create Goal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmartGoalsSetup;