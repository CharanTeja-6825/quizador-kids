
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminLessons from "@/pages/admin/AdminLessons";
import AdminQuizzes from "@/pages/admin/AdminQuizzes";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminSettings from "@/pages/admin/AdminSettings";
import { toast } from "sonner";

const AdminDashboard: React.FC = () => {
  const { currentUser } = useUser();
  
  // Redirect to homepage if user is not a parent
  if (!currentUser || currentUser.role !== "parent") {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex h-screen pt-16">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-background p-6">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/lessons" element={<AdminLessons />} />
          <Route path="/quizzes" element={<AdminQuizzes />} />
          <Route path="/students" element={<AdminStudents />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
