import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Play, Lock, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const InvestmentStrategies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false); // In real app, check if Smart Budgeting is 100%

  const lessons = [
    {
      id: 1,
      title: "Compounding",
      description: "The eighth wonder of the world - earning returns on your returns",
      duration: "8 min",
      content: {
        summary: "Understand how compound interest can exponentially grow your wealth.",
        keyPoints: [
          "Start early: Time is your biggest advantage",
          "Reinvest earnings: Don't withdraw profits",
          "Consistency beats timing: Regular investing wins",
          "Example: ₹1000/month for 20 years = ₹49 lakhs @ 12%"
        ]
      }
    },
    {
      id: 2,
      title: "Diversification",
      description: "Don't put all eggs in one basket - spread your risk",
      duration: "10 min",
      content: {
        summary: "Learn to build a balanced portfolio that protects and grows wealth.",
        keyPoints: [
          "Asset classes: Equity, Debt, Gold, Real Estate",
          "Sector diversification: IT, Banking, FMCG, etc.",
          "Geographic spread: Domestic and international",
          "Risk-return balance based on age and goals"
        ]
      }
    },
    {
      id: 3,
      title: "Equity vs Debt Funds",
      description: "Understanding the core building blocks of mutual fund investing",
      duration: "12 min",
      content: {
        summary: "Master the differences and optimal allocation between equity and debt.",
        keyPoints: [
          "Equity: Higher returns, higher volatility, long-term growth",
          "Debt: Stable returns, lower risk, capital preservation",
          "Age rule: 100 - your age = % in equity",
          "Rebalancing: Maintain target allocation quarterly"
        ]
      }
    }
  ];

  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      toast({
        title: "Advanced Lesson Completed!",
        description: `Outstanding! You've mastered lesson ${lessonId}.`
      });
    }
    setActiveLesson(null);
  };

  const unlockModule = () => {
    setIsUnlocked(true);
    toast({
      title: "Module Unlocked!",
      description: "Investment Strategies is now available for learning."
    });
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Investment Strategies</h1>
              <p className="text-sm text-muted-foreground">Advanced wealth building</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Locked State */}
            <Card className="p-8 text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-2">Module Locked</h3>
              <p className="text-muted-foreground mb-6">
                Complete Smart Budgeting with 100% progress to unlock Investment Strategies
              </p>
              
              {/* Mock unlock button for demo */}
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Smart Budgeting Progress</p>
                  <Progress value={75} className="mb-2" />
                  <p className="text-xs text-muted-foreground">75% complete - 1 lesson remaining</p>
                </div>
                
                <Button onClick={unlockModule} variant="outline">
                  Demo: Unlock Now
                </Button>
              </div>
            </Card>

            {/* Preview Content */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">What You'll Learn</h3>
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-start gap-3 opacity-60">
                    <Lock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Investment Strategies</h1>
            <p className="text-sm text-muted-foreground">Advanced wealth building</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Course Progress</h3>
              <Badge variant="secondary">{completedCount}/{lessons.length}</Badge>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {progressPercentage === 100 ? "Advanced course completed!" : `${Math.round(progressPercentage)}% complete`}
            </p>
          </Card>

          {/* Unlock Notification */}
          <Card className="p-4 bg-gradient-success text-secondary-foreground">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <div>
                <p className="font-medium text-sm">Advanced Module Unlocked!</p>
                <p className="text-xs opacity-90">You've mastered the fundamentals</p>
              </div>
            </div>
          </Card>

          {/* Lessons */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive = activeLesson === lesson.id;
              const isAccessible = index === 0 || completedLessons.includes(lessons[index - 1].id);

              return (
                <Card key={lesson.id} className={`p-4 ${isActive ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : isAccessible ? (
                        <Play className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <Badge variant="outline" className="text-xs">{lesson.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                      
                      {isActive && (
                        <div className="bg-muted/50 p-4 rounded-lg mb-3">
                          <h5 className="font-medium mb-2">{lesson.content.summary}</h5>
                          <ul className="space-y-1 text-sm">
                            {lesson.content.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {isAccessible && !isCompleted && (
                        <div className="flex gap-2">
                          {!isActive ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setActiveLesson(lesson.id)}
                            >
                              Start Lesson
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => completeLesson(lesson.id)}
                            >
                              Mark as Complete
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {isCompleted && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                      
                      {!isAccessible && (
                        <p className="text-xs text-muted-foreground">
                          Complete previous lesson to unlock
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Course Completion */}
          {progressPercentage === 100 && (
            <Card className="p-6 bg-gradient-accent text-accent-foreground">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Investment Mastery Achieved! 🚀</h3>
                <p className="text-sm opacity-90 mb-4">
                  You're now ready for advanced investment strategies!
                </p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/learning')}
                >
                  Explore More Modules
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentStrategies;