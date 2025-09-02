import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface MagicLinkLoginPageProps {
  onBack: () => void;
  onLogin?: () => void; // Optional, login is automatic after magic link
}

export const MagicLinkLoginPage = ({ onBack }: MagicLinkLoginPageProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMagicLink = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Optional: auto-register new users
      },
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check Your Inbox",
        description: "We've sent you a magic link to log in.",
      });
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
              alt="Lifelin3"
              className="w-20 h-20 rounded-2xl shadow-premium"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Enter your email to log in
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-input border border-border text-foreground"
              onKeyDown={(e) => e.key === "Enter" && handleSendMagicLink()}
            />
          </div>

          <Button
            onClick={handleSendMagicLink}
            disabled={loading}
            className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full h-10 text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Options
          </Button>
        </Card>
      </div>
    </div>
  );
};
