import { useState } from "react";

export const useOTP = () => {
  const [otpStore, setOtpStore] = useState<{ [phone: string]: string }>({});

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const sendOTP = async (phone: string) => {
    const otp = generateOTP();
    console.log(`🔐 OTP sent to ${phone}: ${otp}`);

    setOtpStore(prev => ({
      ...prev,
      [phone]: otp,
    }));

    return true;
  };

  const verifyOTP = async (phone: string, enteredOTP: string) => {
    const stored = otpStore[phone];
    console.log(`✅ Verifying ${enteredOTP} against ${stored}`);
    return stored === enteredOTP;
  };

  return { sendOTP, verifyOTP };
};
