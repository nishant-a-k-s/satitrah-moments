import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Play, Lock, Home, Building, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RealEstate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: "Real Estate as Investment",
      description: "Understanding property investment basics",
      duration: "9 min",
      content: {
        summary: "Learn the fundamentals of real estate investment and its role in wealth building.",
        keyPoints: [
          "Real estate typically appreciates 7-10% annually in India",
          "Rental income provides passive cash flow (2-4% yield)",
          "Tax benefits: Deduction on home loan interest and principal",
          "Hedge against inflation: Property values rise with inflation"
        ]
      }
    },
    {
      id: 2,
      title: "Home Buying Process",
      description: "Step-by-step guide to buying your first home",
      duration: "12 min",
      content: {
        summary: "Master the home buying process from searching to closing the deal.",
        keyPoints: [
          "Pre-approval for home loan: Know your budget first",
          "Location research: Growth prospects, connectivity, amenities",
          "Legal due diligence: Clear title, approvals, RERA registration",
          "Negotiation tactics and closing costs calculation"
        ]
      }
    },
    {
      id: 3,
      title: "Home Loans & Taxation",
      description: "Financing and tax implications of property ownership",
      duration: "10 min",
      content: {
        summary: "Understand home loan options and maximize tax benefits from property ownership.",
        keyPoints: [
          "Home loan types: Fixed vs floating rates (currently 8-10%)",
          "Tax benefits: ₹2L on interest (Sec 24), ₹1.5L on principal (Sec 80C)",
          "Prepayment strategy: Reduce interest burden over time",
          "Joint ownership benefits for married couples"
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
            <h1 className="text-xl font-bold text-foreground">Real Estate Basics</h1>
            <p className="text-sm text-muted-foreground">Property investment 101</p>
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
                <Building className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Course Completed! 🏢</h3>
                <p className="text-sm opacity-90 mb-4">
                  You've mastered Real Estate Basics. Ready for the next level?
                </p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/cryptocurrency')}
                >
                  Continue to Cryptocurrency Fundamentals
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstate;