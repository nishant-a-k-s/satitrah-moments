-- Update user_security table for MPIN authentication
ALTER TABLE public.user_security 
ADD COLUMN IF NOT EXISTS mpin_hash text,
ADD COLUMN IF NOT EXISTS mpin_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS mpin_locked_until timestamp with time zone,
ADD COLUMN IF NOT EXISTS last_mpin_attempt timestamp with time zone;

-- Update users table for Indian market focus
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_mpin_setup boolean DEFAULT false;

-- Clear existing company_stocks and add Indian stocks only
DELETE FROM public.company_stocks;

-- Insert popular NSE and BSE Indian stocks
INSERT INTO public.company_stocks (company_name, stock_symbol, exchange, sector, currency, merchant_keywords, is_active, current_price) VALUES
-- Technology Stocks
('Tata Consultancy Services', 'TCS.NS', 'NSE', 'Technology', 'INR', ARRAY['tcs', 'tata consultancy', 'tata digital'], true, 3650.50),
('Infosys Limited', 'INFY.NS', 'NSE', 'Technology', 'INR', ARRAY['infosys', 'infy'], true, 1820.75),
('HCL Technologies', 'HCLTECH.NS', 'NSE', 'Technology', 'INR', ARRAY['hcl', 'hcl tech'], true, 1285.20),
('Wipro Limited', 'WIPRO.NS', 'NSE', 'Technology', 'INR', ARRAY['wipro'], true, 415.30),
('Tech Mahindra', 'TECHM.NS', 'NSE', 'Technology', 'INR', ARRAY['tech mahindra', 'mahindra tech'], true, 1685.40),

-- Banking & Financial Services
('HDFC Bank', 'HDFCBANK.NS', 'NSE', 'Banking', 'INR', ARRAY['hdfc bank', 'hdfc'], true, 1745.60),
('ICICI Bank', 'ICICIBANK.NS', 'NSE', 'Banking', 'INR', ARRAY['icici bank', 'icici'], true, 1285.90),
('State Bank of India', 'SBIN.NS', 'NSE', 'Banking', 'INR', ARRAY['sbi', 'state bank'], true, 825.45),
('Axis Bank', 'AXISBANK.NS', 'NSE', 'Banking', 'INR', ARRAY['axis bank', 'axis'], true, 1095.75),
('Kotak Mahindra Bank', 'KOTAKBANK.NS', 'NSE', 'Banking', 'INR', ARRAY['kotak bank', 'kotak mahindra'], true, 1785.20),

-- Oil & Gas
('Reliance Industries', 'RELIANCE.NS', 'NSE', 'Oil & Gas', 'INR', ARRAY['reliance', 'jio', 'reliance digital', 'reliance fresh'], true, 2945.85),
('Oil and Natural Gas Corporation', 'ONGC.NS', 'NSE', 'Oil & Gas', 'INR', ARRAY['ongc', 'indian oil'], true, 285.60),

-- Consumer Goods
('Hindustan Unilever', 'HINDUNILVR.NS', 'NSE', 'FMCG', 'INR', ARRAY['hindustan unilever', 'hul', 'unilever'], true, 2385.40),
('ITC Limited', 'ITC.NS', 'NSE', 'FMCG', 'INR', ARRAY['itc'], true, 465.20),
('Nestle India', 'NESTLEIND.NS', 'NSE', 'FMCG', 'INR', ARRAY['nestle', 'maggi'], true, 2195.75),

-- Automotive
('Tata Motors', 'TATAMOTORS.NS', 'NSE', 'Automotive', 'INR', ARRAY['tata motors', 'tata', 'jaguar'], true, 785.30),
('Mahindra & Mahindra', 'M&M.NS', 'NSE', 'Automotive', 'INR', ARRAY['mahindra', 'mahindra tractor'], true, 2995.60),
('Maruti Suzuki', 'MARUTI.NS', 'NSE', 'Automotive', 'INR', ARRAY['maruti', 'suzuki', 'maruti suzuki'], true, 10875.40),

-- Pharmaceuticals
('Dr. Reddys Laboratories', 'DRREDDY.NS', 'NSE', 'Pharma', 'INR', ARRAY['dr reddy', 'dr reddys'], true, 1285.90),
('Cipla Limited', 'CIPLA.NS', 'NSE', 'Pharma', 'INR', ARRAY['cipla'], true, 1485.60),
('Sun Pharmaceutical', 'SUNPHARMA.NS', 'NSE', 'Pharma', 'INR', ARRAY['sun pharma'], true, 1795.20),

