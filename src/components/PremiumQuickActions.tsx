import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Baby, 
  Coins, 
  QrCode, 
  Smartphone,
  Zap,
  FileText,
  CreditCard,
  Target,
  Plane,
  Gift,
  TrendingUp
} from "lucide-react";

export const PremiumQuickActions = () => {
  const primaryActions = [
    { 
      icon: Shield, 
      label: "SOS Alert", 
      subtitle: "Emergency Help",
      color: "bg-destructive/10 hover:bg-destructive/20 text-destructive",
      urgent: true 
    },
    { 
      icon: QrCode, 
      label: "Scan & Pay", 
      subtitle: "Quick Payment",
      color: "bg-primary/10 hover:bg-primary/20 text-primary" 
    },
    { 
      icon: Baby, 
      label: "Maternity", 
      subtitle: "Health Savings",
      color: "bg-secondary/10 hover:bg-secondary/20 text-secondary" 
    },
    { 
      icon: Coins, 
      label: "Lend Money", 
      subtitle: "Earn Returns",
      color: "bg-accent/10 hover:bg-accent/20 text-accent" 
    },
  ];

  const secondaryActions = [
    { icon: Smartphone, label: "Recharge", color: "bg-muted hover:bg-muted/80" },
    { icon: Zap, label: "Bills", color: "bg-muted hover:bg-muted/80" },
    { icon: FileText, label: "Statements", color: "bg-muted hover:bg-muted/80" },
    { icon: CreditCard, label: "Cards", color: "bg-muted hover:bg-muted/80" },
    { icon: Target, label: "Goals", color: "bg-muted hover:bg-muted/80" },
    { icon: Plane, label: "Travel", color: "bg-muted hover:bg-muted/80" },
    { icon: Gift, label: "Rewards", color: "bg-muted hover:bg-muted/80" },
    { icon: TrendingUp, label: "Invest", color: "bg-muted hover:bg-muted/80" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Primary Actions */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action, index) => (
            <Button
              key={action.label}
              className={`
                h-auto py-6 px-4 flex-col gap-2 text-left justify-start relative
                ${action.color}
                transition-all duration-300 hover:scale-105 hover:shadow-lg
              `}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <action.icon size={24} />
                <div className="text-left">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs opacity-70">{action.subtitle}</p>
                </div>
              </div>
              {action.urgent && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* Secondary Actions */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">More Services</h3>
        <div className="grid grid-cols-4 gap-3">
          {secondaryActions.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              className={`
                h-auto py-4 px-2 flex-col gap-2
                ${action.color}
                hover:scale-105 transition-all duration-200
              `}
              style={{
                animationDelay: `${(index * 0.05) + 0.4}s`
              }}
            >
              <action.icon size={20} />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};