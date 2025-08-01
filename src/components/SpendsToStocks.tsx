import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Building2, 
  DollarSign,
  Plus,
  Eye,
  Target
} from "lucide-react";

interface StockMatch {
  merchantName: string;
  companyName: string;
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  transactionAmount: number;
  transactionDate: string;
}

interface StockWatchlistItem {
  id: string;
  company_name: string;
  symbol: string;
  price_at_addition: number;
  is_invested: boolean;
}

export const SpendsToStocks = () => {
  const [stockMatches, setStockMatches] = useState<StockMatch[]>([]);
  const [watchlist, setWatchlist] = useState<StockWatchlistItem[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockMatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStockMatches();
    fetchWatchlist();
  }, []);

  const fetchStockMatches = async () => {
    // For now, show mock data since we need to populate transactions with stock matches
    const mockMatches: StockMatch[] = [
      {
        merchantName: "Amazon",
        companyName: "Amazon Inc.",
        symbol: "AMZN",
        currentPrice: 3245.50,
        change: 45.25,
        changePercent: 1.4,
        transactionAmount: 1250,
        transactionDate: new Date().toISOString()
      },
      {
        merchantName: "Zomato",
        companyName: "Zomato Ltd",
        symbol: "ZOMATO.NS",
        currentPrice: 78.30,
        change: -2.15,
        changePercent: -2.7,
        transactionAmount: 450,
        transactionDate: new Date().toISOString()
      }
    ];
    
    setStockMatches(mockMatches);
    setIsLoading(false);
  };

  const fetchWatchlist = async () => {
    // Mock watchlist data for now
    const mockWatchlist: StockWatchlistItem[] = [];
    setWatchlist(mockWatchlist);
  };

  const addToWatchlist = async (stock: StockMatch) => {
    // Simulate adding to watchlist
    const newItem: StockWatchlistItem = {
      id: Date.now().toString(),
      company_name: stock.companyName,
      symbol: stock.symbol,
      price_at_addition: stock.currentPrice,
      is_invested: false
    };
    
    setWatchlist(prev => [...prev, newItem]);
    
    toast({
      title: "Added to watchlist",
      description: `${stock.companyName} added to your stock watchlist`,
    });
  };

  const simulateInvestment = (stock: StockMatch) => {
    setSelectedStock(stock);
    // In a real app, this would navigate to broker integration
    toast({
      title: "Investment simulated",
      description: `Investment of ₹${investmentAmount || 'amount'} in ${stock.companyName} would be processed`,
    });
    setInvestmentAmount("");
    setSelectedStock(null);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Spends-to-Stocks</h3>
            <p className="text-sm text-muted-foreground">
              Invest in companies where you spend
            </p>
          </div>
        </div>

        {stockMatches.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">No stock matches found</h4>
            <p className="text-sm text-muted-foreground">
              Start making transactions and we'll detect investable companies for you
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stockMatches.map((stock, index) => (
              <Card key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        You spent ₹{stock.transactionAmount.toLocaleString()} at {stock.merchantName}
                      </p>
                      <h4 className="font-semibold text-lg">{stock.companyName}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {stock.symbol}
                        </Badge>
                        <span className="text-sm font-medium">
                          ₹{stock.currentPrice.toFixed(2)}
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToWatchlist(stock)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Watch
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Investment amount"
                      value={selectedStock?.symbol === stock.symbol ? investmentAmount : ""}
                      onChange={(e) => {
                        setSelectedStock(stock);
                        setInvestmentAmount(e.target.value);
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => simulateInvestment(stock)}
                      disabled={!investmentAmount}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Invest
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {watchlist.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Your Stock Watchlist
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {watchlist.map((item) => (
              <Card key={item.id} className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.company_name}</p>
                    <p className="text-xs text-muted-foreground">{item.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{item.price_at_addition.toFixed(2)}</p>
                    {item.is_invested && (
                      <Badge variant="secondary" className="text-xs">Invested</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};