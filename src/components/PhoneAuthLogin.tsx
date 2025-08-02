import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Smartphone, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const PhoneAuthLogin = ({ onBack }: { onBack: () => void }) => {
  const [phone, setPhone] = useState("");
  const [mpin, setMpin] = useState("");
  const [mpinSent, setMpinSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMPIN = async () => {
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    // Simulate a server check or MPIN setup prompt
    setLoading(true);
    try {
      // You can replace this with an actual check: does this phone number exist in your user table?
      setMpinSent(true);
      toast({
        title: "MPIN Required",
        description: "Please enter your 4-digit MPIN to continue.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate MPIN login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMPIN = async () => {
    if (!mpin || mpin.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a valid 4-digit MPIN",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Replace this block with your Supabase logic or API call
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone", `+91${phone}`)
        .eq("mpin", mpin)
        .single();

      if (error || !data) throw new Error("Invalid MPIN or Phone number");

      toast({
        title: "Success",
        description: "Logged in successfully with MPIN!",
      });

      // Trigger login session or redirect as needed
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
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
            <h1 className="text-4xl font-bold text-foreground">Satitrah</h1>
            <p className="text-muted-foreground text-lg mt-2">MPIN Login</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login Options
            </Button>

            {!mpinSent ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-10 h-12 bg-input border-border text-foreground"
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll ask for your MPIN linked to this number
                  </p>
                </div>

                <Button 
                  onClick={handleSendMPIN}
                  disabled={phone.length !== 10 || loading}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  {loading ? "Processing..." : "Continue"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Enter MPIN</label>
                  <Input
                    type="password"
                    placeholder="Enter 4-digit MPIN"
                    value={mpin}
                    onChange={(e) => setMpin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="h-12 text-center text-lg tracking-widest bg-input border-border text-foreground"
                    maxLength={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    MPIN for +91{phone}
                  </p>
                </div>

                <Button 
                  onClick={handleVerifyMPIN}
                  disabled={mpin.length !== 4 || loading}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  {loading ? "Verifying..." : "Login"}
                </Button>

                <Button
                  variant="link"
                  onClick={() => setMpinSent(false)}
                  className="w-full text-primary"
                >
                  Go Back
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
