import { useContext } from 'react';
import { PlayerDataContext } from '@/contexts/PlayerDataContext';

// This hook is a wrapper around the context for easier use
export function usePlayerData() {
  const context = useContext(PlayerDataContext);
  if (context === undefined) {
    throw new Error('usePlayerData must be used within a PlayerDataProvider');
  }
  return context;
}
