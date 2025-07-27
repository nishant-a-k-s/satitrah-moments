import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Baby, 
  Heart, 
  Ambulance, 
  Users, 
  Target,
  TrendingUp,
  Calendar as CalendarIcon,
  Bell,
  Shield,
  Gift
} from "lucide-react";

const Maternity = () => {
  const [isPregnancyMode, setIsPregnancyMode] = useState(false);
  const [ambulanceBenefit, setAmbulanceBenefit] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const maternalStats = {
    currentBalance: 45000,
    targetAmount: 150000,
    monthlyContribution: 2000,
    squirrelPoints: 1250,
    weeksPregnant: 24
  };

  const progress = (maternalStats.currentBalance / maternalStats.targetAmount) * 100;

  const milestones = [
    { week: 12, title: "First Trimester Complete", reward: "₹500 bonus", status: "completed" },
    { week: 20, title: "Anatomy Scan", reward: "Health checkup voucher", status: "completed" },
    { week: 28, title: "Third Trimester", reward: "₹1000 bonus", status: "current" },
    { week: 36, title: "Final Preparations", reward: "Baby kit voucher", status: "upcoming" },
    { week: 40, title: "Delivery", reward: "₹5000 birth bonus", status: "upcoming" }
  ];

  const healthReminders = [
    { title: "Iron Supplement", time: "9:00 AM", status: "pending" },
    { title: "Prenatal Vitamins", time: "6:00 PM", status: "completed" },
    { title: "Doctor Appointment", time: "Tomorrow 2:00 PM", status: "upcoming" },
    { title: "Blood Test", time: "Next Week", status: "upcoming" }
  ];

  const expenses = [
    { category: "Medical", amount: 5500, percentage: 35 },
    { category: "Nutrition", amount: 3200, percentage: 25 },
    { category: "Baby Items", amount: 2800, percentage: 20 },
    { category: "Emergency Fund", amount: 3500, percentage: 20 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-pink-100 dark:bg-pink-950/20 rounded-full">
              <Baby className="h-12 w-12 text-pink-500" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Maternal Wallet</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            Your journey to motherhood, financially supported every step of the way
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 border-pink-200 dark:border-pink-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Wallet Balance</h3>
                  <p className="text-2xl font-bold text-pink-600">₹{maternalStats.currentBalance.toLocaleString()}</p>
                </div>
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to Goal</span>
                  <span className="font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{maternalStats.currentBalance.toLocaleString()}</span>
                  <span>₹{maternalStats.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Pregnancy Week</h3>
                  <p className="text-2xl font-bold text-blue-600">{maternalStats.weeksPregnant}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {40 - maternalStats.weeksPregnant} weeks remaining
                </p>
                <Progress value={(maternalStats.weeksPregnant / 40) * 100} className="h-2 mt-2" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Squirrel Points</h3>
                  <p className="text-2xl font-bold text-amber-600">{maternalStats.squirrelPoints}</p>
                </div>
                <Gift className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-investing to SatiSafe</p>
                <Badge variant="secondary" className="text-xs mt-1">Auto Active</Badge>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="pregnancy" className="text-xs md:text-sm">Pregnancy Mode</TabsTrigger>
            <TabsTrigger value="partner" className="text-xs md:text-sm">Joint Account</TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs md:text-sm">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expense Breakdown */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h3>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{expense.category}</span>
                        <span className="font-medium">₹{expense.amount} ({expense.percentage}%)</span>
                      </div>
                      <Progress value={expense.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Health Reminders */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Health Reminders</h3>
                  <Button size="sm" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Add Reminder
                  </Button>
                </div>
                <div className="space-y-3">
                  {healthReminders.map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{reminder.title}</h4>
                        <p className="text-xs text-muted-foreground">{reminder.time}</p>
                      </div>
                      <Badge 
                        variant={reminder.status === 'completed' ? 'default' : reminder.status === 'pending' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {reminder.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pregnancy Milestones */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pregnancy Milestones & Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {milestones.map((milestone, index) => (
                  <Card key={index} className={`p-4 ${
                    milestone.status === 'completed' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
                    milestone.status === 'current' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' :
                    'bg-muted/50'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={
                          milestone.status === 'completed' ? 'default' :
                          milestone.status === 'current' ? 'secondary' : 'outline'
                        } className="text-xs">
                          Week {milestone.week}
                        </Badge>
                        {milestone.status === 'completed' && <Shield className="h-4 w-4 text-green-500" />}
                      </div>
                      <h4 className="font-medium text-sm">{milestone.title}</h4>
                      <p className="text-xs text-muted-foreground">{milestone.reward}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pregnancy" className="space-y-4">
            <Card className="p-4 md:p-6 bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
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
            <Card className="p-4 md:p-6">
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
              <Card className="p-4 md:p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Subscribers</h4>
                  <p className="text-sm text-muted-foreground">
                    Get 80% of Wallet + Squirrel balance as free micro-loan for 60 days
                  </p>
                  <Badge variant="secondary" className="text-xs">Premium Feature</Badge>
                </div>
              </Card>
              
              <Card className="p-4 md:p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
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

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1">
            <TrendingUp className="h-4 w-4 mr-2" />
            Add Money
          </Button>
          <Button variant="outline" className="flex-1">
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Maternity;