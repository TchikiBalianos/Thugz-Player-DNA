import React from "react";

interface ProgressBarProps {
  value: number;
  className?: string;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  className = "", 
  colorClass
}) => {
  // Default gradient based on the value
  const getGradient = () => {
    if (value >= 80) return "linear-gradient(to right, #10B981, #059669)";
    if (value >= 60) return "linear-gradient(to right, #6D28D9, #4C1D95)";
    if (value >= 40) return "linear-gradient(to right, #8B5CF6, #6D28D9)";
    if (value >= 20) return "linear-gradient(to right, #EC4899, #BE185D)";
    return "linear-gradient(to right, #3B82F6, #1D4ED8)";
  };

  return (
    <div className={`h-3 w-full bg-[#2D3748] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-in-out"
        style={{ 
          width: `${value}%`,
          background: colorClass ? undefined : getGradient(),
          backgroundSize: "200% 100%",
          animation: "gradient-shift 5s ease infinite"
        }}
      ></div>
    </div>
  );
};
