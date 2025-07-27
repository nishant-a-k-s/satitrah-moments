import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
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
  ShieldCheck,
  Target,
  Plane,
  Gift,
  TrendingUp,
  Users,
  MapPin,
  Bell,
  MoreHorizontal,
  Shield
} from "lucide-react";

export const JupiterStyleQuickActions = () => {
  const navigate = useNavigate();
  const primaryActions = [
    { 
      icon: Plus, 
      label: "Add Money", 
      subtitle: "UPI, Cards, Bank",
      gradient: "bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20",
      iconColor: "text-primary",
      route: "/add-money"
    },
    { 
      icon: ArrowUpRight, 
      label: "Send Money", 
      subtitle: "To contacts, UPI",
      gradient: "bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20",
      iconColor: "text-accent",
      route: "/send-money"
    },
    { 
      icon: QrCode, 
      label: "Scan & Pay", 
      subtitle: "Quick payments",
      gradient: "bg-gradient-to-br from-secondary/20 to-secondary/10 hover:from-secondary/30 hover:to-secondary/20",
      iconColor: "text-secondary",
      route: "/qr-scanner"
    },
    { 
      icon: ArrowDownLeft, 
      label: "Request", 
      subtitle: "Ask for money",
      gradient: "bg-gradient-to-br from-success/20 to-success/10 hover:from-success/30 hover:to-success/20",
      iconColor: "text-success",
      route: "/request-money"
    },
  ];

  const billsAndRecharge = [
    { icon: Smartphone, label: "Mobile Recharge", color: "text-primary", route: "/recharge" },
    { icon: Zap, label: "Electricity", color: "text-warning", route: "/bills" },
    { icon: CreditCard, label: "Credit Card", color: "text-secondary", route: "/bills" },
    { icon: FileText, label: "Broadband", color: "text-accent", route: "/bills" },
  ];

  const specialFeatures = [
    { 
      icon: ShieldCheck, 
      label: "SatiSafe Wallet", 
      subtitle: "Emergency & safety",
      color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30",
      route: "/satisafe"
    },
    { 
      icon: Coins, 
      label: "Squirrel Lending", 
      subtitle: "Lend & earn",
      color: "text-accent bg-accent/10 hover:bg-accent/20",
      route: "/lending"
    },
    { 
      icon: TrendingUp, 
      label: "Auto Invest", 
      subtitle: "Smart savings",
      color: "text-success bg-success/10 hover:bg-success/20",
      route: "/investments"
    },
    { 
      icon: Gift, 
      label: "Rewards", 
      subtitle: "Earn & redeem",
      color: "text-primary bg-primary/10 hover:bg-primary/20",
      route: "/profile"
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
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {primaryActions.map((action, index) => (
            <Button
              key={action.label}
              onClick={() => action.route && navigate(action.route)}
              className={`
                h-auto py-4 md:py-6 px-3 md:px-4 flex-col gap-2 md:gap-3 text-left justify-start relative
                ${action.gradient}
                border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg
              `}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 w-full">
                <action.icon size={24} className={`${action.iconColor} md:w-7 md:h-7`} />
                <div className="text-left min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm md:text-base truncate">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.subtitle}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Bills & Recharge */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Bills & Recharge</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {billsAndRecharge.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              onClick={() => navigate(action.route)}
              className="h-auto py-3 md:py-4 px-2 flex-col gap-2 bg-muted/30 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={20} className={`${action.color} md:w-6 md:h-6`} />
              <span className="text-xs font-medium text-center truncate w-full">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Special Features */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Satitrah Special</h3>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {specialFeatures.map((action, index) => (
            <Button
              key={action.label}
              onClick={() => action.route && navigate(action.route)}
              className={`
                h-auto py-3 md:py-4 px-3 md:px-4 flex-col gap-2 text-left justify-start relative
                ${action.color}
                transition-all duration-300 hover:scale-105
              `}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 w-full">
                <action.icon size={20} className="md:w-6 md:h-6" />
                <div className="text-left min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate">{action.label}</p>
                  <p className="text-xs opacity-70 truncate">{action.subtitle}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Invest & Save */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Invest & Save</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {investAndSave.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              onClick={() => {
                if (action.label === "Investments") navigate("/investments");
                else if (action.label === "Goals") navigate("/wallet");
              }}
              className="h-auto py-3 md:py-4 px-2 flex-col gap-2 bg-muted/30 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={20} className={`${action.color} md:w-6 md:h-6`} />
              <span className="text-xs font-medium text-center truncate w-full">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* More Services */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">More Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {moreServices.map((action, index) => (
            <Button
              key={action.label}
              variant="ghost"
              onClick={() => {
                if (action.label === "Statements") navigate("/statements");
                else if (action.label === "Reminders") navigate("/notifications");
              }}
              className="h-auto py-3 md:py-4 px-2 flex-col gap-2 hover:bg-muted/50 transition-all duration-200"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <action.icon size={20} className={`${action.color} md:w-6 md:h-6`} />
              <span className="text-xs font-medium text-center truncate w-full">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};