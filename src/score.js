import { supabase } from './supabase.js'; // Make sure you import supabase client

// Function to update leaderboard with user's score
async function updateLeaderboard(userId, score, gameId) {
  const { data, error } = await supabase
    .from('leaderboard')
    .upsert([{
      user_id: userId,  // Dynamically pass the user ID
      score: score,     // Dynamically pass the score
      game_id: gameId   // Dynamically pass the game ID
    }], { onConflict: ['user_id', 'game_id'] }); // Ensure user & game are unique

  if (error) {
    console.error('Error updating leaderboard:', error);
  } else {
    console.log('Leaderboard updated successfully:', data);
  }
}

// Sample call to the updateLeaderboard function
// You should call this when the player finishes a game and you have their score
const userId = '<user_id>';  // Replace with the actual user ID (UUID)
const score = 200;           // Replace with the actual score
const gameId = 'phishing';   // Example game ID, change accordingly for each game

updateLeaderboard(userId, score, gameId);
