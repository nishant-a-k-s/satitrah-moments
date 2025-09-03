import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Twilio credentials from environment
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, user_phone, agent_phone, sos_event_id } = await req.json();

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      throw new Error('Twilio credentials not configured');
    }

    const authString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    switch (action) {
      case 'call_user':
        return await callUser(user_phone, sos_event_id, authString);
        
      case 'create_conference':
        return await createConference(user_phone, agent_phone, sos_event_id, authString);
        
      case 'end_call':
        return await endCall(sos_event_id, authString);
        
      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Twilio voice bridge error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function callUser(userPhone: string, sosEventId: string, authString: string) {
  const twimlResponse = `
    <Response>
      <Say voice="alice">
        This is Lifelin3 emergency services. We received your SOS alert. 
        Please stay on the line while we connect you with an agent.
      </Say>
      <Dial>
        <Conference>sos-${sosEventId}</Conference>
      </Dial>
    </Response>
  `;

  const callData = new URLSearchParams({
    To: userPhone,
    From: TWILIO_PHONE_NUMBER!,
    Twiml: twimlResponse,
    StatusCallback: `https://your-domain.com/webhook/call-status/${sosEventId}`,
    StatusCallbackEvent: 'initiated,ringing,answered,completed'
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: callData
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Twilio error: ${result.message}`);
  }

  return new Response(JSON.stringify({
    call_sid: result.sid,
    status: result.status,
    sos_event_id: sosEventId
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createConference(userPhone: string, agentPhone: string, sosEventId: string, authString: string) {
  // First, call the agent and add them to the conference
  const agentTwiml = `
    <Response>
      <Say voice="alice">
        Emergency SOS call connecting. You are now joining the conference with the user.
      </Say>
      <Dial>
        <Conference>sos-${sosEventId}</Conference>
      </Dial>
    </Response>
  `;

  const agentCallData = new URLSearchParams({
    To: agentPhone,
    From: TWILIO_PHONE_NUMBER!,
    Twiml: agentTwiml,
  });

  const agentResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: agentCallData
  });

  const agentResult = await agentResponse.json();

  if (!agentResponse.ok) {
    throw new Error(`Twilio agent call error: ${agentResult.message}`);
  }

  return new Response(JSON.stringify({
    conference_name: `sos-${sosEventId}`,
    agent_call_sid: agentResult.sid,
    status: 'conference_created'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function endCall(sosEventId: string, authString: string) {
  // Get active calls for this conference and end them
  const callsResponse = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json?Status=in-progress`,
    {
      headers: {
        'Authorization': `Basic ${authString}`,
      }
    }
  );

  const callsData = await callsResponse.json();
  const activeConferenceCalls = callsData.calls.filter((call: any) => 
    call.to?.includes(`sos-${sosEventId}`) || call.from?.includes(`sos-${sosEventId}`)
  );

  // End all active calls for this SOS event
  const endPromises = activeConferenceCalls.map(async (call: any) => {
    return fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls/${call.sid}.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ Status: 'completed' })
    });
  });

  await Promise.all(endPromises);

  return new Response(JSON.stringify({
    message: 'Conference calls ended',
    calls_ended: activeConferenceCalls.length
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}