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
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
        options: {
          channel: 'sms',
        },
      });

      if (error) throw error;

      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your SMS for the verification code",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: +91${phone},
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Phone number verified successfully!",
      });
      
      // User will be automatically redirected by the auth state change
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP",
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
            <p className="text-muted-foreground text-lg mt-2">Phone Login</p>
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

            {!otpSent ? (
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
                    We'll send you an OTP to verify your number
                  </p>
                </div>

                <Button 
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || loading}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 text-center text-lg tracking-widest bg-input border-border text-foreground"
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    OTP sent to +91{phone}
                  </p>
                </div>

                <Button 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || loading}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button
                  variant="link"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-primary"
                >
                  Resend OTP
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
