// Map of PCSR codes to their full descriptions
const pcsrLabels: {[key: string]: {[key: string]: string}} = {
  "Progression Style": {
    "C": "Completionist",
    "F": "Freeflow"
  },
  "Challenge Nature": {
    "S": "Story Seeker",
    "M": "Mechanical Mastermind",
    "E": "Explorer"
  },
  "Social Orientation": {
    "T": "Team Player",
    "C": "Competitor",
    "L": "Lone Wolf"
  },
  "Rhythm / Engagement": {
    "H": "High Intensity",
    "B": "Balanced",
    "D": "Drifter"
  }
};

// Function to get the label for a PCSR axis based on its code
export const getPcsrAxisLabel = (axisName: string, code: string): string => {
  if (pcsrLabels[axisName] && pcsrLabels[axisName][code]) {
    return pcsrLabels[axisName][code];
  }
  
  // Fallback if the axis or code is not found
  return code;
};

// Function to get a short description for a PCSR profile type
export const getPcsrProfileDescription = (type: string): string => {
  const descriptions: {[key: string]: string} = {
    "CSTH": "Dedicated completionist who focuses on story-driven games, enjoys team-based experiences, with high intensity gaming sessions.",
    "CSLH": "Completionist story-lover who prefers solo play at a steady pace.",
    "CMTB": "Mechanically-skilled completionist who values teamwork with a balanced approach to gaming.",
    "FMCB": "Versatile player who hops between games, enjoys mechanical challenges and competitive modes.",
    "FELH": "Explorer who tries many games without fully completing them, enjoys solo play and intense gaming sessions."
  };
  
  return descriptions[type] || "A unique gamer with their own distinctive play style.";
};

// Function to calculate the completeness of a PCSR profile (how many axes are defined)
export const calculateProfileCompleteness = (profile: any): number => {
  if (!profile || !profile.axes) return 0;
  
  const definedAxes = Object.values(profile.axes).filter(axis => 
    axis && typeof (axis as any).score === 'number' && (axis as any).score > 0
  );
  
  return (definedAxes.length / 4) * 100;
};
