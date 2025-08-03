import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, Lock, Check } from 'lucide-react';
import { useOTP } from '@/hooks/useOTP';
import { useMPIN } from '@/hooks/useMPIN';
import { useAuth } from '@/hooks/useAuth';
import squirrelMascot from "@/assets/squirrel-mascot.png";

interface PhoneLoginPageProps {
  onSuccess: () => void;
}

const PhoneLoginPage = ({ onSuccess }: PhoneLoginPageProps) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'mpin' | 'set-mpin'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [mpin, setMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const { sendOTP, verifyOTP, loading: otpLoading } = useOTP();
  const { setMPIN, verifyMPIN, hasMPIN, loading: mpinLoading } = useMPIN();
  const { signUp, signIn } = useAuth();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    const result = await sendOTP(phone);
    if (result.success) {
      setSentOtp(result.otp || '');
      setStep('otp');
    }
  };

  const handleVerifyOTP = async () => {
    const result = await verifyOTP(phone, otp);
    if (result.success) {
      // Try to sign in first, if not exists then sign up
      const email = `${phone}@sati.safe`; // Create email from phone
      const password = phone; // Use phone as password for simplicity
      
      let authResult = await signIn(email, password);
      
      if (authResult.error) {
        // User doesn't exist, create account
        authResult = await signUp(email, password, { phone });
        if (authResult.error) {
          alert('Failed to create account');
          return;
        }
      }

      // Check if user has MPIN
      const mpinExists = await hasMPIN();
      if (mpinExists) {
        setStep('mpin');
      } else {
        setStep('set-mpin');
      }
    }
  };

  const handleSetMPIN = async () => {
    if (mpin.length !== 4) {
      alert('MPIN must be 4 digits');
      return;
    }
    
    if (mpin !== confirmMpin) {
      alert('MPIN confirmation does not match');
      return;
    }

    const result = await setMPIN(mpin);
    if (result.success) {
      onSuccess();
    }
  };

  const handleVerifyMPIN = async () => {
    if (mpin.length !== 4) {
      alert('MPIN must be 4 digits');
      return;
    }

    const result = await verifyMPIN(mpin);
    if (result.success) {
      onSuccess();
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
            <p className="text-muted-foreground text-lg mt-2">
              {step === 'phone' && 'Enter Phone Number'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'mpin' && 'Enter MPIN'}
              {step === 'set-mpin' && 'Set Your MPIN'}
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                {step === 'phone' || step === 'otp' ? (
                  <Smartphone className="h-8 w-8 text-primary" />
                ) : (
                  <Lock className="h-8 w-8 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground">
                {step === 'phone' && 'We\'ll send you a verification code'}
                {step === 'otp' && `Code sent to ${phone}`}
                {step === 'mpin' && 'Enter your 4-digit MPIN to continue'}
                {step === 'set-mpin' && 'Create a 4-digit MPIN for secure access'}
              </p>
            </div>

        {step === 'phone' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleSendOTP} 
              disabled={otpLoading}
              className="w-full"
            >
              {otpLoading ? 'Sending...' : 'Send OTP'}
            </Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter 6-digit OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="mt-1 text-center text-lg tracking-widest"
              />
            </div>
            {sentOtp && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Demo OTP: <span className="font-mono font-bold">{sentOtp}</span>
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('phone')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleVerifyOTP} 
                disabled={otpLoading}
                className="flex-1"
              >
                {otpLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </div>
        )}

        {step === 'mpin' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mpin">Enter MPIN</Label>
              <Input
                id="mpin"
                type="password"
                placeholder="••••"
                value={mpin}
                onChange={(e) => setMpin(e.target.value)}
                maxLength={4}
                className="mt-1 text-center text-lg tracking-widest"
              />
            </div>
            <Button 
              onClick={handleVerifyMPIN} 
              disabled={mpinLoading}
              className="w-full"
            >
              {mpinLoading ? 'Verifying...' : 'Verify MPIN'}
            </Button>
          </div>
        )}

        {step === 'set-mpin' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-mpin">Create 4-digit MPIN</Label>
              <Input
                id="new-mpin"
                type="password"
                placeholder="••••"
                value={mpin}
                onChange={(e) => setMpin(e.target.value)}
                maxLength={4}
                className="mt-1 text-center text-lg tracking-widest"
              />
            </div>
            <div>
              <Label htmlFor="confirm-mpin">Confirm MPIN</Label>
              <Input
                id="confirm-mpin"
                type="password"
                placeholder="••••"
                value={confirmMpin}
                onChange={(e) => setConfirmMpin(e.target.value)}
                maxLength={4}
                className="mt-1 text-center text-lg tracking-widest"
              />
            </div>
            {mpin && confirmMpin && mpin === confirmMpin && (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm">MPIN confirmed</span>
              </div>
            )}
            <Button 
              onClick={handleSetMPIN} 
              disabled={mpinLoading || mpin !== confirmMpin}
              className="w-full"
            >
              {mpinLoading ? 'Setting...' : 'Set MPIN'}
            </Button>
          </div>
        )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PhoneLoginPage;
