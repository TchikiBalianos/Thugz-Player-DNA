// Function to format hours for display
export const formatHours = (hours: number): string => {
  if (isNaN(hours)) return '0h';
  
  if (hours < 0.1) {
    const minutes = Math.round(hours * 60);
    return `${minutes}m`;
  }
  
  if (hours < 1) {
    return `${hours.toFixed(1)}h`;
  }
  
  if (hours >= 1000) {
    return `${(hours / 1000).toFixed(1)}k hours`;
  }
  
  return `${Math.round(hours)}h`;
};

// Function to format percentage
export const formatPercentage = (percentage: number): string => {
  if (isNaN(percentage)) return '0%';
  
  // Always return whole numbers
  return Math.floor(percentage) + '%';
};

// Function to format a date into a "time ago" string
export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  
  return Math.floor(seconds) + ' seconds ago';
};

// Function to truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substr(0, maxLength - 3) + '...';
};
