import React, { useState, useEffect } from 'react';
import { Game } from '@/data/mockData';

const TestPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/game-test');
        const data = await response.json();
        console.log('Test games data:', data.games);
        setGames(data.games);
      } catch (error) {
        console.error('Error fetching test games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Game Test Page</h1>
      
      {games.map(game => (
        <div key={game.id} className="p-4 border border-gray-700 rounded-lg mb-4">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded overflow-hidden mr-4 border border-gray-700">
              <img 
                src={game.imageUrl} 
                alt={game.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', game.imageUrl);
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="h-full w-full flex items-center justify-center bg-slate-800">
                      <span class="text-white">No Image</span>
                    </div>
                  `;
                }}
              />
            </div>
            <div>
              <h2 className="font-bold">{game.name}</h2>
              <p className="text-sm text-gray-400">ID: {game.id}</p>
              <p className="text-sm">Total Achievements: <strong>{game.totalAchievements}</strong></p>
            </div>
          </div>
          
          <div className="mt-2 p-3 bg-gray-800 rounded">
            <code className="text-xs">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(game, null, 2)}
              </pre>
            </code>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestPage;