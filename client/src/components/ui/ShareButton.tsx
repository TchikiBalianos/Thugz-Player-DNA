import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Achievement } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  achievement: Achievement;
  variant?: "default" | "small";
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  achievement, 
  variant = "default" 
}) => {
  const [isSharing, setIsSharing] = useState(false);
  
  // Get the Steam game capsule image URL - uses the appId if available
  const getGameCapsuleUrl = () => {
    // Find the game in the context to get the appId - if we had the full games data
    const appId = achievement.appId || findAppIdByGameName(achievement.game);
    
    if (appId) {
      // Official Steam capsule image URL pattern
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;
    }
    
    // If we don't have an appId (shouldn't happen in production), return empty
    return '';
  };
  
  // Helper function to find appId by game name - in production this would use 
  // game data from the context or API
  const findAppIdByGameName = (gameName: string): string => {
    // This would be replaced with actual app IDs from Steam API in production
    const gameAppIds: Record<string, string> = {
      'Counter-Strike 2': '730',
      'The Witcher 3: Wild Hunt': '292030',
      'Cyberpunk 2077': '1091500',
      'Resident Evil 2': '883710',
      'Team Fortress 2': '440',
      'Fallout 4': '377160',
      'PUBG: BATTLEGROUNDS': '578080',
      'Dishonored': '205100',
      'Dishonored 2': '403640',
      'PAYDAY 2': '218620',
      'Assassin\'s Creed Odyssey': '812140',
      'Hades': '1145360',
      'Among Us': '945360',
      'Destiny 2': '1085660',
      'Monster Hunter: World': '582010',
      'Forza Horizon 5': '1551360'
    };
    
    return gameAppIds[gameName] || '';
  };
  
  // Create the share message
  const getShareMessage = () => {
    return `I unlocked the ${achievement.rarity.toUpperCase()} achievement "${achievement.name}" in ${achievement.game}! Only ${Math.floor(achievement.unlockPercentage)}% of players have this achievement. Check out my Player DNA profile! #PlayerDNA #Gaming`;
  };
  
  // Handle sharing to different platforms
  const shareToTwitter = () => {
    // For Twitter/X, we should create a shareable card with meta tags
    // Since we can't modify meta tags directly from the client for each share,
    // we'll adapt our approach to use Twitter's card system
    
    let text = getShareMessage();
    const imageUrl = getGameCapsuleUrl();
    
    // Add the game image URL at the end of the tweet text
    if (imageUrl) {
      // Trim the message if needed to ensure the image URL fits
      const maxLength = 280 - imageUrl.length - 5; // 5 for space and ellipsis
      if (text.length > maxLength) {
        text = text.substring(0, maxLength - 3) + "...";
      }
      text += " " + imageUrl;
    }
    
    // Open Twitter intent URL with the message
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    
    // Show a toast explaining how to get the image preview
    toast({
      title: "Sharing to X/Twitter",
      description: "For best results with image previews, copy the image link and attach it manually when composing your tweet.",
    });
  };
  
  const shareToFacebook = () => {
    const text = encodeURIComponent(getShareMessage());
    const imageUrl = getGameCapsuleUrl();
    // Facebook sharing - we can set og:image meta tag dynamically for better sharing,
    // but for now we'll include the image URL in the shared URL
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`;
    window.open(shareUrl, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareMessage())
      .then(() => {
        toast({
          title: "Copied!",
          description: "Achievement details copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive"
        });
      });
  };
  
  // Toggle share options
  const toggleShareOptions = () => {
    setIsSharing(!isSharing);
  };
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size={variant === "small" ? "sm" : "default"}
        className={`text-gray-400 hover:text-white ${variant === "small" ? "p-1" : ""}`}
        onClick={toggleShareOptions}
      >
        <i className="ri-share-line mr-1"></i>
        {variant === "default" && "Share"}
      </Button>
      
      {isSharing && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#1A1A1A] shadow-lg ring-1 ring-gray-800">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              onClick={shareToTwitter}
            >
              <i className="ri-twitter-x-line mr-2"></i> Share on X/Twitter
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              onClick={shareToFacebook}
            >
              <i className="ri-facebook-circle-line mr-2"></i> Share on Facebook
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;