import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, Send, Smartphone } from "lucide-react";
import { useState } from "react";

interface WalletCardProps {
  balance: number;
  currency?: string;
}

export const WalletCard = ({ balance, currency = "INR" }: WalletCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-primary p-6 text-primary-foreground border-0 shadow-elegant animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-90">Total Balance</p>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              {isBalanceVisible ? formatCurrency(balance) : "••••••"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-primary-foreground hover:bg-white/10"
            >
              {isBalanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-75">Available</p>
          <p className="text-lg font-semibold">{formatCurrency(balance * 0.95)}</p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button variant="elevated" size="sm" className="flex-1">
          <Plus size={16} />
          Add Money
        </Button>
        <Button variant="elevated" size="sm" className="flex-1">
          <Send size={16} />
          Transfer
        </Button>
        <Button variant="elevated" size="sm" className="flex-1">
          <Smartphone size={16} />
          Pay
        </Button>
      </div>
    </Card>
  );
};