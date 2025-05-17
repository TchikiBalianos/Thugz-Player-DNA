import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  fetchPlayerStats, 
  fetchAchievements, 
  fetchPcsrProfile,
  fetchPlayerDataFromApi
} from '@/services/playerDataService';
import { PlayerStats, PcsrProfile, Achievement, Game } from '@/data/mockData';

// Default Steam ID to use if none is provided
const DEFAULT_STEAM_ID = '76561198068135033';

interface PlayerDataContextType {
  playerStats: PlayerStats | null;
  pcsrProfile: PcsrProfile | null;
  achievements: Achievement[];
  games: Game[];
  isLoading: boolean;
  error: string | null;
  currentSteamId: string;
  loadPlayerData: (steamId?: string) => Promise<void>;
}

export const PlayerDataContext = createContext<PlayerDataContextType | undefined>(undefined);

export const PlayerDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [pcsrProfile, setPcsrProfile] = useState<PcsrProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSteamId, setCurrentSteamId] = useState<string>(DEFAULT_STEAM_ID);

  const loadPlayerData = useCallback(async (steamId?: string) => {
    const targetSteamId = steamId || currentSteamId || DEFAULT_STEAM_ID;
    setIsLoading(true);
    setError(null);

    try {
      // Update the current Steam ID immediately to ensure it's used in requests
      if (steamId && steamId !== currentSteamId) {
        console.log(`Updating Steam ID from ${currentSteamId} to ${steamId}`);
        setCurrentSteamId(steamId);
      }

      // Load all player data using the target Steam ID
      console.log(`Loading player data for Steam ID: ${targetSteamId}`);
      const data = await fetchPlayerDataFromApi(targetSteamId);
      
      // Update state with the fetched data
      setPlayerStats(data.playerStats);
      setAchievements(data.achievements.achievements);
      setGames(data.achievements.games);
      setPcsrProfile(data.pcsrProfile);

      console.info("Player data loaded successfully");
    } catch (err) {
      console.error('Error loading player data:', err);
      setError('Failed to load player data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [currentSteamId]); // Add currentSteamId as a dependency

  const value = {
    playerStats,
    pcsrProfile,
    achievements,
    games,
    isLoading,
    error,
    currentSteamId,
    loadPlayerData,
  };

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
};

export function usePlayerData() {
  const context = useContext(PlayerDataContext);
  if (context === undefined) {
    throw new Error('usePlayerData must be used within a PlayerDataProvider');
  }
  return context;
}
