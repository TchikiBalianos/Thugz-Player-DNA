from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)

# Load mock data files for use when API is not available
def load_mock_data(filename):
    path = os.path.join('attached_assets', filename)
    try:
        with open(path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading mock data {filename}: {e}")
        return {}

# Steam API constants
STEAM_API_KEY = os.environ.get('STEAM_API_KEY', '')

@app.route('/api/player-stats', methods=['GET'])
def get_player_stats():
    """Get player statistics for a specific Steam ID"""
    # Parse Steam ID from query parameters
    steam_id = request.args.get('steamId', '')
    
    if not steam_id:
        return jsonify({"error": "Steam ID is required"}), 400
    
    try:
        # Try to fetch real data from Steam API if API key is available
        if STEAM_API_KEY:
            # Steam API URL for player stats
            url = f"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={STEAM_API_KEY}&steamids={steam_id}"
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Process and return the data
            return jsonify(data)
        else:
            # Fall back to mock data if API key is not available
            mock_data = load_mock_data('steam_player_stats_76561198068135033.json')
            return jsonify(mock_data)
    
    except requests.exceptions.RequestException as e:
        print(f"API request error: {e}")
        # Fall back to mock data on error
        mock_data = load_mock_data('steam_player_stats_76561198068135033.json')
        return jsonify(mock_data)

@app.route('/api/achievements', methods=['GET'])
def get_achievements():
    """Get player achievements for a specific Steam ID"""
    # Parse Steam ID from query parameters
    steam_id = request.args.get('steamId', '')
    
    if not steam_id:
        return jsonify({"error": "Steam ID is required"}), 400
    
    try:
        # Try to fetch real data from Steam API if API key is available
        if STEAM_API_KEY:
            # In a real app, we would fetch achievements from the Steam API
            # This would involve multiple API calls to get achievements for each game
            # For simplicity, we'll use mock data for now
            pass
        
        # Return mock data
        mock_data = load_mock_data('steam_achievements_76561198068135033.json')
        return jsonify(mock_data)
    
    except requests.exceptions.RequestException as e:
        print(f"API request error: {e}")
        # Fall back to mock data on error
        mock_data = load_mock_data('steam_achievements_76561198068135033.json')
        return jsonify(mock_data)

@app.route('/api/pcsr-profile', methods=['GET'])
def get_pcsr_profile():
    """Get PCSR profile for a specific Steam ID"""
    # Parse Steam ID from query parameters
    steam_id = request.args.get('steamId', '')
    
    if not steam_id:
        return jsonify({"error": "Steam ID is required"}), 400
    
    # PCSR profiles would be generated based on player's gaming behavior
    # For now, we'll use mock data
    mock_data = load_mock_data('steam_pcsr_profile.json')
    return jsonify(mock_data)

if __name__ == '__main__':
    # Make sure Flask is accessible outside the container
    app.run(host='0.0.0.0', port=5001, debug=True)