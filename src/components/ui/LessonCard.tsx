
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, CheckCircle, Clock, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface LessonProps {
  id: string;
  title: string;
  subject: string;
  duration: string;
  thumbnail: string;
  completed?: boolean;
  locked?: boolean;
  progress?: number;
}

interface LessonCardProps {
  lesson: LessonProps;
  className?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, className }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    subject,
    duration,
    thumbnail,
    completed = false,
    locked = false,
    progress = 0,
  } = lesson;

  const handleClick = () => {
    if (!locked) {
      navigate(`/lessons/${id}`);
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
            <div className="bg-white/90 backdrop-blur-sm text-kid-blue rounded-full p-1">
              <Book size={18} />
            </div>
          )}
        </div>
        
        {/* Progress bar */}
        {!locked && !completed && progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
            <div 
              className="h-full bg-kid-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
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
      
      <CardFooter className="p-4 pt-0 flex items-center text-sm text-muted-foreground">
        <Clock size={14} className="mr-1" />
        <span>{duration}</span>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
