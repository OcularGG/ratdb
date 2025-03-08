import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Environment variable validation
const envSchema = z.object({
  REACT_APP_SUPABASE_URL: z.string().url(),
  REACT_APP_SUPABASE_KEY: z.string().min(1),
});

// Validate environment variables
const env = envSchema.parse({
  REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY: process.env.REACT_APP_SUPABASE_KEY,
});

// Create Supabase client
export const supabase = createClient(
  env.REACT_APP_SUPABASE_URL,
  env.REACT_APP_SUPABASE_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

// Search players across all servers
export async function searchPlayers(searchTerm: string) {
  const { data, error } = await supabase
    .rpc('search_all_servers', { search_term: searchTerm });
  
  if (error) throw error;
  return data;
}