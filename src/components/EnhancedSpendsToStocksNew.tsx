import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Camera, 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Target,
  ArrowRight,
  Scan,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProductDetection } from "@/hooks/useProductDetection";

export default function EnhancedSpendsToStocksNew() {
  const [manualSpend, setManualSpend] = useState({
    amount: "",
    description: "",
    merchant: "",
    category: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { detectProductFromImage, logUserSpend, getStockData, loading } = useProductDetection();

  // Mock data with Indian companies and stock info
  const mockOpportunities = [
    {
      company: "Nestle India Limited",
      ticker: "NESTLEIND",
      totalSpent: 2850,
      suggestedInvestment: 5000,
      currentPrice: 2847.50,
      yoyChange: 12.5,
      momChange: 3.2,
      category: "Food & Beverages",
      logo: "🍫"
    },
    {
      company: "Tata Consumer Products",
      ticker: "TATACONSUM", 
      totalSpent: 1200,
      suggestedInvestment: 3000,
      currentPrice: 1024.30,
      yoyChange: 8.7,
      momChange: -1.5,
      category: "Consumer Goods",
      logo: "🧂"
    },
    {
      company: "Zomato Limited",
      ticker: "ZOMATO",
      totalSpent: 4500,
      suggestedInvestment: 8000,
      currentPrice: 267.80,
      yoyChange: 145.2,
      momChange: 12.8,
      category: "Food Delivery",
      logo: "🍕"
    }
  ];

  const mockSpendHistory = [
    {
      id: 1,
      date: "2024-01-15",
      product: "Maggi Noodles 2-Minute",
      amount: 45,
      merchant: "Big Bazaar",
      company: "Nestle India",
      ticker: "NESTLEIND",
      currentPrice: 2847.50,
      yoyChange: 12.5,
      momChange: 3.2,
      category: "Food"
    },
    {
      id: 2,
      date: "2024-01-14",
      product: "Tata Salt",
      amount: 25,
      merchant: "Local Store",
      company: "Tata Consumer Products",
      ticker: "TATACONSUM",
      currentPrice: 1024.30,
      yoyChange: 8.7,
      momChange: -1.5,
      category: "Grocery"
    },
    {
      id: 3,
      date: "2024-01-13",
      product: "Zomato Order",
      amount: 420,
      merchant: "Zomato",
      company: "Zomato Limited",
      ticker: "ZOMATO",
      currentPrice: 267.80,
      yoyChange: 145.2,
      momChange: 12.8,
      category: "Food Delivery"
    }
  ];

  const handleManualSpendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSpend.amount || !manualSpend.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and description",
        variant: "destructive",
      });
      return;
    }

    // Log the spend (demo)
    toast({
      title: "Spend Logged",
      description: `₹${manualSpend.amount} spend on ${manualSpend.description} recorded`,
    });

    // Reset form
    setManualSpend({ amount: "", description: "", merchant: "", category: "" });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload and OCR processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Simulate detected product
          toast({
            title: "Receipt Processed",
            description: "Detected: iPhone 15 Pro - ₹89,999 from Apple Store",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const detectedTexts = await detectProductFromImage(file);
      console.log('Detected texts:', detectedTexts);
    } catch (error) {
      console.error('OCR error:', error);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleInvestNow = (company: string, ticker: string) => {
    toast({
      title: "Redirecting to Investment",
      description: `Opening investment platform for ${company} (${ticker})`,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Spends to Stocks</h1>
        <p className="text-muted-foreground">
          Track your spending, discover investment opportunities in companies you already support
        </p>
      </div>

      <Tabs defaultValue="log-spend" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="log-spend">Log Spend</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Log Spend Tab */}
        <TabsContent value="log-spend" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Manual Entry */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Manual Entry
              </h3>
              <form onSubmit={handleManualSpendSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={manualSpend.amount}
                      onChange={(e) => setManualSpend({...manualSpend, amount: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={manualSpend.category} onValueChange={(value) => setManualSpend({...manualSpend, category: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food & Beverages</SelectItem>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Product/Service Description</label>
                  <Input
                    placeholder="e.g., iPhone 15 Pro, Maggi Noodles, Zomato Order"
                    value={manualSpend.description}
                    onChange={(e) => setManualSpend({...manualSpend, description: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Merchant/Store</label>
                  <Input
                    placeholder="e.g., Apple Store, Big Bazaar, Amazon"
                    value={manualSpend.merchant}
                    onChange={(e) => setManualSpend({...manualSpend, merchant: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  Log Spend
                </Button>
              </form>
            </Card>

            {/* Receipt Upload */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Receipt Upload
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-8">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload receipt images for automatic detection
                    </p>
                    <Button onClick={triggerFileUpload} variant="outline" className="mb-2">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, PDF
                    </p>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Scan className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Processing receipt...</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      {uploadProgress < 50 ? "Uploading..." : 
                       uploadProgress < 80 ? "Extracting text..." : 
                       "Matching products..."}
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid gap-6">
            {mockOpportunities.map((opportunity, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{opportunity.logo}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{opportunity.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.ticker} • {opportunity.category}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{opportunity.category}</Badge>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-card-elevated p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Your Spending</p>
                    <p className="text-lg font-semibold text-foreground">₹{opportunity.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-card-elevated p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-lg font-semibold text-foreground">₹{opportunity.currentPrice}</p>
                  </div>
                  <div className="bg-card-elevated p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">YoY Change</p>
                    <p className={`text-lg font-semibold flex items-center gap-1 ${
                      opportunity.yoyChange > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {opportunity.yoyChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {opportunity.yoyChange > 0 ? '+' : ''}{opportunity.yoyChange}%
                    </p>
                  </div>
                  <div className="bg-card-elevated p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">MoM Change</p>
                    <p className={`text-lg font-semibold flex items-center gap-1 ${
                      opportunity.momChange > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {opportunity.momChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {opportunity.momChange > 0 ? '+' : ''}{opportunity.momChange}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Suggested Investment</p>
                    <p className="text-lg font-semibold text-foreground">₹{opportunity.suggestedInvestment.toLocaleString()}</p>
                  </div>
                  <Button 
                    onClick={() => handleInvestNow(opportunity.company, opportunity.ticker)}
                    className="bg-gradient-primary"
                  >
                    Invest Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spending Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Food & Beverages</span>
                  <span className="font-semibold">₹5,200</span>
                </div>
                <Progress value={65} className="w-full" />
                
                <div className="flex justify-between items-center">
                  <span>Electronics</span>
                  <span className="font-semibold">₹2,800</span>
                </div>
                <Progress value={35} className="w-full" />
                
                <div className="flex justify-between items-center">
                  <span>Grocery</span>
                  <span className="font-semibold">₹1,200</span>
                </div>
                <Progress value={15} className="w-full" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Investment Alignment</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-card-elevated rounded-lg">
                  <div>
                    <p className="font-medium">Total Spending Tracked</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <p className="text-xl font-bold">₹8,550</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card-elevated rounded-lg">
                  <div>
                    <p className="font-medium">Investment Opportunities</p>
                    <p className="text-sm text-muted-foreground">Based on your spending</p>
                  </div>
                  <p className="text-xl font-bold text-primary">12</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card-elevated rounded-lg">
                  <div>
                    <p className="font-medium">Potential Returns</p>
                    <p className="text-sm text-muted-foreground">Average YoY growth</p>
                  </div>
                  <p className="text-xl font-bold text-green-500">+18.7%</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            {mockSpendHistory.map((spend) => (
              <Card key={spend.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IndianRupee className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{spend.product}</h4>
                      <p className="text-sm text-muted-foreground">
                        {spend.merchant} • {new Date(spend.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{spend.amount}</p>
                    <Badge variant="outline">{spend.category}</Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Mapped to: {spend.company}</p>
                      <p className="text-xs text-muted-foreground">{spend.ticker}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Current: ₹{spend.currentPrice}</p>
                      <p className={`text-xs flex items-center gap-1 ${
                        spend.yoyChange > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {spend.yoyChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {spend.yoyChange > 0 ? '+' : ''}{spend.yoyChange}% YoY
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}