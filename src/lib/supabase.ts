import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pusvrbibluxbvriqpqnb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1c3ZyYmlibHV4YnZyaXFwcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTcyODcsImV4cCI6MjEwMTA5MzI4N30.ZY9Dl5hhDwqAMyp-f77gSL9jkc_02ZvolUCwlsFRMdU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceRoleKey);
}
