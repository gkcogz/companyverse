// src/app/companies/[slug]/page.tsx
'use client'; 

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import ReviewList, { type Review } from "@/components/ReviewList";
import InteractiveSurvey from "@/components/InteractiveSurvey";
import { User } from '@supabase/supabase-js';
import { type Company } from '@/components/CompanyCard'; // Import the updated Company type

// Profile tipini de tanımlayalım
type Profile = {
  username: string | null;
  avatar_url: string | null;
}

// This type now correctly includes all fields from the Company type
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
        .from("companies") // "airlines" -> "companies"
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

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
       <div className="mb-8">
        <Link
          href="/companies" // "/airlines" -> "/companies"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to All Companies
        </Link>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-6">
            <h1 className="text-5xl font-bold text-gray-900">{company.name}</h1>
          </div>
          
          <div className="mt-12">
            {/* Kategoriye göre anket gösterimini burada kontrol edeceğiz */}
            {user && company.category === 'Aviation' && (
              <InteractiveSurvey 
                company={company} 
                user={user} 
                onSurveyComplete={handleSurveyComplete} 
              />
            )}
            
            {/* Biyoteknoloji gibi kategoriler için buraya farklı bir içerik gelecek */}
            {company.category !== 'Aviation' && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-semibold text-gray-900">Information</h3>
                <p className="text-gray-600 mt-4">User reviews are currently only available for the aviation sector.</p>
              </div>
            )}
            
            <ReviewList reviews={reviews} />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {company.logo_url ? (
                  <Image
                    src={company.logo_url}
                    alt={`${company.name} logo`}
                    width={96}
                    height={96}
                    className="rounded-full object-contain bg-white p-2 border border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">
                    {company.name.charAt(0)}
                  </div>
              )}
              <p className="text-xl text-gray-600 mt-4">{company.country}</p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                About {company.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm mt-2">
                {company.description || 'No description available yet.'}
              </p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Overall Score
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {averageRating} <span className="text-lg font-normal text-gray-500">/ 5</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Based on {reviews.length} reviews
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}