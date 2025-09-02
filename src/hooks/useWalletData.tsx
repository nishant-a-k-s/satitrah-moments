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

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        setIsLoading(false);
        return;
      }

      // Return mock data since we don't have wallet tables yet
      setWallets([
        {
          id: '1',
          wallet_type: 'safebox',
          balance: 25000,
          currency: 'INR',
          is_active: true
        },
        {
          id: '2',
          wallet_type: 'main',
          balance: 12500,
          currency: 'INR',
          is_active: true
        }
      ]);

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

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      // Use user_spends as the base for transactions
      const { data: spendsData, error: spendsError } = await supabase
        .from('user_spends')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (spendsError) {
        console.error('Error fetching spends:', spendsError);
        setTransactions([]);
      } else {
        // Map user_spends to transaction format
        const mappedTransactions: TransactionData[] = (spendsData || []).map(spend => ({
          id: spend.id,
          amount: Number(spend.amount),
          type: 'debit',
          description: spend.product_name,
          merchant_name: spend.merchant_name,
          matched_stock_symbol: spend.mapped_ticker,
          matched_company_name: spend.mapped_company,
          current_stock_price: null,
          created_at: spend.created_at,
          status: 'completed',
          reference_id: null,
          wallet_id: '1',
          user_id: spend.user_id || '',
          to_wallet_id: null,
          metadata: null
        }));
        setTransactions(mappedTransactions);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const getTotalBalance = () => {
    return wallets.reduce((total, w) => total + parseFloat(w.balance.toString()), 0);
  };

  const getWalletByType = (type: string) => {
    return wallets.find(w => w.wallet_type === type);
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