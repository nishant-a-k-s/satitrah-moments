import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<{ phone: string; mpin: string } | null>(null);

  const login = (phone: string, mpin: string) => {
    setUser({ phone, mpin });
    console.log("✅ Logged in user:", phone);
  };

  const logout = () => {
    console.log("🚪 Logged out");
    setUser(null);
  };

  return { user, login, logout };
};
