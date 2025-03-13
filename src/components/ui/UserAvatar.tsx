
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserAvatarProps {
  name: string;
  role: "child" | "parent";
  avatarUrl: string;
  size?: "sm" | "md" | "lg";
  showRole?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  role,
  avatarUrl,
  size = "md",
  showRole = false,
  className,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const initials = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar
        className={cn(
          sizeClasses[size],
          "ring-2 ring-white shadow-md",
          "transition-all duration-300 ease-out hover:scale-105",
          role === "child" ? "ring-kid-blue" : "ring-kid-purple"
        )}
      >
        <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
        <AvatarFallback
          className={cn(
            "font-semibold",
            role === "child" ? "bg-kid-blue text-white" : "bg-kid-purple text-white"
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {showRole && (
        <Badge
          variant="outline"
          className={cn(
            "absolute -bottom-2 left-1/2 transform -translate-x-1/2 capitalize px-2 text-xs font-medium",
            role === "child" 
              ? "bg-kid-blue/10 text-kid-blue border-kid-blue/30" 
              : "bg-kid-purple/10 text-kid-purple border-kid-purple/30"
          )}
        >
          {role}
        </Badge>
      )}
    </div>
  );
};

export default UserAvatar;
