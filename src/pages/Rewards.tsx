import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Gift,
  Users,
  Star,
  Copy,
  Share,
  Coins,
  Trophy,
  Target,
  Zap,
  Heart,
  Crown,
  CheckCircle
} from "lucide-react";

export default function Rewards() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(2450);
  const [referralCode] = useState("SATI2024");
  const [referrals] = useState(8);

  const rewardTiers = [
    { name: "Bronze", min: 0, max: 1000, color: "bg-amber-600", current: false },
    { name: "Silver", min: 1001, max: 2500, color: "bg-gray-400", current: true },
    { name: "Gold", min: 2501, max: 5000, color: "bg-yellow-500", current: false },
    { name: "Platinum", min: 5001, max: 10000, color: "bg-purple-500", current: false },
  ];

  const rewardOffers = [
    { id: 1, title: "₹100 Cashback", points: 500, desc: "On next recharge", icon: Zap, type: "cashback" },
    { id: 2, title: "Free Movie Ticket", points: 800, desc: "BookMyShow voucher", icon: Heart, type: "voucher" },
    { id: 3, title: "Shopping Voucher", points: 1000, desc: "₹250 Amazon voucher", icon: Gift, type: "voucher" },
    { id: 4, title: "Premium Upgrade", points: 1500, desc: "1 month premium free", icon: Crown, type: "upgrade" },
  ];

  const referralRewards = [
    { title: "Refer a Friend", reward: "₹50 each", desc: "You and your friend both get ₹50", completed: true },
    { title: "3 Successful Referrals", reward: "₹100 Bonus", desc: "Get ₹100 when 3 friends join", completed: true },
    { title: "5 Successful Referrals", reward: "₹200 Bonus", desc: "Get ₹200 when 5 friends join", completed: true },
    { title: "10 Successful Referrals", reward: "₹500 Bonus", desc: "Get ₹500 when 10 friends join", completed: false },
  ];

  const earnMethods = [
    { title: "Daily Check-in", points: "10-50", icon: CheckCircle, desc: "Check in daily to earn points" },
    { title: "Complete Transactions", points: "1-5", icon: Zap, desc: "Earn points on every transaction" },
    { title: "Refer Friends", points: "100", icon: Users, desc: "Get points for each successful referral" },
    { title: "Pay Bills", points: "2-10", icon: Target, desc: "Earn points on bill payments" },
  ];

  const currentTier = rewardTiers.find(tier => tier.current);
  const nextTier = rewardTiers.find(tier => tier.min > points);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Satitrah',
        text: `Join Satitrah with my referral code ${referralCode} and get ₹50 bonus!`,
        url: 'https://satitrah.app'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Rewards</h1>
        </div>

        {/* Points Summary */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-3xl font-bold text-primary">{points}</h2>
                <p className="text-muted-foreground">Reward Points</p>
              </div>
            </div>
            
            {currentTier && nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Badge variant="secondary">{currentTier.name}</Badge>
                  <span className="text-muted-foreground">
                    {nextTier.min - points} points to {nextTier.name}
                  </span>
                </div>
                <Progress 
                  value={((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
        </Card>

        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Redeem</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="earn">Earn Points</TabsTrigger>
          </TabsList>

          {/* Redeem Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewardOffers.map((offer) => (
                <Card key={offer.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <offer.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground">{offer.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">{offer.points} points</Badge>
                        <Button 
                          size="sm" 
                          disabled={points < offer.points}
                          onClick={() => setPoints(points - offer.points)}
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Referrals */}
          <TabsContent value="referrals" className="space-y-6">
            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="text-2xl font-bold">{referrals}</h3>
                <p className="text-muted-foreground">Successful Referrals</p>
              </Card>
              <Card className="p-6 text-center">
                <Gift className="h-8 w-8 mx-auto mb-2 text-success" />
                <h3 className="text-2xl font-bold">₹{referrals * 50}</h3>
                <p className="text-muted-foreground">Earned from Referrals</p>
              </Card>
            </div>

            {/* Referral Code */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="flex-1 text-lg font-mono">{referralCode}</code>
                <Button size="sm" variant="outline" onClick={copyReferralCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={shareReferral}>
                  <Share className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Share this code with friends and earn ₹50 for each successful referral!
              </p>
            </Card>

            {/* Referral Milestones */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Referral Milestones</h3>
              <div className="space-y-4">
                {referralRewards.map((reward, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${reward.completed ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                      {reward.completed ? <CheckCircle className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{reward.title}</h4>
                        <Badge variant={reward.completed ? "default" : "secondary"}>
                          {reward.reward}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{reward.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Earn Points */}
          <TabsContent value="earn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnMethods.map((method, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                      <Badge variant="outline" className="mt-2">
                        {method.points} points
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Daily Tasks */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Daily Check-in</p>
                    <p className="text-sm text-muted-foreground">Earn 10 points</p>
                  </div>
                  <Button size="sm">Claim</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Complete a Transaction</p>
                    <p className="text-sm text-muted-foreground">Earn 5 points</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}