import { Achievement, Rarity } from "./mockData";
import { getRarityFromPercentage } from "@/utils/achievementUtils";

// Game-specific achievement templates
type GameAchievementTemplate = {
  achievements: {
    name: string;
    description: string;
    unlockPercentage: number;
  }[];
};

// Real achievement templates for popular games
const gameAchievementsTemplates: Record<string, GameAchievementTemplate> = {
  "Counter-Strike 2": {
    achievements: [
      { name: "Body Count", description: "Kill 25 enemies", unlockPercentage: 65.3 },
      { name: "Pistolero", description: "Win a pistol round", unlockPercentage: 48.7 },
      { name: "Leet Skills", description: "Kill 250 enemies", unlockPercentage: 34.2 },
      { name: "Head Hunter", description: "Kill 100 enemies with headshots", unlockPercentage: 22.8 },
      { name: "Bomb Specialist", description: "Plant or defuse 100 bombs", unlockPercentage: 18.5 },
      { name: "Marksman", description: "Kill an enemy with a zoomed-in sniper rifle", unlockPercentage: 42.1 },
      { name: "Rampage", description: "Kill 5 enemies in a single round", unlockPercentage: 9.6 },
      { name: "Global Elite", description: "Reach the Global Elite rank", unlockPercentage: 1.2 },
    ]
  },
  "Grand Theft Auto V": {
    achievements: [
      { name: "Welcome to Los Santos", description: "Complete the Prologue", unlockPercentage: 87.4 },
      { name: "A Friendship Resurrected", description: "Complete Fame or Shame", unlockPercentage: 52.6 },
      { name: "The Government Gimps", description: "Complete Monkey Business", unlockPercentage: 38.9 },
      { name: "Career Criminal", description: "Attain 100% in the Career Criminal stat", unlockPercentage: 4.2 },
      { name: "Los Santos Legend", description: "Achieve 100% completion", unlockPercentage: 0.8 },
      { name: "Kifflom!", description: "Complete the Epsilon Program", unlockPercentage: 3.1 },
      { name: "Three Man Army", description: "Survive a 3-star wanted level with all three characters together", unlockPercentage: 14.7 },
      { name: "Solid Gold, Baby!", description: "Earn 70 Gold Medals in Missions and Strangers and Freaks", unlockPercentage: 1.5 },
    ]
  },
  "Apex Legends": {
    achievements: [
      { name: "Fully Kitted", description: "Equip a fully kitted weapon", unlockPercentage: 72.3 },
      { name: "Team Player", description: "Revive a teammate", unlockPercentage: 68.5 },
      { name: "Apex Predator", description: "Win a match as the Kill Leader", unlockPercentage: 22.7 },
      { name: "Hot Streak", description: "Win 2 games in a row", unlockPercentage: 9.4 },
      { name: "Rapid Elimination", description: "Kill an entire squad within 20 seconds", unlockPercentage: 14.8 },
      { name: "Legendary Hunter", description: "Loot a Legendary item from a death box", unlockPercentage: 45.2 },
      { name: "Well-Rounded", description: "Deal 5,000 damage with 8 different Legends", unlockPercentage: 5.1 },
      { name: "Champion of the Arena", description: "Win a match with 5+ kills", unlockPercentage: 18.6 },
    ]
  },
  "The Witcher 3": {
    achievements: [
      { name: "Lilac and Gooseberries", description: "Find Yennefer of Vengerberg", unlockPercentage: 72.8 },
      { name: "The Witcher's Story", description: "Complete the main story", unlockPercentage: 29.4 },
      { name: "Geralt: The Professional", description: "Complete all contracts", unlockPercentage: 8.7 },
      { name: "Gwent Master", description: "Collect all the cards in the base game", unlockPercentage: 4.3 },
      { name: "Dressed to Kill", description: "Acquire all witcher gear", unlockPercentage: 3.8 },
      { name: "Walked the Path", description: "Complete the game on the Death March difficulty level", unlockPercentage: 2.1 },
      { name: "Full Crew", description: "Gather all possible allies to Kaer Morhen", unlockPercentage: 15.3 },
      { name: "Fist of the South Star", description: "Win all fistfights on the highest difficulty", unlockPercentage: 6.9 },
    ]
  },
  "Minecraft": {
    achievements: [
      { name: "Getting Wood", description: "Punch a tree until a block of wood pops out", unlockPercentage: 91.2 },
      { name: "DIAMONDS!", description: "Acquire diamonds with your iron tools", unlockPercentage: 45.6 },
      { name: "We Need to Go Deeper", description: "Build, light and enter a Nether Portal", unlockPercentage: 36.8 },
      { name: "The End?", description: "Enter the End portal", unlockPercentage: 18.3 },
      { name: "The End.", description: "Defeat the Ender Dragon", unlockPercentage: 12.5 },
      { name: "Enchanter", description: "Construct an Enchantment Table", unlockPercentage: 32.4 },
      { name: "Adventuring Time", description: "Discover 17 biomes", unlockPercentage: 7.9 },
      { name: "Beaconator", description: "Create a full beacon", unlockPercentage: 4.1 },
    ]
  },
  "Cyberpunk 2077": {
    achievements: [
      { name: "The Fool", description: "Finish the first act of the main story", unlockPercentage: 68.7 },
      { name: "The Devil", description: "Finish the game with a specific ending", unlockPercentage: 21.5 },
      { name: "The Star", description: "Finish the game with a specific ending", unlockPercentage: 19.8 },
      { name: "The Sun", description: "Finish the game with a specific ending", unlockPercentage: 18.2 },
      { name: "The Temperance", description: "Finish the game with a specific ending", unlockPercentage: 14.9 },
      { name: "Autojock", description: "Buy all vehicles available for purchase", unlockPercentage: 3.2 },
      { name: "Legend of Night City", description: "Complete all gigs and NCPD Scanner Hustles in Night City", unlockPercentage: 5.7 },
      { name: "Breathtaking", description: "Collect all items that once belonged to Johnny Silverhand", unlockPercentage: 8.3 },
    ]
  },
  // Generic template for any other game
  "default": {
    achievements: [
      { name: "First Steps", description: "Complete the tutorial", unlockPercentage: 85.3 },
      { name: "Story Progress", description: "Complete the first chapter", unlockPercentage: 62.7 },
      { name: "Mid-Game Achievement", description: "Reach the halfway point in the story", unlockPercentage: 43.1 },
      { name: "Collector", description: "Find 50% of all collectibles", unlockPercentage: 18.5 },
      { name: "Master Collector", description: "Find all collectibles in the game", unlockPercentage: 4.2 },
      { name: "Expert Player", description: "Complete a difficult challenge", unlockPercentage: 12.4 },
      { name: "Completionist", description: "Complete all side missions", unlockPercentage: 7.8 },
      { name: "Platinum Trophy", description: "Earn all other achievements", unlockPercentage: 1.3 },
    ]
  }
};

