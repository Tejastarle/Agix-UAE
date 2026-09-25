// Supabase connection settings. Accepts either the legacy anon key or the
// newer publishable key, so both styles of Supabase project work.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const supabaseConfigured = () => !!SUPABASE_URL && !!SUPABASE_KEY;
