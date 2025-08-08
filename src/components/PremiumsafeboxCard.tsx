import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, ArrowUpRight, MoreHorizontal, Zap } from "lucide-react";
import { useState } from "react";
import { useWalletData } from "@/hooks/useWalletData";
import { useNavigate } from "react-router-dom";

interface PremiumsafeboxCardProps {
  className?: string;
}

export const PremiumsafeboxCard = ({ className }: PremiumsafeboxCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const navigate = useNavigate();

  const { wallets, isLoading, getTotalBalance } = useWalletData();
  const safeboxData = wallets?.find(w => w.wallet_type === 'Ivy Safebox');

  const totalBalance = getTotalBalance?.() || 0;
  const availableBalance = safeboxData?.balance || 0;

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
    <div className={`space-y-3 md:space-y-4 animate-fade-in ${className}`}>
      {/* Main Ivy Safebox Card */}
      <Card className="relative overflow-hidden bg-gradient-primary p-4 md:p-8 text-primary-foreground border-0 shadow-premium">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
        </div>
        
        {/* Card Header */}
        <div className="relative flex items-start justify-between mb-4 md:mb-8">
          <div>
            <p className="text-xs md:text-sm opacity-80 font-medium">Ivy Safebox</p>
            <p className="text-[10px] md:text-xs opacity-60 font-mono mt-1">•••• •••• •••• {safeboxData?.id?.slice(-4) || '0000'}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="text-primary-foreground hover:bg-white/10 p-1.5 md:p-2"
          >
            {isBalanceVisible ? <EyeOff size={16} className="md:w-[18px] md:h-[18px]" /> : <Eye size={16} className="md:w-[18px] md:h-[18px]" />}
          </Button>
        </div>

        {/* Balance Display */}
        <div className="relative mb-4 md:mb-6">
          <p className="text-xs md:text-sm opacity-80 mb-1 md:mb-2">Total Balance</p>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {isBalanceVisible ? (totalBalance > 0 ? formatCurrency(totalBalance) : "₹ --") : "••••••••"}
          </h1>
          <p className="text-xs md:text-sm opacity-70 mt-1 md:mt-2">
            Available: {isBalanceVisible ? (availableBalance > 0 ? formatCurrency(availableBalance) : "₹ --") : "••••••"}
          </p>
        </div>

        {/* Ivy Savings Goal */}
        <div className="relative mb-4 md:mb-6 p-3 md:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <h2 className="text-sm md:text-lg font-semibold text-primary-foreground mb-2">
            Ivy Savings Goal
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span className="opacity-80">Progress</span>
              <span className="font-medium">--</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 md:h-2">
              <div className="bg-white h-1.5 md:h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] md:text-xs opacity-70">
              <span>₹ --</span>
              <span>₹ --</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm text-[10px] md:text-xs h-8 md:h-9"
            onClick={() => navigate('/add-money')}
          >
            <Plus size={12} className="mr-1 md:w-[14px] md:h-[14px]" />
            Add Money
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm text-[10px] md:text-xs h-8 md:h-9"
            onClick={() => navigate('/send-money')}
          >
            <ArrowUpRight size={12} className="mr-1 md:w-[14px] md:h-[14px]" />
            Send
          </Button>
          <Button 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm px-2 h-8 md:h-9"
            onClick={() => navigate('/safebox')}
          >
            <MoreHorizontal size={12} className="md:w-[14px] md:h-[14px]" />
          </Button>
        </div>
      </Card>

      {/* Multi-Currency Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Card className="p-3 md:p-4 bg-card-elevated border-0 shadow-card">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <span className="text-[10px] md:text-xs font-mono text-muted-foreground">USD</span>
            <Zap size={12} className="text-accent md:w-[14px] md:h-[14px]" />
          </div>
          <p className="text-sm md:text-lg font-bold text-foreground">$ --</p>
          <p className="text-[10px] md:text-xs text-muted-foreground">-- today</p>
        </Card>
        
        <Card className="p-3 md:p-4 bg-card-elevated border-0 shadow-card">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <span className="text-[10px] md:text-xs font-mono text-muted-foreground">EUR</span>
            <Zap size={12} className="text-accent md:w-[14px] md:h-[14px]" />
          </div>
          <p className="text-sm md:text-lg font-bold text-foreground">€ --</p>
          <p className="text-[10px] md:text-xs text-muted-foreground">-- today</p>
        </Card>
      </div>
    </div>
  );
};
