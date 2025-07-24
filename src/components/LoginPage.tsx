import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Smartphone, Shield, Baby, Coins } from "lucide-react";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulate login
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
            <p className="text-muted-foreground text-lg mt-2">Safety. Stability. Satitrah.</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-12 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-12 bg-input border-border text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
            >
              Login to Satitrah
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-primary">
                Forgot Password?
              </Button>
            </div>
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
            <p className="text-xs text-muted-foreground">Maternity Wallet</p>
          </Card>
          <Card className="p-4 text-center bg-card-elevated border-0">
            <Coins className="h-6 w-6 mx-auto mb-2 text-accent" />
            <p className="text-xs text-muted-foreground">Squirrel Lending</p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="text-primary p-0 h-auto">
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};