import { supabase } from '../js/supabase.js';

async function updateLeaderboard(score, gameId) {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    console.error("User not logged in");
    return;
  }

  const userId = session.user.id;

  const { error } = await supabase
    .from('leaderboard')
    .upsert([
      {
        user_id: userId,
        score: score,
        game_id: gameId
      }
    ], { onConflict: ['user_id', 'game_id'] });

  if (error) {
    console.error("Error inserting leaderboard entry:", error);
  } else {
    console.log("Leaderboard updated");
  }
}
