import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWalletData } from "@/hooks/useWalletData";
import { useNavigate } from "react-router-dom";
import { 
  Vault, 
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

const safebox = () => {
  const [isPregnancyMode, setIsPregnancyMode] = useState(false);
  const [ambulanceBenefit, setAmbulanceBenefit] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const { wallets, isLoading, getTotalBalance } = useWalletData();
  const navigate = useNavigate();

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1, icon: IndianRupee },
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012, icon: DollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011, icon: Euro },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044, icon: DollarSign }
  ];

  const safeboxTypes = [
    {
      id: 'Ivy',
      name: 'Ivy safebox',
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
      name: 'Maternal safebox',
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
      id: 'layoff',
      name: 'Layoff safebox',
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
      id: 'custom',
      name: 'Custom safebox',
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

  const totalBalance = safeboxTypes.reduce((sum, safebox) => sum + safebox.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Vault className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Safebox</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            "She may skip the insurance pitch, but give her ₹50 and a purpose—she'll squirrel it away without a second thought. Saving isn't taught, it's in her DNA."
          </p>
        </div>

        {/* Total Balance Card */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Total safebox Balance</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {isLoading ? "Loading..." : (getTotalBalance() > 0 ? `₹${getTotalBalance().toLocaleString()}` : "₹ --")}
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className="text-lg font-semibold text-secondary">₹ --</p>
            </div>
          </div>
        </Card>

        {/* Multi-Currency safebox */}
        <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <ArrowUpDown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Multi-Currency safebox</h3>
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

        {/* safebox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {safeboxTypes.map((safebox) => {
            const IconComponent = safebox.icon;
            const progress = safebox.target > 0 ? (safebox.balance / safebox.target) * 100 : 0;
            
            return (
              <Card key={safebox.id} className={`p-4 md:p-6 ${safebox.bgColor} ${safebox.borderColor} border-2`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${safebox.color}`}>
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm md:text-base text-foreground truncate">{safebox.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{safebox.description}</p>
                      </div>
                    </div>
                    {safebox.id === 'custom' && (
                      <Button size="sm" variant="outline" className="shrink-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {safebox.target > 0 && (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">--</span>
                        </div>
                        <Progress value={0} className="h-2" />
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className="font-semibold">₹ --</span>
                          <span className="text-muted-foreground">₹ --</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Monthly Contribution</span>
                          <span className="text-sm font-medium">₹ --</span>
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
                    {safebox.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                   <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => safebox.target > 0 ? navigate('/add-money') : navigate('/safebox')}
                    >
                      {safebox.target > 0 ? 'Add Money' : 'Create safebox'}
                    </Button>
                    {safebox.target > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-3"
                        onClick={() => navigate('/add-money')}
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Accessibility Note */}
        <Card className="p-4 md:p-6 bg-accent/5 border-accent/20">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-accent">Accessible Savings</h4>
            <p className="text-sm text-muted-foreground">
              Each safebox accepts investments as small as ₹10-₹100/day — built for accessibility, not complexity.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default safebox;
