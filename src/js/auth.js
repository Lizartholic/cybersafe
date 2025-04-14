// // Supabase client
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

// // Login
// async function login(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: email,
//     password: password
//   });
//   if (data.user) redirectToProfile();
// }

// // Signup
// async function signup(email, password, name, gender) {
//   const { data, error } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//     options: {
//       data: { name: name, gender: gender }
//     }
//   });
// }


// 


// 



// 



// document.addEventListener('DOMContentLoaded', () => {
//   const signupForm = document.getElementById('signup-form');
  
//   if (signupForm) {
//     signupForm.addEventListener('submit', async (e) => {
//       e.preventDefault();
      
//       const email = document.getElementById('signup-email').value;
//       const password = document.getElementById('signup-password').value;
//       const errorElement = document.getElementById('signup-error');

//       try {
//         errorElement.textContent = ''; // Clear previous errors
        
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: 'http://127.0.0.1:5500/src/profile.html'
//           }
//         });

//         if (error) throw error;
        
//         alert('Signup successful! Check your email for verification.');
//         window.location.href = '/src/profile.html';
        
//       } catch (error) {
//         console.error('Signup error:', error);
//         errorElement.textContent = error.message.includes('Email signups are disabled')
//           ? 'Server misconfigured: Email signups disabled (check Supabase dashboard)'
//           : error.message;
//       }
//     });
//   }
// });


import { supabase } from './supabase.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value; // Get the selected role (either "admin" or "user")

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            gender,
            email,
            role, // Store the role (either "admin" or "user")
          }
        }
      });

      if (error) throw error;

      alert("✅ Sign up successful!");
      window.location.href = "login.html";  // Redirect to login after sign-up
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup error: " + err.message);
    }
  });
});
