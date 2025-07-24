import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Star, 
  Trophy, 
  BookOpen, 
  Play,
  CheckCircle,
  Lock,
  Zap,
  Award,
  Target,
  TrendingUp
} from "lucide-react";

export const GamifiedLearning = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const learningModules = [
    {
      id: "basics",
      title: "Financial Basics",
      description: "Learn the fundamentals of personal finance",
      difficulty: "Beginner",
      duration: "2 weeks",
      progress: 85,
      completed: false,
      unlocked: true,
      points: 500,
      icon: BookOpen,
      lessons: [
        { title: "What is Money?", completed: true },
        { title: "Budgeting 101", completed: true },
        { title: "Saving vs Investing", completed: false },
        { title: "Understanding Interest", completed: false }
      ]
    },
    {
      id: "budgeting",
      title: "Smart Budgeting",
      description: "Master the art of budget planning and tracking",
      difficulty: "Intermediate",
      duration: "3 weeks",
      progress: 60,
      completed: false,
      unlocked: true,
      points: 750,
      icon: Target,
      lessons: [
        { title: "50/30/20 Rule", completed: true },
        { title: "Expense Tracking", completed: true },
        { title: "Emergency Fund", completed: false },
        { title: "Budget Optimization", completed: false }
      ]
    },
    {
      id: "investing",
      title: "Investment Strategies",
      description: "Learn to grow your wealth through smart investments",
      difficulty: "Advanced",
      duration: "4 weeks",
      progress: 0,
      completed: false,
      unlocked: false,
      points: 1000,
      icon: TrendingUp,
      lessons: [
        { title: "Types of Investments", completed: false },
        { title: "Risk Assessment", completed: false },
        { title: "Portfolio Diversification", completed: false },
        { title: "Long-term Planning", completed: false }
      ]
    }
  ];

  const achievements = [
    { title: "First Budget", description: "Created your first budget", earned: true, points: 100 },
    { title: "Saver", description: "Saved ₹10,000 in a month", earned: true, points: 200 },
    { title: "Investor", description: "Made your first investment", earned: false, points: 300 },
    { title: "Squirrel Master", description: "Helped 10 people through lending", earned: false, points: 500 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-success bg-success/10";
      case "Intermediate": return "text-warning bg-warning/10";
      case "Advanced": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Points */}
      <Card className="p-6 bg-gradient-accent text-accent-foreground border-0 shadow-premium">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Financial Learning
            </h2>
            <p className="opacity-80 mt-1">Level up your financial knowledge</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-5 w-5" />
              <span className="text-xl font-bold">2,450</span>
            </div>
            <p className="text-xs opacity-80">Total Points</p>
          </div>
        </div>
      </Card>

      {/* Learning Progress */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Learning Journey</h3>
        
        <div className="space-y-4">
          {learningModules.map((module) => (
            <div 
              key={module.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedCourse === module.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card-elevated hover:bg-card-elevated/80'
              } ${!module.unlocked ? 'opacity-50' : ''}`}
              onClick={() => module.unlocked && setSelectedCourse(
                selectedCourse === module.id ? null : module.id
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${module.unlocked ? 'bg-primary/10 text-primary' : 'bg-muted/10 text-muted-foreground'}`}>
                    {module.unlocked ? (
                      <module.icon className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{module.title}</h4>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{module.duration}</p>
                </div>
              </div>

              {module.unlocked && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2 mb-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-accent">
                      <Zap size={14} />
                      <span className="text-sm font-medium">{module.points} points</span>
                    </div>
                    <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
                      <Play size={14} className="mr-1" />
                      {module.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>

                  {selectedCourse === module.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h5 className="font-medium text-foreground mb-3">Lessons</h5>
                      <div className="space-y-2">
                        {module.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 rounded bg-background">
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted" />
                            )}
                            <span className={`text-sm ${lesson.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-card border-0 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border text-center ${
                achievement.earned 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border bg-muted/5'
              }`}
            >
              <Award className={`h-8 w-8 mx-auto mb-2 ${
                achievement.earned ? 'text-accent' : 'text-muted-foreground'
              }`} />
              <h4 className={`font-medium text-sm mb-1 ${
                achievement.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                achievement.earned 
                  ? 'bg-accent/10 text-accent' 
                  : 'bg-muted/10 text-muted-foreground'
              }`}>
                {achievement.points} pts
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};