import axios from 'axios';

export interface SteamAvatarInfo {
  small: string;  // 32x32px
  medium: string; // 64x64px
  large: string;  // 184x184px
  profileName: string;
  profileUrl: string;
}

/**
 * Fetches a user's Steam avatar and profile information from the Steam API
 * @param steamId The Steam ID of the user
 * @returns The avatar information including URLs and profile details
 */
export const fetchSteamAvatar = async (steamId: string): Promise<SteamAvatarInfo> => {
  try {
    const response = await axios.get(`/api/steam-avatar?steamId=${steamId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Steam avatar:", error);
    throw new Error("Failed to fetch Steam avatar");
  }
};