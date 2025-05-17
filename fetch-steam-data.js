import { fetch } from 'undici';

async function fetchSteamData() {
  try {
    const response = await fetch('https://achievements-colosseumhackaton-backend.onrender.com/steam/datas?steamid=76561198068135033', {
      method: 'GET'
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchSteamData();