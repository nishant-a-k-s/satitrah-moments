import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

export interface WalkSession {
  id: string;
  user_id: string;
  status: 'active' | 'paused' | 'ended' | 'expired';
  risk_score: number;
  created_at: string;
  sampling_interval: number;
  location_sharing_enabled: boolean;
  media_capture_enabled: boolean;
}

export const useWalkWithMe = () => {
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<WalkSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  
  // Refs for cleanup
  const locationTrackingRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const durationRef = useRef<number | null>(null);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (locationTrackingRef.current) {
      clearInterval(locationTrackingRef.current);
      locationTrackingRef.current = null;
    }
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (durationRef.current) {
      clearInterval(durationRef.current);
      durationRef.current = null;
    }
  };

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          });
        },
        (error) => reject(error),
        { 
          enableHighAccuracy: true, 
          timeout: 10000,
          maximumAge: 60000 
        }
      );
    });
  };

  const startSession = async (startLocation: Location, settings: {
    sampling_interval?: number;
    location_sharing_enabled?: boolean;
    media_capture_enabled?: boolean;
  }) => {
    try {
      const response = await supabase.functions.invoke('walk-with-me-api/sessions', {
        body: {
          start_location: startLocation,
          sampling_interval: settings.sampling_interval || 15,
          location_sharing_enabled: settings.location_sharing_enabled ?? true,
          media_capture_enabled: settings.media_capture_enabled ?? false
        }
      });

      if (response.error) throw response.error;

      const session = response.data.session;
      setCurrentSession(session);
      setIsActive(true);
      setCurrentLocation(startLocation);

      // Start tracking intervals
      startLocationTracking(session.id, session.sampling_interval);
      startHeartbeat(session.id);
      startDurationTimer();

      return session;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  };

  const endSession = async () => {
    if (!currentSession) return;

    try {
      const endLocation = await getCurrentLocation();
      
      const response = await supabase.functions.invoke(`walk-with-me-api/sessions/${currentSession.id}`, {
        body: {
          status: 'ended',
          end_location: endLocation
        }
      });

      if (response.error) throw response.error;

      cleanup();
      setIsActive(false);
      setCurrentSession(null);
      setSessionDuration(0);
      setCurrentLocation(null);

      return response.data.session;
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  };

  const triggerSOS = async () => {
    if (!currentSession) throw new Error('No active session');

    try {
      const location = await getCurrentLocation();
      
      const response = await supabase.functions.invoke('walk-with-me-api/sos', {
        body: {
          walk_session_id: currentSession.id,
          location
        }
      });

      if (response.error) throw response.error;

      return response.data;
    } catch (error) {
      console.error('Error triggering SOS:', error);
      throw error;
    }
  };

  const startLocationTracking = (sessionId: string, interval: number) => {
    const intervalMs = interval * 1000;
    
    locationTrackingRef.current = window.setInterval(async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.error('Location tracking error:', error);
      }
    }, intervalMs);
  };

  const startHeartbeat = (sessionId: string) => {
    heartbeatRef.current = window.setInterval(async () => {
      if (currentLocation) {
        try {
          await supabase.functions.invoke('walk-with-me-api/heartbeat', {
            body: {
              walk_session_id: sessionId,
              location: currentLocation,
              battery_level: await getBatteryLevel(),
              device_status: navigator.onLine ? 'online' : 'offline',
              connectivity_status: getConnectionType()
            }
          });
        } catch (error) {
          console.error('Heartbeat error:', error);
        }
      }
    }, 15000); // Every 15 seconds
  };

  const startDurationTimer = () => {
    durationRef.current = window.setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);
  };

  const getBatteryLevel = async (): Promise<number> => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return Math.round(battery.level * 100);
      } catch (error) {
        console.log('Battery API not supported');
        return 100;
      }
    }
    return 100;
  };

  const getConnectionType = (): string => {
    const connection = (navigator as any).connection;
    return connection?.effectiveType || 'unknown';
  };

  return {
    currentSession,
    isActive,
    currentLocation,
    sessionDuration,
    startSession,
    endSession,
    triggerSOS,
    getCurrentLocation
  };
};