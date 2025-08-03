import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, UserPlus, Mail, Phone, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface SignUpPageProps {
  onBack: () => void;
  onSignUpComplete: () => void;
}

export const SignUpPage = ({ onBack, onSignUpComplete }: SignUpPageProps) => {
  const [step, setStep] = useState<'details' | 'mpin' | 'verification'>('details');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mpin: "",
    confirmMpin: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateMPIN = () => {
    if (formData.mpin.length !== 6) {
      toast({
        title: "Invalid MPIN",
        description: "MPIN must be exactly 6 digits",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.mpin !== formData.confirmMpin) {
      toast({
        title: "MPIN Mismatch",
        description: "Please make sure both MPINs match",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleStepNext = () => {
    if (step === 'details' && validateStep1()) {
      setStep('mpin');
    } else if (step === 'mpin' && validateMPIN()) {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // First create the Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.mpin + formData.email, // Temporary password using MPIN
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
            phone: formData.phone
          }
        }
      });

      if (authError) {
        toast({
          title: "Sign Up Failed",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (authData.user) {
        // Store MPIN hash in user_security table
        const { error: mpinError } = await supabase
          .from('user_security')
          .insert({
            user_id: authData.user.id,
            mpin_hash: await hashMPIN(formData.mpin),
            phone_verified: false
          });

        if (mpinError) {
          console.error('MPIN storage error:', mpinError);
        }

        // Update user profile
        const { error: profileError } = await supabase
          .from('users')
          .update({
            is_mpin_setup: true
          })
          .eq('auth_user_id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }

        setStep('verification');
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account",
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const hashMPIN = async (mpin: string): Promise<string> => {
    // Simple client-side hashing - in production, use a proper hashing library
    const encoder = new TextEncoder();
    const data = encoder.encode(mpin + 'satitrah_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleEmailVerified = () => {
    toast({
      title: "Email Verified!",
      description: "Your account is now active. You can sign in with your MPIN.",
    });
    onSignUpComplete();
  };

  if (step === 'verification') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src={squirrelMascot} 
                alt="Satitrah" 
                className="w-20 h-20 rounded-2xl shadow-premium"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Check Your Email</h1>
              <p className="text-muted-foreground text-lg mt-2">We've sent a verification link</p>
            </div>
          </div>

          <Card className="p-8 bg-card border-0 shadow-premium">
            <div className="text-center space-y-6">
              <CheckCircle className="h-16 w-16 mx-auto text-success" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Verification Email Sent
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We've sent a verification link to <strong>{formData.email}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  After verification, you can sign in using just your 6-digit MPIN
                </p>
              </div>

              <Button
                onClick={handleEmailVerified}
                className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
              >
                I've Verified My Email
              </Button>

              <Button
                variant="ghost"
                onClick={onBack}
                className="w-full h-10 text-muted-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-lg mt-2">Join Satitrah today</p>
          </div>
        </div>

        {/* Sign Up Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="text-center mb-6">
              {step === 'details' ? (
                <>
                  <UserPlus className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personal Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us a bit about yourself
                  </p>
                </>
              ) : (
                <>
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Set Your MPIN</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a 6-digit MPIN for secure login
                  </p>
                </>
              )}
            </div>

            {step === 'details' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                    className="h-12"
                    maxLength={10}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Create MPIN</label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={formData.mpin}
                      onChange={(value) => setFormData(prev => ({ ...prev, mpin: value }))}
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirm MPIN</label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={formData.confirmMpin}
                      onChange={(value) => setFormData(prev => ({ ...prev, confirmMpin: value }))}
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
              </div>
            )}

            <Button 
              onClick={handleStepNext}
              disabled={loading}
              className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
            >
              {loading ? "Creating Account..." : step === 'details' ? "Continue" : "Create Account"}
            </Button>

            <Button
              variant="ghost"
              onClick={step === 'details' ? onBack : () => setStep('details')}
              className="w-full h-10 text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {step === 'details' ? 'Back to Login' : 'Back'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};