import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet as WalletIcon, 
  Baby, 
  Shield, 
  Briefcase, 
  Smartphone, 
  ShoppingBag, 
  Plus,
  Target,
  Heart,
  Ambulance,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowUpDown,
  DollarSign,
  Euro,
  IndianRupee
} from "lucide-react";

const Wallet = () => {
  const [isPregnancyMode, setIsPregnancyMode] = useState(false);
  const [ambulanceBenefit, setAmbulanceBenefit] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1, icon: IndianRupee },
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012, icon: DollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011, icon: Euro },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044, icon: DollarSign }
  ];

  const walletTypes = [
    {
      id: 'satisafe',
      name: 'SatiSafe Wallet',
      icon: ShieldCheck,
      description: 'Emergency, trauma, safety, and dignity coverage - your primary protection',
      balance: 89000,
      target: 200000,
      monthlyContribution: 5000,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      features: ['Emergency coverage', 'Safety & dignity fund', 'Auto squirrel investment', 'Instant credit access']
    },
    {
      id: 'maternal',
      name: 'Maternal Wallet',
      icon: Baby,
      description: 'Save for childbirth, prenatal care, maternity break',
      balance: 45000,
      target: 150000,
      monthlyContribution: 2000,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      features: ['Joint account option', 'Pregnancy mode', 'Ambulance benefits']
    },
    {
      id: 'emergency',
      name: 'Emergency Wallet',
      icon: Shield,
      description: 'For health, accident, or family crises',
      balance: 12000,
      target: 50000,
      monthlyContribution: 1000,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
      features: ['Instant access', 'Health emergencies', 'Family crises']
    },
    {
      id: 'layoff',
      name: 'Layoff Wallet',
      icon: Briefcase,
      description: 'Small monthly savings for job loss cushion',
      balance: 8500,
      target: 100000,
      monthlyContribution: 1500,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      features: ['Job security', '6-month cushion', 'Skill development']
    },
    {
      id: 'gadget',
      name: 'Gadget Wallet',
      icon: Smartphone,
      description: 'Buy phones/laptops without loans',
      balance: 25000,
      target: 80000,
      monthlyContribution: 3000,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      features: ['No EMI', 'Latest gadgets', 'Tech upgrades']
    },
    {
      id: 'needs',
      name: 'Needs Wallet',
      icon: ShoppingBag,
      description: 'Clothing, education, exam fees, rent',
      balance: 15000,
      target: 40000,
      monthlyContribution: 2500,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      features: ['Daily needs', 'Education', 'Rent backup']
    },
    {
      id: 'custom',
      name: 'Custom Wallets',
      icon: Target,
      description: 'Based on user goals, like marriage or side hustle',
      balance: 0,
      target: 0,
      monthlyContribution: 0,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      features: ['Personalized goals', 'Flexible savings', 'Custom targets']
    }
  ];

  const totalBalance = walletTypes.reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <WalletIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Wallets</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            "She may skip the insurance pitch, but give her ₹50 and a purpose—she'll squirrel it away without a second thought. Saving isn't taught, it's in her DNA."
          </p>
        </div>

        {/* Total Balance Card */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Total Wallet Balance</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary">₹{totalBalance.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className="text-lg font-semibold text-secondary">₹{walletTypes.reduce((sum, w) => sum + w.monthlyContribution, 0).toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Multi-Currency Wallet */}
        <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <ArrowUpDown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Multi-Currency Wallet</h3>
                  <p className="text-sm text-muted-foreground">Transparent rates • Easy conversion</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currencies.map((currency) => {
                const IconComponent = currency.icon;
                const isSelected = selectedCurrency === currency.code;
                return (
                  <Card 
                    key={currency.code}
                    className={`p-3 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' 
                        : 'hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/10'
                    }`}
                    onClick={() => setSelectedCurrency(currency.code)}
                  >
                    <div className="text-center space-y-2">
                      <IconComponent className="h-5 w-5 mx-auto text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold">{currency.code}</p>
                        <p className="text-xs text-muted-foreground">Rate: {currency.rate.toFixed(4)}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Convert Currency
              </Button>
              <Button variant="outline" size="sm">
                View Rates
              </Button>
            </div>
          </div>
        </Card>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {walletTypes.map((wallet) => {
            const IconComponent = wallet.icon;
            const progress = wallet.target > 0 ? (wallet.balance / wallet.target) * 100 : 0;
            
            return (
              <Card key={wallet.id} className={`p-4 md:p-6 ${wallet.bgColor} ${wallet.borderColor} border-2`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${wallet.color}`}>
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm md:text-base text-foreground truncate">{wallet.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{wallet.description}</p>
                      </div>
                    </div>
                    {wallet.id === 'custom' && (
                      <Button size="sm" variant="outline" className="shrink-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {wallet.target > 0 && (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className="font-semibold">₹{wallet.balance.toLocaleString()}</span>
                          <span className="text-muted-foreground">₹{wallet.target.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Monthly Contribution</span>
                          <span className="text-sm font-medium">₹{wallet.monthlyContribution.toLocaleString()}</span>
                        </div>
                        <Input 
                          type="number" 
                          placeholder="₹10 minimum" 
                          className="h-8 text-sm"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    {wallet.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                   <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      {wallet.target > 0 ? 'Add Money' : 'Create Wallet'}
                    </Button>
                    {wallet.target > 0 && (
                      <Button variant="outline" size="sm" className="px-3">
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Maternal Wallet Special Features */}
        <Card className="p-4 md:p-6">
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Baby className="h-5 w-5 md:h-6 md:w-6 text-pink-500" />
              Maternal Wallet Special Features
            </h3>

            <Tabs defaultValue="pregnancy" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pregnancy" className="text-xs md:text-sm">Pregnancy Mode</TabsTrigger>
                <TabsTrigger value="partner" className="text-xs md:text-sm">Joint Account</TabsTrigger>
                <TabsTrigger value="benefits" className="text-xs md:text-sm">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="pregnancy" className="space-y-4">
                <Card className="p-4 bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Pregnancy Mode</h4>
                        <p className="text-sm text-muted-foreground">Enhanced features during pregnancy</p>
                      </div>
                      <Switch 
                        checked={isPregnancyMode} 
                        onCheckedChange={setIsPregnancyMode}
                      />
                    </div>
                    
                    {isPregnancyMode && (
                      <div className="space-y-3 pt-4 border-t border-pink-200 dark:border-pink-800">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-pink-500" />
                          <span className="text-sm">Personalized maternal care tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-pink-500" />
                          <span className="text-sm">Auto-invest percentage increase options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ambulance className="h-4 w-4 text-pink-500" />
                          <span className="text-sm">Special ambulance benefits available</span>
                        </div>
                        
                        <Card className="p-3 bg-white dark:bg-gray-800 border-pink-200 dark:border-pink-700">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">Ambulance Benefit (50/50 Split)</h5>
                            <Switch 
                              checked={ambulanceBenefit} 
                              onCheckedChange={setAmbulanceBenefit}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            One-time offer: You pay 50%, Satitrah covers 50% of ambulance charges. 
                            20% less than market prices for all users.
                          </p>
                        </Card>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="partner" className="space-y-4">
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">Add Joint Partner</h4>
                        <p className="text-sm text-muted-foreground">Share savings goals with your partner</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Partner's phone number" type="tel" />
                      <Button className="w-full">Send Invitation</Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Combined Squirrel points and balances</p>
                      <p>• Shared access to maternal credit benefits</p>
                      <p>• Joint savings tracking and goals</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700 dark:text-green-300">Subscribers</h4>
                      <p className="text-sm text-muted-foreground">
                        Get 80% of Wallet + Squirrel balance as free micro-loan for 60 days
                      </p>
                      <Badge variant="secondary" className="text-xs">Premium Feature</Badge>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300">Non-subscribers</h4>
                      <p className="text-sm text-muted-foreground">
                        Get 80% of Squirrel balance only, same 60-day tenure
                      </p>
                      <Badge variant="outline" className="text-xs">Free Feature</Badge>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Accessibility Note */}
        <Card className="p-4 md:p-6 bg-accent/5 border-accent/20">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-accent">Accessible Savings</h4>
            <p className="text-sm text-muted-foreground">
              Each wallet accepts investments as small as ₹10-₹100/day — built for accessibility, not complexity.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;