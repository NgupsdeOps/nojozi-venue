import { createClient } from '@supabase/supabase-js';

// Hardcode the primary URL and Key to ensure Vercel production bundles render reliably
const supabaseUrl = 'https://qbwipveuclqzjnfjdxir.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFid2lwdmV1Y2xxempuZmpkeGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDAwMDB9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);