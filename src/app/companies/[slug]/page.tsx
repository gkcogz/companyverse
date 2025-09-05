// app/companies/[slug]/page.tsx
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CompanyDetailClientWrapper from '@/components/CompanyDetailClientWrapper';
import { calculateAnalytics } from '@/lib/analytics';
import { type Review } from '@/components/ReviewList';

type RouteParams = { slug: string };
type AsyncParams = { params: Promise<RouteParams> };   // <-- Promise
type PageAsyncProps = AsyncParams;
type MetadataAsyncProps = AsyncParams;

export async function generateMetadata(
  { params }: MetadataAsyncProps
): Promise<Metadata> {
  const { slug } = await params;                       // <-- await
  const supabase = await createClient();

  const { data: company } = await supabase
    .from('companies')
    .select('name,country,description')
    .eq('slug', slug)
    .single();

  if (!company) return { title: 'Company Not Found' };

  const title = `${company.name} Reviews & Reputation Score | CompanyVerse`;
  const description = company.description
    ? company.description.slice(0, 160)
    : `Read reviews for ${company.name} from ${company.country}.`;

  return { title, description };
}

export default async function CompanyDetailPage(
  { params }: PageAsyncProps
) {
  const { slug } = await params;                       // <-- await
  const supabase = await createClient();

  const { data: company, error } = await supabase
    .from('companies')
    .select(`
      *,
      reviews (
        *,
        profiles ( id, username, avatar_url )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !company) notFound();

  const reviews: Review[] =
    (company.reviews ?? []).sort(
      (a: Review, b: Review) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

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
