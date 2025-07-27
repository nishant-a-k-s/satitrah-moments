import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeft, Users, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RequestMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedContact, setSelectedContact] = useState("");

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Request Money</h1>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label>Choose Contact</Label>
              <Button 
                variant="outline" 
                className="w-full justify-start mt-2"
                onClick={() => setSelectedContact("Contact Selected")}
              >
                <Users className="h-4 w-4 mr-2" />
                {selectedContact || "Select from contacts"}
              </Button>
            </div>

            <div>
              <Label>Enter Amount</Label>
              <Input
                type="number"
                placeholder="₹0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl font-bold"
              />
            </div>

            <div className="flex gap-2">
              {[100, 500, 1000, 2000].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className="flex-1"
                >
                  ₹{preset}
                </Button>
              ))}
            </div>

            <div>
              <Label>Add Note (Optional)</Label>
              <Textarea
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Button 
          className="w-full" 
          disabled={!amount || !selectedContact}
        >
          <Send className="h-4 w-4 mr-2" />
          Send Request for ₹{amount || "0"}
        </Button>

        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            The person will receive a payment request and can pay instantly via UPI.
          </p>
        </Card>
      </div>
    </div>
  );
}