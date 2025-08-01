import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WalletData {
  id: string;
  wallet_type: string;
  balance: number;
  currency: string;
  is_active: boolean;
}

export interface TransactionData {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  merchant_name?: string | null;
  matched_stock_symbol?: string | null;
  matched_company_name?: string | null;
  current_stock_price?: number | null;
  created_at: string;
  status?: string;
  reference_id?: string | null;
  wallet_id: string;
  user_id: string;
  to_wallet_id?: string | null;
  metadata?: any;
}

export const useWalletData = () => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
  }, []);

  const fetchWalletData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log('No authenticated user');
        setIsLoading(false);
        return;
      }

      // First get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        setIsLoading(false);
        return;
      }

      // Then get wallets
      const { data: walletsData, error: walletsError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', profile.id);

      if (walletsError) {
        console.error('Error fetching wallets:', walletsError);
        toast({
          title: "Error",
          description: "Failed to fetch wallet data",
          variant: "destructive",
        });
      } else {
        setWallets(walletsData || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return;
      }

      // First get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      // Then get transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
      } else {
        setTransactions(transactionsData || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const getTotalBalance = () => {
    return wallets.reduce((total, wallet) => total + parseFloat(wallet.balance.toString()), 0);
  };

  const getWalletByType = (type: string) => {
    return wallets.find(wallet => wallet.wallet_type === type);
  };

  return {
    wallets,
    transactions,
    isLoading,
    getTotalBalance,
    getWalletByType,
    refetch: () => {
      fetchWalletData();
      fetchTransactions();
    }
  };
};