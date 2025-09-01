import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  mobile_number: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (mobile: string, mpin: string) => Promise<boolean>;
  signUp: (mobile: string, mpin: string, fullName: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const SimpleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('lifelin3_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (mobile: string, mpin: string): Promise<boolean> => {
    // For demo purposes, use localStorage
    const userData = {
      id: `user_${mobile}`,
      mobile_number: mobile,
      full_name: `User ${mobile.slice(-4)}`
    };
    
    setUser(userData);
    localStorage.setItem('lifelin3_user', JSON.stringify(userData));
    return true;
  };

  const signUp = async (mobile: string, mpin: string, fullName: string): Promise<boolean> => {
    const userData = {
      id: `user_${mobile}`,
      mobile_number: mobile,
      full_name: fullName
    };
    
    setUser(userData);
    localStorage.setItem('lifelin3_user', JSON.stringify(userData));
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('lifelin3_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSimpleAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within SimpleAuthProvider');
  }
  return context;
};