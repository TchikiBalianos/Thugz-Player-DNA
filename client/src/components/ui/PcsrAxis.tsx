import React from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface PcsrAxisProps {
  name: string;
  code: string;
  score: number;
  reason: string;
  label: string;
}

const PcsrAxis: React.FC<PcsrAxisProps> = ({ name, code, score, reason, label }) => {
  const percentage = score * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-gray-400 text-sm">{name}</span>
          <div className="flex items-center">
            <h3 className="font-bold mr-2">{label}</h3>
            <span className="text-xs bg-primary-900 text-primary-300 px-2 py-1 rounded">{code}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-primary-300 font-bold">{percentage}%</span>
        </div>
      </div>
      <ProgressBar value={percentage} />
      <p className="text-gray-400 text-xs mt-1">{reason}</p>
    </div>
  );
};

export default PcsrAxis;
