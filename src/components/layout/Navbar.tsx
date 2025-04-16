
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import UserAvatar from "@/components/ui/UserAvatar";
import { 
  Book, 
  HelpCircle, 
  Home, 
  LogOut, 
  Menu, 
  ChevronDown, 
  PieChart,
  User,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, switchUser, isAuthenticated, logout } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const NAV_ITEMS: NavItem[] = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Dashboard", href: "/dashboard", icon: <PieChart size={18} /> },
    { name: "Lessons", href: "/lessons", icon: <Book size={18} /> },
    { name: "Quizzes", href: "/quizzes", icon: <HelpCircle size={18} /> },
    { 
      name: "Admin", 
      href: "/admin", 
      icon: <Settings size={18} />,
      roles: ["parent"] 
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = NAV_ITEMS.filter(item => 
    !item.roles || (currentUser && item.roles.includes(currentUser.role))
  );

  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 py-3",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className={cn(
            "text-2xl font-display font-bold",
            "bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent"
          )}>
            KidLearn
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {filteredNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all",
                location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-white/80 pl-2 pr-3 py-1 shadow-sm border border-border/50 hover:shadow transition-all">
                <UserAvatar
                  name={currentUser?.name || ""}
                  role={currentUser?.role || "child"}
                  avatarUrl={currentUser?.avatar || ""}
                  size="sm"
                />
                <span className="text-sm font-medium">{currentUser?.name}</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center cursor-pointer"
                onClick={() => switchUser("child")}
              >
                <User size={16} className="mr-2 text-kid-blue" />
                <span>Child Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center cursor-pointer"
                onClick={() => switchUser("parent")}
              >
                <User size={16} className="mr-2 text-kid-purple" />
                <span>Parent Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center cursor-pointer text-red-500"
                onClick={logout}
              >
                <LogOut size={16} className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <button
            className="flex md:hidden items-center justify-center p-2 rounded-full bg-white/90 text-foreground shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-border/50 py-2"
        >
          <div className="container mx-auto max-w-7xl">
            <nav className="flex flex-col px-4 py-2 space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
