import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft, QrCode, Camera, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QRScanner() {
  const navigate = useNavigate();
  const [manualUPI, setManualUPI] = useState("");
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Scan & Pay</h1>
        </div>

        <Card className="p-6 text-center">
          <div className="space-y-4">
            <div className="w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Camera will open here for QR scanning
                </p>
              </div>
            </div>
            
            <Button className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Open Camera Scanner
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowManual(!showManual)}
          >
            <Hash className="h-4 w-4 mr-2" />
            Enter UPI ID Manually
          </Button>
        </div>

        {showManual && (
          <Card className="p-6">
            <div className="space-y-4">
              <Input
                placeholder="Enter UPI ID (e.g., example@paytm)"
                value={manualUPI}
                onChange={(e) => setManualUPI(e.target.value)}
              />
              <Button 
                className="w-full" 
                disabled={!manualUPI}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-3">
            <QrCode className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p className="font-medium">Scan any UPI QR code</p>
              <p className="text-muted-foreground">Pay merchants, friends & more</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}