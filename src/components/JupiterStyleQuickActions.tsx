import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode, 
  Smartphone,
  Zap,
  FileText,
  CreditCard,
  Coins,
  Baby,
  Shield,
  Target,
  Plane,
  Gift,
  TrendingUp,
  Users,
  MapPin,
  Bell,
  MoreHorizontal
} from "lucide-react";

export const JupiterStyleQuickActions = () => {
  const primaryActions = [
    { 
      icon: Plus, 
      label: "Add Money", 
      subtitle: "UPI, Cards, Bank",
      gradient: "bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20",
      iconColor: "text-primary"
    },
    { 
      icon: ArrowUpRight, 
      label: "Send Money", 
      subtitle: "To contacts, UPI",
      gradient: "bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20",
      iconColor: "text-accent"
    },
    { 
      icon: QrCode, 
      label: "Scan & Pay", 
      subtitle: "Quick payments",
      gradient: "bg-gradient-to-br from-secondary/20 to-secondary/10 hover:from-secondary/30 hover:to-secondary/20",
      iconColor: "text-secondary"
    },
    { 
      icon: ArrowDownLeft, 
      label: "Request", 
      subtitle: "Ask for money",
      gradient: "bg-gradient-to-br from-success/20 to-success/10 hover:from-success/30 hover:to-success/20",
      iconColor: "text-success"
    },
  ];

  const billsAndRecharge = [
    { icon: Smartphone, label: "Mobile Recharge", color: "text-primary" },
    { icon: Zap, label: "Electricity", color: "text-warning" },
    { icon: CreditCard, label: "Credit Card", color: "text-secondary" },
    { icon: FileText, label: "Broadband", color: "text-accent" },
  ];

  const specialFeatures = [
    { 
      icon: Shield, 
      label: "SOS Emergency", 
      subtitle: "Instant help",
      urgent: true,
      color: "text-destructive bg-destructive/10 hover:bg-destructive/20"
    },
    { 
      icon: Baby, 
      label: "Maternity Wallet", 
      subtitle: "Save for pregnancy",
      color: "text-secondary bg-secondary/10 hover:bg-secondary/20"
    },
    { 
      icon: Coins, 
      label: "Squirrel Lending", 
      subtitle: "Lend & earn",
      color: "text-accent bg-accent/10 hover:bg-accent/20"
    },
    { 
      icon: MapPin, 
      label: "Walk With Me", 
      subtitle: "Safe escort mode",
      color: "text-primary bg-primary/10 hover:bg-primary/20"
    },
  ];

  const investAndSave = [
    { icon: TrendingUp, label: "Investments", color: "text-success" },
    { icon: Target, label: "Goals", color: "text-primary" },
    { icon: Gift, label: "Rewards", color: "text-accent" },
    { icon: Plane, label: "Travel Card", color: "text-secondary" },
  ];

  const moreServices = [
    { icon: Users, label: "Split Bills", color: "text-muted-foreground" },
    { icon: Bell, label: "Reminders", color: "text-muted-foreground" },
    { icon: FileText, label: "Statements", color: "text-muted-foreground" },
    { icon: MoreHorizontal, label: "More", color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Money Actions */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action, index) => (
            <Button
              key={action.label}
              className={`
                h-auto py-6 px-4 flex-col gap-3 text-left justify-start relative
                ${action.gradient}
                border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg
              `}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <action.icon size={28} className={action.iconColor} />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Bills & Recharge */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Bills & Recharge</h3>
        <div className="grid grid-cols-4 gap-4">
          {billsAndRecharge.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              className="h-auto py-4 px-2 flex-col gap-2 bg-muted/30 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={24} className={action.color} />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Special Features */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Satitrah Special</h3>
        <div className="grid grid-cols-2 gap-4">
          {specialFeatures.map((action, index) => (
            <Button
              key={action.label}
              className={`
                h-auto py-4 px-4 flex-col gap-2 text-left justify-start relative
                ${action.color}
                transition-all duration-300 hover:scale-105
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

      {/* Invest & Save */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Invest & Save</h3>
        <div className="grid grid-cols-4 gap-4">
          {investAndSave.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              className="h-auto py-4 px-2 flex-col gap-2 bg-muted/30 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={24} className={action.color} />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* More Services */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">More Services</h3>
        <div className="grid grid-cols-4 gap-4">
          {moreServices.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              className="h-auto py-4 px-2 flex-col gap-2 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={24} className={action.color} />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};