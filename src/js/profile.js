// // import { supabase } from './supabase.js';

// // document.addEventListener("DOMContentLoaded", async () => {
// //   const user = await getCurrentUser();
// //   if (!user) return;

// //   document.getElementById("username").innerText = user.user_metadata?.name || "User";

// //   const { data, error } = await supabase
// //     .from("progress")
// //     .select("*")
// //     .eq("user_id", user.id);

// //   if (error) {
// //     console.error("Progress fetch error:", error);
// //     return;
// //   }

// //   renderProgress(data);
// //   renderBadges(data);
// // });

// // async function getCurrentUser() {
// //   const { data: { user } } = await supabase.auth.getUser();
// //   return user;
// // }

// // function renderProgress(data) {
// //   const container = document.getElementById("progress-list");
// //   const games = {
// //     phishing: "🎣 Phishing Frenzy",
// //     password: "🔐 Password Challenge",
// //     scam: "🕵️ Spot the Scam",
// //     masquerading: "🎭 Masquerading"
// //   };

// //   Object.keys(games).forEach(game => {
// //     const score = data.find(d => d.module === game)?.score || 0;
// //     container.innerHTML += `
// //       <div class="progress-card">
// //         <strong>${games[game]}</strong>
// //         <span>${score}/4</span>
// //       </div>
// //     `;
// //   });
// // }

// // function renderBadges(data) {
// //   const container = document.getElementById("badge-list");
// //   const badges = data
// //     .filter(d => d.score >= 3)
// //     .map(d => {
// //       const badgeTitle = `${d.module.charAt(0).toUpperCase() + d.module.slice(1)} Pro`;
// //       return `
// //         <div class="badge">
// //           <img src="./images/badge-${d.module}.png" alt="${badgeTitle}" />
// //           <div>${badgeTitle}</div>
// //         </div>
// //       `;
// //     });

// //   container.innerHTML = badges.join("") || "<p>No badges yet. Complete challenges to earn them!</p>";
// // }



// import { supabase } from './supabase.js';

// document.addEventListener('DOMContentLoaded', async () => {
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     window.location.href = 'signup.html';
//     return;
//   }

//   document.getElementById('username').textContent = user.user_metadata?.name || 'User';

//   // Fetch progress from Supabase
//   const { data, error } = await supabase
//     .from('progress')
//     .select('*')
//     .eq('user_id', user.id);

//   if (error) {
//     console.error('Error loading progress:', error);
//     return;
//   }

//   const progressList = document.getElementById('progress-list');
//   const badgeList = document.getElementById('badge-list');

//   const badgeIcons = {
//     phishing: 'images/badges/phishing.png',
//     password: 'images/badges/password.png',
//     scam: 'images/badges/scam.png',
//     masquerading: 'images/badges/masquerading.png',
//   };

//   const moduleNames = {
//     phishing: 'Phishing Frenzy',
//     password: 'Password Challenge',
//     scam: 'Spot the Scam',
//     masquerading: 'Masquerading Mayhem',
//   };

//   data.forEach(entry => {
//     const module = entry.module;
//     const score = entry.score;

//     // Add progress card
//     const card = document.createElement('div');
//     card.className = 'progress-card';
//     card.innerHTML = `<strong>${moduleNames[module]}</strong> <span>${score}%</span>`;
//     progressList.appendChild(card);

//     // Unlock badge if score >= 75
//     if (score >= 75 && badgeIcons[module]) {
//       const badge = document.createElement('div');
//       badge.className = 'badge';
//       badge.innerHTML = `
//         <img src="/public/images/badges/${module}.png" alt="${module} badge">
//         <p>${moduleNames[module]}</p>
//       `;
//       badgeList.appendChild(badge);
//     }
//   });
// });



import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'signup.html';
    return;
  }

  document.getElementById('username').textContent = user.user_metadata?.name || 'User';

  // Fetch progress from Supabase
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error loading progress:', error);
    return;
  }

  const progressList = document.getElementById('progress-list');
  const badgeList = document.getElementById('badge-list');

  const badgeIcons = {
    phishing: 'images/badges/phishing.png',
    password: 'images/badges/password.png',
    scam: 'images/badges/scam.png',
    masquerading: 'images/badges/masquerading.png',
  };

  const moduleNames = {
    phishing: 'Phishing Frenzy',
    password: 'Password Challenge',
    scam: 'Spot the Scam',
    masquerading: 'Masquerading Mayhem',
  };

  data.forEach(entry => {
    const module = entry.module;
    const score = entry.score;

    // Add progress card
    const card = document.createElement('div');
    card.className = 'progress-card';
    card.innerHTML = `<strong>${moduleNames[module]}</strong> <span>${score}</span>`;
    progressList.appendChild(card);

    // Unlock badge if score >= 75
    if (score >= 75 && badgeIcons[module]) {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.innerHTML = `
        <img src="/public/images/badges/${module}.png" alt="${module} badge">
        <p>${moduleNames[module]}</p>
      `;
      badgeList.appendChild(badge);
    }
  });

  // Fetch leaderboard data from the view
  const { data: leaderboard, error: leaderboardError } = await supabase
    .from('leaderboard_view')
    .select('*')
    .order('score', { ascending: false });

  if (leaderboardError) {
    console.error('Error loading leaderboard:', leaderboardError);
    return;
  }

  const leaderboardBody = document.querySelector('#leaderboard tbody');
  leaderboard.forEach((entry, index) => {
    const prettyModule = moduleNames[entry.module] || entry.module;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.username || 'Unknown'}</td>
      <td>${prettyModule}</td>
      <td>${entry.score}</td>
    `;
    leaderboardBody.appendChild(row);
  });
});
