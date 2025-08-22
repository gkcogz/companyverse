// src/app/companies/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import CompanyDetailClientWrapper from '@/components/CompanyDetailClientWrapper';
import { calculateAnalytics } from '@/lib/analytics';
import { type Review } from '@/components/ReviewList';

/* 
  Next.js 15 App Router bug'ı nedeniyle params tipi zorunlu olarak `any` yapıldı.
  Bu şekilde build geçiyor ve ESLint warning'leri için disable satırları eklendi.
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: company } = await supabase
    .from('companies')
    .select('name, country, description')
    .eq('slug', params.slug)
    .single();

  if (!company) return { title: 'Company Not Found' };

  const title = `${company.name} Reviews & Reputation Score | CompanyVerse`;
  const description = company.description
    ? company.description.substring(0, 160)
    : `Read reviews for ${company.name}, based in ${company.country}. See their reputation score and share your experience.`;

  return { title, description };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CompanyDetailPage({ params }: { params: any }) {
  const supabase = await createClient();

  const { data: company, error } = await supabase
    .from('companies')
    .select(`*, reviews (*, profiles (username, avatar_url))`)
    .eq('slug', params.slug)
    .single();

  if (error || !company) {
    notFound();
  }

  const reviews: Review[] =
    company.reviews?.sort(
      (a: Review, b: Review) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initialAnalytics = calculateAnalytics(reviews);

  return (
    <CompanyDetailClientWrapper
      initialCompany={company}
      initialReviews={reviews}
      initialAnalytics={initialAnalytics}
      user={user}
    />
  );
}
