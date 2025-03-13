
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "child" | "parent";

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

interface ProgressData {
  lessonsCompleted: number;
  totalLessons: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  stars: number;
}

interface UserContextType {
  currentUser: User | null;
  progress: ProgressData;
  switchUser: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Sample data
const SAMPLE_USERS: Record<UserRole, User> = {
  child: {
    id: "child-1",
    name: "Alex",
    role: "child",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex&backgroundColor=b6e3f4",
  },
  parent: {
    id: "parent-1",
    name: "Taylor",
    role: "parent",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Taylor&backgroundColor=d1d4f9",
  },
};

const INITIAL_PROGRESS: ProgressData = {
  lessonsCompleted: 3,
  totalLessons: 10,
  quizzesCompleted: 2,
  totalQuizzes: 5,
  correctAnswers: 12,
  totalQuestions: 15,
  stars: 14,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<ProgressData>(INITIAL_PROGRESS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, auto-login as child
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentUser(SAMPLE_USERS.child);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const switchUser = (role: UserRole) => {
    setCurrentUser(SAMPLE_USERS[role]);
  };

  const login = () => {
    setCurrentUser(SAMPLE_USERS.child);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        progress,
        switchUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