// Function to generate mock achievements for a game
export const generateGameAchievements = (
  gameName: string, 
  gameId: string, 
  totalAchievements: number = 8
): Achievement[] => {
  // Check if we have a template for this game, otherwise use default
  const template = gameAchievementsTemplates[gameName] || gameAchievementsTemplates.default;
  const achievementsToGenerate = Math.min(totalAchievements, template.achievements.length);
  
  // Create achievements from template
  return template.achievements.slice(0, achievementsToGenerate).map((achievement, index) => {
    const rarity = getRarityFromPercentage(achievement.unlockPercentage);
    
    return {
      id: `${gameId}-achievement-${index + 1}`,
      name: achievement.name,
      description: achievement.description,
      game: gameName,
      unlockPercentage: achievement.unlockPercentage,
      imageUrl: "https://via.placeholder.com/300x200",
      rarity
    };
  });
};

// Cache to store generated achievements by game ID
const gameAchievementsCache = new Map<string, Achievement[]>();

// Function to get or generate achievements for a game
export const getGameAchievements = (
  game: { id: string; name: string; achievementPercentage: number }
): Achievement[] => {
  // Return from cache if available
  if (gameAchievementsCache.has(game.id)) {
    return gameAchievementsCache.get(game.id)!;
  }
  
  // Generate random number of achievements between 4 and 8
  const achievementCount = Math.floor(Math.random() * 5) + 4;
  
  // Generate achievements
  const achievements = generateGameAchievements(game.name, game.id, achievementCount);
  
  // Cache the results
  gameAchievementsCache.set(game.id, achievements);
  
  return achievements;
};