import React from "react";
import RarityBadge from "@/components/ui/RarityBadge";
import ShareButton from "@/components/ui/ShareButton";
import { Achievement } from "@/data/mockData";
import { getRarityColorClass } from "@/utils/achievementUtils";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  // Get gradient background color based on rarity
  const getGradientBg = () => {
    switch(achievement.rarity) {
      case 'legendary':
        return 'linear-gradient(135deg, #FF8A00, #FF0080)';
      case 'epic':
        return 'linear-gradient(135deg, #8E33FF, #6D28D9)';
      case 'rare':
        return 'linear-gradient(135deg, #3B82F6, #10B981)';
      case 'common':
      default:
        return 'linear-gradient(135deg, #6B7280, #9CA3AF)';
    }
  };

  return (
    <div className="achievement-card bg-[#1E1E1E] rounded-lg overflow-hidden shadow-lg transition-all duration-300 border border-gray-800">
      <div className="p-3">
        {/* Achievement header with badge and share button */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-bold text-sm">{achievement.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <ShareButton achievement={achievement} variant="small" />
            <RarityBadge rarity={achievement.rarity} />
          </div>
        </div>
        
        {/* Achievement description */}
        <p className="text-gray-400 text-xs mb-3">{achievement.description}</p>
        
        {/* Game title with full width */}
        <div className="bg-[#2A2A2A] p-2 rounded-md mb-2">
          <div className="text-xs text-gray-300 font-medium truncate">
            <i className="ri-gamepad-line mr-1"></i> {achievement.game}
          </div>
        </div>
        
        {/* Unlock percentage */}
        <div className="flex items-center">
          <div className="flex-1 mr-2">
            <div className="h-1.5 w-full bg-[#2D3748] rounded-full overflow-hidden">
              <div
                style={{ 
                  width: `${achievement.unlockPercentage}%`,
                  background: getGradientBg(),
                  height: '100%'
                }}
                className="rounded-full"
              ></div>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            {Math.floor(achievement.unlockPercentage)}% unlocked
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
