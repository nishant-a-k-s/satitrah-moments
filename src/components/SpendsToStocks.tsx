import React, { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, TrendingUp, TrendingDown, Minus, Plus, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

export default function SpendsToStocks() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    amount: "",
    description: "",
  });
  const [spendHistory, setSpendHistory] = useState<SpendEntry[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEntry.amount || !manualEntry.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate product matching for now
      const simulatedSpend: SpendEntry = {
        id: Date.now().toString(),
        amount: parseFloat(manualEntry.amount),
        merchant_name: manualEntry.description,
        brand_detected: "Brand Detection Coming Soon",
        matched_company: "Company Match Coming Soon",
        matched_stock_symbol: "TBD",
        current_price: 0,
        yoy_change: Math.random() * 20 - 10,
        mom_change: Math.random() * 10 - 5,
        transaction_date: new Date().toISOString(),
      };

      setSpendHistory(prev => [simulatedSpend, ...prev]);

      toast({
        title: "Success",
        description: "Spending logged successfully",
      });

      // Reset form
      setManualEntry({ amount: "", description: "" });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      // Simulate OCR processing for now
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Success",
          description: "Receipt processed successfully (OCR simulation)",
        });
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    }
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
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

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
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Smart Spends-to-Stocks</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            Track your spending and discover investment opportunities in the companies you buy from
          </p>
        </div>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manual">Add Spend</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={manualEntry.amount}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="100"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">What did you buy?</Label>
                      <Input
                        id="description"
                        value={manualEntry.description}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="e.g., Coffee at Starbucks, Groceries at BigBasket"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isProcessing} className="w-full">
                      {isProcessing ? "Processing..." : "Add Spending"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Receipt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Take a photo or upload an image of your receipt for automatic processing
                    </p>
                    <div className="flex gap-4">
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
                        className="flex-1"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Camera",
                            description: "Camera functionality coming soon",
                          });
                        }}
                        disabled={isProcessing}
                        className="flex-1"
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
            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Companies where you spend frequently but haven't invested yet
                </p>
              </CardHeader>
              <CardContent>
                {opportunities.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Plus className="h-12 w-12 mx-auto mb-4" />
                    <p>No investment opportunities found yet</p>
                    <p className="text-sm">Start logging your spends to see suggestions!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{opportunity.company_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            You've spent {formatCurrency(opportunity.total_spent_amount)} here
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Suggested investment: {formatCurrency(opportunity.suggested_amount)}
                          </p>
                        </div>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Invest Now
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Spending vs Investment Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Insights into your spending patterns and investment alignment
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ArrowUpDown className="h-12 w-12 mx-auto mb-4" />
                  <p>Analytics dashboard coming soon!</p>
                  <p className="text-sm">We'll show sector-wise spending vs investment breakdown</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Spending History</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Timeline of your tracked spending and stock matches
                </p>
              </CardHeader>
              <CardContent>
                {spendHistory.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>No spending history found</p>
                    <p className="text-sm">Start by adding your first spend entry!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {spendHistory.map((entry) => (
                      <div key={entry.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{entry.merchant_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.transaction_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(entry.amount)}</p>
                          </div>
                        </div>
                        
                        {entry.matched_company && entry.matched_company !== "Company Match Coming Soon" && (
                          <div className="bg-muted/50 p-3 rounded mt-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{entry.matched_company}</p>
                                <p className="text-sm text-muted-foreground">
                                  {entry.matched_stock_symbol}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  {getChangeIcon(entry.yoy_change)}
                                  <span className="text-sm">{formatPercentage(entry.yoy_change)} YoY</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getChangeIcon(entry.mom_change)}
                                  <span className="text-sm">{formatPercentage(entry.mom_change)} MoM</span>
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