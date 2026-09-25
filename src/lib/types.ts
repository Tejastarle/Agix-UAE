export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  read_minutes: number | null;
  published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Metric = { label: string; value: string };

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  industry: string | null;
  summary: string | null;
  content: string | null;
  cover_image: string | null;
  services: string[] | null;
  metrics: Metric[] | null;
  published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  created_at: string;
};
