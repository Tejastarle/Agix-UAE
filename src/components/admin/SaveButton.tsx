'use client';

import { useFormStatus } from 'react-dom';
import { Loader2, Save } from 'lucide-react';

export default function SaveButton({ label = 'Save' }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Saving…
        </>
      ) : (
        <>
          <Save size={16} /> {label}
        </>
      )}
    </button>
  );
}
