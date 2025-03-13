
import React from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Award, Clock } from "lucide-react";
import QuizCard from "@/components/ui/QuizCard";

const quizzes = [
  {
    id: "quiz-1",
    title: "Animal Facts",
    subject: "Biology",
    questions: 5,
    duration: "5 min",
    thumbnail: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    completed: true,
    stars: 4
  },
  {
    id: "quiz-2",
    title: "Space Explorers",
    subject: "Astronomy",
    questions: 8,
    duration: "10 min",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    completed: false
  },
  {
    id: "quiz-3",
    title: "Math Challenge",
    subject: "Mathematics",
    questions: 10,
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    completed: false
  },
  {
    id: "quiz-4",
    title: "Science Fun",
    subject: "Chemistry",
    questions: 6,
    duration: "8 min",
    thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    completed: true,
    stars: 5
  },
];

const Quizzes: React.FC = () => {
  const { currentUser } = useUser();
  
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
              Quizzes
            </h1>
            <p className="text-muted-foreground">
              Test your knowledge and earn rewards!
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="text-kid-blue" size={20} />
              <span className="text-sm">
                <span className="font-medium">4</span> Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-kid-orange" size={20} />
              <span className="text-sm">
                <span className="font-medium">2</span> Completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-kid-purple" size={20} />
              <span className="text-sm">
                <span className="font-medium">~38</span> mins total
              </span>
            </div>
          </div>
        </div>
        
        {currentUser?.role === "parent" && (
          <Card className="mb-8 bg-muted/30">
            <CardHeader>
              <CardTitle>Parent Overview</CardTitle>
              <CardDescription>
                Track your child's quiz performance and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-muted-foreground text-sm mb-1">Quizzes Completed</div>
                  <div className="text-2xl font-bold">2/4</div>
                  <div className="h-1 bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-kid-blue rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-muted-foreground text-sm mb-1">Average Score</div>
                  <div className="text-2xl font-bold">83%</div>
                  <div className="h-1 bg-muted mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-kid-orange rounded-full" style={{ width: "83%" }}></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-muted-foreground text-sm mb-1">Stars Earned</div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    {[1, 2, 3].map((i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="text-kid-purple">
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
