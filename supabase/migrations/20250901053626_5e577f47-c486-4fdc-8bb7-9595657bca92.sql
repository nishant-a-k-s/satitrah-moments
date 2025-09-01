-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mobile_number TEXT UNIQUE NOT NULL,
  mpin_hash TEXT NOT NULL,
  full_name TEXT,
  is_mpin_setup BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product company mapping table
CREATE TABLE public.product_company_mappings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  brand_name TEXT,
  company_name TEXT NOT NULL,
  stock_ticker TEXT,
  exchange TEXT CHECK (exchange IN ('NSE', 'BSE')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user spends table
CREATE TABLE public.user_spends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  merchant_name TEXT,
  category TEXT,
  mapped_company TEXT,
  mapped_ticker TEXT,
  spend_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_company_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_spends ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = auth_user_id);

-- Create policies for product mappings (public read)
CREATE POLICY "Anyone can view product mappings" 
ON public.product_company_mappings 
FOR SELECT 
USING (true);

-- Create policies for user spends
CREATE POLICY "Users can view their own spends" 
ON public.user_spends 
FOR SELECT 
USING (user_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can insert their own spends" 
ON public.user_spends 
FOR INSERT 
WITH CHECK (user_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_mappings_updated_at
  BEFORE UPDATE ON public.product_company_mappings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample product mappings for Indian companies
INSERT INTO public.product_company_mappings (product_name, brand_name, company_name, stock_ticker, exchange) VALUES
('iPhone', 'Apple', 'Apple Inc', 'AAPL', 'NSE'),
('Samsung Galaxy', 'Samsung', 'Samsung Electronics', 'SAMSNG', 'NSE'),
('Maggi', 'Maggi', 'Nestle India Limited', 'NESTLEIND', 'NSE'),
('Amul Milk', 'Amul', 'Gujarat Cooperative Milk Marketing Federation', 'GCMMF', 'NSE'),
('Tata Salt', 'Tata', 'Tata Consumer Products Limited', 'TATACONSUM', 'NSE'),
('Parle-G', 'Parle', 'Parle Products Pvt Ltd', 'PARLE', 'NSE'),
('Bisleri Water', 'Bisleri', 'Bisleri International', 'BISLERI', 'NSE'),
('Flipkart', 'Flipkart', 'Flipkart Internet Private Limited', 'FLIPKART', 'NSE'),
('Zomato', 'Zomato', 'Zomato Limited', 'ZOMATO', 'NSE'),
('Swiggy', 'Swiggy', 'Bundl Technologies Private Limited', 'SWIGGY', 'NSE');