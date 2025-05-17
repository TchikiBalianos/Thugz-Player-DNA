import React from "react";
import { usePlayerData } from "@/hooks/usePlayerData";

const SteamLevelCard: React.FC = () => {
  const { playerStats } = usePlayerData();

  if (!playerStats) {
    return (
      <div className="dna-card rounded-xl overflow-hidden animate-pulse">
        <div className="p-6">
          <div className="h-8 w-32 bg-[#1E1E1E] rounded mb-4"></div>
          <div className="h-24 bg-[#1E1E1E] rounded"></div>
        </div>
      </div>
    );
  }

  // Generate level tiers and color based on steam level
  const getLevelInfo = (level: number) => {
    if (level >= 100) return { tier: "Master", color: "text-yellow-400 border-yellow-400" };
    if (level >= 75) return { tier: "Expert", color: "text-purple-400 border-purple-400" };
    if (level >= 50) return { tier: "Veteran", color: "text-blue-400 border-blue-400" };
    if (level >= 25) return { tier: "Advanced", color: "text-green-400 border-green-400" };
    return { tier: "Novice", color: "text-gray-400 border-gray-400" };
  };

  const { tier, color } = getLevelInfo(playerStats.steam_level);

  return (
    <div className="dna-card rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-gaming font-bold mb-6">Steam Level</h2>
        
        <div className="bg-[#1E1E1E] p-4 rounded-lg flex flex-col items-center justify-center">
          <div className={`w-24 h-24 rounded-full border-4 ${color} flex items-center justify-center mb-2`}>
            <span className="text-3xl font-gaming font-bold">{playerStats.steam_level}</span>
          </div>
          <div className="text-center">
            <span className={`text-sm font-medium ${color}`}>{tier}</span>
            <p className="text-xs text-gray-400 mt-1">Steam Experience Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteamLevelCard;