import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface MPINSetupProps {
  onComplete: () => void;
}

export const MPINSetup = ({ onComplete }: MPINSetupProps) => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSetupMPIN = async () => {
    if (mpin.length !== 4) {
      toast({
        title: "Error",
        description: "MPIN must be exactly 4 digits",
        variant: "destructive",
      });
      return;
    }

    if (mpin !== confirmMpin) {
      toast({
        title: "Error",
        description: "MPINs do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would hash and store the MPIN securely
      // For now, we'll just simulate the setup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "MPIN setup completed successfully!",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to setup MPIN",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={squirrelMascot} 
              alt="Satitrah" 
              className="w-20 h-20 rounded-2xl shadow-premium"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Setup MPIN</h1>
            <p className="text-muted-foreground text-lg mt-2">Secure your account</p>
          </div>
        </div>

        {/* MPIN Setup Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Create Your MPIN</h3>
              <p className="text-sm text-muted-foreground">
                Choose a 4-digit MPIN to secure your transactions
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Enter MPIN</label>
              <div className="relative">
                <Input
                  type={showMpin ? "text" : "password"}
                  placeholder="Enter 4-digit MPIN"
                  value={mpin}
                  onChange={(e) => setMpin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="h-12 text-center text-lg tracking-widest bg-input border-border text-foreground pr-10"
                  maxLength={4}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMpin(!showMpin)}
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                >
                  {showMpin ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm MPIN</label>
              <Input
                type={showMpin ? "text" : "password"}
                placeholder="Re-enter 4-digit MPIN"
                value={confirmMpin}
                onChange={(e) => setConfirmMpin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="h-12 text-center text-lg tracking-widest bg-input border-border text-foreground"
                maxLength={4}
              />
            </div>

            <Button 
              onClick={handleSetupMPIN}
              disabled={mpin.length !== 4 || confirmMpin.length !== 4 || loading}
              className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
            >
              {loading ? "Setting up..." : "Setup MPIN"}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              <p>Remember your MPIN. You'll need it for all transactions.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};