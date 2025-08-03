import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface MPINLoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export const MPINLoginPage = ({ onBack, onLogin }: MPINLoginPageProps) => {
  const [mpin, setMpin] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(true);
  const { toast } = useToast();

  const handleEmailSubmit = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    setShowEmailInput(false);
  };

  const handleMPINLogin = async () => {
    if (mpin.length !== 6) {
      toast({
        title: "Invalid MPIN",
        description: "MPIN must be exactly 6 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Call the verify_mpin function
      const { data, error } = await supabase.rpc('verify_mpin', {
        user_email: email,
        mpin_plain: mpin
      });

      if (error) {
        console.error('MPIN verification error:', error);
        toast({
          title: "Login Failed",
          description: "Unable to verify MPIN. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0 && data[0].is_valid) {
        // Success - create session manually
        const authUserId = data[0].auth_user_id;
        
        toast({
          title: "Login Successful",
          description: "Welcome back to Satitrah!",
        });
        
        onLogin();
      } else {
        toast({
          title: "Invalid MPIN",
          description: "The MPIN you entered is incorrect.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    toast({
      title: "Sign Up Required",
      description: "No account found with this email. Please sign up first.",
      variant: "destructive",
    });
    setShowEmailInput(true);
    setMpin("");
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
            <p className="text-muted-foreground text-lg mt-2">Enter your details to sign in</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {showEmailInput ? "Enter Your Email" : "Enter Your MPIN"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {showEmailInput 
                  ? "We'll verify your identity using your 6-digit MPIN"
                  : "Enter the 6-digit MPIN you set during signup"
                }
              </p>
            </div>

            {showEmailInput ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-input border border-border text-foreground"
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  />
                </div>
                
                <Button 
                  onClick={handleEmailSubmit}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">MPIN</label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={mpin}
                      onChange={(value) => setMpin(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button 
                  onClick={handleMPINLogin}
                  disabled={mpin.length !== 6 || loading}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmailInput(true)}
                    className="text-muted-foreground"
                  >
                    Change Email
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Don't have an account?</span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleSignUpRedirect}
                      className="p-0 h-auto text-primary"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            )}

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
