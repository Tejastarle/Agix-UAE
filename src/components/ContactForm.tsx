'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { serviceOptions } from '@/lib/content';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('done');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'done') {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="text-red" size={40} />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy">Thanks — message received.</h3>
        <p className="mt-2 text-muted">We&apos;ll get back to you within one business day.</p>
        <button onClick={() => setStatus('idle')} className="btn-outline mt-6">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" placeholder="+971 …" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy outline-none focus:border-red/60"
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project…"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy outline-none focus:border-red/60"
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Submit <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor={name}>
        {label} {required && <span className="text-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-red/60"
      />
    </div>
  );
}
