import React from "react";
import { usePlayerData } from "@/hooks/usePlayerData";
import PcsrAxis from "@/components/ui/PcsrAxis";
import { getPcsrAxisLabel } from "@/utils/pcsrUtils";
import { Card, CardContent } from "@/components/ui/card";

const DnaCard: React.FC = () => {
  const { pcsrProfile } = usePlayerData();

  if (!pcsrProfile) {
    return (
      <Card className="dna-card rounded-xl overflow-hidden relative animate-pulse">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary-700"></div>
        <CardContent className="p-6">
          <div className="h-8 w-60 bg-[#1E1E1E] rounded mb-6"></div>
          <div className="space-y-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 w-full bg-[#1E1E1E] rounded mb-2"></div>
                <div className="h-2 w-full bg-[#1E1E1E] rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const axes = pcsrProfile.axes;

  return (
    <div className="dna-card rounded-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 dna-strand"></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-gaming font-bold">Player DNA Profile</h2>
          <div className="px-3 py-1 rounded-lg bg-primary-900 text-primary-300 text-sm font-bold">
            <span>{pcsrProfile.type}</span>
          </div>
        </div>

        {/* PCSR Axes */}
        <div className="space-y-6 mb-6">
          {Object.entries(axes).map(([axis, data]) => (
            <PcsrAxis 
              key={axis}
              name={axis}
              code={data.code}
              score={data.score}
              reason={data.reason}
              label={getPcsrAxisLabel(axis, data.code)}
            />
          ))}
        </div>

        <div className="bg-[#1E1E1E] p-4 rounded-lg">
          <p className="text-sm">
            <span className="font-bold text-primary-300">DNA Analysis:</span> 
            Your profile showcases a dedicated completionist who thrives in narrative-driven games. 
            You prefer team-based experiences and maintain consistently high engagement across your gaming library.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DnaCard;
