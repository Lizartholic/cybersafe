import { supabase } from '../../js/supabase.js';

const challenges = [
  {
    question: "Is this email safe to click?",
    image: '/public/images/phishing1.png',
    options: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "Does this URL look suspicious?",
    image: "/public/images/phishing2.png",
    options: ["Yes", "No"],
    correct: "Yes"
  },
  {
    question: "Is this attachment likely safe?",
    image: "/public/images/phishing3.png",
    options: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "Should you trust this login email?",
    image: "/public/images/phishing4.jpg",
    options: ["Yes", "No"],
    correct: "No"
  }
];

let currentScore = 0;
let currentChallenge = 0;

function loadChallenge() {
  const gameArea = document.getElementById("game-area");
  const c = challenges[currentChallenge];

  gameArea.innerHTML = `
    <div class="challenge-card">
      <h2>Question ${currentChallenge + 1}</h2>
      <p>${c.question}</p>
      <img src="${c.image}" alt="Challenge Image" class="challenge-image"/>
      <div class="options">
        ${c.options.map(opt => `
          <button class="option-btn" data-answer="${opt}">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.answer === c.correct) {
        currentScore++;
        btn.style.backgroundColor = "#4ade80"; // green
      } else {
        btn.style.backgroundColor = "#ef4444"; // red
      }

      setTimeout(() => {
        currentChallenge++;
        if (currentChallenge < challenges.length) {
          loadChallenge();
        } else {
          document.getElementById("game-area").innerHTML = `
            <div class="summary-card">
              <h2>✅ You're done!</h2>
              <p>Your score: ${currentScore}/${challenges.length}</p>
            </div>
          `;
        }
      }, 800);
    });
  });
}

loadChallenge();

document.getElementById("submit-btn").addEventListener("click", async () => {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("Login required to save your score.");
    return;
  }

  const { error } = await supabase
    .from("progress")
    .upsert(
      [
        {
          user_id: user.id,
          module: "phishing",
          score: currentScore
        }
      ],
      { onConflict: ['user_id', 'module'] }
    );

  if (error) {
    alert("Error saving score.");
    console.error(error);
  } else {
    alert("🎉 Score saved!");
    window.location.href = '../../profile.html';
  }
});
