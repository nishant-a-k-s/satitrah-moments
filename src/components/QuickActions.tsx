import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Heart, 
  Coins, 
  QrCode, 
  Phone, 
  Zap,
  Baby,
  AlertTriangle 
} from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Shield, label: "SOS Alert", color: "destructive", urgent: true },
    { icon: Baby, label: "Maternity", color: "secondary" },
    { icon: Coins, label: "Lending", color: "accent" },
    { icon: QrCode, label: "Scan & Pay", color: "default" },
    { icon: Phone, label: "Recharge", color: "default" },
    { icon: Zap, label: "Bills", color: "default" },
    { icon: Heart, label: "Insurance", color: "secondary" },
    { icon: AlertTriangle, label: "Emergency", color: "destructive" }
  ];

  return (
    <Card className="p-6 shadow-card animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.color as any}
            size="sm"
            className={`
              flex-col h-auto py-4 px-2 relative
              ${action.urgent ? 'animate-bounce-in ring-2 ring-destructive/50' : ''}
            `}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <action.icon size={20} className="mb-1" />
            <span className="text-xs">{action.label}</span>
            {action.urgent && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
            )}
          </Button>
        ))}
      </div>
    </Card>
  );
};