// src/components/CompanyDetailClientWrapper.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import CompanyInfoCard, { type AnalyticsData } from '@/components/CompanyInfoCard';
import ReviewSection from '@/components/ReviewSection';
import { type Company } from '@/components/CompanyCard';
import { type Review } from "@/components/ReviewList";
import { User } from '@supabase/supabase-js';
import { calculateAnalytics } from '@/lib/analytics';

type WrapperProps = {
  initialCompany: Company & { reviews: Review[], description: string | null; ai_summary: string | null };
  initialReviews: Review[];
  initialAnalytics: AnalyticsData;
  user: User | null;
};

export default function CompanyDetailClientWrapper({
  initialCompany,
  initialReviews,
  initialAnalytics,
  user
}: WrapperProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [analytics, setAnalytics] = useState(initialAnalytics);

  // Yeni bir yorum eklendiğinde bu fonksiyon çalışacak
  const handleNewReview = (newReview: Review) => {
    // 1. Yeni yorumu yorum listesinin başına ekle
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // 2. Yeni listeye göre analizleri yeniden hesapla
    const updatedAnalytics = calculateAnalytics(updatedReviews);
    setAnalytics(updatedAnalytics);
  };

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
      <div className="mb-8">
        <Link href="/companies" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to All Companies
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <aside className="lg:col-span-1">
          {/* CompanyInfoCard artık güncel 'analytics' state'ini kullanıyor */}
          <CompanyInfoCard 
            company={initialCompany} 
            analytics={analytics}
          />
        </aside>
        <div className="lg:col-span-2">
          <h1 className="text-5xl font-bold text-gray-900">{initialCompany.name}</h1>
          {/* ReviewSection'a yeni yorumu bildirmesi için fonksiyonu prop olarak geçiyoruz */}
          <ReviewSection 
            company={initialCompany}
            initialReviews={reviews} // Bu artık güncel 'reviews' state'i
            user={user}
            onNewReview={handleNewReview} // Yeni prop
          />
        </div>
      </div>
    </main>
  );
}