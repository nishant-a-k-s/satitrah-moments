import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async (phone: string) => {
    setLoading(true);
    try {
      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Store OTP in localStorage for demo
      localStorage.setItem('demo_otp', JSON.stringify({
        phone,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString()
      }));

      // In a real app, you would send SMS here
      // For demo purposes, we'll show the OTP in a toast
      toast({
        title: "OTP Sent",
        description: `Your OTP is: ${otpCode} (Valid for 5 minutes)`,
        duration: 10000
      });

      return { success: true, otp: otpCode };
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phone: string, enteredOTP: string) => {
    setLoading(true);
    try {
      const storedData = localStorage.getItem('demo_otp');
      if (!storedData) {
        toast({
          title: "OTP Expired",
          description: "Please request a new OTP",
          variant: "destructive"
        });
        return { success: false };
      }

      const otpData = JSON.parse(storedData);
      const now = new Date();
      const expiresAt = new Date(otpData.expires_at);

      if (otpData.phone !== phone || otpData.otp_code !== enteredOTP || now > expiresAt) {
        toast({
          title: "Invalid OTP",
          description: "Please check your OTP and try again",
          variant: "destructive"
        });
        return { success: false };
      }

      localStorage.removeItem('demo_otp');
      
      toast({
        title: "OTP Verified",
        description: "Phone number verified successfully"
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading
  };
};
