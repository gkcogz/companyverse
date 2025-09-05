// src/app/companies/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import CompanyDetailClientWrapper from '@/components/CompanyDetailClientWrapper';
import { calculateAnalytics } from '@/lib/analytics';
import { type Review } from '@/components/ReviewList';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: company } = await supabase.from('companies').select('name, country, description').eq('slug', params.slug).single();

  if (!company) return { title: 'Company Not Found' };

  const title = `${company.name} Reviews & Reputation Score | CompanyVerse`;
  const description = company.description 
    ? company.description.substring(0, 160)
    : `Read reviews for ${company.name}, based in ${company.country}. See their reputation score and share your experience.`;

  return { title, description };
}


export default async function CompanyDetailPage({ params }: Props) {
  const supabase = await createClient();

  const { data: company, error } = await supabase
    .from("companies")
    .select(`
      *,
      reviews (
        *,
        profiles ( id, username, avatar_url )
      )
    `) // DEĞİŞİKLİK: profiles içine 'id' eklendi
    .eq("slug", params.slug)
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