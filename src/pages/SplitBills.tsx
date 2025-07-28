import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Users,
  Plus,
  Minus,
  Calculator,
  Share,
  DollarSign,
  GraduationCap,
  Briefcase,
  Home,
  Coffee,
  Car,
  Utensils
} from "lucide-react";

export default function SplitBills() {
  const navigate = useNavigate();
  const [billAmount, setBillAmount] = useState("");
  const [billName, setBillName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", amount: 0, paid: false },
    { id: 2, name: "Rahul", amount: 0, paid: false },
  ]);

  const categories = {
    students: [
      { id: "food", label: "Food & Snacks", icon: Utensils, color: "bg-orange-100 text-orange-800" },
      { id: "transport", label: "Transport", icon: Car, color: "bg-blue-100 text-blue-800" },
      { id: "books", label: "Books & Supplies", icon: GraduationCap, color: "bg-green-100 text-green-800" },
      { id: "entertainment", label: "Entertainment", icon: Coffee, color: "bg-purple-100 text-purple-800" },
    ],
    professionals: [
      { id: "office-lunch", label: "Office Lunch", icon: Utensils, color: "bg-orange-100 text-orange-800" },
      { id: "travel", label: "Business Travel", icon: Car, color: "bg-blue-100 text-blue-800" },
      { id: "team-dinner", label: "Team Dinner", icon: Coffee, color: "bg-purple-100 text-purple-800" },
      { id: "office-supplies", label: "Office Supplies", icon: Briefcase, color: "bg-green-100 text-green-800" },
    ],
    general: [
      { id: "general", label: "General", icon: DollarSign, color: "bg-gray-100 text-gray-800" },
      { id: "rent", label: "Rent", icon: Home, color: "bg-red-100 text-red-800" },
      { id: "utilities", label: "Utilities", icon: Briefcase, color: "bg-yellow-100 text-yellow-800" },
      { id: "groceries", label: "Groceries", icon: Utensils, color: "bg-green-100 text-green-800" },
    ]
  };

  const activeBills = [
    { 
      id: 1, 
      name: "Pizza Night", 
      amount: 850, 
      participants: 4, 
      yourShare: 212.50, 
      status: "pending",
      category: "food"
    },
    { 
      id: 2, 
      name: "Uber Ride", 
      amount: 320, 
      participants: 3, 
      yourShare: 106.67, 
      status: "paid",
      category: "transport"
    },
    { 
      id: 3, 
      name: "Office Lunch", 
      amount: 1200, 
      participants: 5, 
      yourShare: 240, 
      status: "pending",
      category: "office-lunch"
    },
  ];

  const addParticipant = () => {
    const newId = Math.max(...participants.map(p => p.id)) + 1;
    setParticipants([...participants, { id: newId, name: `Person ${newId}`, amount: 0, paid: false }]);
  };

  const removeParticipant = (id: number) => {
    if (participants.length > 2 && id !== 1) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  const splitEqually = () => {
    const amount = parseFloat(billAmount) || 0;
    const perPerson = amount / participants.length;
    setParticipants(participants.map(p => ({ ...p, amount: perPerson })));
  };

  const updateParticipantAmount = (id: number, amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, amount: numAmount } : p
    ));
  };

  const updateParticipantName = (id: number, name: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, name } : p
    ));
  };

  const totalSplit = participants.reduce((sum, p) => sum + p.amount, 0);
  const remainingAmount = (parseFloat(billAmount) || 0) - totalSplit;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Split Bills</h1>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Split</TabsTrigger>
            <TabsTrigger value="active">Active Bills</TabsTrigger>
          </TabsList>

          {/* Create Split */}
          <TabsContent value="create" className="space-y-6">
            {/* Category Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose Category</h3>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="professionals">Professionals</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
                
                {Object.entries(categories).map(([key, categoryList]) => (
                  <TabsContent key={key} value={key} className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categoryList.map((category) => (
                        <Button
                          key={category.id}
                          variant="outline"
                          className="h-auto p-3 flex-col gap-2"
                          onClick={() => setBillName(category.label)}
                        >
                          <category.icon className="h-6 w-6" />
                          <span className="text-xs text-center">{category.label}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>

            {/* Bill Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bill Details</h3>
              <div className="space-y-4">
                <div>
                  <Label>Bill Name</Label>
                  <Input
                    placeholder="Enter bill name"
                    value={billName}
                    onChange={(e) => setBillName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <Input
                    type="number"
                    placeholder="₹0"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Participants */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Participants</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={splitEqually}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Split Equally
                  </Button>
                  <Button size="sm" variant="outline" onClick={addParticipant}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Input
                      placeholder="Name"
                      value={participant.name}
                      onChange={(e) => updateParticipantName(participant.id, e.target.value)}
                      className="flex-1"
                      disabled={participant.id === 1}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹</span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={participant.amount || ""}
                        onChange={(e) => updateParticipantAmount(participant.id, e.target.value)}
                        className="w-24"
                      />
                    </div>
                    {participant.id !== 1 && participants.length > 2 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeParticipant(participant.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 p-3 bg-card rounded-lg border">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span>₹{billAmount || "0"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Split:</span>
                  <span>₹{totalSplit.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between text-sm font-medium ${remainingAmount === 0 ? 'text-success' : 'text-destructive'}`}>
                  <span>Remaining:</span>
                  <span>₹{remainingAmount.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full" 
              disabled={!billName || !billAmount || remainingAmount !== 0}
            >
              Create Split Bill
            </Button>
          </TabsContent>

          {/* Active Bills */}
          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              {activeBills.map((bill) => (
                <Card key={bill.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{bill.name}</h3>
                        <Badge variant={bill.status === "paid" ? "default" : "secondary"}>
                          {bill.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{bill.participants} participants</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total: ₹{bill.amount}</span>
                          <span className="font-medium">Your share: ₹{bill.yourShare}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                      {bill.status === "pending" && (
                        <Button size="sm">Pay Now</Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {activeBills.length === 0 && (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Active Bills</h3>
                <p className="text-muted-foreground">Create a new split to get started</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}