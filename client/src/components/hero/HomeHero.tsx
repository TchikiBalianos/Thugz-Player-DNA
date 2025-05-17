import React, { useState } from "react";
import HeroSection from "./HeroSection";
import ProfileInput from "./ProfileInput";
import { usePlayerData } from "@/hooks/usePlayerData";
import { useToast } from "@/hooks/use-toast";

/**
 * Combined Hero section with Profile Input form
 */
const HomeHero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loadPlayerData } = usePlayerData();
  const { toast } = useToast();
  
  const handleSteamIdSubmit = async (steamId: string) => {
    setIsLoading(true);
    try {
      // Pass the extracted Steam ID to the loadPlayerData function
      // This will update all the data for this specific Steam ID
      console.log(`Loading player data for Steam ID: ${steamId}`);
      await loadPlayerData(steamId);
      console.log("Successfully loaded player data");
    } catch (error) {
      console.error("Error loading player data:", error);
      // Display error message using toast
      toast({
        title: "Error",
        description: "Failed to load player data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <HeroSection />
      <ProfileInput onSubmit={handleSteamIdSubmit} isLoading={isLoading} />
    </div>
  );
};

export default HomeHero;