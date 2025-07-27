import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Zap, 
  Smartphone, 
  Car, 
  Home, 
  Calendar,
  Bell,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  QrCode
} from "lucide-react";

const PayBills = () => {
  const [selectedBill, setSelectedBill] = useState<string | null>(null);

  const billCategories = [
    {
      id: 'utilities',
      name: 'Utilities',
      icon: Zap,
      color: 'text-yellow-500',
      bills: [
        { name: 'Electricity', provider: 'BESCOM', amount: 2450, dueDate: '25 Jan', autopay: true },
        { name: 'Gas', provider: 'Indane Gas', amount: 850, dueDate: '28 Jan', autopay: false },
        { name: 'Water', provider: 'BWSSB', amount: 680, dueDate: '30 Jan', autopay: true }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile & Internet',
      icon: Smartphone,
      color: 'text-blue-500',
      bills: [
        { name: 'Mobile Postpaid', provider: 'Airtel', amount: 599, dueDate: '22 Jan', autopay: true },
        { name: 'Broadband', provider: 'Jio Fiber', amount: 799, dueDate: '15 Jan', autopay: true },
        { name: 'Mobile Prepaid', provider: 'Vi', amount: 0, dueDate: 'Top-up', autopay: false }
      ]
    },
    {
      id: 'insurance',
      name: 'Insurance & EMI',
      icon: CreditCard,
      color: 'text-green-500',
      bills: [
        { name: 'Car Insurance', provider: 'HDFC ERGO', amount: 15000, dueDate: '10 Feb', autopay: false },
        { name: 'Home Loan EMI', provider: 'SBI', amount: 45000, dueDate: '5 Jan', autopay: true },
        { name: 'Personal Loan', provider: 'ICICI Bank', amount: 8500, dueDate: '12 Jan', autopay: true }
      ]
    },
    {
      id: 'transport',
      name: 'Transport',
      icon: Car,
      color: 'text-purple-500',
      bills: [
        { name: 'Metro Card', provider: 'BMRCL', amount: 0, dueDate: 'Recharge', autopay: false },
        { name: 'FASTag', provider: 'Paytm', amount: 500, dueDate: 'Low Balance', autopay: true }
      ]
    }
  ];

  const upcomingBills = billCategories
    .flatMap(category => 
      category.bills.map(bill => ({ ...bill, category: category.name, categoryColor: category.color }))
    )
    .filter(bill => bill.amount > 0)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const subscriptions = [
    { name: 'Netflix', amount: 799, nextBilling: '15 Jan', status: 'active', icon: '🎬' },
    { name: 'Spotify', amount: 119, nextBilling: '20 Jan', status: 'active', icon: '🎵' },
    { name: 'Amazon Prime', amount: 1499, nextBilling: '8 Feb', status: 'active', icon: '📦' },
    { name: 'Swiggy One', amount: 299, nextBilling: '25 Jan', status: 'paused', icon: '🍽️' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <CreditCard className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Pay Bills</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage all your bill payments and subscriptions in one place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">{upcomingBills.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming Bills</p>
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-500">₹{upcomingBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-500">{billCategories.flatMap(c => c.bills).filter(b => b.autopay).length}</p>
              <p className="text-xs text-muted-foreground">Auto-pay On</p>
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-orange-500">{subscriptions.filter(s => s.status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">Active Subscriptions</p>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="bills" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="qr-pay">QR Pay</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="bills" className="space-y-6">
            {/* Bill Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {billCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.id} className="p-4 md:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                          <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {category.bills.map((bill, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm truncate">{bill.name}</h4>
                                {bill.autopay && (
                                  <Badge variant="secondary" className="text-xs">Auto</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{bill.provider}</p>
                              <p className="text-xs text-muted-foreground">Due: {bill.dueDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">
                                {bill.amount > 0 ? `₹${bill.amount}` : bill.dueDate}
                              </p>
                              <Button size="sm" variant="outline" className="text-xs mt-1">
                                {bill.amount > 0 ? 'Pay' : 'Recharge'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Bill
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="qr-pay" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QR Scanner */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                      <QrCode className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Scan QR Code</h3>
                  </div>
                  <div className="aspect-square max-w-64 mx-auto bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-2">
                      <QrCode className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Camera will open here</p>
                      <Button size="sm">Open Camera</Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Or enter UPI ID manually</p>
                    <Input placeholder="example@upi" className="text-center" />
                  </div>
                </div>
              </Card>

              {/* Recent QR Payments */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent QR Payments</h3>
                  <div className="space-y-3">
                    {[
                      { merchant: "Starbucks Coffee", amount: 385, date: "Today" },
                      { merchant: "Metro Station", amount: 45, date: "Yesterday" },
                      { merchant: "Local Grocery", amount: 1250, date: "2 days ago" },
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{payment.merchant}</h4>
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">₹{payment.amount}</p>
                          <Button size="sm" variant="outline" className="text-xs mt-1">
                            Pay Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Active Subscriptions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptions.map((sub, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{sub.icon}</div>
                          <div>
                            <h4 className="font-medium text-sm">{sub.name}</h4>
                            <p className="text-xs text-muted-foreground">₹{sub.amount}/month</p>
                            <p className="text-xs text-muted-foreground">Next: {sub.nextBilling}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge 
                            variant={sub.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {sub.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="text-xs px-2">
                              {sub.status === 'active' ? 'Pause' : 'Resume'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subscription
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Upcoming Bills</h3>
                  <Button size="sm" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {upcomingBills.map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <div>
                          <h4 className="font-medium text-sm">{bill.name}</h4>
                          <p className="text-xs text-muted-foreground">{bill.provider} • {bill.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">₹{bill.amount}</p>
                        <p className="text-xs text-muted-foreground">Due {bill.dueDate}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {bill.autopay ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-orange-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {bill.autopay ? 'Auto-pay' : 'Manual'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full">
                  Pay All Upcoming Bills
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PayBills;