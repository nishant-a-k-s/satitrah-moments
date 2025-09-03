-- Walk With Me Database Schema

-- Create walk_sessions table
CREATE TABLE public.walk_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'ended', 'expired')),
  start_location JSONB,
  end_location JSONB,
  risk_score INTEGER DEFAULT 0,
  sampling_interval INTEGER DEFAULT 15,
  battery_saver_mode BOOLEAN DEFAULT false,
  location_sharing_enabled BOOLEAN DEFAULT true,
  media_capture_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  session_metadata JSONB DEFAULT '{}'::jsonb
);

-- Create sos_events table
CREATE TABLE public.sos_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  walk_session_id UUID REFERENCES public.walk_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'acknowledged_by_agent', 'in_conference', 'escalated_to_contacts', 'escalated_to_police', 'closed', 'misuse_flagged')),
  handled BOOLEAN DEFAULT false,
  risk_score INTEGER DEFAULT 0,
  location JSONB,
  agent_id UUID,
  escalation_timer_started_at TIMESTAMP WITH TIME ZONE,
  escalation_timer_duration INTEGER DEFAULT 90,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  closed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create heartbeats table
CREATE TABLE public.heartbeats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  walk_session_id UUID REFERENCES public.walk_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  location JSONB NOT NULL,
  battery_level INTEGER,
  device_status TEXT CHECK (device_status IN ('online', 'offline', 'reconnecting', 'powered_off')),
  connectivity_status TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create media_files table
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sos_event_id UUID REFERENCES public.sos_events(id) ON DELETE CASCADE,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'audio', 'video')),
  file_path TEXT NOT NULL,
  file_size INTEGER,
  duration_seconds INTEGER,
  sequence_number INTEGER,
  encryption_key_id TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  retention_expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create escalation_records table
CREATE TABLE public.escalation_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sos_event_id UUID REFERENCES public.sos_events(id) ON DELETE CASCADE,
  escalation_type TEXT NOT NULL CHECK (escalation_type IN ('contacts', 'police', 'agent')),
  escalation_status TEXT NOT NULL CHECK (escalation_status IN ('pending', 'sent', 'delivered', 'failed', 'acknowledged')),
  recipient_info JSONB,
  webhook_response JSONB,
  agent_id UUID,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create user_consent table
CREATE TABLE public.user_consent (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  location_sharing BOOLEAN DEFAULT false,
  media_capture BOOLEAN DEFAULT false,
  background_location BOOLEAN DEFAULT false,
  consent_version TEXT NOT NULL,
  consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create misuse_flags table
CREATE TABLE public.misuse_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  flag_type TEXT NOT NULL CHECK (flag_type IN ('frequent_cancels', 'false_alarms', 'inconsistent_location', 'repeated_sos')),
  flag_count INTEGER DEFAULT 1,
  last_flagged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create agent_actions table  
CREATE TABLE public.agent_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  sos_event_id UUID REFERENCES public.sos_events(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('view_media', 'call_user', 'start_voice_bridge', 'notify_contacts', 'escalate_police', 'mark_misuse', 'clear_misuse', 'assign_agent', 'override')),
  action_details JSONB DEFAULT '{}'::jsonb,
  reason TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.walk_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heartbeats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misuse_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for walk_sessions
CREATE POLICY "Users can view their own walk sessions" 
ON public.walk_sessions 
FOR SELECT 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

CREATE POLICY "Users can create their own walk sessions" 
ON public.walk_sessions 
FOR INSERT 
WITH CHECK (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own walk sessions" 
ON public.walk_sessions 
FOR UPDATE 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

-- RLS Policies for sos_events
CREATE POLICY "Users can view their own SOS events" 
ON public.sos_events 
FOR SELECT 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

CREATE POLICY "Users can create their own SOS events" 
ON public.sos_events 
FOR INSERT 
WITH CHECK (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

-- RLS Policies for heartbeats
CREATE POLICY "Users can view their own heartbeats" 
ON public.heartbeats 
FOR SELECT 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

CREATE POLICY "Users can create their own heartbeats" 
ON public.heartbeats 
FOR INSERT 
WITH CHECK (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

-- RLS Policies for user_consent
CREATE POLICY "Users can view their own consent" 
ON public.user_consent 
FOR SELECT 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

CREATE POLICY "Users can update their own consent" 
ON public.user_consent 
FOR ALL 
USING (user_id IN (SELECT profiles.id FROM profiles WHERE profiles.auth_user_id = auth.uid()));

-- Agent policies (will need agent role)
CREATE POLICY "Agents can view all SOS events" 
ON public.sos_events 
FOR SELECT 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.auth_user_id = auth.uid() AND profiles.full_name LIKE '%Agent%'));

-- Create indexes for performance
CREATE INDEX idx_walk_sessions_user_id ON public.walk_sessions(user_id);
CREATE INDEX idx_walk_sessions_status ON public.walk_sessions(status);
CREATE INDEX idx_sos_events_user_id ON public.sos_events(user_id);
CREATE INDEX idx_sos_events_status ON public.sos_events(status);
CREATE INDEX idx_sos_events_walk_session ON public.sos_events(walk_session_id);
CREATE INDEX idx_heartbeats_session ON public.heartbeats(walk_session_id);
CREATE INDEX idx_heartbeats_timestamp ON public.heartbeats(timestamp);
CREATE INDEX idx_media_files_sos_event ON public.media_files(sos_event_id);

-- Create triggers for updated_at
CREATE TRIGGER update_walk_sessions_updated_at
  BEFORE UPDATE ON public.walk_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sos_events_updated_at
  BEFORE UPDATE ON public.sos_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_escalation_records_updated_at
  BEFORE UPDATE ON public.escalation_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_consent_updated_at
  BEFORE UPDATE ON public.user_consent
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Risk scoring function
CREATE OR REPLACE FUNCTION public.calculate_risk_score(
  p_sos_triggered BOOLEAN DEFAULT FALSE,
  p_location JSONB DEFAULT NULL,
  p_time_of_day TIME DEFAULT NULL,
  p_phone_offline BOOLEAN DEFAULT FALSE,
  p_user_flagged BOOLEAN DEFAULT FALSE,
  p_recent_sos_count INTEGER DEFAULT 0
) 
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
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
$$;