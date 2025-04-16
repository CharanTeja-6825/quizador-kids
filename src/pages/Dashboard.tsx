
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import UserAvatar from "@/components/ui/UserAvatar";
import ProgressCircle from "@/components/ui/ProgressCircle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Award, Book, BookOpen, Brain, CheckCircle, Clock, HelpCircle, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LessonProps } from "@/components/ui/LessonCard";
import { QuizProps } from "@/components/ui/QuizCard";
import { toast } from "sonner";

// Sample data
const recentLessons: LessonProps[] = [
  {
    id: "l1",
    title: "Numbers & Counting",
    subject: "Math",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
    completed: true,
  },
  {
    id: "l2",
    title: "Animals & Habitats",
    subject: "Science",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1535370976884-f4376736ab06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D",
    progress: 60,
  },
];

const recentQuizzes: QuizProps[] = [
  {
    id: "q1",
    title: "Addition Quiz",
    subject: "Math",
    questions: 10,
    duration: "10 min",
    thumbnail: "https://images.unsplash.com/photo-1635372722656-389f87a941db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
    completed: true,
    stars: 3,
  },
];

const achievements = [
  {
    icon: <Star className="text-yellow-400" size={20} />,
    title: "First Quiz",
    description: "Completed your first quiz",
    unlocked: true,
  },
  {
    icon: <BookOpen className="text-kid-blue" size={20} />,
    title: "Knowledge Seeker",
    description: "Completed 3 lessons",
    unlocked: true,
  },
  {
    icon: <Trophy className="text-kid-orange" size={20} />,
    title: "Perfect Score",
    description: "Got 100% on a quiz",
    unlocked: true,
  },
  {
    icon: <Brain className="text-kid-purple" size={20} />,
    title: "Learning Streak",
    description: "Learned for 5 days in a row",
    unlocked: false,
  },
];

const Dashboard = () => {
  const { currentUser, progress } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Welcome back message
    if (currentUser) {
      setTimeout(() => {
        toast(`Welcome back, ${currentUser.name}!`, {
          description: "Ready to continue your learning journey?",
        });
      }, 500);
    }
  }, [currentUser]);

  const lessonsProgress = Math.round((progress.lessonsCompleted / progress.totalLessons) * 100);
  const quizzesProgress = Math.round((progress.quizzesCompleted / progress.totalQuizzes) * 100);
  const quizAccuracy = Math.round((progress.correctAnswers / progress.totalQuestions) * 100);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {currentUser?.role === "parent" ? "Parent Dashboard" : "Learning Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                {currentUser?.role === "parent" 
                  ? "Monitor your child's learning progress" 
                  : "Track your progress and continue learning"}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <UserAvatar
                name={currentUser?.name || ""}
                role={currentUser?.role || "student"}
                avatarUrl={currentUser?.avatar || ""}
                size="lg"
                showRole
              />
            </div>
          </div>
        </div>
        
        {/* Progress Overview */}
        <section className="mb-10 animate-fade-in delayed-100">
          <h2 className="text-2xl font-display font-semibold mb-4">Progress Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Progress Cards */}
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <BookOpen size={18} className="text-kid-blue" />
                  Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-2">
                  <ProgressCircle value={lessonsProgress} color="blue" />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {progress.lessonsCompleted} of {progress.totalLessons} completed
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <HelpCircle size={18} className="text-kid-purple" />
                  Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-2">
                  <ProgressCircle value={quizzesProgress} color="purple" />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {progress.quizzesCompleted} of {progress.totalQuizzes} completed
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <CheckCircle size={18} className="text-kid-teal" />
                  Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-2">
                  <ProgressCircle value={quizAccuracy} color="teal" />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">
                    {progress.correctAnswers} of {progress.totalQuestions} correct
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Star size={18} className="text-kid-orange" />
                  Stars Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-kid-orange mb-2">
                    {progress.stars}
                  </div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={cn(
                          i < Math.min(5, progress.stars / 3) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-muted"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Recent Activity */}
        <section className="mb-10 animate-fade-in delayed-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-semibold">Recent Activity</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Lessons */}
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Book size={18} className="text-kid-blue" />
                    Recent Lessons
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-kid-blue"
                    onClick={() => navigate("/lessons")}
                  >
                    View All
                    <ArrowUpRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentLessons.length > 0 ? (
                  <div className="space-y-3">
                    {recentLessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/lessons/${lesson.id}`)}
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={lesson.thumbnail} 
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{lesson.subject}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {lesson.duration}
                            </div>
                          </div>
                          {lesson.progress !== undefined && !lesson.completed && (
                            <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-kid-blue"
                                style={{ width: `${lesson.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                        {lesson.completed && (
                          <div className="p-1 rounded-full bg-green-100 text-green-600">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No lessons started yet</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate("/lessons")}
                    >
                      Browse Lessons
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Quizzes */}
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <HelpCircle size={18} className="text-kid-purple" />
                    Recent Quizzes
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-kid-purple"
                    onClick={() => navigate("/quizzes")}
                  >
                    View All
                    <ArrowUpRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentQuizzes.length > 0 ? (
                  <div className="space-y-3">
                    {recentQuizzes.map((quiz) => (
                      <div 
                        key={quiz.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/quizzes/${quiz.id}`)}
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={quiz.thumbnail} 
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{quiz.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{quiz.subject}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <HelpCircle size={12} className="mr-1" />
                              {quiz.questions} questions
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {quiz.completed && quiz.stars > 0 && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-600">
                              <Star size={14} className="fill-yellow-400" />
                              <span className="font-medium">{quiz.stars}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No quizzes taken yet</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate("/quizzes")}
                    >
                      Browse Quizzes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Achievements */}
        <section className="animate-fade-in delayed-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-semibold">Achievements</h2>
          </div>
          
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "border rounded-xl p-4 flex flex-col items-center text-center transition-all",
                      achievement.unlocked 
                        ? "border-primary/20 bg-primary/5" 
                        : "border-gray-200 bg-gray-50 opacity-60"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        achievement.unlocked
                          ? "bg-primary/10"
                          : "bg-gray-100"
                      )}
                    >
                      {achievement.icon}
                    </div>
                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="mt-2">
                      {achievement.unlocked ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
