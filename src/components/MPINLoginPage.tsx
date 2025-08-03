import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface MPINLoginPageProps {
  onBack: () => void;
  onLogin?: () => void;
}

export const MPINLoginPage = ({ onBack, onLogin }: MPINLoginPageProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleMagicLinkLogin = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error("Magic Link Error:", error.message);
      toast({
        title: "Login Failed",
        description: error.message || "Unable to send magic link",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check Your Email",
        description: "We've sent you a login link. Please check your inbox.",
      });
    }

    setLoading(false);
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
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-lg mt-2">Secure login via your email</p>
          </div>
        </div>

        {/* Magic Link Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Login with Email</h3>
            <p className="text-sm text-muted-foreground">You'll receive a magic link to sign in</p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-input border border-border text-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleMagicLinkLogin()}
              />

              <Button 
                onClick={handleMagicLinkLogin}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>New user?</span>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-primary"
                  onClick={() => toast({ title: "Sign up required", description: "Please check with support." })}
                >
                  Sign Up
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full h-10 text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login Options
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
