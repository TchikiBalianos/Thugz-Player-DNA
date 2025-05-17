export interface PlayerStats {
  player_name: string;
  steam_level: number;
  total_hours: number;
  played_games: number;
  completion_percent: number;
}

export interface PcsrAxis {
  code: string;
  reason: string;
  score: number;
}

export interface PcsrProfile {
  type: string;
  axes: {
    [key: string]: PcsrAxis;
  };
}

export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  game: string;
  unlockPercentage: number;
  imageUrl: string;
  rarity: Rarity;
  appId?: string; // Steam game app ID for linking to game and getting capsule images
}

export interface Game {
  id: string;
  appId?: string;  // Adding Steam appId field
  name: string;
  imageUrl: string;
  hoursPlayed: number;
  achievementPercentage: number;
  totalAchievements?: number;
}

export interface RecentActivity {
  lastPlayed: {
    name: string;
    imageUrl: string;
    lastPlayedText: string;
  };
  recentAchievement: {
    name: string;
    description: string;
    rarity: Rarity;
  };
}

export interface Genre {
  name: string;
  percentage: number;
}

// Mock data for achievements
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Master Strategist',
    description: 'Complete the game on the highest difficulty without dying',
    game: 'Civilization VI',
    unlockPercentage: 0.5,
    imageUrl: 'https://images.unsplash.com/photo-1616587226157-48e49175ee20?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'legendary'
  },
  {
    id: '2',
    name: 'Global Champion',
    description: 'Win 100 ranked matches in competitive mode',
    game: 'Counter-Strike 2',
    unlockPercentage: 3.2,
    imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'epic'
  },
  {
    id: '3',
    name: 'Explorer Extraordinaire',
    description: 'Discover all hidden locations on the map',
    game: 'The Witcher 3',
    unlockPercentage: 8.7,
    imageUrl: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'rare'
  },
  {
    id: '4',
    name: 'The Hero\'s Journey',
    description: 'Complete the main storyline on any difficulty',
    game: 'God of War',
    unlockPercentage: 45.2,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'common'
  },
  {
    id: '5',
    name: 'Squad Victory',
    description: 'Win 50 matches with the same squad members',
    game: 'Apex Legends',
    unlockPercentage: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'epic'
  },
  {
    id: '6',
    name: 'Undefeated Champion',
    description: 'Defeat the final boss without taking damage',
    game: 'Elden Ring',
    unlockPercentage: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    rarity: 'legendary'
  }
];

// Mock data for games
export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Counter-Strike 2',
    imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    hoursPlayed: 1243,
    achievementPercentage: 78
  },
  {
    id: '2',
    name: 'Grand Theft Auto V',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    hoursPlayed: 876,
    achievementPercentage: 92
  },
  {
    id: '3',
    name: 'Apex Legends',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    hoursPlayed: 654,
    achievementPercentage: 64
  },
  {
    id: '4',
    name: 'The Witcher 3',
    imageUrl: 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    hoursPlayed: 432,
    achievementPercentage: 87
  },
  {
    id: '5',
    name: 'Minecraft',
    imageUrl: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    hoursPlayed: 412,
    achievementPercentage: 45
  }
];

// Mock data for recent activity
export const mockRecentActivity: RecentActivity = {
  lastPlayed: {
    name: 'Cyberpunk 2077',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100',
    lastPlayedText: 'Last played 2 hours ago'
  },
  recentAchievement: {
    name: 'Night City Legend',
    description: 'Completed all gigs in Night City',
    rarity: 'rare'
  }
};

// Mock data for genres
export const mockGenres: Genre[] = [
  {
    name: 'FPS',
    percentage: 65
  },
  {
    name: 'RPG',
    percentage: 45
  },
  {
    name: 'Strategy',
    percentage: 30
  }
];
