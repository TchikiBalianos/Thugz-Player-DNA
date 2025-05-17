import React, { useMemo, useState, useEffect } from "react";
import { usePlayerData } from "@/hooks/usePlayerData";
import { Card, CardContent } from "@/components/ui/card";
import { formatHours, formatPercentage } from "@/utils/formatUtils";
import { fetchSteamAvatar, SteamAvatarInfo } from "@/services/steamAvatarService";

const ProfileHeader: React.FC = () => {
  const { playerStats, pcsrProfile, achievements, currentSteamId } = usePlayerData();
  const [avatarInfo, setAvatarInfo] = useState<SteamAvatarInfo | null>(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  // Fetch the Steam avatar when the component mounts or the Steam ID changes
  useEffect(() => {
    if (!currentSteamId) return;
    
    const getAvatar = async () => {
      try {
        setIsLoadingAvatar(true);
        setAvatarError(false);
        const data = await fetchSteamAvatar(currentSteamId);
        setAvatarInfo(data);
      } catch (error) {
        console.error("Failed to load Steam avatar:", error);
        setAvatarError(true);
      } finally {
        setIsLoadingAvatar(false);
      }
    };
    
    getAvatar();
  }, [currentSteamId]);

  // Generate random avatar colors for consistent display
  const avatarColors = useMemo(() => {
    const colors = [
      "bg-gradient-to-br from-purple-600 to-blue-500",
      "bg-gradient-to-br from-blue-500 to-teal-400",
      "bg-gradient-to-br from-green-500 to-teal-400",
      "bg-gradient-to-br from-pink-500 to-rose-400",
      "bg-gradient-to-br from-yellow-400 to-orange-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500"
    ];
    
    // Use player name to select a consistent color
    const index = playerStats?.player_name ? 
      playerStats.player_name.charCodeAt(0) % colors.length : 
      Math.floor(Math.random() * colors.length);
    
    return colors[index];
  }, [playerStats?.player_name]);

  // Total achievements count
  const achievementsCount = achievements?.length || 0;

  if (!playerStats) {
    return (
      <Card className="dna-card rounded-xl p-6 animate-pulse">
        <div className="flex items-center">
          <div className="h-24 w-24 rounded-full bg-[#1E1E1E] mr-8"></div>
          <div className="flex-1">
            <div className="h-8 w-48 bg-[#1E1E1E] rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-[#1E1E1E] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="dna-card rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:mr-8 mb-4 md:mb-0 relative">
          <div className="h-24 w-24 rounded-full bg-[#1E1E1E] overflow-hidden border-4 border-primary-500">
            {avatarInfo && avatarInfo.large ? (
              /* Real Steam avatar */
              <img 
                src={avatarInfo.large} 
                alt={`${avatarInfo.profileName}'s Steam avatar`}
                className="h-full w-full object-cover"
              />
            ) : isLoadingAvatar ? (
              /* Loading state */
              <div className="h-full w-full flex items-center justify-center bg-[#1E1E1E]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              /* Fallback avatar with initial */
              <div className={`h-full w-full flex items-center justify-center ${avatarColors} text-white font-bold text-3xl font-gaming`}>
                {playerStats.player_name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          {/* Steam profile link */}
          {avatarInfo && avatarInfo.profileUrl && (
            <a 
              href={avatarInfo.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute -bottom-2 -right-2 bg-primary-500 rounded-full p-1.5 text-white hover:bg-primary-600 transition-colors"
              title="View Steam Profile"
            >
              <i className="ri-steam-fill text-lg"></i>
            </a>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-gaming font-bold mb-2 md:mb-0 md:mr-4">
              {playerStats.player_name}
            </h2>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white mr-2">
                <i className="ri-gamepad-line mr-1"></i> {pcsrProfile?.type || 'N/A'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-600 text-white">
                <i className="ri-trophy-line mr-1"></i> Elite Gamer
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Achievements</div>
              <div className="text-xl font-bold">{achievementsCount}</div>
            </div>
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Time Played</div>
              <div className="text-xl font-bold">{formatHours(playerStats.total_hours)}</div>
            </div>
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Games Played</div>
              <div className="text-xl font-bold">{playerStats.played_games}</div>
            </div>
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Completion</div>
              <div className="text-xl font-bold">{formatPercentage(playerStats.completion_percent)}</div>
            </div>
            <div className="bg-[#1E1E1E] p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Steam Level</div>
              <div className="text-xl font-bold flex items-center">
                <span>{playerStats.steam_level}</span>
                <span className="ml-2 bg-accent-500 rounded-full px-2 py-0.5 text-xs font-medium">LEVEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
