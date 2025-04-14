// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// const supabaseUrl = 'https://tzkhwednnrghumkyaptl.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2h3ZWRubnJnaHVta3lhcHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzUxODgsImV4cCI6MjA1OTE1MTE4OH0.trPgyDs5x5u7nw9yCUC8-v1UmwBcrmbOIrAvp1abewY'

// export const supabase = createClient(supabaseUrl, supabaseKey)

// export { supabase };

// src/js/supabase.js

// Initialize Supabase as a global variable
// window.supabase = supabase.createClient(
//     'https://tzkhwednnrghumkyaptl.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2h3ZWRubnJnaHVta3lhcHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzUxODgsImV4cCI6MjA1OTE1MTE4OH0.trPgyDs5x5u7nw9yCUC8-v1UmwBcrmbOIrAvp1abewY'
//   );

// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://tzkhwednnrghumkyaptl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2h3ZWRubnJnaHVta3lhcHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzUxODgsImV4cCI6MjA1OTE1MTE4OH0.trPgyDs5x5u7nw9yCUC8-v1UmwBcrmbOIrAvp1abewY"
);
