import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft, MoreHorizontal, Zap } from "lucide-react";
import { useState } from "react";

interface PremiumWalletCardProps {
  balance: number;
  availableBalance: number;
  currency?: string;
  cardNumber?: string;
}

export const PremiumWalletCard = ({ 
  balance, 
  availableBalance, 
  currency = "INR",
  cardNumber = "•••• •••• •••• 4829"
}: PremiumWalletCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Wallet Card */}
      <Card className="relative overflow-hidden bg-gradient-primary p-8 text-primary-foreground border-0 shadow-premium">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
        </div>
        
        {/* Card Header */}
        <div className="relative flex items-start justify-between mb-8">
          <div>
            <p className="text-sm opacity-80 font-medium">Satitrah Wallet</p>
            <p className="text-xs opacity-60 font-mono mt-1">{cardNumber}</p>
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
        <div className="relative mb-8">
          <p className="text-sm opacity-80 mb-2">Total Balance</p>
          <h1 className="text-4xl font-bold tracking-tight">
            {isBalanceVisible ? formatCurrency(balance) : "••••••••"}
          </h1>
          <p className="text-sm opacity-70 mt-2">
            Available: {isBalanceVisible ? formatCurrency(availableBalance) : "••••••"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="relative flex gap-3">
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm"
          >
            <Plus size={16} className="mr-2" />
            Add Money
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm"
          >
            <ArrowUpRight size={16} className="mr-2" />
            Send
          </Button>
          <Button 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-primary-foreground border-0 backdrop-blur-sm px-3"
          >
            <MoreHorizontal size={16} />
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
          <p className="text-lg font-bold text-foreground">$1,247</p>
          <p className="text-xs text-success">+2.3% today</p>
        </Card>
        
        <Card className="p-4 bg-card-elevated border-0 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">EUR</span>
            <Zap size={14} className="text-accent" />
          </div>
          <p className="text-lg font-bold text-foreground">€892</p>
          <p className="text-xs text-success">+1.8% today</p>
        </Card>
      </div>
    </div>
  );
};