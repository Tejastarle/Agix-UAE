'use client';

export function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = 'text',
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-red/60"
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
  hint,
  mono,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-red/60 ${
          mono ? 'font-mono' : ''
        }`}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Toggle({ name, defaultChecked }: { name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative h-6 w-11 rounded-full bg-line transition peer-checked:bg-red after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
      <span className="font-medium text-navy">Published</span>
    </label>
  );
}
