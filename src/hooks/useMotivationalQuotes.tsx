import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Quote {
  id: string;
  quote_text: string;
  author?: string;
  category: string;
}

export const useMotivationalQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomQuote = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('motivational_quotes')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching quote:', error);
        return;
      }

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return {
    quote,
    isLoading,
    refreshQuote: fetchRandomQuote
  };
};