
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Check, Clock } from "lucide-react";
import { toast } from "sonner";

// Import lesson data from Lessons page
const LESSONS_DATA = [
  {
    id: "l1",
    title: "Numbers & Counting",
    subject: "Math",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
    completed: true,
    content: [
      {
        type: "heading",
        text: "Learning to Count from 1 to 10"
      },
      {
        type: "text",
        text: "Counting is one of the first math skills children learn. Let's practice counting from 1 to 10!"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
        alt: "Numbers"
      },
      {
        type: "list",
        items: [
          "One (1): Hold up one finger",
          "Two (2): Hold up two fingers",
          "Three (3): Hold up three fingers",
          "Four (4): Hold up four fingers",
          "Five (5): Hold up five fingers (one whole hand!)"
        ]
      },
      {
        type: "text",
        text: "Now let's continue with the other hand:"
      },
      {
        type: "list",
        items: [
          "Six (6): Hold up six fingers (five on one hand, one on the other)",
          "Seven (7): Hold up seven fingers",
          "Eight (8): Hold up eight fingers",
          "Nine (9): Hold up nine fingers",
          "Ten (10): Hold up ten fingers (two whole hands!)"
        ]
      }
    ]
  },
  {
    id: "l2",
    title: "Animals & Habitats",
    subject: "Science",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1535370976884-f4376736ab06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D",
    progress: 60,
    content: [
      {
        type: "heading",
        text: "Animals and Where They Live"
      },
      {
        type: "text",
        text: "Animals live in many different places called habitats. Each habitat is special and perfect for the animals that live there."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1535370976884-f4376736ab06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D",
        alt: "Animals in nature"
      },
      {
        type: "subheading",
        text: "Forest Habitat"
      },
      {
        type: "text",
        text: "Forests have lots of trees and plants. Many animals live in forests, like:"
      },
      {
        type: "list",
        items: [
          "Deer: They eat plants and have antlers",
          "Bears: They sleep during winter and love honey",
          "Owls: They can turn their heads almost all the way around",
          "Foxes: They are clever hunters"
        ]
      },
      {
        type: "subheading",
        text: "Ocean Habitat"
      },
      {
        type: "text",
        text: "Oceans are filled with salt water and cover most of our planet. Some ocean animals are:"
      },
      {
        type: "list",
        items: [
          "Fish: They breathe underwater using gills",
          "Whales: They are mammals and need to come up for air",
          "Sharks: They have many rows of teeth",
          "Octopus: They have eight arms and are very smart"
        ]
      }
    ]
  },
  {
    id: "l3",
    title: "Colors & Shapes",
    subject: "Art",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb3JzJTIwYW5kJTIwc2hhcGVzfGVufDB8fDB8fHww",
    content: [
      {
        type: "heading",
        text: "Learning Colors and Shapes"
      },
      {
        type: "text",
        text: "Colors and shapes are all around us! Let's learn about them."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb3JzJTIwYW5kJTIwc2hhcGVzfGVufDB8fDB8fHww",
        alt: "Colorful shapes"
      },
      {
        type: "subheading",
        text: "Primary Colors"
      },
      {
        type: "text",
        text: "There are three primary colors. They are special because they can be mixed to make all other colors!"
      },
      {
        type: "list",
        items: [
          "Red: like apples and fire trucks",
          "Yellow: like the sun and bananas",
          "Blue: like the sky and blueberries"
        ]
      },
      {
        type: "subheading",
        text: "Basic Shapes"
      },
      {
        type: "text",
        text: "Shapes are the building blocks of everything around us. Here are some basic shapes:"
      },
      {
        type: "list",
        items: [
          "Circle: round like a ball or the sun",
          "Square: has 4 equal sides like a window",
          "Triangle: has 3 sides like a pizza slice",
          "Rectangle: like a book or a door"
        ]
      }
    ]
  },
  {
    id: "l4",
    title: "ABCs & Phonics",
    subject: "English",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW4lMjByZWFkaW5nfGVufDB8fDB8fHww",
    content: []
  },
  {
    id: "l5",
    title: "Weather & Seasons",
    subject: "Science",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D",
    content: []
  },
  {
    id: "l6",
    title: "Simple Addition",
    subject: "Math",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1635372722656-389f87a941db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
    locked: true,
    content: []
  },
  {
    id: "l7",
    title: "Basic Geography",
    subject: "Social Studies",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1589519160732-576f165b9aad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvcmxkJTIwbWFwfGVufDB8fDB8fHww",
    locked: true,
    content: []
  },
  {
    id: "l8",
    title: "Body Parts & Functions",
    subject: "Science",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBib2R5fGVufDB8fDB8fHww",
    locked: true,
    content: []
  },
];

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  
  // Find the lesson from our data
  const lesson = LESSONS_DATA.find(l => l.id === lessonId);
  
  // Redirect if lesson not found
  if (!lesson) {
    React.useEffect(() => {
      toast.error("Lesson not found!");
      navigate("/lessons");
    }, []);
    return null;
  }

  // If lesson is locked, redirect back
  if (lesson.locked) {
    React.useEffect(() => {
      toast.error("This lesson is currently locked!");
      navigate("/lessons");
    }, []);
    return null;
  }

  const handleMarkAsComplete = () => {
    setIsLessonCompleted(true);
    toast.success("Lesson marked as complete!");
    
    // In a real app, you would save this progress to a database
    setTimeout(() => {
      navigate("/lessons");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="flex items-center text-muted-foreground mb-4"
            onClick={() => navigate("/lessons")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2">{lesson.subject}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-display">{lesson.title}</h1>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <Clock size={16} />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="prose prose-md max-w-none mb-8">
          {lesson.content && lesson.content.length > 0 ? (
            <div className="space-y-6">
              {lesson.content.map((item, index) => {
                switch (item.type) {
                  case "heading":
                    return <h2 key={index} className="text-2xl font-bold">{item.text}</h2>;
                  case "subheading":
                    return <h3 key={index} className="text-xl font-semibold">{item.text}</h3>;
                  case "text":
                    return <p key={index}>{item.text}</p>;
                  case "image":
                    return (
                      <div key={index} className="my-6">
                        <img
                          src={item.url}
                          alt={item.alt || "Lesson image"}
                          className="rounded-lg w-full"
                        />
                      </div>
                    );
                  case "list":
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2">
                        {item.items.map((listItem, i) => (
                          <li key={i}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Lesson content is coming soon!</h3>
              <p className="text-muted-foreground">
                We're still working on the content for this lesson.
              </p>
            </div>
          )}
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lesson Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {lesson.id === "l1" ? (
                "In this lesson, we learned how to count from 1 to 10 using our fingers. Counting is an important skill that helps us understand numbers and quantities."
              ) : lesson.id === "l2" ? (
                "We explored different animal habitats, focusing on forests and oceans. Each habitat provides the perfect environment for the animals that live there."
              ) : lesson.id === "l3" ? (
                "We learned about primary colors (red, yellow, blue) and basic shapes (circle, square, triangle, rectangle) that we see in our everyday world."
              ) : (
                "This lesson covered important concepts that will help build a strong foundation for future learning."
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleMarkAsComplete}
              disabled={isLessonCompleted}
            >
              {isLessonCompleted ? (
                <>
                  <Check className="h-4 w-4" />
                  Lesson Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LessonDetail;
