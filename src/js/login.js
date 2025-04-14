// import { supabase } from './supabase.js';

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("login-form");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });

//       if (error) throw error;

//       alert("✅ Login successful!");
//       console.log("User:", data.user);

//       // Optional: Redirect to a dashboard or homepage
//       window.location.href = "home.html";
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Login failed: " + err.message);
//     }
//   });
// });




import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check the role and redirect based on the role
      const userRole = data.user?.user_metadata?.role;  // Get the role from user metadata

      if (userRole === "admin") {
        // If the user is an admin, redirect to the admin dashboard
        window.location.href = "/src/admin/index.html";
      } else {
        // Otherwise, redirect to the profile page
        window.location.href = "/src/profile.html";
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Login error: " + err.message);
    }
  });
});
