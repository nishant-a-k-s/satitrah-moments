import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email");
  const [contact, setContact] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    if (!contact) {
      alert("Please enter your email or phone number");
      return;
    }
    setOtpSent(true);
    alert("OTP sent successfully!");
  };

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      alert("OTP verified! You can now reset your password.");
      navigate(-1);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute top-4 left-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex justify-center">
            <img 
              src={squirrelMascot} 
              alt="Lifelin3" 
              className="w-20 h-20 rounded-2xl shadow-premium"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
            <p className="text-muted-foreground">
              {otpSent ? "Enter the OTP sent to your " + method : "Choose how you'd like to reset your password"}
            </p>
          </div>
        </div>

        {/* Reset Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          {!otpSent ? (
            <div className="space-y-6">
              {/* Method Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">Select Recovery Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={method === "email" ? "default" : "outline"}
                    onClick={() => setMethod("email")}
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button
                    variant={method === "phone" ? "default" : "outline"}
                    onClick={() => setMethod("phone")}
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-xs">SMS</span>
                  </Button>
                </div>
              </div>

              {/* Contact Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {method === "email" ? "Email Address" : "Phone Number"}
                </label>
                <div className="relative">
                  {method === "email" ? (
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  )}
                  <Input
                    type={method === "email" ? "email" : "tel"}
                    placeholder={method === "email" ? "Enter your email" : "Enter your phone number"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="pl-10 h-12 bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOTP}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                disabled={!contact}
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter OTP</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-12 bg-input border-border text-foreground text-center text-lg"
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Demo OTP: <strong>123456</strong>
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyOTP}
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </Button>

                <Button 
                  variant="outline"
                  onClick={handleSendOTP}
                  className="w-full"
                >
                  Resend OTP
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Button variant="link" className="text-primary p-0 h-auto" onClick={() => navigate(-1)}>
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
