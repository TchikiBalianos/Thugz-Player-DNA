import React from "react";
import { usePlayerData } from "@/hooks/usePlayerData";

const Header: React.FC = () => {
  const { loadPlayerData, isLoading } = usePlayerData();

  const handleRefresh = () => {
    loadPlayerData();
  };

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
            <i className="ri-dna-fill text-xl text-white"></i>
          </div>
          <h1 className="text-2xl font-gaming font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300">
            PLAYER DNA
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-[#2D3748] rounded-lg flex items-center hover:bg-primary-900 transition duration-300"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <i className={`ri-refresh-${isLoading ? 'spin' : 'line'} mr-2`}></i>
            <span>{isLoading ? "Refreshing..." : "Refresh Data"}</span>
          </button>
          <button className="px-4 py-2 bg-primary-600 rounded-lg flex items-center hover:bg-primary-700 transition duration-300">
            <i className="ri-steam-fill mr-2"></i>
            <span>Connect Steam</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
