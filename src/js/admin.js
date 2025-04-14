import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch all users
    const { data: users, error: userError } = await supabase.from('users').select('*');
    if (userError) throw userError;

    document.getElementById("user-count").textContent = users.length;
    document.getElementById("admin-count").textContent = users.filter(user => user.is_admin).length;

    const recentUsersList = document.getElementById("recent-users");
    users.slice(-5).reverse().forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email})`;
      recentUsersList.appendChild(li);
    });

    // Fetch progress
    const { data: progress, error: progressError } = await supabase.from('progress').select('*');
    if (progressError) throw progressError;

    document.getElementById("progress-count").textContent = progress.length;

    const userScores = {};
    progress.forEach(entry => {
      if (!userScores[entry.user_id]) userScores[entry.user_id] = 0;
      userScores[entry.user_id] += entry.score;
    });

    const sortedScores = Object.entries(userScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const userMap = Object.fromEntries(users.map(user => [user.id, user.name]));
    const topScoresList = document.getElementById("top-scores");
    sortedScores.forEach(([userId, score]) => {
      const li = document.createElement("li");
      li.textContent = `${userMap[userId] || 'Unknown'} - ${score} pts`;
      topScoresList.appendChild(li);
    });

    // Fetch existing modules
    loadModules();

    // Add module
    const addForm = document.getElementById("add-module-form");
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("module-title").value;
      const description = document.getElementById("module-description").value;
      const link = document.getElementById("module-link").value;
      const icon = document.getElementById("module-icon").value;
      const difficulty = document.getElementById("module-difficulty").value;

      const { error } = await supabase.from('modules').insert([{ name, description, link, icon, difficulty }]);
      if (error) return alert("Error adding module.");
      addForm.reset();
      loadModules();
    });

    // Edit modal controls
    document.getElementById("cancel-edit").addEventListener("click", () => {
      document.getElementById("edit-modal").style.display = "none";
    });

    document.getElementById("edit-module-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("edit-id").value;
      const name = document.getElementById("edit-title").value;
      const description = document.getElementById("edit-description").value;
      const link = document.getElementById("edit-link").value;
      const icon = document.getElementById("edit-icon").value;
      const difficulty = document.getElementById("edit-difficulty").value;

      const { error } = await supabase
        .from('modules')
        .update({ name, description, link, icon, difficulty })
        .eq('id', id);

      if (error) return alert("Error updating module.");
      document.getElementById("edit-modal").style.display = "none";
      loadModules();
    });

  } catch (err) {
    console.error("Error loading admin dashboard:", err);
  }
});

async function loadModules() {
  const { data: modules, error } = await supabase.from('modules').select('*');
  if (error) return console.error("Failed to fetch modules:", error);

  const list = document.getElementById("module-list");
  list.innerHTML = "";

  modules.forEach(mod => {
    const card = document.createElement("div");
    card.className = "module-card";
    card.innerHTML = `
      <h3>${mod.icon || ''} ${mod.name}</h3>
      <p><strong>Description:</strong> ${mod.description}</p>
      <p><strong>Link:</strong> <a href="${mod.link}" target="_blank">${mod.link}</a></p>
      <p><strong>Difficulty:</strong> ${mod.difficulty || 'N/A'}</p>
      <div class="module-actions">
        <button class="edit" data-id="${mod.id}">Edit</button>
        <button class="delete" data-id="${mod.id}">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });

  // Edit buttons
  list.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const mod = modules.find(m => m.id == id);
      document.getElementById("edit-id").value = mod.id;
      document.getElementById("edit-title").value = mod.name;
      document.getElementById("edit-description").value = mod.description;
      document.getElementById("edit-link").value = mod.link;
      document.getElementById("edit-icon").value = mod.icon || '';
      document.getElementById("edit-difficulty").value = mod.difficulty || '';
      document.getElementById("edit-modal").style.display = "block";
    });
  });

  // Delete buttons
  list.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", async () => {
      if (!confirm("Delete this module?")) return;
      const id = button.dataset.id;
      const { error } = await supabase.from('modules').delete().eq('id', id);
      if (error) return alert("Error deleting module.");
      loadModules();
    });
  });
}
