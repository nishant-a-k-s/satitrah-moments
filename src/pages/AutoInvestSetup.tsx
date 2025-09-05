import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, TrendingUp, Shield, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AutoInvestSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [percentage, setPercentage] = useState([15]);
  const [assetType, setAssetType] = useState("fd");
  const [autoDebit, setAutoDebit] = useState(false);

  const assetTypes = [
    { id: "fd", name: "Fixed Deposit", icon: Shield, returns: "6-7% p.a.", risk: "Low" },
    { id: "mutual", name: "Mutual Funds", icon: PieChart, returns: "8-12% p.a.", risk: "Medium" },
    { id: "etf", name: "ETFs", icon: TrendingUp, returns: "10-15% p.a.", risk: "Medium-High" },
    { id: "safebox", name: "Safe Boxes", icon: Shield, returns: "5-8% p.a.", risk: "Very Low" }
  ];

  const monthlyIncome = 50000; // Mock income
  const investmentAmount = Math.round((monthlyIncome * percentage[0]) / 100);

  const handleEnable = () => {
    toast({
      title: "Auto-Invest Enabled!",
      description: `₹${investmentAmount} will be auto-invested monthly in ${assetTypes.find(a => a.id === assetType)?.name}.`
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
          <h1 className="text-xl font-bold text-foreground">Auto-Invest Setup</h1>
        </div>

        <div className="space-y-6">
          {/* Investment Percentage */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Investment Percentage</Label>
                <span className="text-xl font-bold text-primary">{percentage[0]}%</span>
              </div>
              <Slider
                value={percentage}
                onValueChange={setPercentage}
                max={50}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                ₹{investmentAmount} per month from ₹{monthlyIncome.toLocaleString()} income
              </div>
            </div>
          </Card>

          {/* Asset Type Selection */}
          <Card className="p-6">
            <Label className="mb-4 block">Asset Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {assetTypes.map((asset) => (
                <div
                  key={asset.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    assetType === asset.id
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setAssetType(asset.id)}
                >
                  <asset.icon className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-medium text-sm">{asset.name}</h4>
                  <p className="text-xs text-muted-foreground">{asset.returns}</p>
                  <p className="text-xs text-success">{asset.risk} Risk</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Auto-Debit Toggle */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Debit</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically deduct from your account
                </p>
              </div>
              <Switch
                checked={autoDebit}
                onCheckedChange={setAutoDebit}
              />
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6 bg-gradient-subtle">
            <h3 className="font-medium mb-3">Investment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly Investment:</span>
                <span className="font-medium">₹{investmentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Asset Type:</span>
                <span className="font-medium">{assetTypes.find(a => a.id === assetType)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Returns:</span>
                <span className="font-medium text-success">{assetTypes.find(a => a.id === assetType)?.returns}</span>
              </div>
              <div className="flex justify-between">
                <span>Auto-Debit:</span>
                <span className="font-medium">{autoDebit ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handleEnable} className="w-full">
            Enable Auto-Invest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoInvestSetup;