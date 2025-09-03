import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Camera, Mic, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SOSButtonProps {
  onSOSActivated: () => void;
  disabled?: boolean;
  className?: string;
}

const SOSButton = ({ onSOSActivated, disabled = false, className = "" }: SOSButtonProps) => {
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleSOSClick = () => {
    if (disabled) return;
    setShowConfirmation(true);
  };

  const confirmSOS = async () => {
    setIsActivating(true);
    
    try {
      await onSOSActivated();
      setShowConfirmation(false);
      
      toast({
        title: "SOS Activated",
        description: "Emergency services have been notified. Stay calm, help is on the way.",
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "SOS Failed",
        description: "Failed to activate SOS. Please call emergency services directly if needed.",
        variant: "destructive"
      });
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        variant="destructive"
        onClick={handleSOSClick}
        disabled={disabled || isActivating}
        className={`h-24 w-24 rounded-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold animate-pulse shadow-lg ${className}`}
      >
        <div className="flex flex-col items-center gap-1">
          <AlertTriangle className="h-8 w-8" />
          <span>SOS</span>
        </div>
      </Button>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency SOS Confirmation
            </DialogTitle>
            <DialogDescription>
              This will immediately notify emergency services and your emergency contacts. 
              Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-red-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-red-800">What happens when you activate SOS:</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Your exact location will be shared with emergency services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>Emergency photos will be captured automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  <span>Audio recording will start to help responders</span>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Only activate SOS in genuine emergencies. Misuse may result in restricted access.
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              disabled={isActivating}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmSOS}
              disabled={isActivating}
            >
              {isActivating ? "Activating..." : "Confirm Emergency SOS"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;