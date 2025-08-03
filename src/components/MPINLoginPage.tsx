import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MpinLoginPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [mpin, setMpin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Validate mobile number length
    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    // Validate MPIN length
    if (mpin.length !== 6) {
      setError("MPIN must be 6 digits.");
      return;
    }

    // Temporarily allow login for any mobile & mpin
    navigate("/home");
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric
    if (value.length <= 10) setMobile(value);
  };

  const handleMpinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length <= 6) setMpin(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login with MPIN</h2>
        <Input
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={handleMobileChange}
          maxLength={10}
        />
        <Input
          placeholder="Enter 6-digit MPIN"
          type="password"
          value={mpin}
          onChange={handleMpinChange}
          maxLength={6}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Mainpage;
