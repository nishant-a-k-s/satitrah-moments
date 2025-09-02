import { useState, useEffect } from 'react';

interface Quote {
  id: string;
  quote_text: string;
  author?: string;
  category: string;
}

// Sample quotes since we don't have a motivational_quotes table
const sampleQuotes: Quote[] = [
  {
    id: '1',
    quote_text: 'Invest in your dreams. Grind now. Shine later.',
    author: 'Unknown',
    category: 'investment'
  },
  {
    id: '2',
    quote_text: 'The best time to invest was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
    category: 'investment'
  },
  {
    id: '3',
    quote_text: 'Your money should work as hard as you do.',
    author: 'Unknown',
    category: 'finance'
  },
  {
    id: '4',
    quote_text: 'Every rupee saved today is a rupee earned for tomorrow.',
    author: 'Lifelin3',
    category: 'savings'
  }
];

export const useMotivationalQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomQuote = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
      setQuote(sampleQuotes[randomIndex]);
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