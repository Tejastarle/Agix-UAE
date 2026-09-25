import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TextField, TextArea, Toggle } from '@/components/admin/Fields';
import SaveButton from '@/components/admin/SaveButton';
import { saveCaseStudy } from '@/lib/actions';
import type { CaseStudy } from '@/lib/types';

export default function CaseStudyForm({ item }: { item?: CaseStudy }) {
  const metricsValue = JSON.stringify(item?.metrics || [], null, 2);

  return (
    <div>
      <Link href="/admin/case-studies" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red">
        <ArrowLeft size={15} /> Back to case studies
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy">{item ? 'Edit case study' : 'New case study'}</h1>

      <form action={saveCaseStudy} className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        {item && <input type="hidden" name="id" value={item.id} />}

        <div className="space-y-5">
          <TextField label="Title" name="title" defaultValue={item?.title} required />
          <TextField label="Slug" name="slug" defaultValue={item?.slug} hint="Leave blank to generate from the title." />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Client" name="client" defaultValue={item?.client || ''} />
            <TextField label="Industry" name="industry" defaultValue={item?.industry || ''} />
          </div>
          <TextArea label="Summary" name="summary" defaultValue={item?.summary || ''} rows={3}
            hint="Shown on cards and at the top of the case study." />
          <TextArea label="Content (Markdown)" name="content" defaultValue={item?.content || ''} rows={14} mono />
        </div>

        <div className="space-y-5">
          <div className="card space-y-4 p-5">
            <Toggle name="published" defaultChecked={item?.published} />
            <SaveButton label={item ? 'Update case study' : 'Create case study'} />
          </div>
          <div className="card space-y-4 p-5">
            <TextField label="Cover image URL" name="cover_image" defaultValue={item?.cover_image || ''} placeholder="https://… or /images/clients/…" />
            <TextField label="Services" name="services" defaultValue={(item?.services || []).join(', ')} hint="Comma-separated" />
            <TextArea label="Metrics (JSON)" name="metrics" defaultValue={metricsValue} rows={7} mono
              hint={'Array of {"label","value"} — e.g. [{"label":"Traffic","value":"+95%"}]'} />
          </div>
          <div className="card space-y-4 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">SEO</p>
            <TextField label="SEO title" name="seo_title" defaultValue={item?.seo_title || ''} />
            <TextArea label="SEO description" name="seo_description" defaultValue={item?.seo_description || ''} rows={3} />
          </div>
        </div>
      </form>
    </div>
  );
}
