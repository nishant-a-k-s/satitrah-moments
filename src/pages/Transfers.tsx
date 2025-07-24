import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft, Send, QrCode, Plus, Minus, TrendingUp, Gift, Search, Filter } from "lucide-react";

const Transfers = () => {
  const [activeTab, setActiveTab] = useState("history");

  const transactionHistory = [
    { id: 1, type: "sent", amount: 500, to: "Rahul", date: "Today, 2:30 PM", squirrels: 0 },
    { id: 2, type: "received", amount: 1200, from: "Salary", date: "Yesterday, 9:00 AM", squirrels: 12 },
    { id: 3, type: "sent", amount: 250, to: "Coffee Shop", date: "Yesterday, 4:15 PM", squirrels: 0 },
    { id: 4, type: "sent", amount: 800, to: "Grocery Store", date: "2 days ago", squirrels: 0 },
    { id: 5, type: "sent", amount: 1500, to: "Rent Payment", date: "3 days ago", squirrels: 15 },
  ];

  const squirrelStats = {
    total: 145,
    lendable: 116, // 80% of total
    borrowed: 0,
    lent: 29
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <ArrowRightLeft className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Transfers & Spending</h1>
          <p className="text-muted-foreground">Track your spending and earn Squirrel rewards</p>
        </div>

        {/* Squirrel Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">🐿️ Squirrel Balance</h3>
            <Badge variant="secondary">{squirrelStats.total} Squirrels</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{squirrelStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{squirrelStats.lendable}</p>
              <p className="text-sm text-muted-foreground">Lendable (80%)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">{squirrelStats.lent}</p>
              <p className="text-sm text-muted-foreground">Currently Lent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{squirrelStats.borrowed}</p>
              <p className="text-sm text-muted-foreground">Borrowed</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-card rounded-lg">
            <h4 className="font-semibold mb-2">How to Earn Squirrels:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Students</Badge>
                <span>Every ₹1,000 spent = 10 Squirrels</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Professionals</Badge>
                <span>Every ₹1,000 spent = 100 Squirrels</span>
              </div>
              <p className="text-muted-foreground mt-2">
                80% of earned Squirrels can be lent for free for 45 days
              </p>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Send Money</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
            <TabsTrigger value="squirrel">Squirrel Lending</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Send Money</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Send className="h-6 w-6" />
                  <span>To Contact</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <QrCode className="h-6 w-6" />
                  <span>Scan QR</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <ArrowRightLeft className="h-6 w-6" />
                  <span>UPI ID</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input placeholder="Enter amount" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Note (Optional)</label>
                  <Input placeholder="Add a note" />
                </div>
                <Button className="w-full">Send Money</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Transaction History</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {transactionHistory.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'sent' 
                          ? 'bg-red-100 dark:bg-red-900/20' 
                          : 'bg-green-100 dark:bg-green-900/20'
                      }`}>
                        {transaction.type === 'sent' 
                          ? <Minus className="h-4 w-4 text-red-600 dark:text-red-400" />
                          : <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'sent' 
                            ? `Sent to ${transaction.to}` 
                            : `Received from ${transaction.from}`
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'sent' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                      </p>
                      {transaction.squirrels > 0 && (
                        <p className="text-xs text-accent">+{transaction.squirrels} 🐿️</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="squirrel" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Squirrel Lending</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Lend Squirrels
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lend your Squirrels to help others and earn good karma
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Amount to Lend</label>
                      <Input placeholder="Max: 116 Squirrels" type="number" />
                    </div>
                    <Button className="w-full">Lend Squirrels</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-blue-500" />
                    Borrow Squirrels
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need help? Borrow Squirrels for 45 days, free of interest
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Amount Needed</label>
                      <Input placeholder="Enter amount" type="number" />
                    </div>
                    <Button variant="outline" className="w-full">Request Squirrels</Button>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2">🏆 Top Squirrels Leaderboard</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1. Ravi Kumar</span>
                    <span>2,450 🐿️</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2. Priya Sharma</span>
                    <span>1,890 🐿️</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3. Arjun Patel</span>
                    <span>1,650 🐿️</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transfers;