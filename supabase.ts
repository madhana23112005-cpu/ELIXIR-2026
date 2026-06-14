
/**
 * ELIXIR'26 SUPABASE CONFIGURATION
 * 
 * PROJECT: Elixir'26
 * STATUS: Strictly Cloud Connected
 */

import { createClient } from '@supabase/supabase-js';

// --- LIVE CREDENTIALS ---
// These must be replaced with your actual Supabase Project URL and Anon Key in your environment
const supabaseUrl: string = 'https://rdtpuhtktfkvyjpphonr.supabase.co';
const supabaseAnonKey: string = 'sb_publishable_Io5Ec-dVP5WJwyFxAWwYIQ_NZj991RR'; 
// ------------------------

/**
 * Direct Supabase Client Initialization
 * Note: If the keys above are placeholders (starting with 'sb_'), 
 * API calls will return errors until real keys are provided.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * UTILITY: Forced clearing of session data
 */
export const logoutAdmin = () => {
  sessionStorage.removeItem('elixir_admin_auth');
  sessionStorage.clear(); // Clear everything just in case
  window.location.href = '#/login';
  window.location.reload();
};
