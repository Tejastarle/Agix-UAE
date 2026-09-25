import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import CaseStudyForm from '@/components/admin/CaseStudyForm';
import type { CaseStudy } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  if (!supabaseConfigured()) notFound();
  const { data } = await createClient().from('case_studies').select('*').eq('id', params.id).maybeSingle();
  if (!data) notFound();
  return <CaseStudyForm item={data as CaseStudy} />;
}
