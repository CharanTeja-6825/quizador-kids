
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
    description: "Test your knowledge about animals and their habitats",
    icon: "🦁",
    difficulty: "easy",
    questionCount: 5,
    timeEstimate: "5 min",
    completed: true,
    score: 4,
  },
  {
    id: "quiz-2",
    title: "Space Explorers",
    description: "Learn about planets, stars, and space missions",
    icon: "🚀",
    difficulty: "medium",
    questionCount: 8,
    timeEstimate: "10 min",
    completed: false,
  },
  {
    id: "quiz-3",
    title: "Math Challenge",
    description: "Practice addition, subtraction, and simple equations",
    icon: "🔢",
    difficulty: "medium",
    questionCount: 10,
    timeEstimate: "15 min",
    completed: false,
  },
  {
    id: "quiz-4",
    title: "Science Fun",
    description: "Explore cool science facts and experiments",
    icon: "🧪",
    difficulty: "easy",
    questionCount: 6,
    timeEstimate: "8 min",
    completed: true,
    score: 6,
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
