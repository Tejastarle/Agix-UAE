'use client';

import { Trash2 } from 'lucide-react';

export default function DeleteButton({ action, id }: { action: (fd: FormData) => void; id: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm('Delete this item permanently?')) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-red/50 hover:text-red"
        aria-label="Delete"
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
