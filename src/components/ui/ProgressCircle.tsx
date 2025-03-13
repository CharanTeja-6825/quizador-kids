
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  showValue?: boolean;
  color?: "blue" | "purple" | "orange" | "teal" | "pink";
  className?: string;
  label?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = "md",
  strokeWidth = 8,
  showValue = true,
  color = "blue",
  className,
  label,
}) => {
  const sizePx = {
    sm: 64,
    md: 100,
    lg: 150,
  }[size];

  const radius = (sizePx - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorClasses = {
    blue: "text-kid-blue",
    purple: "text-kid-purple",
    orange: "text-kid-orange",
    teal: "text-kid-teal",
    pink: "text-kid-pink",
  };

  const strokeColors = {
    blue: "#4CB9E7",
    purple: "#AF92F5",
    orange: "#FF9776",
    teal: "#39A7A7",
    pink: "#F0A9EB",
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: sizePx, height: sizePx }}>
        {/* Background circle */}
        <svg
          width={sizePx}
          height={sizePx}
          viewBox={`0 0 ${sizePx} ${sizePx}`}
          className="absolute inset-0 transform rotate-[-90deg]"
        >
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted opacity-20"
          />

          {/* Progress circle with gradient */}
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            fill="none"
            stroke={strokeColors[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Value text */}
        {showValue && (
          <div 
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center",
              colorClasses[color]
            )}
          >
            <span className="text-3xl font-bold">{value}%</span>
          </div>
        )}
      </div>
      
      {label && (
        <span className={cn("mt-2 text-sm font-medium", colorClasses[color])}>
          {label}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
