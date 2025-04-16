
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
  BarChart,
  MoreVertical, 
  Search, 
  Star,
  UserCheck
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Sample student data
const STUDENTS = [
  {
    id: "s1",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex&backgroundColor=b6e3f4",
    grade: "1st Grade",
    lessonsCompleted: 8,
    totalLessons: 12,
    quizzesCompleted: 5,
    totalQuizzes: 8,
    averageScore: 87,
    lastActive: "Today",
    status: "active"
  },
  {
    id: "s2",
    name: "Mia Williams",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia&backgroundColor=ffdfbf",
    grade: "2nd Grade",
    lessonsCompleted: 10,
    totalLessons: 15,
    quizzesCompleted: 6,
    totalQuizzes: 10,
    averageScore: 92,
    lastActive: "Yesterday",
    status: "active"
  },
  {
    id: "s3",
    name: "Noah Garcia",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah&backgroundColor=d1d4f9",
    grade: "1st Grade",
    lessonsCompleted: 6,
    totalLessons: 12,
    quizzesCompleted: 4,
    totalQuizzes: 8,
    averageScore: 78,
    lastActive: "2 days ago",
    status: "inactive"
  },
  {
    id: "s4",
    name: "Sophia Lee",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia&backgroundColor=c0aede",
    grade: "3rd Grade",
    lessonsCompleted: 15,
    totalLessons: 18,
    quizzesCompleted: 9,
    totalQuizzes: 12,
    averageScore: 95,
    lastActive: "Today",
    status: "active"
  },
  {
    id: "s5",
    name: "Ethan Brown",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ethan&backgroundColor=b6e3f4",
    grade: "2nd Grade",
    lessonsCompleted: 9,
    totalLessons: 15,
    quizzesCompleted: 5,
    totalQuizzes: 10,
    averageScore: 81,
    lastActive: "3 days ago",
    status: "inactive"
  },
];

const AdminStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter students based on search
  const filteredStudents = STUDENTS.filter((student) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewProgress = (studentId: string) => {
    toast.info(`Viewing detailed progress for student ${studentId}`);
    // In a real app, we would navigate to a detailed view
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
        <p className="text-muted-foreground">Monitor student activity and learning progress.</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Students</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
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
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Lesson Progress</TableHead>
                <TableHead>Quiz Progress</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {student.lessonsCompleted}/{student.totalLessons}
                        </span>
                        <span className="text-xs font-medium">
                          {Math.round((student.lessonsCompleted / student.totalLessons) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(student.lessonsCompleted / student.totalLessons) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {student.quizzesCompleted}/{student.totalQuizzes}
                        </span>
                        <span className="text-xs font-medium">
                          {Math.round((student.quizzesCompleted / student.totalQuizzes) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(student.quizzesCompleted / student.totalQuizzes) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{student.averageScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={student.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                      }
                    >
                      {student.status === "active" ? "Active" : "Inactive"}
                    </Badge>
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
                          onClick={() => handleViewProgress(student.id)}
                        >
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>View Progress</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center"
                          onClick={() => toast.success(`Message sent to ${student.name}`)}
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Contact Student</span>
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

export default AdminStudents;
