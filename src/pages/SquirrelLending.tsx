import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Coins, 
  ArrowUp, 
  ArrowDown,
  CreditCard,
  GraduationCap,
  Briefcase,
  Target,
  TrendingUp,
  Calculator
} from "lucide-react";

const SquirrelLending = () => {
  const [userType, setUserType] = useState<'student' | 'professional'>('professional');
  const [squirrelBalance, setSquirrelBalance] = useState(2450);
  const [walletBalance, setWalletBalance] = useState(45000);
  const [monthlySpending, setMonthlySpending] = useState(15000);

  const squirrelEarningRate = userType === 'student' ? 10 : 100; // per ₹1000 spent
  const monthlySquirrelEarning = Math.floor((monthlySpending / 1000) * squirrelEarningRate);
  
  const lendableAmount = userType === 'student' 
    ? Math.floor(squirrelBalance * 0.8)
    : Math.floor((walletBalance + squirrelBalance) * 0.8);

  const roundOffSavings = Math.floor(monthlySpending * 0.02); // Assuming 2% average round-off

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Coins className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Squirrel Lending</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            "Smart rewards, smarter savings. Your spending creates wealth through our Squirrel ecosystem."
          </p>
        </div>

        {/* User Type Selection */}
        <Card className="p-4 md:p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Select Your Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={userType === 'student' ? 'default' : 'outline'}
                onClick={() => setUserType('student')}
                className="flex items-center gap-2 h-auto p-4"
              >
                <GraduationCap className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Student</div>
                  <div className="text-xs opacity-70">10 Squirrels/₹1000</div>
                </div>
              </Button>
              <Button
                variant={userType === 'professional' ? 'default' : 'outline'}
                onClick={() => setUserType('professional')}
                className="flex items-center gap-2 h-auto p-4"
              >
                <Briefcase className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Professional</div>
                  <div className="text-xs opacity-70">100 Squirrels/₹1000</div>
                </div>
              </Button>
            </div>
          </div>
        </Card>

        {/* Squirrel Balance & Lending Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Coins className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-foreground">Your Squirrels</h3>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-amber-600">{squirrelBalance}</p>
                <p className="text-sm text-muted-foreground">Squirrels earned</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Earning</span>
                  <span className="font-medium">+{monthlySquirrelEarning} Squirrels</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Round-off Savings</span>
                  <span className="font-medium">₹{roundOffSavings}/month</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-foreground">Available Credit</h3>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-green-600">₹{lendableAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  {userType === 'student' ? '80% of Squirrels' : '80% of Wallet + Squirrels'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Borrow Now
                </Button>
                <Button size="sm" variant="outline" className="border-green-300">
                  Terms
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Squirrel Logic Details */}
        <Card className="p-4 md:p-6">
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">How Squirrel Logic Works</h3>

            <Tabs defaultValue="earning" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="earning" className="text-xs md:text-sm">Earning</TabsTrigger>
                <TabsTrigger value="roundoff" className="text-xs md:text-sm">Round-off</TabsTrigger>
                <TabsTrigger value="lending" className="text-xs md:text-sm">Lending</TabsTrigger>
                <TabsTrigger value="benefits" className="text-xs md:text-sm">Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="earning" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-500" />
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300">Students</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">• 10 Squirrels per ₹1,000 spent</p>
                        <p className="text-muted-foreground">• Focus on learning financial habits</p>
                        <p className="text-muted-foreground">• Access to educational resources</p>
                        <p className="text-muted-foreground">• Lower credit limits for safety</p>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Monthly spending ₹{monthlySpending.toLocaleString()} = {monthlySquirrelEarning} Squirrels
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-purple-500" />
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Professionals</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">• 100 Squirrels per ₹1,000 spent</p>
                        <p className="text-muted-foreground">• Higher credit access</p>
                        <p className="text-muted-foreground">• Premium financial tools</p>
                        <p className="text-muted-foreground">• Investment recommendations</p>
                      </div>
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                          Monthly spending ₹{monthlySpending.toLocaleString()} = {monthlySquirrelEarning} Squirrels
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="roundoff" className="space-y-4">
                <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-300">Automatic Round-off Savings</h4>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Every transaction is automatically rounded up to the nearest ₹10, and the round-off amount is saved to your Emergency or Needs Wallet.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                          <p className="text-xs text-muted-foreground">Transaction</p>
                          <p className="font-semibold">₹138</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                          <p className="text-xs text-muted-foreground">Rounded to</p>
                          <p className="font-semibold">₹140</p>
                        </div>
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-300">
                          <p className="text-xs text-amber-700 dark:text-amber-300">Saved</p>
                          <p className="font-semibold text-amber-700 dark:text-amber-300">₹2</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average monthly round-off savings: <strong>₹{roundOffSavings}</strong>
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="lending" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-700 dark:text-green-300">Lending Terms</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">• 30 days interest-free period</p>
                        <p className="text-muted-foreground">• 10-12% p.a. after 30 days</p>
                        <p className="text-muted-foreground">• Instant approval for emergencies</p>
                        <p className="text-muted-foreground">• No hidden charges</p>
                        <p className="text-muted-foreground">• Flexible repayment options</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-700 dark:text-red-300">Eligibility Criteria</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">• Minimum 100 Squirrels required</p>
                        <p className="text-muted-foreground">• Active Satitrah account for 30+ days</p>
                        <p className="text-muted-foreground">• No pending dues</p>
                        <p className="text-muted-foreground">• Valid KYC documents</p>
                        <p className="text-muted-foreground">• Age 18-65 years</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div className="space-y-2">
                      <CreditCard className="h-8 w-8 text-primary mx-auto" />
                      <h4 className="font-semibold text-sm">Microloans</h4>
                      <p className="text-xs text-muted-foreground">Quick access to funds</p>
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="space-y-2">
                      <Target className="h-8 w-8 text-green-500 mx-auto" />
                      <h4 className="font-semibold text-sm">Insurance Access</h4>
                      <p className="text-xs text-muted-foreground">Discounted premiums</p>
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="space-y-2">
                      <TrendingUp className="h-8 w-8 text-blue-500 mx-auto" />
                      <h4 className="font-semibold text-sm">Therapy Tools</h4>
                      <p className="text-xs text-muted-foreground">Mental health support</p>
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="space-y-2">
                      <Calculator className="h-8 w-8 text-purple-500 mx-auto" />
                      <h4 className="font-semibold text-sm">AI Coaching</h4>
                      <p className="text-xs text-muted-foreground">Personalized guidance</p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Squirrel Calculator */}
        <Card className="p-4 md:p-6 bg-accent/5 border-accent/20">
          <div className="space-y-4">
            <h4 className="font-semibold text-accent">Squirrel Earning Calculator</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Monthly Spending (₹)</label>
                <Input 
                  type="number"
                  value={monthlySpending}
                  onChange={(e) => setMonthlySpending(Number(e.target.value))}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">User Type</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant={userType === 'student' ? 'default' : 'outline'}
                    onClick={() => setUserType('student')}
                  >
                    Student
                  </Button>
                  <Button 
                    size="sm" 
                    variant={userType === 'professional' ? 'default' : 'outline'}
                    onClick={() => setUserType('professional')}
                  >
                    Professional
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Squirrels</p>
                  <p className="font-bold text-primary">{monthlySquirrelEarning}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Round-off Savings</p>
                  <p className="font-bold text-secondary">₹{roundOffSavings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Available Credit</p>
                  <p className="font-bold text-green-600">₹{lendableAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Yearly Squirrels</p>
                  <p className="font-bold text-purple-600">{monthlySquirrelEarning * 12}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SquirrelLending;