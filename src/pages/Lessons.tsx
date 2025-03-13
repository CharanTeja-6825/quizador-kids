
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { 
  BookOpen, ChevronDown, Filter, Search, SlidersHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import LessonCard, { LessonProps } from "@/components/ui/LessonCard";

// Sample data
const LESSONS_DATA: LessonProps[] = [
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
  {
    id: "l3",
    title: "Colors & Shapes",
    subject: "Art",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb3JzJTIwYW5kJTIwc2hhcGVzfGVufDB8fDB8fHww",
  },
  {
    id: "l4",
    title: "ABCs & Phonics",
    subject: "English",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW4lMjByZWFkaW5nfGVufDB8fDB8fHww",
  },
  {
    id: "l5",
    title: "Weather & Seasons",
    subject: "Science",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "l6",
    title: "Simple Addition",
    subject: "Math",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1635372722656-389f87a941db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hdGglMjBraWRzfGVufDB8fDB8fHww",
    locked: true,
  },
  {
    id: "l7",
    title: "Basic Geography",
    subject: "Social Studies",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1589519160732-576f165b9aad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvcmxkJTIwbWFwfGVufDB8fDB8fHww",
    locked: true,
  },
  {
    id: "l8",
    title: "Body Parts & Functions",
    subject: "Science",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBib2R5fGVufDB8fDB8fHww",
    locked: true,
  },
];

// Available subjects
const SUBJECTS = ["All", "Math", "Science", "English", "Art", "Social Studies"];

const Lessons = () => {
  const { currentUser } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);
  const [showLocked, setShowLocked] = useState(true);

  // Filter lessons based on search, subject, and status
  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || lesson.subject === selectedSubject;
    const matchesStatus = 
      (showCompleted || !lesson.completed) && 
      (showLocked || !lesson.locked);
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-fade-in">
              <span className="text-gradient">Lessons</span>
            </h1>
            <p className="text-muted-foreground max-w-xl animate-fade-in delayed-100">
              Explore our interactive lessons designed to make learning fun and engaging
            </p>
          </div>
        </div>
        
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in delayed-200">
          <div className="relative flex-1">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9 bg-white"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>{selectedSubject}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SUBJECTS.map((subject) => (
                  <DropdownMenuCheckboxItem
                    key={subject}
                    checked={selectedSubject === subject}
                    onCheckedChange={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Status</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Lesson Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                >
                  Show Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showLocked}
                  onCheckedChange={setShowLocked}
                >
                  Show Locked
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in delayed-300">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in delayed-300">
            <BookOpen size={40} className="mx-auto text-muted" />
            <h3 className="text-xl font-medium mt-4 mb-2">No lessons found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("All");
                setShowCompleted(true);
                setShowLocked(true);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
