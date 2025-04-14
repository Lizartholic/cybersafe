import { supabase } from '../../js/supabase.js';

const challenges = [
  {
    question: "This message claims to be from your bank but has a strange email address. Is it legit?",
    image: "/public/images/masc1.jpg",
    options: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "You got an email from 'support@amaz0n.com'. Safe to click?",
    image: "/public/images/masc2.jpg",
    options: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "is this person an imposter?",
    image: "/public/images/masc3.jpg",
    options: ["Yes", "No"],
    correct: "No"
  },
  {
    question: "they are asking for your ban details urgently over email. Should you trust it?",
    image: "/public/images/masc4.jpg",
    options: ["Yes", "No"],
    correct: "No"
  }
];

let currentChallenge = 0;
let currentScore = 0;

function loadChallenge() {
  const gameArea = document.getElementById("game-area");
  const c = challenges[currentChallenge];

  gameArea.innerHTML = `
    <div class="challenge-card">
      <h2>Question ${currentChallenge + 1}</h2>
      <p>${c.question}</p>
      <img src="${c.image}" alt="Challenge Image" class="challenge-image"/>
      <div class="options">
        ${c.options.map(option => `
          <button class="option-btn" data-answer="${option}">${option}</button>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll(".option-btn").forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.answer;
      if (selected === c.correct) {
        button.style.backgroundColor = "#4ade80"; // green
        currentScore++;
      } else {
        button.style.backgroundColor = "#ef4444"; // red
      }

      setTimeout(() => {
        currentChallenge++;
        if (currentChallenge < challenges.length) {
          loadChallenge();
        } else {
          gameArea.innerHTML = `
            <div class="summary-card">
              <h2>✅ You're done!</h2>
              <p>Your score: ${currentScore}/${challenges.length}</p>
            </div>
          `;
        }
      }, 700);
    });
  });
}

loadChallenge();

document.getElementById("submit-btn").addEventListener("click", async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("⚠️ You must be logged in to save your score.");
    return;
  }

  const { error } = await supabase
    .from("progress")
    .upsert([
      {
        user_id: user.id,
        module: "masquerading",
        score: currentScore
      }
    ], { onConflict: ['user_id', 'module'] });

  if (error) {
    console.error(error);
    alert("❌ Error saving score.");
  } else {
    alert("🎉 Score saved successfully!");
    window.location.href = "../../profile.html";
  }
});
