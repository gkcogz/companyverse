// src/app/companies/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import CompanyDetailClientWrapper from '@/components/CompanyDetailClientWrapper';
import { notFound } from 'next/navigation';
import { calculateAnalytics } from '@/lib/analytics';
import { type Company } from '@/components/CompanyCard';
import { type Review } from '@/components/ReviewList';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: company } = await supabase.from('companies').select('name, country, description').eq('slug', params.slug).single();

  if (!company) return { title: 'Company Not Found' };

  const title = `${company.name} Reviews & Reputation Score | CompanyVerse`;
  const description = company.description 
    ? company.description.substring(0, 160)
    : `Read reviews for ${company.name}, based in ${company.country}. See their reputation score and share your experience.`;

  return { title, description, openGraph: { title, description } };
}

export default async function CompanyDetailPage({ params }: Props) {
  const supabase = createClient();

  const { data: company, error } = await supabase
    .from("companies")
    .select(`*, reviews (*, profiles (username, avatar_url))`)
    .eq("slug", params.slug)
    .single();

  if (error || !company) {
    notFound();
  }

  const reviews = company.reviews?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];
  const { data: { user } } = await supabase.auth.getUser();

  const initialAnalytics = calculateAnalytics(reviews);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": company.name,
    "url": `https://companyverse.co/companies/${company.slug}`,
    "logo": company.logo_url,
    ...(initialAnalytics.reviewCount > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": initialAnalytics.averageRating.toFixed(1),
        "reviewCount": initialAnalytics.reviewCount
      }
    })
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CompanyDetailClientWrapper
        initialCompany={company as Company & { reviews: Review[], description: string | null, ai_summary: string | null }}
        initialReviews={reviews as Review[]}
        initialAnalytics={initialAnalytics}
        user={user}
      />
    </>
  );
}