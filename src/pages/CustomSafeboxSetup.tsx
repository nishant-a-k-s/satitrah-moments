import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar as CalendarIcon, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CustomSafeboxSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [flexibleContributions, setFlexibleContributions] = useState(true);

  const calculateMonthsToDeadline = () => {
    if (!deadline) return 0;
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(1, diffMonths);
  };

  const suggestedMonthly = () => {
    if (!targetAmount || !deadline) return 0;
    const months = calculateMonthsToDeadline();
    return Math.ceil(parseInt(targetAmount) / months);
  };

  const handleCreateSafebox = () => {
    if (!goalName || !targetAmount || !deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Safebox Created!",
      description: `Your ${goalName} safebox has been created successfully.`
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
          <h1 className="text-xl font-bold text-foreground">Custom Safebox Setup</h1>
        </div>

        <div className="space-y-6">
          {/* Goal Name */}
          <Card className="p-6">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., Dream Wedding, New Car, House Down Payment"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give your safebox a meaningful name to stay motivated
              </p>
            </div>
          </Card>

          {/* Target Amount */}
          <Card className="p-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Target Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </Card>

          {/* Deadline */}
          <Card className="p-6">
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Card>

          {/* Monthly Contribution */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Contribution</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="monthly"
                    type="number"
                    placeholder={suggestedMonthly().toString()}
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="pl-8"
                  />
                </div>
                {targetAmount && deadline && (
                  <p className="text-xs text-muted-foreground">
                    Suggested: ₹{suggestedMonthly().toLocaleString()} to reach goal in {calculateMonthsToDeadline()} months
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Flexible Contributions</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow variable monthly amounts
                  </p>
                </div>
                <Switch
                  checked={flexibleContributions}
                  onCheckedChange={setFlexibleContributions}
                />
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Safebox Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm">Goal-based savings with progress tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm">Earn 5-8% returns on your savings</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">Automated monthly contributions</span>
              </div>
            </div>
          </Card>

          {/* Summary */}
          {goalName && targetAmount && deadline && (
            <Card className="p-6 bg-gradient-subtle">
              <h3 className="font-medium mb-3">Safebox Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Goal:</span>
                  <span className="font-medium">{goalName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Amount:</span>
                  <span className="font-medium">₹{parseInt(targetAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span className="font-medium">{format(deadline, "PP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Contribution:</span>
                  <span className="font-medium">
                    ₹{(monthlyContribution || suggestedMonthly()).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Flexible Contributions:</span>
                  <span className="font-medium">{flexibleContributions ? "Yes" : "No"}</span>
                </div>
              </div>
            </Card>
          )}

          <Button onClick={handleCreateSafebox} className="w-full">
            Create Safebox
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomSafeboxSetup;