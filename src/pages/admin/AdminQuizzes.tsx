
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
  Eye,
  Star 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample quizzes data (using the same data from QuizDetail.tsx)
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

const AdminQuizzes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter quizzes based on search
  const filteredQuizzes = quizzes.filter((quiz) => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteQuiz = (id: string) => {
    toast.success(`Quiz with ID ${id} deleted successfully`);
    // In a real app, we would delete the quiz from the database
  };
  
  const handleEditQuiz = (id: string) => {
    toast.info(`Editing quiz with ID ${id}`);
    // In a real app, we would open a modal or navigate to an edit page
  };
  
  const handleCreateQuiz = () => {
    toast.info("Creating a new quiz");
    // In a real app, we would open a modal or navigate to a create page
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes Management</h1>
          <p className="text-muted-foreground">Manage all quizzes in one place.</p>
        </div>
        <Button onClick={handleCreateQuiz} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Quiz</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Quizzes</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
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
                <TableHead>Questions</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.subject}</TableCell>
                  <TableCell>{quiz.questions}</TableCell>
                  <TableCell>{quiz.duration}</TableCell>
                  <TableCell>
                    {quiz.completed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Published</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {quiz.stars ? (
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{quiz.stars}/5</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No ratings</span>
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
                          onClick={() => window.open(`/quizzes/${quiz.id}`, '_blank')}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => handleEditQuiz(quiz.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-600"
                          onClick={() => handleDeleteQuiz(quiz.id)}
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

export default AdminQuizzes;
