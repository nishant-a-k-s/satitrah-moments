// SpendsToStocks.tsx
import React, { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpendsToStocks() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Smart Spends-to-Stocks</h1>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            Upload receipts or log spending to discover investment opportunities
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload">Upload Receipt</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Upload Receipt Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Upload Receipt for OCR Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Take a photo or upload an image of your receipt to automatically detect spending patterns
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={() => {
                      setIsProcessing(true);
                      // handle OCR and upload logic here
                      setTimeout(() => {
                        setIsProcessing(false);
                        toast({ title: "Success", description: "Receipt processed successfully." });
                      }, 1500);
                    }}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    <Upload className="h-4 w-4" /> Upload Image
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Camera",
                        description: "Camera functionality would open here",
                      });
                    }}
                    disabled={isProcessing}
                  >
                    <Camera className="h-4 w-4" /> Take Photo
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual">
            <Card className="p-6">
              <p className="text-muted-foreground">Coming soon: Enter your spends manually to detect stocks.</p>
            </Card>
          </TabsContent>

          {/* Opportunities, Analytics, and History tabs can follow similar structure */}
        </Tabs>
      </div>
    </div>
  );
}

