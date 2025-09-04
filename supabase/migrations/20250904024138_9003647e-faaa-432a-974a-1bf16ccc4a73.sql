-- Add new columns to user_consent table for enhanced settings
ALTER TABLE public.user_consent 
ADD COLUMN location_update_interval integer DEFAULT 15,
ADD COLUMN battery_saver_mode boolean DEFAULT false;