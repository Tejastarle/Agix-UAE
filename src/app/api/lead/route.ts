import { NextResponse } from 'next/server';
import { createPublicClient as publicClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a name and a valid email.' }, { status: 400 });
    }

    if (!supabaseConfigured()) {
      // Not configured yet — accept gracefully so the form works in dev.
      return NextResponse.json({ ok: true, stored: false });
    }

    const { error } = await publicClient().from('leads').insert({
      name,
      email,
      phone: String(body.phone || '').trim() || null,
      service: String(body.service || '').trim() || null,
      message: String(body.message || '').trim() || null,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
