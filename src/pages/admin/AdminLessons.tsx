
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  MoreVertical, 
  Plus, 
  Search, 
  Trash2, 
  Eye 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample data (using the same data format as in the Lessons.tsx)
const LESSONS_DATA = [
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

const AdminLessons: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter lessons based on search
  const filteredLessons = LESSONS_DATA.filter((lesson) => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteLesson = (id: string) => {
    toast.success(`Lesson with ID ${id} deleted successfully`);
    // In a real app, we would delete the lesson from the database
  };
  
  const handleEditLesson = (id: string) => {
    toast.info(`Editing lesson with ID ${id}`);
    // In a real app, we would open a modal or navigate to an edit page
  };
  
  const handleCreateLesson = () => {
    toast.info("Creating a new lesson");
    // In a real app, we would open a modal or navigate to a create page
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lessons Management</h1>
          <p className="text-muted-foreground">Manage all lessons in one place.</p>
        </div>
        <Button onClick={handleCreateLesson} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Lesson</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Lessons</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{lesson.subject}</TableCell>
                  <TableCell>{lesson.duration}</TableCell>
                  <TableCell>
                    {lesson.locked ? (
                      <Badge variant="outline" className="bg-muted">Locked</Badge>
                    ) : lesson.completed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Published</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => window.open(`/lessons/${lesson.id}`, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => handleEditLesson(lesson.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-600"
                          onClick={() => handleDeleteLesson(lesson.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLessons;
