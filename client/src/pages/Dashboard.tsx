import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import DnaCard from "@/components/dashboard/DnaCard";
import AchievementsList from "@/components/dashboard/AchievementsList";
import StatsOverview from "@/components/dashboard/StatsOverview";
import GamesList from "@/components/dashboard/GamesList";
import GamesAccordion from "@/components/dashboard/GamesAccordion";
import SteamLevelCard from "@/components/dashboard/SteamLevelCard";
import { usePlayerData } from "@/hooks/usePlayerData";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import HomeHero from "@/components/hero/HomeHero";
import DnaLoadingAnimation from "@/components/ui/DnaLoadingAnimation";

export default function Dashboard() {
  const { loadPlayerData, isLoading, playerStats, currentSteamId } = usePlayerData();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [firstUrlEntered, setFirstUrlEntered] = useState(false);

  // When the component first mounts, we DON'T want to load data automatically
  // We'll wait for user to enter a profile URL first

  // Monitor Steam ID changes - when user enters a profile URL
  useEffect(() => {
    if (currentSteamId && currentSteamId !== '76561198068135033') {
      setFirstUrlEntered(true);
    }
  }, [currentSteamId]);

  // Once we detect a user has entered a profile URL, start the analysis animation
  useEffect(() => {
    if (firstUrlEntered) {
      // Show analysis immediately after URL is entered, don't wait for data
      setShowAnalysis(true);
      
      // After a delay, complete the analysis (shorter time for better UX)
      setTimeout(() => {
        setAnalysisComplete(true);
      }, 3000);
    }
  }, [firstUrlEntered]);

  // After analysis is complete, show the dashboard with animation
  useEffect(() => {
    if (analysisComplete) {
      // Slightly longer delay to ensure data has loaded
      setTimeout(() => {
        setShowDashboard(true);
        setShowAnalysis(false); // Hide the analysis animation
      }, 1000);
    }
  }, [analysisComplete]);

  return (
    <Layout>
      {/* Hero Section - Always visible */}
      <HomeHero />
      
      {/* Add a scroll target element at a good position */}
      <div id="analysis-section" className="h-0 w-full"></div>
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        
        {/* Initial state: Only show an information message to enter a Steam URL */}
        {!firstUrlEntered && !isLoading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl font-gaming mb-4">Enter Your Steam Profile URL</h2>
              <p className="text-gray-400 mb-6">
                Enter your Steam profile URL in the form above to reveal your Player DNA Profile.
                We'll analyze your gaming habits and achievements to create a personalized gaming profile.
              </p>
              <div className="text-sm text-gray-500 p-4 bg-gray-800/50 rounded-lg">
                <p className="mb-2">You can also type "test" or "demo" to see a sample profile.</p>
                <p>Example Steam URL format: https://steamcommunity.com/id/yourprofile</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading state: Show a simple spinner */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
              <span className="text-lg font-gaming">Loading Player Data...</span>
            </div>
          </div>
        )}
        
        {/* Analysis state: Show DNA analysis animation after user enters profile URL */}
        {showAnalysis && !isLoading && !showDashboard && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <DnaLoadingAnimation 
              loadingText="Analyzing Player DNA Profile"
              onComplete={() => setAnalysisComplete(true)}
            />
          </div>
        )}
        
        {/* Dashboard state: Show dashboard content after analysis is complete */}
        {showDashboard && (
          <div className="animate-fadeInUp">
            <ProfileHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <DnaCard />
                <Separator className="my-8" />
                <AchievementsList />
              </div>
              <div className="space-y-8">
                <StatsOverview />
                <GamesList />
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Games Library with Achievement Details */}
            <GamesAccordion />
          </div>
        )}
      </div>
    </Layout>
  );
}
