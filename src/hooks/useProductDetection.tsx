import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductMapping {
  id: string;
  product_name: string;
  brand_name: string;
  company_name: string;
  stock_ticker: string;
  exchange: string;
}

interface StockData {
  ticker: string;
  current_price: number;
  yoy_change: number;
  mom_change: number;
  company_name: string;
}

export const useProductDetection = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const detectProductFromText = async (text: string): Promise<ProductMapping | null> => {
    try {
      // First, check local database for product mappings
      const { data: mappings } = await supabase
        .from('product_company_mappings')
        .select('*')
        .ilike('product_name', `%${text}%`)
        .limit(1);

      if (mappings && mappings.length > 0) {
        return mappings[0];
      }

      // If not found locally, we would query Google Search API here
      // For now, return null to indicate no mapping found
      return null;
    } catch (error) {
      console.error('Error detecting product:', error);
      return null;
    }
  };

  const detectProductFromImage = async (imageFile: File): Promise<string[]> => {
    // Simulate OCR processing
    setLoading(true);
    try {
      // In a real app, this would use Google Vision API or similar
      // For demo purposes, return mock detected text
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDetectedTexts = [
        'iPhone 15 Pro',
        'Maggi Noodles',
        'Tata Salt',
        'Samsung Galaxy',
        'Parle-G Biscuits'
      ];
      
      const randomText = mockDetectedTexts[Math.floor(Math.random() * mockDetectedTexts.length)];
      return [randomText];
    } catch (error) {
      console.error('Error processing image:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const logUserSpend = async (
    userId: string,
    productName: string,
    amount: number,
    merchantName?: string,
    category?: string,
    mappedCompany?: string,
    mappedTicker?: string
  ) => {
    try {
      const { error } = await supabase
        .from('user_spends')
        .insert({
          user_id: userId,
          product_name: productName,
          amount,
          merchant_name: merchantName,
          category,
          mapped_company: mappedCompany,
          mapped_ticker: mappedTicker,
        });

      if (error) throw error;

      toast({
        title: "Spend Logged",
        description: `₹${amount} spend on ${productName} recorded successfully`,
      });
    } catch (error: any) {
      console.error('Error logging spend:', error);
      toast({
        title: "Failed to log spend",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStockData = async (ticker: string): Promise<StockData | null> => {
    // Mock stock data - in real app would fetch from financial APIs
    const mockStockData: Record<string, StockData> = {
      'NESTLEIND': {
        ticker: 'NESTLEIND',
        current_price: 2847.50,
        yoy_change: 12.5,
        mom_change: 3.2,
        company_name: 'Nestle India Limited'
      },
      'TATACONSUM': {
        ticker: 'TATACONSUM',
        current_price: 1024.30,
        yoy_change: 8.7,
        mom_change: -1.5,
        company_name: 'Tata Consumer Products Limited'
      },
      'ZOMATO': {
        ticker: 'ZOMATO',
        current_price: 267.80,
        yoy_change: 145.2,
        mom_change: 12.8,
        company_name: 'Zomato Limited'
      },
      'AAPL': {
        ticker: 'AAPL',
        current_price: 15420.00,
        yoy_change: 22.3,
        mom_change: 5.7,
        company_name: 'Apple Inc'
      }
    };

    return mockStockData[ticker] || null;
  };

  const getUserSpendsByStock = async (userId: string) => {
    try {
      const { data: spends } = await supabase
        .from('user_spends')
        .select('*')
        .eq('user_id', userId)
        .order('spend_date', { ascending: false });

      // Group spends by stock ticker
      const spendsByStock: Record<string, { totalSpent: number; spends: any[] }> = {};
      
      spends?.forEach(spend => {
        if (spend.mapped_ticker) {
          if (!spendsByStock[spend.mapped_ticker]) {
            spendsByStock[spend.mapped_ticker] = { totalSpent: 0, spends: [] };
          }
          spendsByStock[spend.mapped_ticker].totalSpent += parseFloat(spend.amount);
          spendsByStock[spend.mapped_ticker].spends.push(spend);
        }
      });

      return spendsByStock;
    } catch (error) {
      console.error('Error fetching user spends:', error);
      return {};
    }
  };

  return {
    detectProductFromText,
    detectProductFromImage,
    logUserSpend,
    getStockData,
    getUserSpendsByStock,
    loading
  };
};