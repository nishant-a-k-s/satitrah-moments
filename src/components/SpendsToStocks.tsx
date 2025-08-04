import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSafeboxData } from "@/hooks/useSafeboxData"; // ✅ add this
import { 
  TrendingUp, 
  ArrowUpRight, 
  Camera,
  Upload,
  DollarSign,
  ShoppingCart,
  Eye,
  Plus,
  Star,
  Target,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export const SpendsToStocks = () => {
  const { 
    spendLogs,
    investmentStatus,
    loading, 
    logSpend,
    markInvestmentMade,
    processOCRText,
    getInvestmentOpportunities,
    getTotalSpendingByStock
  } = useSafeboxData(); // ✅ call the hook here
  
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [manualSpend, setManualSpend] = useState({
    amount: '',
    merchantName: '',
    brandDetected: '',
    productCategory: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Process OCR
      const { text, matches } = await processOCRText(file);
      
      if (matches.length > 0) {
        const match = matches[0];
        
        // Auto-populate spend log with OCR results
        await logSpend({
          amount: 850, // This would be extracted from OCR in production
          merchantName: match.brand_name,
          brandDetected: match.brand_name,
          detectionMethod: 'ocr',
          imageUrl: imageUrl,
          ocrText: text
        });

        toast({
          title: "OCR Processed",
          description: `Detected spending at ${match.brand_name}. Investment opportunity found!`
        });
      } else {
        toast({
          title: "OCR Processed",
          description: "Receipt processed but no investment opportunities detected"
        });
      }
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Failed to process the image",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSpendSubmit = async () => {
    if (!manualSpend.amount || !manualSpend.merchantName) {
      toast({
        title: "Missing information",
        description: "Please fill in amount and merchant name",
        variant: "destructive"
      });
      return;
    }

    await logSpend({
      amount: parseFloat(manualSpend.amount),
      merchantName: manualSpend.merchantName,
      brandDetected: manualSpend.brandDetected,
      productCategory: manualSpend.productCategory,
      detectionMethod: 'manual'
    });

    setManualSpend({
      amount: '',
      merchantName: '',
      brandDetected: '',
      productCategory: ''
    });
  };

  const investmentOpportunities = getInvestmentOpportunities();
  const spendingByStock = getTotalSpendingByStock();

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
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
            Upload receipts or log spending to discover investment opportunities
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload">Upload Receipt</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Upload Receipt Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Upload Receipt for OCR Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Take a photo or upload an image of your receipt to automatically detect spending patterns
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      // In a real app, this would open camera
                      toast({
                        title: "Camera",
                        description: "Camera functionality would open here"
                      });
                    }}
                    disabled={isProcessing}
                  >
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedImage && (
                  <div className="mt-4 text-center">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded receipt" 
                      className="max-w-xs mx-auto rounded-lg border"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {isProcessing ? "Processing..." : "Processed successfully"}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Log Spending Manually</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="₹850"
                    value={manualSpend.amount}
                    onChange={(e) => setManualSpend(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="merchant">Merchant/Brand *</Label>
                  <Input
                    id="merchant"
                    placeholder="Zomato, Amazon, etc."
                    value={manualSpend.merchantName}
                    onChange={(e) => setManualSpend(prev => ({ ...prev, merchantName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand Detected</Label>
                  <Input
                    id="brand"
                    placeholder="Specific brand if different"
                    value={manualSpend.brandDetected}
                    onChange={(e) => setManualSpend(prev => ({ ...prev, brandDetected: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Product Category</Label>
                  <Input
                    id="category"
                    placeholder="Food, Electronics, etc."
                    value={manualSpend.productCategory}
                    onChange={(e) => setManualSpend(prev => ({ ...prev, productCategory: e.target.value }))}
                  />
                </div>
              </div>
              <Button 
                className="mt-4" 
                onClick={handleManualSpendSubmit}
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Spending
              </Button>
            </Card>
          </TabsContent>

          {/* Investment Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            {investmentOpportunities.length === 0 ? (
              <Card className="p-8 text-center">
                <Lightbulb className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Investment Opportunities Yet</h3>
                <p className="text-muted-foreground">
                  Start logging your spending to see personalized investment suggestions
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investmentOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{opportunity.company_name}</h4>
                          <p className="text-xs text-muted-foreground">{opportunity.stock_symbol}</p>
                          <Badge className="text-xs mt-1">
                            Opportunity
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {formatCurrency(opportunity.total_spent_amount)}
                          </p>
                          <p className="text-xs text-muted-foreground">Total spent</p>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                        <p className="text-xs text-muted-foreground">Suggested investment</p>
                        <p className="font-semibold text-primary">
                          {formatCurrency(opportunity.suggested_amount || 0)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          10% of your spending
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => markInvestmentMade(opportunity.stock_symbol)}
                        >
                          <DollarSign className="h-3 w-3 mr-1" />
                          Invest Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Spending by Stock
                </h3>
                <div className="space-y-3">
                  {spendingByStock.slice(0, 5).map((item) => (
                    <div key={item.symbol} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{item.company}</p>
                        <p className="text-xs text-muted-foreground">{item.symbol}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.amount)}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Investment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Opportunities</span>
                    <span className="font-semibold">{investmentStatus.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investments Made</span>
                    <span className="font-semibold">
                      {investmentStatus.filter(s => s.investment_made).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        investmentStatus.reduce((sum, s) => sum + s.total_spent_amount, 0)
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            {spendLogs.length === 0 ? (
              <Card className="p-8 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Spending History</h3>
                <p className="text-muted-foreground">
                  Start logging your purchases to see your spending history here
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {spendLogs.map((log) => (
                  <Card key={log.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{log.merchant_name || log.brand_detected}</p>
                          <Badge variant="outline" className="text-xs">
                            {log.detection_method}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {log.product_category && `${log.product_category} • `}
                          {new Date(log.transaction_date).toLocaleDateString()}
                        </p>
                        {log.matched_company && (
                          <p className="text-xs text-primary">
                            → Investment opportunity: {log.matched_company}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(log.amount)}</p>
                        {log.matched_stock_symbol && (
                          <p className="text-xs text-muted-foreground">{log.matched_stock_symbol}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
