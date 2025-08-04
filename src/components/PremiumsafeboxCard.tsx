import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, ArrowUpRight, MoreHorizontal, Zap } from "lucide-react";
import { useState } from "react";
import { useSafeboxData } from "@/hooks/useSafeboxData";
import { useNavigate } from "react-router-dom";

interface PremiumsafeboxCardProps {
  className?: string;
}

export const PremiumsafeboxCard = ({ className }: PremiumsafeboxCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { Safebox: safeboxList = [], isLoading, getTotalBalance } = useSafeboxData();
  const navigate = useNavigate();
  
  const totalBalance = getTotalBalance();
  const safebox = safeboxList.find(w => w?.safebox_type === 'Safebox');
  const availableBalance = safebox?.balance || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card className="p-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-8 bg-muted rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 animate-fade-in ${className}`}>
      {/* Main Safebox Card */}
      <Card className="relative overflow-hidden bg-gradient-primary p-8 text-primary-foreground border-0 shadow-premium">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
        </div>
        
        {/* Card Header */}
        <div className="relative flex items-start justify-between mb-8">
          <div>
            <p className="text-sm opacity-80 font-medium">Satitrah Safebox</p>
            <p className="text-xs opacity-60 font-mono mt-1">•••• •••• •••• {safebox?.id?.slice(-4) || '0000'}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="text-primary-foreground hover:bg-white/10 p-2"
          >
            {isBalanceVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>

        {/* Balance Display */}
        <div className="relative mb-6">
          <p className="text-sm opacity-80 mb-2">Total Balance</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {isBalanceVisible ? (totalBalance > 0 ? formatCurrency(totalBalance) : "₹ --") : "••••••••"}
          </h1>
          <p className="text-sm opacity-70 mt-2">
            Available: {isBalanceVisible ? (availableBalance > 0 ? formatCurrency(availableBalance) : "₹ --") : "••••••"}
          </p>
        </div>

        {/* SatiSafe Savings Goal */}
        <div className="relative mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-primary-foreground mb-2">
            Safebox Savings Goal
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Progress</span>
              <span className="font-medium">--</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-xs opacity-70">
              <span>₹ --</span>
              <span>₹ --</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm text-xs"
            onClick={() => navigate('/add-money')}
          >
            <Plus size={14} className="mr-1" />
            Add Money
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm text-xs"
            onClick={() => navigate('/send-money')}
          >
            <ArrowUpRight size={14} className="mr-1" />
            Send
          </Button>
          <Button 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm px-2"
            onClick={() => navigate('/safebox')}
          >
            <MoreHorizontal size={14} />
          </Button>
        </div>
      </Card>

      {/* Multi-Currency Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-card-elevated border-0 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">USD</span>
            <Zap size={14} className="text-accent" />
          </div>
          <p className="text-lg font-bold text-foreground">$ --</p>
          <p className="text-xs text-muted-foreground">-- today</p>
        </Card>
        
        <Card className="p-4 bg-card-elevated border-0 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">EUR</span>
            <Zap size={14} className="text-accent" />
          </div>
          <p className="text-lg font-bold text-foreground">€ --</p>
          <p className="text-xs text-muted-foreground">-- today</p>
        </Card>
      </div>
    </div>
  );
};
