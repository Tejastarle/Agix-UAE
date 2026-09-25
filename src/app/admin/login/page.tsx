'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2, Lock, Mail, KeyRound, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { supabaseConfigured } from '@/lib/supabase/env';

function AuthCard() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(params.get('error') === 'not-admin' ? 'That account is not on the admin list.' : '');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const configured = supabaseConfigured();
  const [recovery, setRecovery] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Opening the reset-password email link lands here; Supabase signals it
  // with a PASSWORD_RECOVERY event, and we show the "set new password" form.
  useEffect(() => {
    if (!configured) return;
    const { data } = createClient().auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, [configured]);

  async function saveNewPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    setBusy(true);
    setError('');
    const { error } = await createClient().auth.updateUser({ password: newPassword });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    const { error } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Email or password is incorrect.' : error.message);
      setBusy(false);
      return;
    }
    router.replace(params.get('redirect') || '/admin');
    router.refresh();
  }

  async function resetPassword() {
    setError('');
    setNotice('');
    if (!email.trim()) {
      setError('Enter your email first, then choose “Forgot password”.');
      return;
    }
    const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (error) setError(error.message);
    else setNotice('Password reset email sent. Check your inbox.');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-sm"
    >
      <div className="mb-8 flex items-center gap-2.5">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-card">
          <Image src="/images/logos/agix-logo.png" alt="AGIX" width={32} height={32} className="object-contain" />
        </span>
        <div>
          <span className="block font-display text-lg font-extrabold leading-tight text-white">AGIX Admin</span>
          <span className="text-xs text-white/60">Content & leads console</span>
        </div>
      </div>

      {recovery ? (
        <form onSubmit={saveNewPassword} className="rounded-2xl bg-white p-7 shadow-card">
          <div className="flex items-center gap-2 text-muted">
            <KeyRound size={16} />
            <span className="text-sm font-medium">Set a new password</span>
          </div>
          <label className="mt-5 block text-sm font-medium text-navy" htmlFor="new-password">New password</label>
          <input id="new-password" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password" placeholder="At least 8 characters"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-red/60" />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary mt-5 w-full">
            {busy ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : 'Save password & continue'}
          </button>
        </form>
      ) : (
      <form onSubmit={signIn} className="rounded-2xl bg-white p-7 shadow-card">
        <div className="flex items-center gap-2 text-muted">
          <Lock size={16} />
          <span className="text-sm font-medium">Sign in with your Supabase account</span>
        </div>

        {!configured && (
          <p className="mt-4 rounded-lg bg-red/5 p-3 text-xs text-navy">
            Supabase keys are missing. Add them to <code>.env.local</code> and restart.
          </p>
        )}

        <label className="mt-5 block text-sm font-medium text-navy" htmlFor="email">Email</label>
        <div className="relative mt-1.5">
          <Mail size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" placeholder="you@agix.ae"
            className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-red/60" />
        </div>

        <label className="mt-4 block text-sm font-medium text-navy" htmlFor="password">Password</label>
        <div className="relative mt-1.5">
          <KeyRound size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" placeholder="••••••••"
            className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-red/60" />
        </div>

        <div className="mt-2 text-right">
          <button type="button" onClick={resetPassword} className="text-xs font-medium text-red hover:underline">
            Forgot password?
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {notice && <p className="mt-3 text-sm text-navy">{notice}</p>}

        <button type="submit" disabled={busy || !configured} className="btn-primary mt-5 w-full">
          {busy ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : 'Sign in'}
        </button>
      </form>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
        <ShieldCheck size={13} /> Secured by Supabase Auth · authorised staff only
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-navy px-5">
      <div className="absolute inset-0 bg-grad-navy" />
      <div className="absolute inset-0 bg-grid-light bg-[size:48px_48px] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 animate-floaty rounded-full bg-red/25 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 animate-floaty rounded-full bg-indigo-500/20 blur-[100px]" />
      <Suspense fallback={<div className="relative text-white/70">Loading…</div>}>
        <AuthCard />
      </Suspense>
    </main>
  );
}
