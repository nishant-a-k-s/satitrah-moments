import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  DollarSign, 
  Search,
  Plus,
  Star,
  Activity,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface StockMatch {
  id: string;
  companyName: string;
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  sector: string;
  transactionAmount: number;
  transactionDate: string;
  merchantName: string;
}

interface WatchlistItem {
  id: string;
  companyName: string;
  symbol: string;
  priceAtAddition: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export const SpendsToStocks = () => {
  const [stockMatches, setStockMatches] = useState<StockMatch[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedStock, setSelectedStock] = useState<StockMatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStockMatches();
    fetchWatchlist();
  }, []);

  const fetchStockMatches = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Get user's transactions with stock matches
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select(`
          *,
          wallets!inner(user_id)
        `)
        .eq('wallets.user_id', user.user.id)
        .not('matched_stock_symbol', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      const matches: StockMatch[] = transactions?.map(transaction => ({
        id: transaction.id,
        companyName: transaction.matched_company_name || 'Unknown Company',
        symbol: transaction.matched_stock_symbol || '',
        currentPrice: Number(transaction.current_stock_price) || 0,
        change: Math.random() * 100 - 50, // Mock change
        changePercent: (Math.random() * 10 - 5), // Mock change percent
        sector: 'Technology', // This would come from company_stocks table
        transactionAmount: Number(transaction.amount),
        transactionDate: transaction.created_at,
        merchantName: transaction.merchant_name || 'Unknown Merchant'
      })) || [];

      setStockMatches(matches);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data: watchlistData, error } = await supabase
        .from('stock_watchlist')
        .select('*')
        .eq('user_id', user.user.id);

      if (error) {
        console.error('Error fetching watchlist:', error);
        return;
      }

      const watchlistItems: WatchlistItem[] = watchlistData?.map(item => ({
        id: item.id,
        companyName: item.company_name,
        symbol: item.symbol,
        priceAtAddition: Number(item.price_at_addition) || 0,
        currentPrice: Number(item.price_at_addition) * (1 + (Math.random() * 0.2 - 0.1)), // Mock current price
        change: 0,
        changePercent: 0
      })) || [];

      // Calculate changes
      watchlistItems.forEach(item => {
        item.change = item.currentPrice - item.priceAtAddition;
        item.changePercent = (item.change / item.priceAtAddition) * 100;
      });

      setWatchlist(watchlistItems);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addToWatchlist = async (stock: StockMatch) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { error } = await supabase
        .from('stock_watchlist')
        .insert({
          user_id: user.user.id,
          company_name: stock.companyName,
          symbol: stock.symbol,
          price_at_addition: stock.currentPrice
        });

      if (error) {
        console.error('Error adding to watchlist:', error);
        toast({
          title: "Error",
          description: "Failed to add stock to watchlist",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Added to Watchlist",
        description: `${stock.companyName} has been added to your watchlist`,
      });

      fetchWatchlist(); // Refresh watchlist
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const simulateInvestment = (stock: StockMatch) => {
    const amount = parseFloat(investmentAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }

    const shares = amount / stock.currentPrice;
    toast({
      title: "Investment Simulation",
      description: `₹${amount} would buy ${shares.toFixed(4)} shares of ${stock.companyName}`,
    });
  };

  const filteredStocks = stockMatches.filter(stock =>
    stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Spends to Stocks</h1>
          </div>
          
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Spends to Stocks</h1>
              <p className="text-muted-foreground">Discover investment opportunities from your spending</p>
            </div>
          </div>
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search stocks, companies, or merchants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Investment Amount Input */}
        <Card className="p-4 bg-gradient-primary border-0">
          <div className="flex items-center gap-4">
            <DollarSign className="h-6 w-6 text-primary-foreground" />
            <div className="flex-1">
              <label className="text-sm font-medium text-primary-foreground">Investment Amount</label>
              <Input
                type="number"
                placeholder="Enter amount to invest"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>
          </div>
        </Card>

        {/* Stock Matches */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Your Spending Matches
          </h2>
          
          {filteredStocks.length === 0 ? (
            <Card className="p-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Stock Matches Found</h3>
              <p className="text-muted-foreground">
                Start making purchases to see stock investment opportunities based on your spending
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredStocks.map((stock) => (
                <Card key={stock.id} className="p-4 hover:shadow-card transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{stock.companyName}</h3>
                          <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                        </div>
                        <Badge variant="secondary">{stock.sector}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">You spent</p>
                          <p className="font-semibold text-foreground">₹{stock.transactionAmount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">At {stock.merchantName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(stock.transactionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Price</p>
                          <p className="font-semibold text-foreground">₹{stock.currentPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm font-medium ${
                            stock.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToWatchlist(stock)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Watch
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedStock(stock);
                          simulateInvestment(stock);
                        }}
                        className="flex items-center gap-2"
                        disabled={!investmentAmount}
                      >
                        <Plus className="h-4 w-4" />
                        Invest
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Watchlist */}
        {watchlist.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Star className="h-5 w-5" />
              Your Stock Watchlist
            </h2>
            
            <div className="grid gap-4">
              {watchlist.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{item.symbol}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-semibold text-foreground">₹{item.currentPrice.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            Added at ₹{item.priceAtAddition.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm font-medium ${
                            item.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};