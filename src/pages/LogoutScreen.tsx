import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Heart, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export default function LogoutScreen() {
  const navigate = useNavigate();

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
            <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
            <p className="text-muted-foreground text-lg mt-2">You've been logged out safely</p>
          </div>
        </div>

        {/* Logout Confirmation Card */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="text-center space-y-6">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <LogOut className="h-8 w-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Successfully Logged Out</h3>
              <p className="text-sm text-muted-foreground">
                Your session has been ended securely. All your data remains protected.
              </p>
            </div>

            {/* Features Reminder */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-left">
                <Shield className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">SOS Emergency Protection</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Spends-to-Stocks Investment</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Heart className="h-5 w-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Safebox Savings</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Login Again
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.close()}
                className="w-full h-12 border-muted-foreground/20 text-muted-foreground hover:bg-muted/50"
              >
                Close App
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Built for Her. Backed by All. • Secure • Private • Empowering
          </p>
        </div>
      </div>
    </div>
  );
}