import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Check if the user is logged in
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    alert("You are not logged in.");
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;

  // Get additional user info from your `public.users` table
  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("name, email, is_admin")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    alert("Unable to load user profile.");
    return;
  }

  // Fill in the user profile
  document.getElementById("user-name").textContent = userProfile.name;
  document.getElementById("user-email").textContent = userProfile.email;
  document.getElementById("user-admin").textContent = userProfile.is_admin ? "✅ Yes" : "❌ No";

  // Optional: redirect if admin
  if (userProfile.is_admin) {
    console.log("User is admin — redirect if needed");
  }

  // Log out button
  document.getElementById("logout-btn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    alert("Logged out!");
    window.location.href = "login.html";
  });

  // Fetch and display game modules
  try {
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('*');

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      alert('Unable to load modules.');
      return;
    }

    // Get the module container element
    const moduleGrid = document.getElementById("module-grid");

    // Loop through each module and create a card
    modules.forEach(module => {
      const card = document.createElement("a");
      card.href = module.link;  // Path to the module
      card.classList.add("card");

      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-puzzle-piece");  // Default icon; can customize with module data

      const title = document.createElement("h2");
      title.textContent = module.name;

      const description = document.createElement("p");
      description.textContent = module.description;

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(description);
      moduleGrid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading modules:", err);
  }
});
