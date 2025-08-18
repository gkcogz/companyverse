// src/app/airlines/[slug]/page.tsx
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

// Profile tipini de tanımlayalım
type Profile = {
  username: string | null;
  avatar_url: string | null;
}

// Supabase'den gelecek olan birleşik veri tipini tanımlıyoruz
type AirlineWithReviews = {
  id: number;
  name: string;
  country: string;
  description: string | null;
  logo_url: string | null;
  reviews: Review[];
}

export default function AirlineDetailPage() { 
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const supabase = createClient();

  const [airline, setAirline] = useState<AirlineWithReviews | null>(null);
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
        .from("airlines")
        .select(`*, reviews ( *, profiles ( username, avatar_url ) )`)
        .eq("slug", slug)
        .single<AirlineWithReviews>();

      if (error || !data) {
        console.error("Error fetching airline:", error);
      } else {
        setAirline(data);
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

  if (!airline) {
    return <p className="text-red-500 text-center mt-40">Airline not found.</p>;
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
       <div className="mb-8">
        <Link href="/airlines" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to All Airlines
        </Link>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        {/* SOL SÜTUN (Ana İçerik ve Anket) */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-6">
            <h1 className="text-5xl font-bold text-gray-900">{airline.name}</h1>
          </div>
          
          <div className="mt-12">
            {user && <InteractiveSurvey airlineId={airline.id} user={user} onSurveyComplete={handleSurveyComplete} />}
            <ReviewList reviews={reviews} />
          </div>

        </div>

        {/* SAĞ SÜTUN (Şirket Kimlik Kartı) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            
            <div className="flex flex-col items-center text-center">
              {airline.logo_url ? (
                  <Image
                    src={airline.logo_url}
                    alt={`${airline.name} logo`}
                    width={96}
                    height={96}
                    className="rounded-full object-contain bg-white p-2 border border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">
                    {airline.name.charAt(0)}
                  </div>
              )}
              <p className="text-xl text-gray-600 mt-4">{airline.country}</p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">About {airline.name}</h3>
              <p className="text-gray-600 leading-relaxed text-sm mt-2">
                {airline.description || 'No description available yet.'}
              </p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {averageRating} <span className="text-lg font-normal text-gray-500">/ 5</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Based on {reviews.length} reviews</p>
            </div>
            
          </div>
        </aside>

      </div>
    </main>
  );
}