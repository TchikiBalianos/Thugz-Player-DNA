import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { usePlayerData } from "@/hooks/usePlayerData";
import { formatHours } from "@/utils/formatUtils";
import { Button } from "@/components/ui/button";

const GamesList: React.FC = () => {
  const { games } = usePlayerData();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5; // Reduced to 5 games per page
  
  // Sort games by playtime (highest first)
  const sortedGames = [...games].sort((a, b) => b.hoursPlayed - a.hoursPlayed);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedGames.length / gamesPerPage);
  
  // Get current page games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);
  
  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Go to specific page
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Generate page numbers
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pageNumbers: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5; // Increased number of visible page buttons
    
    // If we have a small number of pages, show all of them
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Otherwise, use a more complex approach to show current page with context
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Always include first and last page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('ellipsis');
      }
    }
    
    // Add the main pages
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Add the last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis');
      }
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="dna-card rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-gaming font-bold">Top Games</h2>
          <div className="text-sm text-gray-400">
            by playtime • Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="space-y-4">
          {currentGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#1E1E1E] rounded-lg p-3 flex items-center"
            >
              <div className="h-14 w-14 rounded-md overflow-hidden mr-3 flex-shrink-0">
                <div 
                  className="h-full w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${game.imageUrl})` }}
                ></div>
              </div>
              <div className="flex-1 mr-3">
                <h3 className="font-bold text-sm mb-1">{game.name}</h3>
                <div className="flex items-center text-xs text-gray-400">
                  <span className="mr-2">
                    <i className="ri-time-line mr-1"></i> {formatHours(game.hoursPlayed)}
                  </span>
                  <span>
                    <i className="ri-trophy-line mr-1"></i> {Math.floor(game.achievementPercentage)}%
                  </span>
                  {game.totalAchievements && (
                    <span className="ml-2">
                      <i className="ri-medal-line mr-1"></i> {game.totalAchievements} achievements
                    </span>
                  )}
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary-900 flex items-center justify-center flex-shrink-0">
                <i className="ri-arrow-right-s-line text-primary-300"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === 1 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-primary-300 hover:bg-primary-900/30'
              }`}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            
            {getPageNumbers().map((item, index) => 
              item === 'ellipsis' ? (
                <span 
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={`page-${item}`}
                  onClick={() => goToPage(item as number)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
                    currentPage === item
                      ? 'bg-primary-900 text-white'
                      : 'text-gray-400 hover:bg-primary-900/30'
                  }`}
                >
                  {item}
                </button>
              )
            )}
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === totalPages 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-primary-300 hover:bg-primary-900/30'
              }`}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesList;
