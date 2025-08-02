import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Mail, Shield, Baby, Coins } from "lucide-react";
import { EmailAuthLogin } from "./EmailAuthLogin";
import { MPINSetup } from "./MPINSetup";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [loginMethod, setLoginMethod] = useState<'main' | 'phone' | 'mpin'>('main');

  const handleMPINComplete = () => {
    onLogin();
  };

  if (loginMethod === 'phone') {
    return <EmailAuthLogin onBack={() => setLoginMethod('main')} />;
  }

  if (loginMethod === 'mpin') {
    return <MPINSetup onComplete={handleMPINComplete} />;
  }

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
            <h1 className="text-4xl font-bold text-foreground">Satitrah</h1>
            <p className="text-muted-foreground text-lg mt-2">Built for Her. Backed by All.</p>
          </div>
        </div>

        {/* Login Options */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Welcome Back</h3>
              <p className="text-sm text-muted-foreground">Choose your login method</p>
            </div>

            <Button 
              onClick={() => setLoginMethod('phone')}
              className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-3"
            >
              <Smartphone className="h-5 w-5" />
              Login with Email
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button 
              variant="outline"
              onClick={() => setLoginMethod('mpin')}
              className="w-full h-12 border-border text-foreground hover:bg-muted flex items-center justify-center gap-3"
            >
              <Shield className="h-5 w-5" />
              Setup MPIN (New Users)
            </Button>
          </div>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-card-elevated border-0">
            <Shield className="h-6 w-6 mx-auto mb-2 text-destructive" />
            <p className="text-xs text-muted-foreground">SOS Emergency</p>
          </Card>
          <Card className="p-4 text-center bg-card-elevated border-0">
            <Baby className="h-6 w-6 mx-auto mb-2 text-secondary" />
            <p className="text-xs text-muted-foreground">SatiSafe Wallet</p>
          </Card>
          <Card className="p-4 text-center bg-card-elevated border-0">
            <Coins className="h-6 w-6 mx-auto mb-2 text-accent" />
            <p className="text-xs text-muted-foreground">Squirrel Lending</p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Secure • Private • Empowering
          </p>
        </div>
      </div>
    </div>
  );
};
