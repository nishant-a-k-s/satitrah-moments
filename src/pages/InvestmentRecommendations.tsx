import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Shield, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InvestmentRecommendations = () => {
  const navigate = useNavigate();

  const riskProfile = {
    type: "Moderate",
    score: 6,
    description: "Balanced approach with moderate risk tolerance"
  };

  const recommendations = [
    {
      id: 1,
      name: "HDFC Balanced Advantage Fund",
      type: "Hybrid Fund",
      returns: "12.4%",
      period: "3Y",
      risk: "Medium",
      minInvestment: "₹500",
      rating: 4.5,
      recommended: true
    },
    {
      id: 2,
      name: "Axis Bluechip Fund",
      type: "Large Cap Equity",
      returns: "14.2%",
      period: "5Y",
      risk: "Medium-High",
      minInvestment: "₹1000",
      rating: 4.3,
      recommended: true
    },
    {
      id: 3,
      name: "SBI Small Cap Fund",
      type: "Small Cap Equity",
      returns: "16.8%",
      period: "3Y",
      risk: "High",
      minInvestment: "₹1000",
      rating: 4.1,
      recommended: false
    },
    {
      id: 4,
      name: "ICICI Prudential Corporate Bond Fund",
      type: "Debt Fund",
      returns: "7.2%",
      period: "3Y",
      risk: "Low",
      minInvestment: "₹100",
      rating: 4.0,
      recommended: true
    }
  ];

  const expectedReturns = {
    "3Y": "11.5%",
    "5Y": "13.2%"
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Investment Recommendations</h1>
        </div>

        <div className="space-y-6">
          {/* Risk Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Your Risk Profile</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Level</span>
                <Badge variant="secondary">{riskProfile.type}</Badge>
              </div>
              <Progress value={riskProfile.score * 10} className="h-2" />
              <p className="text-sm text-muted-foreground">{riskProfile.description}</p>
            </div>
          </Card>

          {/* Expected Returns */}
          <Card className="p-6 bg-gradient-success text-secondary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5" />
              <h3 className="font-medium">Expected Portfolio Returns</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{expectedReturns["3Y"]}</p>
                <p className="text-sm opacity-90">3 Years</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{expectedReturns["5Y"]}</p>
                <p className="text-sm opacity-90">5 Years</p>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="font-medium">Suggested Funds</h3>
            {recommendations.map((fund) => (
              <Card key={fund.id} className={`p-4 ${fund.recommended ? 'ring-2 ring-primary/20' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{fund.name}</h4>
                      {fund.recommended && <Star className="h-4 w-4 text-amber-500 fill-current" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{fund.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">{fund.returns}</p>
                    <p className="text-xs text-muted-foreground">{fund.period} returns</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-4">
                    <span>Risk: <Badge variant="outline" className="text-xs">{fund.risk}</Badge></span>
                    <span>Min: {fund.minInvestment}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <span>{fund.rating}</span>
                  </div>
                </div>
                
                {fund.recommended && (
                  <Button size="sm" className="w-full mt-3">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Invest Now
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Overall CTA */}
          <Card className="p-6">
            <Button className="w-full" size="lg">
              Start Investing Portfolio
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Diversified portfolio based on your risk profile
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;