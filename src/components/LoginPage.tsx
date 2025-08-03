import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Coins, Baby } from "lucide-react";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [mobile, setMobile] = useState("");
  const [mpin, setMpin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(mpin)) {
      setError("Enter a valid 6-digit MPIN.");
      return;
    }

    // Simulate login success
    setError("");
    onLogin();
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
            <h1 className="text-4xl font-bold text-foreground">Satitrah</h1>
            <p className="text-muted-foreground text-lg mt-2">Built for Her. Backed by All.</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Welcome Back</h3>
            <p className="text-sm text-muted-foreground">Login with mobile & MPIN</p>
          </div>

          <input
            type="tel"
            placeholder="Enter 10-digit Mobile Number"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground"
          />

          <input
            type="password"
            placeholder="Enter 6-digit MPIN"
            maxLength={6}
            value={mpin}
            onChange={(e) => setMpin(e.target.value)}
            className="w-full h-12 px-4 rounded-md border border-border bg-background text-foreground"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button 
            onClick={handleLogin}
            className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
          >
            Login
          </Button>
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
