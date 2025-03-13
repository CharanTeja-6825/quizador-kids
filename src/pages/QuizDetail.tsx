
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, HelpCircle, Star } from "lucide-react";
import { toast } from "sonner";

// Sample quiz questions to display
const SAMPLE_QUESTIONS = [
  {
    id: "q1",
    question: "Which animal is known as the king of the jungle?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    correctAnswer: "Lion",
  },
  {
    id: "q2",
    question: "How many planets are in our solar system?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
  },
  {
    id: "q3",
    question: "What is the chemical symbol for water?",
    options: ["Wa", "H2O", "O2H", "WO"],
    correctAnswer: "H2O",
  },
  {
    id: "q4",
    question: "What is 8 + 5?",
    options: ["12", "13", "14", "15"],
    correctAnswer: "13",
  },
  {
    id: "q5",
    question: "Which color is not in a rainbow?",
    options: ["Red", "Brown", "Green", "Purple"],
    correctAnswer: "Brown",
  },
];

// Import the quiz data from Quizzes.tsx
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

const QuizDetail: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  
  // Find the quiz from our data
  const quiz = quizzes.find(q => q.id === quizId);

  // Display an error if quiz not found
  if (!quiz) {
    useEffect(() => {
      toast.error("Quiz not found!");
      navigate("/quizzes");
    }, []);
    return null;
  }

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    toast("Quiz started! Good luck!");
  };

  const handleSelectAnswer = (answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === SAMPLE_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setSelectedAnswer(null);
    setIsSubmitted(false);
    
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsQuizCompleted(true);
      toast.success(`Quiz completed! Your score: ${score + (selectedAnswer === SAMPLE_QUESTIONS[currentQuestion].correctAnswer ? 1 : 0)}/${SAMPLE_QUESTIONS.length}`);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer!");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="flex items-center text-muted-foreground mb-4"
            onClick={() => navigate("/quizzes")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2">{quiz.subject}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-display">{quiz.title}</h1>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Clock size={16} />
              <span>{quiz.duration}</span>
            </div>
          </div>
        </div>
        
        {!isQuizStarted ? (
          <Card>
            <CardHeader>
              <CardTitle>Start Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-md mb-6">
                <img
                  src={quiz.thumbnail}
                  alt={quiz.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-muted-foreground" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-muted-foreground" />
                  <span>Estimated time: {quiz.duration}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        ) : isQuizCompleted ? (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-4">
                    <Star className="h-12 w-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Your Score: {score}/{SAMPLE_QUESTIONS.length}
                  </h2>
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.ceil((score / SAMPLE_QUESTIONS.length) * 5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  {score === SAMPLE_QUESTIONS.length
                    ? "Perfect score! Amazing job!"
                    : score > SAMPLE_QUESTIONS.length / 2
                    ? "Great job! You did well!"
                    : "Good try! Keep practicing to improve."}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/quizzes")}>
                Return to Quizzes
              </Button>
              <Button onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setIsSubmitted(false);
                setScore(0);
                setIsQuizCompleted(false);
              }}>
                Try Again
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
                </span>
                <span className="text-sm font-medium">
                  Score: {score}/{currentQuestion}
                </span>
              </div>
              <CardTitle className="text-xl mt-2">
                {SAMPLE_QUESTIONS[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {SAMPLE_QUESTIONS[currentQuestion].options.map((option) => (
                  <div
                    key={option}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAnswer === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${
                      isSubmitted
                        ? option === SAMPLE_QUESTIONS[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-500"
                          : selectedAnswer === option
                          ? "bg-red-100 border-red-500"
                          : ""
                        : ""
                    }`}
                    onClick={() => handleSelectAnswer(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              {!isSubmitted ? (
                <Button
                  className="w-full"
                  disabled={!selectedAnswer}
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button className="w-full" onClick={handleNextQuestion}>
                  {currentQuestion < SAMPLE_QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;
