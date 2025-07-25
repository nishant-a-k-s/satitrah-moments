import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Download, 
  FileText, 
  Calendar as CalendarIcon, 
  Eye,
  Filter,
  Search
} from "lucide-react";

const Statements = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const monthlyStatements = [
    { month: 'December 2024', balance: '₹2,45,267', transactions: 45, size: '2.3 MB' },
    { month: 'November 2024', balance: '₹2,38,450', transactions: 52, size: '2.5 MB' },
    { month: 'October 2024', balance: '₹2,42,100', transactions: 48, size: '2.4 MB' },
    { month: 'September 2024', balance: '₹2,35,890', transactions: 41, size: '2.1 MB' },
    { month: 'August 2024', balance: '₹2,28,750', transactions: 39, size: '2.0 MB' },
    { month: 'July 2024', balance: '₹2,31,200', transactions: 44, size: '2.2 MB' }
  ];

  const recentTransactions = [
    { id: 1, date: '2024-12-24', description: 'Salary Credit', amount: '+₹65,000', type: 'credit' },
    { id: 2, date: '2024-12-23', description: 'Grocery Shopping - BigBasket', amount: '-₹2,450', type: 'debit' },
    { id: 3, date: '2024-12-23', description: 'UPI Transfer to Rahul', amount: '-₹500', type: 'debit' },
    { id: 4, date: '2024-12-22', description: 'Movie Tickets - BookMyShow', amount: '-₹800', type: 'debit' },
    { id: 5, date: '2024-12-22', description: 'Mobile Recharge', amount: '-₹599', type: 'debit' },
    { id: 6, date: '2024-12-21', description: 'Interest Credit', amount: '+₹234', type: 'credit' },
    { id: 7, date: '2024-12-21', description: 'Electricity Bill - BESCOM', amount: '-₹2,450', type: 'debit' },
    { id: 8, date: '2024-12-20', description: 'ATM Withdrawal', amount: '-₹5,000', type: 'debit' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Statements</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Download and view your transaction statements
          </p>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly Statements</TabsTrigger>
            <TabsTrigger value="custom">Custom Date Range</TabsTrigger>
            <TabsTrigger value="mini">Mini Statement</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Monthly Statements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monthlyStatements.map((statement, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-sm">{statement.month}</h4>
                            <p className="text-xs text-muted-foreground">Closing Balance</p>
                            <p className="text-sm font-medium text-primary">{statement.balance}</p>
                          </div>
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Transactions</span>
                            <span>{statement.transactions}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">File Size</span>
                            <span>{statement.size}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Custom Date Range Statement</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button className="flex-1" disabled={!startDate || !endDate}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate & Download Statement
                    </Button>
                    <Button variant="outline" disabled={!startDate || !endDate}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Statements can be generated for up to 1 year date range</p>
                    <p>• Processing time: 2-5 minutes for large date ranges</p>
                    <p>• Available formats: PDF, Excel</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mini" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Mini Statement</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last 10 transactions • Current balance: ₹2,45,267
                </div>
                
                <div className="space-y-2">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <p className="font-medium text-sm truncate">{transaction.description}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-sm ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Statement
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Mini Statement
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Statements;