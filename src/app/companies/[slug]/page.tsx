// src/app/companies/[slug]/page.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { User } from '@supabase/supabase-js';
import { useReviewAnalytics } from '@/hooks/useReviewAnalytics';
import { type Company } from '@/components/CompanyCard';
import { type Review } from "@/components/ReviewList";
import CompanyInfoCard from '@/components/CompanyInfoCard';
import ReviewSection from '@/components/ReviewSection';

type Profile = {
  username: string | null;
  avatar_url: string | null;
}

type CompanyWithReviews = Company & {
  description: string | null;
  reviews: Review[];
}

export default function CompanyDetailPage() { 
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const supabase = createClient();

  const [company, setCompany] = useState<CompanyWithReviews | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const analytics = useReviewAnalytics(reviews);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
        setProfile(userProfile);
      }

      if (!slug) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from("companies")
        .select(`
          *,
          reviews (
            *,
            profiles ( username, avatar_url )
          )
        `)
        .eq("slug", slug)
        .single<CompanyWithReviews>();

      if (error || !data) {
        console.error("Error fetching company:", error);
      } else {
        setCompany(data);
        const sortedReviews = data.reviews?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];
        setReviews(sortedReviews);
      }
      setLoading(false);
    }

    fetchData();
  }, [slug, supabase]);

  const handleSurveyComplete = (newReview: Review) => {
    const reviewWithProfile = {
      ...newReview,
      profiles: { 
        username: profile?.username || 'User',
        avatar_url: profile?.avatar_url || null
      }
    }
    setReviews([reviewWithProfile, ...reviews]);
  };

  if (loading) {
    return <p className="text-gray-600 text-center mt-40">Loading...</p>;
  }

  if (!company) {
    return <p className="text-red-500 text-center mt-40">Company not found.</p>;
  }

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
       <div className="mb-8">
        <Link href="/companies" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to All Companies
        </Link>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        {/* SOL SÜTUN */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-6">
            <h1 className="text-5xl font-bold text-gray-900">{company.name}</h1>
          </div>
          <ReviewSection 
            company={company}
            reviews={reviews}
            user={user}
            onSurveyComplete={handleSurveyComplete}
          />
        </div>

        {/* SAĞ SÜTUN */}
        <aside className="hidden lg:block">
          <CompanyInfoCard company={company} analytics={analytics} />
        </aside>

      </div>
    </main>
  );
}