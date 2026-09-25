import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_KEY } from './env';

// Browser client — used by the admin login form.
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
