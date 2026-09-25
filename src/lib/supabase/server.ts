import { createServerClient } from '@supabase/ssr';
import { createClient as createPlainClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { SUPABASE_URL, SUPABASE_KEY } from './env';

type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

// Session-aware server client — carries the signed-in admin's session, so
// Row Level Security decides what they may read and write.
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component; middleware refreshes the session.
        }
      },
    },
  });
}

// Cookie-free public client for published content. Keeps public pages
// static/ISR instead of forcing them to render per request.
export function createPublicClient() {
  return createPlainClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
}

// True when the signed-in user is on the admins allow-list (checked in SQL).
export async function getAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, isAdmin: false };
  const { data } = await supabase.rpc('is_admin');
  return { user, isAdmin: data === true };
}
