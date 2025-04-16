
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "parent";

interface User {
  id: string;
  name: string;
  email: string;
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
  isAuthenticated: boolean;
  register: (data: { name: string; email: string; password: string; role: UserRole }) => void;
  login: (data: { email: string; password: string; role: UserRole }) => void;
  logout: () => void;
  switchUser: (role: "student" | "parent") => void;
}

const INITIAL_PROGRESS: ProgressData = {
  lessonsCompleted: 3,
  totalLessons: 10,
  quizzesCompleted: 2,
  totalQuizzes: 5,
  correctAnswers: 12,
  totalQuestions: 15,
  stars: 14,
};

// Simulate a users database
let USERS_DB: User[] = [];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<ProgressData>(INITIAL_PROGRESS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = (data: { name: string; email: string; password: string; role: UserRole }) => {
    const existingUser = USERS_DB.find(user => user.email === data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://api.dicebear.com/7.x/${data.role === 'student' ? 'adventurer' : 'personas'}/svg?seed=${data.name}`,
    };

    USERS_DB.push(newUser);
  };

  const login = (data: { email: string; password: string; role: UserRole }) => {
    const user = USERS_DB.find(u => u.email === data.email && u.role === data.role);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Add the switchUser function
  const switchUser = (role: "student" | "parent") => {
    // In a real app, this would switch between different user profiles
    // For now, we'll just console log that it was called
    console.log(`Switching to ${role} profile`);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        progress,
        isAuthenticated,
        register,
        login,
        logout,
        switchUser,
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
