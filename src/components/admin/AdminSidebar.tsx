
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Users, 
  BarChart,
  Layers,
  Settings,
  HelpCircle,
  GraduationCap
} from "lucide-react";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Overview",
    icon: <BarChart className="h-5 w-5" />,
    path: "/admin"
  },
  {
    title: "Lessons Management",
    icon: <Book className="h-5 w-5" />,
    path: "/admin/lessons"
  },
  {
    title: "Quizzes Management",
    icon: <HelpCircle className="h-5 w-5" />,
    path: "/admin/quizzes"
  },
  {
    title: "Students Progress",
    icon: <GraduationCap className="h-5 w-5" />,
    path: "/admin/students"
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/admin/settings"
  }
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <span>Admin Panel</span>
        </h2>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t text-xs text-muted-foreground">
        <p>KidLearn Admin v1.0</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
