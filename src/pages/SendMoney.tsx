import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, Users, Hash, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const methods = [
    { id: "contact", label: "Send to Contact", icon: Users, desc: "From phonebook" },
    { id: "upi", label: "Send to UPI ID", icon: Hash, desc: "Enter UPI ID" },
    { id: "bank", label: "Send to Bank A/c", icon: Building2, desc: "NEFT/IMPS" },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Send Money</h1>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Choose Method</h3>
          <div className="space-y-3">
            {methods.map((method) => (
              <Button
                key={method.id}
                variant={selectedMethod === method.id ? "default" : "outline"}
                className="w-full justify-start p-4 h-auto"
                onClick={() => setSelectedMethod(method.id)}
              >
                <method.icon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">{method.label}</p>
                  <p className="text-xs opacity-70">{method.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {selectedMethod && (
          <Card className="p-6">
            <div className="space-y-4">
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

              {selectedMethod === "upi" && (
                <div>
                  <Label>UPI ID</Label>
                  <Input placeholder="example@paytm" />
                </div>
              )}

              {selectedMethod === "contact" && (
                <Button variant="outline" className="w-full">
                  Select Contact
                </Button>
              )}

              {selectedMethod === "bank" && (
                <div className="space-y-3">
                  <Input placeholder="Account Number" />
                  <Input placeholder="IFSC Code" />
                  <Input placeholder="Beneficiary Name" />
                </div>
              )}
            </div>
          </Card>
        )}

        <Button 
          className="w-full" 
          disabled={!amount || !selectedMethod}
        >
          Send ₹{amount || "0"}
        </Button>
      </div>
    </div>
  );
}