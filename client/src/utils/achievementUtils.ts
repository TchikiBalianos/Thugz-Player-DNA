import { Rarity } from '@/data/mockData';

// Function to determine achievement rarity based on unlock percentage
export const getRarityFromPercentage = (unlockPercentage: number): Rarity => {
  if (unlockPercentage < 1) {
    return 'legendary';
  } else if (unlockPercentage < 5) {
    return 'epic';
  } else if (unlockPercentage < 10) {
    return 'rare';
  } else {
    return 'common';
  }
};

// Function to get the rarity color class
export const getRarityColorClass = (rarity: Rarity): string => {
  switch(rarity) {
    case 'legendary':
      return 'badge-legendary';
    case 'epic':
      return 'badge-epic';
    case 'rare':
      return 'badge-rare';
    case 'common':
    default:
      return 'badge-common';
  }
};

// Function to sort achievements by rarity
export const sortAchievementsByRarity = (achievements: any[]): any[] => {
  const rarityOrder = {
    legendary: 0,
    epic: 1,
    rare: 2,
    common: 3
  };
  
  return [...achievements].sort((a, b) => {
    return rarityOrder[a.rarity as Rarity] - rarityOrder[b.rarity as Rarity];
  });
};
