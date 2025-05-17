import React, { useState, useMemo, useEffect } from 'react';
import { usePlayerData } from "@/hooks/usePlayerData";
import Layout from "@/components/layout/Layout";
import AchievementCard from "@/components/dashboard/AchievementCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getRarityFromPercentage } from "@/utils/achievementUtils";
import { Achievement } from "@/data/mockData";
import { Link } from "wouter";

// Number of achievements per page
const ITEMS_PER_PAGE = 10;

const AllAchievements: React.FC = () => {
  const { achievements, games } = usePlayerData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rarity'); // Options: rarity, name, game
  const [rarityFilter, setRarityFilter] = useState('all'); // Options: all, common, rare, epic, legendary
  const [gameFilter, setGameFilter] = useState('all');
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // If no achievements are loaded, generate mock data
  const mockAchievements = useMemo(() => {
    if (achievements.length > 0) return achievements;
    
    // Generate realistic mock achievements if none exist
    const mockData: Achievement[] = [];
    
    // Use existing games to generate achievements
    const availableGames = games.length > 0 ? games : [
      { id: 'game-1', name: 'Cyberpunk 2077', imageUrl: '', hoursPlayed: 120, achievementPercentage: 75 },
      { id: 'game-2', name: 'Elden Ring', imageUrl: '', hoursPlayed: 80, achievementPercentage: 60 },
      { id: 'game-3', name: 'The Witcher 3', imageUrl: '', hoursPlayed: 250, achievementPercentage: 85 },
    ];
    
    // Common achievement names and patterns
    const achievementPrefixes = ['Complete', 'Discover', 'Defeat', 'Collect', 'Master', 'Unlock', 'Find'];
    const achievementSuffixes = ['all items', 'the secret', 'the boss', 'all collectibles', 'the skill', 'the ending', 'the area'];
    
    // Generate 50 achievements
    for (let i = 0; i < 50; i++) {
      const game = availableGames[Math.floor(Math.random() * availableGames.length)];
      const prefix = achievementPrefixes[Math.floor(Math.random() * achievementPrefixes.length)];
      const suffix = achievementSuffixes[Math.floor(Math.random() * achievementSuffixes.length)];
      
      // Generate rarity with weighted distribution
      let unlockPercentage: number;
      const rarityRoll = Math.random() * 100;
      
      if (rarityRoll < 5) {
        // Legendary (very rare)
        unlockPercentage = 0.5 + Math.random() * 1.5;
      } else if (rarityRoll < 15) {
        // Epic (rare)
        unlockPercentage = 2 + Math.random() * 3;
      } else if (rarityRoll < 50) {
        // Rare (uncommon)
        unlockPercentage = 5 + Math.random() * 10;
      } else {
        // Common
        unlockPercentage = 15 + Math.random() * 30;
      }
      
      mockData.push({
        id: `achievement-${i}`,
        name: `${prefix} ${suffix}`,
        description: `Achievement from ${game.name}`,
        game: game.name,
        unlockPercentage,
        imageUrl: '',
        rarity: getRarityFromPercentage(unlockPercentage)
      });
    }
    
    return mockData;
  }, [achievements, games]);

  // Sort achievements based on selected option
  const sortedAchievements = useMemo(() => {
    if (!mockAchievements.length) return [];
    
    const achievementsCopy = [...mockAchievements];
    
    if (sortBy === 'name') {
      return achievementsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'game') {
      return achievementsCopy.sort((a, b) => a.game.localeCompare(b.game));
    } else if (sortBy === 'rarity') {
      // Sort by rarity (lowest unlock percentage first = rarest)
      return achievementsCopy.sort((a, b) => a.unlockPercentage - b.unlockPercentage);
    }
    
    return achievementsCopy;
  }, [mockAchievements, sortBy]);

  // Apply filters to achievements
  const filteredAchievements = useMemo(() => {
    return sortedAchievements.filter(achievement => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        achievement.game.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Rarity filter
      const matchesRarity = rarityFilter === 'all' || achievement.rarity === rarityFilter;
      
      // Game filter
      const matchesGame = gameFilter === 'all' || achievement.game === gameFilter;
      
      return matchesSearch && matchesRarity && matchesGame;
    });
  }, [sortedAchievements, searchQuery, rarityFilter, gameFilter]);

  // Get paginated results
  const paginatedAchievements = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAchievements.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAchievements, currentPage]);

  // Get unique game names for the filter
  const uniqueGames = useMemo(() => {
    return Array.from(new Set(mockAchievements.map(a => a.game))).sort();
  }, [mockAchievements]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredAchievements.length / ITEMS_PER_PAGE));
  }, [filteredAchievements]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('rarity');
    setRarityFilter('all');
    setGameFilter('all');
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-gaming font-bold">All Achievements</h1>
          <Link href="/">
            <Button variant="secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-[#1E1E1E] p-6 rounded-xl mb-8">
          <h2 className="text-xl font-gaming mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Search</label>
              <Input 
                placeholder="Search by name or game..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Sort By</label>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rarity">Rarity (Rarest First)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="game">Game (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Rarity</label>
              <Select
                value={rarityFilter}
                onValueChange={(value) => {
                  setRarityFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by rarity..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Game</label>
              <Select
                value={gameFilter}
                onValueChange={(value) => {
                  setGameFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by game..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {uniqueGames.map(game => (
                    <SelectItem key={game} value={game}>{game}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Showing {filteredAchievements.length} achievements
            </span>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {paginatedAchievements.length > 0 ? (
            paginatedAchievements.map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
              />
            ))
          ) : (
            <div className="col-span-3 py-16 text-center">
              <h3 className="text-xl mb-2">No achievements found</h3>
              <p className="text-gray-400">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum: number;
                
                // Calculate which page numbers to show based on current page
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={currentPage === pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
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
    </Layout>
  );
};

export default AllAchievements;