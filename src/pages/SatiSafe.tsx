import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Heart, 
  Ambulance, 
  Users,
  Plus,
  ArrowUp,
  ArrowDown,
  Target,
  CreditCard,
  Banknote
} from "lucide-react";

const SatiSafe = () => {
  const [balance, setBalance] = useState(45000);
  const [target, setTarget] = useState(150000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);
  const [squirrelBalance, setSquirrelBalance] = useState(1250);

  const progress = (balance / target) * 100;

  const features = [
    "Emergency medical expenses",
    "Safety and security incidents", 
    "Mental health support access",
    "Dignity fund for women",
    "Trauma recovery assistance",
    "Legal aid support",
    "80% instant micro-credit access"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">SatiSafe Wallet</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            "Your safety net for emergencies, trauma, and dignity. Because every woman deserves security and peace of mind."
          </p>
        </div>

        {/* Main Wallet Card */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">SatiSafe Balance</h2>
                <p className="text-2xl md:text-3xl font-bold text-primary">₹{balance.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">+ {squirrelBalance} Squirrels Auto-Invested</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">Monthly Savings</p>
                <p className="text-lg font-semibold text-secondary">₹{monthlyContribution.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Target</span>
                <span className="font-medium">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs md:text-sm">
                <span className="font-semibold">₹{balance.toLocaleString()}</span>
                <span className="text-muted-foreground">₹{target.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="flex items-center gap-2" size="sm">
                <Plus className="h-4 w-4" />
                Add Money
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <ArrowDown className="h-4 w-4" />
                Withdraw
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <CreditCard className="h-4 w-4" />
                Micro-Credit
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Target className="h-4 w-4" />
                Set Goal
              </Button>
            </div>
          </div>
        </Card>

        {/* Features Tabs */}
        <Card className="p-4 md:p-6">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features" className="text-xs md:text-sm">Features</TabsTrigger>
              <TabsTrigger value="credit" className="text-xs md:text-sm">Micro-Credit</TabsTrigger>
              <TabsTrigger value="squirrel" className="text-xs md:text-sm">Squirrels</TabsTrigger>
              <TabsTrigger value="emergency" className="text-xs md:text-sm">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                What SatiSafe Covers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Shield className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="credit" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Students</h4>
                    <p className="text-sm text-muted-foreground">
                      Get 80% of Squirrel balance as interest-free loan for 30 days
                    </p>
                    <p className="text-lg font-bold text-green-600">₹{Math.floor(squirrelBalance * 0.8).toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">Available Now</Badge>
                  </div>
                </Card>
                
                <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Professionals</h4>
                    <p className="text-sm text-muted-foreground">
                      Get 80% of Wallet + Squirrel balance for 30 days interest-free
                    </p>
                    <p className="text-lg font-bold text-blue-600">₹{Math.floor((balance + squirrelBalance) * 0.8).toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">Premium Feature</Badge>
                  </div>
                </Card>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <p>• 30 days interest-free period</p>
                <p>• 10-12% p.a. interest after 30 days</p>
                <p>• Instant approval for emergency situations</p>
              </div>
            </TabsContent>

            <TabsContent value="squirrel" className="space-y-4">
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Auto-Investment Status</h4>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All earned Squirrels are automatically invested into your SatiSafe wallet for maximum security.
                  </p>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Squirrels</p>
                      <p className="text-lg font-bold text-primary">{squirrelBalance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Auto-Invested</p>
                      <p className="text-lg font-bold text-secondary">₹{squirrelBalance}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Ambulance className="h-5 w-5 text-red-500" />
                      <h4 className="font-semibold text-red-700 dark:text-red-300">Emergency Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instant access to funds during medical emergencies or safety incidents
                    </p>
                    <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                      Emergency Withdraw
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-purple-500" />
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300">Support Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect with mental health professionals and legal aid services
                    </p>
                    <Button size="sm" variant="outline" className="w-full border-purple-300">
                      Get Support
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Monthly Contribution Adjustment */}
        <Card className="p-4 md:p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Adjust Monthly Contribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Monthly Amount</span>
                <span className="text-sm font-medium">₹{monthlyContribution.toLocaleString()}</span>
              </div>
              <Input 
                type="number" 
                placeholder="₹10 minimum" 
                className="h-10"
                defaultValue={monthlyContribution}
              />
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Update Amount</Button>
                <Button size="sm" variant="outline">Pause</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SatiSafe;