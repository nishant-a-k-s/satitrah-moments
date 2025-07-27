import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, Smartphone, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Recharge() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");

  const operators = ["Airtel", "Jio", "Vi", "BSNL"];
  const plans = [
    { amount: 199, validity: "28 days", benefits: "1.5GB/day, Unlimited calls" },
    { amount: 399, validity: "56 days", benefits: "2.5GB/day, Unlimited calls" },
    { amount: 599, validity: "84 days", benefits: "2GB/day, Unlimited calls" },
    { amount: 999, validity: "365 days", benefits: "3GB/day, Unlimited calls" },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Mobile Recharge</h1>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label>Mobile Number</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {mobileNumber.length === 10 && (
              <div>
                <Label>Operator</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {operators.map((op) => (
                    <Button
                      key={op}
                      variant={operator === op ? "default" : "outline"}
                      onClick={() => setOperator(op)}
                      className="h-12"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      {op}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {operator && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Popular Plans</h3>
            <div className="space-y-3">
              {plans.map((plan, index) => (
                <Button
                  key={index}
                  variant={amount === plan.amount.toString() ? "default" : "outline"}
                  className="w-full p-4 h-auto justify-start"
                  onClick={() => setAmount(plan.amount.toString())}
                >
                  <div className="text-left w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">₹{plan.amount}</span>
                      <span className="text-sm opacity-70">{plan.validity}</span>
                    </div>
                    <p className="text-xs opacity-70">{plan.benefits}</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        )}

        <Button 
          className="w-full" 
          disabled={!mobileNumber || !operator || !amount}
        >
          Recharge ₹{amount || "0"}
        </Button>
      </div>
    </div>
  );
}