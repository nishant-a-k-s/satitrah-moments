import { useState } from "react";

export const useMPIN = () => {
  const [storedMPINs, setStoredMPINs] = useState<{ [phone: string]: string }>({});

  const setupMPIN = (phone: string, mpin: string) => {
    setStoredMPINs(prev => ({
      ...prev,
      [phone]: mpin,
    }));
    console.log(`📌 MPIN set for ${phone}: ${mpin}`);
  };

  const verifyMPIN = (phone: string, enteredMPIN: string) => {
    const isValid = storedMPINs[phone] === enteredMPIN;
    console.log(`🔒 Verifying MPIN for ${phone}: ${isValid ? "✅ Success" : "❌ Failed"}`);
    return isValid;
  };

  return { setupMPIN, verifyMPIN };
};
