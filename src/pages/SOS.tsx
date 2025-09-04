import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Mic, Ambulance, Heart, MapPin, Phone, Clock, AlertTriangle } from "lucide-react";
import WalkWithMe from "@/components/WalkWithMe";
import SOSButton from "@/components/SOSButton";

const SOS = () => {
  const [isVoiceSOSEnabled, setIsVoiceSOSEnabled] = useState(true);

  const handleSOSActivated = () => {
    console.log("SOS activated from main button");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-destructive/10 rounded-full">
              <Shield className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Emergency & SOS</h1>
          <p className="text-muted-foreground">Your safety is our priority. Quick access to emergency services.</p>
        </div>

        {/* Emergency SOS Button */}
        <Card className="p-8 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <div className="text-center space-y-6">
            <SOSButton onSOSActivated={handleSOSActivated} />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Emergency SOS</h3>
              <p className="text-muted-foreground">Tap for immediate emergency assistance</p>
            </div>
          </div>
        </Card>

        {/* Voice-Activated SOS */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Help Lifelin3 SOS</h3>
                <p className="text-sm text-muted-foreground">Say "Help Lifelin3 SOS" to trigger emergency mode</p>
              </div>
            </div>
            <Switch 
              checked={isVoiceSOSEnabled} 
              onCheckedChange={setIsVoiceSOSEnabled}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              <span className="text-sm">Perfect for labor pain or immobilized conditions</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">Automatically shares location and vital signs</span>
            </div>
          </div>
        </Card>

        {/* Walk With Me Feature */}
        <WalkWithMe />

        {/* Ambulance Services */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Ambulance className="h-6 w-6 text-secondary" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ambulance Services</h3>
                <p className="text-sm text-muted-foreground">Emergency medical transport with special pricing</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-secondary/5 border-secondary/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Pregnant Users</Badge>
                  </div>
                  <h4 className="font-semibold">Special Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhanced ambulance services available through Maternal Wallet
                  </p>
                  <Button variant="secondary" size="sm">
                    View in Wallet
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">All Users</Badge>
                  </div>
                  <h4 className="font-semibold">Standard Service</h4>
                  <p className="text-sm text-muted-foreground">
                    20% less than market prices
                  </p>
                  <Button variant="outline" size="sm">
                    View Rates
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Emergency Contacts Access */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Emergency Fund Access</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Partner/Caregiver Contact</p>
                  <p className="text-sm text-muted-foreground">Registered contacts can call Lifelin3 for fund access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">MPIN Authentication</p>
                  <p className="text-sm text-muted-foreground">Secure MPIN generated for wallet unlock</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Instant Fund Access</p>
                  <p className="text-sm text-muted-foreground">Maternity wallet unlocked, auto top-up if needed</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SOS;
