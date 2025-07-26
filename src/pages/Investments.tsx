import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Coins, 
  DollarSign,
  Plus,
  ArrowUp,
  ArrowDown,
  Target,
  PieChart
} from "lucide-react";

const Investments = () => {
  const [goldInvestment, setGoldInvestment] = useState(15000);
  const [sipInvestments, setSipInvestments] = useState(45000);

  const investments = [
    {
      id: 'gold',
      name: 'Digital Gold',
      balance: goldInvestment,
      returns: '+8.5%',
      monthlyContribution: 1000,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: Coins
    },
    {
      id: 'equity-sip',
      name: 'Equity SIP',
      balance: sipInvestments,
      returns: '+12.3%',
      monthlyContribution: 2000,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: TrendingUp
    },
    {
      id: 'debt-sip',
      name: 'Debt SIP',
      balance: 25000,
      returns: '+7.2%',
      monthlyContribution: 1500,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: PieChart
    }
  ];

  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.balance, 0);
  const totalMonthlyContribution = investments.reduce((sum, inv) => sum + inv.monthlyContribution, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Investments</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            "Grow your wealth with our curated investment options - Gold and SIP investments made simple."
          </p>
        </div>

        {/* Total Investment Card */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Total Investment Value</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary">₹{totalInvestmentValue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+9.8% overall returns</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Monthly SIPs</p>
              <p className="text-lg font-semibold text-secondary">₹{totalMonthlyContribution.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Investment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {investments.map((investment) => {
            const IconComponent = investment.icon;
            
            return (
              <Card key={investment.id} className={`p-4 md:p-6 ${investment.bgColor} ${investment.borderColor} border-2`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${investment.color}`}>
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm md:text-base text-foreground">{investment.name}</h3>
                        <p className="text-xs md:text-sm text-green-600 font-medium">{investment.returns}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Value</span>
                      <span className="font-semibold">₹{investment.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly SIP</span>
                      <span className="font-medium">₹{investment.monthlyContribution.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input 
                      type="number" 
                      placeholder="Add investment amount" 
                      className="h-8 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" className="text-xs">
                      Invest Now
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Withdraw
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Investment Features */}
        <Card className="p-4 md:p-6">
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Investment Features</h3>

            <Tabs defaultValue="gold" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gold" className="text-xs md:text-sm">Digital Gold</TabsTrigger>
                <TabsTrigger value="equity" className="text-xs md:text-sm">Equity SIP</TabsTrigger>
                <TabsTrigger value="debt" className="text-xs md:text-sm">Debt SIP</TabsTrigger>
              </TabsList>

              <TabsContent value="gold" className="space-y-4">
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Digital Gold Features</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• 24K pure gold backed by physical gold</p>
                      <p>• Start investing from ₹10</p>
                      <p>• Live gold price tracking</p>
                      <p>• Instant buy/sell anytime</p>
                      <p>• Zero storage charges</p>
                      <p>• Secure vault storage</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Gold Rate</p>
                        <p className="font-bold text-yellow-600">₹6,245/gram</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Your Holdings</p>
                        <p className="font-bold text-yellow-600">{(goldInvestment / 6245).toFixed(3)}g</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="equity" className="space-y-4">
                <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Equity SIP Features</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Diversified equity mutual funds</p>
                      <p>• Start SIP from ₹500/month</p>
                      <p>• Long-term wealth creation</p>
                      <p>• Professional fund management</p>
                      <p>• Tax benefits under 80C</p>
                      <p>• Auto-debit facility</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Returns</p>
                        <p className="font-bold text-green-600">12-15% p.a.</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="font-bold text-orange-600">Moderate-High</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="debt" className="space-y-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Debt SIP Features</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Stable returns with low risk</p>
                      <p>• Government and corporate bonds</p>
                      <p>• Capital protection</p>
                      <p>• Regular income option</p>
                      <p>• Ideal for conservative investors</p>
                      <p>• Better than FD returns</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Returns</p>
                        <p className="font-bold text-blue-600">7-9% p.a.</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="font-bold text-green-600">Low</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Investment Calculator */}
        <Card className="p-4 md:p-6 bg-accent/5 border-accent/20">
          <div className="space-y-4">
            <h4 className="font-semibold text-accent">SIP Calculator</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Monthly Investment</label>
                <Input placeholder="₹1000" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Investment Period (Years)</label>
                <Input placeholder="10" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Expected Return (%)</label>
                <Input placeholder="12" className="mt-1" />
              </div>
            </div>
            <Button className="w-full md:w-auto">Calculate Returns</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Investments;