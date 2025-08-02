-- Add missing motivational quotes
INSERT INTO motivational_quotes (quote_text, author, category) VALUES
('The way to get started is to quit talking and begin doing.', 'Walt Disney', 'motivation'),
('Your limitation—it''s only your imagination.', 'Unknown', 'motivation'),
('Push yourself, because no one else is going to do it for you.', 'Unknown', 'motivation'),
('Great things never come from comfort zones.', 'Unknown', 'motivation'),
('Dream it. Wish it. Do it.', 'Unknown', 'motivation'),
('Success doesn''t just find you. You have to go out and get it.', 'Unknown', 'motivation'),
('The harder you work for something, the greater you''ll feel when you achieve it.', 'Unknown', 'motivation'),
('Dream bigger. Do bigger.', 'Unknown', 'motivation'),
('Don''t stop when you''re tired. Stop when you''re done.', 'James Bond', 'motivation'),
('Wake up with determination. Go to bed with satisfaction.', 'Unknown', 'motivation'),
('Do something today that your future self will thank you for.', 'Sean Patric Flanery', 'motivation'),
('Little things make big days.', 'Unknown', 'motivation'),
('It''s going to be hard, but hard does not mean impossible.', 'Unknown', 'motivation'),
('Don''t wait for opportunity. Create it.', 'Unknown', 'motivation'),
('Sometimes we''re tested not to show our weaknesses, but to discover our strengths.', 'Unknown', 'motivation');

-- Add sample company stocks with merchant keywords for spends-to-stocks feature
INSERT INTO company_stocks (company_name, stock_symbol, exchange, sector, merchant_keywords, current_price, currency) VALUES
('Zomato Ltd', 'ZOMATO.NS', 'NSE', 'Food Delivery', ARRAY['zomato', 'zomato delivery'], 78.30, 'INR'),
('Amazon Inc', 'AMZN', 'NASDAQ', 'E-commerce', ARRAY['amazon', 'amazon.in', 'amazon.com'], 3245.50, 'USD'),
('Swiggy Ltd', 'SWIGGY.NS', 'NSE', 'Food Delivery', ARRAY['swiggy', 'swiggy delivery'], 420.75, 'INR'),
('Reliance Industries', 'RELIANCE.NS', 'NSE', 'Conglomerate', ARRAY['reliance', 'jio', 'reliance fresh', 'reliance digital'], 2850.40, 'INR'),
('Tata Consultancy Services', 'TCS.NS', 'NSE', 'IT Services', ARRAY['tcs', 'tata consultancy'], 4125.60, 'INR'),
('HDFC Bank', 'HDFCBANK.NS', 'NSE', 'Banking', ARRAY['hdfc', 'hdfc bank'], 1645.25, 'INR'),
('Infosys Ltd', 'INFY.NS', 'NSE', 'IT Services', ARRAY['infosys'], 1825.90, 'INR'),
('Tesla Inc', 'TSLA', 'NASDAQ', 'Electric Vehicles', ARRAY['tesla'], 248.42, 'USD'),
('Apple Inc', 'AAPL', 'NASDAQ', 'Technology', ARRAY['apple', 'apple store'], 189.87, 'USD'),
('Microsoft Corporation', 'MSFT', 'NASDAQ', 'Technology', ARRAY['microsoft'], 415.26, 'USD'),
('Nykaa', 'NYKAA.NS', 'NSE', 'E-commerce', ARRAY['nykaa'], 167.85, 'INR'),
('Paytm', 'PAYTM.NS', 'NSE', 'Fintech', ARRAY['paytm'], 425.30, 'INR');

-- Create function to update stock prices (mock function for now)
CREATE OR REPLACE FUNCTION update_stock_prices()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- This is a mock function that slightly adjusts stock prices
  -- In production, this would fetch real data from a stock API
  UPDATE public.company_stocks 
  SET 
    current_price = current_price * (0.98 + (random() * 0.04)),
    last_updated = now()
  WHERE is_active = true;
END;
$$;