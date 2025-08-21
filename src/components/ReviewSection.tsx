// src/components/ReviewSection.tsx
'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { type Company } from '@/components/CompanyCard';
import { type Review } from '@/components/ReviewList';
import InteractiveSurvey from "@/components/InteractiveSurvey";
import ReviewList from "@/components/ReviewList";

// Props tipi güncellendi: onSurveyComplete kaldırıldı, reviews -> initialReviews oldu
type ReviewSectionProps = {
  company: Company; 
  initialReviews: Review[];
  user: User | null;
};

const ReviewSection = ({ company, initialReviews, user }: ReviewSectionProps) => {
  // Sunucudan gelen ilk yorumları state'e aktarıyoruz
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Yeni bir anket tamamlandığında çalışacak lokal fonksiyon
  const handleSurveyComplete = (newReview: Review) => {
    // Yeni yorumu mevcut listenin başına ekleyerek anında UI'da gösteriyoruz
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="mt-12">
      {user && company.category === 'Aviation' && (
        <InteractiveSurvey 
          company={company} 
          user={user} 
          onSurveyComplete={handleSurveyComplete} // Lokal fonksiyonu prop olarak geçiyoruz
        />
      )}
      
      {company.category !== 'Aviation' && (
         <div className="mt-8 border-t border-gray-200 pt-8">
           <h3 className="text-2xl font-semibold text-gray-900">Information</h3>
           <p className="text-gray-600 mt-4">User reviews are currently only available for the aviation sector.</p>
         </div>
      )}
      
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSection;