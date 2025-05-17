import React, { useEffect, useState } from "react";

interface DnaLoadingAnimationProps {
  onComplete?: () => void;
  loadingText?: string;
  showProgressBar?: boolean;
}

const DnaLoadingAnimation: React.FC<DnaLoadingAnimationProps> = ({
  onComplete,
  loadingText = "Analyzing Player DNA...",
  showProgressBar = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  
  const steps = [
    "Extracting achievement data...", 
    "Analyzing gameplay patterns...", 
    "Calculating progression metrics...", 
    "Identifying player strengths...",
    "Generating DNA profile..."
  ];
  
  useEffect(() => {
    let timer: any;
    let stepIdx = 0;
    
    // Simulate progress increments
    timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (1 + Math.random() * 3);
        
        // Add new step message at certain progress points
        if (newProgress > stepIdx * 20 && stepIdx < steps.length) {
          setAnalysisSteps(prev => [...prev, steps[stepIdx]]);
          stepIdx++;
        }
        
        // Complete the animation
        if (newProgress >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(() => {
              onComplete();
            }, 500);
          }
          return 100;
        }
        
        return newProgress;
      });
    }, 180);
    
    return () => clearInterval(timer);
  }, [onComplete]);
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* DNA Animation */}
      <div className="relative h-32 w-20 mb-8">
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
          <div className="relative w-8 h-32">
            {/* DNA helix strands */}
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div 
                  className={`absolute h-1.5 w-12 bg-primary-500 rounded-full`}
                  style={{ 
                    top: `${i * 4}px`, 
                    transform: `rotate(${i % 2 ? 45 : -45}deg)`,
                    opacity: 0.7,
                    animation: `pulse 1.5s infinite ${i * 0.1}s`
                  }}
                />
                <div 
                  className={`absolute h-1.5 w-12 bg-secondary-500 rounded-full`}
                  style={{ 
                    top: `${i * 4 + 16}px`, 
                    transform: `rotate(${i % 2 ? -45 : 45}deg)`,
                    opacity: 0.7,
                    animation: `pulse 1.5s infinite ${i * 0.1 + 0.75}s`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-gaming text-center mb-2">{loadingText}</h2>
      
      {/* Progress bar */}
      {showProgressBar && (
        <div className="w-full max-w-md bg-gray-800 rounded-full h-2 mb-4">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {/* Analysis steps */}
      <div className="text-sm text-gray-400 mt-2 h-20 overflow-hidden">
        <div className="flex flex-col-reverse">
          {analysisSteps.map((step, i) => (
            <div 
              key={i} 
              className="animate-fadeIn my-1 flex items-center"
            >
              <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2" />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DnaLoadingAnimation;