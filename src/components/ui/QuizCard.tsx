
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, HelpCircle, LockKeyhole, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface QuizProps {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: string;
  thumbnail: string;
  completed?: boolean;
  locked?: boolean;
  stars?: number;
}

interface QuizCardProps {
  quiz: QuizProps;
  className?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, className }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    subject,
    questions,
    duration,
    thumbnail,
    completed = false,
    locked = false,
    stars = 0,
  } = quiz;

  const handleClick = () => {
    if (!locked) {
      navigate(`/quizzes/${id}`);
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden border border-border/40 shadow-sm h-full",
        locked ? "opacity-80" : "card-hover cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-all",
              locked ? "blur-[2px]" : ""
            )}
          />
        </div>
        
        {/* Subject badge */}
        <Badge
          className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm 
                    text-foreground border-0 shadow-sm"
        >
          {subject}
        </Badge>
        
        {/* Status icon */}
        <div 
          className={cn(
            "absolute top-2 right-2 flex items-center justify-center",
            "w-7 h-7 rounded-full shadow-md"
          )}
        >
          {locked ? (
            <div className="bg-muted/90 backdrop-blur-sm text-muted-foreground rounded-full p-1">
              <LockKeyhole size={18} />
            </div>
          ) : completed ? (
            <div className="bg-green-500/90 backdrop-blur-sm text-white rounded-full p-1">
              <CheckCircle size={18} />
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm text-kid-purple rounded-full p-1">
              <HelpCircle size={18} />
            </div>
          )}
        </div>
        
        {/* Stars for completed quiz */}
        {completed && stars > 0 && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm 
                         rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{stars}</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className={cn(
          "font-semibold text-lg leading-tight",
          locked ? "text-muted-foreground" : ""
        )}>
          {title}
        </h3>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <HelpCircle size={14} className="mr-1" />
          <span>{questions} questions</span>
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <span>{duration}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