-- Food & Delivery
('Zomato', 'ZOMATO.NS', 'NSE', 'Food Tech', 'INR', ARRAY['zomato'], true, 285.75),
('Swiggy', 'SWIGGY.NS', 'NSE', 'Food Tech', 'INR', ARRAY['swiggy'], true, 495.20),

-- E-commerce & Retail
('Nykaa', 'NYKAA.NS', 'NSE', 'E-commerce', 'INR', ARRAY['nykaa'], true, 165.85),
('Paytm', 'PAYTM.NS', 'NSE', 'Fintech', 'INR', ARRAY['paytm'], true, 925.40),
('Flipkart', 'FLIPKART.NS', 'NSE', 'E-commerce', 'INR', ARRAY['flipkart'], true, 185.20),

-- Telecom
('Bharti Airtel', 'BHARTIARTL.NS', 'NSE', 'Telecom', 'INR', ARRAY['airtel', 'bharti airtel'], true, 1595.30),
('Vodafone Idea', 'IDEA.NS', 'NSE', 'Telecom', 'INR', ARRAY['vodafone', 'idea'], true, 8.45),

-- Metals & Mining
('Tata Steel', 'TATASTEEL.NS', 'NSE', 'Metals', 'INR', ARRAY['tata steel'], true, 145.60),
('JSW Steel', 'JSWSTEEL.NS', 'NSE', 'Metals', 'INR', ARRAY['jsw steel'], true, 985.40),

-- Power & Energy
('NTPC Limited', 'NTPC.NS', 'NSE', 'Power', 'INR', ARRAY['ntpc'], true, 385.20),
('Power Grid Corporation', 'POWERGRID.NS', 'NSE', 'Power', 'INR', ARRAY['power grid'], true, 325.75),

-- Cement
('UltraTech Cement', 'ULTRACEMCO.NS', 'NSE', 'Cement', 'INR', ARRAY['ultratech'], true, 11485.60),
('ACC Limited', 'ACC.NS', 'NSE', 'Cement', 'INR', ARRAY['acc cement'], true, 2185.40);

-- Function to hash MPIN securely
CREATE OR REPLACE FUNCTION public.hash_mpin(mpin_plain text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- In production, use proper hashing with salt
  -- For now, using a simple hash (replace with bcrypt in edge function)
  RETURN encode(digest(mpin_plain || 'satitrah_salt', 'sha256'), 'hex');
END;
$$;

-- Function to verify MPIN
CREATE OR REPLACE FUNCTION public.verify_mpin(user_email text, mpin_plain text)
RETURNS table(user_id uuid, is_valid boolean, auth_user_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_uuid uuid;
  auth_uuid uuid;
  stored_hash text;
  attempt_count integer;
  is_locked boolean;
BEGIN
  -- Get user by email with security info
  SELECT u.id, u.auth_user_id, us.mpin_hash, us.mpin_attempts, 
         (us.mpin_locked_until > now()) as locked
  INTO user_uuid, auth_uuid, stored_hash, attempt_count, is_locked
  FROM public.users u
  LEFT JOIN public.user_security us ON u.id = us.user_id
  WHERE u.email = user_email;
  
  -- Check if user exists
  IF user_uuid IS NULL THEN
    RETURN QUERY SELECT null::uuid, false, null::uuid;
    RETURN;
  END IF;
  
  -- Check if account is locked
  IF is_locked THEN
    RETURN QUERY SELECT user_uuid, false, auth_uuid;
    RETURN;
  END IF;
  
  -- Verify MPIN
  IF stored_hash = public.hash_mpin(mpin_plain) THEN
    -- Reset attempts on successful login
    UPDATE public.user_security 
    SET mpin_attempts = 0, last_mpin_attempt = now()
    WHERE user_id = user_uuid;
    
    RETURN QUERY SELECT user_uuid, true, auth_uuid;
  ELSE
    -- Increment attempts
    UPDATE public.user_security 
    SET mpin_attempts = COALESCE(mpin_attempts, 0) + 1,
        last_mpin_attempt = now(),
        mpin_locked_until = CASE 
          WHEN COALESCE(mpin_attempts, 0) + 1 >= 5 
          THEN now() + interval '30 minutes'
          ELSE null
        END
    WHERE user_id = user_uuid;
    
    RETURN QUERY SELECT user_uuid, false, auth_uuid;
  END IF;
END;
$$;