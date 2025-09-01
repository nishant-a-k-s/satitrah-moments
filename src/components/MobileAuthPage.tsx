import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface MobileAuthPageProps {
  onSuccess: () => void;
}

export const MobileAuthPage = ({ onSuccess }: MobileAuthPageProps) => {
  const [step, setStep] = useState<"mobile" | "mpin" | "signup">("mobile");
  const [mobile, setMobile] = useState("");
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [fullName, setFullName] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useSimpleAuth();

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      toast({
        title: "Invalid Mobile",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For demo, randomly decide if user exists
      const userExists = Math.random() > 0.7; // 30% chance user exists
      
      if (userExists) {
        setStep("mpin");
      } else {
        setStep("signup");
      }
    } catch (error) {
      console.error('Error checking mobile:', error);
      setStep("signup");
    } finally {
      setLoading(false);
    }
  };

  const handleMpinLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mpin.length !== 6) {
      toast({
        title: "Invalid MPIN",
        description: "MPIN must be 6 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await signIn(mobile, mpin);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to Lifelin3!",
        });
        onSuccess();
      } else {
        toast({
          title: "Invalid MPIN",
          description: "Please check your MPIN and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || mpin.length !== 6 || mpin !== confirmMpin) {
      toast({
        title: "Invalid Input",
        description: "Please fill all fields and ensure MPINs match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await signUp(mobile, mpin, fullName);
      
      if (success) {
        toast({
          title: "Account Created",
          description: "Welcome to Lifelin3!",
        });
        onSuccess();
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotMpin = () => {
    toast({
      title: "MPIN Reset",
      description: "OTP sent to your mobile for MPIN reset",
    });
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
            <h1 className="text-4xl font-bold text-foreground">Welcome to Lifelin3</h1>
            <p className="text-muted-foreground text-lg mt-2">
              {step === "mobile" && "Enter your mobile number"}
              {step === "mpin" && "Enter your 6-digit MPIN"}
              {step === "signup" && "Create your account"}
            </p>
          </div>
        </div>

        {/* Mobile Number Step */}
        {step === "mobile" && (
          <Card className="p-8 bg-card border-0 shadow-premium space-y-4">
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10 h-12 bg-input border-border text-foreground"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || mobile.length < 10}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>
            </form>
          </Card>
        )}

        {/* MPIN Login Step */}
        {step === "mpin" && (
          <Card className="p-8 bg-card border-0 shadow-premium space-y-4">
            <form onSubmit={handleMpinLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter MPIN</label>
                <div className="relative">
                  <Input
                    type={showMpin ? "text" : "password"}
                    placeholder="Enter 6-digit MPIN"
                    value={mpin}
                    onChange={(e) => setMpin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pr-10 h-12 bg-input border-border text-foreground text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMpin(!showMpin)}
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                  >
                    {showMpin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || mpin.length !== 6}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleForgotMpin}
                className="w-full h-10 text-muted-foreground"
              >
                Forgot MPIN?
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("mobile")}
                className="w-full h-10 text-muted-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </form>
          </Card>
        )}

        {/* Signup Step */}
        {step === "signup" && (
          <Card className="p-8 bg-card border-0 shadow-premium space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Create 6-digit MPIN</label>
                <div className="relative">
                  <Input
                    type={showMpin ? "text" : "password"}
                    placeholder="Create MPIN"
                    value={mpin}
                    onChange={(e) => setMpin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pr-10 h-12 bg-input border-border text-foreground text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <Button
                    type="button"
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
                <div className="relative">
                  <Input
                    type={showConfirmMpin ? "text" : "password"}
                    placeholder="Confirm MPIN"
                    value={confirmMpin}
                    onChange={(e) => setConfirmMpin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pr-10 h-12 bg-input border-border text-foreground text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmMpin(!showConfirmMpin)}
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                  >
                    {showConfirmMpin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !fullName || mpin.length !== 6 || confirmMpin.length !== 6}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("mobile")}
                className="w-full h-10 text-muted-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};