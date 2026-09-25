import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_URL, SUPABASE_KEY, supabaseConfigured } from './env';

type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

// Refreshes the Supabase session cookie and guards /admin.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const isLogin = path === '/admin/login';

  if (!supabaseConfigured()) {
    if (isLogin) return response;
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('redirect', path);
    return NextResponse.redirect(url);
  }
  if (user && isLogin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return response;
}
