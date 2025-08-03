import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, UserPlus, Shield, Baby, Coins } from "lucide-react";
import { PhoneLoginPage } from "@/components/PhoneLoginPage";
import { SignUpPage } from "./SignUpPage";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [loginMethod, setLoginMethod] = useState<'main' | 'phone' | 'signup'>('main');

  if (loginMethod === 'phone') {
    return <PhoneLoginPage onBack={() => setLoginMethod('main')} onLogin={onLogin} />;
  }

  if (loginMethod === 'signup') {
    return (
      <SignUpPage
        onBack={() => setLoginMethod('main')}
        onSignUpComplete={() => {
          setLoginMethod('phone');
          onLogin(); // optional: auto-login after signup
        }}
      />
    );
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
              <p className="text-sm text-muted-foreground">Login securely to continue</p>
            </div>

            <Button
              onClick={() => setLoginMethod('phone')}
              variant="outline"
              className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold flex items-center justify-center gap-3"
            >
              <Mail className="h-5 w-5" />
              Login with phone
            </Button>

            <Button
              onClick={() => setLoginMethod('signup')}
              variant="outline"
              className="w-full h-12 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold flex items-center justify-center gap-3"
            >
              <UserPlus className="h-5 w-5" />
              Create New Account
            </Button>
          </div>
        </Card>

        {/* Feature Preview */}
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
          <p className="text-xs text-muted-foreground">Secure • Private • Empowering</p>
        </div>
      </div>
    </div>
  );
};
