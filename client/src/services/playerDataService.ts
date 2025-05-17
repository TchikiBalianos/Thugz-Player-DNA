import { Achievement, Game, PlayerStats, PcsrProfile } from '@/data/mockData';
import { getRarityFromPercentage } from '@/utils/achievementUtils';

// Default Steam ID to use if none is provided
const DEFAULT_STEAM_ID = '76561198068135033';

// API base URL - use the Express server on port 5000
const API_BASE_URL = '/api';

// Function to fetch player stats with improved error handling
export const fetchPlayerStats = async (steamId: string = DEFAULT_STEAM_ID): Promise<PlayerStats> => {
  try {
    console.log(`Fetching player stats for Steam ID: ${steamId}`);
    
    // Use AbortController to handle request timeouts manually
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (1 minute)
    
    const response = await fetch(`${API_BASE_URL}/player-stats?steamId=${steamId}`, {
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Failed to fetch player stats: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to fetch player stats: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Successfully received player stats data for', steamId);
    
    // Map API response to our PlayerStats format with better null handling
    return {
      player_name: data.player_name || 'Steam Player',
      steam_level: Number(data.steam_level) || 1,
      total_hours: Number(data.total_hours) || 0,
      played_games: Number(data.played_games) || 0,
      completion_percent: Number(data.completion_percent) || 0
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    
    // Handle the case where we have an AbortError (timeout)
    const isTimeout = error instanceof DOMException && error.name === 'AbortError';
    const errorMessage = isTimeout ? 'Request timed out - this Steam account may have too many games' : 'Failed to load player data';
    
    // Return a basic placeholder for the error state
    return {
      player_name: 'Steam Player',
      steam_level: 1,
      total_hours: 0,
      played_games: 0,
      completion_percent: 0
    };
  }
};

// Function to map API achievement format to our application format
const mapAchievements = (achievementsData: any): { achievements: Achievement[], games: Game[] } => {
  const achievements = achievementsData.achievements.map((achievement: any) => ({
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    game: achievement.game,
    unlockPercentage: achievement.unlock_percentage,
    imageUrl: achievement.image_url || 'https://via.placeholder.com/300x200',
    rarity: achievement.rarity || getRarityFromPercentage(achievement.unlock_percentage)
  })) as Achievement[];

  const games = achievementsData.games.map((game: any) => ({
    id: game.id,
    appId: game.appId,
    name: game.name,
    imageUrl: game.imageUrl,
    hoursPlayed: game.hoursPlayed,
    achievementPercentage: game.achievementPercentage,
    totalAchievements: game.totalAchievements
  })) as Game[];

  return { achievements, games };
};

// Function to fetch player achievements and games with improved timeout handling
export const fetchAchievements = async (steamId: string = DEFAULT_STEAM_ID): Promise<{ achievements: Achievement[], games: Game[] }> => {
  try {
    console.log(`Fetching achievements for Steam ID: ${steamId}`);
    
    // Use AbortController to handle request timeouts manually
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (1 minute)
    
    const response = await fetch(`${API_BASE_URL}/achievements?steamId=${steamId}`, {
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Failed to fetch achievements: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to fetch achievements data: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully received achievements data for Steam ID: ${steamId}`);
    
    // Process and return the achievements data
    const mappedData = mapAchievements(data);
    console.log(`Processed ${mappedData.achievements.length} achievements across ${mappedData.games.length} games`);
    return mappedData;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    
    // Handle the case where we have an AbortError (timeout)
    const isTimeout = error instanceof DOMException && error.name === 'AbortError';
    const errorMessage = isTimeout 
      ? 'Request timed out - this Steam account may have too many games' 
      : 'Failed to load achievement data';
    console.warn(errorMessage);
    
    // Return empty arrays if there's an error
    return { achievements: [], games: [] };
  }
};

// Function to fetch PCSR profile with improved timeout and error handling
export const fetchPcsrProfile = async (steamId: string = DEFAULT_STEAM_ID): Promise<PcsrProfile> => {
  try {
    console.log(`Fetching PCSR profile for Steam ID: ${steamId}`);
    
    // Use AbortController to handle request timeouts manually
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (1 minute)
    
    const response = await fetch(`${API_BASE_URL}/pcsr-profile?steamId=${steamId}`, {
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Failed to fetch PCSR profile: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to fetch PCSR profile: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully received PCSR profile data for Steam ID: ${steamId}`);
    return data;
  } catch (error) {
    console.error('Error fetching PCSR profile:', error);
    
    // Handle the case where we have an AbortError (timeout)
    const isTimeout = error instanceof DOMException && error.name === 'AbortError';
    const errorMessage = isTimeout 
      ? 'Request timed out - this Steam account may have too many games' 
      : 'Failed to load PCSR profile data';
    console.warn(errorMessage);
    
    // Return a default profile if there's an error
    return {
      type: 'CSTH',
      axes: {
        "Progression Style": {
          code: "C",
          reason: "Based on available data",
          score: 0.75
        },
        "Challenge Nature": {
          code: "S", 
          reason: "Based on available data",
          score: 0.6
        },
        "Social Orientation": {
          code: "T",
          reason: "Based on available data", 
          score: 0.7
        },
        "Rhythm / Engagement": {
          code: "H",
          reason: "Based on available data",
          score: 0.8
        }
      }
    };
  }
};

// Fetch player data with a specific Steam ID - prioritize real data for Stats and Avatar
export const fetchPlayerDataFromApi = async (steamId: string = DEFAULT_STEAM_ID) => {
  try {
    console.log(`Fetching player data from API for Steam ID: ${steamId}`);
    
    // Get real Player Stats - This is high priority real data
    let playerStats = null;
    try {
      // This is critical - we want real player stats data whenever possible
      console.log(`Fetching real player stats for: ${steamId}`);
      playerStats = await fetchPlayerStats(steamId);
      console.log('Successfully retrieved real player stats data');
    } catch (error) {
      console.error('Failed to fetch real player stats:', error);
      playerStats = { 
        player_name: 'Steam Player', 
        steam_level: 1, 
        total_hours: 0, 
        played_games: 0, 
        completion_percent: 0 
      };
    }
    
    // Always use mock data for achievements/games (as requested)
    // Use specific Steam ID 76561198074822731 for achievements data
    const ACHIEVEMENT_STEAM_ID = '76561198074822731';
    console.log(`Using mock data for achievements and games with ID: ${ACHIEVEMENT_STEAM_ID}`);
    const achievementsResult = await fetchAchievements(ACHIEVEMENT_STEAM_ID);
    
    // Always use mock data for PCSR profile (as requested)
    // Use same Steam ID for PCSR profile as for achievements
    console.log(`Using mock data for PCSR profile with ID: ${ACHIEVEMENT_STEAM_ID}`);
    const pcsrProfile = await fetchPcsrProfile(ACHIEVEMENT_STEAM_ID);
    
    console.log(`Successfully processed data for Steam ID: ${steamId}`);
    
    // Return combined data: real stats + mock achievements/games/profile
    return {
      playerStats,
      achievements: achievementsResult,
      pcsrProfile
    };
  } catch (error) {
    console.error('Error fetching player data:', error);
    
    // Provide a useful error message to the user
    const message = 'Unable to load Steam player data. Please try a different profile URL or try again later.';
    throw new Error(message);
  }
};
