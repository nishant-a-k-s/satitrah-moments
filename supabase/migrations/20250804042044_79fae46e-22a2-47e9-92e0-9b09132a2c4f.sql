-- First, let's update the wallet_type enum to only include safebox and maternity
-- Drop the existing enum and recreate it
DROP TYPE IF EXISTS wallet_type CASCADE;

CREATE TYPE wallet_type AS ENUM ('safebox', 'maternity');

-- Update existing wallets: rename 'sati' to 'safebox', keep 'maternity', remove others
UPDATE wallets SET wallet_type = 'safebox' WHERE wallet_type::text = 'sati';
DELETE FROM wallets WHERE wallet_type::text NOT IN ('safebox', 'maternity');

-- Update the wallets table to use the new enum
ALTER TABLE wallets ALTER COLUMN wallet_type TYPE wallet_type USING wallet_type::text::wallet_type;

-- Create product_to_stock_mapping table for Indian brands
CREATE TABLE public.product_to_stock_mapping (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  parent_company TEXT NOT NULL,
  nse_symbol TEXT NOT NULL,
  logo_url TEXT,
  category TEXT NOT NULL,
  is_listed BOOLEAN DEFAULT true,
  keywords TEXT[], -- For better matching
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create merchant_to_stock_mapping table
CREATE TABLE public.merchant_to_stock_mapping (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_name TEXT NOT NULL,
  parent_company TEXT NOT NULL,
  nse_symbol TEXT NOT NULL,
  sector TEXT,
  logo_url TEXT,
  keywords TEXT[], -- For better matching
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_spend_logs table for comprehensive spend tracking
CREATE TABLE public.user_spend_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source TEXT NOT NULL, -- 'ocr', 'transaction', 'manual'
  brand_or_merchant TEXT NOT NULL,
  nse_symbol TEXT,
  amount NUMERIC DEFAULT 0,
  product_name TEXT,
  category TEXT,
  image_url TEXT, -- If from OCR
  transaction_ref TEXT, -- If from transaction matching
  metadata JSONB, -- Additional data
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_investment_status table for tracking investment status
CREATE TABLE public.user_investment_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nse_symbol TEXT NOT NULL,
  total_spend NUMERIC DEFAULT 0,
  has_invested BOOLEAN DEFAULT false,
  interested BOOLEAN DEFAULT false,
  last_nudge_sent TIMESTAMP WITH TIME ZONE,
  investment_amount NUMERIC DEFAULT 0,
  shares_owned NUMERIC DEFAULT 0,
  first_spend_date TIMESTAMP WITH TIME ZONE,
  last_spend_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, nse_symbol)
);

-- Enable RLS on all new tables
ALTER TABLE public.product_to_stock_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_to_stock_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_spend_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_investment_status ENABLE ROW LEVEL SECURITY;

-- RLS policies for product_to_stock_mapping (public read)
CREATE POLICY "Anyone can view product to stock mappings" 
ON public.product_to_stock_mapping 
FOR SELECT 
USING (true);

-- RLS policies for merchant_to_stock_mapping (public read)
CREATE POLICY "Anyone can view merchant to stock mappings" 
ON public.merchant_to_stock_mapping 
FOR SELECT 
USING (true);

-- RLS policies for user_spend_logs
CREATE POLICY "Users can view their own spend logs" 
ON public.user_spend_logs 
FOR SELECT 
USING (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

CREATE POLICY "Users can insert their own spend logs" 
ON public.user_spend_logs 
FOR INSERT 
WITH CHECK (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own spend logs" 
ON public.user_spend_logs 
FOR UPDATE 
USING (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

-- RLS policies for user_investment_status
CREATE POLICY "Users can view their own investment status" 
ON public.user_investment_status 
FOR SELECT 
USING (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

CREATE POLICY "Users can insert their own investment status" 
ON public.user_investment_status 
FOR INSERT 
WITH CHECK (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own investment status" 
ON public.user_investment_status 
FOR UPDATE 
USING (user_id IN (SELECT users.id FROM users WHERE users.auth_user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_product_mapping_brand ON product_to_stock_mapping(brand_name);
CREATE INDEX idx_product_mapping_symbol ON product_to_stock_mapping(nse_symbol);
CREATE INDEX idx_merchant_mapping_name ON merchant_to_stock_mapping(merchant_name);
CREATE INDEX idx_spend_logs_user_symbol ON user_spend_logs(user_id, nse_symbol);
CREATE INDEX idx_investment_status_user ON user_investment_status(user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_product_mapping_updated_at
BEFORE UPDATE ON public.product_to_stock_mapping
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_merchant_mapping_updated_at
BEFORE UPDATE ON public.merchant_to_stock_mapping
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investment_status_updated_at
BEFORE UPDATE ON public.user_investment_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update the initialize_user_wallets function to only create safebox and maternity wallets
CREATE OR REPLACE FUNCTION public.initialize_user_wallets(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.wallets (user_id, wallet_type, balance, currency)
  VALUES 
    (user_uuid, 'safebox', 0.00, 'INR'),
    (user_uuid, 'maternity', 0.00, 'INR');
END;
$$;