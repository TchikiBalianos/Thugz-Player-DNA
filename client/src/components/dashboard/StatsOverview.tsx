import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { usePlayerData } from "@/hooks/usePlayerData";
import RarityBadge from "@/components/ui/RarityBadge";
import { mockGenres } from "@/data/mockData";
import { sortAchievementsByRarity } from "@/utils/achievementUtils";

const StatsOverview: React.FC = () => {
  const { games, achievements, playerStats } = usePlayerData();

  // Get the most recently played game
  const lastPlayedGame = useMemo(() => {
    if (games.length === 0) return null;
    return games.sort((a, b) => b.hoursPlayed - a.hoursPlayed)[0];
  }, [games]);

  // Get the most rare achievement (as a proxy for "recent" achievement)
  const recentAchievement = useMemo(() => {
    if (achievements.length === 0) return null;
    return sortAchievementsByRarity(achievements)[0];
  }, [achievements]);

  return (
    <div className="dna-card rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-gaming font-bold mb-6">Stats Overview</h2>

        {lastPlayedGame && (
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2">Most Played</h3>
            <div className="flex items-center bg-[#1E1E1E] p-3 rounded-lg">
              <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                <div 
                  className="h-full w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${lastPlayedGame.imageUrl})` }}
                ></div>
              </div>
              <div>
                <h4 className="font-bold text-sm">{lastPlayedGame.name}</h4>
                <p className="text-xs text-gray-400">
                  <i className="ri-time-line mr-1"></i> {lastPlayedGame.hoursPlayed} hours
                </p>
              </div>
            </div>
          </div>
        )}

        {recentAchievement && (
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2">Notable Achievement</h3>
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md bg-primary-900 flex items-center justify-center mr-3">
                  <i className="ri-trophy-fill text-primary-300"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{recentAchievement.name}</h4>
                  <p className="text-xs text-gray-400">{recentAchievement.description}</p>
                </div>
                <RarityBadge rarity={recentAchievement.rarity} />
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm text-gray-400 mb-2">Favorite Genres</h3>
          <div className="space-y-3">
            {mockGenres.map((genre) => (
              <div key={genre.name} className="bg-[#1E1E1E] p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{genre.name}</span>
                  <span className="text-xs text-primary-300">{genre.percentage}%</span>
                </div>
                <ProgressBar value={genre.percentage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
