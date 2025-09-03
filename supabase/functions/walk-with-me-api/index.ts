import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

interface WalkSession {
  id?: string;
  user_id: string;
  status: 'active' | 'paused' | 'ended' | 'expired';
  start_location?: any;
  end_location?: any;
  risk_score?: number;
  sampling_interval?: number;
  battery_saver_mode?: boolean;
  location_sharing_enabled?: boolean;
  media_capture_enabled?: boolean;
}

interface SOSEvent {
  id?: string;
  walk_session_id: string;
  user_id: string;
  status: 'open' | 'acknowledged_by_agent' | 'in_conference' | 'escalated_to_contacts' | 'escalated_to_police' | 'closed' | 'misuse_flagged';
  location?: any;
  risk_score?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // Get user from JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!profile) {
      throw new Error('User profile not found');
    }

    const userId = profile.id;

    // Route handling
    if (path === '/walk-with-me-api/sessions' && method === 'POST') {
      return await createWalkSession(req, userId);
    }
    
    if (path === '/walk-with-me-api/sessions' && method === 'GET') {
      return await getUserSessions(userId);
    }

    if (path.startsWith('/walk-with-me-api/sessions/') && method === 'PUT') {
      const sessionId = path.split('/')[3];
      return await updateWalkSession(req, sessionId, userId);
    }

    if (path === '/walk-with-me-api/heartbeat' && method === 'POST') {
      return await recordHeartbeat(req, userId);
    }

    if (path === '/walk-with-me-api/sos' && method === 'POST') {
      return await createSOSEvent(req, userId);
    }

    if (path === '/walk-with-me-api/consent' && method === 'POST') {
      return await updateConsent(req, userId);
    }

    if (path === '/walk-with-me-api/risk-score' && method === 'POST') {
      return await calculateRiskScore(req, userId);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in walk-with-me-api:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createWalkSession(req: Request, userId: string) {
  const body = await req.json();
  const { start_location, sampling_interval, location_sharing_enabled, media_capture_enabled } = body;

  // Check daily session limit (2 per day unless high risk)
  const today = new Date().toISOString().split('T')[0];
  const { data: sessionsToday } = await supabase
    .from('walk_sessions')
    .select('id, risk_score')
    .eq('user_id', userId)
    .gte('created_at', `${today}T00:00:00.000Z`)
    .lt('created_at', `${today}T23:59:59.999Z`);

  const nonHighRiskSessions = sessionsToday?.filter(s => (s.risk_score || 0) < 9) || [];
  
  if (nonHighRiskSessions.length >= 2) {
    return new Response(JSON.stringify({ 
      error: 'Daily session limit reached. Contact support if you need emergency assistance.',
      code: 'DAILY_LIMIT_EXCEEDED'
    }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const session: WalkSession = {
    user_id: userId,
    status: 'active',
    start_location,
    sampling_interval: sampling_interval || 15,
    location_sharing_enabled: location_sharing_enabled ?? true,
    media_capture_enabled: media_capture_enabled ?? false,
  };

  const { data, error } = await supabase
    .from('walk_sessions')
    .insert(session)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return new Response(JSON.stringify({ session: data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateWalkSession(req: Request, sessionId: string, userId: string) {
  const body = await req.json();
  const { status, end_location } = body;

  const updates: any = { status };
  if (end_location) {
    updates.end_location = end_location;
  }
  if (status === 'ended') {
    updates.ended_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('walk_sessions')
    .update(updates)
    .eq('id', sessionId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return new Response(JSON.stringify({ session: data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function recordHeartbeat(req: Request, userId: string) {
  const body = await req.json();
  const { walk_session_id, location, battery_level, device_status, connectivity_status } = body;

  const { data, error } = await supabase
    .from('heartbeats')
    .insert({
      walk_session_id,
      user_id: userId,
      location,
      battery_level,
      device_status,
      connectivity_status,
    });

  if (error) {
    throw error;
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createSOSEvent(req: Request, userId: string) {
  const body = await req.json();
  const { walk_session_id, location, media_files } = body;

  // Calculate risk score
  const riskScore = await calculateSOSRiskScore(userId, location);
  
  const sosEvent: SOSEvent = {
    walk_session_id,
    user_id: userId,
    status: 'open',
    location,
    risk_score: riskScore,
  };

  const { data, error } = await supabase
    .from('sos_events')
    .insert(sosEvent)
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Update session risk score
  await supabase
    .from('walk_sessions')
    .update({ risk_score: riskScore })
    .eq('id', walk_session_id);

  // Broadcast to realtime channel for agents
  await broadcastSOSToAgents(data);

  // Start escalation timer if high risk
  if (riskScore >= 9) {
    await scheduleEscalation(data.id, 90); // 90 seconds
  }

  return new Response(JSON.stringify({ sos_event: data, risk_score: riskScore }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function calculateSOSRiskScore(userId: string, location: any): Promise<number> {
  // Check recent SOS events
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: recentSOS } = await supabase
    .from('sos_events')
    .select('id')
    .eq('user_id', userId)
    .gte('created_at', oneDayAgo);

  // Check if user is flagged for misuse
  const { data: flags } = await supabase
    .from('misuse_flags')
    .select('flag_type')
    .eq('user_id', userId)
    .is('resolved_at', null);

  const { data: riskData } = await supabase
    .rpc('calculate_risk_score', {
      p_sos_triggered: true,
      p_location: location,
      p_recent_sos_count: recentSOS?.length || 0,
      p_user_flagged: (flags?.length || 0) > 0,
      p_phone_offline: false, // Will be updated by heartbeat monitoring
    });

  return riskData || 5; // Default SOS risk score
}

async function broadcastSOSToAgents(sosEvent: any) {
  // This would integrate with your realtime system
  console.log('Broadcasting SOS to agents:', sosEvent);
  
  // Broadcast via Supabase Realtime
  await supabase.channel('agent-alerts').send({
    type: 'broadcast',
    event: 'sos-created',
    payload: sosEvent
  });
}

async function scheduleEscalation(sosEventId: string, delaySeconds: number) {
  // In production, this would use a job queue or scheduled function
  console.log(`Scheduling escalation for SOS ${sosEventId} in ${delaySeconds} seconds`);
}

async function getUserSessions(userId: string) {
  const { data, error } = await supabase
    .from('walk_sessions')
    .select(`
      *,
      sos_events (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return new Response(JSON.stringify({ sessions: data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateConsent(req: Request, userId: string) {
  const body = await req.json();
  const { location_sharing, media_capture, background_location, consent_version } = body;

  const { data, error } = await supabase
    .from('user_consent')
    .upsert({
      user_id: userId,
      location_sharing,
      media_capture,
      background_location,
      consent_version: consent_version || '1.0',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return new Response(JSON.stringify({ consent: data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function calculateRiskScore(req: Request, userId: string) {
  const body = await req.json();
  const { location, sos_triggered, phone_offline } = body;

  const riskScore = await calculateSOSRiskScore(userId, location);

  return new Response(JSON.stringify({ risk_score: riskScore }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}