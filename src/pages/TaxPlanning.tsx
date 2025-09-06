import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Play, Lock, Calculator, Receipt, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TaxPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "Tax Basics in India",
      description: "Understanding the Indian tax system",
      duration: "8 min",
      content: {
        summary: "Learn the fundamentals of income tax in India and your obligations.",
        keyPoints: [
          "Income Tax slabs and rates for different brackets",
          "Different types of income: Salary, business, capital gains",
          "Tax deductions vs tax exemptions",
          "ITR filing deadlines and procedures"
        ]
      }
    },
    {
      id: 2,
      title: "Tax-Saving Investments",
      description: "80C deductions and ELSS funds",
      duration: "10 min",
      content: {
        summary: "Explore various tax-saving investment options under Section 80C.",
        keyPoints: [
          "Section 80C: ₹1.5L limit on PPF, EPF, ELSS",
          "ELSS Mutual Funds: Tax saving with growth potential",
          "PPF vs EPF vs NSC comparison",
          "Section 80D: Health insurance deductions"
        ]
      }
    },
    {
      id: 3,
      title: "Tax Planning Strategies",
      description: "Advanced planning to minimize tax liability",
      duration: "12 min",
      content: {
        summary: "Learn strategic approaches to legally reduce your tax burden.",
        keyPoints: [
          "Salary structuring: HRA, LTA, medical allowances",
          "Capital gains planning: Short-term vs long-term",
          "Tax-loss harvesting in equity investments",
          "Advance tax planning and quarterly payments"
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
            <h1 className="text-xl font-bold text-foreground">Tax Planning</h1>
            <p className="text-sm text-muted-foreground">Optimize your taxes</p>
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
                <Calculator className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Course Completed! 📊</h3>
                <p className="text-sm opacity-90 mb-4">
                  You've mastered Tax Planning. Ready for the next level?
                </p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/retirement-planning')}
                >
                  Continue to Retirement Planning
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxPlanning;