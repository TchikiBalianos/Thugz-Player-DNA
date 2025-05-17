import React from "react";

export type Rarity = "common" | "rare" | "epic" | "legendary";

interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

const RarityBadge: React.FC<RarityBadgeProps> = ({ rarity, className = "" }) => {
  return (
    <span
      className={`badge-${rarity} text-xs font-bold px-2 py-1 rounded-full text-white ${className}`}
    >
      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
    </span>
  );
};

export default RarityBadge;
