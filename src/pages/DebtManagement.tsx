import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Play, Lock, CreditCard, AlertTriangle, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DebtManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "Understanding Good vs Bad Debt",
      description: "Not all debt is created equal",
      duration: "6 min",
      content: {
        summary: "Learn to distinguish between debt that helps you build wealth vs debt that drains it.",
        keyPoints: [
          "Good debt: Home loans, education loans (appreciating assets)",
          "Bad debt: Credit card debt, personal loans (depreciating assets)", 
          "Interest rate comparison: Home loan (8%) vs Credit card (36%)",
          "Tax benefits available on certain types of debt"
        ]
      }
    },
    {
      id: 2,
      title: "Debt Repayment Strategies",
      description: "Snowball vs Avalanche methods",
      duration: "9 min",
      content: {
        summary: "Master proven strategies to pay off debt efficiently and stay motivated.",
        keyPoints: [
          "Debt Snowball: Pay smallest debts first (psychological wins)",
          "Debt Avalanche: Pay highest interest debts first (mathematical optimal)",
          "Debt Consolidation: Combining multiple debts",
          "Balance transfer credit cards for high-interest debt"
        ]
      }
    },
    {
      id: 3,
      title: "Avoiding Debt Traps",
      description: "Smart borrowing and prevention strategies",
      duration: "8 min",
      content: {
        summary: "Learn to use credit responsibly and avoid common debt pitfalls.",
        keyPoints: [
          "Credit card usage: Pay full amount by due date",
          "Emergency fund prevents debt dependency",
          "EMI to income ratio should be under 40%",
          "Read loan terms carefully: Processing fees, prepayment charges"
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
        title: "Lesson Completed!",
        description: `Great job! You've completed lesson ${lessonId}.`
      });
    }
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Debt Management</h1>
            <p className="text-sm text-muted-foreground">Master your debt</p>
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
              {progressPercentage === 100 ? "Course completed!" : `${Math.round(progressPercentage)}% complete`}
            </p>
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
            <Card className="p-6 bg-gradient-success text-secondary-foreground">
              <div className="text-center">
                <TrendingDown className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Course Completed! 📉</h3>
                <p className="text-sm opacity-90 mb-4">
                  You've mastered Debt Management. Ready for the next level?
                </p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/credit-score')}
                >
                  Continue to Credit Score Improvement
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebtManagement;