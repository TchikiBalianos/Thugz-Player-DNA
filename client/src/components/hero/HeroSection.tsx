import React from "react";

/**
 * Hero section component with a steam background image
 */
const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div 
        className="h-[300px] sm:h-[400px] bg-cover bg-center relative" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[#171a21] bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Track your <span className="text-[#66c0f4]">Steam</span> stats in real-time
            </h1>
            <p className="text-lg sm:text-xl text-[#c7d5e0] mb-8 max-w-2xl mx-auto drop-shadow-md">
              Analyze your game library, track your playtime and achievements with our advanced Steam tracking tool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;