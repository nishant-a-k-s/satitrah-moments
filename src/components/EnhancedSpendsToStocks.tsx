import React, { useRef, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Plus, 
  ArrowUpDown,
  Target,
  PieChart,
  Clock,
  IndianRupee,
  Zap,
  Eye,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { supabase } from "@/integrations/supabase/client";

interface SpendEntry {
  id: string;
  amount: number;
  merchant_name: string;
  brand_detected: string;
  matched_company: string;
  matched_stock_symbol: string;
  current_price: number;
  yoy_change: number;
  mom_change: number;
  transaction_date: string;
  product_category?: string;
  confidence_score?: number;
}

interface InvestmentOpportunity {
  id: string;
  company_name: string;
  stock_symbol: string;
  total_spent_amount: number;
  suggested_amount: number;
  current_price: number;
  yoy_change: number;
  mom_change: number;
  category: string;
  confidence_score: number;
  spending_frequency: number;
}

export default function EnhancedSpendsToStocks() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useSimpleAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [manualEntry, setManualEntry] = useState({
    amount: "",
    description: "",
    merchant: "",
    category: ""
  });
  const [spendHistory, setSpendHistory] = useState<SpendEntry[]>([]);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [analytics, setAnalytics] = useState({
    totalSpent: 0,
    topCategories: [],
    investmentAlignment: 0
  });

  useEffect(() => {
    if (user?.id) {
      loadSpendHistory();
      loadOpportunities();
      loadAnalytics();
    }
  }, [user]);

  const loadSpendHistory = async () => {
    // Mock data for now since user_spend_logs table isn't in current schema
    const mockData: SpendEntry[] = [
      {
        id: '1',
        amount: 450,
        merchant_name: 'Starbucks Coffee',
        brand_detected: 'Starbucks',
        matched_company: 'Tata Consumer Products',
        matched_stock_symbol: 'TATACONSUM',
        current_price: 924.75,
        yoy_change: 15.3,
        mom_change: 2.8,
        transaction_date: new Date().toISOString(),
        product_category: 'Food & Dining',
        confidence_score: 0.85
      },
      {
        id: '2',
        amount: 1250,
        merchant_name: 'Amazon.in',
        brand_detected: 'Amazon',
        matched_company: 'Amazon (NASDAQ)',
        matched_stock_symbol: 'AMZN',
        current_price: 3456.20,
        yoy_change: -8.5,
        mom_change: 4.2,
        transaction_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        product_category: 'Shopping',
        confidence_score: 0.92
      }
    ];
    
    setSpendHistory(mockData);
  };

  const loadOpportunities = async () => {
    // Mock investment opportunities based on spending patterns
    const mockOpportunities: InvestmentOpportunity[] = [
      {
        id: '1',
        company_name: 'Reliance Industries',
        stock_symbol: 'RELIANCE',
        total_spent_amount: 15000,
        suggested_amount: 5000,
        current_price: 2456.75,
        yoy_change: 12.5,
        mom_change: 3.2,
        category: 'Retail & FMCG',
        confidence_score: 0.85,
        spending_frequency: 8
      },
      {
        id: '2',
        company_name: 'Tata Consultancy Services',
        stock_symbol: 'TCS',
        total_spent_amount: 8500,
        suggested_amount: 3000,
        current_price: 3789.20,
        yoy_change: 18.3,
        mom_change: 5.7,
        category: 'Technology',
        confidence_score: 0.78,
        spending_frequency: 5
      }
    ];
    setOpportunities(mockOpportunities);
  };

  const loadAnalytics = async () => {
    // Mock analytics data
    setAnalytics({
      totalSpent: 45000,
      topCategories: [
        { name: 'Food & Dining', amount: 18000, percentage: 40 },
        { name: 'Shopping', amount: 13500, percentage: 30 },
        { name: 'Transportation', amount: 9000, percentage: 20 },
        { name: 'Entertainment', amount: 4500, percentage: 10 }
      ],
      investmentAlignment: 35
    });
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEntry.amount || !manualEntry.description) {
      toast({
        title: "Error",
        description: "Please fill in amount and description",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // For now, just create a mock entry since user_spend_logs table isn't in current schema
      const newEntry: SpendEntry = {
        id: Date.now().toString(),
        amount: parseFloat(manualEntry.amount),
        merchant_name: manualEntry.merchant || manualEntry.description,
        brand_detected: 'Processing...',
        matched_company: 'Analyzing...',
        matched_stock_symbol: 'TBD',
        current_price: Math.random() * 3000 + 500,
        yoy_change: Math.random() * 30 - 15,
        mom_change: Math.random() * 15 - 7.5,
        transaction_date: new Date().toISOString(),
        product_category: manualEntry.category,
        confidence_score: Math.random() * 0.3 + 0.7
      };

      // Simulate brand detection and stock matching
      await simulateProcessing();

      toast({
        title: "Success",
        description: "Spending logged successfully. Processing brand detection...",
      });

      // Add to history and reset form
      setSpendHistory(prev => [newEntry, ...prev]);
      setManualEntry({ amount: "", description: "", merchant: "", category: "" });
      await loadOpportunities();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to log spending",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setOcrProgress(0);
    
    try {
      // Simulate OCR processing with progress
      const progressInterval = setInterval(() => {
        setOcrProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate API call for OCR
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setOcrProgress(100);

      // Mock extracted data
      const extractedData = {
        amount: Math.floor(Math.random() * 500) + 50,
        merchant: ['Starbucks', 'McDonald\'s', 'BigBasket', 'Amazon', 'Flipkart'][Math.floor(Math.random() * 5)],
        category: ['Food & Dining', 'Shopping', 'Groceries'][Math.floor(Math.random() * 3)]
      };

      // Create OCR result entry
      const newEntry: SpendEntry = {
        id: Date.now().toString(),
        amount: extractedData.amount,
        merchant_name: extractedData.merchant,
        brand_detected: extractedData.merchant,
        matched_company: 'Processing...',
        matched_stock_symbol: 'TBD',
        current_price: Math.random() * 3000 + 500,
        yoy_change: Math.random() * 30 - 15,
        mom_change: Math.random() * 15 - 7.5,
        transaction_date: new Date().toISOString(),
        product_category: extractedData.category,
        confidence_score: Math.random() * 0.3 + 0.7
      };
      
      setSpendHistory(prev => [newEntry, ...prev]);

      toast({
        title: "Success",
        description: `Receipt processed! Found: ${extractedData.merchant} - ₹${extractedData.amount}`,
      });

      // Data already updated above
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process receipt",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const simulateProcessing = async () => {
    // Simulate brand detection and stock matching delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getChangeIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const handleInvestNow = (opportunity: InvestmentOpportunity) => {
    toast({
      title: "Investment Integration",
      description: "Broker API integration coming soon! This will connect to Zerodha Kite or other broker APIs.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 md:space-y-4">
          <div className="flex justify-center">
            <div className="p-3 md:p-4 bg-gradient-primary rounded-full shadow-glow-primary">
              <TrendingUp className="h-8 w-8 md:h-12 md:w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-foreground">Smart Spends-to-Stocks</h1>
          <p className="text-xs md:text-base text-muted-foreground px-4">
            AI-powered spending tracker that discovers investment opportunities in companies you buy from
          </p>
        </div>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-4 text-xs md:text-sm">
            <TabsTrigger value="manual" className="px-2 md:px-3">Log Spend</TabsTrigger>
            <TabsTrigger value="opportunities" className="px-2 md:px-3">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics" className="px-2 md:px-3">Analytics</TabsTrigger>
            <TabsTrigger value="history" className="px-2 md:px-3">History</TabsTrigger>
          </TabsList>

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Plus className="h-5 w-5 text-primary" />
                    Manual Entry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium">Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={manualEntry.amount}
                          onChange={(e) => setManualEntry(prev => ({ ...prev, amount: e.target.value }))}
                          placeholder="500"
                          className="text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                        <Input
                          id="category"
                          value={manualEntry.category}
                          onChange={(e) => setManualEntry(prev => ({ ...prev, category: e.target.value }))}
                          placeholder="Food & Dining"
                          className="text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">What did you buy?</Label>
                      <Input
                        id="description"
                        value={manualEntry.description}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Coffee at Starbucks, iPhone from Apple Store"
                        className="text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="merchant" className="text-sm font-medium">Merchant (Optional)</Label>
                      <Input
                        id="merchant"
                        value={manualEntry.merchant}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, merchant: e.target.value }))}
                        placeholder="Starbucks, Amazon, etc."
                        className="text-base"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isProcessing} 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      {isProcessing ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Log Spending
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Camera className="h-5 w-5 text-primary" />
                    Receipt Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload receipt images for automatic OCR processing with Google Vision API
                    </p>
                    
                    {isProcessing && ocrProgress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing receipt...</span>
                          <span>{Math.round(ocrProgress)}%</span>
                        </div>
                        <Progress value={ocrProgress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        disabled={isProcessing}
                        className="h-12"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Receipt
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Camera",
                            description: "Camera integration coming soon with live receipt scanning",
                          });
                        }}
                        disabled={isProcessing}
                        className="h-12"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Investment Opportunities
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  NSE/BSE listed companies where you spend frequently but haven't invested yet
                </p>
              </CardHeader>
              <CardContent>
                {opportunities.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No opportunities found yet</p>
                    <p className="text-sm">Start logging your spends to see AI-powered investment suggestions!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="p-4 md:p-6 border rounded-lg bg-card-elevated shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{opportunity.company_name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {opportunity.stock_symbol}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {opportunity.category}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Total Spent</p>
                                <p className="font-semibold text-primary">{formatCurrency(opportunity.total_spent_amount)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Suggested Investment</p>
                                <p className="font-semibold">{formatCurrency(opportunity.suggested_amount)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Current Price</p>
                                <p className="font-semibold">{formatCurrency(opportunity.current_price)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">YoY Change</p>
                                <div className="flex items-center gap-1">
                                  {getChangeIcon(opportunity.yoy_change)}
                                  <span className={`font-semibold ${opportunity.yoy_change > 0 ? 'text-success' : 'text-destructive'}`}>
                                    {formatPercentage(opportunity.yoy_change)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Confidence: {Math.round(opportunity.confidence_score * 100)}%</span>
                              <span>Spending Frequency: {opportunity.spending_frequency} times/month</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                            <Button
                              onClick={() => handleInvestNow(opportunity)}
                              className="bg-gradient-primary hover:opacity-90 flex items-center gap-2"
                            >
                              <IndianRupee className="h-4 w-4" />
                              Invest Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Spending Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{formatCurrency(analytics.totalSpent)}</p>
                      <p className="text-sm text-muted-foreground">Total tracked spending</p>
                    </div>
                    
                    <div className="space-y-3">
                      {analytics.topCategories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{category.name}</span>
                            <span>{formatCurrency(category.amount)}</span>
                          </div>
                          <Progress value={category.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5 text-primary" />
                    Investment Alignment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{analytics.investmentAlignment}%</p>
                      <p className="text-sm text-muted-foreground">Spending-Investment alignment score</p>
                    </div>
                    
                    <Progress value={analytics.investmentAlignment} className="h-3" />
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        This score measures how well your investments align with your spending patterns.
                      </p>
                      <div className="space-y-1">
                        <p>• 40% of spending in FMCG sector</p>
                        <p>• 15% of portfolio in FMCG stocks</p>
                        <p className="text-primary">→ Consider increasing FMCG allocation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Spending History
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  AI-matched spending history with real-time stock data
                </p>
              </CardHeader>
              <CardContent>
                {spendHistory.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No spending history found</p>
                    <p className="text-sm">Start by logging your first purchase!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {spendHistory.map((entry) => (
                      <div key={entry.id} className="p-4 border rounded-lg bg-card-elevated shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{entry.merchant_name}</h3>
                              {entry.confidence_score && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(entry.confidence_score * 100)}% match
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.transaction_date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">{formatCurrency(entry.amount)}</p>
                            {entry.product_category && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {entry.product_category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {entry.matched_company && entry.matched_company !== "Matching..." && (
                          <div className="bg-muted/30 p-3 rounded-md mt-3">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-success" />
                                  <p className="font-medium">{entry.matched_company}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {entry.matched_stock_symbol} • {formatCurrency(entry.current_price)}
                                </p>
                              </div>
                              
                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  {getChangeIcon(entry.yoy_change)}
                                  <span className={`font-medium ${entry.yoy_change > 0 ? 'text-success' : 'text-destructive'}`}>
                                    {formatPercentage(entry.yoy_change)} YoY
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {getChangeIcon(entry.mom_change)}
                                  <span className={`font-medium ${entry.mom_change > 0 ? 'text-success' : 'text-destructive'}`}>
                                    {formatPercentage(entry.mom_change)} MoM
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}