import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SafeboxData {
  id: string;
  safebox_type: string;
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
  safebox_id: string;
  user_id: string;
  to_safebox_id?: string | null;
  metadata?: any;
}

export const useSafeboxData = () => {
  const [safebox, setSafebox] = useState<SafeboxData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSafeboxData();
    fetchTransactions();
  }, []);

  const fetchSafeboxData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.log('No authenticated user');
        setIsLoading(false);
        return;
      }

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

      const { data: safeboxData, error: safeboxError } = await supabase
        .from('safebox')
        .select('*')
        .eq('user_id', profile.id);

      if (safeboxError) {
        console.error('Error fetching safebox:', safeboxError);
        toast({
          title: "Error",
          description: "Failed to fetch safebox data",
          variant: "destructive",
        });
      } else {
        setSafebox(safeboxData || []);
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

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

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
    return safebox.reduce((total, s) => total + parseFloat(s.balance.toString()), 0);
  };

  const getSafeboxByType = (type: string) => {
    return safebox.find(s => s.safebox_type === type);
  };

  return {
    safebox,
    transactions,
    isLoading,
    getTotalBalance,
    getSafeboxByType,
    refetch: () => {
      fetchSafeboxData();
      fetchTransactions();
    }
  };
};
