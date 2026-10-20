import { createClient } from '@supabase/supabase-js';

// Project credentials with fail-safe hardcoded values for client production bundles
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://qbwipveuclqzjnfjdxir.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFid2lwdmV1Y2xxempuZmpkeGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDAwMDB9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);