import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const signInWithDiscord = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'discord'
  });
  if (error) console.log('Error signing in:', error);
  return { user, session };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log('Error signing out:', error);
};

export default supabase;