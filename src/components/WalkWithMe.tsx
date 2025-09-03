import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, AlertTriangle, Camera, Mic, Navigation, Clock, Battery, Wifi } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

interface WalkSession {
  id: string;
  status: 'active' | 'paused' | 'ended' | 'expired';
  risk_score: number;
  created_at: string;
}

interface ConsentSettings {
  location_sharing: boolean;
  media_capture: boolean;
  background_location: boolean;
}

const WalkWithMe = () => {
  const { user } = useSimpleAuth();
  const { toast } = useToast();
  
  // State management
  const [currentSession, setCurrentSession] = useState<WalkSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    location_sharing: true,
    media_capture: false,
    background_location: false
  });
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  
  // Refs for intervals
  const locationTrackingRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const durationRef = useRef<number | null>(null);
  
  // Check for existing consent on mount
  useEffect(() => {
    checkExistingConsent();
    setupNetworkListener();
    requestBatteryInfo();
    return cleanup;
  }, []);

  const checkExistingConsent = async () => {
    try {
      const { data } = await supabase
        .from('user_consent')
        .select('*')
        .single();
      
      if (data) {
        setConsent({
          location_sharing: data.location_sharing,
          media_capture: data.media_capture,
          background_location: data.background_location
        });
      } else {
        setShowConsentModal(true);
      }
    } catch (error) {
      console.log('No existing consent found');
      setShowConsentModal(true);
    }
  };

  const setupNetworkListener = () => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  };

  const requestBatteryInfo = async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      } catch (error) {
        console.log('Battery API not supported');
      }
    }
  };

  const cleanup = () => {
    if (locationTrackingRef.current) clearInterval(locationTrackingRef.current);
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    if (durationRef.current) clearInterval(durationRef.current);
  };

  const handleConsentSave = async () => {
    try {
      const response = await supabase.functions.invoke('walk-with-me-api', {
        body: {
          ...consent,
          consent_version: '1.0'
        }
      });

      if (response.error) throw response.error;

      setShowConsentModal(false);
      toast({
        title: "Consent saved",
        description: "Your privacy preferences have been updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save consent preferences.",
        variant: "destructive"
      });
    }
  };

  const startWalkSession = async () => {
    try {
      // Request permissions first
      if (consent.location_sharing && !await requestLocationPermission()) {
        return;
      }

      if (consent.media_capture && !await requestMediaPermissions()) {
        return;
      }

      // Get current location
      const location = await getCurrentLocation();
      setCurrentLocation(location);

      // Create session
      const response = await supabase.functions.invoke('walk-with-me-api', {
        body: {
          start_location: location,
          sampling_interval: batteryLevel < 20 ? 30 : 15, // Battery saver mode
          location_sharing_enabled: consent.location_sharing,
          media_capture_enabled: consent.media_capture
        }
      });

      if (response.error) throw response.error;

      const session = response.data.session;
      setCurrentSession(session);
      setIsActive(true);
      setRiskScore(session.risk_score || 0);

      // Start tracking
      startLocationTracking(session.id);
      startHeartbeat(session.id);
      startDurationTimer();

      toast({
        title: "Walk With Me started",
        description: "You're now being monitored for safety."
      });
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: "Error",
        description: "Failed to start Walk With Me session.",
        variant: "destructive"
      });
    }
  };

  const stopWalkSession = async () => {
    if (!currentSession) return;

    try {
      const location = await getCurrentLocation();
      
      const response = await supabase.functions.invoke('walk-with-me-api', {
        body: {
          status: 'ended',
          end_location: location
        }
      });

      if (response.error) throw response.error;

      cleanup();
      setIsActive(false);
      setCurrentSession(null);
      setSessionDuration(0);
      setRiskScore(0);

      toast({
        title: "Session ended",
        description: "Walk With Me session completed safely."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error ending session.",
        variant: "destructive"
      });
    }
  };

  const triggerSOS = async () => {
    if (!currentSession) return;

    try {
      // Capture media if enabled
      let mediaFiles = [];
      if (consent.media_capture) {
        mediaFiles = await captureEmergencyMedia();
      }

      const location = await getCurrentLocation();
      
      const response = await supabase.functions.invoke('walk-with-me-api', {
        body: {
          walk_session_id: currentSession.id,
          location,
          media_files: mediaFiles
        }
      });

      if (response.error) throw response.error;

      setRiskScore(response.data.risk_score);
      setShowSOSModal(false);

      toast({
        title: "SOS Activated",
        description: "Emergency services have been notified.",
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "SOS Error",
        description: "Failed to activate SOS. Please call emergency services directly.",
        variant: "destructive"
      });
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your device doesn't support location services.",
        variant: "destructive"
      });
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => {
          toast({
            title: "Location permission denied",
            description: "Location access is required for Walk With Me.",
            variant: "destructive"
          });
          resolve(false);
        }
      );
    });
  };

  const requestMediaPermissions = async (): Promise<boolean> => {
    try {
      await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      return true;
    } catch (error) {
      toast({
        title: "Camera/Microphone permission denied",
        description: "Media access is needed for emergency situations.",
        variant: "destructive"
      });
      return false;
    }
  };

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          });
        },
        reject,
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  const startLocationTracking = (sessionId: string) => {
    const interval = batteryLevel < 20 ? 30000 : 15000; // Battery saver mode
    
    locationTrackingRef.current = window.setInterval(async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
        
        // Send heartbeat will include location
      } catch (error) {
        console.error('Location tracking error:', error);
      }
    }, interval);
  };

  const startHeartbeat = (sessionId: string) => {
    heartbeatRef.current = window.setInterval(async () => {
      if (currentLocation) {
        try {
          await supabase.functions.invoke('walk-with-me-api', {
            body: {
              walk_session_id: sessionId,
              location: currentLocation,
              battery_level: batteryLevel,
              device_status: isOnline ? 'online' : 'offline',
              connectivity_status: (navigator as any).connection?.effectiveType || 'unknown'
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

  const captureEmergencyMedia = async (): Promise<any[]> => {
    const mediaFiles = [];
    
    try {
      // Capture 3 quick photos
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Wait for video to be ready
      await new Promise(resolve => video.onloadedmetadata = resolve);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      for (let i = 0; i < 3; i++) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);
        
        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(resolve as BlobCallback, 'image/jpeg', 0.8);
        });
        
        mediaFiles.push({
          type: 'image',
          blob,
          sequence: i + 1,
          timestamp: Date.now()
        });

        // Small delay between captures
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Media capture error:', error);
    }

    return mediaFiles;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskLevel = (score: number) => {
    if (score <= 4) return { level: 'Normal', color: 'bg-green-500' };
    if (score <= 8) return { level: 'Elevated', color: 'bg-yellow-500' };
    return { level: 'High', color: 'bg-red-500' };
  };

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please log in to use Walk With Me</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Walk With Me Card */}
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${isActive ? 'bg-green-500/10' : 'bg-primary/10'}`}>
              <MapPin className={`h-12 w-12 ${isActive ? 'text-green-500' : 'text-primary'}`} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">Walk With Me</h2>
          
          {!isActive ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Stay safe with real-time location tracking and emergency SOS
              </p>
              <Button 
                size="lg" 
                onClick={startWalkSession}
                className="bg-primary hover:bg-primary/90"
              >
                <Shield className="h-5 w-5 mr-2" />
                Start Walk With Me
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(sessionDuration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  <span>{batteryLevel}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${isOnline ? 'text-green-500' : 'text-red-500'}`} />
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              {riskScore > 0 && (
                <div className="flex justify-center">
                  <Badge className={`${getRiskLevel(riskScore).color} text-white`}>
                    Risk Level: {getRiskLevel(riskScore).level} ({riskScore})
                  </Badge>
                </div>
              )}

              <div className="flex space-x-3">
                <Button 
                  size="lg"
                  variant="destructive"
                  onClick={() => setShowSOSModal(true)}
                  className="flex-1 h-16 text-lg font-bold animate-pulse"
                >
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  SOS
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={stopWalkSession}
                  className="flex-1 h-16"
                >
                  Stop Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Status Information */}
      {currentLocation && (
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Location Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Latitude</p>
                <p className="font-mono">{currentLocation.latitude.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Longitude</p>
                <p className="font-mono">{currentLocation.longitude.toFixed(6)}</p>
              </div>
              {currentLocation.accuracy && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Accuracy: {Math.round(currentLocation.accuracy)}m</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Consent Modal */}
      <Dialog open={showConsentModal} onOpenChange={setShowConsentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Keep you safe — let Walk With Me access location, camera & mic</DialogTitle>
            <DialogDescription>
              When active, Walk With Me shares your live location and can capture short media in emergencies to help responders. 
              Media is uploaded only during emergencies, encrypted in transit and at rest, and deleted after 30 days unless required for legal reasons. 
              You can opt out but SOS features may be limited.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="location-sharing"
                checked={consent.location_sharing}
                onCheckedChange={(checked) => setConsent(prev => ({ ...prev, location_sharing: checked }))}
              />
              <label htmlFor="location-sharing" className="text-sm font-medium">
                Share live location with agent
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="media-capture"
                checked={consent.media_capture}
                onCheckedChange={(checked) => setConsent(prev => ({ ...prev, media_capture: checked }))}
              />
              <label htmlFor="media-capture" className="text-sm font-medium">
                Allow camera & microphone for emergencies
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="background-location"
                checked={consent.background_location}
                onCheckedChange={(checked) => setConsent(prev => ({ ...prev, background_location: checked }))}
              />
              <label htmlFor="background-location" className="text-sm font-medium">
                Allow background location access
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsentModal(false)}>
              Not Now
            </Button>
            <Button onClick={handleConsentSave}>
              Allow & Start
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SOS Confirmation Modal */}
      <Dialog open={showSOSModal} onOpenChange={setShowSOSModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Confirm SOS — we will call your emergency contacts</DialogTitle>
            <DialogDescription>
              We will attempt to connect you to an agent and notify your emergency contacts immediately.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="media-consent"
                checked={consent.media_capture}
                onCheckedChange={(checked) => setConsent(prev => ({ ...prev, media_capture: !!checked }))}
              />
              <label htmlFor="media-consent" className="text-sm">
                Allow immediate upload of camera frames & audio (required for full SOS features)
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSOSModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={triggerSOS}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Activate SOS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalkWithMe;