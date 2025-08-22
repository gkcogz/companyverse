// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

const BASE_URL = 'https://companyverse.co';

// Define a type for the data you expect from Supabase
type CompanySitemapEntry = {
  slug: string;
  updated_at: string;
};

type PostSitemapEntry = {
  slug: string;
  updated_at: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient(); // Added await

  // 1. Fetch Companies
  const { data: companies } = await supabase
    .from('companies')
    .select('slug, updated_at');

  const companyUrls = companies?.map(({ slug, updated_at }: CompanySitemapEntry) => ({
    url: `${BASE_URL}/companies/${slug}`,
    lastModified: new Date(updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  })) ?? [];

  // 2. Fetch Blog Posts
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at');

  const postUrls = posts?.map(({ slug, updated_at }: PostSitemapEntry) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) ?? [];
  

  // Static pages
  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
  
  // 3. Combine and return all URLs
  return [...staticUrls, ...companyUrls, ...postUrls];
}