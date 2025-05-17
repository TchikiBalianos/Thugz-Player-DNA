import React, { useState, useMemo, useEffect } from "react";
import { usePlayerData } from "@/hooks/usePlayerData";
import { formatHours, formatPercentage } from "@/utils/formatUtils";
import { Game, Achievement } from "@/data/mockData";
import AchievementCard from "./AchievementCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getGameAchievements } from "@/data/gameAchievementsData";
import { getRarityFromPercentage } from "@/utils/achievementUtils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GAMES_PER_PAGE = 10;

const GamesAccordion: React.FC = () => {
  // Get games from the PlayerData context
  const { games } = usePlayerData();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(games.length / GAMES_PER_PAGE));
  }, [games.length]);

  // Reset expanded game when page changes
  useEffect(() => {
    setExpandedGame(null);
  }, [currentPage]);

  // Sort games by achievement percentage (highest first)
  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => b.achievementPercentage - a.achievementPercentage);
  }, [games]);

  // Get games for current page
  const currentGames = useMemo(() => {
    const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
    return sortedGames.slice(startIndex, startIndex + GAMES_PER_PAGE);
  }, [sortedGames, currentPage]);

  // Cache to store generated achievements
  const [achievementsCache, setAchievementsCache] = useState<Record<string, Achievement[]>>({});

  // Get achievements for a specific game
  const getAchievementsForGame = async (game: Game): Promise<Achievement[]> => {
    // Return from cache if available
    if (achievementsCache[game.id]) {
      return achievementsCache[game.id];
    }
    
    try {
      // Fetch real achievements from the API
      const appId = game.appId || game.id.replace('game-', '');
      const steamId = '76561198068135033'; // Default Steam ID
      
      const response = await fetch(
        `https://achievements-colosseumhackaton-backend.onrender.com/steam/achievements?steamid=${steamId}&appid=${appId}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch achievements for ${game.name}`);
      }
      
      const data = await response.json();
      console.log(`Achievement data for ${game.name}:`, data);
      
      // Check if we have achievements data in the response
      if (data.playerstats && data.playerstats.achievements) {
        const achievements = data.playerstats.achievements;
        console.log(`Fetched ${achievements.length} achievements for ${game.name}`);
        
        // Convert to our Achievement format
        const formattedAchievements = achievements.map((item: any, index: number): Achievement => {
          // Assign a more realistic rarity based on achievement name
          // For simplicity, assign rarer achievements to those with longer names or special keywords
          const nameLength = (item.apiname || "").length;
          let rarityScore: number;
          
          if ((item.apiname || "").match(/master|complete|perfect|all|platinum|gold|100%|finish/i)) {
            rarityScore = 0.5; // Very rare (likely to be a completion achievement)
          } else if (nameLength > 20) {
            rarityScore = 3; // Epic
          } else if (nameLength > 15) {
            rarityScore = 7; // Rare
          } else {
            rarityScore = 15; // Common
          }
          
          // Add some randomness to avoid all achievements having the same rarity
          const randomFactor = Math.random() * 5;
          const unlockPercentage = Math.max(0.1, rarityScore + randomFactor);
          
          // Format achievement name by replacing underscores with spaces and capitalizing
          const formattedName = (item.apiname || "Unknown Achievement")
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l: string) => l.toUpperCase()); // Capitalize each word
          
          return {
            id: `${game.id}-achievement-${index}`,
            name: formattedName,
            description: item.achieved 
              ? `Unlocked on ${new Date(item.unlocktime * 1000).toLocaleDateString()}`
              : "Not yet unlocked",
            game: game.name,
            unlockPercentage: unlockPercentage,
            imageUrl: "",  // No image URL in the response
            rarity: getRarityFromPercentage(unlockPercentage)
          };
        });
        
        // Update cache with formatted achievements
        setAchievementsCache(prev => ({
          ...prev,
          [game.id]: formattedAchievements
        }));
        
        return formattedAchievements;
      }
      
      console.log(`No achievements found for ${game.name}`);
      
      // Generate fallback achievements since none were found
      const fallbackAchievements = getGameAchievements(game);
      
      // Update cache with fallback achievements
      setAchievementsCache(prev => ({
        ...prev,
        [game.id]: fallbackAchievements
      }));
      
      return fallbackAchievements;
      
    } catch (error) {
      console.error(`Error fetching achievements for ${game.name}:`, error);
      
      // Fallback to generated achievements if API fails
      const fallbackAchievements = getGameAchievements(game);
      
      // Update cache
      setAchievementsCache(prev => ({
        ...prev,
        [game.id]: fallbackAchievements
      }));
      
      return fallbackAchievements;
    }
  };

  // Load achievements for a game
  const [achievementsLoading, setAchievementsLoading] = useState<Record<string, boolean>>({});

  // Toggle accordion expansion and load achievements
  const toggleExpand = async (gameId: string) => {
    if (expandedGame === gameId) {
      setExpandedGame(null);
    } else {
      setExpandedGame(gameId);
      
      // Find the game object
      const game = currentGames.find(g => g.id === gameId);
      
      if (game && !achievementsCache[gameId]) {
        // Set loading state for this game
        setAchievementsLoading(prev => ({ ...prev, [gameId]: true }));
        
        try {
          // Fetch achievements for this game
          await getAchievementsForGame(game);
        } finally {
          // Clear loading state
          setAchievementsLoading(prev => ({ ...prev, [gameId]: false }));
        }
      }
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dna-card rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-gaming font-bold">Games Library</h2>
          <div className="text-sm text-gray-400">{games.length} games</div>
        </div>

        <div className="space-y-4 mb-6">
          {currentGames.map((game) => {
            // We no longer need to pre-calculate achievements here
            // They are loaded asynchronously when the game is expanded
              
            return (
              <div key={game.id} className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-gray-800">
                {/* Game Header */}
                <div 
                  className="p-4 flex items-center cursor-pointer"
                  onClick={() => toggleExpand(game.id)}
                >
                  <div className="h-14 w-14 rounded-md overflow-hidden mr-4 flex-shrink-0 border border-gray-700 bg-primary-900">
                    <img 
                      src={game.imageUrl}
                      alt={game.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, fallback to icon
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="h-full w-full flex items-center justify-center bg-primary-900">
                            <i class="ri-gamepad-line text-2xl text-white"></i>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{game.name}</h3>
                      <span className="text-xs bg-primary-900 text-primary-300 px-2 py-1 rounded flex items-center">
                        <i className="ri-trophy-line mr-1"></i> {formatPercentage(game.achievementPercentage)}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span className="mr-3">
                        <i className="ri-time-line mr-1"></i> {formatHours(game.hoursPlayed)}
                      </span>
                      <span>
                        {/* Show total achievements from the data */}
                        {game.totalAchievements !== undefined ? `${game.totalAchievements} achievements` : 'No achievements'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar 
                        value={game.achievementPercentage} 
                        className="h-2"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <i className={`ri-arrow-${expandedGame === game.id ? 'up' : 'down'}-s-line text-xl text-gray-400`}></i>
                  </div>
                </div>

                {/* Game Achievements */}
                {expandedGame === game.id && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-gray-800 pt-4 mb-2">
                      <h4 className="text-sm font-bold mb-3">Achievements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {achievementsLoading[game.id] ? (
                          <div className="text-gray-400 text-sm col-span-2">Loading achievements from Steam...</div>
                        ) : (
                          achievementsCache[game.id] && achievementsCache[game.id].length > 0 ? (
                            achievementsCache[game.id].map((achievement) => (
                              <AchievementCard key={achievement.id} achievement={achievement} />
                            ))
                          ) : (
                            <div className="text-gray-400 text-sm col-span-2">No achievements found for this game</div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination - only show if we have more than one page */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default GamesAccordion;