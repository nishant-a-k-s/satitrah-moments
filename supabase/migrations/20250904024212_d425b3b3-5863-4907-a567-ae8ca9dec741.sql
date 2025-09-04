-- Add RLS policies for tables that don't have them

-- Enable RLS and add policies for agent_actions table
ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view all actions" ON public.agent_actions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

CREATE POLICY "Agents can create actions" ON public.agent_actions
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

-- Enable RLS and add policies for escalation_records table
ALTER TABLE public.escalation_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view escalation records" ON public.escalation_records
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

CREATE POLICY "Agents can create escalation records" ON public.escalation_records
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

-- Enable RLS and add policies for media_files table
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own media files" ON public.media_files
FOR SELECT USING (
  sos_event_id IN (
    SELECT id FROM sos_events 
    WHERE user_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  )
);

CREATE POLICY "Agents can view all media files" ON public.media_files
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

CREATE POLICY "System can create media files" ON public.media_files
FOR INSERT WITH CHECK (true);

-- Enable RLS and add policies for misuse_flags table
ALTER TABLE public.misuse_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view misuse flags" ON public.misuse_flags
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

CREATE POLICY "Agents can create misuse flags" ON public.misuse_flags
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

CREATE POLICY "Agents can update misuse flags" ON public.misuse_flags
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.auth_user_id = auth.uid() 
    AND profiles.full_name ILIKE '%Agent%'
  )
);

-- Fix the mutable search path for the calculate_risk_score function
CREATE OR REPLACE FUNCTION public.calculate_risk_score(p_sos_triggered boolean DEFAULT false, p_location jsonb DEFAULT NULL::jsonb, p_time_of_day time without time zone DEFAULT NULL::time without time zone, p_phone_offline boolean DEFAULT false, p_user_flagged boolean DEFAULT false, p_recent_sos_count integer DEFAULT 0)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  risk_score INTEGER := 0;
  current_hour INTEGER;
BEGIN
  -- Night-time (21:00–05:00): +2
  IF p_time_of_day IS NULL THEN
    current_hour := EXTRACT(HOUR FROM CURRENT_TIME);
  ELSE 
    current_hour := EXTRACT(HOUR FROM p_time_of_day);
  END IF;
  
  IF current_hour >= 21 OR current_hour <= 5 THEN
    risk_score := risk_score + 2;
  END IF;
  
  -- SOS triggered: +5
  IF p_sos_triggered THEN
    risk_score := risk_score + 5;
  END IF;
  
  -- Phone offline after SOS: +4
  IF p_phone_offline AND p_sos_triggered THEN
    risk_score := risk_score + 4;
  END IF;
  
  -- User profile flagged: +3
  IF p_user_flagged THEN
    risk_score := risk_score + 3;
  END IF;
  
  -- Repeated SOS in short window: +2
  IF p_recent_sos_count >= 3 THEN
    risk_score := risk_score + 2;
  END IF;
  
  -- Location in hotspot (placeholder - would integrate with crime data): +3
  -- IF is_high_crime_area(p_location) THEN
  --   risk_score := risk_score + 3;
  -- END IF;
  
  RETURN risk_score;
END;
$function$;